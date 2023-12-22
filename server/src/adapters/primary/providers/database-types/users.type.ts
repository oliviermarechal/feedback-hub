import { Generated, Insertable, Selectable, Updateable } from 'kysely/dist/esm';

export interface UserTable {
    id: Generated<string>;
    email: string;
    password: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
