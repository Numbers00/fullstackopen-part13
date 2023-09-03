const router = require('express').Router();

const { Session } = require('../models');

const { tokenExtractor, verifySession } = require('../utils/middleware');

router.delete('/', tokenExtractor, verifySession, async (req, res) => {
  const { decodedToken: { id: userId }, token } = req;

  const session = await Session.findOne({ where: { userId, token } });
  if (session) {
    session.isValid = false;
    await session.save();
  }

  res.status(204).json({ message: 'Successfully logged out!' });
});

module.exports = router;
