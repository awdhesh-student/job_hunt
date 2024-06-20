const express = require("express");
const multer = require("multer");

const {
  feedbackController,
  registerController,
  loginController,
  authController,
  deleteallnotificationController,
  getallnotificationController,
  recruiterController,
  jobPostController,
  getAllJobsController,
  getAllJobsByRecruiterController,
  deleteJobRecruiterController,
  applyJobController,
  getAllJobsSeekerController,
  getAllApplicantsRecruiterController,
  resumeDownloadController,
  handleStatusRecruiterController,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


router.get('/alljobs',getAllJobsController)

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/feedback", feedbackController);

router.post("/getuserdata", authMiddleware, authController);

router.post("/register_recruiter", authMiddleware, recruiterController);

router.post(
  "/getallnotification",
  authMiddleware,
  getallnotificationController
);

router.post(
  "/deleteallnotification",
  authMiddleware,
  deleteallnotificationController
);

router.post('/jobposting', authMiddleware, jobPostController)

router.get('/getalljobs/:userId', authMiddleware, getAllJobsByRecruiterController)

router.delete('/deletejob/:jobId', authMiddleware, deleteJobRecruiterController)

router.post('/applyjob/:jobId',upload.single("resume"), authMiddleware, applyJobController)

router.get('/getallapplications/:userId', authMiddleware, getAllJobsSeekerController)

router.get('/getapplicant_recruiter/:recruiterId', authMiddleware, getAllApplicantsRecruiterController)

router.get('/getresumedownload', authMiddleware, resumeDownloadController)

router.post('/handlestatus', authMiddleware, handleStatusRecruiterController)
module.exports = router;