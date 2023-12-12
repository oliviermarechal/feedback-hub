import { Provider } from '@nestjs/common';
import { CreateFeedbackUseCase } from './create-feedback';
import { AddTagUseCase } from './add-tag';
import {
    FeedbackRepositoryInterface,
    ProjectRepositoryInterface,
    TagRepositoryInterface,
} from '../../../gateways/repository';
import { RemoveTagUseCase } from './remove-tag';

export * from './create-feedback';
export * from './add-tag';
export * from './remove-tag';

export const FeedbackCommandUseCases: Provider[] = [
    {
        inject: [FeedbackRepositoryInterface],
        provide: CreateFeedbackUseCase,
        useFactory: (feedbackRepository: FeedbackRepositoryInterface) => {
            return new CreateFeedbackUseCase(feedbackRepository);
        },
    },
    {
        inject: [
            FeedbackRepositoryInterface,
            TagRepositoryInterface,
            ProjectRepositoryInterface,
        ],
        provide: AddTagUseCase,
        useFactory: (
            feedbackRepository: FeedbackRepositoryInterface,
            tagRepository: TagRepositoryInterface,
            projectRepository: ProjectRepositoryInterface,
        ) => {
            return new AddTagUseCase(
                feedbackRepository,
                tagRepository,
                projectRepository,
            );
        },
    },
    {
        inject: [
            FeedbackRepositoryInterface,
            TagRepositoryInterface,
            ProjectRepositoryInterface,
        ],
        provide: RemoveTagUseCase,
        useFactory: (
            feedbackRepository: FeedbackRepositoryInterface,
            tagRepository: TagRepositoryInterface,
            projectRepository: ProjectRepositoryInterface,
        ) => {
            return new RemoveTagUseCase(
                feedbackRepository,
                tagRepository,
                projectRepository,
            );
        },
    },
];
