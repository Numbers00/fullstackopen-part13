const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  author: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  yearWritten: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1991,
        msg: 'Year written must be greater than or equal to 1991'
      },
      max: {
        args: new Date().getFullYear(),
        msg: `Year written must be less than or equal to ${new Date().getFullYear()}`
      }
    }
  }
  // optional, defining relations in index.js
  // automatically creates this field
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: { model: 'users', key: 'id' },
  // }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'Blog'
});

module.exports = Blog;
