import { Email } from '../domainObjects/user/Email';
import { Model } from '../common/Model';
import { Uuid } from '../domainObjects/user/Uuid';
import { Registrations } from '../table/Registrations';
import { IRegistrationRepository } from '../interface/IRegistrationRepository';

export class RegistrationRepository extends Model implements IRegistrationRepository {
    constructor() {
        super();
    }

    public async create(params: string[]): Promise<boolean> {
        try {
            const sql = 'INSERT INTO registrations (uuid, email, password, salt) VALUES (?, ?, ?, ?)';
            await this.connection.beginTransaction();
            const [rows] = await this.connection.execute(sql, params);
            await this.connection.commit();

            return rows ? true : false;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            this.connection.rollback();
            // MySQLが出力したエラーをハンドリグする
            const responseObj = this.errorHandler(error);
            throw responseObj;
        }
    }

    public async findAll(params: {}): Promise<Registrations[]> {
        const result: Registrations[] = [];
        return result;
    }

    public async findOne(params: {}): Promise<Registrations> {
        try {
            const where: string[] = [];
            const values: string[] = [];
            Object.keys(params).map((key: string) => {
                if (params[key]) {
                    where.push(key + ' = ?');
                    values.push(params[key].value);
                }
            });

            const select = ['*'];
            const sql = `SELECT ${[...select]} FROM registrations WHERE ${where.join(' AND ')};`;
            const [rows] = await this.connection.execute(sql, values);
            const result: Registrations = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            // MySQLが出力したエラーをハンドリグする
            // MySQLが出力したエラーをハンドリグする
            const responseObj = this.errorHandler(error);
            throw responseObj;
        }
    }
    public update() {
    }
    public delete() {
    }
}
