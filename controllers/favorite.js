const { Santoon, User, Favorite } = require('../models');

exports.createFavorite = async (req, res) => {
  try {
    await Favorite.create({
      userId: req.authorize_user.id,
      santoonId: req.params.santoonId,
    });
    let data = await Santoon.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
          },
        },
      ],
    });
    const santoons = data.map(item => {
      const objSantoon = {
        id: item.id,
        title: item.title,
        genre: item.genre,
        image: item.image,
        author: item.author.name,
        isFavorite: item.isFavorite.some(v => v.id == req.authorize_user.id),
        favoriteCount: item.isFavorite.length,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objSantoon;
    });
    res.json(santoons);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    await Favorite.destroy({
      where: {
        userId: req.authorize_user.id,
        santoonId: req.params.santoonId,
      },
    });
    let data = await Santoon.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
          },
        },
      ],
    });
    const santoons = data.map(item => {
      const objSantoon = {
        id: item.id,
        title: item.title,
        genre: item.genre,
        image: item.image,
        author: item.author.name,
        isFavorite: item.isFavorite.some(v => v.id == req.authorize_user.id),
        favoriteCount: item.isFavorite.length,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objSantoon;
    });
    res.json(santoons);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};
