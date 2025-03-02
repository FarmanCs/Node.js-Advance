const express = require('express')

const userController = require("../controller/user-controller")
const userAuth = require('../controller/auth-controller')


const userRouter = express.Router()

userRouter.post('/singup', userAuth.singup)//simple mean to add user
userRouter.post('/login', userAuth.login)
userRouter.post('/forgot-Password', userAuth.forgotPassword)
userRouter.patch('/reset-Password/:token', userAuth.resetPassword)

//authentication protect middleware 
userRouter.use(userAuth.protect)

userRouter.get('/me', userController.getMe, userController.get_user)
userRouter.get('/:id', userController.get_user)
userRouter.get('/', userController.get_Allusers)

userRouter.use(userAuth.restrectTo('admin'))

userRouter.patch('/update-Password', userAuth.updatePassword)
userRouter.delete('/delete-me', userController.deleteMe)
userRouter.patch('/update-me', userController.updateMe)
userRouter.delete('/:id', userController.deleteUser)


module.exports = userRouter
