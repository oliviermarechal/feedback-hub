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
        let apiKey = this.extractApiKeyFromHeader(request);
        if (!apiKey) {
            apiKey = this.extractApiKeyFromUrl(request);
        }

        if (!apiKey) {
            throw new UnauthorizedException();
        }

        const project = await this.projectRepository.findByApiKey(apiKey);

        if (!project) {
            throw new UnauthorizedException();
        }

        const domain = new URL(request.headers.origin).host;
        if (!project.domainNames.includes(domain)) {
            throw new ForbiddenException();
        }

        request.project = project;
        return true;
    }

    private extractApiKeyFromHeader(request: Request): string | undefined {
        if (request.headers.hasOwnProperty('x-insight-hunt-api-key')) {
            return request.headers['x-insight-hunt-api-key'] as string;
        }
    }

    private extractApiKeyFromUrl(request: Request): string | undefined {
        try {
            const [, paramString] = request.url.split('?');
            const params = new URLSearchParams(paramString);

            if (params.has('api_key')) {
                return params.get('api_key');
            }
        } catch (err) {
            return undefined;
        }

        return undefined;
    }
}
