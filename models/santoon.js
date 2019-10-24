'use strict';
module.exports = (sequelize, DataTypes) => {
  const Santoon = sequelize.define(
    'Santoon',
    {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      image: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
    },
    {},
  );
  Santoon.associate = function(models) {
    // associations can be defined here
    Santoon.hasMany(models.Episode, {
      as: 'Episodes',
      foreignKey: 'santoonId'
    });
    Santoon.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'createdBy',
    });
    Santoon.belongsToMany(models.User, {
      through: 'Favorites',
      as: 'isFavorite',
      foreignKey: 'santoonId',
    });
  };
  return Santoon;
};
