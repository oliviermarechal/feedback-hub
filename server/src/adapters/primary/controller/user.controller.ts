import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
    LoginCommand,
    LoginDto,
    LoginUseCase,
    RegistrationCommand,
    RegistrationDto,
    RegistrationUseCase,
} from '../../../hexagon/use-cases/command';
import { JwtGuard } from '../../secondary';
import { CurrentUser } from '../../secondary/decorator';
import { User } from '../../../hexagon/model';
import { MeQuery } from '../../../hexagon/use-cases/query';

@Controller()
export class UserController {
    constructor(
        @Inject(RegistrationUseCase)
        private readonly registrationUseCase: RegistrationUseCase,
        @Inject(LoginUseCase)
        private readonly loginUseCase: LoginUseCase,
        @Inject(MeQuery)
        private readonly me: MeQuery,
    ) {}

    @Post('registration')
    async registration(@Body() dto: RegistrationDto) {
        return this.registrationUseCase.handle(
            new RegistrationCommand(dto.email, dto.password),
        );
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.loginUseCase.handle(
            new LoginCommand(dto.email, dto.password),
        );
    }

    @Get('me')
    @UseGuards(JwtGuard)
    async getUser(@CurrentUser() user: User) {
        return this.me.handle(user.id);
    }
}
