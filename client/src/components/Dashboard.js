import react, {useContext,useHistory} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {blueGrey} from '@material-ui/core/colors';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import currentUserContext from '../context/userContext';
import moment from 'moment'
import { Button, CircularProgress } from '@material-ui/core';
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#fff",
        minHeight : "80vh",
        margin: 0,
        paddingTop : "40px",
        [theme.breakpoints.down("sm")] : {
            paddingTop : "20px",
            width:  "100%"
        }
    },
    head : {
        display : "flex",
        flexDirection : "column",
        margin: theme.spacing(1),
        justifyContent : "start",
        alignItems : "center"
    },
    icon: {
        width: theme.spacing(14),
        height: theme.spacing(14),
        color: '#fff',
        backgroundColor: blueGrey[500],
        marginBottom : 20,
        fontSize : "120px",
        [theme.breakpoints.down("sm")] : {
            width: theme.spacing(9),
            height: theme.spacing(9)
        }
    }, name : {
        fontFamily: "emoji",
        fontWeight : "300",
        fontSize : 22,
        [theme.breakpoints.down("sm")] : {
            fontSize : 12
        }
    }, body : {
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "center",
        alignItems : "center",
        width : "100%",
        marginTop : 50
    }, card: {
        width : "50%",
        padding : 10,
        [theme.breakpoints.down("sm")] : {
            padding : 0,
            width : "80%"
        }
    }, cardHeader : {
        marginBottom: 16,
        fontSize : 20,
        textAlign : "center",
        [theme.breakpoints.down("sm")] : {
            fontSize : 12
        }
    },
    pos: {
        marginBottom: 10,
        fontSize : 15,
        [theme.breakpoints.down("sm")] : {
            fontSize : 10
        }
    }, 
    Container : {
        height : "80vh",
        width  : "100%",
        backgroundImage : `url("https://images.unsplash.com/photo-1486848538113-ce1a4923fbc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "80% 80%",
        backgroundAttachment: "fixed",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center",
        flexWrap : "wrap",
        [theme.breakpoints.down("sm")] : {
            flexDirection : "column",
            backgroundSize : "100% 50%",
            alignItems:  "center",
            padding : 0
        }
    },
    btnContainer : {
        width : "100%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "flex-end",
        marginLeft : 0,
        marginRight :0,
        [theme.breakpoints.down("sm")] : {
            width : "50%",
            margin : 0 
        },
        margin: theme.spacing(5)
    },
    Button : {
        marginBottom : 20,
        borderRadius : "5px",
        transition: "all .1s ease-in-out",
        backgroundColor : "#2B65EC",
        minWidth : "150px",
        marginRight : "20px",
        "&:hover" : {
            backgroundColor : "#306EFF",
            boxShadow: "inset -.1rem -.15rem 0 .1rem rgba(0,0,0,.2)",
            transform: "translateY(-.1rem) scale(1.02)"
        }, 
        [theme.breakpoints.down("sm")] : {
            width : "100%",
            alignItems : "center",
            borderRadius : "2px",
            miWidth : "100px"
        }
    }, 
    toLink : {
        textDecoration : "None", 
        fontSize : "15px",
        color : "#fff",
        fontWeight : "800",
        fontFamily : "emoji",
        width : "100%",
        height : "100%",
        textAlign : "center",
        [theme.breakpoints.down("sm")] : {
            fontSize : "10px"
        }
    }
}));

const Dashboard = (props) => {
    const classes = useStyles()
    const {changeSelectedMode,changeIndicatortab} = props
    const {user} = useContext(currentUserContext);

    const handleClick = () => {
        changeSelectedMode("View My Meetings")
        changeIndicatortab(3)
    }

    return (
        <div className = {classes.root} >
            {user ? 
            <div className = {classes.head}>
                <Avatar className = {classes.icon}>
                    <ProfileIcon style = {{fontSize : "120px"}}/>
                </Avatar>
                <div className = {classes.name} style = {{marginBottom : "15px"}}>
                    {user.Name ? user.Name.toUpperCase() : ""}
                </div>
                <div className = {classes.name}>
                    {user.Email ? user.Email : ""}
                </div>
                <div className = {classes.name}>
                    {user.organisation ? user.organisation : ""}
                </div>
                {user.Type === "Admin" ?  <div >
                <Container className = {classes.btnContainer}>
                        <Button variant="contained" className = {classes.Button}>
                            <Link to = "/adduserStudent" className = {classes.toLink}> Register Student </Link>
                        </Button>
    
                        <Button variant="contained" className = {classes.Button}>
                            <Link to = "/adduserTeacher" className = {classes.toLink}> Register Teacher </Link>
                        </Button>
                </Container>
            </div> : <></>
                }
            </div>
            
            :
            <CircularProgress/>
            }
             
        </div>
    )
}

export default Dashboard