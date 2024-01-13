<script lang='ts'>
    import { fly } from 'svelte/transition';
    import FeedbackFormEmbed from './feedback-form-embed.svelte';
    import UpvoteEmbed from './upvote-embed.svelte';
    import InsightHuntSDK from '../sdk';
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import '../app.pcss';
    import PoweredEmber from './component/powered.svelte';

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
</script>

<div class="ih-container">
    <Button variant="outline" class="ih-button-container h-auto rounded-none rounded-l-lg" on:click={toggleEmbedContainer}>
        <span class="ih-button-text">FEEDBACK</span>
    </Button>
    <Card.Root class="rounded-none border-l-0">
        {#if embedContainerOpen}
            <div in:fly={{ x: 100, duration: 500 }}>
                <Card.Content class="flex-col flex p-4">
                    <Button on:click={toggleFeedbackModal} type="button" class="py-2 px-4 mt-4 mx-4">Add feedback</Button>
                    <Button on:click={toggleUpvoteModal} type="button" class="py-2 px-4 mt-4 mx-4">upvote</Button>
                </Card.Content>
            </div>
            <Card.Footer>
                <PoweredEmber />
            </Card.Footer>
        {/if}
    </Card.Root>
</div>
{#if feedbackModalOpen}
    <FeedbackFormEmbed open={feedbackModalOpen} onClose={toggleFeedbackModal} sdk={sdk} />
{/if}
{#if upvoteModalOpen}
    <UpvoteEmbed sdk={sdk} open={upvoteModalOpen} onClose={toggleUpvoteModal} displayPowered={false} />
{/if}

<style>
    .ih-container {
        @apply fixed top-1/2 right-0 z-40 flex flex-row ring-inset h-auto;
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