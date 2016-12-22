const restify = require('restify');
const random = require("random-js")();

const nconf = require('nconf');
nconf.env();
const redisHost=nconf.get('REDIS_HOST');

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
        status: 'OK',
        redisHost
    });
    next();
});
server.listen(3000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
