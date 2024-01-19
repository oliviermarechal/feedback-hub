

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.fc1f9d83.js","_app/immutable/chunks/scheduler.03adebca.js","_app/immutable/chunks/index.0c95a930.js","_app/immutable/chunks/user.store.1cac29e5.js","_app/immutable/chunks/index.6cb8efb8.js","_app/immutable/chunks/api.b684aae3.js","_app/immutable/chunks/singletons.5f9573bc.js","_app/immutable/chunks/public.3d043575.js","_app/immutable/chunks/bundle.esm.480b3d24.js"];
export const stylesheets = [];
export const fonts = [];
