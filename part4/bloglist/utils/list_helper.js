const totalLikes = (blogs) => {
  return blogs.reduce((p, c) => p + c.likes, 0);
};

module.exports = {
  totalLikes,
};
