const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
router = new Router();

const handler = require('./handler');

router.get('/IdByName/:bookName', handler.getId);

module.exports = router;