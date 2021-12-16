import { Uuid } from "../domainObjects/user/Uuid";
import { UserName } from "../domainObjects/user/UserName";
import { ProfileRepository } from "../repository/ProfileRepository";

export class ProfileApplicationService {
    // プロフィールリポジトリー
    private repository: ProfileRepository;

    constructor(repository: ProfileRepository) {
        this.repository = repository;
    }

    /**
     * 新規プロフィールを作成/更新する
     * @param uuid ユーザーを一意に決定するためのID
     * @param name 変更不可能な名前 重複不可能
     * @returns 登録した情報
     */
    public async create(uuid: Uuid, name: UserName): Promise<boolean> {
        const params = [uuid.value, name.value];

        await this.repository.createDbConnection();
        const result = await this.repository.create(params);
        return result;
    }
}
