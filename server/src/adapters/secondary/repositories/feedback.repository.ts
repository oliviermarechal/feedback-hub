import { FeedbackRepositoryInterface } from '../../../hexagon/gateways/repository';
import DbProvider, { DbKysely } from '../../primary/providers/db-provider';
import { Feedback, FeedbackStatus } from '../../../hexagon/model';

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

    async removeFeedbackTag(feedbackId: string, tagId: string): Promise<void> {
        await this.dbProvider('feedbacks_tags')
            .where({ tagId: tagId, feedbackId: feedbackId })
            .del();
    }

    async toUpvote(feedbackId: string): Promise<Feedback> {
        const feedbackRow = (
            await this.dbProvider('feedbacks')
                .where({ id: feedbackId })
                .update({ status: FeedbackStatus.Voting }, '*')
        )[0];

        return Feedback.create(feedbackRow);
    }

    async updateContent(
        feedbackId: string,
        content: string,
    ): Promise<Feedback> {
        const feedbackRow = (
            await this.dbProvider('feedbacks')
                .where({ id: feedbackId })
                .update({ content }, '*')
        )[0];

        return Feedback.create(feedbackRow);
    }

    async upvote(
        feedbackId: string,
        voteValue: number,
        customerId: string,
    ): Promise<void> {
        await Promise.all([
            DbKysely.updateTable('feedbacks')
                .set({ vote: voteValue })
                .where('id', '=', feedbackId)
                .execute(),
            DbKysely.insertInto('feedbackVotes')
                .values({ feedbackId, customerId })
                .execute(),
        ]);
    }
}
