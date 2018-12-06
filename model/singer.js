let db = require('../dataBase');

function getSinger({country, gender, genre}) {
    let base_sql = 'SELECT * FROM singer ';
    let con = '';
    if (country) {
        con += `and country='${country}'`;
    }
    if (gender) {
        con += `and gender='${gender}'`;
    }
    if (genre) {
        con += `and genre='${genre}'`;
    }
    if (!con) {
        base_sql += 'limit 20;'
    }else {
        base_sql += `where ranking=0 ${con} limit 20;`;
    }
    return db.fetch(base_sql).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = getSinger;