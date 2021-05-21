import logo from './logo.svg';
import {BrowserRouter as Router , Route , Switch, useHistory } from "react-router-dom";
import React, {useEffect, useState , useRef} from 'react';
import TopPageDesign from './components/topPageDesign'
import Homepage from './components/homepage.js'
import AddStudent from './components/adduserStudent'
import AddTeacher from './components/adduserTeacher'
import Login from './components/login.js'
import ProfilePage from './components/profilePage.js'
import currentUserContext from './context/userContext.js'

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios'
import moment from 'moment';
import playAlert from 'alert-sound-notify'

function App() {

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState({})
  const [newMeet, setNewMeet] = useState(0)
  const history = useHistory();
  const intervalIdRef = useRef();
  
  useEffect(() => {
    if(window.location.pathname === "/" || window.location.pathname === "/register" || window.location.pathname === "/login") return;
    console.log("APP.js useEffect is running-----");
    const previousUserJson = localStorage.getItem('user');
    const previousUser = JSON.parse(previousUserJson);
    if(previousUser) {
      const findUserById = async () => {
        let url = "http://localhost:5001/user/findUserById"

        try {
          const response = await axios.get(url , {
            params : {
            iduser : previousUser.iduser
            }
          })

          history.push(`${window.location.pathname}`)
          setUser(previousUser);
          
        } catch(err) {
          console.log(err)
          history.push('/login')
        }
      }

      findUserById();
    }else {
      history.push('/login')
    }

    
  }, [])


  // useEffect(() => {
  //   if(intervalIdRef.current) {
  //     clearInterval(intervalIdRef.current)
  //   }

  //   if(user) {

  //     const getNewMeetings = async () => {
  //       console.log(intervalIdRef.current)
  //       try {
  //         let url = "http://localhost:5000/meetings/newMeetings"
  //         let response = await axios.get(url, {
  //           params :{
  //             idUser : user.idUser
  //           }
  //         })
          
  //         const {meetings} = response.data;
  //         meetings.sort((meet1, meet2) => {
  //           return moment(meet1.startTime) - moment(meet2.startTime)
  //         })

  //         for(let meeting of meetings) {
  //           if(moment(meeting.startTime).diff(new moment()) <= 60000) {
  //             console.log('alert')
  //             playAlert('submarine')
  //             setOpen(true);
  //             break;
  //           }
  //         }
  //         console.log(meetings)
  //         setUpcomingMeetings(meetings)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
      
  //     intervalIdRef.current = setInterval(getNewMeetings, 60000)

  //     getNewMeetings()
      
  //   }
    
  // }, [user, newMeet])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <currentUserContext.Provider value = {{user, setUser, newMeet, setNewMeet, upcomingMeetings}}>
        <TopPageDesign />
        
        <Switch>
          <Route exact path = "/" component = {Homepage} />
        </Switch>
        <Switch>
          <Route exact path = '/login' component = {Login} />
        </Switch>
        
        <Switch>
          <Route exact path = '/profile' component = {ProfilePage} />
        </Switch>
        <Switch>
          <Route exact path = "/adduserStudent" component = {AddStudent} />
        </Switch>
        <Switch>
          <Route exact path = "/adduserTeacher" component = {AddTeacher} />
        </Switch>
        
      </currentUserContext.Provider>
      {/* <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You've a meeting scheduled to start in less than 1 minute"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      /> */}
    </React.Fragment>
  );
}

export default App;

