const moment = require('moment');

const dateToInteger = (schedule, currentDate = new Date()) => {
    const [hours, minutes, seconds] = schedule.split(':').map(Number);
    const d = new Date(currentDate);
    d.setHours(hours, minutes, seconds);
    return d.getTime();
};

const integerToDate = (timeInMs) => {
    const d = new Date(timeInMs);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const stringToBool = (str) => {
    if (str.toLowerCase() === 'true') {
        return true;
    } else if (str.toLowerCase() === 'false') {
        return false;
    } else {
        throw new Error('Input string is not a valid boolean');
    }
};

const stringToDateTime = (timeStr) => {
    const datetime = moment(timeStr, 'HH:mm:ss').toDate();
    return moment(datetime).format('HH:mm:ss');
};



module.exports = {
    dateToInteger,
    integerToDate,
    stringToBool,
    stringToDateTime
};