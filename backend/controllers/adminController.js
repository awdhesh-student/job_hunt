const userSchema = require("../schemas/UserModel");
const feedbackSchema = require("../schemas/feedbackModel");
const recruiterSchema = require("../schemas/recruiterModel");
const jobSchema = require("../schemas/jobModel");
const applicationSchema = require("../schemas/applicationModel");

////////getting all user
const getAllUser = async (req, res) => {
  try {
    const users = await userSchema.find({});
    return res.status(200).send({
      message: "Users data list",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

///////getting all recruiter accounts
const getAllRecruitersControllers = async (req, res) => {
  try {
    const RecruiterUsers = await recruiterSchema.find({});
    return res.status(200).send({
      message: "Recruiter Users data list",
      success: true,
      data: RecruiterUsers,
    });
  } catch (error) {
    console
      .log(error)
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

//////setting status approve to all recruiter account
const getStatusApproveController = async (req, res) => {
  try {
    const { recruiterId, status, userid } = req.body;
    const recruiter = await recruiterSchema.findOneAndUpdate(
      { _id: recruiterId },
      { status }
    );

    const user = await userSchema.findOne({ _id: userid });

    const notification = user.notification;
    notification.push({
      type: "recruiter-account-approved",
      message: `Your Recruiter account has ${status}`,
    });

    user.isRecruiter = status === "approved" ? true : false;
    await user.save();
    await recruiter.save();

    return res.status(201).send({
      message: "Successfully update the approval status of the Recruiter!",
      success: true,
      data: recruiter,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

///////setting status rejected to all recruiter account
const getStatusRejectController = async (req, res) => {
  try {
    const { recruiterId, status, userid } = req.body;
    const recruiter = await recruiterSchema.findOneAndUpdate(
      { _id: recruiterId },
      { status }
    );

    const user = await userSchema.findOne({ _id: userid });

    const notification = user.notification;
    notification.push({
      type: "recruiter-account-rejected",
      message: `Your Recruiter account has ${status}`,
    });

    user.isRecruiter = status === "rejected" ? false : true;

    await user.save();
    await recruiter.save();

    return res.status(201).send({
      message:
        "Successfully updated the Rejected status of the Recruiter Account!",
      success: true,
      data: recruiter,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

const getAllJobsAdminController = async (req, res) => {
  try {
    const allJobs = await jobSchema.find();
    return res.status(200).send({
      message: "successfully fetched jobs",
      success: true,
      data: allJobs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

//////////job delete by admin
const deleteJobAdminController = async (req, res) => {
  try {
    const deleteJob = await jobSchema.findByIdAndDelete({
      _id: req.params.jobId,
    });

    const recruiter = await userSchema.findById({ _id: deleteJob.recruiterId });
    const notification = recruiter.notification.push({
      type: "delete-job",
      message: `Your ${deleteJob.jobTitle} job post has been deleted by Admin`,
    });

    await recruiter.save();

    return res.status(200).send({
      message: "Deleted Job Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

const approveJobAdminController = async (req, res) => {
  try {
    const approveJob = await jobSchema.findByIdAndUpdate(
      { _id: req.params.jobId },
      { $set: { approve: true } },
      { new: true }
    );

    const recruiter = await userSchema.findById({
      _id: approveJob.recruiterId,
    });
    const notification = recruiter.notification.push({
      type: "approve-job",
      message: `Your ${approveJob.jobTitle} job post has been approved by Admin`,
    });

    await recruiter.save();

    return res.status(200).send({
      message: "Job Approved Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};

//////getting feedbacks
const getAllFeedbacksController = async (req, res) => {
  try {
    const allFeedbacks = await feedbackSchema.find();
    return res.status(200).send({
      message: "All feedbacks are listed below",
      success: true,
      data: allFeedbacks,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "something went wrong", success: false });
  }
};
module.exports = {
  getAllUser,
  getAllRecruitersControllers,
  getStatusApproveController,
  getStatusRejectController,
  getAllJobsAdminController,
  deleteJobAdminController,
  getAllFeedbacksController,
  approveJobAdminController,
};
