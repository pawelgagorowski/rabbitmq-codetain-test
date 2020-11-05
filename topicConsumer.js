const { RabbitConnection } = require("./config/connection");
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: consumer.js [pattern 1] [pattern 2] [pattern 3]");
    process.exit(1);
}

const directConsumer = new RabbitConnection("topicExchange", "topic", true, args)
