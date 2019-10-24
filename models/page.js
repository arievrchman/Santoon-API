'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
    {
      page: DataTypes.STRING,
      image: DataTypes.STRING,
      episodeId: DataTypes.INTEGER,
    },
    {},
  );
  Page.associate = function(models) {
    // associations can be defined here
    Page.belongsTo(models.Episode, {
      foreignKey: 'episodeId',
    });
  };
  return Page;
};
