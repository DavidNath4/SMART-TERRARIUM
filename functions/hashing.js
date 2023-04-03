const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};

const comparePassword = async (password, userPassword) => {
    const isMatch = await bcrypt.compare(password, userPassword);
    return isMatch;
};

module.exports = {
    hashPassword,
    comparePassword
};