const logger = require('../utils/logger');

// sync creates the table if it doesn't exist
// alter: true will update the table if it exists
const Blog = require('./blog');
Blog.sync({ alter: true }).then(() => {
  logger.info('Blog table synced successfully!');
}).catch(err => {
  logger.info('Unable to sync blog table:', err);
});

module.exports = {
  Blog
};
