<script lang="ts">
    import { onMount } from 'svelte';
    import apiClient from '../../../../../api';
    import { project } from '../../../../../stores/project.store';
    import { page } from '$app/stores';
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import { getCodeBlockConfigurationContent } from './code-block-content';

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
            <h3 class='h5'>Snippet HTML</h3>
            <p>copy this part of code and paste it where you want to display the form</p>
            <CodeBlock language="html" code={getCodeBlockConfigurationContent($project.apiKey)}></CodeBlock>
        </span>
    {/if}
</section>