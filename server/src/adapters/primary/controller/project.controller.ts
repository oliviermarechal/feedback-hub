import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    CreateProjectCommand,
    CreateProjectDto,
    CreateProjectUseCase,
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
        @Inject(CreateProjectUseCase)
        private readonly createProject: CreateProjectUseCase,
        @Inject(ListUserProjectQuery)
        private readonly listUserProject: ListUserProjectQuery,
        @Inject(GetProjectQuery)
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
