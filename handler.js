
db = require('./db');


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
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    );
}
async function byName(ctx) {
    await db.getByBookName(ctx.params.Name).then(
        result => {
            ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    );
}
async function byAuthor(ctx) {
    await db.getByAuthor(ctx.params.Author).then(
        result => {
            if (result.length == 0) {
                ctx.body = 'No Data for this author';
            }
            else
                ctx.body = result;
        }
    ).catch(err => {
        ctx.body = err;
    }
    );
}

function Validate(bookObject) {
    if (typeof (obj.book_id) === 'number' && typeof (obj.book_name) === 'string' && typeof (obj.author) === 'string' && typeof (obj.quantity) === 'number') {
        return true;
    }
    else
        return false;
}

async function callAddBook(ctx) {
    obj = ctx.request.body;
    res = await Validate(obj)
    if (res) {
        await db.addBook(ctx.request.body).then(
            result => {
                ctx.body = result;
            }
        ).catch(err => {
            ctx.body = err;
        }
        )
    }
    else{
        ctx.body="please enter valid data"
    }
}

module.exports = {
    byId,
    byName,
    byAuthor,
    callAddBook,
    bookId
}

