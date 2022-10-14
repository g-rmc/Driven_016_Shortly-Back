import { stripHtml } from 'string-strip-html';

import { connection } from '../database/database.js';
import { newUrlSchema, shortUrlSchema } from '../schemas/links.schemas.js'

async function validateNewLink (req, res, next){
    const validation = newUrlSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        res.status(422).send(validation.error.details.map(err => err.message));
        return;
    };

    const { url } = req.body;
    const newLinkObj = { originalUrl: stripHtml(url).result};
    res.locals.newLinkObj = newLinkObj;

    next();
};

async function validateShortId (req, res, next){
    const { id } = req.params;

    if (isNaN(Number(id))){
        res.status(422).send('invalid id');
        return;
    };

    try {
        const validId = await connection.query(`
            SELECT * FROM urls
            WHERE id = $1;`,
            [id]
        );
        if (validId.rows.length === 0){
            res.status(404).send('id not found');
            return;
        };
        res.locals.urlObj = validId.rows[0];
    } catch (error) {
        res.sendStatus(500);
        return;
    };
    next();
};

async function validateShortUrl (req, res, next){
    const validation = shortUrlSchema.validate(req.params, {abortEarly: false});
    if (validation.error) {
        res.status(422).send(validation.error.details.map(err => err.message));
        return;
    };

    const { shortUrl } = req.params;
    try {
        const originalUrl = await connection.query(`
            SELECT * FROM urls
            WHERE "shortUrl" = $1;`,
            [shortUrl]
        );
        if (originalUrl.rows.length === 0){
            res.status(404).send('short url not found');
            return;
        };
        res.locals.originalUrl = originalUrl.rows[0];
    } catch (error) {
        res.sendStatus(500);
        return;
    };
    next();
}

export { validateNewLink, validateShortId, validateShortUrl }