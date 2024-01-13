<script lang="ts">
    import * as Drawer from '$lib/components/ui/drawer';
    import * as Select from '$lib/components/ui/select';
    import { Label } from '$lib/components/ui/label';
    import { Textarea } from '$lib/components/ui/textarea';
    import { Button } from '$lib/components/ui/button';
    import Icon from '@iconify/svelte';
    import type {Selected} from 'bits-ui';
    import { page } from '$app/stores';
    import apiClient from '../../api';
    import {feedbacks} from '../../stores/feedback.store';

    export let onClose: () => any;
    export let voting: boolean;

    let type: string;
    let content: string;

    const id = $page.params.id;
    const language = Intl.DateTimeFormat().resolvedOptions().locale;
    const handleSelectChange = (data: Selected<string> | undefined) => {
        if (data) {
            type = data.value;
        }
    }

    const handleCreateFeedback = async () => {
        const body = {
            language,
            projectId: id,
            type,
            content,
        }

        const result = await apiClient.post(
            '/feedback',
            voting ? {...body, status: 'voting'} : body
        );

        feedbacks.update(feedbacks => {
            return [
                {
                    ...result.data,
                    createdAt: new Date(result.data.createdAt)
                },
                ...feedbacks,
            ];
        })

        if (result.status !== 201) {
            console.log('MANAGE ERROR')
        }

        onClose();
    }
</script>

<div class="mx-auto w-full max-w-sm">
    <Drawer.Header>
        <Drawer.Title>New feedback</Drawer.Title>
    </Drawer.Header>
    <div class="grid gap-4">
        <div class="grid gap-2">
            <Label for="content-feedback-input">Content</Label>
            <Textarea class="input" id="content-feedback-input" bind:value={content} />
        </div>
        <div class="grid gap-2">
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
        <div class="grid gap-1">
            <Button on:click={() => handleCreateFeedback()} type="button">Create</Button>
        </div>
        <div class="grid gap-1 mb-4">
            <Button on:click={() => onClose()} type="button" variant="outline">Cancel</Button>
        </div>
    </div>
</div>