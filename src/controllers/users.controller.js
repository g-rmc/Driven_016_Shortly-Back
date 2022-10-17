import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { usersRepository } from '../repositories/users.repository.js';

async function userSignUp (req, res) {
    const { name, email, password } = res.locals.newUserObj;

    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await usersRepository.createUser(name, email, hashPassword);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function userSignIn (req, res) {
    const userId = res.locals.userId;
    const token = jwt.sign(
        {userId},
        process.env.TOKEN_SECRET,
        {
            expiresIn: 2 * 24 * 60 * 60
        }
    );

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