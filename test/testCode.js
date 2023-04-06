// const destructureMessage = (string) => {
//     const pairs = string.split('#');
//     return pairs;
// };

const value = "xKY3p7#32#70#true#false#false";
// console.log(destructureMessage(value));

const pattern = /^[\w\d]{6}#(\d+(\.\d+)?)#(\d+(\.\d+)?)#(true|false)#(true|false)#(true|false)$/;

if (pattern.test(value)) {
    console.log("The message is in the correct format.");
} else {
    console.log("The message is not in the correct format.");
}
