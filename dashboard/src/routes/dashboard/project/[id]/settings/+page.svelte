<script lang="ts">
    import {writable} from 'svelte/store';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import apiClient from '../../../../../api';
    import ConfirmationDialog from '../../../../../component/common/confirm-dialog.svelte';
    import {project} from '../../../../../stores/project.store';
    import {page} from '$app/stores';
    import Icon from '@iconify/svelte';
    import {Button} from '$lib/components/ui/button';
    import {Label} from '$lib/components/ui/label';
    import {Input} from '$lib/components/ui/input';
    import * as Card from '$lib/components/ui/card';
    import {toast} from 'svelte-sonner';

    let domainName: string = '';
    let domainError = writable<string>('');
    let openDropProjectConfirmationDialog = false;

    const toggleDropProjectConfirmationDialog = () => {
        console.log('passe');
        openDropProjectConfirmationDialog = !openDropProjectConfirmationDialog;
    }

    const id: string = $page.params.id;

    onMount(async () => {
        if (!$project || !($project.id === id)) {
            const response = await apiClient.get(`/project/${id}`);

            project.set(response.data);
        }
    });

    const handleAddDomain = () => {
        try {
            if (domainName.startsWith('http://')) {
                domainName = domainName.replace('http://', '');
            }

            if (domainName.startsWith('https://')) {
                domainName = domainName.replace('https://', '');
            }

            if (domainName.startsWith('www.')) {
                domainName = domainName.replace('www.', '');
            }

            const domain = new URL(`https://${domainName}`).host;
            if ($project?.domainNames.includes(domain)) {
                toast.error('Domain already added');
                domainName = '';
                return;
            }

            project?.update(project => {
                if (!project) {
                    return;
                }

                project.domainNames = [
                    ...project.domainNames,
                    domain,
                ];
                return project;
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
        project.update(project => {
            if (project) {
                project.domainNames = [
                    ...project.domainNames.filter(d => d !== name),
                ]

                return project;
            }
        });
    }

    const handleDeleteProject = async () => {
        const response = await apiClient.delete(`/project/${$project?.id}`);

        if (response.status === 204) {
            return goto('/dashboard');
        }
    }

    const handleUpdateProject = async () => {
        const response = await apiClient.put(`/project/${$project?.id}`, {
            name: $project?.name,
            domainNames: $project?.domainNames
        });

        if (response.status === 200) {
            await goto(`/dashboard/project/${$project?.id}`);
            return;
        }

        throw new Error('Apologies for this error. Don\'t hesitate to create bug feedback');
        // Manage error
    }
</script>

<div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex flex-row justify-between">
        <div class="flex flex-row justify-items-start">
            <a class="text-xl mt-2" href="/dashboard">Dashboard</a>
            <span class="text-xl mt-2">&nbsp;/&nbsp;</span>
            <a class="text-xl mt-2" href="/dashboard/project/{id}">{$project?.name}</a>
            <span class="text-xl mt-2">&nbsp;/&nbsp;</span>
            <h2 class="text-2xl mt-2 font-bold">Settings</h2>
        </div>
    </div>
</div>
{#if $project}
    <div class="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div class="grid items-start gap-6 lg:col-span-1">
            <div class="flex items-center justify-center [&>div]:w-full">
                <Card.Root>
                    <Card.Header class="space-y-1">
                        <Card.Title class="text-2xl">Update project</Card.Title>
                    </Card.Header>
                    <Card.Content class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="project-name-input">Name</Label>
                            <Input class="input" id="project-name-input" bind:value={$project.name} type="text" />
                        </div>
                        <div class="grid gap-2">
                            <Label class="label">Allowed website</Label>
                            <div class="flex w-full max-w-sm mb-2 items-center input{$domainError.length > 0 ? '-error' : ''}">
                                <Input bind:value={domainName} type="text" placeholder="https://domain.fr"  />
                                <Button variant="outline" on:click={() => handleAddDomain()}><Icon icon="material-symbols:add" width="24" height="24" /></Button>
                            </div>
                            <ol>
                                {#each $project.domainNames as domain}
                                    <li class="flex flex-row justify-between px-2">
                                        <span>{domain}</span>
                                        <button type="button" on:click={() => removeDomain(domain)}><Icon icon="mdi:trash" width="24" height="24" /></button>
                                    </li>
                                {/each}
                            </ol>
                        </div>
                    </Card.Content>
                    <Card.Footer>
                        <Button on:click={() => handleUpdateProject()} type="button">Update</Button>
                        <Button class="ml-4" variant="destructive" on:click={() => toggleDropProjectConfirmationDialog()} type="button">Delete project</Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </div>
    </div>
{/if}
<ConfirmationDialog
    open={openDropProjectConfirmationDialog}
    description="Do you want to permanently delete this project and all associated feedback ?"
    onClose={toggleDropProjectConfirmationDialog}
    onValid={handleDeleteProject}
/>

