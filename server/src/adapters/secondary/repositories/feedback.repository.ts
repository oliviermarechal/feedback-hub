import { FeedbackRepositoryInterface } from '../../../hexagon/gateways/repository';
import DbProvider from '../../primary/providers/db-provider';
import { Feedback } from '../../../hexagon/model';

export class FeedbackRepository implements FeedbackRepositoryInterface {
    private dbProvider = DbProvider;

    async save(feedback: Feedback): Promise<Feedback> {
        const result = await this.dbProvider.raw(
            'SELECT COUNT(id) as count FROM feedbacks WHERE id = ?',
            [feedback.id],
        );

        if (result.count > 0) {
            const feedbackRow = (
                await this.dbProvider('feedbacks')
                    .where({ id: feedback.id })
                    .update({ ...feedback }, '*')
            )[0];

            return Feedback.create(feedbackRow);
        }

        const feedbackRow = (
            await this.dbProvider('feedbacks').insert({ ...feedback }, '*')
        )[0];

        return Feedback.create(feedbackRow);
    }

    async find(id: string): Promise<Feedback | null> {
        const feedbackRow = (
            await this.dbProvider('feedbacks').where({ id })
        )[0];

        return feedbackRow ? Feedback.hydrateFromDb(feedbackRow) : null;
    }

    async addFeedbackTag(feedbackId: string, tagId: string): Promise<void> {
        await this.dbProvider('feedbacks_tags').insert(
            { tagId, feedbackId },
            '*',
        );
    }
}
