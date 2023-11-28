import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectRepositoryInterface } from '../../../hexagon/gateways/repository';

@Injectable()
export class ProjectGuard implements CanActivate {
    constructor(
        @Inject(ProjectRepositoryInterface)
        private readonly projectRepository: ProjectRepositoryInterface,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        const project = await this.projectRepository.findByPublicId(token);

        if (!project) {
            throw new UnauthorizedException();
        }

        if (!project.domainNames.includes(request.headers.origin)) {
            throw new ForbiddenException();
        }

        request.project = project;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
