import { FeedbackSdkConfiguration } from './main';
import { getApiUrl } from '../../global-config';

export default class FeedbackHubSDK {
    private readonly projectPublicId: string;
    private readonly apiUrl = getApiUrl()

    constructor(config: FeedbackSdkConfiguration) {
        this.projectPublicId = config.projectPublicId;
    }

    async addFeedback(data: {
        content: string,
        type: 'bug' | 'enhance',
        email: string,
    }): Promise<void> {
        const feedbackContentData = {
            content: data.content,
            type: data.type,
            url: window.location.href,
            language: Intl.DateTimeFormat().resolvedOptions().locale,
            email: data.email,
        }

        const result = await fetch(
            `${this.apiUrl}/external/feedback`,
            {
                method: 'POST',
                body: JSON.stringify(feedbackContentData),
                headers: {
                    Authorization: `Bearer ${this.projectPublicId}`,
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
            }
        );

        if (result.ok) {
            return;
        }
        // TODO confirm
        const body = await result.json();
        throw new Error(body.message);
    }
}