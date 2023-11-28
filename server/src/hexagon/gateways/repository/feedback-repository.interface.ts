import { Feedback } from '../../model';

export interface FeedbackRepositoryInterface {
    save(feedback: Feedback): Promise<Feedback>;
    find(id: string): Promise<Feedback | null>;
    addFeedbackTag(feedbackId: string, tagId: string): Promise<void>;
}

export const FeedbackRepositoryInterface = Symbol(
    'FeedbackRepositoryInterface',
);
