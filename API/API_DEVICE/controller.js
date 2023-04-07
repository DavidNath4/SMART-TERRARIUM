const prisma = require('../../prisma/client');
const { randomId, randomPin } = require('../../functions/device');
const { hashPassword } = require('../../functions/hashing');


// function intial device
const device_init = async (req, res) => {
    const { deviceID, devicePIN } = { deviceID: randomId(), devicePIN: randomPin() };
    const hashed = await hashPassword(devicePIN);
    try {
        const data = await prisma.device.create({
            data: {
                deviceID: deviceID,
                devicePIN: hashed
            }
        });

        return res.status(201).json({
            msg: "Device ID and PIN successfully generate!",
            data: {
                deviceID: data.deviceID,
                devicePIN: String(devicePIN)
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};



// function pairing device
const device_pair = async (req, res) => {
    try {
        const { deviceID } = req.body;

        const data = await prisma.device.update({
            where: {
                deviceID: deviceID,
            },
            data: {
                User: {
                    connect: {
                        id: req.id

                    }
                }
            }

        });
        return res.status(200).json({
            msg: "Device Successfully Paired!",
            data: data
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};


// get all device

const devices = async (req, res) => {
    try {
        const data = await prisma.device.findMany({
            select: {
                deviceID: true,
                User: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!data) {
            res.status(400).json({ error: 'No Device' });
        }
        return res.status(200).json({
            msg: "Successfull get all device",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to retrieve devices.' });
    }
};


// get device by user
const device_get = async (req, res) => {

    try {
        const { id } = req.params;
        const data = await prisma.device.findMany({
            where: {
                userId: id
            },
            select: {
                deviceID: true,
                User: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!data) {
            res.status(400).json({ error: 'No Device' });
        }
        return res.status(200).json({
            msg: "Successfull get all device",
            data: data
        });
    } catch (err) {
        res.status(500).json({ error: 'Unable to retrieve devices.' });
    }

};


module.exports = {
    device_init,
    device_pair,
    device_get,
    devices
};