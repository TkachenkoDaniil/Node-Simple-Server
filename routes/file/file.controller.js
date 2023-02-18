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

    const filename = `${fileFolderName}/${id}.${extension}`;
    await fs.writeFile(filename, buffer, 'binary')

    const query = `INSERT INTO files (id, name, extension, mime, size, loaded_at)
                      values ('${id}', '${originalname}', '${extension}', '${mimetype}',
                        ${size}, '${loadedAt}')`;
    await createSqlQueryTemplate(query);

    res.status(200).send('uploadFile');
  },
};
