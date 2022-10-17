import { connection } from "../database/database.js";

async function createUser(name, email, hashPassword){
    connection.query(`
        INSERT INTO users
        (name, email, password)
        VALUES
        ($1, $2, $3);`,
        [name, email, hashPassword]
    );
};

async function createSession(userId, token){
    connection.query(`
        INSERT INTO sessions
        ("userId", "userToken")
        VALUES
        ($1, $2);`,
        [userId, token]
    );
};

async function getUserAccess(id){
    return connection.query(`
        SELECT
            COUNT (a.id) AS "totalAccess"
        FROM urls AS u
        LEFT JOIN access AS a
            ON u."id" = a."urlId"
        WHERE u."userId" = $1;`,
        [id]
    );
};

async function getUserUrls(id){
    return connection.query(`
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
};

async function getRanking(){
    return connection.query(`
        SELECT 
            u2.id,
            u2.name,
            COUNT (u1.id) AS "linksCount",
            COUNT (a.id) AS "visitCount"
        FROM urls AS u1
        LEFT JOIN access AS a
            ON u1."id" = a."urlId"
        RIGHT JOIN users AS u2
            ON u1."userId" = u2.id
        GROUP BY
            u2.id
        ORDER BY
            "visitCount" DESC,
            "linksCount" DESC,
            name
        LIMIT 10;
    `);
}

export const usersRepository = {
    createUser,
    createSession,
    getUserAccess,
    getUserUrls,
    getRanking
};