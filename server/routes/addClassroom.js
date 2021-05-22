const express = require('express');
const validator = require('validator');
const db = require('../database.js');
const nodemailer = require('nodemailer');

const { transporter, sendEmail } = require('../email.js')

const router = express.Router();

router.post('/', (req, res) => {
    let code;
    try {

        let sqlQuery = "INSERT INTO rooms (roomname) Values (?)"
        db.query(sqlQuery, ["Theory"], (err, result) => {

            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                console.log(result.insertId);

                let sql1 = "SELECT Email FROM user WHERE Type=(?)";
                db.query(sql1, ["Admin"], async (err1, Emails) => {

                    if (err1) {
                        console.log(err1);
                        res.status(400).json({ error: err1.message });
                    }
                    else {
                        console.log(Emails);
                        Emails = JSON.parse(JSON.stringify(Emails))
                        Emails.forEach(async (Email) => {
                            console.log(Email);
                            const mailOptions = {
                                from: "CMS.IIITA@outlook.com",
                                to: Email.Email,
                                subject: "New Classroom Registered.",
                                text: "Room No. " + result.insertId + " has been successfully registered."
                            };

                            sendEmail(transporter, mailOptions);
                            res.status(200).json({ message: "success" });
                        });
                    }
                });
            }

        })

        let sqlallrooms = "SELECT idrooms FROM rooms"
        db.query(sqlallrooms, [], (err, result) => {

            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                result = result.map(({ idrooms }) => idrooms)
                console.log(result);
            }
        })


    } catch (error) {
        res.status(200).json({ code: code, error: error.message })
    }
})

module.exports = router;