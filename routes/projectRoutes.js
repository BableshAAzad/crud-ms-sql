const express = require('express');
const ProjectController = require("../controller/projectController.js")
const router = express.Router();

router.post('/users/:userId/departments/:departmentId/projects', ProjectController.addProject)
router.get('/projects/:projectId', ProjectController.getProject)
router.get("/projects/:projectId/user-names", ProjectController.getUserNames)

module.exports = router
