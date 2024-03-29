import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    AddTagCommand,
    AddTagDto,
    AddTagUseCase,
    CreateFeedbackCommand,
    CreateFeedbackDto,
    CreateFeedbackUseCase,
    DeleteFeedbackCommand,
    DeleteFeedbackUseCase,
    FeedbackToUpvoteCommand,
    FeedbackToUpvoteUseCase,
    RemoveTagCommand,
    RemoveTagUseCase,
    UpdateFeedbackContentCommand,
    UpdateFeedbackContentDto,
    UpdateFeedbackContentUseCase,
} from '../../../hexagon/use-cases/command';
import {
    ListFeedbackDto,
    ListFeedbackQuery,
} from '../../../hexagon/use-cases/query';
import { JwtGuard } from '../../secondary';
import { CurrentUser } from '../../secondary/decorator';
import { Feedback, User } from '../../../hexagon/model';

@Controller('feedback')
export class FeedbackController {
    constructor(
        private readonly createFeedback: CreateFeedbackUseCase,
        private readonly listFeedback: ListFeedbackQuery,
        private readonly addTag: AddTagUseCase,
        private readonly removeTag: RemoveTagUseCase,
        private readonly feedbackToUpvote: FeedbackToUpvoteUseCase,
        private readonly updateFeedbackContent: UpdateFeedbackContentUseCase,
        private readonly deleteFeedback: DeleteFeedbackUseCase,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() dto: CreateFeedbackDto) {
        return this.createFeedback.handle(
            new CreateFeedbackCommand(
                dto.projectId,
                dto.type,
                dto.content,
                dto.language,
                null,
                null,
                null,
                null,
                null,
                dto.status,
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

    @UseGuards(JwtGuard)
    @Post(':id/to-upvote')
    @HttpCode(200)
    async toUpvote(@Param('id') id: string): Promise<Feedback> {
        return this.feedbackToUpvote.handle(new FeedbackToUpvoteCommand(id));
    }

    @UseGuards(JwtGuard)
    @Post(':id/content')
    @HttpCode(200)
    async updateContent(
        @Param('id') id: string,
        @Body() dto: UpdateFeedbackContentDto,
    ): Promise<Feedback> {
        return this.updateFeedbackContent.handle(
            new UpdateFeedbackContentCommand(id, dto.content),
        );
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<void> {
        await this.deleteFeedback.handle(new DeleteFeedbackCommand(id));
    }

    @Get(':projectId')
    @UseGuards(JwtGuard)
    async list(
        @Param('projectId') projectId: string,
        @Query() dto: ListFeedbackDto,
        @CurrentUser() user: User,
    ) {
        return this.listFeedback.handle(user, projectId, dto);
    }
}
