import { Request } from 'express';

export class SessionId {

    readonly value: string;

    constructor(sessionId: string) {
        this.value = sessionId;
    }
}