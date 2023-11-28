export class CreateProjectCommand {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly domainNames: string[],
    ) {}
}
