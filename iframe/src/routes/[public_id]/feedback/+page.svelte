<!-- Iframe -->
<script lang='ts'>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { apiClient } from '../../../api';
    import { project } from '../../../store';
    import { checkDomain } from '../../../utils/check-domain';

    const isDisabled = Boolean($page.url.searchParams.get('disabled'));

    const projectPublicId = $page.params.public_id;
    let errorMessage: string;

    let content: string;
    let type: string;
    let email: string;

    onMount(async () => {
        if (!isDisabled) {
            const response = await apiClient.get('/external/project', { headers: { Authorization: `Bearer ${projectPublicId}` } });
            if (!checkDomain(response.data.domainNames)) {
                errorMessage = 'Forbidden access';
            } else {
                project.set(response.data);
            }
        }
    })

    const handle = () => {
        if (isDisabled) {
            return;
        }

        const locale = Intl.DateTimeFormat().resolvedOptions().locale;

        apiClient.post(
            '/external/feedback',
            {
                projectId: $project.id,
                content,
                type,
                language: locale,
                email,
            },
            { headers: { Authorization: `Bearer ${projectPublicId}` } }
        );
    }
</script>

{#if $project || isDisabled}
    <div class='background p-5'>
        <form novalidate="novalidate">
            <div class='grid grid-cols-2 gap-4'>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input bind:value={email} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
                </div>
                <div class="mb-6">
                    <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feedback type</label>
                    <select bind:value={type} id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="enhance" selected>Enhance</option>
                        <option value="bug">Bug</option>
                    </select>
                </div>
            </div>
            <div class="mb-6">
                <label for="chat" class="sr-only">Your message</label>
                <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <textarea bind:value={content} id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                    <button on:click={() => handle()} type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                        </svg>
                        <span class="sr-only">Send message</span>
                    </button>
                </div>
            </div>
        </form>
        <small class='text-white'>Powered by <a href='#'><b>feedback hub</b></a></small>
    </div>
{/if}
{#if errorMessage}
    {errorMessage}
{/if}

<style>
    .background {
        background-color: #313944;
    }
</style>