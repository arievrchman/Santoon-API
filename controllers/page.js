const { Santoon, Episode, Page, User } = require('../models');
const noImage =
  'https://smart-akis.com/SFCPPortal/app/img/picture-not-available.jpg';

exports.findAllPages = async (req, res) => {
  try {
    const data = await Page.findAll({
      include: [
        {
          model: Episode,
          attributes: ['id', 'title'],
          where: { id: req.params.episodeId },
          include: [
            {
              model: Santoon,
              attributes: ['id', 'title', 'genre'],
              where: { id: req.params.santoonId },
            },
          ],
        },
      ],
    });

    const pages = data.map(item => {
      const objPages = {
        id: item.id,
        page: item.page,
        image: item.image,
        episodeTitle: item.Episode.title,
        toonTitle: item.Episode.Santoon.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objPages;
    });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.findAllUserPages = async (req, res) => {
  try {
    const data = await Page.findAll({
      include: [
        {
          model: Episode,
          attributes: ['id', 'title'],
          where: { id: req.params.episodeId },
          include: [
            {
              model: Santoon,
              where: {
                id: req.params.santoonId,
                createdBy: req.authorize_user.id,
              },
            },
          ],
        },
      ],
    });
    const pages = data.map(item => {
      const objPages = {
        id: item.id,
        page: item.page,
        image: item.image,
        episodeTitle: item.Episode.title,
        toonTitle: item.Episode.Santoon.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
      return objPages;
    });
    res.send(pages);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPage = async (req, res) => {
  const imageUrl = req.file ? req.file.path : noImage;
  try {
    const page = {
      page: req.body.page,
      image: imageUrl,
      episodeId: req.params.episodeId,
    };
    const data = await Page.create(page);
    res.status(201).json({
      success: 'Page created!',
      data,
    });
    res.json(validate)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const validate = await Page.findOne({
      where: {
        id: req.params.imageId,
        episodeId: req.params.episodeId,
      },
      include: {
        model: Episode,
        where: {
          santoonId: req.params.santoonId,
        },
        include: {
          model: Santoon,
          where: {
            createdBy: req.authorize_user.id,
          },
        },
      },
    });
    if (!validate) {
      return res.status(401).json({ error: 'Access Denied!' });
    }
    await Page.destroy({
      where: { id: req.params.imageId },
    });
    res.json({
      success: 'Page deleted!',
      id: req.params.imageId,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};
