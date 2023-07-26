const { dateToInteger } = require("./timeConvertion");
const crypto = require('crypto');

const destructureMessage = (string) => {
    // let result = string.replace("[P]", "");
    let decryptedMessage = '';
    const key = 'abcdefghijklmnop';
    decryptedMessage = decryptMessage(string, key);
    console.log(decryptedMessage);
    const pairs = decryptedMessage.split('#');
    return [pairs, decryptedMessage];
};


const checkMessage = (message) => {

    // const format = /^[\w\d]{6}#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)$/;
    const format = /^\[P\]#(\w{6})#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)#(\d+)$/;
    if (format.test(message)) {
        return true;
    }
    return false;
};

function checkTopic(message) {
    const regex = /^TERRARIUM\/PUBLISH\/[A-Za-z0-9]{6}$/;
    return regex.test(message);
}

function verifyTimeFormat(timeString) {
    const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(timeString);
}

function generateTopicWithDeviceID(topic, deviceID) {
    const [front, , back] = topic.split("/");
    return `${front}/${deviceID}/${back}`;
}

function generateMessage(schedule1, schedule2, mode) {
    // return `${dateToInteger(schedule1)}#${dateToInteger(schedule2)}#${mode}`;
    return `${schedule1}#${schedule2}#${mode}`;
}

function decrypt(cipherText, key) {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    decipher.setAutoPadding(false);
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function decryptMessage(encryptedMessage, key) {
    const parts = encryptedMessage.split('#');
    const decryptedParts = parts.map(part => {
        const decryptedPart = decrypt(part, key);

        return decryptedPart.replace(/@+$/, '');
    });
    const decryptedMessage = decryptedParts.join('');
    return decryptedMessage;
}

module.exports = {
    destructureMessage,
    checkMessage,
    checkTopic,
    verifyTimeFormat,
    generateTopicWithDeviceID,
    generateMessage
};