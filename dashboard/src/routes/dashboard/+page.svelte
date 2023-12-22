<script lang='ts'>
	import { onMount } from 'svelte';
	import apiClient from '../../api';
	import { projects } from '../../stores/project.store';
	import ProjectRow from '../../component/project/row.svelte';

	onMount(() => {
		apiClient.get('/project').then(result => projects.set(result.data))
	})
</script>

{#if $projects.length === 0}
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center">
			<h2 class="h2">Welcome</h2>
			<span>To get started, create your first project</span>
			<a href='/dashboard/project/add' class="variant-ringed-primary">ici</a>
		</div>
	</div>
{/if}

<div class="container h-full mx-auto">
	<a href='/dashboard/project/add' class="btn variant-ringed-primary mt-5">New project</a>
	<h2 class="h4 mt-5 text-center">My projects</h2>
	<nav class="list-nav bg-primary-50 p-5 mt-5">
		<ul>
			{#each $projects as project}
				<ProjectRow project={project} />
			{/each}
		</ul>
	</nav>
</div>