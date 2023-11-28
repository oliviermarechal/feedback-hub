import { Project } from '../../model';

export interface ProjectRepositoryInterface {
    findByPublicId(projectId: string | null): Promise<Project>;
    find(id: string, owner: string): Promise<Project | null>;
    existByName(name: string): Promise<boolean>;
    save(project: Project): Promise<Project>;
}

export const ProjectRepositoryInterface = Symbol('ProjectRepositoryInterface');
