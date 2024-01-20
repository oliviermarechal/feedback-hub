<script lang="ts">
    import '../app.postcss';
    import {Toaster} from 'svelte-sonner';
    import {disconnectUser, init, setUpFeedbackContainer, userLogged} from 'insight-hunt';
    import 'insight-hunt/dist/bundle.css';
    import {onMount} from 'svelte';
    import { PUBLIC_PROJECT_ID } from  '$env/static/public';
    import {authUser} from '../stores/user.store';
    import apiClient from '../api';

    onMount(async () => {
        await init({ projectApiKey: PUBLIC_PROJECT_ID });
        setUpFeedbackContainer();
    })

    if (!$authUser) {
        if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                apiClient.get('/me').then(result => {
                    if (result.status === 200) {
                        authUser.set(result.data);
                        userLogged({id: result.data.id, email: result.data.email});
                    } else {
                        disconnectUser();
                    }
                })
            }
        }
    }
</script>

<slot />
<Toaster />