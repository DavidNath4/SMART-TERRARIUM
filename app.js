if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ROUTER = require("./router");
const hbs = require("hbs");
const path = require('path');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const { mqttSubscribe } = require('./API/API_SCHEDULE/connection/subscribe');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.engine("hbs", hbs.__express);
app.set("views", "views");
app.set("view engine", "hbs");
app.set("view options", { layout: "layout/base" });
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


mqttSubscribe(io);

app.use("/", ROUTER);

http.listen(PORT, () => {
    console.log(`🚀 SERVER RUNNING IN PORT ${PORT}`);
    console.log(`🚀 http://localhost:${PORT}`);
});
