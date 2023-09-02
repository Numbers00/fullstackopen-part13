const { PORT } = require('./utils/config');

const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/health', require('./routes/health'));
app.use('/api/blogs', require('./routes/blogs'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
