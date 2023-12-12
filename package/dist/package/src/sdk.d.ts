import { FeedbackSdkConfiguration } from './main';
export default class FeedbackHubSDK {
    private readonly projectPublicId;
    private readonly apiUrl;
    constructor(config: FeedbackSdkConfiguration);
    addFeedback(data: {
        content: string;
        type: 'bug' | 'enhance';
        email: string;
    }): Promise<void>;
}
