import { Uuid } from '../domainObjects/User/Uuid';
import { v4 as uuidv4 } from 'uuid';
export class UuidGenerator {

    constructor() {
    }

    /**
     * v4 uuidを作成する
     * @returns v4 uuid
     */
    public generatV4Uuid(): Uuid {
        try {
            return new Uuid(uuidv4());
        } catch (error) {
            throw { status: 400, message: 'uuid generate faild.' };
        }
    }
}
