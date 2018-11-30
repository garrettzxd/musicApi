let allRoute = require('./allRoute');
let routes = require('./routesConfig');

/**
 * [routers 路由组装函数，将路由配置中的全部实例化]
 * @param app [express实例]
 * */
function routers(app) {
    allRoute(app);
    for (let item of routes) {
        app.use(item.path, getUrl(item.file_name));
    }
}

/**
 * [getUrl 获得目标路由文件对象]
 * @param name [文件名称]
 * @return Object [require文件实例对象]
 * */
function getUrl(name) {
    return require(`${__dirname}/${name}`);
}

module.exports = routers;
