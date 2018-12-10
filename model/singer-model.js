let db = require('../dataBase');

/**
 * [getSingerList 获取歌手列表]
 * @param [area] [Number] [歌手区域]
 * @param [gender] [String] [性别]
 * @param [genre] [String] [歌手分类]
 * */
function getSingerList({area, gender, genre}) {
    let base_sql = 'SELECT * FROM singer ';
    let con = '';
    if (area) {
        con += `and area='${area}'`;
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

/**
 * [getSingerSongList 获取歌手歌曲列表]
 * @param [singer_mid] [String] [歌手唯一标识]
 * */
function getSingerSongList({singer_mid}) {
    let sql = `select * from song where singer_mid='${singer_mid}'`;
    return db.fetch(sql).then((data) => {
        return data;
    }).catch((err) => {
        throw new Error(err);
    })
}

/**
 * [getSingerAlbumList 获取歌手详情描述]
 * */
function getSingerDescribe({singer_mid}) {
    //do something
}


module.exports = {
    getSingerList,
    getSingerSongList,
    getSingerDescribe
};