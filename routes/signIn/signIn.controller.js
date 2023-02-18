const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createSqlQueryTemplate, generateTokens } = require('../../utils');

module.exports = {
  async signIn(req, res) {
    const { id, password } = req.body;
    if (!id || !password) return res.sendStatus(400);

    const getUserPasswordQuery = `SELECT password FROM users where id = '${id}'`;
    const { result } = await createSqlQueryTemplate(getUserPasswordQuery);
    const dbPassword = result?.[0]?.password;

    const isPasswordValid = await bcrypt.compare(password, dbPassword);
    if (!isPasswordValid) return res.sendStatus(401);

    const { accessToken, refreshToken } = generateTokens({ id });

    const updateRefreshTokenQuery = `UPDATE users SET refreshToken = '${refreshToken}' WHERE id = '${id}'`;
    await createSqlQueryTemplate(updateRefreshTokenQuery);

    res.status(200).send({ accessToken, refreshToken });
  },
  async updateTokens(req, res) {
    const { id, refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(400);

    jwt.verify(refreshToken, `${process.env.SECRET_KEY}`);

    const getUserTokenQuery = `SELECT refreshToken FROM users where id = '${id}'`;
    const { result } = await createSqlQueryTemplate(getUserTokenQuery);
    const dbRefreshToken = result?.[0]?.refreshToken;

    if (dbRefreshToken !== refreshToken) return res.sendStatus(401);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({ id }); 
    
    const updateUserTokenQuery = `UPDATE users SET refreshToken = '${newRefreshToken}' where id = '${id}'`;
    await createSqlQueryTemplate(updateUserTokenQuery);

    res.status(200).send({ accessToken, newRefreshToken });
  },
};
