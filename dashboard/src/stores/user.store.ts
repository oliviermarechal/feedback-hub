import { writable } from 'svelte/store';

export const authUser = writable<{id: string, email: string} | null>(null);