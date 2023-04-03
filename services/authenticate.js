const jwt = require("jsonwebtoken");

/** Set Cookie To User Browser */
const setCookie = ({
    res,
    title,
    data,
    maxAge = (Number(process.env.MAX_AGE) || 259200) * 1000,
}) => {
    res.cookie(title, data, { httpOnly: true, maxAge });
};

/** Creating jwt token*/
const generateAuthorizationToken = ({
    data,
    exp = Number(process.env.MAX_AGE) || 259200,
}) => {
    return jwt.sign(data, process.env.SECRET, {
        expiresIn: exp,
    });
};

/**  Getting jwt token from request */
const getAuthorizationToken = async (req) => {
    try {
        const jwtToken = req.cookies.Authorization;
        const id = await jwt.verify(
            jwtToken,
            process.env.SECRET,
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
    setCookie,
    generateAuthorizationToken,
    getAuthorizationToken
};