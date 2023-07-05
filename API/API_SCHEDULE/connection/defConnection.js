const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL, {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
});

module.exports = client;
