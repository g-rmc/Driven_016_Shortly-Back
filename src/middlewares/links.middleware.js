import { stripHtml } from 'string-strip-html';

import { connection } from '../database/database.js';
import { newUrlSchema } from '../schemas/links.schemas.js'

async function validateAuthorization (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).send('missing token');
        return;
    };

    try {
        const validSession = await connection.query(`
            SELECT * FROM sessions
            WHERE "userToken" = $1;`,
            [token]
        );
        if(validSession.rows.length === 0){
            res.status(401).send('invalid token');
            return;
        }
        res.locals.userId = validSession.rows[0].userId;
    } catch (error) {
        res.sendStatus(500);
        return;
    };

    next();
};

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
}

export { validateAuthorization, validateNewLink, validateShortId }