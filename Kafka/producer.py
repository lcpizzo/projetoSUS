from time import sleep
from json import dumps
from kafka import KafkaProducer
import json
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: dumps(x).encode('utf-8')
)
with open("request_example.json") as arquivo:
    data = json.load(arquivo)

print(data)
producer.send('topic_test', value=data)
print("dado enviado")
sleep(0.1)
# for j in range(1):
#     print("Iteration", j)
#     # data = {'counter': j}
#     producer.send('topic_test', value=data)
#     sleep(0.5)