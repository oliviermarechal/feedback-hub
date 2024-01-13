<script lang="ts">
    import Icon from '@iconify/svelte';
    import { Badge } from '$lib/components/ui/badge';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Separator } from '$lib/components/ui/separator';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import {RangeCalendar} from '$lib/components/ui/range-calendar';
    import {clearFeedbackFilter, filter} from '../../stores/feedback.store';
    import * as Drawer from '$lib/components/ui/drawer';
    import AddFeedbackForm from './add-feedback-form.svelte';

    let openAddFeedbackDrawer = false;
    const toggleDrawer = () => openAddFeedbackDrawer = !openAddFeedbackDrawer;

    $: hasFilter = () => {
        return $filter.text.length > 2 || ($filter.rangeDate.start && $filter.rangeDate.end)
    }

    export let fromVoting = false;
</script>

<div class="flex flex-1 items-center justify-between">
    <div class="flex flex-row items-center space-x-2">
        <Input
            placeholder="Search..."
            class="h-8 w-[150px] lg:w-[250px]"
            type="text"
            bind:value={$filter.text}
        />
        <span>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button builders={[builder]} variant="outline" class="h-8">
                        <span>Filter date</span>
                        {#if $filter.rangeDate.start && $filter.rangeDate.end}
                            <Separator orientation="vertical" class="mx-2 h-4" />
                            <Badge variant="secondary"
                                   class="rounded-sm px-1 font-normal lg:hidden">
                                {$filter.rangeDate.start.toString()}
                            </Badge> -
                            <Badge variant="secondary"
                                   class="rounded-sm px-1 font-normal lg:hidden">
                                {$filter.rangeDate.end.toString()}
                            </Badge>
                        {/if}
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <RangeCalendar bind:value={$filter.rangeDate} class="border rounded-md" />
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </span>
        {#if hasFilter()}
            <Button class="h-8" on:click={() => clearFeedbackFilter()}><span class="mr-2">clear filters</span><Icon icon="ic:round-clear" width="20" height="20" /></Button>
        {/if}
    </div>
    <Drawer.Root bind:open={openAddFeedbackDrawer} onOutsideClick={toggleDrawer}>
        <Drawer.Trigger>
            <Button on:click={toggleDrawer} class="h-8">Add new</Button>
        </Drawer.Trigger>
        <Drawer.Content>
            <AddFeedbackForm onClose={() => toggleDrawer()} voting={fromVoting} />
        </Drawer.Content>
    </Drawer.Root>
</div>