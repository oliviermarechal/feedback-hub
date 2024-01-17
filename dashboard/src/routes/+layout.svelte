<script lang="ts">
    import '../app.postcss';
    import {Toaster} from 'svelte-sonner';
    import {init, setUpFeedbackContainer} from 'insight-hunt';
    import 'insight-hunt/dist/bundle.css';
    import {onMount} from 'svelte';
    import { PUBLIC_PROJECT_ID } from  '$env/static/public';

    onMount(async () => {
       await init({projectApiKey: PUBLIC_PROJECT_ID});
        setUpFeedbackContainer();
    })
</script>

<slot />
<Toaster />