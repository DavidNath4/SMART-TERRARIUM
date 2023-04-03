const { validationResult } = require("express-validator");

const formChecker = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        errors.errors.forEach((error) => {
            throw ` ${error.param}, ${error.msg}`;
        });
    } catch (error) {
        return res.status(403).json({
            data: {
                success: false,
                message: "form invalid",
                data: error
            }
        });
    }
};

module.exports = { formChecker };