function install(base, obj) {
    let result = base;
    for (let [key, val] of Object.entries(obj)) {
        if (val) {
            result += `${key}=${val} and `;
        }
    }
    return result;
}

module.exports = install;