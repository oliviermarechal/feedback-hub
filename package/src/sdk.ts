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
        language: string,
        email: string,
    }): Promise<void> {
        const feedbackContentData = {
            // projectId: this.projectId,
            content: data.content,
            type: data.type,
            language: data.language,
            email: data.email,
        }


        const result = await fetch(
            `${this.apiUrl}/external/feedback`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.projectPublicId}`
                }
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