<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../api';
    import * as Tabs from "$lib/components/ui/tabs";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import FeedbackPanel from '../../../../component/feedback/feedback-panel.svelte'
    import VotingFeedbackPanel from '../../../../component/feedback/voting-feedback-panel.svelte'
    import { page } from '$app/stores';
    import {project, projects} from '../../../../stores/project.store';
    import { Button } from '$lib/components/ui/button';
    import Icon from '@iconify/svelte';
    import ToggleMode from '../../../../component/common/toggle-mode.svelte';
    import {goto} from '$app/navigation';
    import {authUser} from '../../../../stores/user.store';

    const id = $page.params.id;

    onMount(async () => {
        if ($project && $project.id === id) {
            return;
        }

        const response = await apiClient.get(`/project/${id}`);

        project.set(response.data);
    });

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }

        authUser.set(null);
        project.set(undefined);
        projects.set([])
        goto('/auth/login');
    }
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex flex-row justify-between">
        <div class="flex flex-row justify-items-start">
            <a class="text-xl m-2" href="/dashboard">Dashboard</a>
            <span class="text-xl m-2"> / </span>
            <h2 class="text-2xl font-bold mt-2">{$project?.name}</h2>
        </div>
        <div class="flex flex-row space-x-2">
            <ToggleMode />
            <Button variant="secondary" href="/documentation">
                Documentation
            </Button>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="ghost">
                        <Icon icon="iconamoon:settings-fill" width="24" height="24" />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        <DropdownMenu.Label><a href="/dashboard/project/{id}/settings">Settings</a></DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item on:click={handleLogout}>Logout</DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </div>
    <Tabs.Root value="feedbacks" class="h-full space-y-6">
        <Tabs.List>
            <Tabs.Trigger value="feedbacks">Feedbacks</Tabs.Trigger>
            <Tabs.Trigger value="voting">Voting feedbacks</Tabs.Trigger>
            <Tabs.Trigger value="board" disabled>Public board <small>(coming soon...)</small></Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="feedbacks">
            <FeedbackPanel />
        </Tabs.Content>
        <Tabs.Content value="voting">
            <VotingFeedbackPanel />
        </Tabs.Content>
        <Tabs.Content value="board">
            TODO
        </Tabs.Content>
    </Tabs.Root>
</div>