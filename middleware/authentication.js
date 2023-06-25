const jwt = require("jsonwebtoken");
const { hashPassword } = require("../functions/hashing");
const prisma = require("../prisma/client");
const crypto = require("crypto");
const { resError } = require("../services/responseHandler");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.Authorization;
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded.id);

        const data = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!data) {
            return res.status(400).json({ msg: "User not found!" });
        }

        req.id = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

const loginRequired = async (req, res, next) => {
    if (req.cookies.Authorization) {
        return next();
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
};

const logoutRequired = (req, res, next) => {
    if (req.cookies.Authorization) {
        return res
            .status(401)
            .json({
                msg: "You are already logged in, please Log out first",
                success: false,
            });
    } else {
        return next();
    }
};

const isTokenValid = async (req, res, next) => {
    const token = req.body.token || req.params.token;
    const encrryptedToken = crypto.createHash("sha256").update(token).digest("hex");
    try {

        const userToken = await prisma.user.findUnique({
            where: {
                token: encrryptedToken
            },
        });

        if (userToken == null) throw "Your token is missing!";
        if (new Date() > userToken.tokenExpiredAt) throw "Token is expired";

        req.userTokenId = userToken.id;
        return next();

    } catch (error) {
        if (error != "Your token is missing!") {
            await prisma.user.update({
                where: {
                    token: encrryptedToken
                },
                data: {
                    token: null,
                    tokenExpiredAt: null
                }
            });
        }
        return resError({
            res,
            title: 'Token not valid!',
            errors: error
        });
    }



};

module.exports = {
    verifyToken,
    loginRequired,
    logoutRequired,
    isTokenValid
};
