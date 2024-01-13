<script lang='ts'>
    import Modal from './component/modal.svelte';
    import PoweredEmber from './component/powered.svelte';
    import UpvoteList from './component/upvote-list.svelte';
    import InsightHuntSDK from '../sdk';

    export let sdk: InsightHuntSDK;
    export let open = false;
    export let onClose: () => void;
    export let displayPowered = true

</script>

<Modal open={open} onClose={onClose}>
    <span slot='header'>Upvote</span>
    <div slot='body'>
        <UpvoteList sdk={sdk} displayPowered={displayPowered}/>
    </div>
</Modal>