let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
const SINGLE_PAGE_NUM = 52;
const BASE_URL = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg?';
const BASE_DATA = {
    g_tk: 211953953,
    jsonpCallback: 'singermvlistMusicJsonCallback',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    order: 'listen',
    cid: 205360581
};

async function getMV(params) {
    let url = _setUrl(params);
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

function _setUrl({singer_mid, index = 1}) {
    let parameter = {
        singermid: singer_mid,
        begin: (index - 1) * SINGLE_PAGE_NUM,
        num: SINGLE_PAGE_NUM
    };
    parameter = Object.assign(parameter, BASE_DATA);
    return splicing(BASE_URL, parameter);
}

module.exports = getMV;