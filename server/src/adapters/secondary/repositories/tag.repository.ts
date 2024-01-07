import { TagRepositoryInterface } from '../../../hexagon/gateways/repository';
import { DbProvider } from '../../primary/providers/db-provider';
import { Tag } from '../../../hexagon/model/tag';

export class TagRepository implements TagRepositoryInterface {
    async findByLabel(projectId: string, label: string): Promise<Tag | null> {
        const tagRow = await DbProvider.selectFrom('tags')
            .where('projectId', '=', projectId)
            .where('label', '=', label)
            .selectAll()
            .executeTakeFirst();

        return tagRow ? Tag.hydrateFromDb(tagRow) : null;
    }

    async getByFeedback(feedbackId: string): Promise<Tag[]> {
        const tags = await DbProvider.selectFrom('tags')
            .innerJoin('feedbacksTags', 'feedbacksTags.tagId', 'tags.id')
            .where('feedbacksTags.feedbackId', '=', feedbackId)
            .select(['tags.id', 'tags.label', 'tags.projectId'])
            .execute();

        return tags.map((t) => Tag.hydrateFromDb(t));
    }

    async save(tag: Tag): Promise<Tag> {
        const result = await DbProvider.selectFrom('tags')
            .select('id')
            .where('id', '=', tag.id)
            .executeTakeFirst();

        if (result) {
            const tagRow = await DbProvider.updateTable('tags')
                .where('id', '=', tag.id)
                .set({ ...tag })
                .returningAll()
                .executeTakeFirst();

            return Tag.create(tagRow);
        }

        const tagRow = await DbProvider.insertInto('tags')
            .values({ ...tag })
            .returningAll()
            .executeTakeFirst();

        return Tag.create(tagRow);
    }
}
