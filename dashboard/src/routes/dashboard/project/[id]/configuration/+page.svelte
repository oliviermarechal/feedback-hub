<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../../api';
    import { project } from '../../../../../stores/project.store';
    import { page } from '$app/stores';
    import { CodeBlock, Table, tableMapperValues } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { feedbacks } from '../../../../../stores/feedback.store';
    import { get } from 'svelte/store';
    import { humanizeType } from '../../../../../stores/interfaces/feedback';

    const id = $page.params.id;

    onMount(async () => {
        if (!$project || $project.id !== id) {
            const projectResponse = await apiClient.get(`/project/${id}`);

            project.set(projectResponse.data);
        }
    })
</script>

<section class="container mx-auto">
    <h1 class='h2 mt-10 text-center'>Project {$project?.name}</h1>
    {#if $project}
        <h2 class='h3'>Installation</h2>
        <span class="p-4">
            <h3 class='h5'>Iframe</h3>
            <p>copy this part of code and paste it where you want to display the form</p>
            <CodeBlock language="html" code={`<iframe frameBorder="0" height="100%" width="100%" src='http://localhost:5174/${$project.publicId}/feedback'></iframe>`}></CodeBlock>
        </span>
    {/if}
    <div class='iframe-exemple'>
        <iframe frameBorder="0" height="100%" width='100%' src='http://localhost:5174/XXX/feedback?disabled=true'></iframe>
    </div>
</section>

<style>
    .iframe-exemple {
        height: 300px;
        width: 600px;
    }
</style>