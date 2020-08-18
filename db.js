const aws_sdk = require('aws-sdk');
const schema = require('./validation');

aws_sdk.config.update({region: 'ap-south-1'});

const book = new aws_sdk.DynamoDB.DocumentClient();

function getByBookId(id) {
    var params = {
        TableName: "books_dev",
        Key: {
            book_id:parseInt(id)
        }
    };

    return new Promise((res,rej)=>{
        book.get(params, (err,response)=>{  
            if(err){
                rej(err);
            }
            if(response){
               res(response);
            }
        });
    })
}

function getByBookName(name) {
    var params = {
        TableName: "books_dev",
        IndexName: "book_name-index",
        KeyConditionExpression: "book_name = :book_name",
    ExpressionAttributeValues: {
        ":book_name": name
    },
    };
    return new Promise((res,rej)=>{
        book.query(params, (err,response)=>{  
            if(err){
                rej(err);
            }
            if(response){
               res(response);
            }
        });
    })
}


function getByAuthor(AuthorName) {
    var params = {
        TableName: "books_dev",
        IndexName: "author-index",
        KeyConditionExpression: "author = :author_name",
    ExpressionAttributeValues: {
        ":author_name": AuthorName
    },
    };
    return new Promise((res,rej)=>{
        book.query(params, (err,response)=>{  
            if(err){
                rej(err);
            }
            if(response){

		        let arr=[];
		        for(i=0;i<response.Items.length;i++)
		            arr.push(response.Items[i].book_name);
		        res((arr));
            }
        });
    })
}

function buyBook(Bid) {
    var params = {

        TableName: "books_dev",
        Key: {
            book_id: Bid,

        },
        UpdateExpression: "set quantity = quantity - :val",
        ConditionExpression: 'quantity > :inc',
        ExpressionAttributeValues: {

            ":val": 1,
            ":inc": 0
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("Updating the item...");

    return new Promise((res, rej) => {

        book.update(params, function (err, data) {
            if (err) {
                rej(err)
            } if (data) {
                res(data)
            }
        });
    })

}
let addBook = function (valueObject) {
    
    var params = {
        TableName: "books_dev",
        Item: {
            book_id: valueObject.book_id,
            book_name: valueObject.book_name,
            quantity: valueObject.quantity,
            author: valueObject.author
        },
    };


    return new Promise((res, rej) => {
        book.put(params, (err, Response) => {
            if (err) {
                rej(err)
            }
            if (Response) {
                res(Response.Item)
            }

        })
    })

}

let getUser = function () {
    var params = {
        TableName: "try_user_dev",
        Key: {
            user_id:1
        }
    };
    var U_id;
    return new Promise((res,rej)=>{
        book.get(params, function (err, data) {
            if (err) {
                rej(console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2)));
            }
            else {
                res(data.Item.user_id);
            }

        })
    });
}

Date.prototype.addDays = function(days) {
    let d = new Date(this.valueOf());
    d.setDate(d.getDate() + days);
    return d;
}

let issueDetails = function(issue_id,bid,uid,date){
    var params = {
            TableName: "issue_details_dev",
            Item: {
                issue_id:issue_id,
                book_id:bid,
                user_id:uid,
                return_date:date
            }
        };
        return new Promise((res,rej)=>{
        book.put(params,(err,Response)=>{
            if (err) {
                 rej(err)
            }
            if(Response){
                res(params.Item) 
            }
        })
    })
}

let getDays = function (id) {
    var params = {
        TableName: "try1_book_dev",
        Key: {
            book_id:id
        }
    };
    var bid;
    return new Promise((res,rej)=>{
    book.get(params, function (err, data) {
        if (err) {
            rej(console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2)));
        }
        else {
            res(data.Item);
            
        }
    })
});
}

module.exports = {
    getByBookId,
    getByBookName,
    getByAuthor,
    buyBook,
    addBook,
    getUser,
    getDays,
    issueDetails
}
