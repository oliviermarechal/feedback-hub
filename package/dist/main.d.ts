import { IHUser } from './sdk';
export * from './sdk';
export type SupportedLanguage = 'en' | 'fr';
export interface IHSdkConfiguration {
    projectApiKey: string;
    language?: SupportedLanguage;
}
export declare function init(config: IHSdkConfiguration): Promise<void>;
export declare function setUpFeedbackContainer(): void;
export declare function showUpvote(containerId: string): void;
export declare function showFeedbackForm(containerId: string): void;
export declare function userLogged(user: IHUser): Promise<void>;
export declare function disconnectUser(): Promise<void>;
