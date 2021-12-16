import bcrypt from "bcrypt";
import { Password } from "./Password";
import { Salt } from "./Salt";

export class HashPassword {

    readonly value: string;

    constructor(value: string) {
        if (value === null || value === undefined) { throw { status: 400, message: 'HashPassowrd is invalid.' } }
        this.value = value;
    }

    /**
     * HashPassowrdオブジェクト自身に設定されているハッシュ化されたパスワードと引数で渡されたパスワードが同一のものか比較する
     * @param password 比較対象のパスワード（ハッシュ化されていないパスワード）
     * @param salt HashPassowrdオブジェクト自身に設定されているハッシュ化パスワードを生成する際に使用したsalt
     * @returns true: 同じパスワード false: 同じではないパスワード
     */
    public async compare(password: Password, salt: Salt): Promise<boolean> {
        const papper = process.env.PASSWORD_PEPPER;
        const result = await bcrypt.compare(password.value + papper + salt.value, this.value);
        return result;
    }
}