import react from "react";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    Container : {
        height : "80vh",
        width  : "100%",
        backgroundImage : `url("https://image.freepik.com/free-vector/students-classroom-flat-vector-illustration_74855-6663.jpg")`,
    
        backgroundRepeat: "no-repeat",
        backgroundPosition: "25% 50%",
        backgroundSize: "40% 40%",
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
        width : "50%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "space-between",
        alignItems : "flex-end",
        marginLeft : 0,
        marginRight : "5%",
        [theme.breakpoints.down("sm")] : {
            width : "50%",
            margin : 0 
        },
        fontFamily: "Times New Roman",
        fontSize: "40px"
    },
    Button : {
        marginBottom : 20,
        marginTop: 10,
        borderRadius : "5px",
        transition: "all .1s ease-in-out",
        backgroundColor : "black",
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
}))

const HomePage = () => {
    const classes = useStyles();
    return (
        <div className = {classes.Container}>
            <Container className = {classes.btnContainer}>
                    {/* <Button variant="contained" className = {classes.Button}>
                        <Link to = "/register" className = {classes.toLink}> Register </Link>
                    </Button> */}
                    <p style={{marginLeft:'5px'}}>Manage your classrooms here.</p>
                    <Button variant="contained" className = {classes.Button}>
                        <Link to = "/login" className = {classes.toLink}> Login </Link>
                    </Button>
            </Container>
        </div>
    )
}

export default HomePage;