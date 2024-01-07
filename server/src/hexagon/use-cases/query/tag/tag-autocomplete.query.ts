import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { Tag } from '../../../model/tag';

export class TagAutocompleteQuery {
    async handle(term: string, projectId: string): Promise<Tag[]> {
        const tags = await DbProvider.selectFrom('tags')
            .where('label', 'like', `${term}%`)
            .where('projectId', '=', projectId)
            .selectAll()
            .execute();

        return tags.map((t) => Tag.hydrateFromDb(t));
    }
}
