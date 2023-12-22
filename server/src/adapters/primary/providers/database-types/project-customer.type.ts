import { Insertable, Selectable, Updateable } from 'kysely/dist/esm';

export interface ProjectCustomerTable {
    id: string;
    projectId: string;
    externalId: string;
    email: string;
    ipAddress: string[];
    logoUrl: string;
}

export type ProjectCustomer = Selectable<ProjectCustomerTable>;
export type NewProjectCustomer = Insertable<ProjectCustomerTable>;
export type ProjectCustomerUpdate = Updateable<ProjectCustomerTable>;
