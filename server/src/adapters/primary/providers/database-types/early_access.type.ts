import { Generated, Insertable, Selectable } from 'kysely/dist/esm';

export interface EarlyAccessTable {
    id: Generated<string>;
    email: string;
    content: string;
}

export type EarlyAccess = Selectable<EarlyAccessTable>;
export type NewEarlyAccess = Insertable<EarlyAccessTable>;
