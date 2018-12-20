let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
const SINGLE_PAGE_NUM = 30;
const BASE_URL = 'https://u.y.qq.com/cgi-bin/musicu.fcg?';
const BASE_DATA = {
    callback: '',
    g_tk: 5381,
    jsonpCallback: '',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: ''
};

async function getAlbum(params) {
    let url = _setUrl(params);
    //res可能出错
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}


function _setUrl({singer_mid, index}) {
    let parameter = {
        singerAlbum: {
            method: 'get_singer_album',
            param: {
                singermid: singer_mid,
                order: 'time',
                begin: (index - 1) * SINGLE_PAGE_NUM,
                num: SINGLE_PAGE_NUM,
                exstatus: 1
            },
            module: 'music.web_singer_info_svr'
        }
    };
    let name = "getUCGI" + (Math.random() + "").replace("0.", "");
    BASE_DATA.callback = name;
    BASE_DATA.jsonpCallback = name;
    BASE_DATA.data = encodeURIComponent(JSON.stringify(parameter));
    return splicing(BASE_URL, BASE_DATA);
}

module.exports = getAlbum;