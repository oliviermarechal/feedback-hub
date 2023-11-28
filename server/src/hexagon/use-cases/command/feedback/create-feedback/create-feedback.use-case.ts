import { CreateFeedbackCommand } from './create-feedback.command';
import { Feedback, FeedbackStatus } from '../../../../model';
import { generateUuid } from '../../../../../adapters/secondary';
import { FeedbackRepositoryInterface } from '../../../../gateways/repository';

export class CreateFeedbackUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
    ) {}

    async handle(command: CreateFeedbackCommand) {
        return this.feedbackRepository.save(
            Feedback.create({
                ...command,
                id: generateUuid(),
                status: FeedbackStatus.New,
            }),
        );
    }
}
