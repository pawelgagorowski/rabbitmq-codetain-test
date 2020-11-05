#!/usr/bin/env node
const { RabbitConnection } = require("./config/connection")

const fonoutConsumer = new RabbitConnection("hello", "fanout", true)
