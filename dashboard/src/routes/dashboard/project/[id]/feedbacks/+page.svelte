<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../../api';
    import { project } from '../../../../../stores/project.store';
    import { page } from '$app/stores';
    import { feedbacks } from '../../../../../stores/feedback.store';
    import { FeedbackStatus, humanizeStatus, humanizeType } from '../../../../../stores/interfaces/feedback';
    import type { Feedback } from '../../../../../stores/interfaces/feedback';
    import EditFeedback from '../../../../../component/feedback/edit-feedback.svelte';
    import { get } from 'svelte/store';

    const id = $page.params.id;

    onMount(async () => {
        const [projectResponse, feedbackListResponse] = await Promise.all([
            apiClient.get(`/project/${id}`),
            apiClient.get(`/feedback/${id}`),
        ])

        project.set(projectResponse.data);
        feedbacks.set(feedbackListResponse.data.map((f: any) => {
            return {
                ...f,
                createdAt: new Date(f.createdAt)
            }
        }));
        feedbacksFiltered = get(feedbacks);
    })

    const displayPartialContent = (content: string) => {
        if (content.length > 60) {
            content.slice(60)

            return `${content.slice(60)}...`;
        }

        return content;
    }

    let feedback: Feedback | undefined;
    let statusFilter: FeedbackStatus;

    $: openFeedbackModal = (e: any, feedbackId: string) => {
        e.stopPropagation();
        feedback = $feedbacks.find(f => f.id === feedbackId);
    }

    let feedbacksFiltered: Feedback[] = get(feedbacks);
    $: if (statusFilter && feedbacks) {
            feedbacksFiltered = get(feedbacks).filter(f => f.status === statusFilter);
    } else {
        feedbacksFiltered = get(feedbacks);
    }
</script>

<section class="container mx-auto">
    <h1 class='h2 mt-10 text-center'>Project {$project?.name}</h1>
    <select class='select' bind:value={statusFilter}>
        <option value="">No filter</option>
        {#each Object.keys(FeedbackStatus) as key}
            <option value="{key}">{humanizeStatus(FeedbackStatus[key])}</option>
        {/each}
    </select>
    <div class="table-container mt-10">
        <table class="table table-interactive table-hover">
            <thead>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Feedback</th>
                <th>status</th>
                <th>tags</th>
            </tr>
            </thead>
            <tbody>
            {#each feedbacksFiltered as feedback, i (feedback.id)}
                <tr on:click={(e) => openFeedbackModal(e, feedback.id)}>
                    <td>{feedback.createdAt.toLocaleDateString()}</td>
                    <td>{humanizeType(feedback.type)}</td>
                    <td>{displayPartialContent(feedback.content)}</td>
                    <td>{humanizeStatus(feedback.status)}</td>
                    <td>
                        {#if feedback.tags && feedback.tags.length > 0}
                            {#each feedback.tags as tag, i (tag.id)}
                                <span class='chip variant-filled-secondary mr-2'>{tag.label}</span>
                            {/each}
                        {/if}
                    </td>
                </tr>
            {/each}
            </tbody>
            <tfoot>
            <tr>
                <th colspan="3">Total</th>
                <td>{$feedbacks.length}</td>
            </tr>
            </tfoot>
        </table>
    </div>
</section>

{#if feedback}
    <EditFeedback feedback={feedback} open={!!feedback} onClose={() => feedback = undefined} />
{/if}