const Router = require('express');
const router = new Router();
const controller = require('./authController');
const authMiddleware = require('./middleware/authMiddleware')

router.post('/sign-up', controller.registration)
router.post('/sign-in', controller.login)
router.get('/me', authMiddleware, controller.getInf)


module.exports = router;