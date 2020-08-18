const aws_sdk = require('aws-sdk');
db = require('./db');
const schema = require('./validation');



async function bookId(ctx) {
    await db.buyBook(parseInt(ctx.params.bookId)).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        if(err){
            if(err.code=="ConditionalCheckFailedException"){
                ctx.body="Invalid Id";
            }
            else
            {
                ctx.body=err;
            }
           
        }
    }
    )
}

async function byId(ctx) {

	console.log(ctx.url);
      await db.getByBookId(ctx.params.Id).then(
        result => {
            if(result.Item==null){
                ctx.body='No such data';
            }            
            else{
                ctx.body=result;
            }
        }
    ).catch(err=>{
        if(err){
            ctx.body = err;
        }
    }
     );
}
async function byName(ctx) {
      await db.getByBookName(ctx.params.Name).then(
        result => {
            if(result.Count==0)
            {
                ctx.body="Book not available.";
            }
            else
            {
                ctx.body=result;
            }
        }
    ).catch(err=>{
        if(err){
            ctx.body = err;
        }
    }
     );
}
async function byAuthor(ctx) {
    await db.getByAuthor(ctx.params.Author).then(
        result => {
		if(result.length==0){ 
            ctx.body='No Book for this author';
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

async function callAddIssueDetails(ctx) {
    await addIssueDetails(ctx.request.body).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        if(err){
            if(err.code=="ValidationException"){
                ctx.body="Please add numeric value";
            } 
            else
            ctx.body="Please add existing book id";
        }     
    }
    )
}

async function addIssueDetails(valueObject) {
    var user_id = await db.getUser();
    var book = await db.getDays(parseInt(valueObject.bid));
    var issue_id= parseInt(valueObject.id);
    let date = new Date(); 
    var return_date=await (date.addDays(book.days)).toString();
    var response = await db.issueDetails(issue_id,book.book_id,user_id,return_date);
}

module.exports = {
	byId,
	byName,
	byAuthor,
	callAddBook,
    bookId,
    callAddIssueDetails
}


