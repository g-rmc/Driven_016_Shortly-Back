import { connection } from "../database/database.js";

async function createUrl(userId, originalUrl, shortUrl){
    return connection.query(`
        INSERT INTO urls
        ("userId", "originalUrl", "shortUrl")  
        VALUES
        ($1, $2, $3);`,
        [userId, originalUrl, shortUrl]
    );
};

async function createAccess(id){
    return connection.query(`
        INSERT INTO access
        ("urlId")
        VALUES
        ($1);`,
        [id]
    );
};

async function deleteAccess(id){
    return connection.query(`
        DELETE FROM access
        WHERE "urlId" = $1;`,
        [id]
    );
};

async function deleteUrl(id){
    return connection.query(`
        DELETE FROM urls
        WHERE id = $1;`,
        [id]
    );
};

export const linksRepository = {
    createUrl,
    createAccess,
    deleteAccess,
    deleteUrl
}