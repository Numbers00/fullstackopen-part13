// const logger = require('../utils/logger');

const Blog = require('./blog');
const ReadingList = require('./reading_list');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

// as: 'readings' is the alias for the relationship
// as: cannot be reading_list because that is the name of the table
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'in_reading_list_of' });

// sync creates the table if it doesn't exist
// alter: true will update the table if it exists
// Blog.sync({ alter: true }).then(() => {
//   logger.info('Blog table synced successfully!');
// }).catch(err => {
//   logger.info('Unable to sync blog table:', err);
// });

// User.sync({ alter: true }).then(() => {
//   logger.info('User table synced successfully!');
// }).catch(err => {
//   logger.info('Unable to sync user table:', err);
// });

module.exports = {
  Blog,
  ReadingList,
  User
};
