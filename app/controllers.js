module.exports.index = (req, res) => {
    const data = {
        styles: ["/style/dashboard.css"],
        scripts: ["/js/dashboard.js"],
    };
    res.render("index", data);
};

module.exports.login = (req, res) => {
    const data = {
        styles: ["/style/login.css"],
        layout: "layout/authBase",
        // scripts: ["/js/login.js"],
    };
    res.render("login", data);
};

module.exports.register = (req, res) => {
    const data = {
        styles: ["/style/register.css"],
        layout: "layout/authBase",
        // scripts: ["/js/login.js"],
    };
    res.render("register", data);
};

module.exports.device_pair = (req, res) => {
    const data = {
        styles: ["/style/device_pair.css", "/style/dashboard.css"],
        scripts: ["/js/dashboard.js"],
        // scripts: ["/js/login.js"],
    };
    res.render("device_pair", data);
};