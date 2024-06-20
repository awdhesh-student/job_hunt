import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const AllJobs = ({ userId }) => {
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    if (userId !== undefined) {
      try {
        const res = await axios.get(`http://localhost:8001/api/user/getalljobs/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setJobs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [userId]);

  const removeJob = async (jobId) => {
    try {
      const res = await axios.delete(`http://localhost:8001/api/user/deletejob/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.success) {
        message.success(res.data.message);
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <div className='card-containers'>
      {jobs.length > 0 ? jobs.map((job, i) => (
        <Card key={i} className="card m-3">
          <Card.Header>{job.jobTitle}</Card.Header>
          <Card.Body>
            <Card.Text>
              <b>Location:&nbsp;&nbsp;</b>{job.jobLocation} <br />
              <b>Skills:&nbsp;&nbsp;</b>{job.skills} <br />
              <b>Qualification:&nbsp;&nbsp;</b>{job.qualification} <br />
              <b>No. of Position:&nbsp;&nbsp;</b>{job.position} <br />
              <b>Type:&nbsp;&nbsp;</b>{job.jobType} <br />
              <b>Description:&nbsp;&nbsp;</b>{job.jobDescription}<br />
              <b>Approval:&nbsp;&nbsp;</b>{job.approve === false ? "not approved" : "approved"} <br />

            </Card.Text>
            <Button style={{ float: 'right' }} onClick={() => removeJob(job._id)} variant="outline-danger">Delete Job</Button>
          </Card.Body>
        </Card>
      )) : <p>No jobs has been posted</p>
      }
    </div>
  );
}

export default AllJobs;


