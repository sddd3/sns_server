import session from "express-session";
import { Uuid } from "../domainObjects/user/Uuid";
import { SessionId } from "../domainObjects/user/SessionId";
import { SessionRepository } from "../repository/SessionRepositroy";

/** session情報を使用する際の型エリアス */
type Session = session.Session & Partial<session.SessionData>;

export class SessionApplicationService {

    private repository: SessionRepository;

    constructor(repository: SessionRepository) {
        this.repository = repository;
    }

    /**
     * セッションIDをキーにRedisからセッション情報を取得する
     * @param sessionId セッションID
     * @returns セッション情報
     */
    public async getSession(sessionId: SessionId): Promise<string> {
        return await this.repository.get(sessionId);
    }

    /**
     * redisに保存されているセッション情報からuuidを抜き取る
     * @param session セッション情報
     */
    public getUuid(session: string): Uuid {
        const jsonParseSession = JSON.parse(session);
        const uuid = new Uuid(jsonParseSession.uuid);
        return uuid;
    }

    /**
     * expressのsessionオブジェクトにuuidを登録する
     * @param session expressのsessionオブジェクト
     * @param uuid uuid
     */
    public registrationUuid(session: Session, uuid: Uuid): void {
        session.uuid = uuid.value;
    }

    /**
     * セッション情報を再生成しする
     * @param session expressのsessionオブジェクト
     * @param uuid uuid
     * @param sessionId 割り振られているセッションID
     */
    public async reGenerate(session: Session, uuid: Uuid, sessionId: SessionId): Promise<void> {
        return new Promise<void>((resolve) => {
            session.regenerate(error => {
                if (error) { throw { status: 500, message: ' session regenerate faild. ' } }
                resolve();
            });
        });
    }
}
