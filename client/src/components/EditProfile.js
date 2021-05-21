import React,{useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container,Button,Card} from '@material-ui/core';
import TextInput from "@material-ui/core/TextField";

import axios from 'axios'
import currentUserContext from '../context/userContext'

const useStyles = makeStyles((theme) => ({
    container : {
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "flex-start",
        paddingTop : "40px",
        [theme.breakpoints.down("xs")] : {
          width : "90%",
          paddingTop :" 20px"
        }
    },
    head : {
        display : "flex",
        flexDirection : "column",
        margin: theme.spacing(1),
        marginBottom : theme.spacing(5),
        justifyContent : "start",
        alignItems : "center",
        [theme.breakpoints.down("sm")] : {
          width: "100%"
        }
    },
    name : {
        fontFamily: "emoji",
        fontWeight : "300",
        fontSize : 27,
        [theme.breakpoints.down("sm")] : {
          fontSize : 15
        }
    },
    card : {
        margin : 10,
        width : 600, 
        padding : "30px",
        display : "flex",
        alignItems : "center",
        flexDirection : "column",
        [theme.breakpoints.down("sm")] : {
          margin : 20,
          width : "100%"
        }
    },
    inputContainer : {
        marginTop : "20px",
        width : "100%",
        "& > div" : {
            width : "100%"   
        },
        [theme.breakpoints.down("sm")] : {
          marginTop : "10px"
        }
    },
    submitButton  : {
        marginTop : 30
    }
}));

const EditProfile = (props) => {
  const {changeSelectedMode,changeIndicatortab} = props
  const classes = useStyles();
  const {user,setUser} = useContext(currentUserContext)
  const [err, setErr] = useState({});
  const [nameValue,setNameValue] = useState(user.Name)
  const [emailValue , setEmailValue] = useState(user.Email)
  const [passwordValue , setPasswordValue] = useState("")
  const [newPasswordValue , setNewPasswordValue] = useState("")


  const changeNameValue = (e) => {
    setErr({})
    const {value} = e.target;
    setNameValue(value)
  }

  const changeEmailValue = (e) => {
    setErr({})
    const {value} = e.target;
    setEmailValue(value);
  }

  const changePasswordValue = (e) => {
    setErr({})
    const {value} = e.target;
    setPasswordValue(value);
  }

  const changeNewPasswordValue = (e) => {
    setErr({})  
    const {value} = e.target
    setNewPasswordValue(value)
  }

  const handleError =  (newerr) => {
    setErr(newerr)
  }

  const handleClick = async (e) => {
      setErr({})
    
      if(passwordValue !== user.Password) {
        setErr({code: 2, error : "The password is not correct"})
        return;
      }

      try {
        const url = `http://localhost:5001/user/updateProfile`
        const response = await axios.put(url, {
          iduser : user.iduser,
          Name : nameValue,
          Email : emailValue,
          Password : newPasswordValue
        })
        const updatedUser= response.data.user;
        if(updatedUser) {
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          alert('Your profile has been updated!')
          changeSelectedMode('Dashboard')
          changeIndicatortab(0);
        } 
        else {
          handleError(response.data);
        }

      } catch (error) {
        console.log(error)
      }


  }

  return (
    <Container className={classes.container}>
        <div className = {classes.header}>
            <div className = {classes.name}>
                EDIT PROFILE
            </div>
        </div>
        <Card className={classes.card}>
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={nameValue} onChange={changeNameValue} variant="outlined" label="Name" helperText={err.code === 0 ? err.error : ""}/>    
        </div> 
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={emailValue} onChange={changeEmailValue} variant="outlined" label="Email" helperText={err.code === 1 ? err.error : ""}/>    
        </div>
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={passwordValue} type="password" onChange={changePasswordValue} variant="outlined" label="Current Password" helperText={err.code === 2 ? err.error : ""}/>    
        </div> 
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={newPasswordValue} type="password" onChange={changeNewPasswordValue} variant="outlined" label="New Password" helperText={err.code === 3 ? err.error : ""}/>    
        </div> 
        <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleClick}>Confirm Update</Button>   
        </Card>
    </Container>
  );
}

export default EditProfile


// helperText={err.code === 0 ? err.error : ""}
// helperText={err.code === 1 ? err.error : ""}
// helperText={err.code === 2 ? err.error : ""}
// helperText={err.code === 3 ? err.error : ""}
// helperText={err.code === 4 ? err.error : ""}