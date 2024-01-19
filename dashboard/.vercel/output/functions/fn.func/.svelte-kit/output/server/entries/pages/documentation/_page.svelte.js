import { c as create_ssr_component, h as compute_rest_props, i as spread, j as escape_attribute_value, k as escape_object, r as add_classes, g as escape, q as createEventDispatcher, v as validate_component, b as subscribe, e as each } from "../../../chunks/ssr.js";
import { c as cn, B as Button } from "../../../chunks/index2.js";
import { q as Root, T as Tabs_list, t as Tabs_trigger, v as Tabs_content, R as Root$1, S as Select_trigger, V as Value, n as Select_content, o as Select_item, p as Separator } from "../../../chunks/index4.js";
import { a as atomOneDark } from "../../../chunks/atom-one-dark.js";
import hljs from "highlight.js/lib/core";
import register from "highlight.js/lib/languages/typescript";
import "dequal";
import { p as projects, a as project } from "../../../chunks/project.store.js";
import { a as authUser } from "../../../chunks/user.store.js";
import { a as apiClient } from "../../../chunks/api.js";
const LangTag_svelte_svelte_type_style_lang = "";
const css = {
  code: ".langtag.svelte-11sh29b{position:relative}.langtag.svelte-11sh29b::after{content:attr(data-language);position:absolute;top:0;right:0;padding:1em;display:flex;align-items:center;justify-content:center;background:var(--langtag-background, inherit);color:var(--langtag-color, inherit);border-radius:var(--langtag-border-radius)}",
  map: null
};
const LangTag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["code", "highlighted", "languageName", "langtag"]);
  let { code } = $$props;
  let { highlighted } = $$props;
  let { languageName = "plaintext" } = $$props;
  let { langtag = false } = $$props;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.highlighted === void 0 && $$bindings.highlighted && highlighted !== void 0)
    $$bindings.highlighted(highlighted);
  if ($$props.languageName === void 0 && $$bindings.languageName && languageName !== void 0)
    $$bindings.languageName(languageName);
  if ($$props.langtag === void 0 && $$bindings.langtag && langtag !== void 0)
    $$bindings.langtag(langtag);
  $$result.css.add(css);
  return `<pre${spread(
    [
      {
        "data-language": escape_attribute_value(languageName)
      },
      escape_object($$restProps)
    ],
    {
      classes: (langtag ? "langtag" : "") + " svelte-11sh29b"
    }
  )}><code${add_classes("hljs".trim())}>${highlighted ? `<!-- HTML_TAG_START -->${highlighted}<!-- HTML_TAG_END -->` : `${escape(code)}`}</code></pre>`;
});
const LangTag$1 = LangTag;
const Highlight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["language", "code", "langtag"]);
  let { language } = $$props;
  let { code } = $$props;
  let { langtag = false } = $$props;
  createEventDispatcher();
  let highlighted = "";
  if ($$props.language === void 0 && $$bindings.language && language !== void 0)
    $$bindings.language(language);
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.langtag === void 0 && $$bindings.langtag && langtag !== void 0)
    $$bindings.langtag(langtag);
  {
    {
      hljs.registerLanguage(language.name, language.register);
      highlighted = hljs.highlight(code, { language: language.name }).value;
    }
  }
  return `${slots.default ? slots.default({ highlighted }) : ` ${validate_component(LangTag$1, "LangTag").$$render($$result, Object.assign({}, $$restProps, { languageName: language.name }, { langtag }, { highlighted }, { code }), {}, {})} `}`;
});
const Highlight$1 = Highlight;
const typescript = { name: "typescript", register };
const typescript$1 = typescript;
const getDefaultScriptInstall = () => `
<link rel="stylesheet" type="text/css" href="https://unpkg.com/insight-hunt@0.0.8/dist/bundle.css">
<script src="https://unpkg.com/insight-hunt@0.0.8/dist/bundle.js"><\/script>
`;
const Installation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let code;
  code = getDefaultScriptInstall();
  return `${validate_component(Root, "Tabs.Root").$$render($$result, { value: "node" }, {}, {
    default: () => {
      return `${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "node" }, {}, {
            default: () => {
              return `Node.js`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "vanilla" }, {}, {
            default: () => {
              return `JS vanilla`;
            }
          })}`;
        }
      })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "node" }, {}, {
        default: () => {
          return `${validate_component(Highlight$1, "Highlight").$$render(
            $$result,
            {
              language: typescript$1,
              code: `npm install -s insight-hunt
OR
yarn add insight-hunt`
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "vanilla" }, {}, {
        default: () => {
          return `${validate_component(Highlight$1, "Highlight").$$render($$result, { language: typescript$1, code }, {}, {})}`;
        }
      })}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $projects, $$unsubscribe_projects;
  let $authUser, $$unsubscribe_authUser;
  $$unsubscribe_projects = subscribe(projects, (value) => $projects = value);
  $$unsubscribe_authUser = subscribe(authUser, (value) => $authUser = value);
  let navActive = "install";
  const handleSelectChange = (data) => {
    const selectedProject = $projects.find((project2) => project2.id === data?.value);
    if (selectedProject) {
      project.set(selectedProject);
    }
  };
  {
    if ($authUser) {
      apiClient.get("/project").then((result) => projects.set(result.data));
    }
  }
  $$unsubscribe_projects();
  $$unsubscribe_authUser();
  return `${$$result.head += `<!-- HEAD_svelte-ydr1v6_START --><!-- HTML_TAG_START -->${atomOneDark}<!-- HTML_TAG_END --><!-- HEAD_svelte-ydr1v6_END -->`, ""} <div class="h-full flex-1 flex-col space-y-8 p-8 md:flex"><div class="flex items-center justify-between space-y-2"><div data-svelte-h="svelte-1suud2g"><h1 class="text-4xl font-bold tracking-tight"><a href="/">Insight hunt</a><small> Docs</small></h1></div> <div class="flex items-center justify-around space-x-2">${$authUser && $projects.length > 0 ? `${validate_component(Root$1, "Select.Root").$$render($$result, { onSelectedChange: handleSelectChange }, {}, {
    default: () => {
      return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "w-[180px]" }, {}, {
        default: () => {
          return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "Project" }, {}, {})}`;
        }
      })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${each($projects, (project2) => {
            return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: project2.id }, {}, {
              default: () => {
                return `${escape(project2.name)}`;
              }
            })}`;
          })}`;
        }
      })}`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { href: "dashboard" }, {}, {
    default: () => {
      return `Dashboard`;
    }
  })}` : `${validate_component(Button, "Button").$$render($$result, { href: "auth/login" }, {}, {
    default: () => {
      return `Sign in`;
    }
  })}`}</div></div></div> ${validate_component(Separator, "Separator").$$render($$result, { class: "my-6" }, {}, {})} <div class="space-y-6 p-10 pb-16 md:block"><div class="flex space-y-8 flex-row lg:space-x-12 lg:space-y-0"><aside class="mx-2 lg:w-1/5"><nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "ghost",
      class: cn(navActive !== "install", "relative justify-start hover:bg-transparent"),
      "data-sveltekit-noscroll": true
    },
    {},
    {
      default: () => {
        return `${`<div class="absolute inset-0 rounded-md bg-muted"></div>`} <div class="relative" data-svelte-h="svelte-1872wyn">Installation</div>`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "ghost",
      class: cn("hover:underline", "relative justify-start hover:bg-transparent"),
      "data-sveltekit-noscroll": true
    },
    {},
    {
      default: () => {
        return `${``} <div class="relative" data-svelte-h="svelte-1g6bp6p">Implementation</div>`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "ghost",
      class: cn("hover:underline", "relative justify-start hover:bg-transparent"),
      "data-sveltekit-noscroll": true
    },
    {},
    {
      default: () => {
        return `${``} <div class="relative" data-svelte-h="svelte-1v1mchn">User management</div>`;
      }
    }
  )}</nav></aside> <div class="flex-1 w-4/5">${`${validate_component(Installation, "Installation").$$render($$result, {}, {}, {})}`} ${``} ${``}</div></div></div>`;
});
export {
  Page as default
};
