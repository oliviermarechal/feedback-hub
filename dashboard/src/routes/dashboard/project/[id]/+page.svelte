<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../api';
    import * as Tabs from "$lib/components/ui/tabs";
    import FeedbackPanel from '../../../../component/feedback/feedback-panel.svelte'
    import VotingFeedbackPanel from '../../../../component/feedback/voting-feedback-panel.svelte'
    import { page } from '$app/stores';
    import { project } from '../../../../stores/project.store';
    import { feedbacks } from '../../../../stores/feedback.store';
    import { FeedbackStatus } from '../../../../stores/interfaces/feedback';
    import { Button } from '$lib/components/ui/button';
    import Icon from '@iconify/svelte';

    const id = $page.params.id;

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

<div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex flex-row justify-between">
        <div class="flex flex-row justify-items-start">
            <a class="text-xl m-2" href="/dashboard">Dashboard</a>
            <span class="text-xl m-2"> / </span>
            <h2 class="text-2xl font-bold mt-2">{$project?.name}</h2>
        </div>
        <Button variant="link" href="/dashboard/project/{id}/settings">
            <Icon icon="iconamoon:settings-fill" width="24" height="24" />
        </Button>
    </div>
    <Tabs.Root value="feedbacks" class="h-full space-y-6">
        <Tabs.List>
            <Tabs.Trigger value="feedbacks">Feedbacks</Tabs.Trigger>
            <Tabs.Trigger value="voting">Voting feedbacks</Tabs.Trigger>
            <Tabs.Trigger value="board" disabled>Public board <small>(coming soon...)</small></Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="feedbacks">
            <FeedbackPanel feedbacks={$feedbacks.filter(f => f.status === FeedbackStatus.New)} />
        </Tabs.Content>
        <Tabs.Content value="voting">
            <VotingFeedbackPanel feedbacks={$feedbacks.filter(f => f.status === FeedbackStatus.Voting)} />
        </Tabs.Content>
        <Tabs.Content value="board">
            TODO
        </Tabs.Content>
    </Tabs.Root>
</div>