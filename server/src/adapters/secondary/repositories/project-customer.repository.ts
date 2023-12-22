import { ProjectCustomerRepositoryInterface } from '../../../hexagon/gateways/repository';
import { ProjectCustomer } from '../../../hexagon/model';
import DbProvider from '../../primary/providers/db-provider';

export class ProjectCustomerRepository
    implements ProjectCustomerRepositoryInterface
{
    private dbProvider = DbProvider;

    async findByExternalId(
        externalId: string,
        projectId: string,
    ): Promise<ProjectCustomer | null> {
        const customerRow = (
            await this.dbProvider('project_customers').where({
                externalId: externalId,
                projectId: projectId,
            })
        )[0];

        return customerRow ? ProjectCustomer.create(customerRow) : null;
    }

    async findByIpAddress(
        ipAddress: string,
        projectId: string,
    ): Promise<ProjectCustomer | null> {
        const customerRow = (
            await this.dbProvider('project_customers')
                .whereRaw('? = ANY(ip_address)', ipAddress)
                .where({ projectId })
        )[0];

        return customerRow ? ProjectCustomer.create(customerRow) : null;
    }

    async save(customer: ProjectCustomer): Promise<ProjectCustomer> {
        const count = (
            await this.dbProvider.raw(
                'SELECT COUNT(id) as count FROM project_customers WHERE id = ?',
                [customer.id],
            )
        ).rows[0].count;

        if (count > 0) {
            const projectRow = (
                await this.dbProvider('project_customers')
                    .where({ id: customer.id })
                    .update({ ...customer }, '*')
            )[0];

            return ProjectCustomer.create(projectRow);
        }

        const projectRow = (
            await this.dbProvider('project_customers').insert(
                { ...customer },
                '*',
            )
        )[0];

        return ProjectCustomer.create(projectRow);
    }
}
