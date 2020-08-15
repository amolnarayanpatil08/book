var AWS = require('aws-sdk');
changes
var region = "ap-south-1";
var accessKeyId = process.env.AKIAV4ZS7S3BS3YWGWFL;
var secretAccessKey = process.env.+y4mfiN7KbNfpY6iJumN3dYxudqSgrvuQYr+UAfb;
var tableName = "books_dev";

var dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: ap-south-1,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});


var params = {
  Item: {
    book_id: 12345,
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


//var fileItem = {
  //  Key: {
    //  book_id: 1234
    //},
    //TableName: tableName,
//};

//dynamoDB.delete(fileItem, function(err, data) {
 // if (err) {
   // console.log(err, err.stack);
  //}
 // else {
   // console.log(data);
  //}
//});
