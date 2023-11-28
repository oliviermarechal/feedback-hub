import { Project } from './project';
import { Tag, TagDatabaseProps } from './tag';

export enum FeedbackType {
    Bug = 'bug',
    Enhance = 'enhance',
}

export enum FeedbackStatus {
    New = 'new',
    InWaiting = 'in_waiting',
    InProgress = 'in_progress',
    InTesting = 'in_testing',
    Done = 'done',
    Archived = 'archived',
}

export interface FeedbackProps {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    email: string;
    status: FeedbackStatus;
    os?: string;
    engine?: string;
    language?: string;
    browser?: string;
}

export interface FeedbackDatabaseProps {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    status: FeedbackStatus;
    project?: Project;
    email: string;
    os?: string;
    engine?: string;
    language?: string;
    browser?: string;
    tags?: TagDatabaseProps[];
}

export class Feedback {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    project: Project;
    status: FeedbackStatus;
    email: string;
    os?: string;
    engine: string;
    language?: string;
    browser?: string;
    tags?: Tag[];

    static create(props: FeedbackProps): Feedback {
        return Object.assign(new Feedback(), {
            id: props.id,
            type: props.type,
            content: props.content,
            projectId: props.projectId,
            status: props.status,
            email: props.email,
            os: props.os,
            engine: props.engine,
            language: props.language,
            browser: props.browser,
        });
    }

    static hydrateFromDb(dbProps: FeedbackDatabaseProps): Feedback {
        return Object.assign(new Feedback(), {
            id: dbProps.id,
            type: dbProps.type,
            content: dbProps.content,
            projectId: dbProps.projectId,
            project: dbProps.project,
            status: dbProps.status,
            email: dbProps.email,
            os: dbProps.os,
            engine: dbProps.engine,
            language: dbProps.language,
            browser: dbProps.browser,
            tags:
                dbProps.tags?.length > 0
                    ? dbProps.tags.map((tag) => Tag.hydrateFromDb(tag))
                    : null,
        });
    }

    loadTags(tags: Tag[]): Feedback {
        this.tags = tags;

        return this;
    }
}
