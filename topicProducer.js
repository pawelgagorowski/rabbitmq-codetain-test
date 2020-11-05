const { RabbitConnection } = require("./config/connection")
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: directProducer.js [<facility>.<severity>] [<facility>.<severity>] [<facility>.<severity>]");
    process.exit(1);
}

const directProducer = new RabbitConnection("topicExchange", "topic", false, args)
