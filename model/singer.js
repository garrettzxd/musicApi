let db = require('../dataBase');
let inatll = require('../common/sqlInstall');

function get({singer_mid, singer_name, gender, genre}) {
    let sql = inatll('SELECT * FROM SINGER WHERE ', {
        singer_mid,
        singer_name,
        gender,
        genre
    });
    return db.fetch(sql).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    })
}