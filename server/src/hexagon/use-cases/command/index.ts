import { Provider } from '@nestjs/common';
import { FeedbackCommandUseCases } from './feedback';
import { ProjectCommandUseCases } from './project';
import { UserCommandUseCases } from './user';

export * from './feedback';
export * from './project';
export * from './user';

export const CommandUseCases: Provider[] = [
    ...FeedbackCommandUseCases,
    ...ProjectCommandUseCases,
    ...UserCommandUseCases,
];
