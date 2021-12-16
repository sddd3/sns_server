import cookieParser from "cookie-parser";
import { Cookie } from "../domainObjects/user/Cookie";
import { SessionId } from "../domainObjects/user/SessionId";

export class CookieApplicationService {
    constructor() {
    }


    private async decodeCookie(cookie: Cookie): Promise<Cookie> {
        const decode = decodeURIComponent(cookie.value);
        return new Cookie(decode);
    }

    private async parseSignedCookie(cookie: Cookie): Promise<Cookie> {
        const decode = await this.decodeCookie(cookie);
        const signedCookie = cookieParser.signedCookie(decode.value, process.env.SESSION_OPTION_SECRET);
        return signedCookie ? new Cookie(signedCookie) : cookie;
    }

    private async fetchSessionId(cookie: Cookie): Promise<SessionId> {
        // cookieに格納されているセッション情報からsns-sid=s:を取り除く
        const headerLength = `${process.env.SESSION_OPTION_NAME}=s:`.length;
        const excludeHeader = cookie.value.substring(headerLength, cookie.value.length);
        const [sessionData] = excludeHeader.split('.');
        return new SessionId(sessionData);

    }

    public async getSessionId(cookie: Cookie): Promise<SessionId> {
        const signedCookie = await this.parseSignedCookie(cookie);
        return await this.fetchSessionId(signedCookie);
    }
}