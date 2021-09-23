import { Email } from '../domainObjects/User/Email';
import { Model } from '../common/Model';
import { Uuid } from '../domainObjects/User/Uuid';
import { Registrations } from '../table/Registrations';
import { IRegistrationRepository } from 'src/interface/IRegistrationRepository';

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

            // TODO 新規作成したデータを返すようにする
            const result = rows ? true : false;

            return result;
        } catch (error) {
            this.connection.rollback();
            throw error;
        }
    }

    public async findAll(params: { uuid?: Uuid, email?: Email }): Promise<Registrations[]> {
        const result: Registrations[] = [];
        return result;
    }

    public async findOne(params: { uuid?: Uuid, email?: Email }): Promise<Registrations> {
        try {
            const where: string[] = [];
            const values: string[] = [];
            Object.keys(params).map((key: string) => {
                if (params[key]) {
                    where.push(key + ' = ?');
                    values.push(params[key].value);
                }
            });

            const sql = 'SELECT * FROM registrations WHERE ' + where.join(' AND ') + ';';
            const [rows] = await this.connection.execute(sql, values);
            const result: Registrations = rows[0] ? rows[0] : null;

            return result;
        } catch (error) {
            throw error;
        }
    }
    public update() {
    }
    public delete() {
    }
}
