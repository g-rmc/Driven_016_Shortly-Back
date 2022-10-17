import jwt from 'jsonwebtoken';

import { usersRepository } from '../repositories/users.repository.js'

async function validateAuthorization (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).send('missing token');
        return;
    };

    try {
        const validation = jwt.verify(token, process.env.TOKEN_SECRET);
        const validSession = await usersRepository.getSessionToken(token);
        if(validSession.rows.length === 0){
            res.status(401).send('invalid token');
            return;
        };
        if(validSession.rows[0].userId !== validation.userId){
            res.status(401).send('invalid token');
            return;
        }
        res.locals.userId = validation.userId;
    } catch (error) {
        res.sendStatus(500);
        return;
    };

    next();
};

export { validateAuthorization };