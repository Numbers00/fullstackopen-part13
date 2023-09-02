const router = require('express').Router();

const blogService = require('../services/blogs');

router.get('/', async (_req, res) => {
  const blogs = await blogService.getAll();

  // null for no property ommitted, 2 for indentation in console
  // JSON.stringify() for array of objects
  // without JSON formatting, will include extra properties
  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const blog = await blogService.create(body);

  res.json(blog);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await blogService.remove(id);

  res.status(204).end();
});

module.exports = router;
