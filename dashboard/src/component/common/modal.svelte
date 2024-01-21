<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";

    export let open = false;
    export let close: () => any;
    export let customClass: string = '';
    export let closeOnEscape = true;
    export let closeOnOutsideClick = true;
</script>

<Dialog.Root
    bind:open={open}
    onOpenChange={() => close()}
    closeOnEscape={closeOnEscape}
    closeOnOutsideClick={closeOnOutsideClick}
>
    <Dialog.Content class={customClass}>
        <Dialog.Header>
            <Dialog.Title><slot name='header' /></Dialog.Title>
        </Dialog.Header>
        <!-- Modal body -->
        <slot name='body' />

        <!-- Modal footer -->
        <slot name='footer' />
    </Dialog.Content>
</Dialog.Root>