import { Provider } from '@nestjs/common';
import { CreateProjectUseCase } from './create-project';
import {
    ProjectRepositoryInterface,
    UserRepositoryInterface,
} from '../../../gateways/repository';
import { UpdateProjectUseCase } from './update-project';
import { DeleteProjectUseCase } from './delete-project';

export * from './create-project';
export * from './update-project';
export * from './delete-project';

export const ProjectCommandUseCases: Provider[] = [
    {
        inject: [UserRepositoryInterface, ProjectRepositoryInterface],
        provide: CreateProjectUseCase,
        useFactory: (
            userRepository: UserRepositoryInterface,
            projectRepository: ProjectRepositoryInterface,
        ) => {
            return new CreateProjectUseCase(userRepository, projectRepository);
        },
    },
    {
        inject: [UserRepositoryInterface, ProjectRepositoryInterface],
        provide: UpdateProjectUseCase,
        useFactory: (
            userRepository: UserRepositoryInterface,
            projectRepository: ProjectRepositoryInterface,
        ) => {
            return new UpdateProjectUseCase(userRepository, projectRepository);
        },
    },
    {
        inject: [ProjectRepositoryInterface],
        provide: DeleteProjectUseCase,
        useFactory: (projectRepository: ProjectRepositoryInterface) => {
            return new DeleteProjectUseCase(projectRepository);
        },
    },
];
