import { Provider } from '@nestjs/common';
import { CommandUseCases } from '../../../hexagon/use-cases/command';
import { QueryUseCases } from '../../../hexagon/use-cases/query';
import {
    Argon2Encrypter,
    ProjectGuard,
    JwtTokenGenerator,
    StorageProviders,
    RepositoriesProviders,
} from '../../secondary';
import { JwtTokenGeneratorInterface } from '../../../hexagon/gateways/generator';
import { EncrypterInterface } from '../../../hexagon/gateways/encrypter';
import { JwtService } from '@nestjs/jwt';

export const AppProviders: Provider[] = [
    ...CommandUseCases,
    ...QueryUseCases,
    ...RepositoriesProviders,
    ...StorageProviders,
    {
        provide: EncrypterInterface,
        useClass: Argon2Encrypter,
    },
    {
        inject: [JwtService],
        provide: JwtTokenGeneratorInterface,
        useFactory: (jwtService: JwtService) => {
            return new JwtTokenGenerator(jwtService);
        },
    },
    ProjectGuard,
];
