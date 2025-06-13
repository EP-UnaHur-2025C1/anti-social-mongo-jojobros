module.exports = (req, res, next) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: 'Los campos "userId" y "content" son obligatorios' });
  }

  next();
};
