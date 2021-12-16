import { Request, Response, NextFunction } from 'express';
import { CommentApplicationService } from '../../../applicationService/CommentApplicationService';
import { CommentRepository } from '../../../repository/CommentRepository';

import { Api } from '../../../common/Api';
import { Cookie } from '../../../domainObjects/user/Cookie';
import { CredentialsChecker } from '../../../common/CredentialsChecker';

export class GetDashboard extends Api {

    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        const cookie = new Cookie(this.req.headers.cookie);
        const credentialsChecker = new CredentialsChecker(cookie);
        const [uuid] = await credentialsChecker.checkCredentials();

        const commentRepository = new CommentRepository();
        const commentApplicationService = new CommentApplicationService(commentRepository);
        // const comments = commentApplicationService.findAll(uuid);
        // console.log(`findAll: ${JSON.stringify(comments)}`);

        this.res.status(200).end();
    }
}
