const restify = require('restify');
const random = require("random-js")();

const server = restify.createServer();
server.get('/hello/:name', (req, res, next) => {
    let {
        name
    } = req.params;

    if (name == 'test') {
        // 模拟非正常退出
        if (random.integer(0, 9) > 6) {
            process.exit(1);
        }
    }

    res.send({
        status: 'OK'
    });
    next();
});
server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
