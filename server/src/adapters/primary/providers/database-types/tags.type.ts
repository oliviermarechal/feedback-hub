import { Generated, Insertable, Selectable, Updateable } from 'kysely/dist/esm';

export interface TagTable {
    id: Generated<string>;
    label: string;
    projectId: string;
}

export type Tag = Selectable<TagTable>;
export type NewTag = Insertable<TagTable>;
export type TagUpdate = Updateable<TagTable>;
