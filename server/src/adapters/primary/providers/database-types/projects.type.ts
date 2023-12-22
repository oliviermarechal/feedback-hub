import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely/dist/esm';

export interface ProjectTable {
    id: Generated<string>;
    apiKey: string;
    name: string;
    createdAt: ColumnType<Date, string | undefined, never>;
    userId: string;
    domainNames: string[];
}

export type Project = Selectable<ProjectTable>;
export type NewProject = Insertable<ProjectTable>;
export type ProjectUpdate = Updateable<ProjectTable>;
