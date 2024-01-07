<script lang='ts'>
    import { fly } from 'svelte/transition';
    import FeedbackForm from './feedback-form.svelte';
    import UpvoteEmbed from './upvote-embed.svelte';
    import { getHomepage } from '../../../global-config';
    const homepageUrl = getHomepage(process.env.NODE_ENV ? process.env.NODE_ENV : 'production');
    import InsightHuntSDK from '../sdk';
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import '../app.pcss';

    export let sdk: InsightHuntSDK;
    let embedContainerOpen = false;
    let feedbackModalOpen = false;
    let upvoteModalOpen = false;

    const toggleEmbedContainer = () => {
        embedContainerOpen = !embedContainerOpen;
    }

    const toggleFeedbackModal = () => {
        feedbackModalOpen = !feedbackModalOpen;
    }

    const toggleUpvoteModal = () => {
        upvoteModalOpen = !upvoteModalOpen;
    }

    const addFeedback = async (data: any) => {
        // TODO manage error
        await sdk.addFeedback({
            ...data,
            url: window.location.href,
            language: Intl.DateTimeFormat().resolvedOptions().locale,
        });
        toggleFeedbackModal();
    }
</script>

<div class="ih-container">
    <Button variant="outline" class="ih-button-container h-auto" on:click={toggleEmbedContainer}>
        <span class="ih-button-text">FEEDBACK</span>
    </Button>

    <div>
        <Card.Root>
            {#if embedContainerOpen}
                <div in:fly={{ x: 100, duration: 500 }}>
                    <Card.Content class="flex-col flex p-4">
                        <Button on:click={toggleFeedbackModal} type="button" class="py-2 px-4 mt-4 mx-4">Add feedback</Button>
                        <Button on:click={toggleUpvoteModal} type="button" class="py-2 px-4 mt-4 mx-4">show backlogs</Button>
                    </Card.Content>
                </div>
                <Card.Footer>
                    Powered by <a href='{homepageUrl}'><u>Insight hunt</u></a>
                </Card.Footer>
            {/if}
        </Card.Root>
    </div>
</div>
{#if feedbackModalOpen}
    <FeedbackForm onSubmit={addFeedback} open={feedbackModalOpen} onClose={toggleFeedbackModal} email={sdk.getLoggedUser()?.email} />
{/if}
{#if upvoteModalOpen}
    <UpvoteEmbed sdk={sdk} open={upvoteModalOpen} onClose={toggleUpvoteModal} />
{/if}

<style>
    .ih-container {
        @apply absolute top-1/2 right-0 z-40 flex flex-row ring-inset h-auto;
    }

    .ih-button-text {
        @apply mb-2 block;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }

    .ih-item {
        @apply py-2 px-4 mt-4 mx-4;
    }

    .ih-action-container {
        @apply flex flex-col;
    }
</style>