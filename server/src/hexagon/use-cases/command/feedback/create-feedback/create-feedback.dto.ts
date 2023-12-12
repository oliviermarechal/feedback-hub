import {
    IsDefined,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { FeedbackType } from '../../../../model';

export class CreateFeedbackDto {
    @IsString()
    @IsOptional()
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

    @IsString()
    @IsOptional()
    url: string;
}
