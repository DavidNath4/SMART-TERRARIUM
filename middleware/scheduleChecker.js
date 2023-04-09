const { verifyTimeFormat } = require("../functions/destruct");

const formatSchedule = async (req, res, next) => {
    const { schedule1, schedule2 } = req.body;

    if (verifyTimeFormat(schedule1) && verifyTimeFormat(schedule2) === true) {
        next();
    } else {
        return res.status(400).json({
            error: "Wrong input format!"
        });
    }

};

module.exports = {
    formatSchedule
};