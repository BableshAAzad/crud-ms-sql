const express = require('express');
const CompanyController = require("../controller/companyController.js")
const router = express.Router();

router.post('/users/:userId/companies', CompanyController.addCompany)

module.exports = router
