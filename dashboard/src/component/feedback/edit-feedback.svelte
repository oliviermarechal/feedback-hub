<script lang="ts">
    import Modal from '../common/modal.svelte';
    import type { Feedback } from '../../stores/interfaces/feedback';
    import apiClient from '../../api';
    import { FeedbackStatus, humanizeStatus } from '../../stores/interfaces/feedback';

    export let feedback: Feedback;
    export let open: boolean = false;
    export let onClose: () => any;

    let tagTerm: string = '';
    let autocompleteResult: { id: string, label: string, projectId: string }[] = [];

    const addTag = (tag: { id?: string, label: string, projectId: string }) => {
        tagTerm = '';
        autocompleteResult = [];

        if (feedback?.tags?.find(t => t.label === tag.label)) {
            return;
        }

        feedback.tags = [
            ...feedback.tags,
            tag,
        ];
    }

    const removeTag = (label: string) => {
        feedback.tags = [
            ...feedback.tags.filter(t => t.label !== label)
        ];
    }

    const handleTagKeydown = (e: any) => {
        if (e.keyCode === 13 && tagTerm.length > 2) {
            addTag({label: tagTerm, projectId: feedback.projectId});
        }
    }

    const handleChangeTagInput = async () => {
        if (tagTerm.length > 3) {
            const result = await apiClient.get(`/tag/autocomplete?term=${tagTerm}&projectId=${feedback?.projectId}`)
            if (result.data?.length > 0) {
                autocompleteResult = result.data;
            }
        } else {
            autocompleteResult = [];
        }
    }
</script>

{#if feedback}
    <Modal open={open} close={onClose}>
        <span class='w-full text-center' slot='header'><h3 class='h3'>Feedback</h3></span>
        <div slot='body' class='border p-5 border-secondary-500-400-token'>
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
                        <button class="chip variant-filled-secondary mr-2 {tag.label}" on:click={() => removeTag(tag.label)}>
                            <span>{tag.label}</span>
                            <span>X</span>
                        </button>
                    {/each}
                {/if}
            </div>
            <hr class='border-secondary-500-400-token my-3 divider' />
            <div class='mt-2'>
                <label class='label'>Status
                <select class="select" bind:value={feedback.status}>
                    <option value="{FeedbackStatus.Archived}">{humanizeStatus(FeedbackStatus.Archived)}</option>
                    <option value="{FeedbackStatus.Done}">{humanizeStatus(FeedbackStatus.Done)}</option>
                    <option value="{FeedbackStatus.New}">{humanizeStatus(FeedbackStatus.New)}</option>
                    <option value="{FeedbackStatus.InProgress}">{humanizeStatus(FeedbackStatus.InProgress)}</option>
                    <option value="{FeedbackStatus.InTesting}">{humanizeStatus(FeedbackStatus.InTesting)}</option>
                    <option value="{FeedbackStatus.InWaiting}">{humanizeStatus(FeedbackStatus.InWaiting)}</option>
                </select>
                </label>
            </div>

            <hr class='border-secondary-500-400-token my-3 divider' />
            <div class='mt-2'>
                <button type='button' class='btn btn-sm variant-filled-surface' disabled>Send to upvote</button> <small class='disabled'>Coming soon</small>
            </div>
        </div>
        <span class='w-full' slot='footer'>
            <button class='btn variant-ringed-primary float-right' on:click={onClose}>Close</button>
        </span>
    </Modal>
{/if}