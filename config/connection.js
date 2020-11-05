const amqp = require('amqplib/callback_api');

class RabbitConnection {
  constructor(exchange, typeOfExchange, producer, args) {
    this.exchange = exchange;
    this.typeOfExchange = typeOfExchange;
    this.consumer = producer;
    this.args = args;
    this.createConnection();
  }

  createConnection() {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if(this.consumer) {
        this.createChannelForConsumer(connection, this.exchange, this.typeOfExchange)
      } else {
        this.createChannelForProducer(connection, this.exchange, this.typeOfExchange)
      }
    })
  }
  
  createChannelForProducer(connection, _exchange, _typeOfExchange) {
    connection.createChannel((error1, channel) => {
      if (error1) {
          throw error1;
      }
      const exchange = _exchange;
      const typeOfExchange = _typeOfExchange;
      channel.assertExchange(exchange, typeOfExchange, {
          durable: false
      });
      setInterval(() => {
        if(typeOfExchange == "direct" || typeOfExchange == "topic") {
          this.publishMessageForDirectAndTopic(channel, exchange, typeOfExchange)
        } else if(typeOfExchange == "fanout") {
          this.publishMessageForFanout(channel, exchange, typeOfExchange)
        } else {
          console.log("Wrong type of exchange")
        }
      }, 3000)
    })
  }

  createChannelForConsumer(connection, _exchange, _typeOfExchange) {
    connection.createChannel((error1, channel) => {
      if (error1) {
          throw error1;
      }
      const exchange = _exchange;
      const typeOfExchange = _typeOfExchange;
      channel.assertExchange(exchange, typeOfExchange, {
          durable: false
      });
      channel.assertQueue('', {
          exclusive: true
      }, (error2, q) => {
        if (error2) {
            throw error2;
        }
        console.log(' [*] Waiting for logs. To exit press CTRL+C');
        if(typeOfExchange == "direct" || typeOfExchange == "topic") {
          this.bindQueueForDirectAndTopic(q, channel, exchange, typeOfExchange)
        } else {
          this.bindQueueForFanout(q, channel, exchange, typeOfExchange)
        }
      });
    })
  }

  publishMessageForFanout(channel, exchange, typeOfExchange) {
    const msg = "Hello from fanout";
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Echange Name: %s | type of exchange: '%s' | Sent message: %s", exchange, typeOfExchange, msg);
  }


  publishMessageForDirectAndTopic(channel, exchange, typeOfExchange) {
    const routingKeys = this.args;
    routingKeys.forEach((routingKey) => {
      const msg = "Hello";
      channel.publish(exchange, routingKey, Buffer.from(msg));
      console.log(" [x] Exchange Name: %s | type of exchange: '%s' | Sent message: %s | to routingKey: '%s'", exchange, typeOfExchange, msg, routingKey);
    })
  }

  bindQueueForDirectAndTopic(q, channel, exchange, typeOfExchange) {
    const bindingKeys = this.args;
    bindingKeys.forEach((bindingKey) => {
        channel.bindQueue(q.queue, exchange, bindingKey);
    });
    channel.consume(q.queue, (msg) => {
          console.log(" [x] Exchange Name: %s | Type of Exchange: %s | Receied message: %s | from routing key: '%s' ", exchange, typeOfExchange, msg.content.toString(), msg.fields.routingKey);
    }, {
        noAck: true
      });
  }

  bindQueueForFanout(q, channel, exchange, typeOfExchange) {
    channel.bindQueue(q.queue, exchange, '');
    channel.consume(q.queue, (msg) => {
        if(msg.content) {
            console.log(" [x] Echange Name: %s | Type of Exchange: %s | Receied message: %s", exchange, typeOfExchange, msg.content.toString());
          }
    }, {
        noAck: true
      });
    };
}

  module.exports = {
    RabbitConnection
  }
