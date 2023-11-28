import { Tag } from '../../model/tag';

export interface TagRepositoryInterface {
    findByLabel(projectId: string, label: string): Promise<Tag | null>;
    save(tag: Tag): Promise<Tag>;
    getByFeedback(feedbackId: string): Promise<Tag[]>;
}

export const TagRepositoryInterface = Symbol('TagRepositoryInterface');
