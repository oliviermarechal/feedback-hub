import { FeedbackRepositoryInterface } from '../../../hexagon/gateways/repository';
import { DbProvider } from '../../primary/providers/db-provider';
import { Feedback, FeedbackStatus } from '../../../hexagon/model';

export class FeedbackRepository implements FeedbackRepositoryInterface {
    async save(feedback: Feedback): Promise<Feedback> {
        const result = await DbProvider.selectFrom('feedbacks')
            .select('id')
            .where('id', '=', feedback.id)
            .executeTakeFirst();

        if (result) {
            const feedbackRow = await DbProvider.updateTable('feedbacks')
                .set({ ...feedback })
                .where('id', '=', feedback.id)
                .returningAll()
                .executeTakeFirst();

            return Feedback.hydrateFromDb(feedbackRow);
        }

        const feedbackRow = await DbProvider.insertInto('feedbacks')
            .values({
                ...feedback,
                createdAt: undefined,
            })
            .returningAll()
            .executeTakeFirst();

        return Feedback.hydrateFromDb(feedbackRow);
    }

    async find(id: string): Promise<Feedback | null> {
        const feedbackRow = await DbProvider.selectFrom('feedbacks')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();

        return feedbackRow ? Feedback.hydrateFromDb(feedbackRow) : null;
    }

    async addFeedbackTag(feedbackId: string, tagId: string): Promise<void> {
        await DbProvider.insertInto('feedbacksTags')
            .values({ tagId, feedbackId })
            .execute();
    }

    async removeFeedbackTag(feedbackId: string, tagId: string): Promise<void> {
        await DbProvider.deleteFrom('feedbacksTags')
            .where('feedbackId', '=', feedbackId)
            .where('tagId', '=', tagId)
            .execute();
    }

    async toUpvote(feedbackId: string): Promise<Feedback> {
        const feedbackRow = await DbProvider.updateTable('feedbacks')
            .set({ status: FeedbackStatus.Voting })
            .where('id', '=', feedbackId)
            .returningAll()
            .executeTakeFirst();

        return Feedback.create(feedbackRow);
    }

    async updateContent(
        feedbackId: string,
        content: string,
    ): Promise<Feedback> {
        const feedbackRow = await DbProvider.updateTable('feedbacks')
            .set({ content: content })
            .where('id', '=', feedbackId)
            .returningAll()
            .executeTakeFirst();

        return Feedback.create(feedbackRow);
    }

    async upvote(
        feedbackId: string,
        voteValue: number,
        customerId: string,
    ): Promise<void> {
        await Promise.all([
            DbProvider.updateTable('feedbacks')
                .set({ vote: voteValue })
                .where('id', '=', feedbackId)
                .execute(),
            DbProvider.insertInto('feedbackVotes')
                .values({ feedbackId, customerId })
                .execute(),
        ]);
    }

    async delete(feedbackId: string): Promise<void> {
        await Promise.all([
            DbProvider.deleteFrom('feedbackVotes')
                .where('feedbackVotes.feedbackId', '=', feedbackId)
                .execute(),
            DbProvider.deleteFrom('feedbacksTags')
                .where('feedbacksTags.feedbackId', '=', feedbackId)
                .execute(),
        ]);
        await DbProvider.deleteFrom('feedbacks')
            .where('id', '=', feedbackId)
            .execute();
    }
}
