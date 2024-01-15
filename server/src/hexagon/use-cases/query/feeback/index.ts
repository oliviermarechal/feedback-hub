import { Provider } from '@nestjs/common';
import { ListFeedbackQuery } from './list-feedback';

export * from './list-feedback';

export const FeedbackQueryProviders: Provider[] = [
    {
        provide: ListFeedbackQuery,
        useFactory: () => {
            return new ListFeedbackQuery();
        },
    },
];
