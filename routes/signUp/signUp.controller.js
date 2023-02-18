const bcrypt = require('bcrypt');

const { createSqlQueryTemplate, generateTokens } = require('../../utils');

module.exports = {
  async signUp(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const { accessToken, refreshToken } = generateTokens({ id: email, password});
    try {
      const query = `INSERT INTO users (id, password, refreshToken) values ('${email}', '${hash}', '${refreshToken}')`;
      await createSqlQueryTemplate(query);
    } catch (err) {
      return res.sendStatus(400);
    }
    return res.status(200).send({ accessToken, refreshToken });
  },
};
