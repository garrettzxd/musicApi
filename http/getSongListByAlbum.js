let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
let {BASE_DATA} = require('../common/constants');
const BASE_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?';

async function getSong(params) {
    let url = _setUrl(params);
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

function _setUrl({album_mid}) {
    let parameter = {
        albummid: album_mid,
        jsonpCallback: 'albuminfoCallback'
    };
    return splicing(BASE_URL, Object.assign(BASE_DATA, parameter));
}

module.exports = getSong;