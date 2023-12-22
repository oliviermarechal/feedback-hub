<script lang="ts">
    export let open = false;
    export let onClose: () => any;
    export let contentWidth: 'large' | 'xlarge' = 'large';
</script>

<div class="{open ? '' : 'hidden'} ih-modal">
    <div class="ih-modal-content-{contentWidth}">
        <div class="ih-modal-header">
            <slot name='header' />
            <button on:click={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"/></svg></button>
        </div>
        <hr />

        <!-- Modal body -->
        <div class="ih-modal-body">
            <slot name='body' />
        </div>

        <!-- Modal footer -->
        <div class="ih-modal-footer">
            <slot name='footer' />
        </div>
    </div>
</div>

<style>
    .ih-modal {
        @apply z-50 absolute left-0 top-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;
    }

    .ih-modal-content-large {
        @apply relative top-40 mx-auto shadow-xl max-w-lg;
        background-color: #e8eaf1;
    }

    .ih-modal-content-xlarge {
        @apply relative top-40 mx-auto shadow-xl max-w-2xl;
        background-color: #e8eaf1;
    }

    .ih-modal-header {
        @apply flex justify-between items-center text-black text-xl rounded-t-md px-4 py-4;
    }

    .ih-modal-body {
        @apply overflow-y-scroll p-6;
    }

    .ih-modal-footer {
        @apply px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4;
    }
</style>