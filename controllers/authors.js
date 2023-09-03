const router = require('express').Router();

const { Blog } = require('../models');

const { sequelize } = require('../utils/db');

router.get('/', async (req, res) => {
  const sumLikesFn = sequelize.fn('SUM', sequelize.col('likes'));

  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
      [sumLikesFn, 'likes']
    ],
    group: ['author'],
    order: [[sumLikesFn, 'DESC']]
  });

  res.json(authors);
});

module.exports = router;
