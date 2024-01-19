import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../../chunks/ssr.js";
/* empty css                   */import { B as Button } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">${$page.url.pathname === "/auth/login" ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: "/auth/registration",
      variant: "ghost",
      class: "absolute right-4 top-4 md:right-8 md:top-8"
    },
    {},
    {
      default: () => {
        return `Register`;
      }
    }
  )}` : `${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: "/auth/login",
      variant: "ghost",
      class: "absolute right-4 top-4 md:right-8 md:top-8"
    },
    {},
    {
      default: () => {
        return `Login`;
      }
    }
  )}`} <div class="relative bg-black h-full flex-col p-10 text-white dark:border-r lg:flex" data-svelte-h="svelte-1md16xh"><div class="absolute inset-0 bg-cover"></div> <div class="relative z-20 flex items-center text-lg font-medium">Insight hunt</div> <div class="relative z-20 mt-auto"><blockquote class="space-y-2"><p class="text-lg">“Hunting feedback and drive you product strategy !”</p></blockquote></div></div> <div class="lg:p-8">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export {
  Layout as default
};
