import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { connection } from '../database/database.js';

async function userSignUp (req, res) {
    const { name, email, password } = res.locals.newUserObj;

    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await connection.query(`
            INSERT INTO users
            (name, email, password)
            VALUES
            ($1, $2, $3);`,
            [name, email, hashPassword]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
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