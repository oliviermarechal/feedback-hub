import DbProvider from '../../../../adapters/primary/providers/db-provider';
import { User } from '../../../model';

export class MeQuery {
    async handle(userId: string): Promise<Partial<User>> {
        const user = await DbProvider.select('*')
            .from('users')
            .where('id', userId)
            .first();

        return User.create(user).withoutPassword();
    }
}
