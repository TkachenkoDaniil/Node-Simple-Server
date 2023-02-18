const jwt = require('jsonwebtoken');

const createAccessToken = ({
  id,
  password,
}) => jwt.sign({ id }, `${process.env.PASSWORD_SECRET_KEY}${password}`, { expiresIn: process.env.ACCESS_TOKEN_LIFE_TIME });

const createRefreshToken = ({
  id,
  password,
}) => jwt.sign({ id }, `${process.env.PASSWORD_SECRET_KEY}${password}`, { expiresIn: process.env.REFRESH_TOKEN_LIFE_TIME });

const generateTokens = (tokenData) => ({
  accessToken: createAccessToken(tokenData),
  refreshToken: createRefreshToken(tokenData),
});

module.exports = {
  generateTokens,
};
