import InsightHuntSDK, {IHUser} from './sdk';
import DefaultEmbed from './views/default-embed.svelte';

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

export async function userLogged(user: IHUser) {
    sdk.setAuthUser(user);
}

export async function disconnectUser() {
    sdk.logoutUser();
}