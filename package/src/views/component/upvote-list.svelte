<script lang="ts">
    import {onMount} from 'svelte';
    import InsightHuntSDK, {IHUser} from '../../sdk';
    import {Feedback} from '../../types/feedback';
    import * as Table from '$lib/components/ui/table';
    import PoweredEmber from './powered.svelte';
    import {locale, t} from '$lib/i18n/i18n';

    export let sdk: InsightHuntSDK;
    export let displayPowered = true;
    let feedbacks: Feedback[] = [];

    onMount(async () => {
        feedbacks = await sdk.listVotingFeedbacks();
    });

    const upvote = async (feedbackId: string) => {
        const responseOk = await sdk.upvote(feedbackId);
        if (responseOk) {
            const feedback = feedbacks.find(f => f.id === feedbackId);
            if (!feedback) {
                throw new Error('Internal error');
            }

            const currentUser: IHUser = sdk.getLoggedUser() as IHUser;
            feedback.customersVote = [
                ...feedback.customersVote,
                {
                    id: '',
                    externalId: currentUser.id,
                    email: currentUser.email,
                    logoUrl: currentUser.logoUrl,
                }
            ];
            feedback.vote++;

            feedbacks = [
                ...feedbacks.filter(f => f.id !== feedbackId),
                feedback,
            ];
        }
    }

    const userAlreadyVoted = (feedback: Feedback) => {
        return sdk.alreadyVoted(feedback);
    }
</script>
<div class="space-y-4">
    <div class="rounded-md border bg-white">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="text-center">{t('date')}</Table.Head>
                    <Table.Head class="text-center">{t('content')}</Table.Head>
                    <Table.Head class="text-center">{t('vote')}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each feedbacks as feedback (feedback.id)}
                    <Table.Row>
                        <Table.Cell>{(new Date(feedback.createdAt)).toLocaleDateString($locale)}</Table.Cell>
                        <Table.Cell>{feedback.content}</Table.Cell>
                        <Table.Cell class="flex flex-col justify-center">
                            <span class="flex flex-row justify-center">
                                {#if userAlreadyVoted(feedback)}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg>
                                {:else}
                                    <button type="button" on:click={() => upvote(feedback.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"/></svg>
                                    </button>
                                {/if}
                            </span>
                            <span class="mt-3 text-center">{feedback.vote}</span>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>

        {#if displayPowered}
            <PoweredEmber />
        {/if}
    </div>
</div>