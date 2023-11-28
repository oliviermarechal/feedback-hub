import { Provider } from '@nestjs/common';
import { CreateFeedbackUseCase } from './create-feedback';
import {
    FeedbackRepositoryInterface,
    ProjectRepositoryInterface,
    TagRepositoryInterface,
} from '../../../gateways/repository';
import { AddTagUseCase } from './add-tag';

export * from './create-feedback';
export * from './add-tag';

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
];
