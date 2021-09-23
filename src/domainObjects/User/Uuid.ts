import { validate, version } from 'uuid';

export class Uuid {

    readonly value: string;

    constructor(value: string) {
        if (!value) { throw { status: 400, message: 'invalid value.' } }
        if (!validate(value) && !version(value)) { throw { status: 400, message: 'validation error.' } }

        this.value = value;
    }
}