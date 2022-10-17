import { stripHtml } from "string-strip-html";
import bcrypt from 'bcrypt';

import { usersRepository } from "../repositories/users.repository.js";
import { newUserSchema, loginSchema } from "../schemas/users.schemas.js";

async function validateNewUserObject (req, res, next) {
    const validation = newUserSchema.validate(req.body, {abortEarly: false});
    if (validation.error){
        res.status(422).send(validation.error.details.map(err => err.message));
        return;
    };

    const { name, email, password, confirmPassword } = req.body;
    const newUserObj = {
        name: stripHtml(name).result,
        email: stripHtml(email).result,
        password: stripHtml(password).result,
        confirmPassword: stripHtml(confirmPassword).result
    };

    try {
        const newEmail = await usersRepository.getUserEmail(newUserObj.email);
        if (newEmail.rows.length !== 0){
            res.status(409).send('email already registered');
            return;
        };
    } catch (error) {
        res.sendStatus(500);
        return;
    }

    res.locals.newUserObj = newUserObj;
    next();
};

async function validateLoginObject (req, res, next) {
    const validation = loginSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        res.status(422).send(validation.error.details.map(err => err.message));
        return;
    };

    const { email, password } = req.body;
    const loginObj = {
        email: stripHtml(email).result,
        password: stripHtml(password).result
    };

    try {
        const validUser = await usersRepository.getUserEmail(loginObj.email);

        if (validUser.rows.length === 0){
            res.sendStatus(401);
            return;
        };
        if (!bcrypt.compareSync(password, validUser.rows[0].password)){
            res.sendStatus(401);
            return;
        };
        res.locals.userId = validUser.rows[0].id;
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
        return;
    };

    next();
};

async function validateUserId (req, res, next) {
    const { userId } = res.locals;

    try {
        const validUser = await usersRepository.getUserId(userId);
        if (validUser.rows.length === 0){
            res.status(404).send('user not found');
            return;
        };
        res.locals.userObj = validUser.rows[0];
    } catch (error) {
        res.sendStatus(500);
    }

    next();
}

export { validateNewUserObject, validateLoginObject, validateUserId};