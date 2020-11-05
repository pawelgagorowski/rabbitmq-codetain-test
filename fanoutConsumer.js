#!/usr/bin/env node
const { RabbitConnection } = require("./config/connection")

const consumer = new RabbitConnection("hello", "fanout", true)
