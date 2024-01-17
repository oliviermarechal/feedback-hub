export declare enum FeedbackType {
    Bug = "bug",
    Enhance = "enhance"
}
export declare enum FeedbackStatus {
    New = "new",
    Voting = "voting",
    Archived = "archived"
}
export interface Feedback {
    id: string;
    email: string;
    type: FeedbackType;
    content: string;
    projectId: string;
    status: FeedbackStatus;
    createdAt: Date;
    url?: string;
    os?: string;
    engine?: string;
    language?: string;
    browser?: string;
    vote: number;
    tags: {
        id: string;
        label: string;
    }[];
    customersVote: {
        id: string;
        externalId: string;
        email: string;
        logoUrl?: string;
        ipAddress?: string[];
    }[];
}
