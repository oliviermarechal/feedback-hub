import { IHSdkConfiguration } from './main';
import { Feedback } from './types/feedback';
export interface IHUser {
    id: string;
    email: string;
    logoUrl?: string;
}
export default class InsightHuntSDK {
    private readonly apiKey;
    private readonly apiUrl;
    private user;
    private userIp;
    private project;
    constructor(config: IHSdkConfiguration);
    initCheck(): Promise<void>;
    addFeedback(feedbackContentData: {
        content: string;
        type: 'bug' | 'enhance';
        url: string;
        language: string;
        email: string;
    }): Promise<void>;
    listVotingFeedbacks(): Promise<Feedback[]>;
    upvote(feedbackId: string): Promise<boolean>;
    isConnected(): boolean;
    setAuthUser(user: IHUser): void;
    logoutUser(): void;
    getLoggedUser(): IHUser | null;
    getDefaultHeader(): {
        'x-insight-hunt-api-key': string;
        Accept: string;
        'Content-Type': string;
    };
}
