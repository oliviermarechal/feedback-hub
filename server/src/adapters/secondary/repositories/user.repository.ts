import { UserRepositoryInterface } from '../../../hexagon/gateways/repository';
import { DbProvider } from '../../primary/providers/db-provider';
import { User } from '../../../hexagon/model';

export class UserRepository implements UserRepositoryInterface {
    async find(id: string): Promise<User | null> {
        const userRow = await DbProvider.selectFrom('users')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();

        return userRow ? User.create(userRow) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userRow = await DbProvider.selectFrom('users')
            .where('email', '=', email)
            .selectAll()
            .executeTakeFirst();

        return userRow ? User.create(userRow) : null;
    }

    async setLastLogin(id: string): Promise<void> {
        await DbProvider.updateTable('users')
            .set({ lastLogin: new Date() })
            .where('id', '=', id)
            .execute();
    }

    async save(user: User): Promise<User> {
        const result = await DbProvider.selectFrom('users')
            .where('id', '=', user.id)
            .select('id')
            .executeTakeFirst();

        if (result) {
            const userRow = await DbProvider.updateTable('users')
                .set({ ...user })
                .where('id', '=', user.id)
                .returningAll()
                .executeTakeFirst();

            return User.create(userRow);
        }

        const userRow = await DbProvider.insertInto('users')
            .values({ ...user })
            .returningAll()
            .executeTakeFirst();

        return User.create(userRow);
    }
}
