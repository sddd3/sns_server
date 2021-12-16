import { ParentId } from "../domainObjects/dashobard/ParentId";
import { Comment } from "../domainObjects/dashobard/Comment";
import { Uuid } from "../domainObjects/user/Uuid";

import { CommentRepository } from "../repository/CommentRepository";
import { Comments } from "../table/Comments";

export class CommentApplicationService {
    /** 登録情報リポジトリー */
    private repository: CommentRepository;

    constructor(repository: CommentRepository) {
        this.repository = repository;
    }

    /**
     * 新規コメントを投稿する
     * @param uuid ユーザーを一意に決定するためのID
     * @returns 登録した情報
     */
    public async create(parentId: ParentId, uuid: Uuid, comment: Comment): Promise<boolean> {
        const params = [parentId.value, uuid.value, comment.value];

        await this.repository.createDbConnection();
        const result = await this.repository.create(params);
        return result;
    }

    public async findAll(uuid: Uuid): Promise<Comments> {
        const params = { uuid };

        await this.repository.createDbConnection();
        const result = await this.repository.findAll(params);
        return result;
    }
}
