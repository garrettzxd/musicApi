let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
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

//获取专辑数据，歌手无关
async function albumRequest(params) {
    let url = _setUrl(params);
    let res = await http(url);
    res = dataProcessing(res);
    return res;
}

/**
 * [_setUrl 设置请求url]
 * @param [area] 专辑地区，7：默认推荐专辑，1：内地，0：港台，3：欧美，15：韩国，14：日本，4：其他
 * @param [company] 唱片发行公司，根据地区的筛选有不同值
 * @param [genre] 流派，1：流行、2：古典、3：爵士、36：摇滚、22：电子、27：拉丁、21：轻音乐、39：世界音乐、34：嘻哈、37：原声、19：乡村、20：舞曲、33：R&B、23：民谣、28：金属
 * @param [type] 类别，0：专辑，11：EP，10：single，1：演唱会，3：动漫，4：游戏
 * @param [year] 年代，17：2018，14：2017，7：2016，8：2015，9：2014，15：2013，16：2012，2：一零年代，3：零零年代，4：九十年代，5：八十年代，6：七十年代，13，六十年代
 * @param [sort] 筛选，2：最新专辑，5：最热专辑
 * @param [index] 页码初始为1
 * @return String
 * */
function _setUrl({area = 7, company = -1, genre = -1, type = -1, year = -1, sort = 2, index = 1} = {}) {
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

    return splicing(BASE_URL, BASE_DATA);
}

module.exports = albumRequest;