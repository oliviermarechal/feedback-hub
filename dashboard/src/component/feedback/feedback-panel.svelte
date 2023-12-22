<script lang="ts">
    import type {Feedback} from '../../stores/interfaces/feedback';
    import {FeedbackStatus, FeedbackType, humanizeType} from '../../stores/interfaces/feedback';
    import EditFeedback from '../../component/feedback/edit-feedback.svelte';
    import apiClient from '../../api';
    import {updateFeedback} from '../../stores/feedback.store';

    export let feedbacks: Feedback[];
    const displayPartialContent = (content: string) => {
        if (content.length > 60) {
            return `${content.slice(0, 60)}...`;
        }

        return content;
    }

    let feedback: Feedback | undefined;

    $: openFeedbackModal = (e: any, feedbackId: string) => {
        e.stopPropagation();
        feedback = feedbacks.find(f => f.id === feedbackId);
    }

    $: getCountDailyFeedback = () => {
        if (feedbacks?.length > 0) {
            let todayAtMidnight = new Date();
            todayAtMidnight.setHours(0, 0, 0, 0);
            return feedbacks.filter((f) => f.createdAt.getTime() > todayAtMidnight.getTime()).length;
        } else {
            return 0;
        }
    }

    $: getBugTypePercent = () => {
        if (feedbacks?.length > 0) {
            const total = feedbacks.length;
            const bugs = feedbacks.filter((f) => f.type === FeedbackType.Bug).length;
            return Math.round((bugs / total) * 100);
        } else {
            return 0;
        }
    }

    const toUpvote = async (event: any, feedback: Feedback) => {
        event.stopPropagation();

        const feedbackResult = await apiClient.post(`feedback/${feedback.id}/to-upvote`);
        if (feedbackResult.status !== 200) {
            // TODO Manage error
            throw new Error(feedbackResult.data.message);
        }
        feedback.status = FeedbackStatus.Voting;
        updateFeedback(feedback);
    }
</script>

<section class="container mx-auto">
    <div class="flex space-x-4">
        <div class="w-1/3 text-center p-4 bg-primary-500 text-surface-900"><span class="text-xl">{feedbacks.length}</span><br /> Feedbacks</div>
        <div class="w-1/3 text-center p-4 bg-tertiary-500 text-surface-900"><span class="text-xl">{getCountDailyFeedback()}</span><br />Feedbacks today</div>
        <div class="w-1/3 text-center p-4 bg-error-500 text-surface-900"><span class="text-xl">{getBugTypePercent()} %</span><br /> are bugs</div>
    </div>
    <div class="table-container mt-10">
        <table class="table table-interactive table-hover">
            <thead>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Feedback</th>
                <th>tags</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {#if feedbacks.length === 0}
                <tr>
                    <td>No feedbacks</td>
                </tr>
            {:else}
                {#each feedbacks as feedback, i (feedback.id)}
                    <tr on:click={(e) => openFeedbackModal(e, feedback.id)}>
                        <td>{feedback.createdAt.toLocaleDateString()}</td>
                        <td>{humanizeType(feedback.type)}</td>
                        <td>{displayPartialContent(feedback.content)}</td>
                        <td>
                            {#if feedback.tags && feedback.tags.length > 0}
                                {#each feedback.tags as tag, i (tag.id)}
                                    <span class='chip variant-filled-secondary mr-2'>{tag.label}</span>
                                {/each}
                            {/if}
                        </td>
                        <td>
                            {#if feedback.type === FeedbackType.Enhance}
                                <button type='button' class='btn btn-sm variant-filled-primary' on:click={(e) => toUpvote(e, feedback)}>Send to vote</button>
                            {/if}
                            <button type='button' class='btn btn-sm variant-filled-surface disabled' disabled>Archive</button>
                        </td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
</section>

{#if feedback}
    <EditFeedback feedback={feedback} open={!!feedback} onClose={() => feedback = undefined} />
{/if}