import { Uuid } from "../domainObjects/user/Uuid";
import { Comments } from "../table/Comments";

export interface ICommentRepository {
    create(params: string[]): Promise<boolean>;
    findOne(params: { uuid?: Uuid }): Promise<Comments>;
};