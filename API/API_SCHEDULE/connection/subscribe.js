const { destructureMessage, checkMessage, checkTopic } = require('../../../functions/destruct');
const { stringToBool } = require('../../../functions/timeConvertion');
const prisma = require('../../../prisma/client');


const client = require('./defConnection');
const topic = process.env.TOPIC;

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
            throw new Error("Invalid deviceID or topic");
        }

        const updateData = await prisma.device.update({
            where: {
                deviceID: deviceId
            },
            data: {
                temp: temp,
                humd: humd,
                uv: stringToBool(uv),
                food: stringToBool(food),
                drink: stringToBool(drink)
            }
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

        if (lastData === null) {
            const historyData = await prisma.history.create({
                data: {
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
                }
            });
        }


        if (lastData !== null) {
            const timeDiff = (Date.now() - lastData.createdAt) / 1000 / 60;
            if (timeDiff >= 1) {
                const historyData = await prisma.history.create({
                    data: {
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
                    }
                });
            }
        }

    } catch (error) {
        console.log(error.message);
    }

});




module.exports = client;