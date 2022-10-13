import { stripHtml } from "string-strip-html";

import { connection } from "../database/database.js";
import { newUserSchema, loginSchema } from "../schemas/users.schemas.js";

async function validateNewUserObject (req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const newUserObj = {
        name: stripHtml(name).result,
        email: stripHtml(email).result,
        password: stripHtml(password).result,
        confirmPassword: stripHtml(confirmPassword).result
    };

    const validation = newUserSchema.validate(newUserObj, {abortEarly: false});
    if (validation.error){
        res.status(422).send(validation.error.details.map(err => err.message));
        return;
    };

    try {
        const newEmail = await connection.query(`
            SELECT * FROM users
            WHERE email = $1;`,
            [newUserObj.email]);
        if (newEmail.rows.length !== 0){
            res.status(409).send('email already registered');
            return;
        }
    } catch (error) {
        console.log(error)
        return;
    }

    res.locals.newUserObj = newUserObj;
    next();
};

async function validateLoginObject (req, res, next) {
    console.log('validateLoginObject');
    next();
};

export { validateNewUserObject, validateLoginObject};