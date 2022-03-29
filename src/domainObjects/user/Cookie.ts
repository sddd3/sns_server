export class Cookie {

    readonly value: string;

    constructor(value: string) {
        if (!value) { throw { status: 403, message: 'cookie is empty.' } };
        if (!this.validate(value)) { throw { status: 400, message: 'cookie is validate Error.' } };

        this.value = value;
    }

    /**
     * cookieのバリデーションチェックを行う
     * @param value cookie
     * @returns true: ok, false: ng
     */
    private validate(value: string): boolean {
        return true;
    }
}