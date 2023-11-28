import { FeedbackType } from '../../../../model';

export class CreateFeedbackCommand {
    constructor(
        public readonly projectId: string,
        public readonly type: FeedbackType,
        public readonly content: string,
        public readonly email: string,
        public readonly language: string,
        public readonly os?: string,
        public readonly engine?: string,
        public readonly browser?: string,
    ) {}
}
