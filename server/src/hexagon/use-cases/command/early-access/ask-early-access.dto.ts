import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class AskEarlyAccessDto {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    email: string;

    @IsNotEmpty()
    @IsDefined()
    content: string;
}
