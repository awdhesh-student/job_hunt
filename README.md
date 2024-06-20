## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/awdhesh-student/job_hunt.git
   cd job_hunt

   ```

2. Install backend dependencies:

   cd backend
   npm install

3. Install frontend dependencies:

   cd ../frontend
   npm install

4. Running the Project:
   Set up the environment variables. Create a .env file in the server directory and add the following variables:

   MONGO_DB=your_mongo_connection_string
   PORT=8001
   JWT_KEY=your_jwt_secret

   NOTE: `Replace your_mongo_connection_string and your_jwt_secret with your actual MongoDB connection string and JWT secret key.`

   Start the backend server:

   cd backend
   npm start
The server will start on port 8001

Start the frontend:

   cd ../frontend
   npm start
   The client will start on http://localhost:3000.

#### Roles and Responsibility

The project has 2 types of users Seeker and Recruiter and the other will be Admin which takes care of all the users. The roles and responsibilities of these two types of users can be inferred from the API endpoints defined in the code. Here is a summary:

Seeker:

1. Create an account and log in to the system using their email and password.
2. They will be shown automatically all the jobs in their dashboard if the app contains them.
3. After clicking on Apply Now, a form will be generated in which the job description and required skills will   be shown, and also form will appear for the application submission and documents needed to send.
4. They can see the status of their application and can get a notification if the application status changes.
5. They can send private messages to the Admin directly from the home page of the website.

Recruiter:

1. Create an account and log in to the system using their email and password.
2. Click on the ‘Apply as recruiter’ button present in the navbar for recruiter functionality.
3. Post a job after getting a recruiter account from admin and their posted job will approve by admin once and then appear in the jobs section as well as the home page.
4. They can also delete the job post
5. And also change the status of the applicant for the particular job post

Admin:
1. Gets the status approval of the recruiter account and job posting and all related functions.
2. Manages and watches all the applicants, recruiters, job posts, and all feedback coming from recruiters or seekers side.
