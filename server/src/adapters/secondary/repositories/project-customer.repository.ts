import { ProjectCustomerRepositoryInterface } from '../../../hexagon/gateways/repository';
import { ProjectCustomer } from '../../../hexagon/model';
import { DbProvider } from '../../primary/providers/db-provider';

export class ProjectCustomerRepository
    implements ProjectCustomerRepositoryInterface
{
    async findByExternalId(
        externalId: string,
        projectId: string,
    ): Promise<ProjectCustomer | null> {
        const customerRow = await DbProvider.selectFrom('projectCustomers')
            .where('externalId', '=', externalId)
            .where('projectId', '=', projectId)
            .selectAll()
            .executeTakeFirst();

        return customerRow ? ProjectCustomer.create(customerRow) : null;
    }

    async findByIpAddress(
        ipAddress: string,
        projectId: string,
    ): Promise<ProjectCustomer | null> {
        const customerRow = await DbProvider.selectFrom('projectCustomers')
            .where((eb) => eb(eb.val(ipAddress), '=', eb.fn.any('ipAddress')))
            .where('projectId', '=', projectId)
            .selectAll()
            .executeTakeFirst();

        return customerRow ? ProjectCustomer.create(customerRow) : null;
    }

    async save(customer: ProjectCustomer): Promise<ProjectCustomer> {
        const result = await DbProvider.selectFrom('projectCustomers')
            .select('id')
            .where('id', '=', customer.id)
            .executeTakeFirst();

        if (result) {
            const customerRow = await DbProvider.updateTable('projectCustomers')
                .where('id', '=', customer.id)
                .set({ ...customer })
                .returningAll()
                .executeTakeFirst();

            return ProjectCustomer.create(customerRow);
        }

        const customerRow = await DbProvider.insertInto('projectCustomers')
            .values({ ...customer })
            .returningAll()
            .executeTakeFirst();

        return ProjectCustomer.create(customerRow);
    }
}
