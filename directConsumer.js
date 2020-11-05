#!/usr/bin/env node
const { RabbitConnection } = require("./config/connection");
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: consumer.js [bindingKey 1] [bindingKey 2] [bindingKey 3]");
    process.exit(1);
}

const directConsumer = new RabbitConnection("directExchange", "direct", true)
