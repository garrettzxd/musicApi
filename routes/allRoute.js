/**
 * [allRoute 针对所有路由生效]
 * @param app [express 实例]
 * */
function allRoute(app) {
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin','*');

        res.header('Access-Control-Allow-Headers', 'content-type');

        res.header('Access-Control-Allow-Methods', 'GET, POST')

        next()
    });
}

module.exports = allRoute;