import {
    IsDefined,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { FeedbackStatus, FeedbackType } from '../../../../model';
import { Type } from 'class-transformer';

export class authorDto {
    @IsString()
    @IsOptional()
    externalId: string;

    @IsString()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    ipAddress: string;

    @IsString()
    @IsOptional()
    logoUrl?: string;
}

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

    @ValidateNested({
        groups: ['external'],
    })
    @Type(() => authorDto)
    author?: authorDto;

    @IsString()
    @IsDefined()
    language: string;

    @IsString()
    @IsOptional()
    url?: string;

    @IsString()
    @IsOptional()
    @IsEnum(FeedbackStatus)
    status: FeedbackStatus;
}
