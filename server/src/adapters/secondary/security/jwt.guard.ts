import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepositoryInterface } from '../../../hexagon/gateways/repository';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject(UserRepositoryInterface)
        private readonly userRepository: UserRepositoryInterface,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET,
            });

            const [user] = await Promise.all([
                this.userRepository.find(payload.id),
                this.userRepository.setLastLogin(payload.id),
            ]);

            if (!user) {
                throw new UnauthorizedException();
            }

            request.user = user;
            return !!user;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
