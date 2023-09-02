const { DATABASE_URL } = require('./config');

const { Sequelize } = require('sequelize');

const logger = require('./logger');

// already handles authentication, sequelize.authenticate()
// is unnecessary unless for checking connection health
// the above logic needs further review
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};

module.exports = { connectToDb, sequelize };
