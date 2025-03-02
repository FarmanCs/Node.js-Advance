const tourModel = require('../models/tour-model')
const tryCatchError = require('../utils/async-error')


exports.getOverview = tryCatchError(async (req, res, next) => {
   // 1 get tour data from the collection
   const tours = await tourModel.find()
   // 2 build templete

   // 3 render the templete using tour data above
   res.status(200).render('overview', {
      title: "All Tours",
      tours
   })
})

exports.getTour = tryCatchError(async (req, res) => {
   // 1  get the data, for the requested tour
   const tour = await tourModel.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user'
   })
   // 2 build templet
   // 3 render the data 
   res.status(200).render('tour', {
      title: "The forest hiker",
      tour
   })
})