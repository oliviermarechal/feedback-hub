import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { User } from '../../../model';

export class MeQuery {
    async handle(userId: string): Promise<Partial<User>> {
        const user = await DbProvider.selectFrom('users')
            .where('id', '=', userId)
            .selectAll()
            .executeTakeFirst();

        return User.create(user).withoutPassword();
    }
}
