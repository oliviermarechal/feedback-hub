import FeedbackHubSDK from './sdk';
import DefaultEmbed from './views/default-embed.svelte';

export * from './sdk';

export interface FeedbackSdkConfiguration {
    projectPublicId: string,
}

export function initSDK(config: FeedbackSdkConfiguration) {
    const sdk = new FeedbackHubSDK(config);

    return sdk;
}

export function setUpFeedbackContainer(config: {
    project: string,
}) {
    const container = document.createElement('div')
    container.setAttribute('id', 'feedback-hub-container')

    document.body.append(container)
    const sdk = initSDK({projectPublicId: config.project});

    new DefaultEmbed({
        target: container,
        props: {
            sdk,
        }
    });
}