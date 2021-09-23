import { USER_NICKNAME_MAX_LENGTH, USER_NICKNAME_MIN_LENGTH } from "../../config/config";

export class UserNickName {

    readonly value: string;

    constructor(value: string) {
        if (value === null || value === undefined) { throw { status: 400, message: 'UserNickName is invalid.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MIN_LENGTH以下だった場合エラー
        if (value.length < USER_NICKNAME_MIN_LENGTH) { throw { status: 400, message: 'UserNickName is too short.' } }
        // パスワードとして登録しようとしている文字列の文字数がPASSWORD_MAX_LENGTH以上だった場合エラー
        if (USER_NICKNAME_MAX_LENGTH < value.length) { throw { status: 400, message: 'UserNickName is too long.' } }

        this.value = value;
    }
}