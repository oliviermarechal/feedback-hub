import DbProvider from '../../../../adapters/primary/providers/db-provider';
import { Tag } from '../../../model/tag';

export class TagAutocompleteQuery {
    async handle(term: string, projectId: string): Promise<Tag[]> {
        const tags = await DbProvider.select('*')
            .from('tags')
            .where('label', 'LIKE', `${term}%`)
            .andWhere('projectId', projectId);

        return tags.map((t) => Tag.hydrateFromDb(t));
    }
}
