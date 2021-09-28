import { Request, Response, NextFunction } from 'express';
import { SessionId } from '../../../domainObjects/User/SessionId';
import { SessionRepository } from '../../../repository/SessionRepositroy';

import { RegistrationObjectCreator } from '../../../applicationService/RegistrationObjectCreator';
import { Api } from '../../../common/Api';
import { Email } from '../../../domainObjects/User/Email';
import { Password } from '../../../domainObjects/User/Password';
import { ISingInRequest } from '../../../interface/ISingInRequest';

export class SignIn extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        try {
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

            const sessionId = new SessionId(this.req.headers.cookie);
            // セッション情報がすでに登録されている場合は、セッションIDを再生成する
            const sessionRepository = new SessionRepository();
            const isSession = await sessionRepository.get(sessionId);
            // TODO クッキーに登録されているセッションIDがRedisに存在しないセッションIDの場合は？
            // ヘッダーにクッキーが登録されている場合はセッションIDを再生成する
            if (isSession) {
                // クッキーにセッションIDが登録されている場合は、再生成する。
                this.req.session.regenerate(async error => {
                    if (error) { throw { status: 400, message: ' session regenerate faild. ' } }

                    // セッション情報にuuidを登録する
                    this.req.session.uuid = registration.uuid.value;
                    // TODO クッキーに登録されているセッションIDがRedisに存在しないセッションIDの場合は？
                    // クッキーに登録されているセッション情報を削除
                    await sessionRepository.delete(sessionId);
                    // 再生成したセッション情報を登録する
                    this.req.session.save();
                });
            } else {
                // セッション情報にuuidを登録する
                this.req.session.uuid = registration.uuid.value;
            }
        } catch (error) {
            this.errorHandler(error);
            return;
        }

        this.res.status(200).end();
    }

    /**
     * 独自にチェックしているエラーをハンドリングする
     * @param error
     */
    private errorHandler(error: any): void {
        if (error) {
            this.res.statusCode = error.status;
            this.res.json({ message: error.message });
        } else {
            this.res.statusCode = 500;
            this.res.json({ message: 'unexpected error.' });
        }
        return;
    }
}
