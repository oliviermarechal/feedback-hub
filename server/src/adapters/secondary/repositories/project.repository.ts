import { ProjectRepositoryInterface } from '../../../hexagon/gateways/repository';
import { Project } from '../../../hexagon/model';
import DbProvider from '../../primary/providers/db-provider';

export class ProjectRepository implements ProjectRepositoryInterface {
    private dbProvider = DbProvider;

    async findByApiKey(apiKey: string): Promise<Project | null> {
        const projectRow = (
            await this.dbProvider('projects').where({apiKey: apiKey})
        )[0];

        return projectRow ? Project.fromDbProps(projectRow) : null;
    }

    async find(id: string, owner: string): Promise<Project | null> {
        const projectRow = (
            await this.dbProvider('projects').where({ id: id, userId: owner })
        )[0];

        return projectRow ? Project.fromDbProps(projectRow) : null;
    }

    async existByName(name: string): Promise<boolean> {
        const count = (
            await this.dbProvider.raw(
                'SELECT COUNT(id) as count FROM projects WHERE name = ?',
                [name],
            )
        ).rows[0].count;

        return count > 0;
    }

    async save(project: Project): Promise<Project> {
        const count = (
            await this.dbProvider.raw(
                'SELECT COUNT(id) as count FROM projects WHERE id = ?',
                [project.id],
            )
        ).rows[0].count;

        if (count > 0) {
            const projectRow = (
                await this.dbProvider('projects')
                    .where({ id: project.id })
                    .update({ ...project }, '*')
            )[0];

            return Project.create(projectRow);
        }

        const projectRow = (
            await this.dbProvider('projects').insert({ ...project }, '*')
        )[0];

        return Project.create(projectRow);
    }
}
