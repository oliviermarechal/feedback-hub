<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";

    export let open = false;
    export let onClose: () => any;
    export let onValid: () => any;
    export let title: string = "Confirmation required";
    export let description: string;
</script>

<AlertDialog.Root bind:open={open} onOpenChange={onClose}>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>
                {description}
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action on:click={onValid}>Continue</AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>