import { UserRepositoryInterface } from '../../../hexagon/gateways/repository';
import DbProvider from '../../primary/providers/db-provider';
import { Project, User } from '../../../hexagon/model';

export class UserRepository implements UserRepositoryInterface {
    private dbProvider = DbProvider;

    async find(id: string): Promise<User | null> {
        const userRow = await this.dbProvider('users')
            .where({ id: id })
            .first();

        return userRow ? User.create(userRow) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userRow = await this.dbProvider('users')
            .where({ email: email })
            .first();

        return userRow ? User.create(userRow) : null;
    }

    async save(user: User): Promise<User> {
        const result = await this.dbProvider.raw(
            'SELECT COUNT(id) as count FROM users WHERE id = ?',
            [user.id],
        );

        if (result.count > 0) {
            const userRow = await this.dbProvider('users')
                .where({ id: user.id })
                .update({ ...user }, '*')
                .first();

            return User.create(userRow);
        }

        const userRow = (
            await this.dbProvider('users').insert({ ...user }, '*')
        )[0];

        return User.create(userRow);
    }
}
