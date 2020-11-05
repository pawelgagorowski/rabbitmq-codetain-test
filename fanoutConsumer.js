const { RabbitConnection } = require("./config/connection")

const fonoutConsumer = new RabbitConnection("fanoutExchange", "fanout", true)
