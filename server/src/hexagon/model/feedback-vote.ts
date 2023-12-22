import { ProjectCustomerProps } from './project-customer';

export interface FeedbackVoteProps {
    feedbackId: string;
    customerId: string;
}

export interface FeedbackVoteDatabaseProps {
    feedbackId: string;
    customerId: string;
    customer?: ProjectCustomerProps;
}

export class FeedbackVote {
    feedbackId: string;
    customerId: string;
    customer?: ProjectCustomerProps;

    static create(props: FeedbackVoteProps): FeedbackVote {
        return Object.assign(new FeedbackVote(), {
            feedbackId: props.feedbackId,
            customerId: props.customerId,
        });
    }

    static hydrateFromDb(dbProps: FeedbackVoteDatabaseProps): FeedbackVote {
        return Object.assign(new FeedbackVote(), {
            feedbackId: dbProps.feedbackId,
            customerId: dbProps.customerId,
            customer: dbProps.customer,
        });
    }
}
