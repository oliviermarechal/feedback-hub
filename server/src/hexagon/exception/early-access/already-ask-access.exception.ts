import { DomainException } from '../domain-exception';

export class AlreadyAskAccessException extends DomainException {
    constructor() {
        super('Access already requested for this email', 400);
    }
}
