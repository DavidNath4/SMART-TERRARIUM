const destructureMessage = (string) => {
    const pairs = string.split('#');
    return pairs;
};


const checkMessage = (message) => {

    const format = /^[\w\d]{6}#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)$/;
    if (format.test(message)) {
        return true;
    }
    return false;
};

function checkTopic(message) {
    const regex = /^PNJ\/[A-Za-z0-9]{6}\/TERRA$/;
    return regex.test(message);
}



module.exports = { destructureMessage, checkMessage, checkTopic };