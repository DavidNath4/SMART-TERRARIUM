const { comparePassword } = require('../functions/hashing');
const prisma = require('../prisma/client');


const deviceIdPinChecker = async (req, res, next) => {

    try {
        const { deviceID, devicePIN } = req.body;

        const data = await prisma.device.findUnique({
            where: {
                deviceID: deviceID
            }

        });

        if (!data) {
            return res.status(404).json({ msg: "Device not found!" });
        }

        const isMatch = await comparePassword(devicePIN, data.devicePIN);

        if (!isMatch) {
            return res.status(401).json({ msg: "invalid PIN" });
        }


        return next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal server error" });
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
            return res.status(400).json({ message: 'Device is already paired with a user' });
        }

        return next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal server error" });
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

module.exports = {
    deviceIdPinChecker,
    isDevicePaired,
    isDeviceExist
};