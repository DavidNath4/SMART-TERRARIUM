const { comparePassword } = require('../functions/hashing');
const prisma = require('../prisma/client');
const { resError } = require('../services/responseHandler');


const deviceIdPinChecker = async (req, res, next) => {

    try {
        const { deviceID, devicePIN } = req.body;

        const data = await prisma.device.findUnique({
            where: {
                deviceID: deviceID
            }

        });

        if (!data) {
            return resError({ res, code: 404, errors: "Device not found!" });
        }

        const isMatch = await comparePassword(devicePIN, data.devicePIN);

        if (!isMatch) {
            return resError({ res, code: 401, errors: "Invalid PIN!" });
        }


        return next();

    } catch (error) {
        return resError({ res, errors: error.message });
    }

};


const isDevicePaired = async (req, res, next) => {

    try {
        const { deviceID } = req.body;

        const data = await prisma.device.findUnique({
            where: {
                deviceID: deviceID
            }
        });

        if (data.userId !== null) {
            return resError({ res, code: 400, errors: "Device is already paired with a user!" });
        }

        return next();
    } catch (error) {
        return resError({ res, errors: error.message });
    }

};

const isDeviceExist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await prisma.device.findUnique({
            where: {
                deviceID: id
            }
        });
        if (!data) {
            return res.status(404).json({ msg: "Device not found!" });
        }
        return next();
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }

};

const userAndDevice = async (req, res, next) => {
    try {
        const id = req.id;
        const { deviceID } = req.body;
        const device = await prisma.device.findMany({
            where: {
                deviceID: deviceID
            }
        });
        if (device[0].userId !== id) {
            throw new Error('User and Device invalid!');
        }

        return next();

    } catch (error) {
        return resError({ res, errors: error.message });
    }
};

module.exports = {
    deviceIdPinChecker,
    isDevicePaired,
    isDeviceExist,
    userAndDevice
};