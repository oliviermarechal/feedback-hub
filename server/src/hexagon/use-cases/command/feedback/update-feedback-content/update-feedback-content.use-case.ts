import {UpdateFeedbackContentCommand} from './update-feedback-content.command';
import {FeedbackRepositoryInterface} from '../../../../gateways/repository';

export class UpdateFeedbackContentUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
    ) {}

    async handle(command: UpdateFeedbackContentCommand) {
        return this.feedbackRepository.updateContent(
            command.feedbackId,
            command.content,
        )
    }
}