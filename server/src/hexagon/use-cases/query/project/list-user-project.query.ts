import DbProvider from '../../../../adapters/primary/providers/db-provider';
import { Project } from '../../../model';

export class ListUserProjectQuery {
    async handle(userId: string) {
        const rows = await DbProvider.select('*')
            .from('projects')
            .where('user_id', userId);

        return rows.map((dbProps) => {
            return Project.fromDbProps(dbProps);
        });
    }
}
