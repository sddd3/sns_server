import { Request, Response, NextFunction } from 'express';

import { Api } from '../../../common/Api';
import { IRegisterRequest } from '../../../interface/IRegisterRequest';

import { Email } from '../../../domainObjects/user/Email';
import { Password } from '../../../domainObjects/user/Password';
import { UserName } from '../../../domainObjects/user/UserName';

import { UuidGenerator } from '../../../applicationService/UuidGenerator';
import { HashPasswordGenerator } from '../../../applicationService/HashPasswordGenerator';

import { RegistrationApplicationService } from '../../../applicationService/RegistrationApplicationService';
import { ProfileApplicationService } from '../../../applicationService/ProfileApplicationService';
import { RegistrationRepository } from '../../../repository/RegistrationRepository';
import { ProfileRepository } from '../../../repository/ProfileRepository';


export class Register extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        this.checkContentType();

        const request: IRegisterRequest = this.req.body;

        /** リクエストボディからメールアドレスを取得 */
        const email = new Email(request.email);
        /** リクエストボディからパスワードを取得 */
        const password = new Password(request.password);
        /** リクエストボディから名前を取得 */
        const name = new UserName(request.name);

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

        const result = await registrationApplicationService.exsistingUser(email);
        if (result) { throw { status: 400, message: 'already exist' } }

        await registrationApplicationService.create(uuid, email, hashPassword, salt);
        // プロフィール情報のnullが許されないカラムだけ先行して登録
        const profileRepository = new ProfileRepository();
        const profileApplicationService = new ProfileApplicationService(profileRepository);
        await profileApplicationService.create(uuid, name);

        this.res.status(200).end();
    }
}
