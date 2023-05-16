const { destructureMessage, checkMessage, checkTopic } = require('../../../functions/destruct');
const { stringToBool } = require('../../../functions/timeConvertion');
const prisma = require('../../../prisma/client');

const client = require('./defConnection');
const topic = process.env.TOPIC;

module.exports.mqttSubscribe = (io) => {

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", () => {
            console.log("A client disconnected");
        });
    });

    client.on("connect", async () => {
        client.subscribe(topic);
        console.log(`connected to broker with ${topic}`);
    });

    client.on("message", async (topic, payload) => {

        try {
            const deviceId = topic.split("/")[1];
            const message = destructureMessage(payload.toString());
            console.log(message);


            const [id, temp, humd, uv, food, drink] = message;

            if (!checkMessage(payload.toString())) {
                throw new Error("Invalid payload format");
            }

            if (!checkTopic(topic)) {
                throw new Error("Invalid topic format");
            }

            if (!(deviceId === id)) {
                throw new Error("Invalid deviceID and topic");
            }

            const data = await prisma.device.findUnique({
                where: {
                    deviceID: deviceId
                }
            });

            if (!data) {
                throw new Error("Device not found!");
            }

            const sensorData = {
                temp: temp,
                humd: humd,
                uv: stringToBool(uv),
                food: stringToBool(food),
                drink: stringToBool(drink)
            };

            const updateData = await prisma.device.update({
                where: {
                    deviceID: deviceId
                },
                data: sensorData
            });

            const lastData = await prisma.history.findFirst({
                where: {
                    Device: {
                        deviceID: deviceId
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            const histSensorData = {
                temp: temp,
                humd: humd,
                uv: stringToBool(uv),
                food: stringToBool(food),
                drink: stringToBool(drink),
                Device: {
                    connect: {
                        deviceID: deviceId
                    }
                }
            };

            if (lastData === null) {
                const historyData = await prisma.history.create({
                    data: histSensorData
                });
            }


            if (lastData !== null) {
                const timeDiff = (Date.now() - lastData.createdAt) / 1000 / 60;
                if (timeDiff >= 0.1) {
                    const historyData = await prisma.history.create({
                        data: histSensorData
                    });
                }
            }

            const emitData = {
                deviceId,
                temp,
                humd,
                uv: stringToBool(uv),
                food: stringToBool(food),
                drink: stringToBool(drink),
            };
            io.emit(`mqtt-data/${deviceId}`, emitData);

        } catch (error) {
            console.log(error.message);
        }

    });

};