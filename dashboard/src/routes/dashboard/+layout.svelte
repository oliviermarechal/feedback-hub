<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { authUser } from '../../stores/user.store';
	import { goto } from '$app/navigation';
	import apiClient from '../../api';
	import xml from 'highlight.js/lib/languages/xml';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';


	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);

	storeHighlightJs.set(hljs);

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
				<a href='/dashboard'><strong class="text-xl uppercase">Feedback hub</strong></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
