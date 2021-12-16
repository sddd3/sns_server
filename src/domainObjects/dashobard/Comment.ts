import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from "../../config/config";

export class Comment {

    readonly value: string;

    constructor(value: string) {
        // 値の存在チェック
        if (value === null || value === undefined) { throw { status: 400, message: 'Comment is invalid.' } }
        // 投稿しようとしている文字列の文字数がCOMMENT_MIN_LENGTH未満だった場合エラー
        if (value.length < COMMENT_MIN_LENGTH) { throw { status: 400, message: 'Comment is too short.' } }
        // 投稿しようとしている文字列の文字数がCOMMENT_MAX_LENGTH以上だった場合エラー
        if (COMMENT_MAX_LENGTH < value.length) { throw { status: 400, message: 'Comment is too long.' } }

        this.value = value;
    }
}