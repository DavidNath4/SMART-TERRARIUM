const isPasswordConfirmed = async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password does not match" });
    }
    return next();
};

module.exports = { isPasswordConfirmed };