const aws_sdk = require('aws-sdk');
const { timeStamp } = require('console');

aws_sdk.config.update({ region: 'ap-south-1' });

const docClient = new aws_sdk.DynamoDB.DocumentClient();


function getIdByName(bookn) {
    var params = {
        TableName: 'books_dev',
        IndexName: 'book_name-index',
        KeyConditionExpression: 'book_name = :book_name',
        ExpressionAttributeValues: {
            ':book_name': bookn,
        }
    };

    return new Promise((res, rej) => {
        docClient.query(params, (err, response) => {
            if (err) {
                rej(err);
            }
            if (response) {
                res(response.Items[0].book_id);
            }
        });
    })
}



async function getId(ctx) {
    await getIdByName(ctx.params.bookName).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    )
}

function Available(bookn) {
    var params = {
        TableName: 'books_dev',
        IndexName: 'book_name-index',
        KeyConditionExpression: 'book_name = :book_name',
        ExpressionAttributeValues: {
            ':book_name': bookn,
        }
    };

    return new Promise((res, rej) => {
        docClient.query(params, (err, response) => {
            if (err) {
                rej(err);
            }
            if (response) {
                if (response.Items.length != 0) {
                    res(true);
                }
                else {
                    res(false);
                }
            }
        });
    })
}

async function isAvailable(book_name) {
    const response = await Available(book_name);
    return response;
}


//-------------------------------------------------------------------------------------------------//
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

        docClient.update(params, function (err, data) {
            if (err) {
                rej(err)
                //console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } if (data) {
                res(data)
                //console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    })

}

async function bookId(ctx) {
    await buyBook(parseInt(ctx.params.bookId)).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    )
}


/** 
let addBook = function () {
    var params = {
        TableName: "books_dev",
        Item: {
            book_id:10,
            book_name:'INDIA 2020',
            author:'APJ ABDUL KALAM',
            cost: 650,
            category:"PHILOSOPHY",
            quantity:10
        }
    };


      return new Promise((res,rej)=>{
        docClient.put(params,(err,Response)=>{
            if (err) {
                
                  rej(err)
                //console.log("users::addBook::error - " + JSON.stringify(err, null, 2));
            }
            if(Response){
                res(Response.Item) 
                //console.log("users::addBook::success - " + JSON.stringify(Response, null, 2));
            }
            
        })
    })

}

async function callAddBook(ctx) {
    await addBook().then(
        result => {
            ctx.body=result;
        }
    ).catch(err=>{
        ctx.body=err;
    }
     )
}
**/
let addBook = function (valueObject) {
    var params = {
        TableName: "books_dev",
        Item: {
            book_id: parseInt(valueObject.book_id),
            book_name: valueObject.book_name,
            quantity: parseInt(valueObject.quantity),
            author: valueObject.author

        },
    };


    return new Promise((res, rej) => {
        docClient.put(params, (err, Response) => {
            if (err) {

                rej(err)
                //console.log("users::addBook::error - " + JSON.stringify(err, null, 2));
            }
            if (Response) {
                res(Response.Item)
                //console.log("users::addBook::success - " + JSON.stringify(Response, null, 2));
            }

        })
    })

}

async function callAddBook(ctx) {
    await addBook(ctx.request.body).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    )
}

//--------------------------------------------------------------------------------------------------------------------//
module.exports = {
    getIdByName,
    getId,
    isAvailable,
    Available,
    buyBook,
    bookId,
    addBook,
    callAddBook,



}

