let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
const SINGLE_PAGE_NUM = 30;
const BASE_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?';

async function getSongRequest(params) {
    let url = _setUrl(params);
    console.log('url:', url);
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

/**
 * [_setUrl 设置请求url]
 * @param [singer_mid] String 歌手唯一标识ID
 * @param [index] Number 当前页码
 * @param [user] Number 登陆用户qq号
 * @return String
 * */
function _setUrl({singer_mid, index = 1, user = 977563190} = {}) {
    let parameter = {
        g_tk: 5381,
        jsonpCallback: 'MusicJsonCallbacksinger_track',
        loginUin: user,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singer_mid,
        order: 'listen',
        begin: (index - 1) * SINGLE_PAGE_NUM,
        num: SINGLE_PAGE_NUM,
        songstatus: 1
    };
    return splicing(BASE_URL, parameter);
}

module.exports = getSongRequest;