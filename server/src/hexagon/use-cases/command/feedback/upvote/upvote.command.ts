export class UpvoteCommand {
    constructor(
        public readonly feedbackId: string,
        public readonly projectId: string,
        public readonly customer: {
            id: string;
            email: string;
            ipAddress: string;
            logoUrl?: string;
        },
    ) {}
}
