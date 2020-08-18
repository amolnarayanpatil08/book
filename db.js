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

module.exports = {
    getByBookId,
    getByBookName,
    getByAuthor,
    buyBook,
    docClient,
    addBook,
    
}
