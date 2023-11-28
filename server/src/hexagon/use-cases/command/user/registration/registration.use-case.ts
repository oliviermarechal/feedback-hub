import { UserRepositoryInterface } from '../../../../gateways/repository';
import { RegistrationCommand } from './registration.command';
import { User } from '../../../../model';
import { generateUuid } from '../../../../../adapters/secondary';
import { EncrypterInterface } from '../../../../gateways/encrypter';
import { JwtTokenGeneratorInterface } from '../../../../gateways/generator';

export class RegistrationUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly encrypter: EncrypterInterface,
        private readonly tokenGenerator: JwtTokenGeneratorInterface,
    ) {}

    async handle(
        command: RegistrationCommand,
    ): Promise<{ user: Partial<User>; token: string }> {
        const userData = User.create({
            id: generateUuid(),
            email: command.email,
            password: await this.encrypter.encryptPassword(command.password),
        });

        const [user, token] = await Promise.all([
            this.userRepository.save(userData),
            this.tokenGenerator.generate({ id: userData.id }),
        ]);

        return {
            user: user.withoutPassword(),
            token,
        };
    }
}
