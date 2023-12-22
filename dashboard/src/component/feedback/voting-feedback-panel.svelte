<script lang="ts">
    import type {Feedback} from '../../stores/interfaces/feedback';
    import EditFeedback from '../../component/feedback/edit-feedback.svelte';

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
</script>

<section class="container mx-auto">
    <div class="flex space-x-4">
        <div class="w-1/3 text-center p-4 bg-primary-500 text-surface-900"><span class="text-xl">{feedbacks.length}</span><br /> Feedbacks</div>
        <div class="w-1/3 text-center p-4 bg-tertiary-500 text-surface-900"><span class="text-xl">{getCountDailyFeedback()}</span><br />Feedbacks today</div>
        <div class="w-1/3 text-center p-4 bg-error-500 text-surface-900"><span class="text-xl"> %</span><br /> are</div>
    </div>
    <div class="table-container mt-10">
        <table class="table table-interactive table-hover">
            <thead>
            <tr>
                <th>Date</th>
                <th>Feedback</th>
                <th>tags</th>
                <th>Vote</th>
            </tr>
            </thead>
            <tbody>
            {#each feedbacks as feedback, i (feedback.id)}
                <tr on:click={(e) => openFeedbackModal(e, feedback.id)}>
                    <td>{feedback.createdAt.toLocaleDateString()}</td>
                    <td>{displayPartialContent(feedback.content)}</td>
                    <td>
                        {#if feedback.tags && feedback.tags.length > 0}
                            {#each feedback.tags as tag, i (tag.id)}
                                <span class='chip variant-filled-secondary mr-2'>{tag.label}</span>
                            {/each}
                        {/if}
                    </td>
                    <td>{feedback.vote}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</section>

{#if feedback}
    <EditFeedback feedback={feedback} open={!!feedback} onClose={() => feedback = undefined} />
{/if}