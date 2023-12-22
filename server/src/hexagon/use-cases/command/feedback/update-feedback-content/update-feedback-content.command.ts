export class UpdateFeedbackContentCommand {
    constructor(
        public readonly feedbackId: string,
        public readonly content: string,
    ) {}
}