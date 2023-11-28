import { Provider } from '@nestjs/common';
import { ListFeedbackQuery } from './list-feedback.query';

export * from './list-feedback.query';

export const FeedbackQueryProviders: Provider[] = [
    {
        provide: ListFeedbackQuery,
        useFactory: () => {
            return new ListFeedbackQuery();
        },
    },
];
