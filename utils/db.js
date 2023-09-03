const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const { DATABASE_URL } = require('./config');

const logger = require('./logger');

// already handles authentication, sequelize.authenticate()
// is unnecessary unless for checking connection health
// the above logic needs further review
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};
  
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    return process.exit(1);
  }
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = { connectToDb, rollbackMigration, sequelize };
