import { Salt } from "../domainObjects/user/Salt";
import { Email } from "../domainObjects/user/Email";
import { HashPassword } from "../domainObjects/user/HashPassword";
import { Password } from "../domainObjects/user/Password";
import { UserName } from "../domainObjects/user/UserName";
import { Uuid } from "../domainObjects/user/Uuid";

export interface IUser {
    /** ユーザーを一意に決めるID */
    uuid: Uuid;
    /** 新規登録の際に登録したメールアドレス */
    email: Email;
    /** ログインパスワード */
    password: Password;
    /** ハッシュ化されたログインパスワード */
    hashPassword: HashPassword;
    /** パスワードをハッシュ化させる際に使用したsalt */
    salt: Salt;
    /** ユーザー名 */
    name: UserName;
    /** 自己紹介 */
    self_introduction: string;
    /** 削除フラグ */
    delete_flg: boolean;
};