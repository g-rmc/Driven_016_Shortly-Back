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

    const validation = newUrlSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        res.status(422).send(validation.error.details.map(err => err.message));
        return;
    };

    const { url } = req.body;
    const newLinkObj = { originalUrl: stripHtml(url).result};

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

    res.locals.newLinkObj = newLinkObj;
    next();
};

export { validateAuthorization }