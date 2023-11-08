const db = require('../Config/DatabaseConfig');

async function fetchUserDataFromDatabase() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM leads';
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = fetchUserDataFromDatabase;
