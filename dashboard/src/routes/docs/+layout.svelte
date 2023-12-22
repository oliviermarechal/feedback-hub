<script lang="ts">
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { authUser } from '../../stores/user.store';
    import apiClient from '../../api';
    import DocNavigation from './doc-navigation.svelte';
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

    initializeStores();

    const drawerStore = getDrawerStore();
    function drawerOpen(): void {
        drawerStore.open({});
    }

    if (!$authUser) {
        if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                apiClient.get('/me').then(result => {
                    if (result.status === 200) {
                        authUser.set(result.data);
                    } else {
                        localStorage.removeItem('token');
                    }
                })
            }
        }
    }
</script>

<Drawer>
    <h2 class="p-4">Navigation</h2>
    <hr />
    <DocNavigation />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-52">
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <div class="flex items-center">
                    <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
                    </button>
                    <strong class="text-xl uppercase">Insight hunt</strong> <span class="text-primary-500">&nbspdoc</span>
                </div>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <DocNavigation />
    </svelte:fragment>
    <slot />
</AppShell>
