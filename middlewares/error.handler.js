const { ValidationError } = require('sequelize');
// const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
  console.error('logErrors');
  // console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.error('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomHandler(err, req, res, next) {
  console.error('boomHandler');
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function sequelizeHandler(err, req, res, next) {
  console.error('sequelizeHandler');
  if (err instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomHandler, sequelizeHandler };
