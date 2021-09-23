import { IUser } from "../../interface/IUser";
import { Uuid } from "./Uuid";
import { Email } from "./Email";
import { Password } from "./Password";
import { HashPassword } from "./HashPassword";
import { Salt } from "./Salt";
import { UserName } from "./UserName";
import { UserNickName } from "./UserNickName";

export class User implements IUser {

    /** ユーザーを一意に決めるID */
    readonly uuid: Uuid;
    /** 新規登録の際に登録したメールアドレス */
    readonly email: Email;
    /** ログインパスワード */
    readonly password: Password;
    /** ハッシュ化されたログインパスワード */
    readonly hashPassword: HashPassword;
    /** パスワードをハッシュ化させる際に使用したsalt */
    readonly salt: Salt;
    /** 変更不可能な名前 */
    readonly name: UserName;
    /** 変更可能な名前 */
    readonly nickname: UserNickName;
    /** 住所 */
    readonly location: string;
    /** 自己紹介 */
    readonly self_introduction: string;
    /** 削除フラグ */
    readonly delete_flg: boolean;

    constructor(uuid: Uuid, email: Email, password: Password, hashPassowrd: HashPassword, salt: Salt, name: UserName, nickname: UserNickName, location: string, self_introduction: string, delete_flg: boolean) {
        this.uuid = uuid;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.name = name;
        this.nickname = nickname;
        this.location = location;
        this.self_introduction = self_introduction;
        this.delete_flg = delete_flg;
    }
}