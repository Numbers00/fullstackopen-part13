const logger = require('../utils/logger');

const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

// sync creates the table if it doesn't exist
// alter: true will update the table if it exists
Blog.sync({ alter: true }).then(() => {
  logger.info('Blog table synced successfully!');
}).catch(err => {
  logger.info('Unable to sync blog table:', err);
});

User.sync({ alter: true }).then(() => {
  logger.info('User table synced successfully!');
}).catch(err => {
  logger.info('Unable to sync user table:', err);
});

module.exports = {
  Blog,
  User
};
