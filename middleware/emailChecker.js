const prisma = require("../prisma/client");
const { resError } = require("../services/responseHandler");

const isEmailExist = async (req, res, next) => {
    try {
        const email = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (email) {
            throw new Error('Email already exists!');
        }
        return next();
    } catch (error) {
        console.log(error);
        return resError({ res, title: 'Bad request!', errors: error.message });
    }
};

const isEmailExist2 = async (req, res, next) => {
    try {
        const email = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (email) {
            return next();
        }
        throw new Error('Email doesnt exists!');
    } catch (error) {
        console.log(error);
        return resError({ res, title: 'Bad request!', errors: error.message });
    }
};

const isEmailAvailable = async (req, res, next) => {
    try {
        const { id } = req.id;
        const email = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (email && email.id !== id) {
            if (req.id === email.id) {
                return next();
            }
            throw new Error('Email is already taken!');
        }
        return next();
    } catch (error) {
        return resError({ res, title: 'Bad request!', errors: error.message });
    }
};

module.exports = { isEmailExist, isEmailExist2, isEmailAvailable };
