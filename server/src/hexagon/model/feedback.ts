import { Project } from './project';
import { Tag, TagDatabaseProps } from './tag';
import { ProjectCustomer, ProjectCustomerProps } from './project-customer';

export enum FeedbackType {
    Bug = 'bug',
    Enhance = 'enhance',
}

export enum FeedbackStatus {
    New = 'new',
    Voting = 'voting',
    Archived = 'archived',
}

export interface FeedbackProps {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    authorId?: string;
    status?: FeedbackStatus;
    os?: string;
    engine?: string;
    language?: string;
    browser?: string;
    url?: string;
}

export interface FeedbackDatabaseProps {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    status: FeedbackStatus;
    project?: Project;
    authorId: string;
    author?: ProjectCustomerProps;
    vote: number;
    customersVote?: ProjectCustomerProps[];
    createdAt: Date;
    os?: string;
    engine?: string;
    language?: string;
    browser?: string;
    url?: string;
    tags?: TagDatabaseProps[];
}

export class Feedback {
    id: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    project: Project;
    status: FeedbackStatus;
    authorId: string;
    author?: ProjectCustomer;
    vote: number;
    os?: string;
    engine: string;
    createdAt: Date;
    language?: string;
    browser?: string;
    url?: string;
    tags?: Tag[];

    static create(props: FeedbackProps): Feedback {
        return Object.assign(new Feedback(), {
            id: props.id,
            type: props.type,
            content: props.content,
            projectId: props.projectId,
            status: props.status,
            authorId: props.authorId,
            os: props.os,
            engine: props.engine,
            language: props.language,
            browser: props.browser,
            url: props.url,
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
            authorId: dbProps.authorId,
            author: dbProps.author
                ? ProjectCustomer.create(dbProps.author)
                : {},
            vote: dbProps.vote,
            os: dbProps.os,
            engine: dbProps.engine,
            language: dbProps.language,
            browser: dbProps.browser,
            customersVote: dbProps.customersVote,
            url: dbProps.url,
            createdAt: dbProps.createdAt,
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
