import { IsDefined, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
    @IsString()
    @IsDefined()
    name: string;

    @IsString({ each: true })
    @IsOptional()
    domainNames?: string[];
}
