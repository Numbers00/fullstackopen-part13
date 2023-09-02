const router = require('express').Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) res.status(404).end();
  res.json(user);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put('/:username', async (req, res) => {
  const { body } = req;
  if (!body.username) res.status(400).json({ error: 'username is required' });

  const user = await User.findOne({ where: { username: req.params.username } });
  if (!user) res.status(404).end();

  user.username = body.username;
  await user.save();
  res.json(user);
});

module.exports = router;
