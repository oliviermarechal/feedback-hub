import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely/dist/esm';
import { FeedbackStatus, FeedbackType } from '../../../../hexagon/model';

export interface FeedbackTable {
    id: Generated<string>;
    content: string;
    type: FeedbackType;
    projectId: string;
    authorId: string;
    url: string;
    os: string;
    engine: string;
    language: string;
    browser: string;
    status: FeedbackStatus;
    vote: number;
    createdAt: ColumnType<string, string | undefined, never>;
}

export type Feedback = Selectable<FeedbackTable>;
export type NewFeedback = Insertable<FeedbackTable>;
export type FeedbackUpdate = Updateable<FeedbackTable>;
