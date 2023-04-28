const { getAuthorizationToken } = require("../services/authenticate");
const prisma = require("../prisma/client");

module.exports.login = (req, res) => {
    const data = {
        styles: ["/style/login.css"],
        scripts: ["/js/login.js"],
        layout: "layout/authBase",
    };
    res.render("login", data);
};

module.exports.register = (req, res) => {
    const data = {
        styles: ["/style/register.css"],
        scripts: ["/js/register.js"],
        layout: "layout/authBase",
    };
    res.render("register", data);
};

module.exports.device_pair = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const data = {
        styles: ["/style/device_pair.css"],
        scripts: ["/js/device_pair.js"],
        username,
    };
    res.render("device_pair", data);
};

module.exports.profile = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const data = {
        styles: ["/style/profile.css", "/style/register.css"],
        scripts: ["/js/profile.js"],
        username,
    };
    res.render("profile", data);
};

module.exports.history_temp = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const data = {
        styles: ["/style/history_temp.css"],
        username,
    };
    res.render("history_temp", data);
};

module.exports.logoutUser = async (req, res) => {
    res.cookie("Authorization", "", { httpOnly: true, maxAge: 1000 });
    return res.redirect("/login");
};
