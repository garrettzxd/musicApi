let http = require('../common/http');
let {dataProcessing, splicing} = require('../common/currency');
let {BASE_DATA} = require('../common/constants');
const SINGLE_PAGE_NUM = 30;
const BASE_URL = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?';

//获取某个排行榜下的歌曲列表
async function getRanking(params) {
    let url = _setUrl(params);
    let res = await http(url);
    res = JSON.parse(res);
    return res;
}

//获取排行榜的类型
async function getRankingType() {
    let url = _setUrlRankingType();
    let res = await http(url);
    res = JSON.parse(res);
    return res;
}

/**
 * [_setUrlRankingType 设置获取排行榜的URL]
 * @return String
 * */
function _setUrlRankingType() {
    let parameter = {
        page: 'index',
        format: 'html',
        tpl: 'macv4',
        v8debug: 1,
        jsonCallback: 'jsonCallback'
    };
    return splicing(BASE_URL, parameter);
}

/**
 * [_setUrl 设置获取榜单歌曲的url]
 * @param [top_id] Number 榜单的唯一ID标识
 * @param [type] String 榜单大的分类，top：国内，global：全球榜
 * @param [index] Number 页码
 * @return String
 * */
function _setUrl({top_id = 4, type = 'top', index = 1} = {}) {
    //不同榜单的日期类型不一样
    //由于计算日期类型的算法没找到，于是就用穷举罗列
    let date = new Date(),
        year = date.getFullYear(),
        mouth = date.getMonth(),
        day = date.getDate(),
        date_detail = `${year}-${mouth}-${day}`,
        date_46 = `${year}_46`,
        date_49 = `${year}_49`,
        date_50 = `${year}_50`,
        date_52 = `${year}_52`,
        date_result = '';
    switch (+top_id) {
        case 27:
        case 4: date_result = date_detail; break;
        case 113:
        case 103:
        case 114:
        case 106:
        case 107:
        case 36:
        case 17:
        case 29:
        case 16:
        case 3:
        case 6:
        case 5:
        case 28:
        case 58:
        case 26: date_result = date_50; break;
        case 108: date_result = date_52; break;
        case 123: date_result = date_46; break;
        case 105: date_result = date_49; break;
    }
    console.log('date_result', date_result);
    let parameter = {
        tpl: 3,
        page: 'detail',
        date: date_result,
        topid: top_id,
        type,
        song_begin: (+index - 1) * SINGLE_PAGE_NUM,
        song_num: SINGLE_PAGE_NUM,
        g_tk: 1887049954,
        platform: 'yqq.json'
    };
    return splicing(BASE_URL, Object.assign(BASE_DATA, parameter));
}

module.exports = {
    getRanking,
    getRankingType
};