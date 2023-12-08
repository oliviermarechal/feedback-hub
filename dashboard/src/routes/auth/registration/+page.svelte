<script lang='ts'>
    import { authUser } from '../../../stores/user.store';
    import { goto } from '$app/navigation';
    import apiClient from '../../../api';

    if ($authUser) {
        goto('/dashboard')
    }

    let email: string;
    let password: string;

    const handleRegistration = async () => {
        const result = await apiClient.post('/registration', {email, password});
        authUser.set(result.data.user);
        localStorage.setItem('token', result.data.token);
        await goto('/dashboard');
    }
</script>

<div class='card mx-auto w-3/4 md:w-2/4 top-36 relative'>
    <h1 class='text-2xl pt-5 text-center'>Registration</h1>
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
        <button on:click={() => handleRegistration()} type="button" class="btn variant-filled">Submit</button>
        Already have an account ? click <a class="anchor" href="/auth/login">here</a>
    </div>
</div>