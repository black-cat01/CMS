import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "40px",
        [theme.breakpoints.down("sm")]: {
            paddingTop: "20px",
            width: "90%",
            margin: "auto"
        }
    },
    head: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(1),
        marginBottom: theme.spacing(5),
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
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px",
    },
    paper: {
        margin: "auto",
        position: 'absolute',
        width: "60%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3, 4),
    },
    tabContainer: {
        margin: "20px 0px"
    },
    table: {
        textAlign: "center",
        border: "1px solid black",
        width: "90%",
        marginTop: 20,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            fontSize: 10
        }
    }, tableHead: {
        backgroundColor: "black",
        color: "#fff"
    }, tableRow: {
        height: "40px",
        fontSize: 15,
        margin: 3,
        [theme.breakpoints.down("sm")]: {
            fontSize: 8
        }
    }, root: {
        flexGrow: 1,
        marginTop: 20,
        minWidth: "20%",
        minHeight: 400,
        [theme.breakpoints.down("xs")]: {
            minWidth: "80%",
        }
    }

}));

const ModelInfo = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const { availableClassRooms, classesAlreadyScheduled } = props

    console.log(classesAlreadyScheduled)

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const TabPanel = ({ index, value }) => {
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div className={classes.body}>
            <div className={classes.paper}>
                <div className={classes.container}>
                    <Tabs className={classes.tabContainer} value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                        <Tab label="Pre Planned Meetings" {...a11yProps(0)} />
                        <Tab label="Available Meeting Rooms" {...a11yProps(1)} />
                    </Tabs>
                    {value === 0 ?
                        <Table className={classes.table}>
                            <Thead className={classes.tableHead}>
                                <Tr className={classes.tableRow}>
                                    <Th>Course Name</Th>
                                    <Th>Title</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {classesAlreadyScheduled.map((prePlannedMeeting) => (
                                    <Tr className={classes.tableRow}>
                                        <Td>{prePlannedMeeting.course}</Td>
                                        <Td>{prePlannedMeeting.title}</Td>

                                    </Tr>
                                ))}
                            </Tbody>

                        </Table> : <></>
                    }
                    {
                        value === 1 ?
                            <Table className={classes.table}>
                                <Thead className={classes.tableHead}>
                                    <Tr className={classes.tableRow}>
                                        <Th>Class Rooms Available</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {availableClassRooms.map((availableClassRoom) => (
                                        <Tr className={classes.tableRow}>
                                            <Td>Room No. {availableClassRoom}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            :
                            <></>
                    }

                </div>
            </div>
        </div>
    );
}

export default ModelInfo