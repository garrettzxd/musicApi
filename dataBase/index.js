const mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Garrett.00',
    database : 'music'
});

function fetch(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(sql, (err, res, fields) => {
                if (err) reject(err);
                connection.release();
                resolve(res);
            })
        })
    })
}

exports.fetch = fetch;