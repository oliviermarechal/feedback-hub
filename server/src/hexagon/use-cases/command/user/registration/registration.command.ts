export class RegistrationCommand {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}
}
