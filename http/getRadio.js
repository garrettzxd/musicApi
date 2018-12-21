let http = require('../common/http');
let {splicing, dataProcessing} = require('../common/currency');
let {BASE_DATA} = require('../common/constants');
const BASE_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg?';

//获取QQ音乐电台数据
async function getRdio() {
    let url = _setUrl();
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

function _setUrl() {
    let parameter = {
        channel: 'radio',
        page: 'index',
        tpl: 'wk',
        new: 1,
        p: Math.random(),
        g_tk: 2138592180,
        platform: 'yqq.json'
    };
    return splicing(BASE_URL, Object.assign(BASE_DATA, parameter));
}

module.exports = getRdio;