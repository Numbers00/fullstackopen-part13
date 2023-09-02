// sync creates the table if it doesn't exist
// alter: true will update the table if it exists
const Blog = require('./blog');
Blog.sync({ alter: true }).then(() => {
  console.log('Blog table synced successfully!');
}).catch(err => {
  console.log('Unable to sync blog table:', err);
});

module.exports = {
  Blog
};
