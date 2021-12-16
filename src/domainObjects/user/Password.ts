import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../config/config";

export class Password {

    readonly value: string;

    constructor(value: string) {
        // 値の存在チェック
        if (value === null || value === undefined) { throw { status: 400, message: 'Password is invalid.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MIN_LENGTH以下だった場合エラー
        if (value.length < PASSWORD_MIN_LENGTH) { throw { status: 400, message: 'Password is too short.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MAX_LENGTH以上だった場合エラー
        if (PASSWORD_MAX_LENGTH < value.length) { throw { status: 400, message: 'Password is too long.' } }
        if (value === null || value === undefined) { throw { status: 400, message: 'Password is invalid.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MIN_LENGTH以下だった場合エラー
        if (value.length < PASSWORD_MIN_LENGTH) { throw { status: 400, message: 'Password is too short.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MAX_LENGTH以上だった場合エラー
        if (PASSWORD_MAX_LENGTH < value.length) { throw { status: 400, message: 'Password is too long.' } }

        this.value = value;
    }
}