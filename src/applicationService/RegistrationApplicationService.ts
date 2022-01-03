import { Uuid } from "../domainObjects/user/Uuid";
import { Email } from "../domainObjects/user/Email";
import { HashPassword } from "../domainObjects/user/HashPassword";
import { Salt } from "../domainObjects/user/Salt";

import { RegistrationRepository } from "../repository/RegistrationRepository";

export class RegistrationApplicationService {
    // 登録情報リポジトリー
    private repository: RegistrationRepository;

    constructor(repository: RegistrationRepository) {
        this.repository = repository;
    }

    /**
     * 既に同じemailでユーザーが登録されていないか確認する
     * @param email ユーザー登録に使用するemail
     * @returns true: 既に登録されている false: 未登録
     */
    public async exsistingUser(email: Email): Promise<boolean> {
        const params = { email: email };
        await this.repository.createDbConnection();
        const result = await this.repository.findOne(params);

        return result ? true : false;
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
