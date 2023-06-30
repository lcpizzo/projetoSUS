# Trabalho Final - SSC0904 - Sistemas Computacionais Distribuídos - ProjetoSUS

O projeto tem como objetivo o desenvolvimento de uma aplicação dsitribuída para o gerenciamento de estoques de medicamentos disponíveis gratuitamente pelo SUS / ANVISA.

O grupo decidiu por usar o banco de dados MongoDB, com Javascript para realizar a modelagem dos modelos. Foi utilizado, também, Python para realizar o gerenciamento do Apache Kafka.

## Diagrama

Os modelos usados na construção do projeto foram baseados no diagrama desenvolvido pelos alunos
[diagramaER](./DiagramaER.jpg)

## Instalação

Antes de iniciar o uso, certifique-se de instalar todas as depêndencias do projeto com:

``` bash
npm i
```

### Kafka

Garantir que o docker esteja instalado na sua máquina

```shell
sudo apt install docker
```

Garantir que o python esteja instalado na sua máquina

```shell
sudo apt install python
```

Instalar os pacotes para python

```shell
pip install kafka-python bson json pymongo
```

## Uso

Para iniciar o frontend da aplicação, utilize o comando

```bash
npm run dev
```

### Kafka

Um vídeo exemplo do uso está disponível no [link](https://drive.google.com/file/d/1v77TMqDas3fzIasBEZiqD9CtRhCmVRQC/view?usp=sharing) abaixo:<https://drive.google.com/file/d/1v77TMqDas3fzIasBEZiqD9CtRhCmVRQC/view?usp=sharing>
Executar o terminal na pasta projetoSUS/Kafka e rodar o seguinte comando

```shell
docker-compose up
```  

Isso abrirá o ambiente docker, se você desejar rodar em segundo plano adicione a flag -d ao final do comando

Em um terminal separado, ainda no mesmo diretório execute o DBManager com o comando:

```shell
python3 DBManager.py
```

Isso irá deixar o consumidor do DBManager ouvindo as requisições
Agora para ver as respostar precisamos configurar o consumidor da aplicação em um novo terminal, para isso execute o comando:

```shell
python3 consumer.py
```

Por fim vamos simular as requisições com o producer, para isso vamos executar o producer.py com o tipo de requisição de exemplo que queremos executar:

 ```shell
 python3 producer.py <requisições>
 ```

Lembrando que os comandos implementados são:

- put: adicona "Rivotril" à lista de medicamentos
- get: busca itens com  o nome "Rivotril" na lista de medicamentos
- update: aumenta o preço de um médicamento com o nome "Rivotril" em 20%
- delete deleta um medicamento com o nome "Rivotril"

Com a execução feita de forma correta você poderá ver:

1. A requisição que foi enviada pelo producer
2. A requisição recebida pelo DBManager
3. A resposta enviada pelo DBManager
4. A resposta que chegou no consumer

Para iniciar o frontend da aplicação, utilize o comando

```bash
npm run dev
```

### Kafka

Um vídeo exemplo do uso está disponível no [link](https://drive.google.com/file/d/1v77TMqDas3fzIasBEZiqD9CtRhCmVRQC/view?usp=sharing) abaixo:<https://drive.google.com/file/d/1v77TMqDas3fzIasBEZiqD9CtRhCmVRQC/view?usp=sharing>
Executar o terminal na pasta projetoSUS/Kafka e rodar o seguinte comando

```shell
docker-compose up
```  

Isso abrirá o ambiente docker, se você desejar rodar em segundo plano adicione a flag -d ao final do comando

Em um terminal separado, ainda no mesmo diretório execute o DBManager com o comando:

```shell
python3 DBManager.py
```

Isso irá deixar o consumidor do DBManager ouvindo as requisições
Agora para ver as respostar precisamos configurar o consumidor da aplicação em um novo terminal, para isso execute o comando:

```shell
python3 consumer.py
```

Por fim vamos simular as requisições com o producer, para isso vamos executar o producer.py com o tipo de requisição de exemplo que queremos executar:

 ```shell
 python3 producer.py <requisições>
 ```

Lembrando que os comandos implementados são:

- put: adicona "Rivotril" à lista de medicamentos
- get: busca itens com  o nome "Rivotril" na lista de medicamentos
- update: aumenta o preço de um médicamento com o nome "Rivotril" em 20%
- delete deleta um medicamento com o nome "Rivotril"

Com a execução feita de forma correta você poderá ver:

1. A requisição que foi enviada pelo producer
2. A requisição recebida pelo DBManager
3. A resposta enviada pelo DBManager
4. A resposta que chegou no consumer
