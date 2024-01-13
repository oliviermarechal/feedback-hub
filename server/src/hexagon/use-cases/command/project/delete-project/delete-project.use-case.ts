import { ProjectRepositoryInterface } from '../../../../gateways/repository';
import { DeleteProjectCommand } from './delete-project.command';

export class DeleteProjectUseCase {
    constructor(
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}

    async handle(command: DeleteProjectCommand) {
        await this.projectRepository.delete(command.projectId, command.userId);
    }
}
