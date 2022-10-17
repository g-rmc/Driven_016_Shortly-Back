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

async function getUrlId(id){
    return connection.query(`
        SELECT * FROM urls
        WHERE id = $1;`,
        [id]
    );
};

async function getShortUrl(shortUrl){
    return connection.query(`
        SELECT * FROM urls
        WHERE "shortUrl" = $1;`,
        [shortUrl]
    );
};

export const linksRepository = {
    createUrl,
    createAccess,
    deleteAccess,
    deleteUrl,
    getUrlId,
    getShortUrl
}