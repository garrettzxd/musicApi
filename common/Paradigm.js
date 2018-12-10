
/**
 * [paradigm 接口返回最终数据范式]
 * @param code [Number] [错误代码]
 * @param data [Object] [查询结果]
 * @param error[String] [错误信息]
 * @return [Object] [范式结果]
 * */
function paradigm({message, data, err_msg} = {}) {
    let result = Object.create(null);
    result.code = message.code;
    result.data = data;
    if (message.code) {
        result.error = err_msg || message.error || '位未知错误';
    }
    return result;
}

module.exports = paradigm;