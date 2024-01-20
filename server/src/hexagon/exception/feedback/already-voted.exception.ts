import { DomainException } from '../domain-exception';

export class AlreadyVotedException extends DomainException {
    constructor() {
        super('You have already vote for this feedback', 400);
    }
}
