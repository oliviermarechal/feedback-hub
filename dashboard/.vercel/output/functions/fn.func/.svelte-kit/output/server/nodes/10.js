

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/documentation/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.4541d946.js","_app/immutable/chunks/scheduler.03adebca.js","_app/immutable/chunks/index.0c95a930.js","_app/immutable/chunks/each.3cd4652f.js","_app/immutable/chunks/index.97b48de3.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.6cb8efb8.js","_app/immutable/chunks/index.0e1c4fd8.js","_app/immutable/chunks/events.1d039fa6.js","_app/immutable/chunks/updater.072dca74.js","_app/immutable/chunks/atom-one-dark.9d5a45d9.js","_app/immutable/chunks/project.store.6e0f2a8e.js","_app/immutable/chunks/user.store.1cac29e5.js","_app/immutable/chunks/api.b684aae3.js","_app/immutable/chunks/singletons.5f9573bc.js","_app/immutable/chunks/public.3d043575.js"];
export const stylesheets = ["_app/immutable/assets/10.c47a857b.css"];
export const fonts = [];
