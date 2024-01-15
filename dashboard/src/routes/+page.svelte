<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import Icon from '@iconify/svelte';
    import {Label} from '$lib/components/ui/label';
    import {Textarea} from '$lib/components/ui/textarea';
    import {Input} from '$lib/components/ui/input';
    import { toast } from 'svelte-sonner';
    import apiClient from '../api';

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

    const scrollIntoView = ({ target, preventDefault }: { target: any, preventDefault: () => any}) => {
        preventDefault();
        const el = document.querySelector(target.getAttribute('href'));
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth'
        });
    }

    let email: string = '';
    let content: string = '';

    const handleEarlyAccess = async () => {
        if (!email || !content) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const res = await apiClient.post('/early-access',
                {
                    email,
                    content,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.status === 201) {
                toast.success('Your request has been sent');
                email = '';
                content = '';
            } else {
                toast.error('An error occurred!');
            }
        } catch (e) {
            toast.error('An error occurred!');
            return;
        }
    }
</script>

<section class="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
    <div class="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div class="space-y-4">
            <h1 class="text-4xl font-bold lg:text-6xl">
                Insight hunt
            </h1>
            <h2 class="text-lg font-light text-muted-foreground lg:text-3xl">
                Hunt your insight in user feedback
            </h2>
        </div>
        <Button href="#early-access" on:click={scrollIntoView} class='w-[10rem]'>
            Early access
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
<section class="bg-slate-50 dark:bg-slate-900">
    <div class="container space-y-8 py-12 lg:py-20 flex flex-col items-center">
        <div class='space-y-2'>
            <h1 class="text-3xl font-bold text-primary lg:text-4xl text-center" id="early-access">
                Early access
            </h1>
            <p>The current version is private beta for testing</p>
        </div>
        <Card.Root class="w-1/2">
            <Card.Header class="text-center">Ask your early access</Card.Header>
            <Card.Content class="space-y-4">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <Label for="email">Email</Label>
                    <Input bind:value={email} id="email" placeholder="email" type="email" />
                </div>
                <div class="w-full px-3 mb-6 md:mb-0">
                    <Label for="content">Why do you want access ?</Label>
                    <Textarea id="content" bind:value={content} placeholder="Talk about your product" />
                </div>
                <div class="flex flex-row justify-end">
                    <Button on:click={handleEarlyAccess}>Validate</Button>
                </div>
            </Card.Content>
        </Card.Root>
    </div>
</section>