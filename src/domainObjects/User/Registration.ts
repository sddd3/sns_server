import { Uuid } from "./Uuid";
import { Email } from "./Email";
import { HashPassword } from "./HashPassword";
import { Salt } from "./Salt";
import { IRegistrations } from "../../interface/IRegistrations";

export class Registration implements IRegistrations {

    /** ユーザーを一意に決めるID */
    readonly uuid: Uuid;
    /** 新規登録の際に登録したメールアドレス */
    readonly email: Email;
    /** ハッシュ化されたログインパスワード */
    readonly hashPassword: HashPassword;
    /** パスワードをハッシュ化させる際に使用したsalt */
    readonly salt: Salt;
    /** 作成日時 */
    readonly created_at: string;
    /** 更新日時 */
    readonly updated_at: string;
    /** 削除フラグ */
    readonly delete_flg: boolean;

    constructor(uuid: Uuid, email: Email, hashPassowrd: HashPassword, salt: Salt, created_at: string, updated_at: string, delete_flg: boolean) {
        this.uuid = uuid;
        this.email = email;
        this.hashPassword = hashPassowrd;
        this.salt = salt;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.delete_flg = delete_flg;
    }
}