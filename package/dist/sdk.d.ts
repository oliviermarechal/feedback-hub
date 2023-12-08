import { FeedbackSdkConfiguration } from './main';
export default class FeedbackHubSDK {
    private readonly projectPublicId;
    constructor(config: FeedbackSdkConfiguration);
    addFeedback(data: {
        content: string;
        type: 'bug' | 'enhance';
        language: string;
        email: string;
    }): Promise<void>;
}
