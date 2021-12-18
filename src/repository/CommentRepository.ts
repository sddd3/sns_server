import { Uuid } from "../domainObjects/user/Uuid";
import { ICommentRepository } from "../interface/ICommentRepository";
import { Model } from "../common/Model";
import { Comments } from "../table/Comments";
import { table } from "console";

export class CommentRepository extends Model implements ICommentRepository {

    private readonly table = 'comments';

    constructor() {
        super();
    }

    public async create(params: string[]): Promise<boolean> {
        try {
            const sql = `INSERT INTO ${this.table} (parent_id, uuid, comment) VALUES (?, ?, ?);`;
            await this.connection.beginTransaction();
            const [rows] = await this.connection.execute(sql, params);
            await this.connection.commit();

            return rows ? true : false;
        } catch (error) {
            this.connection.rollback();
            // MySQLが出力したエラーをハンドリグする
            const code = error.code ? error.code : 'unexpected DB error.';
            const message = error.message ? error.message : 'unexpected DB error.';
            throw { status: 500, code, message };
        }
    }
    public async findAll(params: { uuid?: Uuid }) {
        try {
            const where: string[] = [];
            const values: string[] = [];
            Object.keys(params).map((key: string) => {
                if (params[key]) {
                    where.push(key + ' = ?');
                    values.push(params[key].value);
                }
            });

            const sql = `SELECT * FROM ${this.table} WHERE ${where.join(' AND ')};`;
            const [rows] = await this.connection.execute(sql, values);
            const result: Comments = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            const code = error.code ? error.code : 'unexpected DB error.';
            const message = error.message ? error.message : 'unexpected DB error.';
            throw { status: 500, code, message };
        }
    }
    public async findOne(params: { uuid?: Uuid }): Promise<Comments> {
        try {
            const where: string[] = [];
            const values: string[] = [];
            Object.keys(params).map((key: string) => {
                if (params[key]) {
                    where.push(key + ' = ?');
                    values.push(params[key].value);
                }
            });

            const sql = `SELECT * FROM ${this.table} WHERE ${where.join(' AND ')} LIMIT 1;`;
            const [rows] = await this.connection.execute(sql, values);
            const result: Comments = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            const code = error.code ? error.code : 'unexpected DB error.';
            const message = error.message ? error.message : 'unexpected DB error.';
            throw { status: 500, code, message };
        }
    }
    public update() {
    }
    public delete() {
    }
}
