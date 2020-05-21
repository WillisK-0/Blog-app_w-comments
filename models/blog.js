'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
    models.Blog.hasMany(models.Comment, {as: 'Comments', foreignKey: 'blog_id'})
  };
  return Blog;
};