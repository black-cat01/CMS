const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'CMS.IIITA@outlook.com',
        pass: 'booking@class'
    }
});

sendEmail = (transporter, mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    transporter,
    sendEmail
}

