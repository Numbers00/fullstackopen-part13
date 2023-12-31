const { Op } = require('sequelize');

const router = require('express').Router();

const { Blog, User } = require('../models');

const { tokenExtractor, verifySession } = require('../utils/middleware');
// const logger = require('../utils/logger');

// middleware specific to this router
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const { search } = req.query;

  const where = {};
  if (search) where[Op.or] = [
    { title: { [Op.iLike]: `%${search}%` } },
    { author: { [Op.iLike]: `%${search}%` } },
  ];

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['username', 'name'] },
    where,
    order: [['likes', 'DESC']]
  });

  // null for no property ommitted, 2 for indentation in console
  // JSON.stringify() for array of objects
  // without JSON formatting, will include extra properties
  // logger.info(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) res.json(req.blog);
  else res.status(404).end();
});

router.post('/', tokenExtractor, verifySession, async (req, res) => {
  const { body, decodedToken: { id: userId } } = req;

  const user = await User.findByPk(userId);
  if (!user) res.status(401).end();
  const blog = await Blog.create({ ...body, userId: user.id });
  // logger.info(JSON.stringify(blog, null, 2));

  res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  const { body } = req;

  const blog = req.blog;
  if (!blog) res.status(404).end();

  // if likes property is not included or is invalid, do not update
  if (!body.likes || isNaN(Number(body.likes))) return res.json(blog);

  // Math.floor can handle strings that are valid numbers
  else body.likes = Math.floor(body.likes);
  
  blog.likes = body.likes;
  await blog.save();

  res.json(blog);
});

router.delete('/:id', tokenExtractor, verifySession, blogFinder, async (req, res) => {
  const { decodedToken: { id: userId } } = req;

  const user = await User.findByPk(userId);
  if (!user || user.id !== req.blog?.userId) return res.status(401).end();
  
  if (req.blog) await req.blog.destroy();

  res.status(204).end();
});

module.exports = router;
