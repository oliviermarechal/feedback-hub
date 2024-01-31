<script lang="ts">
    import Header from './header.svelte';
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import Icon from '@iconify/svelte';

    const featureCards: {
        icon: string;
        text: string;
        subtext: string;
    }[] = [
        {
            text: 'Multi project',
            subtext: 'Manage feedbacks for multiple projects',
            icon: 'heroicons:arrows-pointing-in-16-solid',
        },
        {
            text: 'Collect feedback easily',
            subtext: 'Installation ready to use in your website',
            icon: 'heroicons:chat-bubble-oval-left-ellipsis-solid'
        },
        {
            text: 'Upvote',
            subtext: 'Select the most important feedbacks',
            icon: 'heroicons:chevron-double-up',
        },
    ]
</script>

<Header />
<section class="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20 max-w-screen-md">
    <div class="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8 mb-8">
        <div class="flex flex-col space-y-4">
            <h2 class="text-5xl font-bold tracking-tight">
                Convert user insights into actionable features.
            </h2>
            <span class="text-xl font-light text-muted-foreground">
                Efficiently collect and analyze feedback, while leveraging in-app upvoting to ensure you're delivering the features your users truly desire.
            </span>
        </div>
        <Button href="auth/registration" class='w-[10rem]'>
            Signup for free
        </Button>
    </div>
    <div class="flex flex-1 justify-center lg:justify-end">
        <img
            class="border-secondary border-2 rounded-xl shadow-xl"
            src='image/dashboard.png'
            width={900}
            alt="Header"
        />
    </div>
</section>

<section class="flex flex-col items-center bg-slate-50 dark:bg-slate-900">
    <div class="py-12 flex flex-row px-20 space-x-12">
        <img
            class="rounded-xl"
            src='image/implement.png'
            width={500}
            alt="Install"
        />
        <div class="flex flex-col justify-start mt-16">
            <span class="text-3xl font-bold text-primary">
                Quick and easy installation
            </span>
            <ul class="list-disc ml-4 mt-4 space-y-1">
                <li>Use default embed in one line</li>
                <li>display the feedback form or upvote anywhere you want</li>
                <li>Associate your own user to feedback and vote</li>
            </ul>
        </div>
    </div>
</section>

<section class="flex flex-col items-center space-y-8 py-12 lg:py-20" id="features">
    <div class="flex flex-row px-20 space-x-12">
        <div class="flex flex-col justify-start mt-16">
            <span class="text-3xl font-bold text-primary">
                Simple form for your users
            </span>
            <ul class="list-disc ml-4 mt-4 space-y-1">
                <li>Give your users a voice</li>
                <li>Collect ideas and bugs found by your users</li>
            </ul>
        </div>

        <img
            class="rounded-xl"
            src='image/feedback-form.png'
            width={500}
            alt="feedback form image"
        />
    </div>
</section>

<section class="flex flex-col items-center bg-slate-50 dark:bg-slate-900">
    <div class="py-12 flex flex-row px-20 space-x-12">
        <img
                class="rounded-xl"
                src='image/upvote.png'
                width={500}
                alt="Install"
        />
        <div class="flex flex-col justify-start mt-16">
            <span class="text-3xl font-bold text-primary">
                Upvote
            </span>
            <ul class="list-disc ml-4 mt-4 space-y-1">
                <li>Let your users vote for these favorite features</li>
                <li>Build your roadmap with this feedback and vote</li>
                <li>iterate endlessly with your users</li>
            </ul>
        </div>
    </div>
</section>

<section class="container space-y-8 py-12 text-center lg:py-20">
    <div class='space-y-2'>
        <h1 class="text-3xl font-bold text-primary lg:text-4xl">
            Features
        </h1>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        {#each featureCards as cards}
            <Card.Root
                class="flex flex-grow flex-col items-center justify-between gap-4 p-8 bg-slate-50 dark:bg-slate-900"
            >
                <div class="flex">
                    <Icon icon={cards.icon} class="h-[2rem] w-[2rem]" color="#5e61e4" />
                </div>
                <div class="space-y-2">
                    <Card.Title>{cards.text}</Card.Title>
                    <Card.Content>{cards.subtext}</Card.Content>
                </div>
            </Card.Root>
        {/each}
    </div>
</section>

<section class="bg-slate-50 dark:bg-slate-900">
    <div class="py-12 flex flex-row justify-around px-20 w-full align-middle">
        <div class="text-xl w-1/2">
            You'll have unlimited time to explore Insight Hunt. It's free to use for as long as you want.
        </div>
        <Button href="auth/registration" class='w-[10rem]'>
            Signup for free
        </Button>
    </div>
</section>