import { IProfileRepository } from "../interface/IProfileRepository";
import { Model } from "../common/Model";

export class ProfileRepository extends Model implements IProfileRepository {
    constructor() {
        super();
    }

    public async create(params: string[]): Promise<boolean> {
        try {
            const sql = 'INSERT INTO profiles (uuid, name, nickname) VALUES (?, ?, ?)';
            await this.connection.beginTransaction();
            const [rows] = await this.connection.execute(sql, params);
            await this.connection.commit();

            return rows ? true : false;
        } catch (error) {
            this.connection.rollback();
            throw error;
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
