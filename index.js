const { PORT } = require('./utils/config');

const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/health', require('./controllers/health'));
app.use('/api/blogs', require('./controllers/blogs'));

const { connectToDb } = require('./utils/db');
const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
