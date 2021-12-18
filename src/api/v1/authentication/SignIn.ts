import { Request, Response, NextFunction } from 'express';

import { Api } from '../../../common/Api';
import { ISingInRequest } from '../../../interface/ISingInRequest';
import { SessionRepository } from '../../../repository/SessionRepositroy';

import { RegistrationObjectCreator } from '../../../applicationService/RegistrationObjectCreator';
import { SessionApplicationService } from '../../..//applicationService/SessionApplicationService';

import { Email } from '../../../domainObjects/user/Email';
import { Password } from '../../../domainObjects/user/Password';
import { Cookie } from '../../../domainObjects/user/Cookie';
import { CredentialsChecker } from '../../../common/CredentialsChecker';
import { resolve } from 'path/posix';

export class SignIn extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        this.checkContentType();

        const request: ISingInRequest = this.req.body;
        /** リクエストボディからメールアドレスを取得 */
        const email = new Email(request.email);
        /** リクエストボディからパスワードを取得 */
        const password = new Password(request.password);

        // 登録情報を操作できるようにオブジェクトを取得
        const registrationObjectCreator = new RegistrationObjectCreator(null, email);
        const registration = await registrationObjectCreator.create();

        /** true: DBに保存されているパスワードとリクエストで受け取ったパスワードが同じ false: 同じではない */
        const compareResult = await registration.hashPassword.compare(password, registration.salt);
        if (!compareResult) { throw { status: 400, message: 'email or password are incorrect.' } }

        const sessionRepository = new SessionRepository();
        const sessionApplicationService = new SessionApplicationService(sessionRepository);

        // cookieに情報がセットされている場合はセッションIDを再生成して保存する
        if (this.req.headers.cookie) {
            const cookie = new Cookie(this.req.headers.cookie);
            const credentialsChecker = new CredentialsChecker(cookie);
            const [uuid, sessionId] = await credentialsChecker.checkCredentials();

            credentialsChecker.compareUudi([uuid, registration.uuid]);

            await sessionApplicationService.reGenerate(this.req.session, registration.uuid, sessionId);
            sessionApplicationService.registrationUuid(this.req.session, registration.uuid);
            // this.req.session.regenerate(error => {
            //     if (error) { throw { status: 500, message: `session regenerate error.` } };
            //     sessionApplicationService.registrationUuid(this.req.session, registration.uuid);
            //     this.req.session.save();
            //     this.res.status(200).end();
            // });
        } else {
            sessionApplicationService.registrationUuid(this.req.session, registration.uuid);
        }
        this.res.status(200).end();
    }
}
