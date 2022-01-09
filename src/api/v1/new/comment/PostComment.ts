import { Request, Response, NextFunction } from 'express';
import { CommentApplicationService } from '../../../../applicationService/CommentApplicationService';
import { IPostCommentRequest } from '../../../../interface/IPostCommentRequest';
import { CommentRepository } from '../../../../repository/CommentRepository';
import { ParentId } from '../../../../domainObjects/dashobard/ParentId';
import { Comment } from '../../../../domainObjects/dashobard/Comment';
import { Uuid } from '../../../../domainObjects/user/Uuid';
import { Api } from '../../../../common/Api';
import { Cookie } from '../../../../domainObjects/user/Cookie';
import { CredentialsChecker } from '../../../../common/CredentialsChecker';

export class PostComment extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        this.checkContentType();

        const cookie = new Cookie(this.req.headers.cookie);
        const credentialsChecker = new CredentialsChecker(cookie);
        const [cookieUuid] = await credentialsChecker.checkCredentials();
        const uuid = new Uuid(this.req.session.uuid);
        credentialsChecker.compareUudi(uuid, cookieUuid);

        const request: IPostCommentRequest = this.req.body;
        /** リクエストボディからコメントを取得 */
        const comment = new Comment(request.comment);
        /** コメントに対する返信の場合、親となるコメントのIDが入る */
        const parentId = request.parent_id ? new ParentId(request.parent_id) : new ParentId();
        console.log(`parentId: ${parentId.value}`)
        /** セッション情報を元にUUIDを取得する */
        const commentRepository = new CommentRepository();
        const commentApplicationRepository = new CommentApplicationService(commentRepository);
        const result = await commentApplicationRepository.create(parentId, uuid, comment);
        console.log(`result: ${result}`);

        this.res.status(200).end();
    }
}
