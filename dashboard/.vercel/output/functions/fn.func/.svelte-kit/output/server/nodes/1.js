

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.024591f0.js","_app/immutable/chunks/scheduler.03adebca.js","_app/immutable/chunks/index.0c95a930.js","_app/immutable/chunks/stores.c2ca57b5.js","_app/immutable/chunks/singletons.5f9573bc.js","_app/immutable/chunks/index.6cb8efb8.js"];
export const stylesheets = [];
export const fonts = [];
