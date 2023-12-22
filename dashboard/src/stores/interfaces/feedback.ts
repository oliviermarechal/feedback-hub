import type { Project } from './project';
import type { Tag } from './tag';

export enum FeedbackType {
    Bug = 'bug',
    Enhance = 'enhance',
}

export enum FeedbackStatus {
    New = 'new',
    Voting = 'voting',
    Archived = 'archived',
}

export interface Author {
    id: string;
    externalId: string;
    email: string;
    logoUrl?: string;
}

export interface Feedback {
    id: string;
    author: Author;
    type: FeedbackType;
    content: string;
    projectId: string;
    project: Project;
    status: FeedbackStatus;
    createdAt: Date;
    url?: string;
    os?: string;
    engine?: string;
    language?: string;
    browser?: string;
    vote: number;
    tags: Tag[];
}

export function humanizeType(type: FeedbackType) {
    if (type === FeedbackType.Bug) {
        return 'Bug';
    }

    return 'Enhance';
}

export function humanizeStatus(status: FeedbackStatus) {
    switch (status) {
        case FeedbackStatus.Archived:
            return 'Archived';
        case FeedbackStatus.New:
            return 'New';
        case FeedbackStatus.Voting:
            return 'In vote';
    }
}