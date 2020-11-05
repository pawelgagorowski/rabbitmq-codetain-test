const { RabbitConnection } = require("./config/connection")
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: directProducer.js [routingKey 1] [routingKey 2] [routingKey 3]");
    process.exit(1);
}

const directProducer = new RabbitConnection("directExchange", "direct", false, args)
