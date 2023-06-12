const prisma = require("../../prisma/client");
const { randomId, randomPin } = require("../../functions/device");
const { hashPassword } = require("../../functions/hashing");
const client = require("../API_SCHEDULE/connection/defConnection");
const { resSuccess, resError } = require("../../services/responseHandler");
let lastStatusTime = new Date();

const topic = process.env.TOPIC_STAT;


// function intial device
const device_init = async (req, res) => {
    const { deviceID, devicePIN } = {
        deviceID: randomId(),
        devicePIN: randomPin(),
    };
    const hashed = await hashPassword(devicePIN);
    try {
        const data = await prisma.device.create({
            data: {
                deviceID: deviceID,
                devicePIN: hashed,
            },
        });
        return resSuccess({
            res,
            title: "Device ID and PIN successfully generate!",
            code: 201,
            data: {
                deviceID: data.deviceID,
                devicePIN: String(devicePIN),
            }
        });
    } catch (error) {
        return resError({ res, errors: error.message });
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
                deviceName: deviceID + " TERRARIUM",
                User: {
                    connect: {
                        id: req.id,
                    },
                },
            },
        });
        let uniqueTopic = topic + deviceID;
        client.publish(uniqueTopic, "true");
        return resSuccess({
            res,
            title: 'Device Successfully Paired!',
            code: 200,
            data: data
        });
    } catch (error) {
        return resError({
            res,
            errors: error.message
        });
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
                        username: true,
                    },
                },
            },
        });
        if (!data) {
            return resError({ res, errors: "No Devices!", code: 400 });
        }

        return resSuccess({
            res,
            title: 'Successfull get all device!',
            code: 200,
            data: data
        });
    } catch (error) {
        return resError({
            res,
            errors: error.message,
            code: 500
        });
    }
};

// get device by user
const device_get = async (req, res) => {
    try {
        const id = req.id;

        const data = await prisma.device.findMany({
            where: {
                userId: id,
            },
            select: {
                deviceID: true,
                deviceName: true,
                User: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        if (!data) {
            return resError({ res, errors: "No Devices!", code: 400 });
        }

        return resSuccess({
            res,
            title: 'Successfull get all device!',
            code: 200,
            data: data
        });
    } catch (error) {
        return resError({
            res,
            errors: error.message,
            code: 500
        });
    }
};

// function unpairing device
const device_unpair = async (req, res) => {
    try {
        const { deviceID } = req.body;

        const data = await prisma.device.update({
            where: {
                deviceID: deviceID,
            },
            data: {
                User: {
                    disconnect: true,
                },
            },
        });
        let uniqueTopic = topic + deviceID;
        client.publish(uniqueTopic, "false");
        return resSuccess({
            res,
            title: 'Device Successfully Unpaired!',
            code: 200,
            data: data
        });
    } catch (error) {
        return resError({
            res,
            errors: error.message,
            code: 500
        });
    }
};

// update terrarium name
const device_rename = async (req, res) => {
    try {
        const { id } = req.params;
        const { deviceName } = req.body;
        const data = await prisma.device.update({
            where: {
                deviceID: id,
            },
            data: {
                deviceName: deviceName,
            },
        });
        return resSuccess({
            res,
            title: 'Device Successfully Rename!',
            code: 200,
            data: data.deviceName
        });
    } catch (error) {
        return resError({
            res,
            errors: error.message,
            code: 500
        });
    }
};

client.on("message", async (topic, payload) => {
    lastStatusTime = new Date();
});

//get device status
const device_status = async (req, res) => {
    try {
        const { id } = req.params;

        const isOnline =
            lastStatusTime &&
            Date.now() - lastStatusTime.getTime() < 1 * 60 * 1000;

        const dataUpdate = await prisma.device.update({
            where: {
                deviceID: id,
            },
            data: {
                isOnline: isOnline,
            },
            select: {
                isOnline: true,
            },
        });
        return resSuccess({
            res,
            title: 'Success get Device Status!',
            code: 200,
            data: dataUpdate.isOnline
        });
    } catch (err) {
        return resError({
            res,
            errors: error.message,
            code: 500
        });
    }
};

const device_detail = async (req, res) => {
    try {
        const { deviceID } = req.params;
        const data = await prisma.device.findUnique({
            where: {
                deviceID: deviceID
            }
        });

        if (!data) {
            throw "Data not found!";
        }

        return resSuccess({ res, title: "Sucess get data!", data });

    } catch (error) {
        return resError({ res, errors: error.message });
    }
};

module.exports = {
    device_init,
    device_pair,
    device_unpair,
    device_get,
    device_rename,
    device_status,
    device_detail,
    devices,
};
