#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const args = process.argv.slice(2);

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
          throw error1;
      }
      const exchange = "first exchange";
      const msg = "Hello from direct";
      const args = process.argv.slice(2);
      const routingKeys = (args.length > 0) ? args : ['info'];
      console.log(routingKeys)
      const typeOfExchange = "direct";
      channel.assertExchange(exchange, typeOfExchange, {
          durable: false
      });
      setInterval(() => {
        routingKeys.forEach((routingKey) => {
          channel.publish(exchange, routingKey, Buffer.from(msg));
          console.log(" [x] Echange Name: %s | type of exchange: '%s' | Sent message: %s | to routingKey: '%s'", exchange, typeOfExchange, msg, routingKey);
      })
    }, 3000)
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
      var msg = 'Hello from fanout!';
      const typeOfExchange = "fanout";

      channel.assertExchange(exchange, typeOfExchange, {
          durable: false
      });
      setInterval(() => {
        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Echange Name: %s | type of exchange: '%s' | Sent message: %s",exchange, typeOfExchange, msg);
      },4000)
  });
})
