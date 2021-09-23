import { NextFunction, Request, Response } from "express";
import { CONTENT_TYPE_APPLICATION_JSON } from "../config/config";

export abstract class Api {
    constructor(protected req: Request, protected res: Response, protected next: NextFunction) { }
    protected checkContentType() {
        const contentType = this.req.headers['content-type'];
        if (contentType !== CONTENT_TYPE_APPLICATION_JSON) {
            throw { status: 400, message: 'contentType is not application/json.' };
        }
    }
}