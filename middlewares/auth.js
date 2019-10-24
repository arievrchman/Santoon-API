const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth) {
    const decoded = jwt.verify(auth, process.env.KEY);
    req.authorize_user = decoded;
  }
  next();
};

exports.authorize = (req, res, next) => {
  if (req.authorize_user.id == req.params.userId) {
    next();
  } else {
    res
      .status(401)
      .json({ error: 'Access Denied!' });
  }
};
