const router = require('express').Router();

const { Blog } = require('../models');

// middleware specific to this router
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();

  // null for no property ommitted, 2 for indentation in console
  // JSON.stringify() for array of objects
  // without JSON formatting, will include extra properties
  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) res.json(req.blog);
  else res.status(404).end();
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const blog = await Blog.create(body);

    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) await req.blog.destroy();

  res.status(204).end();
});

module.exports = router;
