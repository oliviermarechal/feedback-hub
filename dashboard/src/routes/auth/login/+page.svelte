<script lang='ts'>
    import { authUser } from '../../../stores/user.store';
    import { goto } from '$app/navigation';
    import apiClient from '../../../api';

    if ($authUser) {
        goto('/dashboard')
    }

    let email: string;
    let password: string;

    const handleLogin = async () => {
        const result = await apiClient.post('/login', {email, password});
        authUser.set(result.data.user);
        localStorage.setItem('token', result.data.token);
        await goto('/dashboard');
    }
</script>

<div class='card mx-auto w-3/4 md:w-2/4 top-36 relative'>
    <h1 class='text-2xl pt-5 text-center'>Login</h1>
    <div class='px-10 py-5'>
        <label class="label">
            <span>Email</span>
            <input class="input" bind:value={email} type="text" placeholder="Email" />
        </label>
    </div>
    <div class='px-10 pb-5'>
        <label class="label">
            <span>Password</span>
            <input class="input" bind:value={password} type="password" placeholder="Password" />
        </label>
    </div>
    <div class='px-10 pb-5'>
        <button on:click={() => handleLogin()} type="button" class="btn variant-filled">Submit</button>
        No account yet? click <a class="anchor" href="/auth/registration">ici</a>
    </div>
</div>