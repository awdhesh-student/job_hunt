import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import {
   MDBTabs,
   MDBTabsItem,
   MDBTabsLink,
   MDBTabsContent,
   MDBTabsPane
} from 'mdb-react-ui-kit';
import { Container, Button } from 'react-bootstrap';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons'

import AllUser from './AllUser';
import Notification from '../common/Notification';
import RecruiterStatus from './RecruiterStatus';
import AllJobs from './AllJobs';
import FeedBack from './FeedBack';


const AdminHome = () => {
   const [userdata, setUserData] = useState([])
   const [basicActive, setBasicActive] = useState('allusers');

   const handleBasicClick = (val) => {
      if (val === basicActive) {
         return;
      }
      setBasicActive(val);
   };

   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'))
      if (user) {
         setUserData(user)
      }
   }

   const getUserData = async () => {
      try {
         await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token')
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUser();
      getUserData();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/";
   }
   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand>
                  <h3>Job-Care</h3>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav>
                     <h5 className='mx-3'>Hi {userdata.firstname + " " + userdata.lastname}</h5>
                     <Badge className='notify' onClick={() => handleBasicClick('notification')} count={userdata?.notification ? userdata.notification.length : 0}>
                        <BellOutlined className='icon' />
                     </Badge>
                     <Button onClick={handleLogout} size='sm' variant='outline-danger' >Log Out</Button >
                  </Nav>

               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container>
            <MDBTabs className='my-4 mb-3'>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('allusers')} active={basicActive === 'allusers'}>
                     All Users
                  </MDBTabsLink>
               </MDBTabsItem>
               
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('recruiterstatus')} active={basicActive === 'recruiterstatus'}>
                     All Recruiter
                  </MDBTabsLink>
               </MDBTabsItem>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('notification')} active={basicActive === 'notification'}>
                     Notification
                  </MDBTabsLink>
               </MDBTabsItem>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('alljobs')} active={basicActive === 'alljobs'}>
                     All Jobs
                  </MDBTabsLink>
               </MDBTabsItem>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('allfeedback')} active={basicActive === 'allfeedback'}>
                     All Feedback
                  </MDBTabsLink>
               </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
               <MDBTabsPane show={basicActive === 'allusers'}><AllUser /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'notification'}><Notification /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'recruiterstatus'}><RecruiterStatus /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'alljobs'}><AllJobs /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'allfeedback'}><FeedBack /></MDBTabsPane>

            </MDBTabsContent>
         </Container>
      </>
   )
}

export default AdminHome

