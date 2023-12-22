export class UpdateProjectCommand {
    constructor(
        public readonly projectId: string,
        public readonly userId: string,
        public readonly name: string,
        public readonly domainNames: string[],
    ) {}
}
