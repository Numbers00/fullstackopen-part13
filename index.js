require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const express = require('express');
const app = express();

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.get('/check-db', async (_req, res) => {
  try {
    await sequelize.authenticate();
    sequelize.close();
    res.send('Connection has been established successfully.');
  } catch (error) {
    res.status(500).send(`Unable to connect to the database ${error}`);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
