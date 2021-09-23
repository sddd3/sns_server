export class Email {

    readonly value: string;

    constructor(value: string) {
        if (value === null || value === undefined) { throw { status: 400, message: 'email is invalid.' } }
        // TODO メールアドレスのバリデーションを行う
        this.value = value;
    }
}