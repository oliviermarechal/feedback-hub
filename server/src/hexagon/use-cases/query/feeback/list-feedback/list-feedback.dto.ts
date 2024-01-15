import {
    IsDate,
    IsDefined,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { FeedbackStatus } from '../../../../model';

export class ListFeedbackDto {
    @IsNumber()
    @IsDefined()
    limit: number;

    @IsNumber()
    @IsDefined()
    offset: number;

    @IsString()
    @IsDefined()
    @IsEnum(FeedbackStatus)
    status: FeedbackStatus;

    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;

    @IsString()
    @IsOptional()
    term?: string;
}
