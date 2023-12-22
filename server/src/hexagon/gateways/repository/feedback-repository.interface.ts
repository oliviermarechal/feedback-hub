import { Feedback } from '../../model';

export interface FeedbackRepositoryInterface {
    save(feedback: Feedback): Promise<Feedback>;
    find(id: string): Promise<Feedback | null>;
    addFeedbackTag(feedbackId: string, tagId: string): Promise<void>;
    removeFeedbackTag(feedbackId: string, tagId: string): Promise<void>;
    toUpvote(feedbackId: string): Promise<Feedback>;
    updateContent(feedbackId: string, content: string): Promise<Feedback>;
    upvote(
        feedbackId: string,
        voteValue: number,
        customerId: string,
    ): Promise<void>;
}

export const FeedbackRepositoryInterface = Symbol(
    'FeedbackRepositoryInterface',
);
