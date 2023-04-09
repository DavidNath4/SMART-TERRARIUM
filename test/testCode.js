const value = "PNJ/FHhMO1/TERRA";



const checkMessage = (message) => {

    const format = /^[\w\d]{6}#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)$/;
    if (format.test(message)) {
        console.log("The message is in the correct format.");
        return true;
    }
    console.log("The message is not in the correct format.");

    return false;
};


function checkTopic(message) {
    const regex = /^PNJ\/[A-Za-z0-9]{6}\/TERRA$/;
    return regex.test(message);
}


console.log(checkTopic(value));
