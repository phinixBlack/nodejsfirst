const db = require('../Config/DatabaseConfig');


function getAllLeads(callback) {
    db.query('SELECT * from leads', (err, results) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, results);
        }
    });
}

function addLeads(leadData,callback){
    console.log(leadData.name);
    const query = 'INSERT into leads (name, email, phone, project_id, source_id)VALUES (?, ?, ?, ?, ?)';
    db.query(query, [leadData.name, leadData.email, leadData.phone, leadData.project_id, leadData.sourcer_id], (err, results) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, results);
        }
      });
}
module.exports = {
    getAllLeads,
    addLeads
};