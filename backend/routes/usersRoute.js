const express = require('express')
const { loginUser, registerUsers, getUsers, getUser, LogOutUser } = require('../controllers/usersControllers')
const router = express.Router()

router.get('/', getUsers)
router.get('/get', getUser)
router.get('/logout', LogOutUser)
router.post('/login', loginUser)
router.post('/register', registerUsers)

module.exports = router