# Concept

Testing RabbitMQ exchanges, type of echanges, routing keys and binding keys

## Installation

You need to have RabbitMQ installed on you machine

Use the package manager npm to install dependencies

```
npm install
```

## Usage

```
node/nodemon directProducer.js [routing key 1] [routing key 2] ...

node/nodemon directConsumer.js [binding key 1] [binding key 2] ...

node/nodemon fanoutProducer.js [routing key 1] [routing key 2] ...

node/nodemon fanoutConsumer.js [binding key 1] [binding key 2] ...

node/nodemon topicProducer.js [<facility>.<severity>] [<facility>.<severity>] ...

node/nodemon fanoutConsumer.js [<facility>.<severity>] [<facility>.<severity>] ...
```
