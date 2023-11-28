<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../../api';
    import { project } from '../../../../../stores/project.store';
    import { page } from '$app/stores';
    import { feedbacks } from '../../../../../stores/feedback.store';
    import { humanizeStatus, humanizeType } from '../../../../../stores/interfaces/feedback';
    import type { Feedback } from '../../../../../stores/interfaces/feedback';
    import EditFeedback from '../../../../../component/feedback/edit-feedback.svelte';

    const id = $page.params.id;

    onMount(async () => {
        const [projectResponse, feedbackListResponse] = await Promise.all([
            apiClient.get(`/project/${id}`),
            apiClient.get(`/feedback/${id}`),
        ])

        project.set(projectResponse.data);
        feedbacks.set(feedbackListResponse.data);
    })

    const displayPartialContent = (content: string) => {
        if (content.length > 60) {
            content.slice(60)

            return `${content.slice(60)}...`;
        }

        return content;
    }

    let feedback: Feedback | undefined;

    $: openFeedbackModal = (e: any, feedbackId: string) => {
        e.stopPropagation();
        feedback = $feedbacks.find(f => f.id === feedbackId);
    }
</script>

<section class="container mx-auto">
    <h1 class='h2 mt-10 text-center'>Project {$project?.name}</h1>
    <div class="table-container mt-10">
        <table class="table table-interactive table-hover">
            <thead>
            <tr>
                <th>Type</th>
                <th>Feedback</th>
                <th>status</th>
                <th>tags</th>
            </tr>
            </thead>
            <tbody>
            {#each $feedbacks as feedback, i (feedback.id)}
                <tr on:click={(e) => openFeedbackModal(e, feedback.id)}>
                    <td>{humanizeType(feedback.type)}</td>
                    <td>{displayPartialContent(feedback.content)}</td>
                    <td>{humanizeStatus(feedback.status)}</td>
                    <td>
                        {#if feedback.tags && feedback.tags.length > 0}
                            {#each feedback.tags as tag, i (tag.id)}
                                <span class='chip variant-filled-secondary'>{tag.label}</span>
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