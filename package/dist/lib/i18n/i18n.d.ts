/// <reference types="svelte" />
import { SupportedLanguage } from '../../main';
export declare const locale: import("svelte/store").Writable<SupportedLanguage>;
export declare const t: (key: string) => string;
