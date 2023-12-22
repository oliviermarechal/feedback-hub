import {
    ProjectRepositoryInterface,
    UserRepositoryInterface,
} from '../../../../gateways/repository';
import { UpdateProjectCommand } from './update-project.command';

export class UpdateProjectUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}

    async handle(command: UpdateProjectCommand) {
        const [user, project] = await Promise.all([
            this.userRepository.find(command.userId),
            this.projectRepository.find(command.projectId, command.userId),
        ]);

        if (!user) {
            throw new Error('User not found');
        }

        if (!project) {
            throw new Error('Project not found');
        }

        project.update(command.name, command.domainNames);

        await this.projectRepository.save(project);

        return project;
    }
}
