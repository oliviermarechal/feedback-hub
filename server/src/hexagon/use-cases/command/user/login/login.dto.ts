import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string;
}
