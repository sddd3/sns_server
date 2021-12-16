import { SessionId } from "../domainObjects/user/SessionId";
import { Uuid } from "../domainObjects/user/Uuid";

export interface ISessionRepository {
    set(sessionId: SessionId, uuid: Uuid): Promise<'OK' | null>;
    get(sessionId: SessionId): Promise<string>;
};