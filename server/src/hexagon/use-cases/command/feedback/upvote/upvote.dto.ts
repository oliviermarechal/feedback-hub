import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpvoteDto {
    @IsString()
    @IsOptional()
    projectCustomerId?: string;

    @IsString()
    @IsOptional()
    projectCustomerEmail?: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    projectCustomerIpAddress: string;

    @IsString()
    @IsOptional()
    projectCustomerLogoUrl?: string;
}
