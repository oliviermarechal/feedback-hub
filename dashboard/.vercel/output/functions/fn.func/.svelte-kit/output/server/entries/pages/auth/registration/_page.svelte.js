import { c as create_ssr_component, b as subscribe, a as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { a as authUser } from "../../../../chunks/user.store.js";
import { g as goto } from "../../../../chunks/api.js";
import { B as Button } from "../../../../chunks/index2.js";
import { L as Label, I as Input } from "../../../../chunks/input.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authUser, $$unsubscribe_authUser;
  $$unsubscribe_authUser = subscribe(authUser, (value) => $authUser = value);
  if ($authUser) {
    goto("/dashboard");
  }
  let email;
  let password;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"><div class="flex flex-col space-y-2 text-center" data-svelte-h="svelte-1mqt5am"><h1 class="text-2xl font-semibold tracking-tight">Create account</h1></div> <div${add_attribute("class", "grid gap-6", 0)}><form><div class="grid gap-2"><div class="grid gap-1">${validate_component(Label, "Label").$$render($$result, { class: "sr-only", for: "email" }, {}, {
      default: () => {
        return `Email`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "email",
        placeholder: "email",
        type: "email",
        autocapitalize: "none",
        autocomplete: "email",
        autocorrect: "off",
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-1">${validate_component(Label, "Label").$$render($$result, { class: "sr-only", for: "password" }, {}, {
      default: () => {
        return `Password`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "password",
        type: "password",
        placeholder: "password",
        autocorrect: "off",
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(Button, "Button").$$render($$result, { type: "button" }, {}, {
      default: () => {
        return `Registration`;
      }
    })}</div></form></div></div>`;
  } while (!$$settled);
  $$unsubscribe_authUser();
  return $$rendered;
});
export {
  Page as default
};
