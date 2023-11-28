import type { Project } from './project';
import type { Tag } from './tag';

export enum FeedbackType {
    Bug = 'Bug',
    Enhance = 'Enhance',
}

export enum FeedbackStatus {
    New = 'new',
    InWaiting = 'in_waiting',
    InProgress = 'in_progress',
    InTesting = 'in_testing',
    Done = 'done',
    Archived = 'archived',
}

export interface Feedback {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    project: Project;
    status: FeedbackStatus;
    tags: Tag[];
}

export function humanizeType(type: FeedbackType) {
    if (type === FeedbackType.Bug) {
        return 'Bug';
    }

    return 'Amélioration';
}

export function humanizeStatus(status: FeedbackStatus) {
    switch (status) {
        case FeedbackStatus.Archived:
            return 'Archived';
        case FeedbackStatus.New:
            return 'New';
        case FeedbackStatus.InProgress:
            return 'In progress';
        case FeedbackStatus.InTesting:
            return 'In testing';
        case FeedbackStatus.InWaiting:
            return 'In waiting';
        case FeedbackStatus.Done:
            return 'Done';
    }
}