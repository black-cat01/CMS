import react, {useContext} from "react";
import {useHistory} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import currentUserContext from "../context/userContext";


const useStyles = makeStyles((theme) => ({
    container : {
        minHeight : "10vh",
        minWidth : "100%",
        backgroundColor : "#f0f041",
        display : "flex",
        justifyContent : "space-between",
        alignItems : "Center",
        [theme.breakpoints.down("sm")] : {
            minHeight : "7vh"
        }
    }, 
    scheduleIcon : {
        fontSize : "40px",
        paddingLeft : "1.4rem",
        paddingRight : "1.4rem",
        [theme.breakpoints.down("sm")] : {
            fontSize : "30px",
            paddingLeft : "0.9rem",
            paddingRight : "0.7rem",
        }
    }, 
    heading : {
        fontSize : "35px",
        color : "#fff",
        fontWeight : "400",
        fontFamily : "ui-monospace",
        [theme.breakpoints.down("sm")] : {
            fontSize : "25px",
            fontWeight : 300
        }
    }, 
    Button : {
        marginRight : "15px",
        minWidth : "70px",
        textAlign : "center",
        maxHeight : "29px",
        fontSize : "12px",
        [theme.breakpoints.down("sm")] : {
            fontSize : "9px",
            marginRight : "7px",
            minWidth : "50px",
            maxHeight : "27px"
        }
    },
    chip : {
        marginRight : "15px",
        minWidth : "70px",
        textAlign : "center",
        minHeight : "30px",
        [theme.breakpoints.down("sm")] : {
            fontSize : "10px",
            marginRight : "7px",
            minWidth : "50px",
            maxHeight : "25px"
        }
    }
}))


const TopPageDesign = () => {
    const classes = useStyles()

    const {user, setUser} = useContext(currentUserContext)
    const history = useHistory()

    return (
        <Container className = {classes.container}>
            <div style={{display : "flex"}}>
                <CalendarTodayIcon className = {classes.scheduleIcon} style={{color:"black"}}/>
                <div className = {classes.heading} style={{color:"black"}}>
                    CMS
                </div>
            </div>
                {
                    user ?
                    <div style = {{display : "flex"}} style={{color:"#412378"}}>
                        <Chip
                            icon = {<FaceIcon/>}
                            label= {`${user.Name}`}
                            clickable
                            color="primary"
                            className = {classes.chip}
                        />
                        <Button variant="contained" color="primary" className = {classes.Button} onClick = {() => {
                            setUser(null)
                            localStorage.setItem('user', JSON.stringify(null))
                            history.push('/')
                        }}>
                            Log Out
                        </Button> 
                    </div>
                    :
                    <div style = {{display : "flex"}}>
                        <Button variant="contained" color="primary" className = {classes.Button} onClick = {() => history.push('/register')}>
                            Sign Up
                        </Button>
                        <Button variant="contained" color="primary" className = {classes.Button} onClick = {() => history.push('/login')}>
                            Log In
                        </Button> 
                    </div>
                }
        </Container>
    )
}

export default TopPageDesign;