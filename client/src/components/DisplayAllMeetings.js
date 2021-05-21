import React,{useEffect,useState,useContext} from "react";
import currentUserContext from "../context/userContext"
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import axios from 'axios';
import { Typography } from '@material-ui/core';

import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    body : {
        display : "flex",
        flexDirection: "column",
        alignItems : "center",
        justifyContent : "flex-start",
        paddingTop : "40px",
        [theme.breakpoints.down("sm")] : {
            paddingTop : "20px",
            width: "90%",
            margin : "auto"
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
    container : {
        display : "flex",
        flexWrap : "wrap",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        width : "100%",
        marginTop : "20px",
    },
    tabContainer : {
        margin : "20px 0px"  
    },
    table : {
        textAlign : "center",
        border : "1px solid black",
        width : "70%",
        marginTop : 20,
        [theme.breakpoints.down("sm")] : {
            width : "100%",
            fontSize : 10
        }
    }, tableHead : {
        backgroundColor : "black",
        color : "#fff"
    }, tableRow : {
        height : "40px",
        fontSize : 15,
        margin : 3,
        [theme.breakpoints.down("xs")] : {
            fontSize : 8,
            height : "70px"
        }
    }
}));

const AllMeetings = () => {
    const classes = useStyles();
    const [meetings, setMeetings] = useState([])
    const {user} = useContext(currentUserContext)


    useEffect (() => {
        const getAllMeetings = async () => { 
            try {
            let url = "http://localhost:5001/Classes/allClassesAdmin"
            const response = await axios.get(url);

            const meets = response.data.classes
            
            meets.sort((meet1, meet2) => {
                return new moment(meet1.startTime) - new moment(meet2.startTime)
            })

            setMeetings(meets)
            console.log(response)
        } catch (error) {
            console.log(error)
        }}

        getAllMeetings()
    },[])

    function a11yProps(index) {
        return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }

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

    return (
        <div className = {classes.body}>
            <div className = {classes.head}>
                <div className = {classes.name}>
                    ALL BOOKED CLASSES
                </div>
            </div>
            {meetings ?
                meetings.length > 0
                ?
                <div className = {classes.container}>
                    <Table className = {classes.table}>
                        <Thead className = {classes.tableHead}>
                            <Tr className = {classes.tableRow}>
                            <Th>Class Name</Th>
                            <Th>ClassRoom Room</Th>
                            <Th>Start Time</Th>
                            <Th>End Time</Th>
                            <Th>Section</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {meetings.map((meeting) => (
                                    <Tr className = {classes.tableRow}>
                                    <Td>{meeting.course}</Td>
                                    <Td>{meeting.idroom}</Td>
                                    <Td>{new moment(meeting.startTime).format("DD-MM-YYYY HH:mm:ss")}</Td>
                                    <Td>{new moment(meeting.endTime).format("DD-MM-YYYY HH:mm:ss")}</Td>
                                    <Td>{meeting.section}</Td>
                                    </Tr>
                            ))}
                        </Tbody>

                    </Table> 
                </div>
                :
                <></>
            :
            <CircularProgress/>
            }
        </div>
    );
}

export default AllMeetings