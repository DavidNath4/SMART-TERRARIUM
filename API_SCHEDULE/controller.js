// const mqtt = require('mqtt');
const { dateToInteger, stringToBool } = require('../functions/timeConvertion');
const prisma = require('../prisma/client');
// const client = mqtt.connect(process.env.MQTT_URL);
const client = require('./connection/defConnection');
const topic = process.env.TOPIC_PUB;

const publishSchedule = async (req, res) => {
    try {
        let { schedule1, schedule2, mode } = req.body;
        const { id } = req.params;

        const updateData = await prisma.device.update({
            where: {
                deviceID: id
            },
            data: {
                schedule1: schedule1,
                schedule2: schedule2,
                isAuto: stringToBool(mode)
            }
        });

        if (!updateData) {
            return res.status(400).json({
                msg: "error",
                error: "Device not found"
            });
        }
        const [front, , back] = topic.split("/");
        const uniqueTopic = `${front}/${id}/${back}`;
        const message = `${dateToInteger(schedule1)}#${dateToInteger(schedule2)}#${mode}`;


        client.publish(uniqueTopic, message);

        return res.status(200).json({
            msg: "sucess",
            data: updateData,
            mqtt: {
                topic: uniqueTopic,
                message: message
            }
        });

    } catch (error) {
        return res.status(500).json({
            msg: "error",
            error: error.message
        });

    }

};



module.exports = {
    publishSchedule
};