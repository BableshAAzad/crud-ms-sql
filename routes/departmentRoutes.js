const express = require('express');
const DepartmentController = require("../controller/departmentController.js")
const router = express.Router();

router.post('/users/:userId/companies/:companyId/departments', DepartmentController.addDepartment)

module.exports = router
