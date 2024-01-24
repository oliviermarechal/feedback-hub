import InsightHuntSDK, {IHUser} from './sdk';
import DefaultEmbed from './views/default-embed.svelte';
import UpvoteList from './views/component/upvote-list.svelte';
import FeedbackFormExternal from './views/feedback-form-external.svelte';
import {locale} from '$lib/i18n/i18n';

export * from './sdk';

let sdk: InsightHuntSDK;
export type SupportedLanguage = 'en' | 'fr';

export interface IHSdkConfiguration {
    projectApiKey: string,
    language?: SupportedLanguage
}

export async function init(config: IHSdkConfiguration) {
    sdk = new InsightHuntSDK(config);
    await sdk.initCheck();
    locale.set(config.language || 'en');
}

const checkSsr = () => {
    return typeof window === 'undefined';
}

export function setUpFeedbackContainer() {
    if (checkSsr()) {
        return;
    }

    const container = document.createElement('div')
    container.setAttribute('id', 'insight-hunt-container')

    document.body.append(container)

    new DefaultEmbed({
        target: container,
        props: {
            sdk,
        }
    });
}

export function showUpvote(containerId: string) {
    if (checkSsr()) {
        return;
    }

    const container = document.getElementById(containerId)

    if (!container) {
        throw new Error('DOM element with id ' + containerId + ' not found');
    }

    new UpvoteList({
        target: container,
        props: {
            sdk,
        }
    });
}

export function showFeedbackForm(containerId: string) {
    if (checkSsr()) {
        return;
    }

    const container = document.getElementById(containerId)

    if (!container) {
        throw new Error('DOM element with id ' + containerId + ' not found');
    }

    new FeedbackFormExternal({
        target: container,
        props: {
            sdk,
        }
    });
}

export async function userLogged(user: IHUser) {
    sdk.setAuthUser(user);
}

export async function disconnectUser() {
    sdk.logoutUser();
}