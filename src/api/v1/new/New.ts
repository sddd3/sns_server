import { Router } from "express";
import { GetComment } from "../new/comment/GetComment";
import { PostComment } from "../new/comment/PostComment";
import { PutComment } from "../new/comment/PutComment";

export class New {
    constructor() { }

    public router(): Router {
        const router = Router();
        // コメント投稿
        router.post('/', (req, res, next) => new PostComment(req, res, next).main().catch(next));
        // コメント取得
        router.get('/', (req, res, next) => new GetComment(req, res, next).main().catch(next));
        // コメント更新
        router.put('/', (req, res, next) => new PutComment(req, res, next).main().catch(next));

        return router;
    }
}