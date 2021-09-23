import mysql, { Connection } from 'mysql2/promise';

export abstract class Model {

    protected connection: Connection;

    constructor() {
    }

    public async createDbConnection() {
        this.connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
        });
    }
}