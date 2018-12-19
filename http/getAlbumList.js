let http = require('../common/http');
let {dataProcessing} = require('../common/currency');
const SINGLE_REQUEST_COUNT = 40;   //单次请求数据量
const BASE_URL = 'https://u.y.qq.com/cgi-bin/musicu.fcg?';
const BASE_DATA = {
    callback: '',
    g_tk: 211953953,
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

async function albumRequest(params) {
    let url = _setUrl(params);
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

function _setUrl({area = 0, company = -1, genre = -1, type = -1, year = -1, sort = 2, index = 1} = {}) {
    let result = BASE_URL;
    let son_data = {
        albumlib: {
            method: "get_album_by_tags",
            param: {
                area: +area,
                company: +company,
                genre: +genre,
                type: +type,
                year: year,
                sort: +sort,
                get_tags: 1,
                sin: (+index - 1)*SINGLE_REQUEST_COUNT,
                num: SINGLE_REQUEST_COUNT,
                click_albumid: 0
            },
            module: "music.web_album_library"
        }
    };
    let name = "getUCGI" + (Math.random() + "").replace("0.", "");
    BASE_DATA.callback = name;
    BASE_DATA.jsonpCallback = name;
    BASE_DATA.data = JSON.stringify(son_data);
    for (let key in BASE_DATA) {
        result = result + `${key}=${BASE_DATA[key]}&`
    }
    return result;
}

module.exports = albumRequest;