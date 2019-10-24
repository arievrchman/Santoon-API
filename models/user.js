'use strict';
const sequelize = require('sequelize');
const Op = sequelize.Op;
const hash = require('../helpers/bcrypt').hash;
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please provide a valid email address',
          },
          isUnique: function(email) {
            return User.findOne({
              where: {
                email: email,
                id: { [Op.ne]: this.id },
              },
            })
              .then(result => {
                if (result) throw 'Email already in use!';
              })
              .catch(err => {
                throw err;
              });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'This field cannot be empty',
          },
        },
      },
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {},
  );
  User.beforeCreate(user => {
    user.password = hash(user.password);
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Santoon, {
      through: 'Favorites',
      as: 'MyFavorites',
      foreignKey: 'userId',
    });
  };
  return User;
};
