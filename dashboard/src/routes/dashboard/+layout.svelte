<script lang="ts">
    import {authUser} from '../../stores/user.store';
    import {goto} from '$app/navigation';
    import apiClient from '../../api';
    import {userLogged, disconnectUser} from 'insight-hunt';

    if (!$authUser) {
        if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            if (!token) {
                goto('/auth/login')
            } else {
                apiClient.get('/me').then(result => {
                    if (result.status === 200) {
                        authUser.set(result.data);
                        userLogged({id: result.data.id, email: result.data.email});
                    } else {
                        localStorage.removeItem('token');
                        disconnectUser();
                        goto('/auth/login');
                    }
                })
            }
        }
    }
</script>

<slot />