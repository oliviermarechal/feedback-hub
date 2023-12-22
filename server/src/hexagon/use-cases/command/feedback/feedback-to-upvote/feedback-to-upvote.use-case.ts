import {FeedbackToUpvoteCommand} from './feedback-to-upvote.command';
import {FeedbackRepositoryInterface} from '../../../../gateways/repository';

export class FeedbackToUpvoteUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
    ) {}

    async handle(command: FeedbackToUpvoteCommand) {
        return this.feedbackRepository.toUpvote(command.feedbackId)
    }
}