import { Provider } from '@nestjs/common';
import { CreateFeedbackUseCase } from './create-feedback';
import { AddTagUseCase } from './add-tag';
import {
    FeedbackRepositoryInterface,
    ProjectCustomerRepositoryInterface,
    ProjectRepositoryInterface,
    TagRepositoryInterface,
} from '../../../gateways/repository';
import { RemoveTagUseCase } from './remove-tag';
import { FeedbackToUpvoteUseCase } from './feedback-to-upvote';
import { UpdateFeedbackContentUseCase } from './update-feedback-content';
import { UpvoteUseCase } from './upvote';
import { DeleteFeedbackUseCase } from './delete-feedback';

export * from './create-feedback';
export * from './add-tag';
export * from './remove-tag';
export * from './feedback-to-upvote';
export * from './update-feedback-content';
export * from './upvote';
export * from './delete-feedback';

export const FeedbackCommandUseCases: Provider[] = [
    {
        inject: [
            FeedbackRepositoryInterface,
            ProjectCustomerRepositoryInterface,
        ],
        provide: CreateFeedbackUseCase,
        useFactory: (
            feedbackRepository: FeedbackRepositoryInterface,
            projectCustomerRepository: ProjectCustomerRepositoryInterface,
        ) => {
            return new CreateFeedbackUseCase(
                feedbackRepository,
                projectCustomerRepository,
            );
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
    {
        inject: [FeedbackRepositoryInterface],
        provide: FeedbackToUpvoteUseCase,
        useFactory: (feedbackRepository: FeedbackRepositoryInterface) => {
            return new FeedbackToUpvoteUseCase(feedbackRepository);
        },
    },
    {
        inject: [FeedbackRepositoryInterface],
        provide: UpdateFeedbackContentUseCase,
        useFactory: (feedbackRepository: FeedbackRepositoryInterface) => {
            return new UpdateFeedbackContentUseCase(feedbackRepository);
        },
    },
    {
        inject: [
            FeedbackRepositoryInterface,
            ProjectCustomerRepositoryInterface,
        ],
        provide: UpvoteUseCase,
        useFactory: (
            feedbackRepository: FeedbackRepositoryInterface,
            projectCustomerRepository: ProjectCustomerRepositoryInterface,
        ) => {
            return new UpvoteUseCase(
                feedbackRepository,
                projectCustomerRepository,
            );
        },
    },
    {
        inject: [FeedbackRepositoryInterface],
        provide: DeleteFeedbackUseCase,
        useFactory: (feedbackRepository: FeedbackRepositoryInterface) => {
            return new DeleteFeedbackUseCase(feedbackRepository);
        },
    },
];
