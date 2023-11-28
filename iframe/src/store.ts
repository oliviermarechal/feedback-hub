import { writable } from 'svelte/store';

export const project = writable<{
    id: string;
    name: string;
    publicId: string;
    domainNames: string[];
}>(undefined);