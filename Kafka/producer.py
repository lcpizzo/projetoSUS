from time import sleep
from json import dumps
from kafka import KafkaProducer
import json
import sys
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: dumps(x).encode('utf-8')
)
with open("request_" + str(sys.argv[1]) + "_example.json") as arquivo:
    data = json.load(arquivo)

for j in range(1):
    print(data)
    producer.send('topic_App', value=data)
    print("dado enviado")
    sleep(0.3)
