const mysql = require('mysql');
const db = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'awg',
});


db.connect((err) =>{
    if(err){
        console.error('Error connecting to the database:', err);
    }else{
        console.log('Connected to the database');
    }
});

module.exports = db;