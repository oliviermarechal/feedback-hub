import { c as create_ssr_component, v as validate_component, a as add_attribute, e as each, g as escape } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/index2.js";
import { C as Card, I as Icon, a as Card_title, b as Card_content, c as Card_header } from "../../chunks/Icon.js";
import "clsx";
import { L as Label, I as Input } from "../../chunks/input.js";
import { T as Textarea } from "../../chunks/textarea.js";
import "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../chunks/api.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const featureCards = [
    {
      text: "Multi project",
      subtext: "Manage feedbacks for multiple projects",
      icon: "material-symbols:list"
    },
    {
      text: "Collect feedback easily",
      subtext: "Installation ready to use in your website",
      icon: "solar:user-speak-bold"
    },
    {
      text: "Upvote",
      subtext: "Select the most important feedbacks",
      icon: "bx:upvote"
    }
  ];
  const advantages = [
    {
      icon: "icon-park-outline:archery",
      text: "Strategy management",
      subText: "Manage your product(s) strategy with our tools"
    },
    {
      icon: "mingcute:time-line",
      text: "Win time",
      subText: "With duplicate suggestion and auto classification"
    },
    {
      icon: "formkit:group",
      text: "Many projects, one platform",
      subText: "Manage all your projects in one place"
    }
  ];
  let email = "";
  let content = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<section class="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20"><div class="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8"><div class="space-y-4" data-svelte-h="svelte-1avk3hq"><h1 class="text-4xl font-bold lg:text-6xl">Insight hunt</h1> <h2 class="text-lg font-light text-muted-foreground lg:text-3xl">Hunt your insight in user feedback</h2></div> ${validate_component(Button, "Button").$$render(
      $$result,
      {
        href: "#early-access",
        class: "w-[10rem]"
      },
      {},
      {
        default: () => {
          return `Early access`;
        }
      }
    )}</div> <div class="flex flex-1 justify-center lg:justify-end" data-svelte-h="svelte-39ng2y"><img src="image/lp-header.jpg"${add_attribute("width", 500, 0)}${add_attribute("height", 500, 0)} alt="Header"></div></section> <section class="bg-slate-50 dark:bg-slate-900"><div class="container space-y-8 py-12 text-center lg:py-20"><div class="space-y-2" data-svelte-h="svelte-x8jf5g"><h1 class="text-3xl font-bold text-primary lg:text-4xl">Features</h1></div> <div class="grid grid-cols-1 gap-4 md:grid-cols-3">${each(featureCards, (cards) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
        },
        {},
        {
          default: () => {
            return `<div class="flex">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: cards.icon,
                class: "h-[6rem] w-[6rem]"
              },
              {},
              {}
            )}</div> <div class="space-y-2">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(cards.text)}`;
              }
            })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(cards.subtext)}`;
              }
            })}</div> `;
          }
        }
      )}`;
    })}</div></div></section> <section class="container space-y-8 py-12 lg:py-20" id="features"><div class="space-y-2" data-svelte-h="svelte-9ag1g"><h1 class="text-3xl font-bold text-primary lg:text-4xl text-center">Why Insight hunt ?</h1></div> <div class="grid grid-cols-1 gap-8 md:grid-cols-2"><div class="grid grid-cols-1 gap-8">${each(advantages, (advantage) => {
      return `<div class="flex flex-col items-center gap-2 text-center md:flex-row md:gap-8 md:text-left"><div class="flex">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: advantage.icon,
          class: "h-[6rem] w-[6rem]"
        },
        {},
        {}
      )}</div> <div class="flex-1"><p class="md:text4xl text-2xl font-semibold">${escape(advantage.text)}</p> <p class="font-light text-muted-foreground md:text-lg">${escape(advantage.subText)} </p></div> </div>`;
    })}</div></div></section> <section class="bg-slate-50 dark:bg-slate-900"><div class="container space-y-8 py-12 lg:py-20 flex flex-col items-center"><div class="space-y-2" data-svelte-h="svelte-1enx5c0"><h1 class="text-3xl font-bold text-primary lg:text-4xl text-center" id="early-access">Early access</h1> <p>The current version is private beta for testing</p></div> ${validate_component(Card, "Card.Root").$$render($$result, { class: "w-1/2" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "text-center" }, {}, {
          default: () => {
            return `Ask your early access`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "space-y-4" }, {}, {
          default: () => {
            return `<div class="w-full px-3 mb-6 md:mb-0">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Email`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "email",
                placeholder: "email",
                type: "email",
                value: email
              },
              {
                value: ($$value) => {
                  email = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="w-full px-3 mb-6 md:mb-0">${validate_component(Label, "Label").$$render($$result, { for: "content" }, {}, {
              default: () => {
                return `Why do you want access ?`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                id: "content",
                placeholder: "Talk about your product",
                value: content
              },
              {
                value: ($$value) => {
                  content = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="flex flex-row justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Validate`;
              }
            })}</div>`;
          }
        })}`;
      }
    })}</div></section>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
