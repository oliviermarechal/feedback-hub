<script lang="ts">
    import Modal from '../common/modal.svelte';
    import type {Feedback} from '../../stores/interfaces/feedback';
    import {FeedbackType} from '../../stores/interfaces/feedback';
    import apiClient from '../../api';
    import {updateFeedback} from '../../stores/feedback.store';
    import Icon from '@iconify/svelte';

    export let feedback: Feedback;
    export let open: boolean = false;
    export let onClose: () => any;

    let editContent: boolean = false;
    let tagTerm: string = '';
    let autocompleteResult: { id: string, label: string, projectId: string }[] = [];

    const addTag = async (tag: { id?: string, label: string, projectId: string }) => {
        tagTerm = '';
        autocompleteResult = [];

        if (feedback?.tags?.find(t => t.label === tag.label)) {
            return;
        }

        const feedbackResult = await apiClient.post(`feedback/${feedback.id}/tag`, {label: tag.label});
        feedback.tags = [
            ...feedbackResult.data.tags,
        ];
        updateFeedback(feedback);
    }

    const removeTag = async (id: string) => {
        const feedbackResult = await apiClient.delete(`feedback/${feedback.id}/tag/${id}`);
        feedback.tags = [
            ...feedbackResult.data.tags,
        ];
        updateFeedback(feedback);
    }

    const handleTagKeydown = (e: any) => {
        if (e.keyCode === 13 && tagTerm.length > 2) {
            addTag({label: tagTerm, projectId: feedback.projectId});
        }
    }

    const handleChangeTagInput = async () => {
        if (tagTerm.length > 2) {
            const result = await apiClient.get(`/tag/autocomplete?term=${tagTerm}&projectId=${feedback?.projectId}`)
            if (result.data?.length > 0) {
                autocompleteResult = result.data;
            }
        } else {
            autocompleteResult = [];
        }
    }

    $: handleKeypressContentInput = async (e: any) => {
        if (e.keyCode === 13) {
            editContent = false;
            const result = await apiClient.post(
                `/feedback/${feedback.id}/content`,
                { content: feedback.content }
            );

            if (result.status === 200) {
                updateFeedback(feedback);
            }
        }
    }
</script>

{#if feedback}
    <Modal open={open} close={onClose}>
        <span class='w-full text-center' slot='header'><h3 class='h3'>Feedback</h3></span>
        <div slot='body' class='p-5'>
            <div>From: {#if feedback.author} {feedback.author?.email}{:else} unknown {/if}</div>
            {#if feedback.type === FeedbackType.Bug}
                <div>url: {feedback.url}</div>
                <div>os: {feedback.os}</div>
                <div>engine: {feedback.engine}</div>
                <div>language: {feedback.language}</div>
                <div>browser: {feedback.browser}</div>
            {/if}
            <div class='mt-2 flex flex-row'>
                {#if editContent}
                    <textarea class="input w-full" bind:value={feedback.content} on:keypress={handleKeypressContentInput}></textarea>
                {:else}
                    <div>Content: {feedback.content}</div>
                    <button on:click={() => editContent = true}>
                        <Icon class="ml-4 cursor-pointer" icon="carbon:edit" />
                    </button>
                {/if}
            </div>
            <label class="label">
	            <span>Tags</span>
                <input class="input" bind:value={tagTerm} on:input={handleChangeTagInput} on:keydown={handleTagKeydown} autocomplete={'true'} />
                {#if autocompleteResult.length > 0}
                    <ul class="overflow-hidden absolute w-1/3 bg-surface-800 border border-primary-500/30">
                        {#each autocompleteResult as result, i}
                            <li><button class="cursor-pointer p-2 px-4 text-white hover:bg-primary-500 hover:text-black w-full text-left" on:click={() => addTag(result)}>
                                {result.label}
                            </button></li>
                        {/each}
                    </ul>
                {/if}
            </label>
            <div class='mt-2'>
                {#if feedback.tags && feedback.tags?.length > 0}
                    {#each feedback.tags as tag}
                        <button class="chip variant-filled-secondary mr-2 {tag.id}" on:click={() => removeTag(tag.id)}>
                            <span>{tag.label}</span>
                            <span>X</span>
                        </button>
                    {/each}
                {/if}
            </div>
        </div>
        <span class='w-full' slot='footer'>
            <button class='btn variant-ringed-primary float-right' on:click={onClose}>Close</button>
        </span>
    </Modal>
{/if}