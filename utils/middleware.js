// for middleware functions used in multiple routes
const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');
const logger = require('./logger');

const { Session } = require('../models');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.token = authorization.substring(7);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  }  else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const verifySession = async (req, res, next) => {
  if (!req.decodedToken) return res.status(401).json({ error: 'token missing' });
  
  const session = await Session.findOne({ where: { userId: req.decodedToken.id, token: req.token } });
  if (!session || !session.isValid) return res.status(401).json({ error: 'session invalid' });

  next();
};

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
  tokenExtractor,
  verifySession,
  unknownEndpoint,
  errorHandler
};
