const value = "xKY3p7#32#70#true#false#false";



const checkMessage = (message) => {

    const format = /^[\w\d]{6}#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)$/;
    if (format.test(message)) {
        console.log("The message is in the correct format.");
        return true;
    }
    console.log("The message is not in the correct format.");

    return false;
};


console.log(checkMessage(value));
