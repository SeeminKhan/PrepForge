const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const optionalAuthMiddleware = require("../middlewares/optionalAuth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")
const interviewRouter = express.Router()



/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access public (works for both authenticated and anonymous users)
 */
interviewRouter.post("/", optionalAuthMiddleware.optionalAuth, upload.single("resume"), interviewController.generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)



/**
 * @route PATCH /api/interview/:interviewId/status
 * @description update the status of an interview report for the Kanban board.
 * @access private
 */
interviewRouter.patch("/:interviewId/status", authMiddleware.authUser, interviewController.updateInterviewStatusController)

/**
 * @route POST /api/interview/save-anonymous
 * @description Save an anonymous interview report after user logs in
 * @access private
 */
interviewRouter.post("/save-anonymous", authMiddleware.authUser, interviewController.saveAnonymousReportController)

module.exports = interviewRouter