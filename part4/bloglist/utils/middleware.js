const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  request.token =
    authorization && authorization.toLowerCase().startsWith('bearer ') ? authorization.substring(7) : null;

  next();
};

const userExtractor = async (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      const user = await User.findById(decodedToken.id);
      request.user = user;
    } else {
      request.user = null;
    }
  } catch (error) {
    logger.error(error.message);
    next(error);
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(400).json({ error: 'token expired' });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
