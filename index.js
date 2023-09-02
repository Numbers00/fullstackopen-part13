const { PORT } = require('./utils/config');

const express = require('express');

// centralize error handling
// route handlers can still modify the error code
// and message by passing them through next()
require('express-async-errors');

const app = express();
app.use(express.json());

app.use('/api/health', require('./controllers/health'));
app.use('/api/blogs', require('./controllers/blogs'));
app.use('/api/login', require('./controllers/login'));
app.use('/api/users', require('./controllers/users'));

// errorHandler has to be the last middleware
const middleware = require('./utils/middleware');
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const logger = require('./utils/logger');

const { connectToDb } = require('./utils/db');
const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};
start();
