import express from 'express';

import { createLink, getLinkById, openShortLink, deleteLink } from '../controllers/links.controller.js';
import { validateAuthorization, validateNewLink, validateShortId, validateShortUrl } from '../middlewares/links.middleware.js';

const router = express.Router();

router.post('/urls/shorten', validateAuthorization, validateNewLink, createLink);
router.get('/urls/:id', validateShortId, getLinkById);
router.get('/urls/open/:shortUrl', validateShortUrl, openShortLink);
router.delete('/urls/:id', validateAuthorization, validateShortId, deleteLink);

export default router;