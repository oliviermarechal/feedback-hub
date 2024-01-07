<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../api';
    // import {TabGroup, Tab, RadioGroup, RadioItem} from '@skeletonlabs/skeleton';
    import FeedbackPanel from '../../../../component/feedback/feedback-panel.svelte'
    import VotingFeedbackPanel from '../../../../component/feedback/voting-feedback-panel.svelte'
    import { page } from '$app/stores';
    import { project } from '../../../../stores/project.store';
    import { feedbacks } from '../../../../stores/feedback.store';
    import { FeedbackStatus } from '../../../../stores/interfaces/feedback';

    const id = $page.params.id;

    let tabSet: number = 0;

    onMount(async () => {
        const [response, feedbackListResponse] = await Promise.all([
            apiClient.get(`/project/${id}`),
            apiClient.get(`/feedback/${id}`)
        ])
        project.set(response.data);
        feedbacks.set(feedbackListResponse.data.map((f: any) => {
            return {
                ...f,
                createdAt: new Date(f.createdAt)
            }
        }));
    });
</script>

<h1 class='h2 mb-10 text-center'>Project {$project?.name}</h1>
<div class="w-full flex justify-center">
    <!--
<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
    <RadioItem bind:group={tabSet} name="feebacks" value={0}>Feedbacks</RadioItem>
    <RadioItem bind:group={tabSet} name="voting" value={1}>Voting feedbacks</RadioItem>
    <RadioItem bind:group={tabSet} name="public board" value={2}>Public board <small>(coming soon...)</small></RadioItem>
</RadioGroup>
    -->
</div>
<div class="mt-5">
    {#if tabSet === 0}
        <FeedbackPanel feedbacks={$feedbacks.filter(f => f.status === FeedbackStatus.New)} />
    {:else if tabSet === 1}
        <VotingFeedbackPanel feedbacks={$feedbacks.filter(f => f.status === FeedbackStatus.Voting)} />
    {:else if tabSet === 2}
        TODO
    {/if}
</div>