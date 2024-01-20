<script lang='ts'>
    import apiClient from '../../api';
    import { writable } from 'svelte/store';
    import Icon from '@iconify/svelte';
    import * as Drawer from '$lib/components/ui/drawer';
    import { Label } from '$lib/components/ui/label';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';
    import {projects} from '../../stores/project.store';
    import { toast } from 'svelte-sonner';

    let name: string;
    let domainNames = writable<string[]>([]);
    let domainName: string = '';
    let domainError = writable<string>('');

    export let onClose: () => any;

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
            toast.error('Invalid url');
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
        const result = await apiClient.post('/project', {name, domainNames: $domainNames});
        if (result.status === 201) {
            projects.update(projects => {
                return [
                    ...projects,
                    result.data,
                ]
            });
            onClose()
            return;
        }

        toast.error(result.data.message.map((m) => Object.keys(m.constraints).map((k) => m.constraints[k]).join(', ')).join(', '));
    }
</script>

<div class="mx-auto w-full max-w-sm">
    <Drawer.Header>
        <Drawer.Title>Add project</Drawer.Title>
    </Drawer.Header>
    <div class="grid gap-4">
        <div class="grid gap-2">
            <Label for="project-name-input">Name</Label>
            <Input class="input" id="project-name-input" bind:value={name} type="text" />
        </div>
        <div class="grid gap-2">
            <Label class="label">Allowed website</Label>
            <div class="flex w-full max-w-sm mb-2 items-center input{$domainError.length > 0 ? '-error' : ''}">
                <Input bind:value={domainName} type="text" placeholder="https://domain.fr"  />
                <Button variant="outline" on:click={() => handleAddDomain()}><Icon icon="material-symbols:add" width="24" height="24" /></Button>
            </div>
            <ol>
                {#each $domainNames as domain}
                    <li class="flex flex-row justify-between px-2">
                        <span>{domain}</span>
                        <button type="button" on:click={() => removeDomain(domain)}><Icon icon="mdi:trash" width="24" height="24" /></button>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="grid gap-1">
            <Button on:click={() => handleCreateProject()} type="button">Create</Button>
        </div>
        <div class="grid gap-1 mb-4">
            <Button on:click={() => onClose()} type="button" variant="outline">Cancel</Button>
        </div>
    </div>
</div>

