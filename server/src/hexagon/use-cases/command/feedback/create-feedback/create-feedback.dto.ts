import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import { FeedbackType } from '../../../../model';

export class CreateFeedbackDto {
    @IsString()
    @IsDefined()
    projectId: string;

    @IsString()
    @IsDefined()
    @IsEnum(FeedbackType)
    type: FeedbackType;

    @IsString()
    @IsDefined()
    content: string;

    @IsEmail()
    @IsString()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    language: string;
}
