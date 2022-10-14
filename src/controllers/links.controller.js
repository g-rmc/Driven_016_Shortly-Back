import { nanoid } from 'nanoid';

import { connection } from '../database/database.js';

async function createLink (req, res) {
    const userId = res.locals.userId;
    const { originalUrl } = res.locals.newLinkObj;
    const shortUrl = nanoid(8);

    try {
        await connection.query(`
            INSERT INTO urls
            ("userId", "originalUrl", "shortUrl")  
            VALUES
            ($1, $2, $3);`,
            [userId, originalUrl, shortUrl]
        );
        res.status(201).send({shortUrl});
    } catch (error) {
        res.sendStatus(500);
    }
};

async function getLinkById (req, res) {
    const { id, originalUrl, shortUrl } = res.locals.urlObj;

    res.send({
        id,
        shortUrl,
        url: originalUrl
    });
};

async function openShortLink (req,res) {
    const { id, originalUrl } = res.locals.originalUrl;

    try {
        await connection.query(`
            INSERT INTO access
            ("urlId")
            VALUES
            ($1);`,
            [id]
        );
        res.redirect(originalUrl);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function deleteLink (req, res) {
    console.log('deleteLink');
    res.sendStatus(200);
};

export {
    createLink,
    getLinkById,
    openShortLink,
    deleteLink
}