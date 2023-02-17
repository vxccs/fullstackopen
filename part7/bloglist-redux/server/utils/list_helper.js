const totalLikes = (blogs) => {
  return blogs.reduce((p, c) => p + c.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((b) => b.likes));
  return blogs.filter((b) => b.likes === mostLikes)[0];
};

const mostBlogs = (blogs) => {
  const counts = Object.values(
    blogs.reduce((p, c) => {
      const { author } = c;
      p[author] ? p[author].blogs++ : (p[author] = { author, blogs: 1 });
      return p;
    }, {})
  );
  return counts.filter(
    (i) => i.blogs === Math.max(...counts.map((i) => i.blogs))
  )[0];
};

const mostLikes = (blogs) => {
  const counts = Object.values(
    blogs.reduce((p, c) => {
      const { author, likes } = c;
      p[author] ? (p[author].likes += likes) : (p[author] = { author, likes });
      return p;
    }, {})
  );
  return counts.filter(
    (i) => i.likes === Math.max(...counts.map((i) => i.likes))
  )[0];
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
