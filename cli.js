const sequelize = require('./utils/db');

const main = async () => {
  try {
    // ORM functions are less performant and are less flexible, but safer when not using
    // prepared SQL statements
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: sequelize.QueryTypes.SELECT });
    blogs.forEach(b => {
      console.log(`${b.author}: '${b.title}', ${b.likes} likes`);
    });
    process.exit(0); // 0 for success
  } catch (err) {
    console.log('Unable to connect to the database:', err);
    process.exit(1); // 1 for failure
  }
};
main();
