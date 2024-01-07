import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { Project } from '../../../model';

export class GetProjectQuery {
    async handle(projectId: string, userId: string) {
        const project = await DbProvider.selectFrom('projects')
            .selectAll()
            .where('id', '=', projectId)
            .where('userId', '=', userId)
            .executeTakeFirst();

        return Project.fromDbProps(project);
    }
}
