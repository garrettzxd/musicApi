/**
 * [dataProcessing 数据格式化，变成json更易处理,由于原始数据是callback返回数据类型]
 * @param  {[String]} data [原始数据]
 * @return {[Object]}      [处理后的json对象]
 */
function dataProcessing(data) {
    let fir_index = data.indexOf('(')+1;
    let last_index = data.lastIndexOf(')');
    return JSON.parse(data.slice(fir_index,last_index));
}

/**
 * [splicing 请求url拼接，构建get请求]
 * @param [base] [String] 基础url
 * @param [parameter] [Object] 参数对象
 * @return String
 * */
function splicing(base, parameter) {
    let result = base;
    if (typeof parameter !== 'object') {
        console.error('parameter must be Object');
        return
    }
    for (let key in parameter) {
        result = result + `${key}=${parameter[key]}&`;
    }
    return result;
}

module.exports = {
    splicing,
    dataProcessing
};