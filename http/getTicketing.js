let http = require('../common/http');
let {splicing, dataProcessing} = require('../common/currency');
let {BASE_DATA} = require('../common/constants');
const BASE_URL = 'https://u.y.qq.com/cgi-bin/musicu.fcg?';

async function getTicket(params) {
    let url = _setUrl(params);
    console.log(url);
    let res = await http(url);
    res = JSON.parse(res);
    return res;
}

/**
 * [_setUrl 设置请求url]
 * @param [city_id] Number 城市ID
 * @param [show_type] Number 票务分类
 * @param [ticket_type] String 票务类型
 * @return String
 * */
function _setUrl({city_id = 10, type_id, ticket_type = 'all'} = {}) {
    let data = null,
        parameter = {
        g_tk: 1887049954,
        format: 'json',
        outCharset: 'GB2312',
        platform: 'yqq.json',
        data: null
    };
    if (ticket_type === "all") {
        data = {
            getFirstData: {
                module: 'mall.ticket_index_page_svr',
                method: 'GetTicketIndexPage',
                param: {
                    city_id
                }
            }
        }
    }else {
        data = {
            getCategoryData: {
                module: 'mall.ticket_index_page_svr',
                method: 'SearchShow',
                param: {
                    city_id: +city_id,
                    show_type: +type_id,
                    page_size: 20,
                    page_index: 0,
                    time_type: 0
                }
            },
            getFilter: {
                module: "mall.ticket_index_page_svr",
                method: "GetSearchTypeList",
                param: {
                    city_id: +city_id,
                    type_id: +type_id
                }
            }
        };
    }
    parameter.data = JSON.stringify(data);
    return splicing(BASE_URL, Object.assign(BASE_DATA, parameter));
}

module.exports = getTicket;