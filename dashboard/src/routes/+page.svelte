<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import Icon from '@iconify/svelte';
    import {Label} from '$lib/components/ui/label';
    import {Textarea} from '$lib/components/ui/textarea';
    import {Input} from '$lib/components/ui/input';
    import { toast } from 'svelte-sonner';
    import apiClient from '../api';
    import {authUser} from '../stores/user.store';

    const featureCards: {
        icon: string;
        text: string;
        subtext: string;
    }[] = [
        {
            text: 'Multi project',
            subtext: 'Manage feedbacks for multiple projects',
            icon: 'material-symbols:list',
        },
        {
            text: 'Collect feedback easily',
            subtext: 'Installation ready to use in your website',
            icon: 'solar:user-speak-bold'
        },
        {
            text: 'Upvote',
            subtext: 'Select the most important feedbacks',
            icon: 'bx:upvote',
        },
    ]

    const advantages = [
        {
            icon: 'icon-park-outline:archery',
            text: 'Strategy management',
            subText: 'Manage your product(s) strategy with our tools',
        },
        {
            icon: 'mingcute:time-line',
            text: 'Win time',
            subText: 'With duplicate suggestion and auto classification',
        },
        {
            icon: 'formkit:group',
            text: 'Many projects, one platform',
            subText: 'Manage all your projects in one place',
        },
    ]
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
        <div>
            <h1 class="text-4xl font-bold tracking-tight">Insight hunt</h1>
            <p class="text-muted-foreground">Hunt your insight in user feedback !</p>
        </div>
        <div class="flex items-center justify-around space-x-2">
            <Button variant="outline" href="documentation">
                Documentation
            </Button>
            {#if $authUser}
                <Button href="dashboard">
                    Dashboard
                </Button>
            {:else}
                <Button href="auth/login">
                    Sign in
                </Button>
            {/if}
        </div>
    </div>
</div>
<section class="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
    <div class="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div class="space-y-4">
            <h2 class="text-3xl font-bold tracking-tight">
                Build your product strategy with user feedbacks
            </h2>
            <h4 class="text-xl font-light text-muted-foreground">
                For IndieMaker and startup
            </h4>
        </div>
        <Button href="auth/registration" class='w-[10rem]'>
            Get started
        </Button>
    </div>
    <div class="flex flex-1 justify-center lg:justify-end">
        <img
            src='image/lp-header.jpg'
            width={500}
            height={500}
            alt="Header"
        />
    </div>
</section>

<section class="bg-slate-50 dark:bg-slate-900">
    <div class="container space-y-8 py-12 text-center lg:py-20">
        <div class='space-y-2'>
            <h1 class="text-3xl font-bold text-primary lg:text-4xl">
                Features
            </h1>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            {#each featureCards as cards}
                <Card.Root
                    class="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
                >
                    <div class="flex">
                        <Icon icon={cards.icon} class="h-[6rem] w-[6rem]" />
                    </div>
                    <div class="space-y-2">
                        <Card.Title>{cards.text}</Card.Title>
                        <Card.Content>{cards.subtext}</Card.Content>
                    </div>
                </Card.Root>
            {/each}
        </div>
    </div>
</section>
<section class="container space-y-8 py-12 lg:py-20" id="features">
    <div class='space-y-2'>
        <h1 class="text-3xl font-bold text-primary lg:text-4xl text-center">
            Why Insight hunt ?
        </h1>
    </div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="grid grid-cols-1 gap-8">
            {#each advantages as advantage}
                <div
                    class="flex flex-col items-center gap-2 text-center md:flex-row md:gap-8 md:text-left"
                >
                    <div class="flex">
                        <Icon icon={advantage.icon} class="h-[6rem] w-[6rem]" />
                    </div>
                    <div class="flex-1">
                        <p class="md:text4xl text-2xl font-semibold">
                            {advantage.text}
                        </p>
                        <p class="font-light text-muted-foreground md:text-lg">
                            {advantage.subText}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>