import express from 'express';

import { userSignUp, userSignIn, getUserById, getUsersRanking } from '../controllers/users.controller.js';
import { validateNewUserObject, validateLoginObject } from '../middlewares/users.middleware.js';

const router = express.Router();

router.post('/signup', validateNewUserObject, userSignUp);
router.post('/signin', validateLoginObject, userSignIn);
router.get('/users/me', getUserById);
router.get('/ranking', getUsersRanking);

export default router;