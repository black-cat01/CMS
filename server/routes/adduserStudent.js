const express = require('express');
const validator = require('validator');
const db = require('../database.js');
const nodemailer = require('nodemailer');

const { transporter, sendEmail } = require('../email.js')

const router = express.Router();

router.post('/', (req, res) => {
    let code;
    try {
        console.log(req.body)
        let { Name, Email, Password, Type, Section } = req.body

        if (validator.isEmpty(Name)) {
            code = 0
            throw new Error('Name feild is mandatory')
        }

        if (validator.isEmpty(Email)) {
            code = 1
            throw new Error('Email feild is mandatory')
        }

        if (validator.isEmpty(Password)) {
            code = 2
            throw new Error('Password feild is mandatory')
        }

        if (validator.isEmpty(Section)) {
            code = 4
            throw new Error('Section feild is mandatory')
        }


        if (!validator.isEmail(Email)) {
            code = 1
            throw new Error('Email is invalid')
        }

        if (Password.length < 6) {
            code = 2;
            throw new Error('Password must be atleast 6 characters long.')
        }

        if (!(Section === 'A' || Section === 'B' || Section === 'C')) {
            code = 4;
            throw new Error('Section must be either A or B or C.')
        }


        let sqlQuery = "select * from user where user.Email = (?)"
        db.query(sqlQuery, [Email], (err, result) => {
            try {
                if (result.length > 0) {
                    code = 1
                    throw new Error('Email is already registered.')
                } else if (err) {
                    console.log(err)
                    res.status(400).json({ error: err.message })
                } else {
                    sqlQuery = "INSERT INTO user (Name, Email, Password, Type, Section) Values (?,?,?,?,?)"
                    db.query(sqlQuery, [Name, Email, Password, Type, Section], (error, result) => {

                        if (error) {
                            res.status(400).json({ error: error.message });
                        } else {
                            console.log(result);

                            const mailOptions = {
                                from: 'classroom.management.system@outlook.com',
                                to: Email,
                                subject: 'Your account has been createad. Login with the given credentials for more details.',
                                text: 'Hello this is the Manager of CMS,\nI would like to tell you that your CMS account has been created. You can login with the credentials given below for more details.\nEmail: ' + Email + "  Password:" + Password
                            };

                            sendEmail(transporter, mailOptions);
                            res.status(200).json({ message: "success" })
                        }
                    })
                }
            } catch (error) {
                console.log(error)
                res.status(200).json({ code: code, error: error.message })
            }
        })

    } catch (error) {
        res.status(200).json({ code: code, error: error.message })
    }
})

module.exports = router;