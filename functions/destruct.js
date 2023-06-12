const { dateToInteger } = require("./timeConvertion");

const destructureMessage = (string) => {
    // let result = string.replace("[P]", "");
    const pairs = string.split('#');
    return pairs;
};


const checkMessage = (message) => {

    const format = /^[\w\d]{6}#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)$/;
    // const format = /^[\w\d]{6}#(true|false)#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(\d+)$/;
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

module.exports = {
    destructureMessage,
    checkMessage,
    checkTopic,
    verifyTimeFormat,
    generateTopicWithDeviceID,
    generateMessage
};