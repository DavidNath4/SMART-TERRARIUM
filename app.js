if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ROUTER = require("./router");
require('./API/API_SCHEDULE/connection/subscribe');
const expbs = require("express-handlebars");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.engine('handlebars', expbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout')
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

app.use("/", ROUTER);


app.listen(PORT, () => {
    console.log(`🚀 SERVER RUNNING IN PORT ${PORT}`);
    console.log(`🚀 http://localhost:${PORT}`);
});