<script lang='ts'>
    import Modal from './component/modal.svelte';

    export let onSubmit: (data: any) => void;
    export let open = false;
    export let onClose: (data: any) => void;

    let feedback: string;
    let type: string;
    let email: string;

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

    .fbh-action-button {
        @apply py-2 px-4 border-2 border-cyan-500 bg-transparent mt-4 mx-4;
    }

    .fbh-input {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 8px;
        background-color: #373845;
    }

    .fbh-input :focus {
        @apply border-cyan-500;
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
                    <input bind:value={email} class="fbh-input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                </div>
                <div class='w-full md:w-1/2 px-3'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        Type
                    </label>
                    <div class="relative">
                        <select bind:value={type} class="fbh-input block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value='bug'>Bug</option>
                            <option value='enhance'>Enhance</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <label for="fbh-feedback-content">Feedback :</label>
                <textarea id="fbh-feedback-content" class='fbh-input' bind:value={feedback}></textarea>
            </div>
        </form>
    </div>
    <div slot='footer'>
        <button class='fbh-action-button' on:click={onClose}>Cancel</button>
        <button class='fbh-action-button' on:click={handleSubmit}>Send</button>
    </div>
</Modal>