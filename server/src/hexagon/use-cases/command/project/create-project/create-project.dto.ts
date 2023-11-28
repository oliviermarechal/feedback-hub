import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsDefined()
    name: string;

    @IsString({ each: true })
    @IsOptional()
    domainNames?: string[];
}
