import {
    Body,
    Controller,
    Delete,
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
    RemoveTagCommand,
    RemoveTagUseCase,
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
        @Inject(RemoveTagUseCase)
        private readonly removeTag: RemoveTagUseCase,
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

    @Delete(':id/tag/:tagId')
    @UseGuards(JwtGuard)
    async removeTagToFeedback(
        @Param('id') id: string,
        @Param('tagId') tagId: string,
        @CurrentUser() user: User,
    ): Promise<Feedback> {
        return this.removeTag.handle(new RemoveTagCommand(user.id, id, tagId));
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
