const router = require('express').Router();

const { Blog, ReadingList, User } = require('../models');

const { tokenExtractor, verifySession } = require('../utils/middleware');

router.post('/', async (req, res) => {
  const { body } = req;

  const blog = await Blog.findByPk(body.blogId);
  if (!blog) return res.status(404).end();

  const user = await User.findByPk(body.userId);
  if (!user) return res.status(404).end();

  const readingList = await ReadingList.create({ ...body, blogId: blog.id, userId: user.id });
  res.json(readingList);
});

router.put('/:id', tokenExtractor, verifySession, async (req, res) => {
  const { body: { wasRead } } = req;

  const user = await User.findByPk(req.decodedToken.id);
  if (!user) return res.status(401).end();

  const readingList = await ReadingList.findByPk(req.params.id);
  if (!readingList) return res.status(404).end();

  if (user.id !== readingList.userId) return res.status(401).end();

  readingList.wasRead = wasRead === 'true' || wasRead === true;
  await readingList.save();

  res.json(readingList);
});

module.exports = router;
