<script lang='ts'>
	import { onMount } from 'svelte';
	import apiClient from '../../api';
	import { projects } from '../../stores/project.store';
	import ProjectRow from '../../component/project/row.svelte';
	import AddProject from '../../component/project/new-project.svelte';
	import Icon from '@iconify/svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Drawer from '$lib/components/ui/drawer';

	onMount(() => {
		if ($projects?.length === 0) {
			apiClient.get('/project').then(result => projects.set(result.data))
		}
	})

	let openNewProjectDrawer = false;
	const toggleDrawer = () => openNewProjectDrawer = !openNewProjectDrawer;
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
	<h2 class="text-3xl font-bold tracking-tight mt-2">Dashboard</h2>
	<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total feedbacks</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">109 274</div>
				<p class="text-xs text-muted-foreground">
					+180.1% from last month
				</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Feedbacks in upvote</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">24</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total votes</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">436</div>
				<p class="text-xs text-muted-foreground">
					+180.1% from last month
				</p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<Card.Root class="col-span-4">
			<Card.Header>
				<Card.Title class="flex flex-row justify-between">
					<h3>Projects</h3>
					<Drawer.Root bind:open={openNewProjectDrawer} onOutsideClick={toggleDrawer}>
						<Drawer.Trigger asChild>
							<button on:click={toggleDrawer}><Icon width="24" icon="zondicons:add-outline" /></button>
						</Drawer.Trigger>
						<Drawer.Content>
							<AddProject onClose={() => toggleDrawer()} />
						</Drawer.Content>
					</Drawer.Root>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if $projects.length === 0}
					<p class="mb-4">To get started, create your first project</p>
				{:else}
					<div class="space-y-4">
						{#each $projects as project}
							<ProjectRow project={project} />
						{/each}
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>