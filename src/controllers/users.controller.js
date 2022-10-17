import { v4 as uuid } from 'uuid';

import { usersRepository } from '../repositories/users.repository.js';

async function userSignUp (req, res) {
    const { name, email, hashPassword } = res.locals.newUserObj;

    try {
        await usersRepository.createUser(name, email, hashPassword);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function userSignIn (req, res) {
    const token = uuid();
    const userId = res.locals.userId;

    try {
        await usersRepository.createSession(userId, token);
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
        const totalAccess = await usersRepository.getUserAccess(id);
        visitCount = totalAccess.rows[0].totalAccess;
    } catch (error) {
        res.sendStatus(500);
        return;
    };

    try {
        const userUrls = await usersRepository.getUserUrls(id);
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
    try {
        const ranking = await usersRepository.getRanking();
        res.send(ranking.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

export {
    userSignUp,
    userSignIn,
    getUserById,
    getUsersRanking
};