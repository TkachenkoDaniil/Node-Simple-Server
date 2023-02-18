const { createSqlQueryTemplate } = require('../../utils');

module.exports = {
  async logout(req, res) {
    const { id } = req.body;

    const deleteRefreshQuery = `UPDATE users set refreshToken = NULL where id = '${id}'`;
    await createSqlQueryTemplate(deleteRefreshQuery);

    res.sendStatus(200);
  },
};
