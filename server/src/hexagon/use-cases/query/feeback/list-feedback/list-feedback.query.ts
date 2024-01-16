import { DbProvider } from '../../../../../adapters/primary/providers/db-provider';
import { Feedback, User } from '../../../../model';
import { AccessDeniedException } from '../../../../exception';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { ListFeedbackDto } from './list-feedback.dto';

export class ListFeedbackQuery {
    async handle(user: User, projectId: string, dto: ListFeedbackDto) {
        const project = await DbProvider.selectFrom('projects')
            .where('id', '=', projectId)
            .where('userId', '=', user.id)
            .select('id')
            .executeTakeFirst();

        if (!project) {
            throw new AccessDeniedException();
        }

        let baseQuery = DbProvider.selectFrom('feedbacks')
            .where('feedbacks.projectId', '=', projectId)
            .where('feedbacks.status', '=', dto.status);

        if (dto.startDate && dto.endDate) {
            baseQuery = baseQuery.where((eb) =>
                eb.between(
                    'feedbacks.createdAt',
                    dto.startDate.toISOString(),
                    dto.endDate.toISOString(),
                ),
            );
        }

        if (dto.term) {
            baseQuery = baseQuery.where(
                'feedbacks.content',
                'ilike',
                `%${dto.term}%`,
            );
        }

        const query = baseQuery
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
            .limit(dto.limit)
            .offset(dto.offset)
            .orderBy('feedbacks.createdAt', 'desc');

        const [rows, resultCount] = await Promise.all([
            query.execute(),
            baseQuery
                .select((eb) => eb.fn.countAll<number>().as('count'))
                .executeTakeFirst(),
        ]);

        return {
            data: rows.map((dbProps) => {
                return Feedback.hydrateFromDb(dbProps);
            }),
            total: Number(resultCount.count),
            offset: dto.offset,
            limit: dto.limit,
        };
    }
}
