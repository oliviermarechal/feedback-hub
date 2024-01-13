import { ProjectRepositoryInterface } from '../../../hexagon/gateways/repository';
import { Project } from '../../../hexagon/model';
import { DbProvider } from '../../primary/providers/db-provider';

export class ProjectRepository implements ProjectRepositoryInterface {
    async findByApiKey(apiKey: string): Promise<Project | null> {
        const projectRow = await DbProvider.selectFrom('projects')
            .where('apiKey', '=', apiKey)
            .selectAll()
            .executeTakeFirst();

        return projectRow ? Project.fromDbProps(projectRow) : null;
    }

    async find(id: string, owner: string): Promise<Project | null> {
        const projectRow = await DbProvider.selectFrom('projects')
            .where('id', '=', id)
            .where('userId', '=', owner)
            .selectAll()
            .executeTakeFirst();

        return projectRow ? Project.fromDbProps(projectRow) : null;
    }

    async existByName(name: string): Promise<boolean> {
        const results = await DbProvider.selectFrom('projects')
            .where('name', '=', name)
            .select('id')
            .execute();

        return results.length > 0;
    }

    async save(project: Project): Promise<Project> {
        const results = await DbProvider.selectFrom('projects')
            .where('id', '=', project.id)
            .select('id')
            .execute();

        if (results.length > 0) {
            const projectRow = await DbProvider.updateTable('projects')
                .where('id', '=', project.id)
                .set({ ...project })
                .returningAll()
                .executeTakeFirst();
            return Project.create(projectRow);
        }

        const projectRow = await DbProvider.insertInto('projects')
            .values({ ...project })
            .returningAll()
            .executeTakeFirst();

        return Project.create(projectRow);
    }

    async delete(id: string, owner: string): Promise<void> {
        const feedbacks = await DbProvider.selectFrom('feedbacks')
            .selectAll()
            .where('feedbacks.projectId', '=', id)
            .execute();

        if (feedbacks.length > 0) {
            await Promise.all([
                DbProvider.deleteFrom('feedbackVotes')
                    .where(
                        'feedbackVotes.feedbackId',
                        'in',
                        feedbacks.map((f) => f.id),
                    )
                    .execute(),
                DbProvider.deleteFrom('feedbacksTags')
                    .where(
                        'feedbacksTags.feedbackId',
                        'in',
                        feedbacks.map((f) => f.id),
                    )
                    .execute(),
                DbProvider.deleteFrom('tags')
                    .where('projectId', '=', id)
                    .execute(),
            ]);
        }
        await DbProvider.deleteFrom('feedbacks')
            .where('projectId', '=', id)
            .execute();
        await DbProvider.deleteFrom('projectCustomers')
            .where('projectId', '=', id)
            .execute();
        await DbProvider.deleteFrom('projects')
            .where('id', '=', id)
            .where('userId', '=', owner)
            .execute();
    }
}
