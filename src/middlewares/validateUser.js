module.exports = (req, res, next) => {
  const { nickName, email } = req.body;

  if (!nickName || !email) {
    return res.status(400).json({ error: 'nickName y email son obligatorios' });
  }

  next();
};
