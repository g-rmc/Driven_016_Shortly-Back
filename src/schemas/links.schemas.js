import joi from 'joi';

const newUrlSchema = joi.object({
    url: joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'html').required()
});

const shortUrlSchema = joi.object({
    shortUrl: joi.string().length(8).required()
});

export { newUrlSchema, shortUrlSchema }