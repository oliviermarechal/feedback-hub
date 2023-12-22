import {
    Body,
    Controller,
    Get, HttpCode,
    Param,
    Post, Put,
    UseGuards,
} from '@nestjs/common';
import {
    CreateProjectCommand,
    CreateProjectDto,
    CreateProjectUseCase,
    UpdateProjectCommand, UpdateProjectDto,
    UpdateProjectUseCase,
} from '../../../hexagon/use-cases/command';
import { JwtGuard } from '../../secondary';
import { CurrentUser } from '../../secondary/decorator';
import { User } from '../../../hexagon/model';
import {
    ListUserProjectQuery,
    GetProjectQuery,
} from '../../../hexagon/use-cases/query';

@Controller('project')
export class ProjectController {
    constructor(
        private readonly createProject: CreateProjectUseCase,
        private readonly updateProject: UpdateProjectUseCase,
        private readonly listUserProject: ListUserProjectQuery,
        private readonly getProjectQuery: GetProjectQuery,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    async registration(
        @Body() dto: CreateProjectDto,
        @CurrentUser() user: User,
    ) {
        return this.createProject.handle(
            new CreateProjectCommand(user.id, dto.name, dto.domainNames),
        );
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @HttpCode(200)
    async update(
        @Body() dto: UpdateProjectDto,
        @Param('id') projectId: string,
        @CurrentUser() user: User,
    ) {
        return this.updateProject.handle(
            new UpdateProjectCommand(projectId, user.id, dto.name, dto.domainNames),
        );
    }

    @Get()
    @UseGuards(JwtGuard)
    async list(@CurrentUser() user: User) {
        return this.listUserProject.handle(user.id);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async find(@Param('id') id: string, @CurrentUser() user: User) {
        return this.getProjectQuery.handle(id, user.id);
    }
}
