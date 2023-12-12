export class RemoveTagCommand {
    constructor(
        public readonly userId: string,
        public readonly feedbackId: string,
        public readonly tagId: string,
    ) {}
}
