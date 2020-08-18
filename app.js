const koa = require('koa');
const logger = require('koa-logger');
const app = new koa();
const router = require('./router');

app.use(logger());
app.use(require('koa-body')());
app.use(router.allowedMethods());
app.use(router.routes());

var dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: ap-south-1,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});


var params = {
  Item: {
    book_id: 12348,
    book_name: "demo",
  },

  TableName: tableName,
};

dynamoDB.put(params, function(err, data) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(data);
  }
});



app.listen(3000);

