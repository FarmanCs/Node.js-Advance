import tourModel from '../models/tour-model.js';
import tryCatchError from '../utils/async-error.js';

export const getOverview = tryCatchError(async (req, res, next) => {
   // 1. Get tour data from the collection
   const tours = await tourModel.find();

   // 2. Render the overview template with tour data
   res.status(200).render('overview', {
      title: 'All tours',
      tours
   });
});

export const getTour = tryCatchError(async (req, res) => {
   // 1. Get tour data, including reviews and guides
   const tour = await tourModel.findOne({ slug: req.params.slug }).populate({
      path: "reviews",
      fields: 'review rating user'
   });

   if (!tour) {
      return res.status(404).render('error', {
         title: 'Tour not found',
         message: 'The tour you are looking for does not exist.'
      });
   }

   // 2. Render the tour template with the fetched data
   res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour
   });
});

export const getLoginForm = tryCatchError(async (req, res) => {
   res.status(200).render('login', {
      title: 'Login to your account'
   });
});
