import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { Project } from '../../../model';

export class ListUserProjectQuery {
    async handle(userId: string) {
        const userProjects = await DbProvider.selectFrom('projects')
            .where('userId', '=', userId)
            .selectAll()
            .execute();

        return userProjects.map((dbProps) => {
            return Project.fromDbProps(dbProps);
        });
    }
}
