import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { connection } from '../database/database.js';

async function userSignUp (req, res) {
    res.status(200).send('userSignUp')
};

async function userSignIn (req, res) {
    res.status(200).send('userSignIn')
};

export { userSignUp, userSignIn}