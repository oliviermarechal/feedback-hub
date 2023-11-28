import { AddTagCommand } from './add-tag.command';
import {
    FeedbackRepositoryInterface,
    ProjectRepositoryInterface,
    TagRepositoryInterface,
} from '../../../../gateways/repository';
import { Tag } from '../../../../model/tag';
import { generateUuid } from '../../../../../adapters/secondary';

export class AddTagUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
        private readonly tagRepository: TagRepositoryInterface,
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}

    async handle(command: AddTagCommand) {
        const feedback = await this.feedbackRepository.find(command.feedbackId);
        const project = await this.projectRepository.find(
            feedback.projectId,
            command.userId,
        );

        if (!project) {
            throw new Error('TODO');
        }

        let tag = await this.tagRepository.findByLabel(
            project.id,
            command.tagLabel,
        );

        if (!tag) {
            tag = await this.tagRepository.save(
                Tag.create({
                    id: generateUuid(),
                    projectId: project.id,
                    label: command.tagLabel,
                }),
            );
        }

        await this.feedbackRepository.addFeedbackTag(feedback.id, tag.id);

        feedback.loadTags(await this.tagRepository.getByFeedback(feedback.id));

        return feedback;
    }
}
