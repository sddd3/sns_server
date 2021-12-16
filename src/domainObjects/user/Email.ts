export class Email {

    readonly value: string;

    constructor(value: string) {
        this.isInvalid(value);
        if (value === null || value === undefined) { throw { status: 400, message: 'email is invalid.' } }
        this.validate(value);
        this.value = value;
    }

    /**
     * Nullまたはundefinedか確認する関数
     * @param value Emailアドレスとして登録しようとしてる値
     */
    private isInvalid(value: string): boolean {
        return value === null || value === undefined
    }

    private validate(value: string) {

    }
}