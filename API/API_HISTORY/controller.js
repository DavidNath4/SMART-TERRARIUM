const prisma = require('../../prisma/client');
const { resError, resSuccess } = require('../../services/responseHandler');

// get all history from device id
const temperatureLog = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await prisma.history.findMany({
            where: {
                Device: {
                    deviceID: id
                }
            },
            select: {
                temp: true,
                createdAt: true
            }
        });
        if (data.length === 0) {
            return resError({ res, errors: "Data not found!", code: 400 });
        }
        return resSuccess({ res, title: "Success get device history!", code: 200, data: data });
    } catch (error) {
        return resError({ res, errors: error.message });
    }
};

const humidityLog = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await prisma.history.findMany({
            where: {
                Device: {
                    deviceID: id
                }
            },
            select: {
                humd: true,
                createdAt: true
            }
        });
        if (data.length === 0) {
            return resError({ res, errors: "Data not found!", code: 400 });
        }
        return resSuccess({ res, title: "Success get device history!", code: 200, data: data });
    } catch (error) {
        return resError({ res, errors: error.message });
    }
};

const drinkLog = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await prisma.history.findMany({
            where: {
                Device: {
                    deviceID: id
                }
            },
            select: {
                drink: true,
                createdAt: true
            }
        });
        if (data.length === 0) {
            return resError({ res, errors: "Data not found!", code: 400 });
        }
        return resSuccess({ res, title: "Success get device history!", code: 200, data: data });
    } catch (error) {
        return resError({ res, errors: error.message });
    }
};

const foodLog = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await prisma.history.findMany({
            where: {
                Device: {
                    deviceID: id
                }
            },
            select: {
                food: true,
                createdAt: true
            }
        });
        if (data.length === 0) {
            return resError({ res, errors: "Data not found!", code: 400 });
        }
        return resSuccess({ res, title: "Success get device history!", code: 200, data: data });
    } catch (error) {
        return resError({ res, errors: error.message });
    }
};

const uvLog = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await prisma.history.findMany({
            where: {
                Device: {
                    deviceID: id,
                }
            },
            select: {
                uv: true,
                createdAt: true
            }
        });
        if (data.length === 0) {
            return resError({ res, errors: "Data not found!", code: 400 });
        }
        return resSuccess({ res, title: "Success get device history!", code: 200, data: data });
    } catch (error) {
        return resError({ res, errors: error.message });
    }
};


module.exports = {
    temperatureLog,
    humidityLog,
    drinkLog,
    foodLog,
    uvLog
};