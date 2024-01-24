<script lang="ts">
    import Modal from '../common/modal.svelte';
    import type {Feedback} from '../../stores/interfaces/feedback';
    import {FeedbackType} from '../../stores/interfaces/feedback';
    import apiClient from '../../api';
    import {updateFeedback} from '../../stores/feedback.store';
    import Icon from '@iconify/svelte';
    import { Button } from '$lib/components/ui/button';
    import { Label } from '$lib/components/ui/label';
    import { Textarea } from '$lib/components/ui/textarea';
    import { Input } from '$lib/components/ui/input';
    import { Badge } from '$lib/components/ui/badge';
    import {Separator} from '$lib/components/ui/separator';

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
        if (e.keyCode === 13 && tagTerm.length > 1) {
            addTag({label: tagTerm, projectId: feedback.projectId});
        }
    }

    const handleChangeTagInput = async () => {
        if (tagTerm.length > 1) {
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
<style>
    .font-9 {
        font-size: 0.9rem;
    }
</style>
{#if feedback}
    <Modal open={open} close={onClose}>
        <span class='w-full text-center' slot='header'><h3 class='h3'>Feedback</h3></span>
        <div slot='body' class='p-5'>
            <h4 class="mb-4 text-xl font-bold tracking-tight">Details</h4>
            <div class="space-y-2">
                <div class="flex flex-row items-center">
                    <span class="font-semibold w-1/5">From</span> <span class="font-9 text-muted-foreground w-4/5">{#if feedback.author} {feedback.author?.email}{:else} unknown {/if}</span>
                </div>
                {#if feedback.type === FeedbackType.Bug}
                    <div class="flex flex-row items-center">
                        <span class="font-semibold w-1/5">URL</span> <span class="font-9 text-muted-foreground w-4/5">{feedback.url}</span>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex flex-row items-center">
                            <span class="font-semibold w-1/2">Language</span> <span class="font-9 text-muted-foreground w-1/2">{feedback.language}</span>
                        </div>
                        <div class="flex flex-row items-center">
                            <span class="font-semibold w-1/2">Browser</span> <span class="font-9 text-muted-foreground w-1/2">{feedback.browser}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex flex-row items-center">
                            <span class="font-semibold w-1/2">Os</span> <span class="font-9 text-muted-foreground w-1/2">{feedback.os}</span>
                        </div>
                        <div class="flex flex-row items-center">
                            <span class="font-semibold w-1/2">Engine</span> <span class="font-9 text-muted-foreground w-1/2">{feedback.engine}</span>
                        </div>
                    </div>
                {/if}
            </div>
            <Separator orientation="horizontal" class="my-4" />
            <div class="space-y-3">
                <h4 class="mb-3 text-xl font-bold tracking-tight">Content</h4>
                {#if editContent}
                    <div class="items-center gap-4">
                        <Textarea bind:value={feedback.content} on:keypress={handleKeypressContentInput} />
                        <p class="text-sm text-muted-foreground">
                            Press enter to valid.
                        </p>
                    </div>
                {:else}
                    <div class="flex flex-row justify-between">
                        <span>{feedback.content}</span>
                        {#if feedback.type === FeedbackType.Enhance}
                            <button on:click={() => editContent = true}>
                                <Icon class="ml-4 cursor-pointer" icon="carbon:edit" />
                            </button>
                        {/if}
                    </div>
                {/if}
                <Separator orientation="horizontal" class="my-4" />
                <div class="items-center gap-4">
                    <Label>Tags</Label>
                    <Input class="input" bind:value={tagTerm} on:input={handleChangeTagInput} on:keydown={handleTagKeydown} autocomplete={'true'} />
                    {#if autocompleteResult.length > 0}
                        <ul class="overflow-hidden absolute w-1/3 bg-white border border-primary-500/30">
                            {#each autocompleteResult as result, i}
                                <li><button class="cursor-pointer p-2 px-4 w-full text-left z-auto" on:click={() => addTag(result)}>
                                    {result.label}
                                </button></li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
            <div class='mt-2'>
                {#if feedback.tags && feedback.tags?.length > 0}
                    {#each feedback.tags as tag}
                        <Badge class="space-x-1"><span>{tag.label}</span><button on:click={() => removeTag(tag.id)}><Icon icon="raphael:cross" width="20" height="20" /></button></Badge>
                    {/each}
                {/if}
            </div>
        </div>
        <span class='w-full' slot='footer'>
            <Button class='btn variant-ringed-primary float-right' on:click={onClose}>Close</Button>
        </span>
    </Modal>
{/if}