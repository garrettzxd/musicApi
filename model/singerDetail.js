let db = require('../dataBase');

function getSingerDetail({singer_mid}) {
    let sql = `select * from song where singer_mid='${singer_mid}'`;
    return db.fetch(sql).then((data) => {
        return data;
    }).catch((err) => {
        throw new Error(err);
    })
}

module.exports = getSingerDetail;
