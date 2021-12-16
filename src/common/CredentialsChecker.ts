import { Cookie } from "../domainObjects/user/Cookie";
import { SessionRepository } from "../repository/SessionRepositroy";
import { CredentialsResult } from "../types/CredentialsResult";
import { CookieApplicationService } from "../applicationService/CookieApplicationService";
import { SessionApplicationService } from "../applicationService/SessionApplicationService";

export class CredentialsChecker {

    private readonly cookie: Cookie;

    constructor(cookie: Cookie) {
        if (!cookie.value) { throw { status: 400, message: 'CookieObject\'s value is empty.' } };
        this.cookie = cookie;
    }

    /**
     * cookieにセットされているセッションIDでRedisから情報が取得できれば認証OK
     * @returns 認証情報が正常な場合はuuidとセッションIDを返す。不正な場合はfalseを返す。
     */
    public async checkCredentials(): Promise<CredentialsResult> {
        const cookieApplicationService = new CookieApplicationService();
        const sessionId = await cookieApplicationService.getSessionId(this.cookie);
        const sessionRepository = new SessionRepository();
        const sessionApplicationService = new SessionApplicationService(sessionRepository);
        const session = await sessionApplicationService.getSession(sessionId);

        // cookieに格納されている情報でRedisからセッション情報を取得できない場合はエラー
        if (!session) { throw { status: 400, message: 'authentication error.' } }

        const uuid = await sessionApplicationService.getUuid(session);
        return [uuid, sessionId];
    }
}
