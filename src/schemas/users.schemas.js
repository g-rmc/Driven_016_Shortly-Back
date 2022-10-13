import joi from 'joi';

const newUserSchema = joi.object({
    name: joi.string().trim().min(3).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).pattern(/^\S*$/, 'no white spaces').required(),
    confirmPassword: joi.string().trim().min(6).valid(joi.ref('password')).required()
});

const loginSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).pattern(/^\S*$/, 'no white spaces').required(),
});

export { newUserSchema, loginSchema};