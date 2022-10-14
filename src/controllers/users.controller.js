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

async function getUserById (req, res) {
    const { id, name } = res.locals.userObj;
    let visitCount = 0;
    let shortenedUrls = [];

    try {
        const totalAccess = await connection.query(`
            SELECT
                COUNT (a.id) AS "totalAccess"
            FROM urls AS u
            LEFT JOIN access AS a
                ON u."id" = a."urlId"
            WHERE u."userId" = $1;`,
            [id]
        );
        visitCount = totalAccess.rows[0].totalAccess;
    } catch (error) {
        res.sendStatus(500);
        return;
    };

    try {
        const userUrls = await connection.query(`
            SELECT 
                u.id,
                u."shortUrl",
                u."originalUrl" AS url,
                COUNT (a.id) AS "visitCount"
            FROM urls AS u
            LEFT JOIN access AS a
                ON u."id" = a."urlId"
            WHERE u."userId" = $1
            GROUP BY u.id
            ORDER BY u.id;`,
            [id]
        );
        shortenedUrls = userUrls.rows;
    } catch (error) {
        res.sendStatus(500);
        return;
    };

    res.send({
        id,
        name,
        visitCount,
        shortenedUrls
    });
};

async function getUsersRanking (req, res) {
    console.log('getLinksRanking');
    res.sendStatus(200);
};

export {
    userSignUp,
    userSignIn,
    getUserById,
    getUsersRanking
}