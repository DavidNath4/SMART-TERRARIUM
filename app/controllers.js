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
