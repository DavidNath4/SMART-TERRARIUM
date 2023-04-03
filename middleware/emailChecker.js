const prisma = require("../prisma/client");

const isEmailExist = async (req, res, next) => {

    try {
        const email = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (email) {
            return res.status(400).json({ error: "Email already exists" });
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }


};

const isEmailAvailable = async (req, res, next) => {

    try {
        const { id } = req.params;
        const email = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (email && email.id !== id) {
            return res.status(400).json({ error: "Email already Taken" });
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }


};



module.exports = { isEmailExist, isEmailAvailable };