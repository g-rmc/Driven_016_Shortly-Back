import { connection } from '../database/database.js'

async function validateAuthorization (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).send('missing token');
        return;
    };

    try {
        const validSession = await connection.query(`
            SELECT * FROM sessions
            WHERE "userToken" = $1;`,
            [token]
        );
        if(validSession.rows.length === 0){
            res.status(401).send('invalid token');
            return;
        }
        res.locals.userId = validSession.rows[0].userId;
    } catch (error) {
        res.sendStatus(500);
        return;
    };

    next();
};

export { validateAuthorization };