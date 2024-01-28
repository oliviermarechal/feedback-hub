<script lang="ts">
    import NewProject from '../../component/project/new-project.svelte';
    import Modal from '../../component/common/modal.svelte';
    import Installation from '../documentation/components/installation.svelte';
    import Implementation from '../documentation/components/implementation.svelte';
    import { Button } from '$lib/components/ui/button';
    import atomOneDark from 'svelte-highlight/styles/atom-one-dark';
    import * as Card from '$lib/components/ui/card';
    import { goto } from '$app/navigation';

    let step = 0;

    const next = () => {
        step++;
    }

    const previous = () => {
        step--;
    }

    const goToDashboard = () => {
        goto('/dashboard');
    }

    let open = true;
</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<style>
    .w-45rem {
        width: 45rem;
    }
</style>

<div class="container relative h-[800px] flex-col items-center justify-center lg:max-w-none">
</div>
<Modal
    open={open}
    customClass="max-w-3xl"
    close={goToDashboard}
    closeOnEscape={false}
    closeOnOutsideClick={false}
>
    <div slot="header">
    </div>
    <div slot="body" class="w-45rem">
        {#if step === 0}
            <div>
                <p class="text-xl">Welcome to our platform!</p>
                <p>Let's start by creating your first project.</p>
                <br />
                <p>Set his name and the url(s) of allowed website to create and display feedback of this project.</p>
            </div>
            <div class="w-1/2 mt-4">
                <NewProject onClose={() => next()} cancellable={false} />
            </div>
        {/if}
        {#if step === 1}
            <div class="space-y-3">
                <p>Now that you have created your first project, you can install Insight Hunt.</p>
                <Installation />
            </div>
        {/if}
        {#if step === 2}
            <div class="space-y-3">
                <p>Then, you can import it in your project and use it like this:</p>
                <Implementation />

                <p class="mt-6">Don't worry, you can find all these instructions, and more configuration, in our documentation.</p>
            </div>
        {/if}
        {#if step === 3}
            <div class="">
                <p class="text-xl mb-4">That's it!</p>
                <p>You can discover the dashboard for this project and create other projects for manage feedback for many project in same account.</p>
            </div>
        {/if}
    </div>
    <div slot="footer" class="flex flex-row justify-end space-x-2 w-45rem">
        {#if step === 3}
            <Button variant="secondary" on:click={previous}>Previous</Button>
            <Button on:click={goToDashboard}>Dashboard</Button>
        {:else}
            {#if step > 0}
                <Button variant="secondary" on:click={previous}>Previous</Button>
            {/if}
            <Button variant="outline" on:click={() => step++}>Next</Button>
            <Button href="/dashboard">Skip</Button>
        {/if}
    </div>
</Modal>
