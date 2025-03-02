const AppError = require("../utils/error");

const handleCastErrorDB = (err) => {
   const message = `Invalid ${err.path}: ${err.value}`;
   return new AppError(message, 400); // 400 Bad Request
};

const handleDuplicateFieldsDB = (err) => {
   const key = Object.keys(err.keyValue)[0]; // Get the duplicate key
   const value = err.keyValue[key];
   const message = `Duplicate field value: ${value}. Please use another value!`;
   return new AppError(message, 400); // 400 Bad Request
};

const handleValidationErrorDB = (err) => { // Corrected function name
   const errors = Object.values(err.errors).map((el) => el.message);
   const message = `Invalid input data. ${errors.join(". ")}`;
   return new AppError(message, 400); // 400 Bad Request
};

//jwt token error for invalid token passing
const handleJWTError = () =>
   new AppError("invalid token, please login agin: ", 401)

//twt token error for toekn expiration....
const handleJWTExpiredError = () =>
   new AppError("token has expired: login agin  ", 400)

// Development Error Response
const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

// Production Error Response
const sendErrorProd = (err, res) => {
   if (err.isOperational) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      res.status(500).json({
         status: "error",
         message: "Something went wrong!",
      });
   }
};

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || "error";

   if (process.env.NODE_ENV === "DEVELOPMENT") {
      sendErrorDev(err, res);
   } else if (process.env.NODE_ENV === "production") {
      let error = { ...err };
      error.message = err.message; // Ensure message is copied

      // Handle specific error types
      if (err.name === "CastError") error = handleCastErrorDB(err);
      if (err.code === 11000) error = handleDuplicateFieldsDB(err);
      if (err.name === "ValidationError") error = handleValidationErrorDB(err);
      if (err.name === "JsonWebTokenError") error = handleJWTError();
      if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

      sendErrorProd(error, res);
   }
}