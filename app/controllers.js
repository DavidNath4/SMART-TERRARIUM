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
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);
    const data = {
        styles: ["/style/history.css"],
        scripts: ["/js/history_temp.js"],
        username,
        deviceID,
        deviceName,
        title: 'TEMPERATURE LOGS'
    };
    res.render("history", data);
};

module.exports.history_humd = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);
    const data = {
        styles: ["/style/history.css"],
        scripts: ["/js/history_humd.js"],
        username,
        deviceID,
        deviceName,
        title: 'HUMIDITY LOGS'
    };
    res.render("history", data);
};

module.exports.history_uv = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);

    const data = {
        styles: ["/style/history.css"],
        scripts: ["/js/history_uv.js"],
        username,
        deviceID,
        deviceName,
        title: 'UV LOGS'
    };
    res.render("history", data);
};

module.exports.history_food = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);

    const data = {
        styles: ["/style/history.css"],
        scripts: ["/js/history_food.js"],
        username,
        deviceID,
        deviceName,
        title: 'FOOD LOGS'
    };
    res.render("history", data);
};

module.exports.history_drink = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);

    const data = {
        styles: ["/style/history.css"],
        scripts: ["/js/history_drink.js"],
        username,
        deviceID,
        deviceName,
        title: 'DRINK LOGS'
    };
    res.render("history", data);
};

module.exports.logoutUser = async (req, res) => {
    res.cookie("Authorization", "", { httpOnly: true, maxAge: 1000 });
    return res.redirect("/login");
};


module.exports.dashboard = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);
    const data = {
        styles: ["/style/dashboard.css"],
        scripts: ["/js/dashboard.js"],
        username,
        deviceName,
        deviceID
    };
    res.render("index", data);
};

module.exports.schedule = async (req, res) => {
    const userId = await getAuthorizationToken(req);
    const { username } = await prisma.user.findUnique({
        where: { id: userId.id },
        select: { username: true },
    });
    const deviceID = req.params.id;
    const deviceName = await getDeviceName(deviceID);
    const data = {
        styles: ["/style/schedule.css"],
        scripts: ["/js/schedule.js"],
        username,
        deviceName,
        deviceID
    };
    res.render("schedule", data);
};

module.exports.forgotPass = (req, res) => {
    const data = {
        styles: ["/style/login.css"],
        scripts: ["/js/forgotPass.js"],
        layout: "layout/authBase",
    };
    res.render("forgotPass", data);
};

const getDeviceName = async (deviceID) => {
    const { deviceName } = await prisma.device.findUnique({
        where: {
            deviceID: deviceID
        }
    });
    return deviceName;
};