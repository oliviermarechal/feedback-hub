import { UpvoteCommand } from './upvote.command';
import {
    FeedbackRepositoryInterface,
    ProjectCustomerRepositoryInterface,
} from '../../../../gateways/repository';
import { ForbiddenException } from '@nestjs/common';
import { ProjectCustomer } from '../../../../model';
import { generateUuid } from '../../../../../adapters/secondary';

export class UpvoteUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
        private readonly projectCustomerRepository: ProjectCustomerRepositoryInterface,
    ) {}

    async handle(command: UpvoteCommand) {
        const feedback = await this.feedbackRepository.find(command.feedbackId);
        if (feedback.projectId !== command.projectId) {
            throw new ForbiddenException();
        }
        let customer = await this.projectCustomerRepository.findByExternalId(
            command.customer.id,
            feedback.projectId,
        );
        if (!customer) {
            customer = await this.projectCustomerRepository.findByIpAddress(
                command.customer.ipAddress,
                feedback.projectId,
            );
        }

        if (!customer) {
            customer = ProjectCustomer.create({
                externalId: command.customer.id,
                email: command.customer.email,
                logoUrl: command.customer.logoUrl,
                projectId: feedback.projectId,
                ipAddress: [command.customer.ipAddress],
                id: generateUuid(),
            });
            customer = await this.projectCustomerRepository.save(customer);
        } else {
            // TODO: Check already voted
        }

        return this.feedbackRepository.upvote(
            command.feedbackId,
            (feedback.vote || 0) + 1,
            customer.id,
        );
    }
}
