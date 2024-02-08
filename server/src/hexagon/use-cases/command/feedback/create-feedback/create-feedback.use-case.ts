import { CreateFeedbackCommand } from './create-feedback.command';
import { Feedback, FeedbackStatus, ProjectCustomer } from '../../../../model';
import { generateUuid } from '../../../../../adapters/secondary';
import {
    FeedbackRepositoryInterface,
    ProjectCustomerRepositoryInterface,
} from '../../../../gateways/repository';
import { FileStorageInterface } from '../../../../gateways/storage';

export class CreateFeedbackUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
        private readonly projectCustomerRepository: ProjectCustomerRepositoryInterface,
        private readonly fileStorage: FileStorageInterface,
    ) {}

    async handle(command: CreateFeedbackCommand) {
        let author: ProjectCustomer | null;
        if (command.author) {
            author = await this.projectCustomerRepository.findByExternalId(
                command.author.externalId,
                command.projectId,
            );

            if (!author) {
                author = await this.projectCustomerRepository.findByIpAddress(
                    command.author.ipAddress,
                    command.projectId,
                );
            } else {
                author.addIpAddress(command.author.ipAddress);
            }

            if (!author) {
                author = ProjectCustomer.create({
                    ...command.author,
                    projectId: command.projectId,
                    ipAddress: [command.author.ipAddress],
                    id: generateUuid(),
                });
            } else {
                author.externalId = command.author.externalId;
                author.email = command.author.email;
                author.logoUrl = command.author.logoUrl;
            }

            author = await this.projectCustomerRepository.save(author);
        }

        if (command.file) {
            const filePath = await this.fileStorage.uploadFile(command.file);
            // Add file path to feedback;
        }

        return this.feedbackRepository.save(
            Feedback.create({
                ...command,
                id: generateUuid(),
                status: command.status ? command.status : FeedbackStatus.New,
                authorId: author?.id,
            }),
        );
    }
}
