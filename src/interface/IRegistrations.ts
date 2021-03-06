import { Uuid } from "../domainObjects/user/Uuid";
import { Email } from "../domainObjects/user/Email";
import { HashPassword } from "../domainObjects/user/HashPassword";
import { Salt } from "../domainObjects/user/Salt";

export interface IRegistrations {
    /** ユーザーを一意に決めるID */
    uuid: Uuid;
    /** 新規登録の際に登録したメールアドレス */
    email: Email;
    /** ハッシュ化されたログインパスワード */
    hashPassword: HashPassword;
    /** パスワードをハッシュ化させる際に使用したsalt */
    salt: Salt;
    /** 作成日時 */
    created_at: string;
    /** 更新日時 */
    updated_at: string;
    /** 削除フラグ */
    delete_flg: boolean;
};