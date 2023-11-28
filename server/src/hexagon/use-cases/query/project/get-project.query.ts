import DbProvider from '../../../../adapters/primary/providers/db-provider';
import { Project } from '../../../model';

export class GetProjectQuery {
    async handle(projectId: string, userId: string) {
        const project = await DbProvider('projects')
            .where({ id: projectId, user_id: userId })
            .first();

        return Project.fromDbProps(project);
    }
}
