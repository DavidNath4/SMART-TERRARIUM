const destructureMessage = (string) => {
    // const pairs = string.split(',').filter(pair => pair.trim().length > 0);
    // const Json = {};
    // for (const pair of pairs) {
    //     const [key, value] = pair.split('-');
    //     // if (!isNaN(value)) {
    //     //     Json[key] = Number(value);
    //     // } else 
    //     if (value === 'true' || value === 'false') {
    //         Json[key] = value === 'true';
    //     } else {
    //         Json[key] = value;
    //     }
    // }
    // return Json;
    const pairs = string.split('#');
    return pairs;
};

module.exports = { destructureMessage };