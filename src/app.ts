import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import connectRedis from 'connect-redis';
import Redis from "ioredis";

import { Authentication } from './api/v1/authentication/Authentication';
import { Registration } from './api/v1/registration/Registration';



const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());
app.use(helmet());

app.set('trust proxy', 1);

const RedisStore = connectRedis(session);
const redis = new Redis();

const options: session.SessionOptions = {
    name: 'sns-sid',
    secret: 'at5hs',
    resave: false,
    store: new RedisStore({
        client: redis,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        prefix: '',
        disableTouch: true,
    }),
    saveUninitialized: false,
    rolling: true,
    cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 30 }
}

app.use(session(options));

const apiBasePath = '/api/v1';
app.use(`${apiBasePath}/auth`, new Authentication().router());
app.use(`${apiBasePath}/register`, new Registration().router());

// app.use(`${apiBasePath}/user`,);
// app.use(`${apiBasePath}/profile`,);

module.exports = app;
