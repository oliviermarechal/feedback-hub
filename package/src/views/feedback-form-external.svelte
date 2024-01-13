<script lang='ts'>
    import FeedbackForm from './component/feedback-form.svelte';
    import InsightHuntSDK from '../sdk';

    export let sdk: InsightHuntSDK;

</script>

<div class="flex">
    <div class="max-w-lg rounded-md border bg-white md:w-1/2 p-4">
        <FeedbackForm sdk={sdk} />
    </div>
</div>
