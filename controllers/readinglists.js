const router = require('express').Router();

const { Blog, ReadingList, User } = require('../models');

router.post('/', async (req, res) => {
  const { body } = req;

  const blog = await Blog.findByPk(body.blogId);
  if (!blog) return res.status(404).end();

  const user = await User.findByPk(body.userId);
  if (!user) return res.status(404).end();

  const readingList = await ReadingList.create({ ...body, blogId: blog.id, userId: user.id });
  res.json(readingList);
});

module.exports = router;
