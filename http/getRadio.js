let http = require('../common/http');
let {splicing} = require('../common/currency');
let {BASE_DATA} = require('../common/constants');
const BASE_URL = 'https://u.y.qq.com/cgi-bin/musicu.fcg?';

async function getRdio() {
    let url = _setUrl();
    let res = await http(url);
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
    return splicing(BASE_DATA, Object.assign(BASE_DATA, parameter));
}

module.exports = getRdio;