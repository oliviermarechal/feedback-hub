import {IsDefined, IsNotEmpty, IsString} from 'class-validator';

export class UpdateFeedbackContentDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    content: string;
}