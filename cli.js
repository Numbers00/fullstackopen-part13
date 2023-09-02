const db = require('./utils/db');

const main = async () => {
  try {
    console.log('Executing (default): SELECT * FROM blogs');
    // ORM functions are less performant and are less flexible, but safer when not using
    // prepared SQL statements
    const blogs = await db.query('SELECT * FROM blogs', { type: db.QueryTypes.SELECT });
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
