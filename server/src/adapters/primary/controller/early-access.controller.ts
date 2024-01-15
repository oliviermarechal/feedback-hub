import { Body, Controller, Post } from '@nestjs/common';
import {
    AskEarlyAccessDto,
    AskEarlyAccessUseCase,
} from '../../../hexagon/use-cases/command';

@Controller('early-access')
export class EarlyAccessController {
    constructor(private readonly askEarlyAccess: AskEarlyAccessUseCase) {}

    @Post()
    async create(@Body() dto: AskEarlyAccessDto) {
        return this.askEarlyAccess.handle(dto.email, dto.content);
    }
}
