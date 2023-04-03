const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.Authorization;
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = { verifyToken };