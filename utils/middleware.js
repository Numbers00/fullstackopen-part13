// for middleware functions used in multiple routes

const logger = require('./logger');

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'SequelizeValidationError') {
    // Handle validation errors
    const errors = error.errors.map(err => ({
      field: err.path,
      message: err.message,
    }));
    return res.status(400).json({ errors });
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    // Handle unique constraint violation errors
    return res.status(409).json({ error: 'Duplicate entry' });
  }

  // to be handled by the default express error handler
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler
};
