import { Insertable, Selectable, Updateable } from 'kysely/dist/esm';

export interface FeedbacksTagsTable {
    tagId: string;
    feedbackId: string;
}

export type FeedbackTag = Selectable<FeedbacksTagsTable>;
export type NewFeedbackTag = Insertable<FeedbacksTagsTable>;
export type FeedbackTagUpdate = Updateable<FeedbacksTagsTable>;
