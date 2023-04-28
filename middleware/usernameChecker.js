const prisma = require("../prisma/client");

const isUsernameExist = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });
        if (user) {
            return res
                .status(400)
                .json({ error: "Username already exists", success: false });
        }
        return next();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: "Internal server error", success: false });
    }
};

const isUsernameAvailable = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });
        if (user && user.id !== id) {
            return res.status(400).json({ error: "Username is already taken" });
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { isUsernameExist, isUsernameAvailable };
