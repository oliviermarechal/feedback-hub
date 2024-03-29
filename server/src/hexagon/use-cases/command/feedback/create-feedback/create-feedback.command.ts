import { FeedbackStatus, FeedbackType } from '../../../../model';

export class CreateFeedbackCommand {
    constructor(
        public readonly projectId: string,
        public readonly type: FeedbackType,
        public readonly content: string,
        public readonly language: string,
        public readonly author?: {
            email: string;
            ipAddress: string;
            externalId?: string;
            logoUrl?: string;
        },
        public readonly os?: string,
        public readonly engine?: string,
        public readonly browser?: string,
        public readonly url?: string,
        public readonly status?: FeedbackStatus,
        public readonly file?: Express.Multer.File,
    ) {}
}
