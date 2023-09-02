const { Blog } = require('../models');

const getAll = async () => {
  const blogs = await Blog.findAll();

  return blogs;
};

const create = async (body) => {
  const blog = await Blog.create(body);

  return blog;
};

const remove = async (id) => {
  await Blog.destroy({
    where: {
      id
    }
  });
};

module.exports = {
  getAll,
  create,
  remove
};
