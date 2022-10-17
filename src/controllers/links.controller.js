import { nanoid } from 'nanoid';

import { linksRepository } from '../repositories/links.repository.js';

async function createLink (req, res) {
    const userId = res.locals.userId;
    const { originalUrl } = res.locals.newLinkObj;
    const shortUrl = nanoid(8);

    try {
        await linksRepository.createUrl(userId, originalUrl, shortUrl);
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
        await linksRepository.createAccess(id);
        res.redirect(originalUrl);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function deleteLink (req, res) {
    const { urlObj, userId } = res.locals;

    if (urlObj.userId !== userId) {
        res.sendStatus(401);
        return;
    };
    
    try {
        await linksRepository.deleteAccess(urlObj.id);
        await linksRepository.deleteUrl(urlObj.id);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    };
};

export {
    createLink,
    getLinkById,
    openShortLink,
    deleteLink
}