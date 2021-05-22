import "date-fns";
import React, { useState, useContext } from "react";
import currentUserContext from "../context/userContext"

import ModelInfo from "./ModelInfo.js"

import axios from "axios"

import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import TextInput from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import { Chip, CircularProgress, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifycontent: "flex-start",
    paddingTop: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "20px",
    }
  },
  head: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    justifyContent: "start",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  name: {
    fontFamily: "emoji",
    fontWeight: "300",
    fontSize: 27,
    [theme.breakpoints.down("sm")]: {
      fontSize: 15
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 215,
  },
  submitButton: {
    margin: 30,
  },
  inputFields: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    margin: theme.spacing(3),
    "&>div": {
      width: "35%"
    },
    [theme.breakpoints.down("xs")]: {
      "&>div": {
        width: "80%",
        marginBottom: theme.spacing(1)
      }
    }
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      "&>*": {
        fontSize: "10px"
      }
    }
  },
  timeInput: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px"
    }
  },
  select: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      height: "30px",
      alignItems: "center"
    }
  },
  container: {
    display: "flex",
    minHeight: '200px',
    width: "50%",
    justifyContent: "center"
  },
  paper: {
    display: "flex",
    minHeight: '150px',
    width: "50%",
    marginBottom: "20px",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      minHeight: "120px"
    }
  },
  chip: {
    marginRight: "10px",
    marginBottom: "10px",
    fontSize: "12px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      marginRight: "7px",
      marginBottom: "7px"
    }
  },
  submitButton: {
    margin: "40px",
    
  },
  card: {
    width: 600,
    padding: "30px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  tabContainer: {
    margin: "20px 0px"
  },
}))


const AddNewMeeting = (props) => {
  const classes = useStyles()
  const { user, newMeet, setNewMeet, roomId } = useContext(currentUserContext)
  const { changeSelectedMode, changeIndicatortab } = props
  const localDate = new Date(new Date().getTime() + 330 * 60000);
  const [err, setErr] = useState({})
  const [startDate, setStartDate] = useState(localDate.toISOString().slice(0, 19));
  const [endDate, setEndDate] = useState(localDate.toISOString().slice(0, 19));
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [roomid, setRoomid] = useState(1)
  const [section, setSectionValue] = useState("A")
  const [open, setOpen] = useState(false)
  const [prePlannedClasses, setprePlannedClasses] = useState([])
  const [availableClassrooms, setAvailableClassrooms] = useState([])
  const [openLoader, setOpenLoader] = useState(false)
  const changeNameValue = (e) => {
    setErr({})
    const { value } = e.target
    setNameValue(value)
  }

  const changeDescriptionValue = (e) => {
    setErr({})
    const { value } = e.target
    setDescriptionValue(value)
  }

  const handleRoomChange = (e) => {
    const { value } = e.target
    setRoomid(value)
  }

  const handleSectionChange = (e) => {
    const { value } = e.target
    setSectionValue(value)
  }




  const handleSubmit = async () => {

    if (nameValue.length === 0) {
      setErr({ code: 0, error: "Meeting Name Feild is mandatory" })
      return;
    }


    if (descriptionValue.length === 0) {
      setErr({ code: 1, error: "Meeting Desciption Feild is mandatory" })
      return;
    }

    if (endDate < startDate) {
      alert("Invalid Meeting Times.")
      return;
    }

    setOpenLoader(true)

    let url = "http://localhost:5001/Classes/bookClassroom"
    try {
      const response = await axios.post(url, {
        idroom: roomId[roomid - 1],
        idteacher: user.iduser,
        title: descriptionValue,
        startTime: startDate,
        endTime: endDate,
        section: section,
        course: nameValue
      })

      console.log(response)
      setOpenLoader(false)
      const { message, availableClassRooms, classesAlreadyScheduled } = response.data
      if (message === "You already have classes scheduled in the given duration") {
        alert("You already have classes scheduled in the given duration")
      }

      if (message === "The mentioned section has a class in the duration") {
        alert("The mentioned section has a class in the duration")
      }

      if (message === "success") {

        alert("New Meeting has been created")
        changeIndicatortab(0)
        changeSelectedMode("Dashboard")
        setNewMeet(newMeet + 1)
        return;
      }

      if (classesAlreadyScheduled.length > 0) {
        setprePlannedClasses(classesAlreadyScheduled)
        setAvailableClassrooms(availableClassRooms)
        setOpen(true)
      }




    } catch (error) {
      setOpenLoader(false)

      console.log(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (roomId) {
    console.log(roomId);
  }

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <div className={classes.name}>
          BOOK A NEW CLASSROOM
        </div>
      </div>
      <Grid container justify="space-around">
        <TextField
          id="datetime-local"
          label="Class Start Time"
          type="datetime-local"
          inputProps={{ min: `${localDate.toISOString().slice(0, 19)}` }}
          value={startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.timeInput}
          onChange={(e) => {
            setStartDate(e.target.value);
            setErr({})
          }}
        />
        <TextField
          id="datetime-local"
          label="Class End Time"
          type="datetime-local"
          inputProps={{ min: `${localDate.toISOString().slice(0, 19)}` }}
          value={endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.timeInput}
          onChange={(e) => {
            setEndDate(e.target.value);
            setErr({})
          }}
          onBlur={(e) => {
            if (e.target.value < startDate) {
              alert("Invalid Ending Time. Class can't end before it starts")
              setEndDate(`${localDate.toISOString().slice(0, 19)}`)
              return;
            }
            setEndDate(e.target.value);
          }}
        />
        <div className={classes.select}>
          <InputLabel id="demo-simple-select-label" style={{ fontSize: "12px" }}>ClassRoom</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={roomid}
            onChange={handleRoomChange}
          > {roomId ?
            roomId.map((id) =>
              <MenuItem value={roomId.indexOf(id) + 1}>Room{id} </MenuItem>
            ) :
            <></>
            }
          </Select>
        </div>
      </Grid>
      <div className={classes.inputFields}>
        <TextInput required id="standard-required" value={nameValue} onChange={changeNameValue} variant="outlined" label="Name of the Course" helperText={err.code === 0 ? err.error : ""} />
        <TextInput required id="standard-required" value={descriptionValue} onChange={changeDescriptionValue} variant="outlined" label="Description of the Class" helperText={err.code === 1 ? err.error : ""} />
      </div>
      <div className={classes.select}>
        <InputLabel id="demo-simple-select-label1" style={{ fontSize: "12px" }}>Section</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select"
          value={section}
          onChange={handleSectionChange}
        >
          <MenuItem value={'A'}>Section A</MenuItem>
          <MenuItem value={'B'}>Section B</MenuItem>
          <MenuItem value={'C'}>Section C</MenuItem>
        </Select>
      </div>
      <div className={classes.submitButton}><Button onClick={handleSubmit} variant="contained" color="primary">Book the Class</Button></div>
      {
        openLoader ?
          <CircularProgress />
          : <></>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModelInfo availableClassRooms={availableClassrooms} classesAlreadyScheduled={prePlannedClasses} />

      </Modal>

    </div>
  );
}

export default AddNewMeeting