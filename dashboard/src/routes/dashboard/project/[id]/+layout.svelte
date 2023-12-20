<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { authUser } from '../../stores/user.store';
	import { goto } from '$app/navigation';
	import apiClient from '../../api';

	if (!$authUser) {
		if (typeof localStorage !== 'undefined') {
			const token = localStorage.getItem('token');
			if (!token) {
				goto('/auth/login')
			} else {
				apiClient.get('/me').then(result => {
					if (result.status === 200) {
						authUser.set(result.data);
					} else {
						localStorage.removeItem('token');
						goto('/auth/login');
					}
				})
			}
		}
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href='/dashboard'><strong class="text-xl uppercase">Insight hunt</strong></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
