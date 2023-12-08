import FeedbackHubSDK from './sdk';
export * from './sdk';
export interface FeedbackSdkConfiguration {
    projectPublicId: string;
}
export declare function initSDK(config: FeedbackSdkConfiguration): FeedbackHubSDK;
export declare function setUpFeedbackContainer(config: {
    project: string;
}): void;
