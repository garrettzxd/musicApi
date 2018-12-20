let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
const SINGLE_PAGE_NUM = 80;
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

async function singeRequest(params) {
    let url = _setUrl(params);
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

/**
 * [_setUrl 动态生产请求URL]
 * @param  {[Number]} pageNumber [页码]
 * @param  {number} sex [性别：-100(all)、0(male)、1(female)、2(band)]
 * @param  {number} genre [音乐类型：-100(默认)、1(流行)、2(摇滚)、3(民谣)、4(电子)、5(爵士)、6(嘻哈)、8(R&G)、9(轻音乐)、10(民歌)、20(蓝调)、25(乡村)]
 * @return {string}            [生成的URL]
 */
function _setUrl({page = 1, area = -100, sex = -100, genre = -100, index = -100} = {}) {
    let parameter = {
        "comm":{
            "ct":24,
            "cv":10000
        },
        "singerList":{
            "module":"Music.SingerListServer",
            "method":"get_singer_list",
            "param":{
                "area": +area,
                "sex": +sex,
                "genre": +genre,
                "index": +index,
                "sin": (+page - 1)*SINGLE_PAGE_NUM,
                "cur_page": +page
            }
        }
    };
    let name = "getUCGI" + (Math.random() + "").replace("0.", "");
    BASE_DATA.callback = name;
    BASE_DATA.jsonpCallback = name;
    BASE_DATA.data = encodeURIComponent(JSON.stringify(parameter));

    return splicing(BASE_URL, BASE_DATA);
}

module.exports = singeRequest;
