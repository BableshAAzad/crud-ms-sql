const express = require('express');
const UserController = require("../controller/userController.js")
const router = express.Router();

router.post('/users', UserController.addUser)
router.get('/users/:userId', UserController.getUser)
router.get("/users", UserController.getAllUsers)
router.put("/users/:userId", UserController.updateUsers)
router.delete("/users/:userId", UserController.deleteUser)

module.exports = router
