const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "3d" });
    return token;
};

const getAuthorizationToken = async (req) => {
    try {
        const jwtToken = req.cookies.Authorization;
        // console.log(process.env.SECRET_KEY, "SEC");
        const id = await jwt.verify(
            jwtToken,
            process.env.SECRET_KEY,
            async (err, decode) => {
                if (!err) {
                    return decode;
                } else {
                    throw "Failed to verify token";
                }
            }
        );
        return id;
    } catch (error) {
        return false;
    }
};

module.exports = {
    generateToken,
    getAuthorizationToken
};