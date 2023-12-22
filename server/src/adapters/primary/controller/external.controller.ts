import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProjectGuard } from '../../secondary';
import {
    CreateFeedbackCommand,
    CreateFeedbackDto,
    CreateFeedbackUseCase,
    UpvoteCommand,
    UpvoteUseCase,
    UpvoteDto,
} from '../../../hexagon/use-cases/command';
import { CurrentProject } from '../../secondary/decorator';
import { Project } from '../../../hexagon/model';
import {
    GetProjectQuery,
    ListVotingFeedbacksProjectQuery,
} from '../../../hexagon/use-cases/query';
import { UAParser } from 'ua-parser-js';

@Controller('external')
export class ExternalController {
    constructor(
        private readonly createFeedback: CreateFeedbackUseCase,
        private readonly getProjectQuery: GetProjectQuery,
        private readonly listVotingFeedbacksProjectQuery: ListVotingFeedbacksProjectQuery,
        private readonly upvote: UpvoteUseCase,
    ) {}

    @Post('feedback')
    @UseGuards(ProjectGuard)
    @UsePipes(new ValidationPipe({ groups: ['external'] }))
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
                dto.language,
                dto.author,
                parser.getOS().name,
                parser.getEngine().name,
                parser.getBrowser().name,
                dto.url,
            ),
        );
    }

    @Post('feedback/:id/upvote')
    @UseGuards(ProjectGuard)
    async upvoteFeedback(
        @CurrentProject() project: Project,
        @Param('id') id: string,
        @Body() dto: UpvoteDto,
    ) {
        await this.upvote.handle(
            new UpvoteCommand(id, project.id, {
                id: dto.projectCustomerId,
                email: dto.projectCustomerEmail,
                ipAddress: dto.projectCustomerIpAddress,
                logoUrl: dto.projectCustomerLogoUrl,
            }),
        );
    }

    @Get('feedback')
    @UseGuards(ProjectGuard)
    async listFeedbacksProject(@CurrentProject() project: Project) {
        return this.listVotingFeedbacksProjectQuery.handle(project);
    }

    @Get('project')
    @UseGuards(ProjectGuard)
    async findFromCredential(@CurrentProject() project: Project) {
        return this.getProjectQuery.handle(project.id, project.userId);
    }
}
