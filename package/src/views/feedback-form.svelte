<script lang='ts'>
    import Modal from './component/modal.svelte';

    export let onSubmit: (data: any) => void;
    export let open = false;
    export let onClose: () => any;

    let feedback: string;
    let type: string;
    export let email: string = '';

    function handleSubmit() {
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
        @apply py-2 px-4 border-2 bg-transparent;
        border-color: #a8bdf1;
    }

    .ih-input {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 8px;
        background-color: #e8eaf1;
    }

    .ih-input:focus {
        outline: none !important;
        border-color: #a8bdf1;
        box-shadow: 0 0 10px #a8bdf1;
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
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Email
                    </label>
                    <input bind:value={email} class="ih-input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                </div>
                <div class='w-full md:w-1/2 px-3'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Type
                    </label>
                    <div class="relative">
                        <select bind:value={type} class="ih-input block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value='bug'>Bug</option>
                            <option value='enhance'>Enhance</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <label for="ih-feedback-content">Feedback :</label>
                <textarea id="ih-feedback-content" class='ih-input' bind:value={feedback}></textarea>
            </div>
        </form>
    </div>
    <div slot='footer'>
        <button class='ih-action-button' on:click={onClose}>Cancel</button>
        <button class='ih-action-button' on:click={handleSubmit}>Send</button>
    </div>
</Modal>