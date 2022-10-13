import { v4 as uuid } from 'uuid';

import { connection } from '../database/database.js';

async function userSignUp (req, res) {
    const { name, email, hashPassword } = res.locals.newUserObj;

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
    const token = uuid();
    const userId = res.locals.userId;

    try {
        await connection.query(`
            INSERT INTO sessions
            ("userId", "userToken")
            VALUES
            ($1, $2);`,
            [userId, token]
        );
        res.status(200).send({token})
    } catch (error) {
        res.sendStatus(500);
    }
};

export { userSignUp, userSignIn}