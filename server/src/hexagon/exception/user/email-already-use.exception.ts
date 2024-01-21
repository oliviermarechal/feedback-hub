import { DomainException } from '../domain-exception';

export class EmailAlreadyUseException extends DomainException {
    constructor() {
        super('Email already use', 400);
    }
}
