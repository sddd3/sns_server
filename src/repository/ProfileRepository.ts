import { IProfileRepository } from "../interface/IProfileRepository";
import { Model } from "../common/Model";

export class ProfileRepository extends Model implements IProfileRepository {
    constructor() {
        super();
    }

    public async create(params: string[]): Promise<boolean> {
        try {
            const sql = 'INSERT INTO profiles (uuid, name) VALUES (?, ?)';
            await this.connection.beginTransaction();
            const [result] = await this.connection.execute(sql, params);
            await this.connection.commit();

            return result ? true : false;
        } catch (error) {
            this.connection.rollback();
            // MySQLが出力したエラーをハンドリグする
            const responseObj = this.errorHandler(error);
            throw responseObj;
        } finally {
            await this.connection.end();
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
