import InsightHuntSDK, {IHUser} from './sdk';
import DefaultEmbed from './views/default-embed.svelte';
import UpvoteList from './views/component/upvote-list.svelte';
import FeedbackFormExternal from './views/feedback-form-external.svelte';

export * from './sdk';

let sdk: InsightHuntSDK;

export interface IHSdkConfiguration {
    projectApiKey: string,
}

export async function init(config: IHSdkConfiguration) {
    sdk = new InsightHuntSDK(config);
    await sdk.initCheck();
}

export function setUpFeedbackContainer() {
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