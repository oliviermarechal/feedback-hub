import { DeleteFeedbackCommand } from './delete-feedback.command';
import { FeedbackRepositoryInterface } from '../../../../gateways/repository';

export class DeleteFeedbackUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
    ) {}

    async handle(command: DeleteFeedbackCommand) {
        return this.feedbackRepository.delete(command.feedbackId);
    }
}
