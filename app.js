const koa = require('koa');
//const Router = require('koa-router');
const app = new koa();
const router = require('./router');

app.use(require('koa-body')());
app.use(router.allowedMethods());
app.use(router.routes());

app.listen(3000);
