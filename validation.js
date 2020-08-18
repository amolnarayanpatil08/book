const Joi = require('joi');

const bookSchema = {
    book_id:Joi.number().required(),
    book_name:Joi.string().required(),
    author:Joi.string().required(),
    quantity:Joi.number().required()
}

module.exports = bookSchema;