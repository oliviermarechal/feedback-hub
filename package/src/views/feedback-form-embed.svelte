<script lang='ts'>
    import Modal from './component/modal.svelte';
    import FeedbackForm from './component/feedback-form.svelte';
    import InsightHuntSDK from '../sdk';

    export let open = false;
    export let onClose: () => any;
    export let sdk: InsightHuntSDK;

</script>

<Modal open={open} onClose={onClose} >
    <div slot="body">
        <FeedbackForm displayCancelButton={true} displayPowered={false} onSubmit={onClose} onClose={onClose} sdk={sdk} />
    </div>
</Modal>