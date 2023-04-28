module.exports.login = (req, res) => {
    const data = {
        styles: ["/style/login.css"],
        layout: "layout/authBase",
    };
    res.render("login", data);
};

module.exports.register = (req, res) => {
    const data = {
        styles: ["/style/register.css"],
        layout: "layout/authBase",
    };
    res.render("register", data);
};

module.exports.device_pair = (req, res) => {
    const data = {
        styles: ["/style/device_pair.css"],
    };
    res.render("device_pair", data);
};

module.exports.profile = (req, res) => {
    const data = {
        styles: ["/style/profile.css", "/style/register.css"],
    };
    res.render("profile", data);
};

module.exports.history_temp = (req, res) => {
    const data = {
        styles: ["/style/history_temp.css"],
    };
    res.render("history_temp", data);
};

module.exports.logoutUser = async (req, res) => {
    res.cookie("Authorization", "", { httpOnly: true, maxAge: 1000 });
    return res.redirect("/login");
};
