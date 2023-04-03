const prisma = require('../prisma/client');

// get all history from device id
const deviceLog = async (req, res) => {

    try {
        const { id } = req.params;

        const data = await prisma.history.findMany({
            where: {
                Device: {
                    deviceID: id
                }
            }
        });
        return res.status(200).json({
            msg: "success get device history",
            data: data
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            msg: "Internal server error",
            error: error
        });
    }


};



module.exports = {
    deviceLog
};