<script lang='ts'>
    import Modal from './component/modal.svelte';
    import InsightHuntSDK, {IHUser} from '../sdk';
    import {onMount} from 'svelte';
    import {Feedback} from '../types/feedback';

    export let open = false;
    export let onClose: () => void;
    export let sdk: InsightHuntSDK;
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
        return !!feedback.customersVote.find(customer => customer.externalId === sdk.getLoggedUser()?.id);
    }
</script>

<style>
    .ih-action-button {
        @apply py-2 px-4 border-2 bg-transparent;
        border-color: #a8bdf1;
    }
</style>

<Modal open={open} onClose={onClose} contentWidth="xlarge">
    <div slot='header'>
        <h3>Feedback submitted for upvoting</h3>
    </div>
    <div slot='body'>
        <div>
            {#each feedbacks as feedback, index (feedback.id)}
                <div class="flex justify-between py-5">
                    <div>{feedback.content}</div>
                    <div class="flex flex-col align-middle">
                        {#if sdk.isConnected()}
                            {#if userAlreadyVoted(feedback)}
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg></span>
                            {:else}
                                <button type="button" on:click={() => upvote(feedback.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"/></svg></button>
                            {/if}
                        {:else}
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#afafaf" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"/></svg></span>
                        {/if}
                        <span class="w-full text-center mt-3">{feedback.vote}</span>
                    </div>
                </div>
                {#if index + 1 < feedbacks.length}
                    <hr />
                {/if}
            {/each}
        </div>
    </div>
    <div slot='footer'>
        <button class='ih-action-button' on:click={onClose}>Cancel</button>
    </div>
</Modal>