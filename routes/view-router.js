const express = require('express')
const viewController = require('../controller/view-controller')
const authController = require('../controller/auth-controller')
const router = express.Router()


router.get('/', viewController.getOverview)

router.get('/tour/:slug', authController.protect, viewController.getTour)
router.get('/login', viewController.getLoginForm)

module.exports = router