import {
    ProjectRepositoryInterface,
    UserRepositoryInterface,
} from '../../../../gateways/repository';
import { CreateProjectCommand } from './create-project.command';
import { Project } from '../../../../model';
import { generateUuid } from '../../../../../adapters/secondary';
import * as crypto from 'crypto';

export class CreateProjectUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}

    async handle(command: CreateProjectCommand) {
        const [user, projectExist] = await Promise.all([
            this.userRepository.find(command.userId),
            this.projectRepository.existByName(command.name),
        ]);

        if (!user) {
            throw new Error('User not found');
        }

        if (projectExist) {
            throw new Error('Name already use');
        }

        const project = Project.create({
            id: generateUuid(),
            name: command.name,
            userId: command.userId,
            apiKey: crypto.randomBytes(16).toString('hex'),
            domainNames: command.domainNames,
        });

        await this.projectRepository.save(project);

        return project;
    }
}
