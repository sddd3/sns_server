import { Request, Response, NextFunction } from 'express';
import { Api } from '../../../../common/Api';

export class GetComment extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        this.res.status(200).end();
    }
}
