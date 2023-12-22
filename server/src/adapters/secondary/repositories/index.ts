import { Provider } from '@nestjs/common';
import {
    FeedbackRepositoryInterface,
    ProjectCustomerRepositoryInterface,
    ProjectRepositoryInterface,
    TagRepositoryInterface,
    UserRepositoryInterface,
} from '../../../hexagon/gateways/repository';

import { ProjectRepository } from './project.repository';
import { UserRepository } from './user.repository';
import { FeedbackRepository } from './feedback.repository';
import { TagRepository } from './tag.repository';
import { ProjectCustomerRepository } from './project-customer.repository';

export * from './feedback.repository';
export * from './project.repository';
export * from './project-customer.repository';
export * from './user.repository';
export * from './tag.repository';

export const RepositoriesProviders: Provider[] = [
    {
        provide: ProjectRepositoryInterface,
        useClass: ProjectRepository,
    },
    {
        provide: UserRepositoryInterface,
        useClass: UserRepository,
    },
    {
        provide: FeedbackRepositoryInterface,
        useClass: FeedbackRepository,
    },
    {
        provide: TagRepositoryInterface,
        useClass: TagRepository,
    },
    {
        provide: ProjectCustomerRepositoryInterface,
        useClass: ProjectCustomerRepository,
    },
];
