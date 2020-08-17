const aws_sdk = require('aws-sdk');
const { timeStamp } = require('console');
db = require('./db');

// aws_sdk.config.update({region: 'ap-south-1'});

// const docClient = new aws_sdk.DynamoDB.DocumentClient();

async function bookId(ctx) {
    await db.buyBook(parseInt(ctx.params.bookId)).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    )
}

async function byId(ctx) {

	console.log(ctx.url);
      await db.getByBookId(ctx.params.Id).then(
        result => {
            ctx.body=result;
        }
    ).catch(err=>{
        ctx.body=err;
    }
     );
}
async function byName(ctx) {
      await db.getByBookName(ctx.params.Name).then(
        result => {
            ctx.body=result;
        }
    ).catch(err=>{
        ctx.body=err;
    }
     );
}
async function byAuthor(ctx) {
    await db.getByAuthor(ctx.params.Author).then(
        result => {
		if(result.length==0){ 
            ctx.body='No Data for this author';
        }
	    else
            ctx.body=result;
        }
    ).catch(err=>{
        ctx.body=err;
        }
     );
}

async function callAddBook(ctx) {
    await db.addBook(ctx.request.body).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    )
}

module.exports = {
	byId,
	byName,
	byAuthor,
	callAddBook,
	bookId
}

