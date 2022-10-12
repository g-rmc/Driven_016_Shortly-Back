import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { connection } from '../database/database.js';

async function userSignUp (req, res) {
    res.status(200).send('userSignUp')
};

async function userSignIn (req, res) {
    try {
        const aux = await connection.query(
            `SELECT * FROM users;`
        );
        res.status(200).send(aux.rows)
    } catch (error) {
        res.sendStatus(500);
    }
};

export { userSignUp, userSignIn}