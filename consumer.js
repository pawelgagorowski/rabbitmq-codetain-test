#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: consumer.js [bindingKey 1] [bindingKey 2] [bindingKey 3]");
    process.exit(1);
}
amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
      throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
        throw error1;
    }
    const exchange = 'first exchange';
    const bindingKeys = args;
    const typeOfExchange = "direct"
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
      bindingKeys.forEach((bindingKey) => {
          channel.bindQueue(q.queue, exchange, bindingKey);
      });
      channel.consume(q.queue, (msg) => {
          console.log(" [x] Echange Name: %s | Type of Exchange: %s | Receied message: %s | from routing key: '%s' ",exchange, typeOfExchange, msg.content.toString(), msg.fields.routingKey);
      }, {
          noAck: true
      });
    });
  });
});

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    var exchange = 'second';
    const typeOfExchange = "fanout"

    channel.assertExchange(exchange, typeOfExchange, {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, (error2, q) => {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for logs. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, (msg) => {
        if(msg.content) {
            console.log(" [x] Echange Name: %s | Type of Exchange: %s | Receied message: %s", exchange, typeOfExchange, msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});
