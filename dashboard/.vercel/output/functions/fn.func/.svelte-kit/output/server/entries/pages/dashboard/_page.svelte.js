import { s as setContext, p as getContext, c as create_ssr_component, h as compute_rest_props, i as spread, k as escape_object, a as add_attribute, b as subscribe, v as validate_component, g as escape, e as each } from "../../../chunks/ssr.js";
import "../../../chunks/api.js";
import { p as projects } from "../../../chunks/project.store.js";
import "dequal";
import { e as effect, s as styleToString, i as isBrowser, c as cn, B as Button } from "../../../chunks/index2.js";
import { b as builder, c as createBitAttrs } from "../../../chunks/events.js";
import { t as toWritableStores, o as omit, a as overridable, r as removeUndefined, g as getOptionUpdater } from "../../../chunks/updater.js";
import { w as writable } from "../../../chunks/index.js";
import "clsx";
import { I as Icon, C as Card, c as Card_header, a as Card_title, b as Card_content } from "../../../chunks/Icon.js";
import { D as Drawer_header, a as Drawer_title, b as Drawer, T as Trigger, c as Drawer_content } from "../../../chunks/index3.js";
import { L as Label, I as Input } from "../../../chunks/input.js";
const defaults = {
  src: "",
  delayMs: 0,
  onLoadingStatusChange: void 0
};
const createAvatar = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "loadingStatus", "onLoadingStatusChange"));
  const { src, delayMs } = options;
  const loadingStatusWritable = withDefaults.loadingStatus ?? writable("loading");
  const loadingStatus = overridable(loadingStatusWritable, withDefaults?.onLoadingStatusChange);
  effect([src, delayMs], ([$src, $delayMs]) => {
    if (isBrowser) {
      const image2 = new Image();
      image2.src = $src;
      image2.onload = () => {
        if (delayMs !== void 0) {
          const timerId = window.setTimeout(() => {
            loadingStatus.set("loaded");
          }, $delayMs);
          return () => window.clearTimeout(timerId);
        } else {
          loadingStatus.set("loaded");
        }
      };
      image2.onerror = () => {
        loadingStatus.set("error");
      };
    }
  });
  const image = builder("avatar-image", {
    stores: [src, loadingStatus],
    returned: ([$src, $loadingStatus]) => {
      const imageStyles = styleToString({
        display: $loadingStatus === "loaded" ? "block" : "none"
      });
      return {
        src: $src,
        style: imageStyles
      };
    }
  });
  const fallback = builder("avatar-fallback", {
    stores: [loadingStatus],
    returned: ([$loadingStatus]) => {
      return {
        style: $loadingStatus === "loaded" ? styleToString({
          display: "none"
        }) : void 0,
        hidden: $loadingStatus === "loaded" ? true : void 0
      };
    }
  });
  return {
    elements: {
      image,
      fallback
    },
    states: {
      loadingStatus
    },
    options
  };
};
function getAvatarData() {
  const NAME = "avatar";
  const PARTS = ["root", "image", "fallback"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getAvatarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const avatar = { ...createAvatar(removeUndefined(props)), getAttrs };
  setContext(NAME, avatar);
  return {
    ...avatar,
    updateOption: getOptionUpdater(avatar.options)
  };
}
function getCtx() {
  const { NAME } = getAvatarData();
  return getContext(NAME);
}
const Avatar$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["delayMs", "loadingStatus", "onLoadingStatusChange", "asChild", "el"]);
  let { delayMs = void 0 } = $$props;
  let { loadingStatus = void 0 } = $$props;
  let { onLoadingStatusChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { loadingStatus: localLoadingStatus }, updateOption, getAttrs } = setCtx({
    src: "",
    delayMs,
    onLoadingStatusChange: ({ next }) => {
      loadingStatus = next;
      onLoadingStatusChange?.(next);
      return next;
    }
  });
  const attrs = getAttrs("root");
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0)
    $$bindings.delayMs(delayMs);
  if ($$props.loadingStatus === void 0 && $$bindings.loadingStatus && loadingStatus !== void 0)
    $$bindings.loadingStatus(loadingStatus);
  if ($$props.onLoadingStatusChange === void 0 && $$bindings.onLoadingStatusChange && onLoadingStatusChange !== void 0)
    $$bindings.onLoadingStatusChange(onLoadingStatusChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  loadingStatus !== void 0 && localLoadingStatus.set(loadingStatus);
  {
    updateOption("delayMs", delayMs);
  }
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</div>`}`;
});
const Avatar_fallback$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $fallback, $$unsubscribe_fallback;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { fallback }, getAttrs } = getCtx();
  $$unsubscribe_fallback = subscribe(fallback, (value) => $fallback = value);
  const attrs = getAttrs("fallback");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $fallback;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_fallback();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<span${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</span>`}`;
});
const Avatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "delayMs"]);
  let { class: className = void 0 } = $$props;
  let { delayMs = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0)
    $$bindings.delayMs(delayMs);
  return `${validate_component(Avatar$1, "AvatarPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { delayMs },
      {
        class: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Avatar_fallback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Avatar_fallback$1, "AvatarPrimitive.Fallback").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { project } = $$props;
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  return `<div role="button" class="flex items-center rounded-md py-1 transition-all hover:bg-accent hover:text-accent-foreground">${validate_component(Avatar, "Avatar.Root").$$render($$result, { class: "h-9 w-9" }, {}, {
    default: () => {
      return `${validate_component(Avatar_fallback, "Avatar.Fallback").$$render($$result, {}, {}, {
        default: () => {
          return `${escape(project.name.substring(0, 1).toUpperCase())}`;
        }
      })}`;
    }
  })} <div class="ml-4 space-y-1"><p class="text-sm font-medium leading-none">${escape(project.name)}</p> <p class="text-sm text-muted-foreground" data-svelte-h="svelte-102fmpq">+23 feedbacks</p></div></div>`;
});
const New_project = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $domainNames, $$unsubscribe_domainNames;
  let $domainError, $$unsubscribe_domainError;
  let name;
  let domainNames = writable([]);
  $$unsubscribe_domainNames = subscribe(domainNames, (value) => $domainNames = value);
  let domainName = "";
  let domainError = writable("");
  $$unsubscribe_domainError = subscribe(domainError, (value) => $domainError = value);
  let { onClose } = $$props;
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
    $$bindings.onClose(onClose);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="mx-auto w-full max-w-sm">${validate_component(Drawer_header, "Drawer.Header").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Drawer_title, "Drawer.Title").$$render($$result, {}, {}, {
          default: () => {
            return `Add project`;
          }
        })}`;
      }
    })} <div class="grid gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "project-name-input" }, {}, {
      default: () => {
        return `Name`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        class: "input",
        id: "project-name-input",
        type: "text",
        value: name
      },
      {
        value: ($$value) => {
          name = $$value;
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
    })}</div> <ol>${each($domainNames, (domain) => {
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
    })}</ol></div> <div class="grid gap-1">${validate_component(Button, "Button").$$render($$result, { type: "button" }, {}, {
      default: () => {
        return `Create`;
      }
    })}</div> <div class="grid gap-1 mb-4">${validate_component(Button, "Button").$$render($$result, { type: "button", variant: "outline" }, {}, {
      default: () => {
        return `Cancel`;
      }
    })}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_domainNames();
  $$unsubscribe_domainError();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $projects, $$unsubscribe_projects;
  $$unsubscribe_projects = subscribe(projects, (value) => $projects = value);
  let openNewProjectDrawer = false;
  const toggleDrawer = () => openNewProjectDrawer = !openNewProjectDrawer;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex-1 space-y-4 p-8 pt-6"><h2 class="text-3xl font-bold tracking-tight mt-2" data-svelte-h="svelte-13oqkvb">Dashboard</h2> <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render(
          $$result,
          {
            class: "flex flex-row items-center justify-between space-y-0 pb-2"
          },
          {},
          {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-sm font-medium" }, {}, {
                default: () => {
                  return `Total feedbacks`;
                }
              })}`;
            }
          }
        )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="text-2xl font-bold" data-svelte-h="svelte-1tgd76d">109 274</div> <p class="text-xs text-muted-foreground" data-svelte-h="svelte-q2vjyk">+180.1% from last month</p>`;
          }
        })}`;
      }
    })} ${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render(
          $$result,
          {
            class: "flex flex-row items-center justify-between space-y-0 pb-2"
          },
          {},
          {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-sm font-medium" }, {}, {
                default: () => {
                  return `Feedbacks in upvote`;
                }
              })}`;
            }
          }
        )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="text-2xl font-bold" data-svelte-h="svelte-1ejluiu">24</div>`;
          }
        })}`;
      }
    })} ${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render(
          $$result,
          {
            class: "flex flex-row items-center justify-between space-y-0 pb-2"
          },
          {},
          {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-sm font-medium" }, {}, {
                default: () => {
                  return `Total votes`;
                }
              })}`;
            }
          }
        )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="text-2xl font-bold" data-svelte-h="svelte-1zt6rl">436</div> <p class="text-xs text-muted-foreground" data-svelte-h="svelte-q2vjyk">+180.1% from last month</p>`;
          }
        })}`;
      }
    })}</div> <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">${validate_component(Card, "Card.Root").$$render($$result, { class: "col-span-4" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "flex flex-row justify-between" }, {}, {
              default: () => {
                return `<h3 data-svelte-h="svelte-dmvsri">Projects</h3> ${validate_component(Drawer, "Drawer.Root").$$render(
                  $$result,
                  {
                    onOutsideClick: toggleDrawer,
                    open: openNewProjectDrawer
                  },
                  {
                    open: ($$value) => {
                      openNewProjectDrawer = $$value;
                      $$settled = false;
                    }
                  },
                  {
                    default: () => {
                      return `${validate_component(Trigger, "Drawer.Trigger").$$render($$result, { asChild: true }, {}, {
                        default: () => {
                          return `<button>${validate_component(Icon, "Icon").$$render(
                            $$result,
                            {
                              width: "24",
                              icon: "zondicons:add-outline"
                            },
                            {},
                            {}
                          )}</button>`;
                        }
                      })} ${validate_component(Drawer_content, "Drawer.Content").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(New_project, "AddProject").$$render($$result, { onClose: () => toggleDrawer() }, {}, {})}`;
                        }
                      })}`;
                    }
                  }
                )}`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${$projects.length === 0 ? `<p class="mb-4" data-svelte-h="svelte-10iktdn">To get started, create your first project</p>` : `<div class="space-y-4">${each($projects, (project) => {
              return `${validate_component(Row, "ProjectRow").$$render($$result, { project }, {}, {})}`;
            })}</div>`}`;
          }
        })}`;
      }
    })}</div></div>`;
  } while (!$$settled);
  $$unsubscribe_projects();
  return $$rendered;
});
export {
  Page as default
};
