<script lang='ts'>
    import { fly } from 'svelte/transition';
    import FeedbackForm from './feedback-form.svelte';
    import UpvoteEmbed from './upvote-embed.svelte';
    import { getHomepage } from '../../../global-config';
    import InsightHuntSDK from '../sdk';

    const homepageUrl = getHomepage(process.env.NODE_ENV ? process.env.NODE_ENV : 'production');
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
    <button class="ih-button-container" on:click={toggleEmbedContainer}>
        <span class="ih-button-text">FEEDBACK</span>
    </button>

    {#if embedContainerOpen}
        <div class='ih-action-container' in:fly={{ x: 100, duration: 500 }}>
            <button on:click={toggleFeedbackModal} type="button" class="ih-item ih-action-button">Add feedback</button>
            <button on:click={toggleUpvoteModal} type="button" class="ih-item ih-action-button">show backlogs</button>
            <div  class="ih-item">Powered by <a href='{homepageUrl}'><u>Insight hunt</u></a></div>
        </div>
    {/if}
</div>
{#if feedbackModalOpen}
    <FeedbackForm onSubmit={addFeedback} open={feedbackModalOpen} onClose={toggleFeedbackModal} email={sdk.getLoggedUser()?.email} />
{/if}
{#if upvoteModalOpen}
    <UpvoteEmbed sdk={sdk} open={upvoteModalOpen} onClose={toggleUpvoteModal} />
{/if}

<style>
    .ih-container {
        @apply absolute top-1/2 right-0 bg-white shadow-md z-40 flex flex-row ring-inset;
        background-color: #e8eaf1;
    }

    .ih-button-container {
        @apply right-0 p-4 cursor-pointer flex flex-col items-end z-50 ring-inset;
    }

    .ih-button-text {
        @apply mb-2 block;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }

    .ih-item {
        @apply py-2 px-4 mt-4 mx-4;
    }

    .ih-action-button {
        @apply border-2 bg-transparent;
        border-color: #a8bdf1;
    }

    .ih-action-button-disabled {
        @apply border-2 border-slate-700 bg-transparent cursor-not-allowed;
    }

    .ih-action-container {
        @apply flex flex-col;
    }
</style>