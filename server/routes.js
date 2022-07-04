const router = require('express').Router()
const AuthController = require('./controllers/auth');
const authMiddleware = require('./controllers/auth-middleware')

//authentication
router.post('/login-mobile', AuthController.sentOTP)
router.post('/login-otp', AuthController.verifyOTP)


// generate new token

router.get('/refresh', AuthController.refresh); //if logged in

router.post('/logout', authMiddleware, AuthController.logout) //


module.exports = router;