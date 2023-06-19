const nodemailer = require("nodemailer");
const sendEmail = async (user_mail, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: Number(process.env.MAIL_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_SECRET, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Smart Terrarium Authentication Service" <no-replay@smartterrariumservice.com>', // sender address
        to: user_mail, // list of receivers
        subject,
        text
    }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = { sendEmail };