import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ProjectGuard } from '../../secondary';
import {
    CreateFeedbackCommand,
    CreateFeedbackDto,
    CreateFeedbackUseCase,
} from '../../../hexagon/use-cases/command';
import { CurrentProject } from '../../secondary/decorator';
import { Project } from '../../../hexagon/model';
import { GetProjectQuery } from '../../../hexagon/use-cases/query';
import { UAParser } from 'ua-parser-js';

@Controller('external')
export class ExternalController {
    constructor(
        @Inject(CreateFeedbackUseCase)
        private readonly createFeedback: CreateFeedbackUseCase,
        @Inject(GetProjectQuery)
        private readonly getProjectQuery: GetProjectQuery,
    ) {}

    @Post('feedback')
    @UseGuards(ProjectGuard)
    async externalCreation(
        @Body() dto: CreateFeedbackDto,
        @Req() request: Request,
        @CurrentProject() project?: Project,
    ) {
        const parser = new UAParser(request.headers['user-agent']);

        return this.createFeedback.handle(
            new CreateFeedbackCommand(
                project.id,
                dto.type,
                dto.content,
                dto.email,
                dto.language,
                parser.getOS().name,
                parser.getEngine().name,
                parser.getBrowser().name,
            ),
        );
    }

    @Get('project')
    @UseGuards(ProjectGuard)
    async findFromCredential(@CurrentProject() project: Project) {
        return this.getProjectQuery.handle(project.id, project.userId);
    }
}
