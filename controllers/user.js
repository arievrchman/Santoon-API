const { User } = require('../models');

exports.findOne = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl,
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};

exports.editProfile = async (req, res) => {
  /**
   * Find data user and get imageUrl,
   * imageUrl used when user not updated new photo,
   * if success, return updated user to client.
   */
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    const imageUrl = req.file ? req.file.path : user.imageUrl;
    await User.update(
      {
        name: req.body.name,
        imageUrl,
      },
      {
        where: { id: req.authorize_user.id },
      },
    );
    const findUser = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    const updatedUser = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
      imageUrl: findUser.imageUrl,
    };
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again!' });
  }
};
