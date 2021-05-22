import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { Card, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import TextInput from "@material-ui/core/TextField"

import { useHistory } from "react-router-dom";
import axios from 'axios';
import currentUserContext from '../context/userContext'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 300,
    padding: "30px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  header: {
    fontWeight: "bold",
    color: "#0846B0",
    fontSize: "25px",
    textAlign: "center",
    fontFamily: "emoji"
  },
  tabContainer: {
    margin: "20px 0px"
  },
  inputContainer: {
    marginTop: "20px",
    width: "100%",
    "& > div": {
      width: "100%"
    }
  },
  submitButton: {
    margin: 30,
    minWidth: "100%"
  }
}))


const Login = () => {
  const { user, setUser, roomId, setRoomId } = useContext(currentUserContext)
  const [value, setValue] = useState(0)
  const [err, seterr] = useState({})
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const history = useHistory();


  const changeEmailValue = (e) => {
    const { value } = e.target;
    setEmailValue(value);
  }

  const changePasswordValue = (e) => {
    const { value } = e.target;
    setPasswordValue(value);
  }

  const handleError = (newerr) => {
    seterr(newerr);
  }

  const setNewUser = (newUser) => {
    setUser(newUser);
  }

  const handleClick = async (e) => {
    handleError({})
    let url = "http://localhost:5001/login"
    try {
      let response = await axios.post(url, {
        Email: emailValue,
        Password: passwordValue,
      })
      const { message, user, code, error } = response.data;
      console.log(user)
      if (message === "success") {
        url = "http://localhost:5001/Classes/allClassrooms"
        response = await axios.get(url)
        const { allClassrooms, error } = response.data
        setRoomId(allClassrooms)
        setNewUser(user);
        localStorage.setItem('user', JSON.stringify(user));

        history.push('/Profile')
      } else {
        handleError({ code, error });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.header}>Login To MeetHere</div>
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={emailValue} onChange={changeEmailValue} variant="outlined" label="Email" helperText={err.code === 0 ? err.error : ""} />
        </div>
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={passwordValue} type="password" onChange={changePasswordValue} variant="outlined" label="Password" helperText={err.code === 1 ? err.error : ""} />
        </div>
        <Button className={classes.submitButton} variant="contained" color="primary" onClick={handleClick}>Login</Button>


      </Card>
    </Container>
  )
}



export default Login