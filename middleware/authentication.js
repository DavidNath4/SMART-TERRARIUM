const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.Authorization;
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded.id);

        const data = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if (!data) {
            return res.status(400).json({ msg: "User not found!" });
        }

        req.id = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};


const loginRequired = async (req, res, next) => {
    if (req.cookies.Authorization) {
        next();
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
};

const logoutRequired = (req, res, next) => {
    if (req.cookies.Authorization) {
        return res.status(401).json({ msg: "You are already logged in, please Log out first" });
    } else {
        next();
    }
};


module.exports = {
    verifyToken,
    loginRequired,
    logoutRequired
};