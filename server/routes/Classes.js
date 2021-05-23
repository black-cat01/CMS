const express = require('express');
const validator = require('validator');
const db = require('../database.js');
var nodemailer = require('nodemailer');
const { transporter, sendEmail } = require('../email.js')

const router = express.Router();

//let classRooms = [1, 2, 3, 4, 5];
router.post('/bookClassroom', async (req, res) => {
    const { idroom, idteacher, title, startTime, endTime, section, course } = req.body;



    let tclassclash = "select * from prac.classbook  where (idteacher = (?)) and ((startTime >= (?) and startTime < (?)) or (endTime > (?) and endTime <= (?)) or (startTime <= (?)  and endTime >= (?)))"
    db.query(tclassclash, [idteacher, startTime, endTime, startTime, endTime, startTime, endTime], async (err, result) => {
        if (!err && result.length > 0) {
            res.status(200).json({ message: "You already have classes scheduled in the given duration" });
        }
        else if (err) {
            res.status(400).json({ error: err1.message });
        }
        else {
            let sclassclash = "select * from prac.classbook  where (section = (?)) and ((startTime >= (?) and startTime < (?)) or (endTime > (?) and endTime <= (?)) or (startTime <= (?)  and endTime >= (?)))";
            db.query(sclassclash, [section, startTime, endTime, startTime, endTime, startTime, endTime], async (err, result) => {
                if (!err && result.length > 0) {
                    res.status(200).json({ message: "The mentioned section has a class in the duration" });
                }
                else if (err) {
                    res.status(400).json({ error: err1.message });
                }
                else {
                    let sqlQuery = "select idroom, idteacher, title, startTime, endTime, section, course from prac.classbook where (idroom = (?)) and ((startTime >= (?) and startTime < (?)) or (endTime > (?) and endTime <= (?)) or (startTime <= (?)  and endTime >= (?)))";

                    db.query(sqlQuery, [idroom, startTime, endTime, startTime, endTime, startTime, endTime], async (err, result) => {
                        if (!err && result.length > 0) {
                            let availableClassRooms = [];
                            let sqlQueryrooms = "select idrooms from prac.rooms";
                            db.query(sqlQueryrooms, [], async (err1, classRooms) => {
                                classRooms = JSON.parse(JSON.stringify(classRooms));
                                classRooms = classRooms.map(({ idrooms }) => idrooms)
                                if (err1) {
                                    console.log(err1);
                                } else if (!(classRooms.length > 0)) {
                                    res.status(200).json({ message: "No rooms registered." });
                                }
                                else {
                                    console.log(classRooms);
                                    classRooms.forEach(async (classRoom) => {
                                        await db.query(sqlQuery, [classRoom, startTime, endTime, startTime, endTime, startTime, endTime], async (error, searchResult) => {
                                            if (!searchResult.length) {
                                                //console.log(classRoom);
                                                availableClassRooms.push(classRoom);
                                            }
                                            if (classRooms.indexOf(classRoom) === classRooms.length - 1) {
                                                res.status(200).json({ classesAlreadyScheduled: result, availableClassRooms });
                                            }
                                        });
                                    });
                                }
                            });

                            // res.status(200).json({meetingAlreadyScheduled : result, availableMeetRooms});
                        } else if (!err) {
                            sqlQuery = "INSERT INTO classbook (idroom, idteacher,  title, startTime, endTime, section, course) VALUES (?,?,?,?,?,?,?)";
                            await db.query(sqlQuery, [idroom, idteacher, title, startTime, endTime, section, course], async (err1, result) => {
                                if (err1) {
                                    res.status(400).json({ error: err1.message });
                                } else {
                                    console.log(result);

                                    let sql1 = "SELECT Email FROM user WHERE Section=(?) and Type=(?)";
                                    db.query(sql1, [section, "Student"], async (err1, Emails) => {

                                        if (err1)
                                            console.log(err1);
                                        else {
                                            console.log(Emails);
                                            Emails = JSON.parse(JSON.stringify(Emails));
                                            Emails.forEach(async (Email) => {
                                                console.log(Email);
                                                const mailOptions = {
                                                    from: "ClassroomManagementSystems@outlook.com",
                                                    to: Email.Email,
                                                    subject: "Class Scheduled.",
                                                    text: "You have a class scheduled for the course " + course + " in Room No. " + idroom + " in CC3.\nStart Time: " + startTime.replace('T', ' ') + "\nEnd Time: " + endTime.replace('T', ' ')
                                                };

                                                sendEmail(transporter, mailOptions);
                                            });
                                        }
                                    });



                                }
                            });
                            res.status(200).json({ message: "success" });
                        }
                        //res.status(200).json({ message: "success" });
                    });
                }
            });
        }

    })








})



router.get('/myClassesStudent', async (req, res) => {
    const { iduser } = req.query

    let sectionQuery = "select section from prac.user where iduser=(?)";
    await db.query(sectionQuery, [iduser], async (errorSec, result) => {
        console.log(result[0].section)
        if (errorSec) {
            res.status(400).json({ error: error.message });
        } else {
            let searchQuery = "select idroom, idteacher, title, startTime, endTime, section, course from prac.classbook where section = (?)";
            await db.query(searchQuery, [result[0].section], async (error, classes) => {
                console.log(classes)
                if (error) {
                    res.status(400).json({ error: error.message });
                } else {
                    res.status(200).json({ classes: classes });
                }
            })
        }
    })
})


router.get('/myClassesTeacher', async (req, res) => {
    const { iduser } = req.query
    let searchQuery = "select idroom, idteacher, title, startTime, endTime, section, course from prac.classbook where idteacher = (?)";
    db.query(searchQuery, [iduser], (error, result) => {
        console.log(result)
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json({ classes: result });
        }
    })
})


router.get('/allClassesAdmin', async (req, res) => {
    const searchQuery = "select * from prac.classbook"
    await db.query(searchQuery, [], (error, result) => {
        if (error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json({ classes: result });
        }
    })
})




router.get('/allClassrooms', async (req, res) => {

    let sqlallrooms = "SELECT idrooms FROM rooms"
    db.query(sqlallrooms, [], (err, result) => {

        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            result = result.map(({ idrooms }) => idrooms)
            console.log(result);
            res.status(200).json({ allclassRooms: result });
        }
    })
})




module.exports = router;