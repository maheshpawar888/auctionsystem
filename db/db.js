var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mahesh@123',
    database:'auction'
})

module.exports=connection;
