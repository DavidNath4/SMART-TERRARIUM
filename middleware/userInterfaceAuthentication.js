const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.Authorization;
    if (!token) {
        return res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded.id);

        const data = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!data) {
            return res.status(400).json({ msg: "User not found!" });
        }

        req.id = decoded.id;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
};

const loginRequired = async (req, res, next) => {
    if (req.cookies.Authorization) {
        next();
    } else {
        return res.redirect("/login");
    }
};

const logoutRequired = (req, res, next) => {
    if (req.cookies.Authorization) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = {
    verifyToken,
    loginRequired,
    logoutRequired,
};
