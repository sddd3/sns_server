import mysql, { Connection } from 'mysql2/promise';
import { DbError } from '../types/DbError';

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

    /**
     * DBエラーからレスポンス用オブジェクトを作成する
     * @param error DBから返却されたエラーオブジェクト
     * @returns レスポンス用DBオブジェクト
     */
    protected errorHandler(error: any): DbError {
        const code = error.code ? error.code : 'unexpected DB error.';
        const message = error.message ? error.message : 'unexpected DB error.';
        return { status: 500, code, message };
    }
}