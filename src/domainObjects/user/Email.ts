export class Email {

    readonly value: string;

    constructor(value: string) {
        if (value === null || value === undefined) { throw { status: 422, message: 'Invalid email' } }
        if (!value.includes('@')) { throw { status: 422, message: 'Invalid email' } }

        this.value = value;
    }
}