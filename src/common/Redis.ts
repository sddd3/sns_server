import IORedis from 'ioredis';

export abstract class Redis {

    protected connection: IORedis.Redis;

    constructor() {
        this.connection = new IORedis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            db: Number(process.env.REDIS_DATABASE)
        });
    }
}