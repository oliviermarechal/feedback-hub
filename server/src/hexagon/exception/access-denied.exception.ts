import { DomainException } from './domain-exception';

export class AccessDeniedException extends DomainException {
    constructor() {
        super('Access denied for this resources', 403);
    }
}
