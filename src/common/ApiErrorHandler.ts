import { NextFunction, Request, Response, Router } from "express";

/**
 * エラーハンドリング用関数
 * @param err エラーオブジェクト
 * @param req リクエストオブジェクト
 * @param res レスポンスオブジェクト
 */
export const ApiErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    const status = error && error.status ? error.status : 500;
    const message = error && error.message ? error.message : 'unexpected error.';

    res.statusCode = status;
    res.json({ status, message });

    next();
}