import { Provider } from '@nestjs/common';
import { RegistrationUseCase } from './registration';
import { UserRepositoryInterface } from '../../../gateways/repository';
import { EncrypterInterface } from '../../../gateways/encrypter';
import { LoginUseCase } from './login';
import { JwtTokenGeneratorInterface } from '../../../gateways/generator';

export * from './registration';
export * from './login';

export const UserCommandUseCases: Provider[] = [
    {
        inject: [
            UserRepositoryInterface,
            EncrypterInterface,
            JwtTokenGeneratorInterface,
        ],
        provide: RegistrationUseCase,
        useFactory: (
            userRepository: UserRepositoryInterface,
            encrypter: EncrypterInterface,
            tokenGenerator: JwtTokenGeneratorInterface,
        ) => {
            return new RegistrationUseCase(
                userRepository,
                encrypter,
                tokenGenerator,
            );
        },
    },
    {
        inject: [
            UserRepositoryInterface,
            EncrypterInterface,
            JwtTokenGeneratorInterface,
        ],
        provide: LoginUseCase,
        useFactory: (
            userRepository: UserRepositoryInterface,
            encrypter: EncrypterInterface,
            tokenGenerator: JwtTokenGeneratorInterface,
        ) => {
            return new LoginUseCase(userRepository, encrypter, tokenGenerator);
        },
    },
];
