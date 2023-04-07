const { destructureMessage, checkMessage } = require('../../../functions/destruct');
const { stringToBool } = require('../../../functions/timeConvertion');
const prisma = require('../../../prisma/client');


const client = require('./defConnection');
const topic = process.env.TOPIC;

client.on("connect", async () => {
    client.subscribe(topic);
    console.log(`connected to broker with ${topic}`);
});

client.on("message", async (topic, payload) => {
    const deviceId = topic.split("/")[1];
    let check = checkMessage(payload.toString());
    if (check === false) {
        return null;
    } else {

        const message = destructureMessage(payload.toString());
        console.log(message);


        let [id, temp, humd, uv, food, drink] = message;


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
                    deviceID: id
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
                            deviceID: id
                        }
                    }
                }
            });
        }


        if (lastData !== null) {
            const timeDiff = (Date.now() - lastData.createdAt) / 1000 / 60;
            if (timeDiff >= 0.5) {
                const historyData = await prisma.history.create({
                    data: {
                        temp: temp,
                        humd: humd,
                        uv: stringToBool(uv),
                        food: stringToBool(food),
                        drink: stringToBool(drink),
                        Device: {
                            connect: {
                                deviceID: id
                            }
                        }
                    }
                });
            }
        }
    }

});




module.exports = client;