from kafka import KafkaConsumer
from kafka import KafkaProducer
from json import loads
from time import sleep
from json import dumps
from bson import json_util
import pymongo
import pandas as pd

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: dumps(x).encode('utf-8')
)

consumer = KafkaConsumer(
    'topic_App',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group-id',
    value_deserializer=lambda x: loads(x.decode('utf-8'))
)
client = pymongo.MongoClient("mongodb+srv://leonardopizzo:sistemasDistribuidos@cluster0.i1gvnkn.mongodb.net/?retryWrites=true&w=majority")
db = client['test']
response_list = []
for event in consumer:
    data = event.value
    print(data)
    try:
        collection = db[data['collection']]
    except:
        continue
    if data['request'] == 'get':
        print(data['filters'])
        response_list = list(collection.find(data['filters']))
        if response_list:
            print(response_list)
            response = {"code": 0, "values": response_list}
            producer.send('topic_DB',json_util.dumps(response))
            continue
        else:
            response = {"code":1 ,"error_message": "no value found"}
    elif data['request'] == 'post' or data['request'] == 'put':
        try:
            collection.insert_one((data['data']))
            response = {"code": 0}
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    elif data['request'] == 'replace':
        try:
            collection.find_one_and_replace(data['filters'],data['data'])
            response = {"code": 0}
            print(response)
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    elif data['request'] == 'delete':
        try:
            r = collection.find_one_and_delete((data['filters']))
            print(r)
            if r == None:
                response = {"code":1 ,"error_message": "dado não encontrado"}
            else:
                response = {"code": 0}
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    elif data['request'] == 'update':
        try:
            r = collection.find_one_and_update(filter=data['filters'], update=data['data'])
            print(r)
            if r == None:
                response = {"code":1 ,"error_message": "dado não encontrado"}
            else:
                response = {"code": 0}
        except Exception as e:
            print(e)
            response = {"code":1 ,"error_message": str(e)}
    else:
        print("comando não encontrado")
        continue
    print(response)
    producer.send('topic_DB', value=response)
    sleep(0.1)