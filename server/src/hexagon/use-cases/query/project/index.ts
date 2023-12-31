import { Provider } from '@nestjs/common';
import { ListUserProjectQuery } from './list-user-project.query';
import { GetProjectQuery } from './get-project.query';
import { ListVotingFeedbacksProjectQuery } from './list-voting-feedbacks-project.query';

export * from './list-user-project.query';
export * from './get-project.query';
export * from './list-voting-feedbacks-project.query';

export const ProjectQueryProviders: Provider[] = [
    {
        provide: ListUserProjectQuery,
        useFactory: () => {
            return new ListUserProjectQuery();
        },
    },
    {
        provide: GetProjectQuery,
        useFactory: () => {
            return new GetProjectQuery();
        },
    },
    {
        provide: ListVotingFeedbacksProjectQuery,
        useFactory: () => {
            return new ListVotingFeedbacksProjectQuery();
        },
    },
];
