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
node/nodemon publisher.js [routing key 1] [routing key 2] [routing key 3]

node/nodemon consumer.js [binding key 1] [binding key 2] [binding key 3]

```

Try to run many consumers
