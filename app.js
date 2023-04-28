if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ROUTER = require("./router");
require("./API/API_SCHEDULE/connection/subscribe");
const hbs = require("hbs");

const app = express();
const PORT = process.env.PORT || 8080;

app.engine("hbs", hbs.__express);
app.set("views", "views");
app.set("view engine", "hbs");
app.set("view options", { layout: "layout/base" });
app.use(express.static("public"));
app.use("/static", express.static("public"));

app.engine("hbs", hbs.__express);
app.set("views", "views");
app.set("view engine", "hbs");
app.set("view options", { layout: "layout/base" });
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", ROUTER);

app.listen(PORT, () => {
    console.log(`🚀 SERVER RUNNING IN PORT ${PORT}`);
    console.log(`🚀 http://localhost:${PORT}`);
});
