const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database.js');

const loginRouter = require('./routes/login.js');
const ClassesRouter = require('./routes/Classes.js');
const userRouter = require('./routes/user.js');
const adduserTeacherRouter = require('./routes/adduserTeacher.js');
const adduserStudentRouter = require('./routes/adduserStudent.js');
const addClassroomRouter = require('./routes/addClassroom.js');


const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/adduserTeacher', adduserTeacherRouter);
app.use('/adduserStudent', adduserStudentRouter);
app.use('/login', loginRouter);
app.use('/Classes', ClassesRouter);
app.use('/user', userRouter);
app.use('/addClassroom', addClassroomRouter);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)

    let sql = "SELECT * from user WHERE Type=(?)";
    db.query(sql, ["Admin"], async (err, result) => {
        if (err)
            console.log(err)
        else if (result.length > 0) {
            console.log("ADMIN present");
        }
        else {
            const addAd = "INSERT INTO user (Name, Email, Password, Type) VALUES (?,?,?,?)";
            await db.query(addAd, ["Admin Sharma", "adsharma202020@gmail.com", "abcabc", "Admin"], async (err1) => {
                if (err1) {
                    console.log(err1);
                }
            })
        }
    })

    const deleteEXpiredClasses = async () => {
        const now = new Date(new Date().getTime() + 330 * 60000)
        const nowString = now.toISOString().slice(0, 19).replace('T', ' ')
        const deletionQuery = "delete from prac.classbook where endTime < (?)"
        await db.query(deletionQuery, [nowString], (err, result) => {
            console.log(result);
        })
    }

    deleteEXpiredClasses()

    setInterval(() => deleteEXpiredClasses(), 60000);
})