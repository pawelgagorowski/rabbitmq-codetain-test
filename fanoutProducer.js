const { RabbitConnection } = require("./config/connection")

const fonoutProducer = new RabbitConnection("fanoutExchange", "fanout", false)
