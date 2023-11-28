<script lang="ts">
    export let open = false;
    export let close: () => any;
</script>

<div id="modal" tabindex="-1" aria-hidden="true" class="{open ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="p-4 flex h-screen">
        <!-- Modal content -->
        <div class="bg-surface-100-800-token m-auto min-w-[50%]">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b bg-surface-200-700-token">
                <slot name='header' />
                <button type="button" on:click={close} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <slot name='body' />
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 dark:border-gray-600">
                <slot name='footer' />
            </div>
        </div>
    </div>
</div>