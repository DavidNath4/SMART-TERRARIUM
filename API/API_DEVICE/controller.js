const prisma = require('../../prisma/client');
const { randomId, randomPin } = require('../../functions/device');
const { hashPassword } = require('../../functions/hashing');
const client = require('../API_SCHEDULE/connection/defConnection');
let lastStatusTime = new Date();

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
                deviceName: deviceID + "TERRARIUM",
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
        const id = req.id;

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


// function unpairing device
const device_unpair = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await prisma.device.update({
            where: {
                deviceID: id
            },
            data: {
                User: {
                    disconnect: true
                }
            }

        });
        return res.status(200).json({
            msg: "Device Successfully Unpaired!",
            data: data
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};

// update terrarium name
const device_rename = async (req, res) => {
    try {
        const { id } = req.params;
        const { deviceName } = req.body;
        const data = await prisma.device.update({
            where: {
                deviceID: id
            },
            data: {
                deviceName: deviceName
            }
        });

        return res.status(200).json({
            msg: "Device Successfully Rename!",
            data: data.deviceName
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

client.on('message', async (topic, payload) => {
    lastStatusTime = new Date();
});

//get device status
const device_status = async (req, res) => {
    try {
        const { id } = req.params;

        const isOnline = lastStatusTime && (Date.now() - lastStatusTime.getTime() < 5 * 60 * 1000);

        const dataUpdate = await prisma.device.update({
            where: {
                deviceID: id
            },
            data: {
                isOnline: isOnline
            },
            select: {
                isOnline: true
            }
        });


        return res.status(200).json({
            msg: "Succes get Device Status!",
            data: dataUpdate.isOnline
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

module.exports = {
    device_init,
    device_pair,
    device_unpair,
    device_get,
    device_rename,
    device_status,
    devices
};