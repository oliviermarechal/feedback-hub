import { Provider } from '@nestjs/common';
import { MeQuery } from './me.query';

export * from './me.query';

export const UserQueryProviders: Provider[] = [
    {
        provide: MeQuery,
        useFactory: () => {
            return new MeQuery();
        },
    },
];
