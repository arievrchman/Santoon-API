const { Santoon, User, Favorite, Episode } = require('../models');
const noImage =
  'https://smart-akis.com/SFCPPortal/app/img/picture-not-available.jpg';

exports.findAllToons = async (req, res) => {
  const isLogin = req.authorize_user ? true : false;
  try {
    const data = await Santoon.findAll({
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

    /**
     * CASE : LOGIN
     * ============
     * If user login, check id user who currently login on isFavorite column,
     * if there's id user on isFavorite lists, then assign the value true
     * else assign the value to false
     *
     * CASE : NOT LOGIN
     * =============
     * Set isFavorite to false if user not login.
     */

    const santoons = data
      .map(item => {
        const isFavorite = isLogin
          ? item.isFavorite.some(v => v.id == req.authorize_user.id)
          : false;
        const objSanstoon = {
          id: item.id,
          title: item.title,
          genre: item.genre,
          image: item.image,
          author: item.author.name,
          favoriteCount: item.isFavorite.length,
          isFavorite,
          isLogin,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
        return objSanstoon;
      })
      .filter(item => {
        const queryTitle = req.query.title;
        const title = item.title;
        if (
          req.query.hasOwnProperty('is_favorite') &&
          req.query['is_favorite'] == 'true' &&
          req.query.hasOwnProperty('title')
        ) {
          return (
            item.isFavorite == true &&
            new RegExp('.*' + queryTitle.toLowerCase() + '.*').test(
              title.toLowerCase(),
            )
          );
        } else if (req.query.hasOwnProperty('title')) {
          return new RegExp('.*' + queryTitle.toLowerCase() + '.*').test(
            title.toLowerCase(),
          );
        } else if (
          req.query.hasOwnProperty('is_favorite') &&
          req.query['is_favorite'] == 'true'
        ) {
          return item.isFavorite == true;
        } else {
          return item;
        }
      });

    res.json(santoons);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.findAllUserToon = async (req, res) => {
  try {
    let data = await Santoon.findAll({
      include: [
        {
          model: User,
          as: 'isFavorite',
          attributes: ['id', 'name'],
          through: {
            model: Favorite,
            attributes: [],
          },
        },
        {
          model: Episode,
          as: 'Episodes',
        },
      ],
      where: {
        createdBy: req.authorize_user.id,
      },
    });

    const userToons = data.map(item => {
      const userToon = {
        id: item.id,
        title: item.title,
        genre: item.genre,
        image: item.image,
        isFavorite: item.isFavorite.some(v => v.id == req.authorize_user.id),
        favoriteCount: item.isFavorite.length,
        episodes: item.Episodes.length + '',
        createdBy: item.createdBy,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return userToon;
    });

    res.json(userToons);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.createToon = async (req, res, next) => {
  const imageUrl = req.file ? req.file.path : noImage;
  try {
    const toon = {
      title: req.body.title,
      genre: req.body.genre,
      image: imageUrl,
      createdBy: req.authorize_user.id,
    };
    const data = await Santoon.create(toon);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.updateUserToon = async (req, res) => {
  console.log(req.params.santoonId);
  try {
    const validate = await Santoon.findOne({
      where: { id: req.params.santoonId },
    });
    // validate createdBy with user ID who's currently login
    if (validate.createdBy !== req.authorize_user.id) {
      return res.status(401).json({ error: 'Access Denied!' });
    }
    const toon = {
      title: req.body.title,
      genre: req.body.genre,
      image: req.file ? req.file.path : validate.image,
      createdBy: req.authorize_user.id,
    };
    await Santoon.update(toon, {
      where: { id: req.params.santoonId },
    });
    const updatedToon = await Santoon.findOne({
      where: { id: req.params.santoonId },
    });
    res.json(updatedToon);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.deleteUserToon = async (req, res) => {
  try {
    const validate = await Santoon.findOne({
      where: { id: req.params.santoonId },
    });
    // validate createdBy with user ID who's currently login
    if (validate.createdBy !== req.authorize_user.id) {
      return res.status(401).json({ error: 'Access Denied!' });
    }
    await Santoon.destroy({
      where: { id: req.params.santoonId },
    });
    res.json({ id: req.params.santoonId });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};
