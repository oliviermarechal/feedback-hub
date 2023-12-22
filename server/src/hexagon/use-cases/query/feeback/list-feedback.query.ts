import DbProvider from '../../../../adapters/primary/providers/db-provider';
import {
    Feedback,
    FeedbackDatabaseProps,
    FeedbackStatus,
    Project,
    User,
} from '../../../model';
import { AccessDeniedException } from '../../../exception';

export class ListFeedbackQuery {
    async handle(user: User, projectId: string) {
        const project = await DbProvider<Project>('projects').where({
            id: projectId,
            userId: user.id,
        });

        if (!project) {
            throw new AccessDeniedException();
        }

        const rows = await DbProvider.from('feedbacks')
            .groupBy(['feedbacks.id'])
            .leftJoin(
                'feedbacks_tags',
                'feedbacks.id',
                'feedbacks_tags.feedback_id',
            )
            .leftJoin(
                'project_customers',
                'project_customers.id',
                'feedbacks.author_id',
            )
            .leftJoin('tags', 'tags.id', 'feedbacks_tags.tag_id')
            .where({ 'feedbacks.projectId': projectId })
            .whereNot({ status: FeedbackStatus.Archived })
            .select<FeedbackDatabaseProps[]>(
                DbProvider.raw(
                    `feedbacks.*, json_agg(tags) as tags, json_agg(project_customers.*) as author`,
                ),
            )
            .orderBy('feedbacks.createdAt', 'DESC');

        return rows.map((dbProps) => {
            dbProps.tags = dbProps.tags.filter((t) => !!t);
            dbProps.author = {
                ...dbProps.author[0],
                projectId: dbProps.author[0].project_id,
                externalId: dbProps.author[0].external_id,
                ipAddress: dbProps.author[0].ip_address,
                logoUrl: dbProps.author[0].logo_url,
            };
            return Feedback.hydrateFromDb(dbProps);
        });
    }
}
