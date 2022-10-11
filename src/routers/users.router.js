import express from 'express';

import { userSignUp, userSignIn } from '../controllers/users.controller.js';

const router = express.Router();

//router.use(middleware);

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);

export default router;