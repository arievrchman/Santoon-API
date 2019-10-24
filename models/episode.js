'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define(
    'Episode',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      santoonId: DataTypes.INTEGER,
    },
    {},
  );
  Episode.associate = function(models) {
    // associations can be defined here
    Episode.belongsTo(models.Santoon, {
      foreignKey: 'santoonId',
    });
    Episode.hasMany(models.Page, {
      as: 'Pages',
      foreignKey: 'episodeId',
    });
  };
  return Episode;
};
