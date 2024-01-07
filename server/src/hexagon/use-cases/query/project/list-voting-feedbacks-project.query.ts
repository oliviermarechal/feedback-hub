import { Feedback, FeedbackStatus, Project } from '../../../model';
import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';

export class ListVotingFeedbacksProjectQuery {
    async handle(project: Project) {
        const rows = await DbProvider.selectFrom('feedbacks')
            .selectAll()
            .select((eb) => [
                jsonArrayFrom(
                    eb
                        .selectFrom('tags')
                        .innerJoin(
                            'feedbacksTags',
                            'tags.id',
                            'feedbacksTags.tagId',
                        )
                        .whereRef(
                            'feedbacksTags.feedbackId',
                            '=',
                            'feedbacks.id',
                        )
                        .selectAll(),
                ).as('tag'),
                jsonArrayFrom(
                    eb
                        .selectFrom('feedbackVotes')
                        .whereRef(
                            'feedbackVotes.feedbackId',
                            '=',
                            'feedbacks.id',
                        )
                        .select((eb) => [
                            jsonObjectFrom(
                                eb
                                    .selectFrom('projectCustomers')
                                    .selectAll()
                                    .whereRef(
                                        'projectCustomers.id',
                                        '=',
                                        'feedbackVotes.customerId',
                                    ),
                            ).as('customer'),
                        ]),
                ).as('feedbackVotes'),
                jsonObjectFrom(
                    eb
                        .selectFrom('projectCustomers')
                        .selectAll()
                        .whereRef(
                            'projectCustomers.id',
                            '=',
                            'feedbacks.authorId',
                        ),
                ).as('author'),
            ])
            .where('feedbacks.projectId', '=', project.id)
            .where('status', '=', FeedbackStatus.Voting)
            .orderBy('feedbacks.createdAt', 'desc')
            .execute();

        return rows.map((row) => {
            const dbProps = {
                ...row,
                customersVote: row.feedbackVotes.map((fv) => fv.customer),
            };
            return Feedback.hydrateFromDb(dbProps);
        });
    }
}
