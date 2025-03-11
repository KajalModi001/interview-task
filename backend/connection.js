const mysql = require('mysql')
const conn = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database : 'interview'
})

conn.connect((err,result) => {
    if (err) {
        console.log("err in database connection", err)
    } else {
        console.log("Database connected successfully")
    }
})

module.exports = conn