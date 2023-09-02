const express = require('express');

const db = require('../utils/db');

const router = express.Router();
router.get('/', (_req, res) => {
  res.send('ok');
});

router.get('/check-db', async (_req, res) => {
  try {
    await db.authenticate();
    db.close();
    res.send('Connection has been established successfully.');
  } catch (error) {
    res.status(500).send(`Unable to connect to the database ${error}`);
  }
});

module.exports = router;
