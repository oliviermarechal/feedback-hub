<script lang='ts'>
    import Modal from './component/modal.svelte';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    // @ts-ignore
    import { Label } from "$lib/components/ui/label";
    // @ts-ignore
    import { Textarea } from "$lib/components/ui/textarea";
    import * as Select from "$lib/components/ui/select";
    import { Selected } from 'bits-ui';

    export let onSubmit: (data: any) => void;
    export let open = false;
    export let onClose: () => any;

    let feedback: string;
    let type: string;
    export let email: string = '';

    const handleSelectChange = (data: Selected<string> | undefined) => {
        if (data) {
            type = data.value;
        }
    }

    const handleSubmit = () => {
        onSubmit({
            content: feedback,
            type,
            email,
        });
        feedback = '';
        email = '';
    }
</script>

<style>
    label {
        display: block;
        margin-bottom: 8px;
    }

    .ih-action-button {
        @apply py-2 px-4 border-2;
    }

</style>

<Modal open={open} onClose={onClose} >
    <div slot='header'>
        <h3>Add a feedback</h3>
    </div>
    <div slot='body'>
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label class="mb-4" for="email">Email</Label>
                    <Input bind:value={email} id="email" type="text" />
                </div>
                <div class='w-full md:w-1/2 px-3'>
                    <Select.Root onSelectedChange={handleSelectChange}>
                        <Label class="mb-4">
                            Type
                        </Label>
                        <Select.Trigger>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value='enhance'>Enhance</Select.Item>
                            <Select.Item value='bug'>Bug</Select.Item>
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>
            <div>
                <Label class="mb-4" for="ih-feedback-content">Feedback :</Label>
                <Textarea id="ih-feedback-content" bind:value={feedback} />
            </div>
        </form>
    </div>
    <div slot='footer'>
        <Button variant="outline" class='ih-action-button' on:click={onClose}>Cancel</Button>
        <Button class='ih-action-button' on:click={handleSubmit}>Send</Button>
    </div>
</Modal>