const prisma = require("../../prisma/client");
const jwt = require("jsonwebtoken");

const { comparePassword, hashPassword } = require('../../functions/hashing');
const { generateToken } = require("../../functions/authorization");

const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const hashed = await hashPassword(password);

        const data = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashed,
                profile: {
                    create: {
                        fullName: username || null,
                        image: null
                    }
                }

            },
            select: {
                id: true,
                username: true,
                email: true,

            }
        });

        const payload = {
            id: data.id
        };

        res.cookie("Authorization", generateToken(payload), {
            httpOnly: true,
            maxAge: Number(process.env.MAX_AGE) * 1000
        });


        return res.status(201).json({
            msg: "User succesfully registered!",
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error registering user",
            error: error.message
        });
    }

};


const updateUser = async (req, res) => {

    try {
        const id = req.id;
        const { username, email, password, fullName, image } = req.body;
        const hashed = await hashPassword(password);

        const data = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username,
                email: email,
                password: hashed,
                profile: {
                    update: {
                        fullName: fullName || null,
                        image: image || null
                    }
                }
            },
            select: {
                id: true,
                username: true,
                email: true,
                profile: {
                    select: {
                        fullName: true
                    }
                }
            }
        });

        return res.status(200).json({
            msg: "User successfully updated!",
            data: data
        });

    } catch (error) {
        return res.status(500).json({
            msg: "Error updating user!",
            error: error.message
        });

    }

};


const loginUser = async (req, res) => {

    try {
        const { emailOrUsername, password } = req.body;

        const data = await prisma.user.findMany({

            where: {
                OR: [
                    { email: { equals: emailOrUsername } },
                    { username: { equals: emailOrUsername } },
                ]
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: true

            }
        });

        if (data.length === 0) {
            return res.status(401).json({
                msg: "Invalid Email/Username",
            });
        }

        const isMatch = await comparePassword(password, data[0].password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid credentials",
            });
        }

        const payload = {
            id: data[0].id
        };

        res.cookie("Authorization", generateToken(payload), {
            httpOnly: true,
            maxAge: Number(process.env.MAX_AGE) * 1000
        });

        return res.status(200).json({
            msg: "Login Success",
            data: {
                id: data[0].id,
                username: data[0].username
            }
        });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ msg: "error" });

    }

};

const logoutUser = async (req, res) => {
    res.cookie("Authorization", "", { httpOnly: true, maxAge: 1000 });
    return res.status(200).json({ msg: "Logout success" });
};



const detail = async (req, res) => {

    try {
        const id = req.id;

        const data = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                email: true,
                profile: {
                    select: {
                        fullName: true,
                        image: true
                    }
                },
                device: {
                    select: {
                        deviceID: true
                    }
                }
            }
        });

        if (!data) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            msg: "Successfully get current user!",
            data: data
        });

    } catch (error) {

        return res.status(500).json({
            msg: "Error getting current user!",
            error: error.message
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    detail

}

