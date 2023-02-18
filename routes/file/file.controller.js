const { v4: generateUuid } = require('uuid');
const fs = require('fs/promises');

const { fileFolderName } = require('../../constants/constants');
const { getFileExtension, createSqlQueryTemplate } = require('../../utils');

module.exports = {
  async uploadFile(req, res) {
    const {
      originalname,
      mimetype,
      size,
      buffer,
    } = req.file;

    const id = generateUuid();
    const extension = getFileExtension(originalname);
    const loadedAt = new Date().toISOString();

    const filePath = `${fileFolderName}/${id}.${extension}`;
    await fs.writeFile(filePath, buffer, 'binary')

    const query = `INSERT INTO files (id, name, extension, mime, size, loaded_at)
                      values ('${id}', '${originalname}', '${extension}', '${mimetype}',
                        ${size}, '${loadedAt}')`;
    await createSqlQueryTemplate(query);

    res.sendStatus(200);
  },
  async getFileInfo(req, res) {
    const { id } = req.params;
    const query = `SELECT * FROM files where id = '${id}'`;
    const { result } = await createSqlQueryTemplate(query);
    res.status(200).send({ result });
  },
  async updateFile(req, res) {
    const { id } = req.params;

    const {
      originalname,
      mimetype,
      size,
      buffer,
    } = req.file;

    const extension = getFileExtension(originalname);
    const loadedAt = new Date().toISOString();
    const filePath = `${fileFolderName}/${id}.${extension}`;

    await fs.writeFile(filePath, buffer, 'binary')
    
    const query = `UPDATE files SET name = '${originalname}', extension = '${extension}',
                    mime = '${mimetype}', size = ${size}, loaded_at = '${loadedAt}'
                      where id = '${id}'`;
    await createSqlQueryTemplate(query);

    res.sendStatus(200);
  },
  async deleteFile(req, res) {
    const { id } = req.params;

    const getFileQuery = `SELECT extension FROM files where id = '${id}'`;
    const { result } = await createSqlQueryTemplate(getFileQuery);

    const extension = result?.[0]?.extension;
    if (!extension) return res.sendStatus(400);
    const filePath = `${fileFolderName}/${id}.${extension}`;
    await fs.unlink(filePath);

    const deleteFileQuery = `DELETE FROM files where id = '${id}'`;
    await createSqlQueryTemplate(deleteFileQuery);

    res.sendStatus(200);
  },
};
