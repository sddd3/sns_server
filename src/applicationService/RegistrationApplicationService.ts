import { Uuid } from "../domainObjects/User/Uuid";
import { Email } from "../domainObjects/User/Email";
import { HashPassword } from "../domainObjects/User/HashPassword";
import { Salt } from "../domainObjects/User/Salt";

import { RegistrationRepository } from "../repository/RegistrationRepository";
import { IMysqlResult } from "../interface/IMysqlResult";

export class RegistrationApplicationService {
    // 登録情報リポジトリー
    private repository: RegistrationRepository;

    constructor(repository: RegistrationRepository) {
        this.repository = repository;
    }

    /**
     * 新規アカウントを作成する
     * @param uuid ユーザーを一意に決定するためのID
     * @param email ユーザー登録に使用したメールアドレス
     * @param hashPassword ログインパスワードをハッシュ化させたもの
     * @param salt salt
     * @returns 登録した情報
     */
    public async create(uuid: Uuid, email: Email, hashPassword: HashPassword, salt: Salt): Promise<boolean> {
        const params = [uuid.value, email.value, hashPassword.value, salt.value];

        await this.repository.createDbConnection();
        const result = await this.repository.create(params);
        return result;
    }
}
