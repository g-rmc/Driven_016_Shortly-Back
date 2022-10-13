import { connection } from '../database/database.js';

async function createLink (req, res) {
    console.log('createLink');
    res.sendStatus(200);
};

async function getLinkById (req, res) {
    console.log('getLinkById');
    res.sendStatus(200);
};

async function openShortLink (req,res) {
    console.log('openShortLink');
    res.sendStatus(200);
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