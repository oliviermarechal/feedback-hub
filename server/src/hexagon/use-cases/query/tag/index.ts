import { TagAutocompleteQuery } from './tag-autocomplete.query';

export * from './tag-autocomplete.query';
import { Provider } from '@nestjs/common';

export const TagQueryProviders: Provider[] = [
    {
        provide: TagAutocompleteQuery,
        useFactory: () => {
            return new TagAutocompleteQuery();
        },
    },
];
