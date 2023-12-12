import { RemoveTagCommand } from './remove-tag.command';
import {
    FeedbackRepositoryInterface,
    ProjectRepositoryInterface,
    TagRepositoryInterface,
} from '../../../../gateways/repository';

export class RemoveTagUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
        private readonly tagRepository: TagRepositoryInterface,
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}

    async handle(command: RemoveTagCommand) {
        const feedback = await this.feedbackRepository.find(command.feedbackId);
        const project = await this.projectRepository.find(
            feedback.projectId,
            command.userId,
        );

        if (!project) {
            throw new Error('TODO');
        }

        await this.feedbackRepository.removeFeedbackTag(
            feedback.id,
            command.tagId,
        );

        feedback.loadTags(await this.tagRepository.getByFeedback(feedback.id));

        return feedback;
    }
}
