<script lang="ts">
    import * as Avatar from '$lib/components/ui/avatar';
    import {goto} from '$app/navigation';
    let visible: boolean = false;
    export let project: {id: string, name: string};
</script>

<div role="button" class="flex items-center rounded-md py-1 transition-all hover:bg-accent hover:text-accent-foreground" on:click={() => goto(`/dashboard/project/${project.id}`)}>
    <Avatar.Root class="h-9 w-9">
        <Avatar.Fallback>{project.name.substring(0, 1).toUpperCase()}</Avatar.Fallback>
    </Avatar.Root>
    <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">{project.name}</p>
        <p class="text-sm text-muted-foreground">+23 feedbacks</p>
    </div>
</div>