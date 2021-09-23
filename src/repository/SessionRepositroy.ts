import { SessionId } from "../domainObjects/User/SessionId";
import { Redis } from "../common/Redis";
import { Uuid } from "../domainObjects/User/Uuid";
import { ISessionRepository } from "../interface/ISessionRepository";

export class SessionRepository extends Redis implements ISessionRepository {
    constructor() {
        super();
    }

    public async set(sessionId: SessionId, uuid: Uuid): Promise<'OK' | null> {
        const result = await this.connection.set(sessionId.value, uuid.value);
        return result;
    }

    public async get(sessionId: SessionId): Promise<string> {
        const value = await this.connection.get(sessionId.value);
        return value;
    }
    public async update() {
    }

    /**
     * セッション情報をRedisから削除する
     * @param sessionId 削除対象のセッションID
     * @returns 1: 正常に削除 0: 削除対象がない
     */
    public async delete(sessionId: SessionId): Promise<number> {
        const result = await this.connection.del(sessionId.value);
        return result;
    }
}
