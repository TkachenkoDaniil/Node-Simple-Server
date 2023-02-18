const jwt = require('jsonwebtoken');

const createAccessToken = ({ id }) => (
  jwt.sign({ id }, `${process.env.SECRET_KEY}`, { expiresIn: process.env.ACCESS_TOKEN_LIFE_TIME })
);

const createRefreshToken = ({ id }) => (
  jwt.sign({ id }, `${process.env.SECRET_KEY}`, { expiresIn: process.env.REFRESH_TOKEN_LIFE_TIME })
);

const generateTokens = (tokenData) => ({
  accessToken: createAccessToken(tokenData),
  refreshToken: createRefreshToken(tokenData),
});

module.exports = {
  generateTokens,
};
