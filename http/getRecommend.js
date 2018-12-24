let http = require('../common/http');
let {dataProcessing, splicing,getRandom} = require('../common/currency');
let {BASE_DATA} = require('../common/constants');
const BASE_URL = 'https://u.y.qq.com/cgi-bin/musicu.fcg?';

async function getSongList(params) {
    let {rec_type} = params,
        url = '';
    switch (rec_type) {
        case 'SONG_SHEET': url = _setSongListUrl(params); break;
        case 'NEW_SONG': url = _setNewSongUrl(params); break;
        case 'NEW_ALBUM': url = _setNewAlbumUrl(params); break;
        case 'MV': url = _setMvUrl(params); break;
    }
    let res = await http(url);
    res = JSON.parse(res);
    return res;
}

/**
 * [_setSongListUrl 获取推荐歌单url]
 * @param [type] String 是否为个性推荐
 * @param [id] Number 歌单推荐分类id：3317官方歌单、3332年终盘点、71情歌、3056网络歌曲、59经典
 * @param [index] 页码
 * @return String
 * */
function _setSongListUrl({type, id, index = 1} = {}) {
    let data = null;
    if (type === 'personal') {
        data = {
            comm: {
                ct: 24
            },
            recomPlaylist: {
                method: "get_hot_recommend",
                param: {
                    async: 1,
                    cmd: 2
                },
                module: "playlist.HotRecommendServer"
            }
        }
    }else {
        data = {
            "comm": {
                "ct": 24
            },
            "playlist": {
                "method": "get_playlist_by_category",
                "param": {
                    "id": +id,
                    "curPage": index,
                    "size": 40,
                    "order": 5,
                    "titleid": +id
                },
                "module": "playlist.PlayListPlazaServer"
            }
        }
    }
    return getParameter(data);
}

/**
 * [_setNewSongUrl 设置获取新歌的url]
 * @param [type] Number 新歌类型：1内地、2港台、3欧美、4日本、5韩国
 * @return String 拼接完成的请求地址
 * */
function _setNewSongUrl({type = 1} = {}) {
    let data = {"comm":{"ct":24},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":+type}}};
    return getParameter(data);

}

/**
 * [_setNewAlbumUrl 设置获取新专辑的url]
 * @param [area] Number 专辑的地区：1内地、0港台、3欧美、15韩国、14日本
 * @return String 拼接完成的请求地址
 * */
function _setNewAlbumUrl({area = 1} = {}) {
    let data = {"comm":{"ct":24},"new_album":{"module":"music.web_album_library","method":"get_album_by_tags","param":{"area":+area,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":40,"click_albumid":0}}}
    return getParameter(data);
}

/**
 * [_setMvUrl 设置获取mv的url]
 * @param [type] String mv分类：all精选、neidi内地、korea韩国、gangtai港台、oumei欧美、janpan日本
 * @return String
 * */
function _setMvUrl({type = 'all'} = {}) {
    let parameter = {
        format: 'json',
        outCharset: 'GB2312',
        platform: 'yqq.json',
        cmd: 'shoubo',
        lan: type
    };
    return splicing(BASE_URL, Object.assign(BASE_DATA, parameter));
}

/**
 * [getParameter 拼接基本参数的通用函数]
 * @param [data] Object 同一接口的不同参数
 * @return String 拼接好的url
 * */
function getParameter(data) {
    let random = getRandom('integer');
    let parameter = {
        '-': `recom${random}`,
        platform: 'yqq.json',
        format: 'json',
        data: ''
    };
    parameter.data = JSON.stringify(data);
    return splicing(BASE_URL, Object.assign(BASE_DATA, parameter));
}

module.exports = {
    getSongList
};