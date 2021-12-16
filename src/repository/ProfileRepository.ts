import { IProfileRepository } from "../interface/IProfileRepository";
import { Model } from "../common/Model";

export class ProfileRepository extends Model implements IProfileRepository {
    constructor() {
        super();
    }

    public async create(params: string[]): Promise<boolean> {
        try {
            const sql = 'INSERT INTO profiles (uuid, name) VALUES (?, ?, ?)';
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
    public findAll() {
    }
    public findOne() {
    }
    public update() {
    }
    public delete() {
    }
}
