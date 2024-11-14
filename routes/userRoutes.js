const express = require('express');
const UserController = require("../controller/userController.js")
const router = express.Router();

router.post('/', UserController.addUser)
router.get('/:userId', UserController.getUser)
router.get("/", UserController.getAllUsers)
router.put("/:userId", UserController.updateUsers)
router.delete("/:userId", UserController.deleteUser)

module.exports = router
