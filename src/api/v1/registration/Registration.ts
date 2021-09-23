import { Router } from "express";
import { Register } from "./Register";

export class Registration {
    constructor() { }

    public router(): Router {
        const router = Router();

        // 新規登録
        router.post('/', (req, res, next) => new Register(req, res, next).main());
        // 登録情報の修正
        // router.put('/', (req, res, next) => new FixRegistration(req, res, next).main());
        // 退会
        // router.delete('/', (req, res, next) => new Quit(req, res, next).main());

        return router;
    }
}