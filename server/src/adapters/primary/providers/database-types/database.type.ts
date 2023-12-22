import { Feedback, FeedbackTable } from './feedbacks.type';
import { UserTable } from './users.type';
import { ProjectTable } from './projects.type';
import { TagTable } from './tags.type';
import { FeedbacksTagsTable } from './feedbacks-tags.type';
import { ProjectCustomerTable } from './project-customer.type';
import { FeedbackVoteTable } from './feedback-vote.type';

export interface Database {
    users: UserTable;
    projects: ProjectTable;
    feedbacks: FeedbackTable;
    tags: TagTable;
    feedbacksTags: FeedbacksTagsTable;
    projectCustomers: ProjectCustomerTable;
    feedbackVotes: FeedbackVoteTable;
}
