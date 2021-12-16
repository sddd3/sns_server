import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import connectRedis from 'connect-redis';
import Redis from "ioredis";

import { Authentication } from './api/v1/authentication/Authentication';
import { Registration } from './api/v1/registration/Registration';
import { Dashboard } from './api/v1/dashboard/Dashboard';
import { ApiErrorHandler } from './common/ApiErrorHandler';

const app = express();
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser(process.env.SESSION_OPTION_SECRET));
app.use(helmet());

app.set('trust proxy', 1);

const RedisStore = connectRedis(session);
const redis = new Redis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

const options: session.SessionOptions = {
    name: process.env.SESSION_OPTION_NAME,
    secret: process.env.SESSION_OPTION_SECRET,
    resave: false,
    store: new RedisStore({
        client: redis,
        prefix: '',
        disableTouch: true,
    }),
    saveUninitialized: false,
    rolling: false,
    cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 30 }
}

app.use(session(options));

const apiBasePath = '/api/v1';
app.use(`${apiBasePath}/auth`, new Authentication().router());
app.use(`${apiBasePath}/register`, new Registration().router());
app.use(`${apiBasePath}/dashboard`, new Dashboard().router());

// app.use(`${apiBasePath}/user`,);
// app.use(`${apiBasePath}/profile`,);

app.use(ApiErrorHandler);


module.exports = app;
