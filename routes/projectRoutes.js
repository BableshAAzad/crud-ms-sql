const express = require('express');
const ProjectController = require("../controller/projectController.js")
const router = express.Router();

router.post('/users/:userId/departments/:departmentId/projects', ProjectController.addProject)

module.exports = router
