import { Uuid } from "../domainObjects/user/Uuid";
import { ICommentRepository } from "../interface/ICommentRepository";
import { Model } from "../common/Model";
import { Comments } from "../table/Comments";
import { IMysqlResult } from "../interface/IMysqlResult";

export class CommentRepository extends Model implements ICommentRepository {

    private readonly table = 'comments';

    constructor() {
        super();
    }

    public async create(params: (string | number)[]): Promise<boolean> {
        try {
            const sql = `INSERT INTO ${this.table} (parent_id, uuid, comment) VALUES (?, ?, ?);`;
            await this.connection.beginTransaction();
            const [rows] = await this.connection.execute(sql, params);
            await this.connection.commit();

            return rows ? true : false;
        } catch (error) {
            this.connection.rollback();
            // MySQLが出力したエラーをハンドリグする
            const responseObj = this.errorHandler(error);
            throw responseObj;
        } finally {
            await this.connection.end();
        }
    }
    public async findAll(params: { uuid?: Uuid }): Promise<IMysqlResult> {
        try {
            const where: string[] = [];
            const values: string[] = [];
            Object.keys(params).map((key: string) => {
                if (params[key]) {
                    where.push(key + ' = ?');
                    values.push(params[key].value);
                }
            });

            const select = ['comment_id', 'parent_id', 'comment', 'created_at', 'updated_at'];
            const sql = `SELECT ${[...select]} FROM ${this.table} WHERE ${where.join(' AND ')};`;
            const [result] = await this.connection.execute(sql, values);

            return result;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            const responseObj = this.errorHandler(error);
            throw responseObj;
        } finally {
            await this.connection.end();
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

            const select = ['comment_id', 'parent_id', 'comment', 'created_at', 'updated_at'];
            const sql = `SELECT ${[...select]} FROM ${this.table} WHERE ${where.join(' AND ')} LIMIT 1;`;
            const [rows] = await this.connection.execute(sql, values);
            const result: Comments = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            await this.connection.end();
            // MySQLが出力したエラーをハンドリグする
            const responseObj = this.errorHandler(error);
            throw responseObj;
        } finally {
            await this.connection.end();
        }
    }
    public update() {
    }
    public delete() {
    }
}
