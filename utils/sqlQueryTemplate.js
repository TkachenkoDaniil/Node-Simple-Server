const { connection } = require('../dbConnection');

const createSqlQueryTemplate = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result, fields) => {
      if (err) reject(err); 
      resolve({ result, fields });
    });
  });
};

module.exports = {
  createSqlQueryTemplate,
};
