const express = require('express');
const validator = require('validator');
const db = require('../database.js');
const nodemailer = require('nodemailer');

const { transporter, sendEmail } = require('../email.js')

const router = express.Router();

router.post('/', (req, res) => {
    let code;
    try {
        const { Email, Password } = req.body;

        if (validator.isEmpty(Email)) {
            code = 0
            throw new Error('Email feild is mandatory')
        }

        if (Password.length < 6) {
            code = 1
            throw new Error('Password length should be atleast 6 characters long')
        }

        if (!validator.isEmail(Email)) {
            code = 0
            throw new Error('Email is invalid')
        }

        const sqlQuery = "select * from user where Email = (?)"
        db.query(sqlQuery, [Email], (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message })
            } else if (result.length === 0) {
                res.status(200).json({ code: 0, error: "Email not registered. Please try again." })
            } else if (Password === result[0].Password) {
                const mailOptions = {
                    from: 'classroom.management.system@outlook.com',
                    to: Email,
                    subject: 'Login',
                    text: 'Someone logged into your CMS account. Is it you??'
                };

                sendEmail(transporter, mailOptions);
                res.status(200).json({ message: "success", user: result[0] });

            } else {
                res.status(200).json({ code: 1, error: "Wrong Password. Please try again." })
            }
        })
    } catch (error) {
        if (error.message) res.status(200).json({ code: code, error: error.message })
        else res.status(400).json({ error })
    }
})

module.exports = router;