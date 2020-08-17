const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
router = new Router();

const handler = require('./handler');

router.get('/byId/:Id',handler.byId);
router.get('/byName/:Name',handler.byName);
router.get('/byAuthor/:Author',handler.byAuthor);
router.get('/buyBook/:bookId', handler.bookId);
router.post('/addBook', handler.callAddBook);


module.exports = router;
