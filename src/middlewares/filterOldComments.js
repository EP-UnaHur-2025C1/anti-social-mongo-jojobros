const MAX_AGE = parseInt(process.env.MAX_COMMENT_AGE_MONTHS || '6');

module.exports = (req, res, next) => {
  res.filterOldComments = (comments) => {
    const now = new Date();
    const cutoffDate = new Date(now.setMonth(now.getMonth() - MAX_AGE));
    return comments.filter(comment => new Date(comment.fecha) > cutoffDate);
  };
  next();
};
