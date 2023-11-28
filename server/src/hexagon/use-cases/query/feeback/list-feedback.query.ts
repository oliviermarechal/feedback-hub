import DbProvider from '../../../../adapters/primary/providers/db-provider';
import { Feedback, FeedbackDatabaseProps, Project, User } from '../../../model';
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
            .leftJoin('tags', 'tags.id', 'feedbacks_tags.tag_id')
            .where({ 'feedbacks.projectId': projectId })
            .select<FeedbackDatabaseProps[]>(
                DbProvider.raw(`feedbacks.*, json_agg(tags) as tags`),
            );

        return rows.map((dbProps) => {
            return Feedback.hydrateFromDb(dbProps);
        });
    }
}
