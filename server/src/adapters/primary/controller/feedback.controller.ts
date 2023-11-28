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
    AddTagCommand,
    AddTagDto,
    AddTagUseCase,
    CreateFeedbackCommand,
    CreateFeedbackDto,
    CreateFeedbackUseCase,
} from '../../../hexagon/use-cases/command';
import { ListFeedbackQuery } from '../../../hexagon/use-cases/query';
import { JwtGuard } from '../../secondary';
import { CurrentUser } from '../../secondary/decorator';
import { Feedback, User } from '../../../hexagon/model';

@Controller('feedback')
export class FeedbackController {
    constructor(
        @Inject(CreateFeedbackUseCase)
        private readonly createFeedback: CreateFeedbackUseCase,
        @Inject(ListFeedbackQuery)
        private readonly listFeedback: ListFeedbackQuery,
        @Inject(AddTagUseCase)
        private readonly addTag: AddTagUseCase,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() dto: CreateFeedbackDto) {
        return this.createFeedback.handle(
            new CreateFeedbackCommand(
                dto.projectId,
                dto.type,
                dto.content,
                dto.email,
                dto.language,
            ),
        );
    }

    @Post(':id/tag')
    @UseGuards(JwtGuard)
    async addTagToFeedback(
        @Param('id') id: string,
        @Body() dto: AddTagDto,
        @CurrentUser() user: User,
    ): Promise<Feedback> {
        return this.addTag.handle(new AddTagCommand(user.id, id, dto.label));
    }

    @Get(':projectId')
    @UseGuards(JwtGuard)
    async list(
        @Param('projectId') projectId: string,
        @CurrentUser() user: User,
    ) {
        return this.listFeedback.handle(user, projectId);
    }
}
