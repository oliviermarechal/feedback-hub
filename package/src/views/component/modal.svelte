<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";

    export let open = false;
    export let onClose: () => any;
</script>

<Dialog.Root bind:open={open} onOpenChange={() => onClose()}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title><slot name='header' /></Dialog.Title>
        </Dialog.Header>
        <!-- Modal body -->
        <slot name='body' />

        <!-- Modal footer -->
        <slot name='footer' />
    </Dialog.Content>
</Dialog.Root>
