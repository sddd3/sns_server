import { Request, Response, NextFunction } from 'express';

import { Api } from '../../../common/Api';
import { IRegisterRequest } from '../../../interface/IRegisterRequest';

import { Email } from '../../../domainObjects/User/Email';
import { Password } from '../../../domainObjects/User/Password';
import { UserName } from '../../../domainObjects/User/UserName';
import { UserNickName } from '../../../domainObjects/User/UserNickName';

import { UuidGenerator } from '../../../applicationService/UuidGenerator';
import { HashPasswordGenerator } from '../../../applicationService/HashPasswordGenerator';

import { RegistrationApplicationService } from '../../../applicationService/RegistrationApplicationService';
import { ProfileApplicationService } from '../../../applicationService/ProfileApplicationService';
import { RegistrationRepository } from '../../../repository/RegistrationRepository';
import { ProfileRepository } from '../../../repository/ProfileRepository';


export class Register extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        try {
            this.checkContentType();

            const request: IRegisterRequest = this.req.body;

            /** リクエストボディからメールアドレスを取得 */
            const email = new Email(request.email);
            /** リクエストボディからパスワードを取得 */
            const password = new Password(request.password);
            /** リクエストボディから名前を取得 */
            const name = new UserName(request.name);
            /** リクエストボディからニックネームを取得 */
            const nickname = new UserNickName(request.nickname);

            // uuid生成
            const uuidGenerator = new UuidGenerator();
            const uuid = uuidGenerator.generatV4Uuid();
            // パスワードをハッシュ化
            const hashPasswordGenerator = new HashPasswordGenerator(password.value);

            const hashPassword = hashPasswordGenerator.gethashPassword;
            const salt = hashPasswordGenerator.getSalt;

            // 新規ユーザー登録
            const registrationRepository = new RegistrationRepository();
            const registrationApplicationService = new RegistrationApplicationService(registrationRepository);
            await registrationApplicationService.create(uuid, email, hashPassword, salt);
            // プロフィール情報のnullが許されないカラムだけ先行して登録
            const profileRepository = new ProfileRepository();
            const profileApplicationService = new ProfileApplicationService(profileRepository);
            await profileApplicationService.create(uuid, name, nickname);

            this.res.status(200).end();
        } catch (error) {
            this.errorHandler(error);
            return;
        }
    }

    /**
     * エラー情報をレスポンスオブジェクトにセットする
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
