import { Provider } from '@nestjs/common';
import { FeedbackQueryProviders } from './feeback';
import { UserQueryProviders } from './user';
import { ProjectQueryProviders } from './project';
import { TagQueryProviders } from './tag';

export * from './feeback';
export * from './project';
export * from './user';
export * from './tag';

export const QueryUseCases: Provider[] = [
    ...FeedbackQueryProviders,
    ...UserQueryProviders,
    ...ProjectQueryProviders,
    ...TagQueryProviders,
];
