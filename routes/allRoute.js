/**
 * [allRoute 针对所有路由生效]
 * @param app [express 实例]
 * */
function allRoute(app) {
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin','http://localhost:8080');

        res.header('Access-Control-Allow-Headers', 'content-type');

        res.header('Access-Control-Allow-Methods', 'GET, POST');

        res.header('Access-Control-Allow-Credentials', true);

        next()
    });
}

module.exports = allRoute;