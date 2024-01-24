import {get, writable} from 'svelte/store';
import { translations } from './translations';
import {SupportedLanguage} from '../../main';

export const locale = writable<SupportedLanguage>('en');

function translate(locale: SupportedLanguage, key: string): string {
    if (!key) throw new Error('no key provided to $t()');

    let text = translations[locale][key];

    if (!text) return key;

    return text;
}

export const t = (key: string): string => {
    return translate(get(locale), key);
}
