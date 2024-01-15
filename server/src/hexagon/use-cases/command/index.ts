import { Provider } from '@nestjs/common';
import { FeedbackCommandUseCases } from './feedback';
import { ProjectCommandUseCases } from './project';
import { UserCommandUseCases } from './user';
import { AskEarlyAccessUseCase } from './early-access';

export * from './feedback';
export * from './project';
export * from './user';
export * from './early-access';

export const CommandUseCases: Provider[] = [
    ...FeedbackCommandUseCases,
    ...ProjectCommandUseCases,
    ...UserCommandUseCases,
    AskEarlyAccessUseCase,
];
