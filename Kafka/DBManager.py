from kafka import KafkaConsumer
from kafka import KafkaProducer
from json import loads
from time import sleep
from json import dumps
import pymongo
import pandas as pd

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: dumps(x).encode('utf-8')
)

consumer = KafkaConsumer(
    'topic_test',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group-id',
    value_deserializer=lambda x: loads(x.decode('utf-8'))
)
client = pymongo.MongoClient("mongodb+srv://leonardopizzo:sistemasDistribuidos@cluster0.i1gvnkn.mongodb.net/?retryWrites=true&w=majority")
db = client['ProjetoSUS']
response_list = []
for event in consumer:
    data = dict(event.data)
    collection = db[data['collection']]
    if data['request'] == 'get':
        for x in collection.find_one({},dict(data['filers'])):
            response_list.append(x)
        producer.send('topic_test', response_list)
    if data['request'] == 'post' or data['request'] == 'put':
        response = collection.insert_one(dict(data['data']))
        producer.send('topic_test', response)
    if data['request'] == 'replace':
        response = collection.find_one_and_replace(dict(data['filers'],dict(data['data'])))
        producer.send('topic_test', response)
    if data['request'] == 'delete':
        response = collection.find_one_and_delete(dict(data['filers']), dict(data['data']))
        producer.send('topic_test', response)
    if data['request'] == 'update':
        response = collection.find_one_and_update(dict(data['filters']), dict(data['data']))
        producer.send('topic_test', response)