import { Router } from "express";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

export class Authentication {
    constructor() { }

    public router(): Router {
        const router = Router();

        // ログイン
        router.post('/', (req, res, next) => new SignIn(req, res, next).main().catch(next));
        // ログアウト
        router.delete('/', (req, res, next) => new SignOut(req, res, next).main().catch(next));

        return router;
    }
}