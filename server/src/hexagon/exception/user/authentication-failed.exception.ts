import { DomainException } from '../domain-exception';

export class AuthenticationFailedException extends DomainException {
    constructor() {
        super('Authentication failed', 400);
    }
}
