<script lang='ts'>
    import apiClient from '../../../../api';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';

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
            setInterval(() => {
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
            <div class='px-8 py-5'>
                <label class="label">
                    <span>Nom</span>
                    <input class="input" bind:value={name} type="text" />
                </label>
            </div>
            <div class='px-10 py-5'>
                <label class="label">
                    <span>Nom de domaine</span>
                    <div class='flex items-stretch'>
                        <input class="input{$domainError.length > 0 ? '-error' : ''}" bind:value={domainName} type="text" />
                        <span><button on:click={() => handleAddDomain()} type='button' class="btn-icon variant-filled-secondary ml-2">+</button></span>
                    </div>
                    <ul class="list">
                        {#each $domainNames as domain}
                            <li class='flex justify-between'><span>{domain}</span><span on:click={() => removeDomain(domain)}>X</span></li>
                        {/each}
                    </ul>
                </label>
            </div>
            <div class='px-10 pb-5 text-center'>
                <button on:click={() => handleCreateProject()} type="button" class="btn variant-ringed-secondary mr-5">Valider</button>
                <button on:click={() => goto('/dashboard')} type="button" class="btn variant-ringed-warning">Retour</button>
            </div>
        </div>
    </div>
</div>

