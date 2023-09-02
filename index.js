require('dotenv').config();

// const express = require('express');
// const app = express();

// app.get('/health', (_req, res) => {
//   res.send('ok');
// });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();
