import { UserRepositoryInterface } from '../../../../gateways/repository';
import { LoginCommand } from './login.command';
import { User } from '../../../../model';
import { EncrypterInterface } from '../../../../gateways/encrypter';
import { JwtTokenGeneratorInterface } from '../../../../gateways/generator';
import { AuthenticationFailedException } from '../../../../exception/user';

export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly encrypter: EncrypterInterface,
        private readonly tokenGenerator: JwtTokenGeneratorInterface,
    ) {}

    async handle(
        command: LoginCommand,
    ): Promise<{ user: Partial<User>; token: string }> {
        const user = await this.userRepository.findByEmail(command.email);

        if (!user) {
            throw new AuthenticationFailedException();
        }

        if (await this.encrypter.compare(user.password, command.password)) {
            return {
                token: await this.tokenGenerator.generate({ id: user.id }),
                user: user.withoutPassword(),
            };
        }

        throw new AuthenticationFailedException();
    }
}
