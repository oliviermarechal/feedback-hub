<script lang='ts'>
    import { authUser } from '../../../stores/user.store';
    import { goto } from '$app/navigation';
    import apiClient from '../../../api';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import {toast} from 'svelte-sonner';

    if ($authUser) {
        goto('/dashboard')
    }

    let email: string;
    let password: string;

    const handleRegistration = async () => {
        const result = await apiClient.post('/registration', {email, password});
        if (result.status === 201) {
            authUser.set(result.data.user);
            localStorage.setItem('token', result.data.token);
            await goto('/onboarding');
        } else {
            if (Array.isArray(result.data.message)) {
                toast.error(result.data.message.map((m) => Object.keys(m.constraints).map((k) => m.constraints[k]).join(', ')).join(', '));
            } else {
                toast.error(result.data.message);
            }
        }
    }
</script>

<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">
            Create account
        </h1>
    </div>
    <div class={"grid gap-6"}>
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
                <Button type="button" on:click={handleRegistration}>Registration</Button>
            </div>
        </form>
    </div>
</div>