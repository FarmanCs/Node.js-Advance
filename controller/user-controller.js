const userModle = require('../models/user-model')
const tryCatchError = require('../utils/async-error')
const factory = require('./handler-factory')
const AppError = require('../utils/error')

//filter object funtion 
const filterObj = (obj, ...allowedFields) => {
   const newObj = {}
   Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el]
   })
   return newObj
}



//get user by id
exports.creatUser = tryCatchError(async (req, res, next) => {

   console.log("this rout does not working use singup insted");


   res.status(200).json({
      status: 'this rout does not work use singup instead',
      User
   })
})
//update the current user (updateMe)
exports.updateMe = tryCatchError(async (req, res, next) => {
   // 1 create error if user post password or data
   if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError("This rout is not for updatepassword, do use /updateMe-password route", 404
      ))
   }
   // 2 filtered out unwanted filed....
   const filteredBody = filterObj(req.body, 'name', 'email');
   // 3 update user document  
   const updateUser = await userModle.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true, runValidators: true
   })
   res.status(200).json({
      status: 'succes',
      data: {
         user: updateUser
      }
   })
})

exports.getMe = (req, res, next) => {
   req.params.id = req.user.id
   next()
}

//delete this user or delete me
exports.deleteMe = tryCatchError(async (req, res, next) => {
   await userModle.findByIdAndUpdate(req.user.id, { active: false })

   res.status(204).json({
      status: "success",
      data: null
   })
})

exports.get_Allusers = factory.getAll(userModle)
exports.get_user = factory.getOne(userModle)
exports.updateUser = factory.updateOne(userModle)
exports.deleteUser = factory.deleteOne(userModle)

