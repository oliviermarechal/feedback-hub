import { DbProvider } from '../../../../adapters/primary/providers/db-provider';
import { AlreadyAskAccessException } from '../../../exception/early-access';

export class AskEarlyAccessUseCase {
    async handle(email: string, content: string) {
        const exist = await DbProvider.selectFrom('earlyAccess')
            .where('email', '=', email)
            .select('id')
            .executeTakeFirst();

        if (exist) {
            throw new AlreadyAskAccessException();
        }

        await DbProvider.insertInto('earlyAccess')
            .values({ email, content })
            .execute();
    }
}
