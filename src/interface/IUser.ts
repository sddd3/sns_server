import { Salt } from "../domainObjects/User/Salt";
import { Email } from "../domainObjects/User/Email";
import { HashPassword } from "../domainObjects/User/HashPassword";
import { Password } from "../domainObjects/User/Password";
import { UserName } from "../domainObjects/User/UserName";
import { UserNickName } from "../domainObjects/User/UserNickName";
import { Uuid } from "../domainObjects/User/Uuid";

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
    /** 変更不可能な名前 */
    name: UserName;
    /** 変更可能な名前 */
    nickname: UserNickName;
    /** 住所 */
    location: string;
    /** 自己紹介 */
    self_introduction: string;
    /** 削除フラグ */
    delete_flg: boolean;
};