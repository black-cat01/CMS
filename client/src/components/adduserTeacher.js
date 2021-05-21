import React , {useState} from "react";
import {Link} from "react-router-dom";
import { Card, Container } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextInput from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    container : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        minHeight : "90vh"
    },
    card : {
       width : 600, 
       padding : "30px",
       display : "flex",
       alignItems : "center",
       flexDirection : "column"
    },
    header : {
       fontWeight : "bold",
       color : "#0846B0",
       fontSize : "25px",
       textAlign : "center",
       fontFamily : "emoji"
    },
    tabContainer : {
       margin : "20px 0px"  
    },
    inputContainer : {
        marginTop : "20px",
        width : "100%",
        "& > div" : {
            width : "100%"   
        }
    },
    submitButton  : {
        margin : 30
    }
}))

const TabPanel = ({index , value}) => {
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
       {/* {value === index ? `index ${index}` : ""} */}
      </div>
    )
}

const AddTeacher = () => {
  const [value, setValue] = useState(0)
  const [err, seterr] = useState({});
  const [nameValue, setNameValue] = useState("")
  const [emailValue , setEmailValue] = useState("")
  const [passwordValue , setPasswordValue] = useState("")
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
  }

  const changeNameValue = (e) => {
    const {value} = e.target;
    setNameValue(value)
  }

  const changeEmailValue = (e) => {
   const {value} = e.target;
   setEmailValue(value);
  }

  const changePasswordValue = (e) => {
    const {value} = e.target;
    setPasswordValue(value);
  }

  const handleError =  (newerr) => {
     seterr(newerr)
  }

  const handleClick = async () => {
    handleError({})
    const url = "http://localhost:5001/adduserTeacher"
    const userCategory = 'Teacher' 
    try {
          const response = await axios.post(url, {
            Name : nameValue,
            Email : emailValue,
            Password : passwordValue,
            Type : userCategory
          })

          const {code, error} = response.data;
          if(response.data.message === "success") {
              alert('Registration Sucessfull!')
              history.push('/Profile');
          }
          seterr({code, error}) 
          console.log(response)
    } catch (err) {
        console.log(err)
    }

  }

  const classes = useStyles()  
  return (
      <Container className={classes.container}>
      <Card className={classes.card}>
         <div className={classes.header}>Register a</div>
         <Tabs className={classes.tabContainer} value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Teacher" />
        </Tabs>
        
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={nameValue} onChange={changeNameValue} variant="outlined" label="Name" helperText={err.code === 0 ? err.error : ""}/>    
        </div> 
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={emailValue} onChange={changeEmailValue} variant="outlined" label="Email" helperText={err.code === 1 ? err.error : ""}/>    
        </div>
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={passwordValue} type="password" onChange={changePasswordValue} variant="outlined" label="Password" helperText={err.code === 2 ? err.error : ""}/>    
        </div> 
        <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleClick}>Create Your Account</Button>   

        
      </Card>
      </Container>
  )
}



export default AddTeacher