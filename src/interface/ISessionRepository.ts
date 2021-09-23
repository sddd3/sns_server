import { SessionId } from "../domainObjects/User/SessionId";
import { Uuid } from "../domainObjects/User/Uuid";

export interface ISessionRepository {
    set(sessionId: SessionId, uuid: Uuid): Promise<'OK' | null>;
    get(sessionId: SessionId): Promise<string>;
};