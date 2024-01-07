<script lang="ts">
	import '../../app.postcss';
    import { Button } from "$lib/components/ui/button";
    import { page } from '$app/stores';

</script>

<div
    class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
    {#if $page.url.pathname === '/auth/login'}
        <Button
            href="/auth/registration"
            variant="ghost"
            class="absolute right-4 top-4 md:right-8 md:top-8"
        >
            Register
        </Button>
    {:else}
        <Button
                href="/auth/login"
                variant="ghost"
                class="absolute right-4 top-4 md:right-8 md:top-8"
        >
            Login
        </Button>
    {/if}
    <div
            class="relative bg-black h-full flex-col p-10 text-white dark:border-r lg:flex"
    >
        <div
                class="absolute inset-0 bg-cover"
        />
        <div class="relative z-20 flex items-center text-lg font-medium">
            Insight hunt
        </div>
        <div class="relative z-20 mt-auto">
            <blockquote class="space-y-2">
                <p class="text-lg">
                    &ldquo;Hunting feedback and drive you product strategy !&rdquo;
                </p>
            </blockquote>
        </div>
    </div>
    <div class="lg:p-8">
        <slot />
    </div>
</div>