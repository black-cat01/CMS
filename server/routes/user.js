const express = require('express');
const validator = require('validator');
const db = require('../database.js');
var nodemailer = require('nodemailer');
const { transporter, sendEmail } = require('../email.js')
const router = express.Router();

router.put('/updateProfile', (req, res) => {
    let code;
    try {

        const { iduser, Name, Password } = req.body;

        if (validator.isEmpty(Name)) {
            code = 0
            throw new Error('Name feild is mandatory')
        }

        if (validator.isEmpty(Password)) {
            code = 3
            throw new Error('Password feild is mandatory')
        }

        if (Password.length < 6) {
            code = 3;
            throw new Error('Password must be atleast 6 characters long.')
        }

        let updateQuery = "UPDATE user SET Name = (?), Password = (?) where user.iduser = (?)"
        db.query(updateQuery, [Name, Password, iduser], (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                console.log(result);
                let searchQuery = "Select * from user where user.iduser = (?)"
                db.query(searchQuery, [iduser], (error, result) => {
                    if (!err && result.length > 0) {
                        result = JSON.parse(JSON.stringify(result))
                        console.log(result);
                        const mailOptions = {
                            from: "ClassroomManagementSystems@outlook.com",
                            to: result[0].Email,
                            subject: "Profile Updated",
                            text: "Your CMS Profile has been updated."
                        };

                        sendEmail(transporter, mailOptions);
                        res.status(200).json({ message: "success", user: result[0] });
                    } else if (err) {
                        res.status(400).json({ error: error.message })
                    }
                })
            }
        })
    } catch (error) {
        if (error.message) {
            res.status(200).json({ code: code, error: error.message })
        } else {
            res.status(400).json({ error: error.message })
        }
    }
})

router.get('/findUserById', async (req, res) => {
    const { iduser } = req.query;
    const searchQuery = "select * from prac.user where iduser = (?)"
    await db.query(searchQuery, [iduser], (error, result) => {
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(200).json({ user: result[0] })
        }
    })
})

module.exports = router;