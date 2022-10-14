import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import usersRouter from './routers/users.router.js';
import linksRouter from './routers/links.router.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRouter);
app.use(linksRouter);

app.listen(
    process.env.PORT,
    () => {console.log(`Listening on ${process.env.PORT}`)}
);