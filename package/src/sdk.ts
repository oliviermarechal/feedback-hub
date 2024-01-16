import { IHSdkConfiguration } from './main';
import { getApiUrl } from './global-config';
import DefaultEmbed from './views/default-embed.svelte';
import {Feedback} from './types/feedback';

export interface IHUser {
    id: string;
    email: string;
    logoUrl?: string;
}

export default class InsightHuntSDK {
    private readonly apiKey: string;
    private readonly apiUrl = getApiUrl(process.env.NODE_ENV ? process.env.NODE_ENV : 'production')
    private user: IHUser | null = null;
    private userIp: string | null = null;
    private project: any; // TODO

    constructor(config: IHSdkConfiguration) {
        this.apiKey = config.projectApiKey;
    }

    alreadyVoted(feedback: Feedback): boolean {
        if (this.user) {
            return !!feedback.customersVote.find(customer => customer.externalId === (this.user as IHUser).id);
        }

        return this.userIp ?
            !!feedback.customersVote.find(customer => customer.ipAddress?.includes((this.userIp as string))) :
            false
    }

    async initCheck() {
        const result = await fetch(
            `${this.apiUrl}/external/project`,
            {
                method: 'GET',
                headers: this.getDefaultHeader(),
            }
        );
        await result.json();

        if (result.ok) {
            this.project = result.body;
        } else {
            throw new Error('Project not found');
        }

        const response = await fetch(
            'https://api.ipify.org?format=json',
            {
                method: 'GET'
            }
        )

        const data = await response.json();
        this.userIp = data.ip
    }

    async addFeedback(feedbackContentData: {
        content: string,
        type: 'bug' | 'enhance',
        url: string,
        language: string,
        email: string,
    }): Promise<void> {
        const result = await fetch(
            `${this.apiUrl}/external/feedback`,
            {
                method: 'POST',
                body: JSON.stringify({
                    ...feedbackContentData,
                    author: {
                        externalId: this.user?.id,
                        email: this.user?.email || feedbackContentData.email,
                        logoUrl: this.user?.logoUrl,
                        ipAddress: this.userIp,
                    }
                }),
                headers: this.getDefaultHeader(),
            }
        );

        if (result.ok) {
            return;
        }
        // TODO manage error
        const body = await result.json();
        throw new Error(body.message);
    }

    async listVotingFeedbacks(): Promise<Feedback[]> {
        const result = await fetch(
            `${this.apiUrl}/external/feedback`,
            {
                method: 'GET',
                headers: this.getDefaultHeader()
            }
        );

        const body = await result.json();
        return body as Feedback[];
    }

    async upvote(feedbackId: string): Promise<boolean> {
        const body = this.user ? JSON.stringify({
            projectCustomerId: this.user.id,
            projectCustomerEmail: this.user.email,
            projectCustomerIpAddress: this.userIp,
            projectCustomerLogoUrl: this.user.logoUrl,
        }) : JSON.stringify({
            projectCustomerIpAddress: this.userIp,
        });

        const result = await fetch(
            `${this.apiUrl}/external/feedback/${feedbackId}/upvote`,
            {
                method: 'POST',
                body,
                headers: this.getDefaultHeader(),
            }
        );

        return result.ok;
    }

    isConnected(): boolean {
        return !!this.user;
    }

    setAuthUser(user: IHUser) {
        this.user = user;
    }

    logoutUser() {
        this.user = null;
    }

    getLoggedUser(): IHUser | null {
        return this.user;
    }

    getDefaultHeader() {
        return {
            'x-insight-hunt-api-key': `${this.apiKey}`,
            Accept: 'application.json',
            'Content-Type': 'application/json'
        }
    }
}