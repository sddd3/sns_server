import { Request, Response, NextFunction } from 'express';
import { Api } from '../../../common/Api';

export class SignOut extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        try {

        } catch (error) {
            this.errorHandler(error);
            return;
        }

        this.res.status(200).end();
    }

    /**
     * 独自にチェックしているエラーをハンドリングする
     * @param error
     */
    private errorHandler(error: any): void {
        if (error.status) {
            this.res.statusCode = error.status;
            this.res.json({ message: error.message });
        } else {
            this.res.statusCode = 500;
            this.res.json(error);
        }
    }
}
