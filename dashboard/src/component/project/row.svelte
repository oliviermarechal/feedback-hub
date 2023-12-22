<script lang="ts">
    let visible: boolean = false;
    export let project: {id: string, name: string};

    const handleDeleteProject = () => {
        visible = false;
    }
</script>

<li>
    <div class='flex flex-row justify-between'>
        <a href="/dashboard/project/{project.id}" class="w-full mr-5">
            <span class="badge bg-primary-500">(icon)</span>
            <span class="flex-auto">{project.name}</span>
        </a>
        <a href="/dashboard/project/{project.id}/configuration">configuration</a>
        <button on:click={() => visible = true} type='button' class='btn variant-ringed-warning'>delete</button>
    </div>
    {#if visible}
        <aside class="alert variant-ghost-error flex-col">
            <div class="alert-message mb-5">
                <p>Do you confirm the deletion of the <i>{project.name}</i> project ?</p>
            </div>
            <div class="alert-actions">
                <button on:click={() => handleDeleteProject()} type="button" class="btn variant-ringed-warning">delete</button>
                <button on:click={() => visible = false} type="button" class="btn variant-ringed-primary">cancel</button>
            </div>
        </aside>
    {/if}
</li>