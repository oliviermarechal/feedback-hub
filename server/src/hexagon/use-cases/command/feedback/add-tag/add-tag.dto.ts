import { IsDefined, IsString } from 'class-validator';

export class AddTagDto {
    @IsString()
    @IsDefined()
    label: string;
}
