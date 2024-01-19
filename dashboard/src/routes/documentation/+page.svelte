<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import * as Select from "$lib/components/ui/select";
    import atomOneDark from "svelte-highlight/styles/atom-one-dark";
    import { cubicInOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { Button } from "$lib/components/ui/button";
    import {cn} from '$lib/utils';
    import {Separator} from '$lib/components/ui/separator';
    import Installation from './components/installation.svelte';
    import Implementation from './components/implementation.svelte';
    import UserManagement from './components/user-management.svelte';
    import {authUser} from '../../stores/user.store';
    import apiClient from '../../api';
    import {project, projects} from '../../stores/project.store';
    import type {Selected} from 'bits-ui';

    const [send, receive] = crossfade({
        duration: 250,
        easing: cubicInOut
    });
    let navActive = 'install';
    $: setActiveNav = (navName: string) => {
        navActive = navName;
    }

    $: if ($authUser) {
        apiClient.get('/project').then(result => projects.set(result.data));
    }

    const handleSelectChange = (data: Selected<string> | undefined) => {
        const selectedProject = $projects.find(project => project.id === data?.value);
        if (selectedProject) {
            project.set(selectedProject);
        }
    }
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<header class="container z-40 bg-background">
    <div class="flex h-20 items-center justify-between py-6">
        <div class="flex gap-6 md:gap-10">
            <a href="/" class="items-center space-x-2 md:flex">
                <span class="font-bold sm:inline-block">Insight hunt &nbsp;doc</span>
            </a>
        </div>
        <div class="flex items-center justify-around space-x-2">
            {#if $authUser && $projects.length > 0}
                <Select.Root onSelectedChange={handleSelectChange}>
                    <Select.Trigger class="w-[180px]">
                        <Select.Value placeholder="Project" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each $projects as project}
                            <Select.Item value={project.id}>{project.name}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
                <Button href="dashboard">
                    Dashboard
                </Button>
            {:else}
                <Button variant="secondary" href="auth/login">
                    Sign in
                </Button>
            {/if}
        </div>
    </div>
</header>
<Separator class="" />
<div class="space-y-6 p-10 pb-16 md:block">
    <div class="flex space-y-8 flex-row lg:space-x-12 lg:space-y-0">
        <aside class="mx-2 lg:w-1/5">
            <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                <Button
                    variant="ghost"
                    on:click={() => setActiveNav('install')}
                    class={cn(
                    navActive !== 'install' && "hover:underline",
                    "relative justify-start hover:bg-transparent"
                    )}
                    data-sveltekit-noscroll
                >
                    {#if navActive === 'install'}
                        <div
                            class="absolute inset-0 rounded-md bg-muted"
                            in:send={{ key: "active-sidebar-tab" }}
                            out:receive={{ key: "active-sidebar-tab" }}
                        />
                    {/if}
                    <div class="relative">
                        Installation
                    </div>
                </Button>
                <Button
                    variant="ghost"
                    on:click={() => setActiveNav('implementation')}
                    class={cn(
                    navActive !== 'implementation' && "hover:underline",
                    "relative justify-start hover:bg-transparent"
                    )}
                    data-sveltekit-noscroll
                >
                    {#if navActive === 'implementation'}
                        <div
                            class="absolute inset-0 rounded-md bg-muted"
                            in:send={{ key: "active-sidebar-tab" }}
                            out:receive={{ key: "active-sidebar-tab" }}
                        />
                    {/if}
                    <div class="relative">
                        Implementation
                    </div>
                </Button>
                <Button
                    variant="ghost"
                    on:click={() => setActiveNav('userManagement')}
                    class={cn(
                    navActive !== 'userManagement' && "hover:underline",
                    "relative justify-start hover:bg-transparent"
                    )}
                    data-sveltekit-noscroll
                >
                    {#if navActive === 'userManagement'}
                        <div
                            class="absolute inset-0 rounded-md bg-muted"
                            in:send={{ key: "active-sidebar-tab" }}
                            out:receive={{ key: "active-sidebar-tab" }}
                        />
                    {/if}
                    <div class="relative">
                        User management
                    </div>
                </Button>
            </nav>
        </aside>
        <div class="flex-1 w-4/5">
            {#if navActive === 'install'}
                <Installation />
            {/if}
            {#if navActive === 'implementation'}
                <Implementation />
            {/if}
            {#if navActive === 'userManagement'}
                <UserManagement />
            {/if}
        </div>
    </div>
</div>