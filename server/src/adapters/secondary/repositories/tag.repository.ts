import { TagRepositoryInterface } from '../../../hexagon/gateways/repository';
import DbProvider from '../../primary/providers/db-provider';
import { Tag, TagDatabaseProps } from '../../../hexagon/model/tag';

export class TagRepository implements TagRepositoryInterface {
    private dbProvider = DbProvider;

    async findByLabel(projectId: string, label: string): Promise<Tag | null> {
        const tagRow = (
            await this.dbProvider('tags')
                .where({ projectId })
                .andWhere({ label })
        )[0];

        return tagRow ? Tag.hydrateFromDb(tagRow) : null;
    }

    async getByFeedback(feedbackId: string): Promise<Tag[]> {
        const tagFeedbacks = await this.dbProvider('feedbacks_tags').where({
            feedbackId: feedbackId,
        });

        const tagIds = tagFeedbacks.map((tf) => tf.tagId);
        const tags = await this.dbProvider<TagDatabaseProps>('tags').whereIn(
            'id',
            tagIds,
        );

        return tags.map((t) => Tag.hydrateFromDb(t));
    }

    async save(tag: Tag): Promise<Tag> {
        const count = (
            await this.dbProvider.raw(
                'SELECT COUNT(id) as count FROM tags WHERE id = ?',
                [tag.id],
            )
        ).rows[0].count;

        if (count > 0) {
            const tagRow = (
                await this.dbProvider('tags')
                    .where({ id: tag.id })
                    .update({ ...tag }, '*')
            )[0];

            return Tag.create(tagRow);
        }

        const tagRow = (
            await this.dbProvider('tags').insert({ ...tag }, '*')
        )[0];

        return Tag.create(tagRow);
    }
}
