<script lang="ts">
    import {authUser} from "../stores/user.store.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import ToggleMode from "../component/common/toggle-mode.svelte";
    import Icon from '@iconify/svelte';
</script>

<header class="container z-40 bg-background">
    <div class="flex h-20 items-center justify-between py-6">
        <div class="flex gap-6 md:gap-10">
            <a href="/" class="items-center space-x-2 md:flex">
                <img src="image/logo.png" width="64" alt="logo" />
                <span class="font-bold sm:inline-block">Insight hunt</span>
                <Icon icon="clarity:beta-solid" width="46" height="46" />
            </a>
            <nav class="gap-6 md:flex">
                <a href="documentation" class="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60">
                    Documentation
                </a>
                <a href="pricing" class="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60">
                    Pricing
                </a>
            </nav>
        </div>
        <div class="flex items-center justify-around space-x-2">
            <ToggleMode />
            {#if $authUser}
                <Button variant="secondary" href="dashboard">
                    Dashboard
                </Button>
            {:else}
                <Button variant="secondary" href="auth/registration">
                    Sign up
                </Button>
                <Button href="auth/login">
                    Sign in
                </Button>
            {/if}
        </div>
    </div>
</header>