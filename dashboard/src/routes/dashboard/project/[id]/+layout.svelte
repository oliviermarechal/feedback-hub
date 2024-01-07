<script lang="ts">
	import {page} from '$app/stores';
	import Icon from '@iconify/svelte';

	const id = $page.params.id;
</script>

<div>
		<div>
			<a href='/dashboard'><strong class="text-xl uppercase">Insight hunt</strong></a>
			{#if $page.url.pathname !== `/dashboard/project/${id}/settings`}
				<a class="btn btn-sm" href="/dashboard/project/{id}/settings"><Icon icon="clarity:settings-solid" style="font-size: 24px;" /></a>
			{/if}
		</div>
	<slot />
</div>
