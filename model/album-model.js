let db = require('../dataBase');

/**
 * [getAlbumList 根据歌手获取该歌手专辑]
 * @param [String] [singer unique]
 * */
function getAlbumList({singer_mid}) {
    let base_sql = `SELECT * FROM album `;
    base_sql += singer_mid ? `where singer_mid='${singer_mid}'` : `limit 20`;
    return db.fetch(base_sql).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    getAlbumList
};