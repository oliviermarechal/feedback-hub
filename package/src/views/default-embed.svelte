<script lang='ts'>
    import { fly } from 'svelte/transition';
    import FeedbackForm from './feedback-form.svelte';
    import FeedbackHubSDK from '../sdk.js';
    import { getHomepage } from '../../../global-config';

    const homepageUrl = getHomepage();
    export let sdk: FeedbackHubSDK;
    let embedContainerOpen = false;
    let feedbackModalOpen = false;

    function toggleEmbedContainer() {
        embedContainerOpen = !embedContainerOpen;
    }

    function toggleFeedbackModal() {
        feedbackModalOpen = !feedbackModalOpen;
    }

    const addFeedback = (data: any) => {
        sdk.addFeedback(data);
    }
</script>

<div class="fbh-container">
    <button class="fbh-button-container" on:click={toggleEmbedContainer}>
        <span class="fbh-button-text">FEEDBACK</span>
    </button>

    {#if embedContainerOpen}
        <div class='fbh-action-container' in:fly={{ x: 100, duration: 500 }}>
            <button on:click={toggleFeedbackModal} type="button" class="fbh-action-button">Add feedback</button>
            <button on:click={toggleFeedbackModal} type="button" class="fbh-action-button">Add survey</button>
            <button on:click={toggleFeedbackModal} type="button" class="fbh-action-button">show backlogs</button>
            <small>Powered by <a href='{homepageUrl}'><u>Feedback hub</u></a></small>
        </div>
    {/if}
</div>
{#if feedbackModalOpen}
    <FeedbackForm onSubmit={addFeedback} open={feedbackModalOpen} onClose={toggleFeedbackModal} />
{/if}

<style>
    .fbh-container {
        @apply absolute top-1/2 right-0 bg-white shadow-md z-40 flex flex-row ring-white/50 ring-inset;
        box-shadow: 0 0 0 0 #fff, inset 0 0 0 calc(1px + 0px) rgb(250 250 250 / 0.05), 0 0 #0000;
        background-color: #373845;
    }

    .fbh-button-container {
        @apply right-0 p-4 cursor-pointer flex flex-col items-end z-50 ring-white/50 ring-inset;
        box-shadow: 0 0 0 0 #fff, inset 0 0 0 calc(1px + 0px) rgb(250 250 250 / 0.05), 0 0 #0000;
    }

    .fbh-button-text {
        @apply mb-2 block;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }

    .fbh-action-button {
        @apply py-2 px-4 border-2 border-cyan-500 bg-transparent mt-4 mx-4;
    }

    .fbh-action-container > small {
        margin: 5px;
    }

    .fbh-action-container {
        @apply flex flex-col;
    }
</style>