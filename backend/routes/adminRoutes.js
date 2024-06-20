const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUser,
  getAllRecruitersControllers,
  getStatusApproveController,
  getStatusRejectController,
  getAllJobsAdminController,
  deleteJobAdminController,
  getAllFeedbacksController,
  approveJobAdminController,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/getalluserdata", authMiddleware, getAllUser);

router.get("/getallrecruiterdata", authMiddleware, getAllRecruitersControllers);

router.post("/getapprove", authMiddleware, getStatusApproveController);

router.post("/getreject", authMiddleware, getStatusRejectController);

router.get("/getalljobsadmin", authMiddleware, getAllJobsAdminController);

router.put("/jobappove/:jobId", approveJobAdminController);

router.delete("/jobdelete/:jobId", authMiddleware, deleteJobAdminController);

router .get('/allfeedbacks', authMiddleware, getAllFeedbacksController)

module.exports = router;
