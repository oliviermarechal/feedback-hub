<script lang='ts'>
    import { authUser } from '../../../stores/user.store';
    import { goto } from '$app/navigation';
    import apiClient from '../../../api';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { AlertCircle } from "lucide-svelte";
    import * as Alert from "$lib/components/ui/alert";

    if ($authUser) {
        goto('/dashboard')
    }

    let email: string;
    let password: string;
    let badCredError = false;

    const handleBadCredError = () => {
        badCredError = true;
        setTimeout(() => {
            badCredError = false;
        }, 3000);
    }

    const handleLogin = async () => {
        const result = await apiClient.post('/login', {email, password});
        if (result.status === 200) {
            authUser.set(result.data.user);
            localStorage.setItem('token', result.data.token);
            await goto('/dashboard');
        } else {
            handleBadCredError();
            password = '';
        }
    }
</script>

<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">
            Login
        </h1>
    </div>
    <div class="grid gap-6">
        <form>
            <div class="grid gap-2">
                <div class="grid gap-1">
                    <Label class="sr-only" for="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="email"
                        type="email"
                        autocapitalize="none"
                        autocomplete="email"
                        autocorrect="off"
                        bind:value={email}
                    />
                </div>
                <div class="grid gap-1">
                    <Label class="sr-only" for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="password"
                        autocorrect="off"
                        bind:value={password}
                    />
                </div>
                {#if badCredError}
                    <Alert.Root variant="destructive">
                        <AlertCircle class="h-4 w-4" />
                        <Alert.Title>Error</Alert.Title>
                        <Alert.Description>Bad credential</Alert.Description>
                    </Alert.Root>
                {/if}
                <Button type="button" on:click={handleLogin}>Login</Button>
            </div>
        </form>
    </div>
</div>