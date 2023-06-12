const { generateTopicWithDeviceID, generateMessage } = require('../../functions/destruct');
const { dateToInteger, stringToBool } = require('../../functions/timeConvertion');
const prisma = require('../../prisma/client');

const client = require('./connection/defConnection');
const topic = process.env.TOPIC_PUB;

const publishSchedule = async (req, res) => {
    try {
        let { schedule1, schedule2, mode } = req.body;
        const { deviceID } = req.params;
        // console.log(deviceID);

        const updateData = await prisma.device.update({
            where: {
                deviceID: deviceID
            },
            data: {
                schedule1: schedule1,
                schedule2: schedule2,
                isAuto: mode
            }
        });

        if (!updateData) {
            return res.status(400).json({
                msg: "error",
                error: "Device not found"
            });
        }
        // const uniqueTopic = generateTopicWithDeviceID(topic, deviceID);
        const message = generateMessage(schedule1, schedule2, mode);


        // client.publish(uniqueTopic, message);
        // console.log(topic);
        console.log(topic + deviceID);
        let uniqueTopic = topic + deviceID;
        client.publish(uniqueTopic, message);
        console.log(message);
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