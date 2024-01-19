import { c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object, b as subscribe, g as escape, v as validate_component, e as each } from "../../../../../../chunks/ssr.js";
import { w as writable } from "../../../../../../chunks/index.js";
import "../../../../../../chunks/api.js";
import { a as project } from "../../../../../../chunks/project.store.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { C as Card, c as Card_header, a as Card_title, b as Card_content, I as Icon } from "../../../../../../chunks/Icon.js";
import { c as cn, B as Button } from "../../../../../../chunks/index2.js";
import { L as Label, I as Input } from "../../../../../../chunks/input.js";
import "clsx";
import { a as atomOneDark } from "../../../../../../chunks/atom-one-dark.js";
const Card_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex items-center p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $project, $$unsubscribe_project;
  let $page, $$unsubscribe_page;
  let $domainError, $$unsubscribe_domainError;
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let domainName = "";
  let domainError = writable("");
  $$unsubscribe_domainError = subscribe(domainError, (value) => $domainError = value);
  const id = $page.params.id;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-ydr1v6_START --><!-- HTML_TAG_START -->${atomOneDark}<!-- HTML_TAG_END --><!-- HEAD_svelte-ydr1v6_END -->`, ""} <div class="flex-1 space-y-4 p-8 pt-6"><div class="flex flex-row justify-between"><div class="flex flex-row justify-items-start"><a class="text-xl mt-2" href="/dashboard" data-svelte-h="svelte-15f3w2a">Dashboard</a> <span class="text-xl mt-2" data-svelte-h="svelte-1sunq24"> / </span> <a class="text-xl mt-2" href="${"/dashboard/project/" + escape(id, true)}">${escape($project?.name)}</a> <span class="text-xl mt-2" data-svelte-h="svelte-1sunq24"> / </span> <h2 class="text-2xl mt-2 font-bold" data-svelte-h="svelte-ppdjch">Settings</h2></div></div></div> ${$project ? `<div class="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3"><div class="grid items-start gap-6 lg:col-span-1"><div class="flex items-center justify-center [&>div]:w-full">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "space-y-1" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
              default: () => {
                return `Update project`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "grid gap-4" }, {}, {
          default: () => {
            return `<div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "project-name-input" }, {}, {
              default: () => {
                return `Name`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                class: "input",
                id: "project-name-input",
                type: "text",
                value: $project.name
              },
              {
                value: ($$value) => {
                  $project.name = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { class: "label" }, {}, {
              default: () => {
                return `Allowed website`;
              }
            })} <div class="${"flex w-full max-w-sm mb-2 items-center input" + escape($domainError.length > 0 ? "-error" : "", true)}">${validate_component(Input, "Input").$$render(
              $$result,
              {
                type: "text",
                placeholder: "https://domain.fr",
                value: domainName
              },
              {
                value: ($$value) => {
                  domainName = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
              default: () => {
                return `${validate_component(Icon, "Icon").$$render(
                  $$result,
                  {
                    icon: "material-symbols:add",
                    width: "24",
                    height: "24"
                  },
                  {},
                  {}
                )}`;
              }
            })}</div> <ol>${each($project.domainNames, (domain) => {
              return `<li class="flex flex-row justify-between px-2"><span>${escape(domain)}</span> <button type="button">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "mdi:trash",
                  width: "24",
                  height: "24"
                },
                {},
                {}
              )}</button> </li>`;
            })}</ol></div>`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { type: "button" }, {}, {
              default: () => {
                return `Update`;
              }
            })} ${validate_component(Button, "Button").$$render(
              $$result,
              {
                class: "ml-4",
                variant: "destructive",
                type: "button"
              },
              {},
              {
                default: () => {
                  return `Delete project`;
                }
              }
            )}`;
          }
        })}`;
      }
    })}</div></div></div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_project();
  $$unsubscribe_page();
  $$unsubscribe_domainError();
  return $$rendered;
});
export {
  Page as default
};
