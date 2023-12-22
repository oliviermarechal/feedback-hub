import { Controller, Get, Query } from '@nestjs/common';
import { TagAutocompleteQuery } from '../../../hexagon/use-cases/query';

@Controller('tag')
export class TagController {
    constructor(
        private readonly tagAutocomplete: TagAutocompleteQuery,
    ) {}

    @Get('autocomplete')
    async autocomplete(
        @Query('term') term: string,
        @Query('projectId') projectId: string,
    ) {
        return this.tagAutocomplete.handle(term, projectId);
    }
}
