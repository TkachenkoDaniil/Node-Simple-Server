const bcrypt = require('bcrypt');

const { createSqlQueryTemplate, generateTokens } = require('../../utils');

module.exports = {
  async signUp(req, res) {
    const { id, password } = req.body;
    if (!id || !password) return res.sendStatus(400);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const { accessToken, refreshToken } = generateTokens({ id });
    try {
      const query = `INSERT INTO users (id, password, refreshToken) values ('${id}', '${hash}', '${refreshToken}')`;
      await createSqlQueryTemplate(query);
    } catch (err) {
      return res.sendStatus(400);
    }
    return res.status(200).send({ accessToken, refreshToken });
  },
};
