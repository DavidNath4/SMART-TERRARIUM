const { hashPassword } = require("./hashing");

const randomPin = () => {
    return String(Math.floor(
        Math.random() * (999999 - 100000) + 100000
    ));
};

function randomId() {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = { randomId, randomPin };
