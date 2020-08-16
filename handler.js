const aws_sdk = require('aws-sdk');
const { timeStamp } = require('console');

aws_sdk.config.update({region: 'ap-south-1'});

const docClient = new aws_sdk.DynamoDB.DocumentClient();


function getIdByName(bookn){
    var params = {
        TableName : 'books_dev',
        IndexName : 'book_name-index',
        KeyConditionExpression : 'book_name = :book_name',
        ExpressionAttributeValues : {
            ':book_name' : bookn,
        }
    };

      return new Promise((res,rej)=>{
        docClient.query(params, (err,response)=>{  
            if(err){
                rej(err);
            }
            if(response){
               res(response.Items[0].book_id);
            }
        });
    })
}



async function getId(ctx) {
    await getIdByName(ctx.params.bookName).then(
        result => {
            ctx.body=result;
        }
    ).catch(err=>{
        ctx.body=err;
    }
     )
}

function Available(bookn){
    var params = {
        TableName : 'books_dev',
        IndexName : 'book_name-index',
        KeyConditionExpression : 'book_name = :book_name',
        ExpressionAttributeValues : {
            ':book_name' : bookn,
        }
    };

      return new Promise((res,rej)=>{
        docClient.query(params, (err,response)=>{  
            if(err){
                rej(err);
            }
            if(response){
                if(response.Items.length!=0){
                    res(true);
                }
                else
                {
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

module.exports = {
    getIdByName,
    getId,
    isAvailable,
    Available
}

