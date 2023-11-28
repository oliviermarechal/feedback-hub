export class AddTagCommand {
    constructor(
        public readonly userId: string,
        public readonly feedbackId: string,
        public readonly tagLabel: string,
    ) {}
}
