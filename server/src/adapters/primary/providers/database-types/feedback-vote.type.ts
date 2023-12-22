import { Insertable, Selectable, Updateable } from 'kysely/dist/esm';

export interface FeedbackVoteTable {
    feedbackId: string;
    customerId: string;
}

export type FeedbackVote = Selectable<FeedbackVoteTable>;
export type NewFeedbackVote = Insertable<FeedbackVoteTable>;
export type FeedbackVoteUpdate = Updateable<FeedbackVoteTable>;
