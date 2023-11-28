import { Provider } from '@nestjs/common';
import { CreateProjectUseCase } from './create-project';
import {
    ProjectRepositoryInterface,
    UserRepositoryInterface,
} from '../../../gateways/repository';

export * from './create-project';
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
];
