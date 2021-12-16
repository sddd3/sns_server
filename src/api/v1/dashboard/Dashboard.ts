import { Router } from "express";
import { GetDashboard } from "./GetDashboard";

export class Dashboard {

    constructor() { }

    public router(): Router {
        const router = Router();

        router.get('/', (req, res, next) => new GetDashboard(req, res, next).main().catch(next));

        return router;
    }
}