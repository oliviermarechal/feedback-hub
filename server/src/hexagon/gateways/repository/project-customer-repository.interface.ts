import { ProjectCustomer } from '../../model';

export interface ProjectCustomerRepositoryInterface {
    save(customer: ProjectCustomer): Promise<ProjectCustomer>;
    findByExternalId(
        externalId: string,
        projectId: string,
    ): Promise<ProjectCustomer | null>;
    findByIpAddress(
        ipAddress: string,
        projectId: string,
    ): Promise<ProjectCustomer | null>;
}

export const ProjectCustomerRepositoryInterface = Symbol(
    'ProjectCustomerRepositoryInterface',
);
