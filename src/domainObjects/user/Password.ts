import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../config/config";

export class Password {

    readonly value: string;

    constructor(value: string) {
        // 値の存在チェック
        if (value === null || value === undefined) { throw { status: 422, message: 'Invalid password' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MIN_LENGTH未満だった場合エラー
        if (value.length < PASSWORD_MIN_LENGTH) { throw { status: 422, message: 'Invalid input - password should be at least 8 characters long.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MAX_LENGTH以上だった場合エラー
        if (PASSWORD_MAX_LENGTH < value.length) { throw { status: 422, message: 'Invalid input - password should be less than 32 characters short.' } }

        this.value = value;
    }
}