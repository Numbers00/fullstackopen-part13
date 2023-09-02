const express = require('express');

const sequelize = require('../utils/db');

const router = express.Router();
router.get('/', (_req, res) => {
  res.send('ok');
});

router.get('/check-db', async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.send('Connection has been established successfully.');
  } catch (error) {
    res.status(500).send(`Unable to connect to the database ${error}`);
  }
});

module.exports = router;
