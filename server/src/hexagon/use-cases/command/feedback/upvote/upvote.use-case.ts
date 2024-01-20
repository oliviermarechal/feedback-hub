import { UpvoteCommand } from './upvote.command';
import {
    FeedbackRepositoryInterface,
    ProjectCustomerRepositoryInterface,
} from '../../../../gateways/repository';
import { ForbiddenException } from '@nestjs/common';
import { ProjectCustomer } from '../../../../model';
import { generateUuid } from '../../../../../adapters/secondary';
import { AlreadyVotedException } from '../../../../exception';

export class UpvoteUseCase {
    constructor(
        private readonly feedbackRepository: FeedbackRepositoryInterface,
        private readonly projectCustomerRepository: ProjectCustomerRepositoryInterface,
    ) {}

    async handle(command: UpvoteCommand) {
        let feedback = await this.feedbackRepository.find(command.feedbackId);
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
            feedback = await this.feedbackRepository.loadVotes(feedback);
            if (
                feedback.votes.find((vote) => vote.customerId === customer.id)
            ) {
                throw new AlreadyVotedException();
            }
        }

        return this.feedbackRepository.upvote(
            command.feedbackId,
            (feedback.vote || 0) + 1,
            customer.id,
        );
    }
}
