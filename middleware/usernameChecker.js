const { getAuthorizationToken } = require("../functions/authorization");
const prisma = require("../prisma/client");
const { resError } = require("../services/responseHandler");

const isUsernameExist = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });
        if (user) {
            throw new Error('Username already exists!');
        }
        return next();
    } catch (error) {
        console.log(error);
        return resError({ res, title: 'Bad Request', errors: error.message });
    }
};

const isUsernameAvailable = async (req, res, next) => {
    try {
        const id = req.id;
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });

        if (user && user.id !== id) {
            if (req.id === user.id) {
                return next();
            }
            throw new Error('Username is already taken!');
        }
        return next();
    } catch (error) {
        return resError({ res, title: 'Bad Request', errors: error.message });
    }
};

module.exports = { isUsernameExist, isUsernameAvailable };
