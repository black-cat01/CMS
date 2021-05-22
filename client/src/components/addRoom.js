import React , {useState , useContext} from "react";
import {Link} from "react-router-dom";
import { Card, Container } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextInput from "@material-ui/core/TextField";
import {useHistory} from "react-router-dom";
import FormHelperText from '@material-ui/core/FormHelperText';
import currentUserContext from "../context/userContext"

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
        margin : 30,
        backgroundColor : "black"
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

const AddRoom = () => {
  const [value, setValue] = useState(0)
  const [err, seterr] = useState({});
  const [nameValue, setNameValue] = useState("")
  const {roomid, setRoomid}= useContext(currentUserContext)
  
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

  

  const handleError =  (newerr) => {
     seterr(newerr)
  }

  const handleClick = async () => {
    handleError({})
    const url = "http://localhost:5001/addClassroom"
    
    try {
          const response = await axios.post(url)

          const {code, error} = response.data;
          if(response.data.message === "success") {
              alert('Classroom Sucessfully Added!')
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
         <div className={classes.header}>Add a</div>
         <Tabs className={classes.tabContainer} value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="ClassRoom" {...a11yProps(0)} />
        </Tabs>
        
        {/* <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={nameValue} onChange={changeNameValue} variant="outlined" label="RoomNo." helperText={err.code === 0 ? err.error : ""}/>    
        </div>  */}
        
        
        <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleClick}>Submit</Button>   

        
      </Card>
      </Container>
  )
}



export default AddRoom