import { Request, Response, NextFunction } from 'express';
import { CommentApplicationService } from '../../../../applicationService/CommentApplicationService';
import { IPostCommentRequest } from '../../../../interface/IPostCommentRequest';
import { CommentRepository } from '../../../../repository/CommentRepository';
import { ParentId } from '../../../../domainObjects/dashobard/ParentId';
import { Comment } from '../../../../domainObjects/dashobard/Comment';
import { Uuid } from '../../../../domainObjects/user/Uuid';
import { Api } from '../../../../common/Api';

export class PostComment extends Api {
    constructor(req: Request, res: Response, next: NextFunction) { super(req, res, next); }

    public async main() {
        try {
            this.checkContentType();
            const request: IPostCommentRequest = this.req.body;
            /** リクエストボディからコメントを取得 */
            const comment = new Comment(request.comment);
            /** コメントに対する返信の場合、親となるコメントのIDが入る */
            const parentId = new ParentId(request.parent_id);
            /** セッション情報を元にUUIDを取得する */
            const uuid = new Uuid(this.req.session.uuid);

            const commentRepository = new CommentRepository();
            const commentApplicationRepository = new CommentApplicationService(commentRepository);
            commentApplicationRepository.create(parentId, uuid, comment);
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
        if (error) {
            this.res.statusCode = error.status;
            this.res.json({ message: error.message });
        } else {
            this.res.statusCode = 500;
            this.res.json({ message: 'unexpected error.' });
        }
        return;
    }
}
