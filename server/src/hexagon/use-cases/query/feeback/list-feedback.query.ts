import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { Feedback, FeedbackStatus, User } from '../../../model';
import { AccessDeniedException } from '../../../exception';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';

export class ListFeedbackQuery {
    async handle(user: User, projectId: string) {
        const project = await DbProvider.selectFrom('projects')
            .where('id', '=', projectId)
            .where('userId', '=', user.id)
            .select('id')
            .executeTakeFirst();

        if (!project) {
            throw new AccessDeniedException();
        }

        const rows = await DbProvider.selectFrom('feedbacks')
            .selectAll()
            .select((eb) => [
                jsonArrayFrom(
                    eb
                        .selectFrom('tags')
                        .innerJoin(
                            'feedbacksTags',
                            'feedbacksTags.tagId',
                            'tags.id',
                        )
                        .whereRef(
                            'feedbacksTags.feedbackId',
                            '=',
                            'feedbacks.id',
                        )
                        .select(['tags.id', 'tags.label', 'tags.projectId']),
                ).as('tags'),
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
            .where('feedbacks.projectId', '=', projectId)
            .where('feedbacks.status', '<>', FeedbackStatus.Archived)
            .execute();

        return rows.map((dbProps) => {
            return Feedback.hydrateFromDb(dbProps);
        });
    }
}
