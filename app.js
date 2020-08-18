const koa = require('koa');
const logger = require('koa-logger');
const app = new koa();
const router = require('./router');

app.use(logger());
app.use(require('koa-body')());
app.use(router.allowedMethods());
app.use(router.routes());

app.listen(3000);
