<script lang="ts">
	import {AppShell, AppBar} from '@skeletonlabs/skeleton';
	import {page} from '$app/stores';
	import Icon from '@iconify/svelte';

	const id = $page.params.id;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href='/dashboard'><strong class="text-xl uppercase">Insight hunt</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $page.url.pathname !== `/dashboard/project/${id}/settings`}
					<a class="btn btn-sm" href="/dashboard/project/{id}/settings"><Icon icon="clarity:settings-solid" style="font-size: 24px;" /></a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
