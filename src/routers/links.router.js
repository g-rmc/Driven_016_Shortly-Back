import express from 'express';

import { createLink, getLinkById, openShortLink, deleteLink } from '../controllers/links.controller.js';
import { validateAuthorization } from '../middlewares/links.middleware.js';

const router = express.Router();

router.post('/urls/shorten', validateAuthorization, createLink);
router.get('/urls/:id', getLinkById);
router.get('/urls/open/:shortUrl', openShortLink);
router.delete('/urls/:id', deleteLink);

export default router;