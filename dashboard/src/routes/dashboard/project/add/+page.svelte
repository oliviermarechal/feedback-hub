<script lang='ts'>
    import apiClient from '../../../../api';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
    import Icon from '@iconify/svelte';
    import {project} from '../../../../stores/project.store';

    let name: string;
    let domainNames = writable<string[]>([]);
    let domainName: string = '';
    let domainError = writable<string>('');

    const handleAddDomain = () => {
        try {
            const domain = new URL(domainName).host;
            domainNames.update(domains => {
                return [
                    ...domains,
                    domain,
                ]
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
        domainNames.update(domains => {
            return [
                ...domains.filter(d => d !== name),
            ]
        });
    }

    const handleCreateProject = async () => {
        const response = await apiClient.post('/project', {name, domainNames: $domainNames});
        if (response.status === 201) {
            await goto('/dashboard')
            return;
        }
        console.log('MANAGE ERROR');
    }
</script>

    <div class="h-full mx-auto flex justify-center items-center">
        <div class="space-y-10 flex flex-col items-center">
            <h2 class="h2 text-center">Nouveau projet</h2>
            <div class="card variant-glass p-4">
                <div class='px-6 py-5'>
                    <label class="label">
                        <span>Nom</span>
                        <input class="input" bind:value={name} type="text" />
                    </label>
                </div>
                <div class='px-6'>
                    <label class="label">
                        <span>Sites autorisés</span>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] input{$domainError.length > 0 ? '-error' : ''}">
                            <input bind:value={domainName} type="text" placeholder="https://domain.fr"  />
                            <button class="variant-filled-secondary" on:click={() => handleAddDomain()}><Icon icon="material-symbols:add" width="24" height="24" /></button>
                        </div>
                        <ol class="list">
                            {#each $domainNames as domain}
                                <li class='flex justify-between'>
                                    <span>{domain}</span>
                                    <button on:click={() => removeDomain(domain)}><Icon icon="mdi:trash" width="24" height="24" /></button>
                                </li>
                            {/each}
                        </ol>
                    </label>
                </div>
                <div class='px-6 pt-5 pb-5 text-center'>
                    <button on:click={() => handleCreateProject()} type="button" class="btn variant-ringed-secondary mr-5">Valider</button>
                    <button on:click={() => goto('/dashboard')} type="button" class="btn variant-ringed-warning">Retour</button>
                </div>
            </div>
        </div>
    </div>

