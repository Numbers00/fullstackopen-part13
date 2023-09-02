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

const connectToDb = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { connectToDb, db };
