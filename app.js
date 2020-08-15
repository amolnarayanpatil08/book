Ashish Munde
const aws_sdk = require('aws-sdk');
const { timeStamp } = require('console');

aws_sdk.config.update({region: 'ap-south-1'});

const books = new aws_sdk.DynamoDB.DocumentClient();



function addBook(){
    const params = {
        TableName:"books_dev",
        Item:{
            book_id:3,
            book_name:'Harry Potter',
            author:'J K',
            cost: 500
        }
    }

    return new Promise((res,rej)=>{
        books.put(params, (err,response)=>{
            if(err){
                rej(err);
            }
            if(response){
                res(response);
            }
        });
    })

}

function getBook(){
	
    const params = {
        TableName:"books_dev",
        Key:{
            book_id:1
        }
    };
    return new Promise((res,rej)=>{
        books.get(params, (err,response)=>{
            if(err){
                rej(err);
            }
            if(response){
               res(console.log(response));
            }
        });
    })

}
async function test() {
    const response = await getBook();
}

test();