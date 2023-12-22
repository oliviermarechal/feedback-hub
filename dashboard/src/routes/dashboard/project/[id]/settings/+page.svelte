<script lang="ts">
    import {writable} from 'svelte/store';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import apiClient from '../../../../../api';
    import {project} from '../../../../../stores/project.store';
    import {page} from '$app/stores';
    import Icon from '@iconify/svelte';

    let domainName: string = '';
    let domainError = writable<string>('');

    const id: string = $page.params.id;

    onMount(async () => {
        if (!$project || !($project.id === id)) {
            const response = await apiClient.get(`/project/${id}`);

            project.set(response.data);
        }
    });

    const handleAddDomain = () => {
        try {
            const domain = new URL(domainName).host;
            if (domain.length === 0) {
                throw new Error('Invalid url');
            }
            project.update(project => {
                project.domainNames = [
                    ...project.domainNames,
                    domain
                ]

                return project;
            });

            domainName = '';
        } catch (e) {
            domainError.set('Invalid url');
            setTimeout(() => {
                domainError.set('');
            }, 1000)
        }
    }

    const removeDomain = (name: string) => {
        project.update(project => {
            project.domainNames = [
                ...project.domainNames.filter(d => d !== name),
            ]

            return project;
        });
    }

    const handleUpdateProject = async () => {
        const response = await apiClient.put(`/project/${$project.id}`, {
            name: $project.name,
            domainNames: $project.domainNames
        });

        if (response.status === 200) {
            await goto(`/dashboard/project/${$project.id}`);
            return;
        }

        throw new Error('Apologies for this error. Don\'t hesitate to create bug feedback');
        // Manage error
    }
</script>

{#if $project}
    <div class="h-full mx-auto flex justify-center items-center">
        <div class="space-y-10 flex flex-col items-center">
            <h2 class="h2 text-center">Update</h2>
            <div class="card variant-glass p-4">
                <div class='px-6 py-5'>
                    <label class="label">
                        <span>Nom</span>
                        <input class="input" bind:value={$project.name} type="text" />
                    </label>
                </div>
                <div class='px-6'>
                    <label class="label">
                        <span>Sites autorisés</span>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] input{$domainError.length > 0 ? '-error' : ''}">
                            <input bind:value={domainName} type="text" placeholder="https://domain.fr"  />
                            <button class="variant-filled-primary" on:click={() => handleAddDomain()}><Icon icon="material-symbols:add" width="24" height="24" /></button>
                        </div>
                        <ol class="list pt-2">
                            {#each $project.domainNames as domain}
                                <li class='flex justify-between'>
                                    <span>{domain}</span>
                                    <button on:click={() => removeDomain(domain)}><Icon icon="mdi:trash" width="24" height="24" /></button>
                                </li>
                            {/each}
                        </ol>
                    </label>
                </div>
                <div class='px-6 pt-5 pb-5 text-center'>
                    <button on:click={() => handleUpdateProject()} type="button" class="btn variant-ringed-primary mr-5">Valider</button>
                    <button on:click={() => goto(`/dashboard/project/{$project.id}`)} type="button" class="btn variant-ringed-warning">Retour</button>
                </div>
            </div>
        </div>
    </div>
{/if}