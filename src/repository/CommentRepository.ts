import { Uuid } from "../domainObjects/user/Uuid";
import { ICommentRepository } from "../interface/ICommentRepository";
import { Model } from "../common/Model";
import { Comments } from "../table/Comments";

export class CommentRepository extends Model implements ICommentRepository {
    constructor() {
        super();
    }

    public async create(params: string[]): Promise<boolean> {
        try {
            const sql = 'INSERT INTO comments (parent_id, uuid, comment) VALUES (?, ?, ?)';
            await this.connection.beginTransaction();
            const [rows] = await this.connection.execute(sql, params);
            await this.connection.commit();

            return rows ? true : false;
        } catch (error) {
            this.connection.rollback();
            const code = error.error;
            switch (code) {
                case 'ER_DUP_ENTRY':
                    throw { status: 400, code, message: 'Duplicate entry error.' };
                default:
                    throw { status: 500, code, message: 'unexpected DB error.' };
            }
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

            const sql = 'SELECT * FROM comment WHERE ' + where.join(' AND ') + ';';
            const [rows] = await this.connection.execute(sql, values);
            const result: Comments = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            const code = error.error;
            switch (code) {
                default:
                    throw { status: 500, code, message: 'unexpected DB error.' };
            }
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

            const sql = 'SELECT * FROM comment WHERE ' + where.join(' AND ') + ';';
            const [rows] = await this.connection.execute(sql, values);
            const result: Comments = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            const code = error.error;
            switch (code) {
                default:
                    throw { status: 500, code, message: 'unexpected DB error.' };
            }
        }
    }
    public update() {
    }
    public delete() {
    }
}
