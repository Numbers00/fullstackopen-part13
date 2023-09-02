const { DATABASE_URL } = require('./config');

const { Sequelize } = require('sequelize');

// already handles authentication, db.authenticate()
// is unnecessary unless for checking connection health
const db = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

module.exports = db;
