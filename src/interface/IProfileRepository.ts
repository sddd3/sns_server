export interface IProfileRepository {
    create(params: string[]): Promise<boolean>;
};