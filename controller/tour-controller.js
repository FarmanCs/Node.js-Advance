const tourModle = require("../models/tour-model")
// const APIFeaturs = require("../utils/api-features")
const tryCatchError = require("../utils/async-error")
const AppError = require("../utils/error")
const factory = require('./handler-factory')

exports.top_Cheap = (req, res, next) => {
   req.query.limit = '5'
   req.query.sort = '-ratingAverage,price'
   req.query.fields = 'name,ratingAvverage,price,difficulty,summary'

   next()
}

exports.getAllTours = factory.getAll(tourModle)

exports.get_Tour = factory.getOne(tourModle, { path: 'reviews' })
exports.addTours = factory.createOne(tourModle)
exports.updateTour = factory.updateOne(tourModle)
exports.deleteTour = factory.deleteOne(tourModle)

exports.getTourStates = tryCatchError(async (req, res) => {
   const state = await tourModle.aggregate([
      {
         $match: { ratingAverage: { $gte: 4.5 } }
      },
      {
         $group: {
            _id: { $toUpper: '$difficulty' },//get grouph name in uppercase
            // _id: '$difficulty',
            // _id: '$ratingAverage',
            // _id: '$price',
            numTour: { $sum: 1 },
            numRating: { $sum: '$ratingQuantaty' },
            avgRating: { $avg: '$ratingAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' }
         }
      },
      {
         $sort: { avgPrice: 1 }
      },
      {
         $match: { _id: { $ne: 'EASY' } }
      }
   ])
   res.status(201).json({
      status: 'succes...',
      Data: state
   })
})

exports.get_tour_plan = tryCatchError(async (req, res) => {
   const year = req.params.year * 1
   const plan = await tourModle.aggregate([
      {
         $unwind:
            '$startDates'
      },
      {
         $match: {
            startDates: {
               $gte: new Date(`${year}-01-01`),
               $lte: new Date(`${year}-12-31`)
            }
         }
      },
      {
         $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' }
         }
      },
      {
         $addFields: {
            month: '$_id'
         }
      },
      {
         $project: {
            _id: 0
         }
      },
      {
         $sort: {
            numTourStarts: -1
         }
      },
      {
         $limit: 10//this thing is got to use becasue this will limit the output result to the number you pass to it here is 10, so you will see 10 result in the output
      }
   ])

   res.status(200).json({
      status: 'succes...',
      total: plan.length,
      Data: plan
   })
})


// /tour-within/:distance/center/:latlng/unit/:unit
// /tour-within/3234/center/34.091524,-118.216398/unit/mi
exports.getToursWithin = tryCatchError(async (req, res, next) => {
   const { distance, latlng, unit } = req.params
   const [lat, lng] = latlng.split(',');

   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1

   if (!lat || !lng) {
      next(new AppError("please provide latitude and langitude ", 404))
   }
   console.log(distance, latlng, unit);

   const Tour = await tourModle.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
   })


   res.status(200).json({
      status: 'success',
      length: Tour.length,
      data: Tour
   })
})


exports.getDistances = tryCatchError(async (req, res, next) => {
   const { latlng, unit } = req.params
   const [lat, lng] = latlng.split(',');

   const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

   if (!lat || !lng) {
      next(new AppError("please provide latitude and langitude ", 404))
   }

   const distances = await tourModle.aggregate([
      {
         $geoNear: {
            near: {
               type: 'Point',
               coordinates: [lng * 1, lat * 1]
            },
            distanceField: 'distance',
            distanceMultiplier: multiplier
         }
      },
      {
         $project: {
            distance: 1,
            name: 1
         }
      }
   ])

   res.status(200).json({
      status: 'success',
      // length: Tour.length,
      data: distances
   })
})