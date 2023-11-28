import { HttpException } from '@nestjs/common';

export class DomainException extends HttpException {
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
    ) {
        super(message, statusCode);
    }
}
