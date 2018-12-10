let db = require('../dataBase');

/**
 * [getSongListBySinger 根据歌手获取歌曲列表]
 * @param [String] [singer unique]
 * */
function getSongListBySinger({singer_mid}) {
    let base_sql = `SELECT * FROM song `;
    base_sql += singer_mid ? `where singer_mid='${singer_mid}' limit 20` : `limit 20`;
    return db.fetch(base_sql).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    })
}

/**
 * [getSongListByAlbum 根据专辑获取歌曲列表]
 * @param [String] [album unique]
 * */
function getSongListByAlbum({album_mid}) {
    let base_sql = `SELECT * FROM song `;
    base_sql += album_mid ? `where album_mid='${album_mid}' limit 20` : `limit 20`;
    return db.fetch(base_sql).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    getSongListBySinger,
    getSongListByAlbum
};