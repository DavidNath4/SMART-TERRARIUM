// const dateToInteger = (schedule, currentDate = new Date()) => {
//     const [hours, minutes, seconds] = schedule.split(':').map(Number);
//     const d = new Date(currentDate);
//     d.setHours(hours, minutes, seconds);
//     return d.getTime();
// };

// const integerToDate = (timeInMs) => {
//     const d = new Date(timeInMs);
//     const hours = d.getHours().toString().padStart(2, '0');
//     const minutes = d.getMinutes().toString().padStart(2, '0');
//     const seconds = d.getSeconds().toString().padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
// };

// const schedule1 = '17:50:45';
// const currentDate = new Date();
// console.log(dateToInteger(schedule1, currentDate));
// console.log(integerToDate(dateToInteger(schedule1, currentDate)));


const stringToDateTime = (timeStr) => {
    const datetime = moment(timeStr, 'HH:mm:ss').toDate();
    return moment(datetime).format('HH:mm:ss');
};

const datetime = "08:50:45";
console.log(datetime); // Output: 2023-04-02T17:50:45.000Z










