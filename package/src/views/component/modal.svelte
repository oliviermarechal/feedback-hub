<script>
    export let open = false;
    export let onClose;
</script>

<div class="{open ? '' : 'hidden'} fbh-modal">
    <div class="fbh-content">
        <div class="flex justify-between items-center text-white text-xl rounded-t-md px-4 py-4">
            <slot name='header' />
            <button on:click={onClose}>X</button>
        </div>

        <!-- Modal body -->
        <div class="max-h-48 overflow-y-scroll p-4">
            <slot name='body' />
        </div>

        <!-- Modal footer -->
        <div class="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
            <slot name='footer' />
        </div>
    </div>
</div>

<style>
    .fbh-modal {
        @apply z-50 absolute left-0 top-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4;
    }

    .fbh-content {
        @apply relative top-40 mx-auto shadow-xl max-w-md;
        background-color: #373845;
    }
</style>