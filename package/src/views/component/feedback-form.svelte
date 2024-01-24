<script lang='ts'>
    import PoweredEmber from './powered.svelte';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import * as Select from "$lib/components/ui/select";
    import { Selected } from 'bits-ui';
    import InsightHuntSDK from '../../sdk';
    import {t} from '$lib/i18n/i18n';

    export let displayCancelButton = false;
    export let displayPowered = true;
    export let onSubmit = () => {};
    export let onClose = () => {};
    export let sdk: InsightHuntSDK;

    const addFeedback = async () => {
        await sdk.addFeedback({
            content: feedback,
            type: type,
            email: email,
            url: window.location.href,
            language: Intl.DateTimeFormat().resolvedOptions().locale,
        });
        onSubmit();
        feedback = '';
        email = '';
    }


    let feedback: string;
    let type: "bug" | "enhance";
    let email: string = sdk.getLoggedUser()?.email || '';

    const handleSelectChange = (data: Selected<string> | undefined) => {
        if (data) {
            type = data.value as "bug" | "enhance";
        }
    }
</script>

<form class="w-full">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label class="mb-4" for="email">{t('email')}</Label>
            <Input bind:value={email} id="email" type="text" />
        </div>
        <div class='w-full md:w-1/2 px-3'>
            <Select.Root onSelectedChange={handleSelectChange}>
                <Label class="mb-4">
                    {t('type')}
                </Label>
                <Select.Trigger>
                    <Select.Value />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value='enhance'>{t('enhance')}</Select.Item>
                    <Select.Item value='bug'>{t('bug')}</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
    </div>
    <div>
        <Label class="mb-4" for="ih-feedback-content">{t('content')} :</Label>
        <Textarea id="ih-feedback-content" bind:value={feedback} />
    </div>
</form>
<div class="flex-col flex">
    <div class='flex justify-end mt-3'>
        {#if displayCancelButton}
            <Button variant="outline" class="mr-3" on:click={onClose}>{t('cancel')}</Button>
        {/if}
        <Button on:click={addFeedback}>{t('send')}</Button>
    </div>
    {#if displayPowered}
        <PoweredEmber />
    {/if}
</div>