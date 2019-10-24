const { User, Santoon, Episode } = require('../models');
const noImage =
  'https://smart-akis.com/SFCPPortal/app/img/picture-not-available.jpg';

exports.findAllEpisodes = async (req, res) => {
  try {
    const data = await Episode.findAll({
      include: [
        {
          model: Santoon,
          attributes: ['id', 'title', 'genre'],
          where: { id: req.params.santoonId },
        },
      ],
      order: [['id', 'DESC']],
    });

    const episodes = data.map(item => {
      const objEpisode = {
        id: item.id,
        santoonTitle: item.Santoon.title,
        title: item.title,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objEpisode;
    });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.findAllUserEpisode = async (req, res) => {
  try {
    const data = await Episode.findAll({
      include: [
        {
          model: Santoon,
          attributes: ['id', 'title', 'genre'],
          where: { id: req.params.santoonId },
          include: {
            model: User,
            as: 'author',
            where: { id: req.authorize_user.id },
            attributes: ['id', 'name'],
          },
        },
      ],
      order: [['id', 'DESC']],
    });
    const episodes = data.map(item => {
      const objEpisode = {
        id: item.id,
        toonId: item.Santoon.id,
        title: item.title,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objEpisode;
    });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.createEpisode = async (req, res) => {
  const imageUrl = req.file ? req.file.path : noImage;
  try {
    const validateToon = await Santoon.findOne({
      where: { id: req.params.santoonId },
    });
    if (validateToon.createdBy !== req.authorize_user.id) {
      return res.status(401).json({ error: 'Access Denied!' });
    }
    const episode = {
      title: req.body.title,
      image: imageUrl,
      santoonId: req.params.santoonId,
    };
    const data = await Episode.create(episode);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const validate = await Episode.findOne({
      where: {
        id: req.params.episodeId,
        santoonId: req.params.santoonId,
      },
      include: {
        model: Santoon,
        where: {
          createdBy: req.authorize_user.id,
        },
      },
    });
    if (!validate) {
      return res.status(401).json({ error: 'Access Denied' });
    }

    const episode = {
      title: req.body.title,
      image: req.file ? req.file.path : validate.image,
      santoonId: req.params.santoonId,
    };

    await Episode.update(episode, {
      where: { id: req.params.episodeId },
    });
    const data = await Episode.findOne({
      where: { id: req.params.episodeId },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    const validate = await Episode.findOne({
      where: {
        id: req.params.episodeId,
        santoonId: req.params.santoonId,
      },
      include: {
        model: Santoon,
        where: {
          createdBy: req.authorize_user.id,
        },
      },
    });
    if (!validate) {
      return res.status(400).json({ error: 'Invalid' });
    }
    await Episode.destroy({
      where: { id: req.params.episodeId },
    });
    res.json({ id: req.params.episodeId });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};
