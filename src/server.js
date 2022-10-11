import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import userRouter from './routers/users.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(
    process.env.PORT,
    () => {console.log(`Listening on ${process.env.PORT}`)}
);