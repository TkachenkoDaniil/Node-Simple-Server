const jwt = require('jsonwebtoken');

const verifyUserToken = async(req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) return res.sendStatus(401);

  jwt.verify(accessToken, `${process.env.SECRET_KEY}`);

  return next();
};

module.exports = { verifyUserToken };
