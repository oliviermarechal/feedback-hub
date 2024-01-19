import { l as get_store_value, p as getContext, s as setContext, c as create_ssr_component, h as compute_rest_props, b as subscribe, i as spread, j as escape_attribute_value, k as escape_object, a as add_attribute, g as escape, v as validate_component, e as each } from "../../../../../chunks/ssr.js";
import { a as apiClient } from "../../../../../chunks/api.js";
import { s as sleep, c as createTypeaheadSearch, g as generateIds, d as derivedVisible, u as usePopper, a as getPortalDestination, h as handleRovingFocus, b as createSeparator, r as removeHighlight, e as removeScroll, f as getNextFocusable, i as getPreviousFocusable, j as addHighlight, k as chunk, l as isValidIndex, m as getPositioningUpdater, I as Icon, R as Root$1, S as Select_trigger, V as Value, n as Select_content, o as Select_item, p as Separator, q as Root$2, T as Tabs_list, t as Tabs_trigger, v as Tabs_content } from "../../../../../chunks/index4.js";
import "dequal";
import { a as isFunction, b as isHTMLElement, d as derivedWithUnsubscribe, s as styleToString, e as effect, f as executeCallbacks, g as addMeltEventListener, F as FIRST_LAST_KEYS, k as kbd, S as SELECTION_KEYS, h as isElementDisabled, j as safeOnMount, l as addEventListener, i as isBrowser, n as noop, m as disabledAttr, o as is_void, c as cn, p as flyAndScale, q as buttonVariants, B as Button } from "../../../../../chunks/index2.js";
import "clsx";
import { w as writable, d as derived, a as readonly } from "../../../../../chunks/index.js";
import { CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, getLocalTimeZone, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from "@internationalized/date";
import { I as Icon$1, C as Card, c as Card_header, a as Card_title, b as Card_content } from "../../../../../chunks/Icon.js";
import { tv } from "tailwind-variants";
import { L as Label, I as Input } from "../../../../../chunks/input.js";
import { a as createElHelpers, b as builder, c as createBitAttrs, d as createDispatcher, e as disabledAttrs } from "../../../../../chunks/events.js";
import { b as tick, t as toWritableStores, a as overridable, o as omit, r as removeUndefined, g as getOptionUpdater } from "../../../../../chunks/updater.js";
import { D as Drawer_header, a as Drawer_title, b as Drawer, T as Trigger$1, c as Drawer_content } from "../../../../../chunks/index3.js";
import { T as Textarea } from "../../../../../chunks/textarea.js";
import { p as page } from "../../../../../chunks/stores.js";
import { a as project } from "../../../../../chunks/project.store.js";
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT],
  rtl: [kbd.ARROW_RIGHT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$3 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: "body",
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name: name2, selector: selector2 } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = writable(false);
  const lastPointerX = writable(0);
  const pointerGraceIntent = writable(null);
  const pointerDir = writable("right");
  const currentFocusedItem = writable(null);
  const pointerMovingToSubmenu = derivedWithUnsubscribe([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  });
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = builder(name2(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": $portal ? "" : void 0,
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          setMeltMenuAttribute(node, selector2);
          const popper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              clickOutside: $closeOnOutsideClick ? {
                handler: (e) => {
                  get_store_value(onOutsideClick)?.(e);
                  if (e.defaultPrevented)
                    return;
                  if (isHTMLElement($rootActiveTrigger) && !$rootActiveTrigger.contains(e.target)) {
                    rootOpen.set(false);
                    $rootActiveTrigger.focus();
                  }
                }
              } : null,
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          });
          if (popper && popper.destroy) {
            unsubPopper = popper.destroy;
          }
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, get_store_value(loop) ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && get_store_value(typeahead) === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = builder(name2("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = get_store_value(rootOpen);
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = builder(name2("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const item = builder(name2("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector2);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (get_store_value(closeOnItemClick)) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = builder(name2("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = builder(name2("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = builder(name2("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector2);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (get_store_value(closeOnItemClick)) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = builder(name2("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = builder(name2("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector2);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (get_store_value(closeOnItemClick)) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$3,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = writable(null);
    const subOpenTimer = writable(null);
    const pointerGraceTimer = writable(0);
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(get_store_value(subIds.trigger));
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = builder(name2("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = get_store_value(subActiveTrigger);
          if (!activeTrigger)
            return;
          tick().then(() => {
            const parentMenuEl = getParentMenu(activeTrigger);
            const popper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement(parentMenuEl) ? parentMenuEl : void 0,
                clickOutside: null,
                focusTrap: null,
                escapeKeydown: null
              }
            });
            if (popper && popper.destroy) {
              unsubPopper = popper.destroy;
            }
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement(target) || !isHTMLElement(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, get_store_value(loop) ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = get_store_value(subActiveTrigger);
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && get_store_value(typeahead) === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = get_store_value(subActiveTrigger);
          if (get_store_value(isUsingKeyboard)) {
            const target = e.target;
            const submenuEl = document.getElementById(get_store_value(subIds.menu));
            if (!isHTMLElement(submenuEl) || !isHTMLElement(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement(relatedTarget) || !isHTMLElement(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = builder(name2("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector2);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(get_store_value(pointerGraceTimer));
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!get_store_value(subOpen)) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = get_store_value(typed);
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!get_store_value(subOpen)) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          if (!isFocusWithinSubmenu(get_store_value(subIds.menu))) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = get_store_value(subOpenTimer);
          if (!get_store_value(subOpen) && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(get_store_value(subIds.menu));
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(get_store_value(pointerGraceTimer));
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = builder(name2("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(get_store_value(pointerGraceTimer));
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      sleep(1).then(() => {
        const menuEl = document.getElementById(get_store_value(subIds.menu));
        if (!menuEl)
          return;
        if ($subOpen && get_store_value(isUsingKeyboard)) {
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        }
        if (!$subOpen) {
          const focusedItem = get_store_value(currentFocusedItem);
          if (focusedItem && menuEl.contains(focusedItem)) {
            removeHighlight(focusedItem);
          }
        }
        if (menuEl && !$subOpen) {
          const subTriggerEl = document.getElementById(get_store_value(subIds.trigger));
          if (!subTriggerEl || document.activeElement === subTriggerEl)
            return;
          removeHighlight(subTriggerEl);
        }
      });
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(get_store_value(rootIds.trigger));
    if (isHTMLElement(triggerEl) && get_store_value(rootOpen)) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && get_store_value(closeOnEscape)) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = get_store_value(rootActiveTrigger);
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = get_store_value(closeFocus);
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if (opts.removeScroll && $rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(get_store_value(rootIds.menu));
      if (menuEl && $rootOpen && get_store_value(isUsingKeyboard)) {
        if (get_store_value(disableFocusFirstItem)) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && get_store_value(closeOnEscape)) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    const $currentFocusedItem = get_store_value(currentFocusedItem);
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
      return;
    const $lastPointerX = get_store_value(lastPointerX);
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = get_store_value(typed);
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return get_store_value(pointerMovingToSubmenu)(e);
  }
  function getParentMenu(element) {
    const parentMenuEl = element.closest('[role="menu"]');
    if (!isHTMLElement(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    ids: rootIds,
    trigger: rootTrigger,
    menu: rootMenu,
    open: rootOpen,
    item,
    group,
    groupLabel,
    arrow: rootArrow,
    options: opts.rootOptions,
    createCheckboxItem,
    createSubmenu,
    createMenuRadioGroup,
    separator,
    handleTypeaheadSearch
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = get_store_value(prevFocusable);
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = get_store_value(nextFocusable);
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement(item));
}
function applyAttrsIfDisabled(element) {
  if (!element || !isElementDisabled(element))
    return;
  element.setAttribute("data-disabled", "");
  element.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = get_store_value(timerStore);
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element, selector2) {
  if (!element)
    return;
  const menuEl = element.closest(`${selector2()}, ${selector2("submenu")}`);
  if (!isHTMLElement(menuEl))
    return;
  element.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentFocusedItem) || !isHTMLElement(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement(submenuEl);
}
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  if (referenceVal instanceof ZonedDateTime) {
    return parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    return parseDateTime(dateStr);
  } else {
    return parseDate(dateStr);
  }
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function isBeforeOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) <= 0;
}
function isAfterOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) >= 0;
}
function isBetweenInclusive(date, start, end) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function areAllDaysBetweenValid(start, end, isUnavailable, isDisabled) {
  if (isUnavailable === void 0 && isDisabled === void 0) {
    return true;
  }
  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
    return false;
  }
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
      return false;
    }
  }
  return true;
}
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function dateStore(store, defaultValue) {
  const { set, update, subscribe: subscribe2 } = store;
  function add(duration) {
    update((d) => {
      return d.add(duration);
    });
  }
  function nextPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).add({ months: amount });
    });
  }
  function prevPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).subtract({ months: amount });
    });
  }
  function subtract(duration) {
    update((d) => {
      return d.subtract(duration);
    });
  }
  function setDate(fields, disambiguation) {
    if (disambiguation) {
      update((d) => {
        return d.set(fields, disambiguation);
      });
      return;
    }
    update((d) => {
      return d.set(fields);
    });
  }
  function reset() {
    update(() => {
      return defaultValue;
    });
  }
  function toWritable() {
    return {
      set,
      subscribe: subscribe2,
      update
    };
  }
  return {
    set,
    update,
    subscribe: subscribe2,
    add,
    subtract,
    setDate,
    reset,
    toWritable,
    nextPage,
    prevPage
  };
}
function initAnnouncer() {
  if (!isBrowser)
    return null;
  let el = document.querySelector("[data-melt-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    div.setAttribute("data-melt-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
function isCalendarCell(node) {
  if (!isHTMLElement(node))
    return false;
  if (!node.hasAttribute("data-melt-calendar-cell"))
    return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({
      ...monthProps,
      dateObj
    }));
    return months;
  }
  months.push(createMonth({
    ...monthProps,
    dateObj
  }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({
      ...monthProps,
      dateObj: nextMonth
    }));
  }
  return months;
}
function getSelectableCells(calendarId) {
  const node = document.getElementById(calendarId);
  if (!node)
    return [];
  const selectableSelector = `[data-melt-calendar-cell]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(node.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue)
    return;
  placeholder.set(parseStringToDateValue(cellValue, get_store_value(placeholder)));
}
const defaults$2 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  closeFocus: void 0,
  disableFocusFirstItem: false,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createDropdownMenu(props) {
  const withDefaults = { ...defaults$2, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = writable(null);
  const nextFocusable = writable(null);
  const prevFocusable = writable(null);
  const { trigger, menu, item, arrow, createSubmenu, createCheckboxItem, createMenuRadioGroup, separator, group, groupLabel, ids } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger,
    nextFocusable,
    prevFocusable,
    selector: "dropdown-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  return {
    ids,
    elements: {
      trigger,
      menu,
      item,
      arrow,
      separator,
      group,
      groupLabel
    },
    states: {
      open: rootOpen
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    options: rootOptions
  };
}
function getPageItems({ page: page2 = 1, totalPages, siblingCount = 1 }) {
  const pageItems = [];
  const pagesToShow = /* @__PURE__ */ new Set([1, totalPages]);
  const firstItemWithSiblings = 3 + siblingCount;
  const lastItemWithSiblings = totalPages - 2 - siblingCount;
  if (firstItemWithSiblings > lastItemWithSiblings) {
    for (let p = 2; p <= totalPages - 1; p++) {
      pagesToShow.add(p);
    }
  } else if (page2 < firstItemWithSiblings) {
    for (let p = 2; p <= Math.min(firstItemWithSiblings, totalPages); p++) {
      pagesToShow.add(p);
    }
  } else if (page2 > lastItemWithSiblings) {
    for (let p = totalPages - 1; p >= Math.max(lastItemWithSiblings, 2); p--) {
      pagesToShow.add(p);
    }
  } else {
    for (let p = Math.max(page2 - siblingCount, 2); p <= Math.min(page2 + siblingCount, totalPages); p++) {
      pagesToShow.add(p);
    }
  }
  const addPage = (value) => {
    pageItems.push({ type: "page", value, key: `page-${value}` });
  };
  const addEllipsis = () => {
    pageItems.push({ type: "ellipsis", key: `ellipsis-${pageItems.length}` });
  };
  let lastNumber = 0;
  for (const page3 of Array.from(pagesToShow).sort((a, b) => a - b)) {
    if (page3 - lastNumber > 1) {
      addEllipsis();
    }
    addPage(page3);
    lastNumber = page3;
  }
  return pageItems;
}
const defaults$1 = {
  perPage: 1,
  siblingCount: 1,
  defaultPage: 1
};
const { name: name$1, selector } = createElHelpers("pagination");
function createPagination(props) {
  const withDefaults = { ...defaults$1, ...props };
  const pageWritable = withDefaults.page ?? writable(withDefaults.defaultPage);
  const page2 = overridable(pageWritable, withDefaults?.onPageChange);
  const options = toWritableStores(omit(withDefaults, "page", "onPageChange", "defaultPage"));
  const { perPage, siblingCount, count } = options;
  const totalPages = derived([count, perPage], ([$count, $perPage]) => {
    return Math.ceil($count / $perPage);
  });
  const range = derived([page2, perPage, count], ([$page, $perPage, $count]) => {
    const start = ($page - 1) * $perPage;
    const end = Math.min(start + $perPage, $count);
    return { start, end };
  });
  const root = builder(name$1(), {
    returned: () => ({
      "data-scope": "pagination"
    })
  });
  const pages = derived([page2, totalPages, siblingCount], ([$page, $totalPages, $siblingCount]) => {
    return getPageItems({ page: $page, totalPages: $totalPages, siblingCount: $siblingCount });
  });
  const keydown = (e) => {
    const thisEl = e.target;
    if (!isHTMLElement(thisEl))
      return;
    const rootEl = thisEl.closest('[data-scope="pagination"]');
    if (!isHTMLElement(rootEl))
      return;
    const triggers = Array.from(rootEl.querySelectorAll(selector("page"))).filter((el) => isHTMLElement(el));
    const prevButton2 = rootEl.querySelector(selector("prev"));
    const nextButton2 = rootEl.querySelector(selector("next"));
    if (isHTMLElement(prevButton2)) {
      triggers.unshift(prevButton2);
    }
    if (isHTMLElement(nextButton2)) {
      triggers.push(nextButton2);
    }
    const index = triggers.indexOf(thisEl);
    if (e.key === kbd.ARROW_LEFT && index !== 0) {
      e.preventDefault();
      triggers[index - 1].focus();
    } else if (e.key === kbd.ARROW_RIGHT && index !== triggers.length - 1) {
      e.preventDefault();
      triggers[index + 1].focus();
    } else if (e.key === kbd.HOME) {
      e.preventDefault();
      triggers[0].focus();
    } else if (e.key === kbd.END) {
      e.preventDefault();
      triggers[triggers.length - 1].focus();
    }
  };
  const pageTrigger = builder(name$1("page"), {
    stores: page2,
    returned: ($page) => {
      return (pageItem) => {
        return {
          "aria-label": `Page ${pageItem.value}`,
          "data-value": pageItem.value,
          "data-selected": pageItem.value === $page ? "" : void 0
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const value = node.dataset.value;
        if (!value || Number.isNaN(+value))
          return;
        page2.set(Number(value));
      }), addMeltEventListener(node, "keydown", keydown));
      return {
        destroy: unsub
      };
    }
  });
  const prevButton = builder(name$1("prev"), {
    stores: page2,
    returned: ($page) => {
      return {
        "aria-label": "Previous",
        disabled: $page <= 1
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        page2.update((p) => Math.max(p - 1, 1));
      }), addMeltEventListener(node, "keydown", keydown));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = builder(name$1("next"), {
    stores: [page2, totalPages],
    returned: ([$page, $totalPages]) => {
      return {
        "aria-label": "Next",
        disabled: $page >= $totalPages
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const $totalPages = get_store_value(totalPages);
        page2.update((p) => Math.min(p + 1, $totalPages));
      }), addMeltEventListener(node, "keydown", keydown));
      return {
        destroy: unsub
      };
    }
  });
  return {
    elements: {
      root,
      pageTrigger,
      prevButton,
      nextButton
    },
    states: {
      range: readonly(range),
      page: page2,
      pages: readonly(pages),
      totalPages: readonly(totalPages)
    },
    options
  };
}
const defaults = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  defaultValue: {
    start: void 0,
    end: void 0
  },
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name } = createElHelpers("calendar");
const rangeCalendarIdParts = ["calendar", "accessibleHeading"];
function createRangeCalendar(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder")
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, disabled, readonly: readonly2, weekdayFormat } = options;
  const ids = toWritableStores({ ...generateIds(rangeCalendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder
  });
  const formatter = createFormatter(get_store_value(locale));
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const defaultStart = withDefaults.value ? get_store_value(withDefaults.value)?.start : void 0;
  const startValue = writable(defaultStart ?? withDefaults.defaultValue?.start);
  const defaultEnd = withDefaults.value ? get_store_value(withDefaults.value)?.end : void 0;
  const endValue = writable(defaultEnd ?? withDefaults.defaultValue?.end);
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const focusedValue = writable(null);
  const lastPressedDateValue = writable(null);
  const months = writable(createMonths({
    dateObj: get_store_value(placeholder),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  }));
  const visibleMonths = derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  });
  const isOutsideVisibleMonths = derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  });
  const isDateDisabled = derived([options.isDateDisabled, minValue, maxValue], ([$isDateDisabled, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled?.(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      return false;
    };
  });
  const isDateUnavailable = derived([options.isDateUnavailable], ([$isDateUnavailable]) => {
    return (date) => {
      if ($isDateUnavailable?.(date))
        return true;
      return false;
    };
  });
  const isStartInvalid = derived([startValue, isDateUnavailable, isDateDisabled], ([$startValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$startValue)
      return false;
    return $isDateUnavailable($startValue) || $isDateDisabled($startValue);
  });
  const isEndInvalid = derived([endValue, isDateUnavailable, isDateDisabled], ([$endValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$endValue)
      return false;
    return $isDateUnavailable($endValue) || $isDateDisabled($endValue);
  });
  const isInvalid = derived([startValue, endValue, isEndInvalid, isStartInvalid], ([$startValue, $endValue, $isEndInvalid, $isStartInvalid]) => {
    if ($isStartInvalid || $isEndInvalid) {
      return true;
    }
    if ($endValue && $startValue && isBefore($endValue, $startValue)) {
      return true;
    }
    return false;
  });
  const isNextButtonDisabled = derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  let announcer = getAnnouncer();
  const headingValue = derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = toDate($months[0].value);
      return `${formatter.fullMonthAndYear(month)}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = builder(name(), {
    stores: [fullCalendarLabel, isInvalid, ids.calendar, disabled, readonly2],
    returned: ([$fullCalendarLabel, $isInvalid, $calendarId, $disabled, $readonly]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, get_store_value(fullCalendarLabel));
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = builder(name("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = builder(name("grid"), {
    stores: [readonly2, disabled],
    returned: ([$readonly, $disabled]) => ({
      tabindex: -1,
      role: "grid",
      "aria-readonly": $readonly ? "true" : void 0,
      "aria-disabled": $disabled ? "true" : void 0,
      "data-readonly": $readonly ? "" : void 0,
      "data-disabled": $disabled ? "" : void 0
    })
  });
  const prevButton = builder(name("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = builder(name("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isSelectionStart = derived([startValue], ([$startValue]) => {
    return (date) => {
      if (!$startValue)
        return false;
      return isSameDay($startValue, date);
    };
  });
  const isSelectionEnd = derived([endValue], ([$endValue]) => {
    return (date) => {
      if (!$endValue)
        return false;
      return isSameDay($endValue, date);
    };
  });
  const isSelected = derived([startValue, endValue], ([$startValue, $endValue]) => {
    return (date) => {
      if ($startValue && isSameDay($startValue, date))
        return true;
      if ($endValue && isSameDay($endValue, date))
        return true;
      if ($endValue && $startValue) {
        return isBetweenInclusive(date, $startValue, $endValue);
      }
      return false;
    };
  });
  const highlightedRange = derived([startValue, endValue, focusedValue, isDateDisabled, isDateUnavailable], ([$startValue, $endValue, $focusedValue, $isDateDisabled, $isDateUnavailable]) => {
    if ($startValue && $endValue)
      return null;
    if (!$startValue || !$focusedValue)
      return null;
    const isStartBeforeFocused = isBefore($startValue, $focusedValue);
    const start = isStartBeforeFocused ? $startValue : $focusedValue;
    const end = isStartBeforeFocused ? $focusedValue : $startValue;
    if (isSameDay(start.add({ days: 1 }), end)) {
      return {
        start,
        end
      };
    }
    const isValid = areAllDaysBetweenValid(start, end, $isDateUnavailable, $isDateDisabled);
    if (isValid) {
      return {
        start,
        end
      };
    }
    return null;
  });
  const cell = builder(name("cell"), {
    stores: [
      isSelected,
      isSelectionEnd,
      isSelectionStart,
      highlightedRange,
      isDateDisabled,
      isDateUnavailable,
      placeholder,
      isOutsideVisibleMonths
    ],
    returned: ([$isSelected, $isSelectionEnd, $isSelectionStart, $highlightedRange, $isDateDisabled, $isDateUnavailable, $placeholder, $isOutsideVisibleMonths]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled(cellValue);
        const isUnavailable = $isDateUnavailable(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isSelectedDate = $isSelected(cellValue);
        const isSelectionStart2 = $isSelectionStart(cellValue);
        const isSelectionEnd2 = $isSelectionEnd(cellValue);
        const isHighlighted = $highlightedRange ? isBetweenInclusive(cellValue, $highlightedRange.start, $highlightedRange.end) : false;
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-selection-start": isSelectionStart2 ? true : void 0,
          "data-selection-end": isSelectionEnd2 ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          "data-highlighted": isHighlighted ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(e, parseStringToDateValue(args.value, get_store_value(placeholder)));
      }), addMeltEventListener(node, "mouseenter", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, get_store_value(placeholder)));
      }), addMeltEventListener(node, "focusin", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, get_store_value(placeholder)));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([placeholder, weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$placeholder, $weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    if (!isBrowser || !$placeholder)
      return;
    const $visibleMonths = get_store_value(visibleMonths);
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser)
      return;
    const node = document.getElementById(get_store_value(ids.accessibleHeading));
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect([startValue], ([$startValue]) => {
    if ($startValue && get_store_value(placeholder) !== $startValue) {
      placeholder.set($startValue);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = get_store_value(ids.accessibleHeading);
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = get_store_value(months);
    const $numberOfMonths = get_store_value(numberOfMonths);
    if (get_store_value(pagedNavigation)) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: get_store_value(weekStartsOn),
        locale: get_store_value(locale),
        fixedWeeks: get_store_value(fixedWeeks),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = get_store_value(months);
    const $numberOfMonths = get_store_value(numberOfMonths);
    if (get_store_value(pagedNavigation)) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: get_store_value(weekStartsOn),
        locale: get_store_value(locale),
        fixedWeeks: get_store_value(fixedWeeks),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    if (month < 0 || month > 11)
      throw new Error("Month must be between 0 and 11");
    placeholder.setDate({ month });
  }
  function handleCellClick(e, date) {
    const $isDateDisabled = get_store_value(isDateDisabled);
    const $isDateUnavailable = get_store_value(isDateUnavailable);
    if ($isDateDisabled(date) || $isDateUnavailable(date))
      return;
    const $lastPressedDate = get_store_value(lastPressedDateValue);
    lastPressedDateValue.set(date);
    const $startValue = get_store_value(startValue);
    const $endValue = get_store_value(endValue);
    const $highlightedRange = get_store_value(highlightedRange);
    if ($startValue && $highlightedRange === null) {
      if (isSameDay($startValue, date) && !get_store_value(preventDeselect) && !$endValue) {
        startValue.set(void 0);
        placeholder.set(date);
        announcer.announce("Selected date is now empty.", "polite");
        return;
      } else if (!$endValue) {
        e.preventDefault();
        if ($lastPressedDate && isSameDay($lastPressedDate, date)) {
          startValue.set(date);
          announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        }
        return;
      }
    }
    if ($startValue && isSameDay($startValue, date) && !get_store_value(preventDeselect) && !$endValue) {
      startValue.set(void 0);
      placeholder.set(date);
      announcer.announce("Selected date is now empty.", "polite");
      return;
    }
    if (!$startValue) {
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if (!$endValue) {
      endValue.update(() => {
        announcer.announce(`Selected Dates: ${formatter.selectedDate($startValue, false)} to ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if ($endValue && $startValue) {
      endValue.set(void 0);
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    }
  }
  const SELECT_KEYS = [kbd.ENTER, kbd.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(e, parseStringToDateValue(cellValue, get_store_value(placeholder)));
    }
  }
  function shiftFocus(node, add) {
    const $calendarId = get_store_value(ids.calendar);
    const candidateCells = getSelectableCells($calendarId);
    if (!candidateCells.length) {
      return;
    }
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (get_store_value(isPrevButtonDisabled))
        return;
      const $months = get_store_value(months);
      const firstMonth = $months[0].value;
      const $numberOfMonths = get_store_value(numberOfMonths);
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (get_store_value(isNextButtonDisabled))
        return;
      const $months = get_store_value(months);
      const firstMonth = $months[0].value;
      const $numberOfMonths = get_store_value(numberOfMonths);
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue], ([$isDateDisabled, $placeholder, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  effect([value], ([$value]) => {
    const $startValue = get_store_value(startValue);
    const $endValue = get_store_value(endValue);
    if ($value?.start && $value?.end) {
      if ($value.start !== $startValue) {
        startValue.set($value.start);
      }
      if ($value.end !== $endValue) {
        endValue.set($value.end);
      }
      return;
    }
  });
  effect([startValue, endValue], ([$startValue, $endValue]) => {
    const $value = get_store_value(value);
    if ($value && $value?.start === $startValue && $value?.end === $endValue)
      return;
    if ($startValue && $endValue) {
      value.update((prev) => {
        if (prev?.start === $startValue && prev?.end === $endValue) {
          return prev;
        }
        if (isBefore($endValue, $startValue)) {
          return {
            start: $endValue,
            end: $startValue
          };
        } else {
          return {
            start: $startValue,
            end: $endValue
          };
        }
      });
    } else if ($value && $value.start && $value.end) {
      value.set({
        start: void 0,
        end: void 0
      });
    }
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      weekdays,
      headingValue,
      value,
      startValue,
      endValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateUnavailable
    },
    options,
    ids
  };
}
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx$2() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx$2(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$2();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["href", "asChild", "disabled", "el"]);
  let $item, $$unsubscribe_item;
  let { href = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { disabled = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = getCtx$2();
  $$unsubscribe_item = subscribe(item, (value) => $item = value);
  createDispatcher();
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $item;
  attrs = {
    ...getAttrs("item"),
    ...disabledAttrs(disabled)
  };
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object(builder2),
        escape_object($$restProps)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder: builder2 }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}`}`;
});
const Menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $separator, $$unsubscribe_separator;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { separator }, getAttrs } = getCtx$2();
  $$unsubscribe_separator = subscribe(separator, (value) => $separator = value);
  const attrs = getAttrs("separator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $separator;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_separator();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { disableFocusFirstItem = void 0 } = $$props;
  let { closeOnItemClick = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx$2({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0)
    $$bindings.dir(dir);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0)
    $$bindings.typeahead(typeahead);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  if ($$props.disableFocusFirstItem === void 0 && $$bindings.disableFocusFirstItem && disableFocusFirstItem !== void 0)
    $$bindings.disableFocusFirstItem(disableFocusFirstItem);
  if ($$props.closeOnItemClick === void 0 && $$bindings.closeOnItemClick && closeOnItemClick !== void 0)
    $$bindings.closeOnItemClick(closeOnItemClick);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0)
    $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("dir", dir);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("disableFocusFirstItem", disableFocusFirstItem);
  }
  {
    updateOption("typeahead", typeahead);
  }
  {
    updateOption("closeOnItemClick", closeOnItemClick);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $menu, $$unsubscribe_menu;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx$2();
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0)
    $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0)
    $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0)
    $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0)
    $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0)
    $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0)
    $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0)
    $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0)
    $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.menu.set(id);
    }
  }
  builder2 = $menu;
  {
    Object.assign(builder2, attrs);
  }
  {
    updatePositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  $$unsubscribe_menu();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx$2();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder2 = $trigger;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([escape_object(builder2), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`}`;
});
function getPaginationData() {
  const NAME = "pagination";
  const PARTS = ["root", "prev-button", "next-button", "page"];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getPaginationData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const pagination = { ...createPagination(removeUndefined(props)), getAttrs };
  setContext(NAME, pagination);
  return {
    ...pagination,
    updateOption: getOptionUpdater(pagination.options)
  };
}
function getCtx$1() {
  const { NAME } = getPaginationData();
  return getContext(NAME);
}
const Pagination$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["count", "page", "onPageChange", "perPage", "siblingCount", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let $pages, $$unsubscribe_pages;
  let $range, $$unsubscribe_range;
  let { count } = $$props;
  let { page: page2 = void 0 } = $$props;
  let { onPageChange = void 0 } = $$props;
  let { perPage = void 0 } = $$props;
  let { siblingCount = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { pages, range, page: localPage }, getAttrs, updateOption } = setCtx$1({
    count,
    perPage,
    siblingCount,
    defaultPage: page2,
    onPageChange: ({ next }) => {
      if (page2 !== next) {
        onPageChange?.(next);
        page2 = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  $$unsubscribe_pages = subscribe(pages, (value) => $pages = value);
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  const attrs = getAttrs("root");
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.onPageChange === void 0 && $$bindings.onPageChange && onPageChange !== void 0)
    $$bindings.onPageChange(onPageChange);
  if ($$props.perPage === void 0 && $$bindings.perPage && perPage !== void 0)
    $$bindings.perPage(perPage);
  if ($$props.siblingCount === void 0 && $$bindings.siblingCount && siblingCount !== void 0)
    $$bindings.siblingCount(siblingCount);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  page2 !== void 0 && localPage.set(page2);
  builder2 = $root;
  {
    Object.assign(builder2, attrs);
  }
  {
    updateOption("count", count);
  }
  {
    updateOption("perPage", perPage);
  }
  {
    updateOption("siblingCount", siblingCount);
  }
  $$unsubscribe_root();
  $$unsubscribe_pages();
  $$unsubscribe_range();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2, pages: $pages, range: $range }) : ``}` : `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2, pages: $pages, range: $range }) : ``}</div>`}`;
});
const Pagination_prev_button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $prevButton, $$unsubscribe_prevButton;
  let { asChild = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { prevButton }, getAttrs } = getCtx$1();
  $$unsubscribe_prevButton = subscribe(prevButton, (value) => $prevButton = value);
  const attrs = getAttrs("prev-button");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $prevButton;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_prevButton();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([escape_object(builder2), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`}`;
});
const Pagination_next_button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $nextButton, $$unsubscribe_nextButton;
  let { asChild = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { nextButton }, getAttrs } = getCtx$1();
  $$unsubscribe_nextButton = subscribe(nextButton, (value) => $nextButton = value);
  const attrs = getAttrs("next-button");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $nextButton;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_nextButton();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([escape_object(builder2), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`}`;
});
const Pagination_page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "page", "el"]);
  let $pageTrigger, $$unsubscribe_pageTrigger;
  let { asChild = void 0 } = $$props;
  let { page: page2 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { pageTrigger }, getAttrs } = getCtx$1();
  $$unsubscribe_pageTrigger = subscribe(pageTrigger, (value) => $pageTrigger = value);
  const attrs = getAttrs("page");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $pageTrigger(page2);
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_pageTrigger();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([{ type: "button" }, escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ` ${escape(page2.value)} `}</button>`}`;
});
function getRangeCalendarData() {
  const NAME = "calendar";
  const PARTS = [
    "root",
    "prev-button",
    "next-button",
    "heading",
    "grid",
    "day",
    "header",
    "grid-head",
    "head-cell",
    "grid-body",
    "cell",
    "grid-row"
  ];
  return { NAME, PARTS };
}
function setCtx(props) {
  const { NAME, PARTS } = getRangeCalendarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const rangeCalendar = { ...createRangeCalendar(removeUndefined(props)), getAttrs };
  setContext(NAME, rangeCalendar);
  return {
    ...rangeCalendar,
    updateOption: getOptionUpdater(rangeCalendar.options)
  };
}
function getCtx() {
  const { NAME } = getRangeCalendarData();
  return getContext(NAME);
}
const Range_calendar$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, [
    "placeholder",
    "onPlaceholderChange",
    "value",
    "onValueChange",
    "preventDeselect",
    "minValue",
    "maxValue",
    "pagedNavigation",
    "weekStartsOn",
    "locale",
    "isDateUnavailable",
    "isDateDisabled",
    "disabled",
    "readonly",
    "fixedWeeks",
    "calendarLabel",
    "asChild",
    "id",
    "weekdayFormat",
    "initialFocus",
    "startValue",
    "numberOfMonths",
    "el"
  ]);
  let $localMonths, $$unsubscribe_localMonths;
  let $calendar, $$unsubscribe_calendar;
  let $localStartValue, $$unsubscribe_localStartValue;
  let $weekdays, $$unsubscribe_weekdays;
  let $endValue, $$unsubscribe_endValue;
  let { placeholder = void 0 } = $$props;
  let { onPlaceholderChange = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { preventDeselect = void 0 } = $$props;
  let { minValue = void 0 } = $$props;
  let { maxValue = void 0 } = $$props;
  let { pagedNavigation = void 0 } = $$props;
  let { weekStartsOn = void 0 } = $$props;
  let { locale = void 0 } = $$props;
  let { isDateUnavailable = void 0 } = $$props;
  let { isDateDisabled = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { readonly: readonly2 = void 0 } = $$props;
  let { fixedWeeks = void 0 } = $$props;
  let { calendarLabel = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { weekdayFormat = void 0 } = $$props;
  let { initialFocus = false } = $$props;
  let { startValue = void 0 } = $$props;
  let { numberOfMonths = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { calendar }, states: { value: localValue, placeholder: localPlaceholder, months: localMonths, weekdays, startValue: localStartValue, endValue }, updateOption, ids, getAttrs } = setCtx({
    defaultPlaceholder: placeholder,
    defaultValue: value,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly: readonly2,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    numberOfMonths,
    onPlaceholderChange: ({ next }) => {
      if (placeholder !== next) {
        onPlaceholderChange?.(next);
        placeholder = next;
      }
      return next;
    },
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_calendar = subscribe(calendar, (value2) => $calendar = value2);
  $$unsubscribe_localMonths = subscribe(localMonths, (value2) => $localMonths = value2);
  $$unsubscribe_weekdays = subscribe(weekdays, (value2) => $weekdays = value2);
  $$unsubscribe_localStartValue = subscribe(localStartValue, (value2) => $localStartValue = value2);
  $$unsubscribe_endValue = subscribe(endValue, (value2) => $endValue = value2);
  const attrs = getAttrs("root");
  createDispatcher();
  let months = $localMonths;
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.onPlaceholderChange === void 0 && $$bindings.onPlaceholderChange && onPlaceholderChange !== void 0)
    $$bindings.onPlaceholderChange(onPlaceholderChange);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.preventDeselect === void 0 && $$bindings.preventDeselect && preventDeselect !== void 0)
    $$bindings.preventDeselect(preventDeselect);
  if ($$props.minValue === void 0 && $$bindings.minValue && minValue !== void 0)
    $$bindings.minValue(minValue);
  if ($$props.maxValue === void 0 && $$bindings.maxValue && maxValue !== void 0)
    $$bindings.maxValue(maxValue);
  if ($$props.pagedNavigation === void 0 && $$bindings.pagedNavigation && pagedNavigation !== void 0)
    $$bindings.pagedNavigation(pagedNavigation);
  if ($$props.weekStartsOn === void 0 && $$bindings.weekStartsOn && weekStartsOn !== void 0)
    $$bindings.weekStartsOn(weekStartsOn);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.isDateUnavailable === void 0 && $$bindings.isDateUnavailable && isDateUnavailable !== void 0)
    $$bindings.isDateUnavailable(isDateUnavailable);
  if ($$props.isDateDisabled === void 0 && $$bindings.isDateDisabled && isDateDisabled !== void 0)
    $$bindings.isDateDisabled(isDateDisabled);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly2 !== void 0)
    $$bindings.readonly(readonly2);
  if ($$props.fixedWeeks === void 0 && $$bindings.fixedWeeks && fixedWeeks !== void 0)
    $$bindings.fixedWeeks(fixedWeeks);
  if ($$props.calendarLabel === void 0 && $$bindings.calendarLabel && calendarLabel !== void 0)
    $$bindings.calendarLabel(calendarLabel);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.weekdayFormat === void 0 && $$bindings.weekdayFormat && weekdayFormat !== void 0)
    $$bindings.weekdayFormat(weekdayFormat);
  if ($$props.initialFocus === void 0 && $$bindings.initialFocus && initialFocus !== void 0)
    $$bindings.initialFocus(initialFocus);
  if ($$props.startValue === void 0 && $$bindings.startValue && startValue !== void 0)
    $$bindings.startValue(startValue);
  if ($$props.numberOfMonths === void 0 && $$bindings.numberOfMonths && numberOfMonths !== void 0)
    $$bindings.numberOfMonths(numberOfMonths);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.calendar.set(id);
    }
  }
  startValue = $localStartValue;
  value !== void 0 && localValue.set(value);
  placeholder !== void 0 && localPlaceholder.set(placeholder);
  {
    updateOption("preventDeselect", preventDeselect);
  }
  {
    updateOption("minValue", minValue);
  }
  {
    updateOption("maxValue", maxValue);
  }
  {
    updateOption("pagedNavigation", pagedNavigation);
  }
  {
    updateOption("weekStartsOn", weekStartsOn);
  }
  {
    updateOption("locale", locale);
  }
  {
    updateOption("isDateUnavailable", isDateUnavailable);
  }
  {
    updateOption("isDateDisabled", isDateDisabled);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("readonly", readonly2);
  }
  {
    updateOption("fixedWeeks", fixedWeeks);
  }
  {
    updateOption("calendarLabel", calendarLabel);
  }
  {
    updateOption("weekdayFormat", weekdayFormat);
  }
  {
    updateOption("numberOfMonths", numberOfMonths);
  }
  builder2 = $calendar;
  {
    Object.assign(builder2, attrs);
  }
  months = $localMonths;
  $$unsubscribe_localMonths();
  $$unsubscribe_calendar();
  $$unsubscribe_localStartValue();
  $$unsubscribe_weekdays();
  $$unsubscribe_endValue();
  return `${asChild ? `${slots.default ? slots.default({
    builder: builder2,
    months,
    weekdays: $weekdays,
    startValue: $localStartValue,
    endValue: $endValue
  }) : ``}` : `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({
    builder: builder2,
    months,
    weekdays: $weekdays,
    startValue: $localStartValue,
    endValue: $endValue
  }) : ``}</div>`}`;
});
const Range_calendar_day$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let disabled;
  let unavailable;
  let $$restProps = compute_rest_props($$props, ["date", "month", "asChild", "el"]);
  let $isDateUnavailable, $$unsubscribe_isDateUnavailable;
  let $isDateDisabled, $$unsubscribe_isDateDisabled;
  let $cell, $$unsubscribe_cell;
  let { date } = $$props;
  let { month } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { cell }, helpers: { isDateDisabled, isDateUnavailable }, getAttrs } = getCtx();
  $$unsubscribe_cell = subscribe(cell, (value) => $cell = value);
  $$unsubscribe_isDateDisabled = subscribe(isDateDisabled, (value) => $isDateDisabled = value);
  $$unsubscribe_isDateUnavailable = subscribe(isDateUnavailable, (value) => $isDateUnavailable = value);
  const attrs = getAttrs("day");
  createDispatcher();
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.month === void 0 && $$bindings.month && month !== void 0)
    $$bindings.month(month);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $cell(date, month);
  {
    Object.assign(builder2, attrs);
  }
  disabled = $isDateDisabled(date);
  unavailable = $isDateUnavailable(date);
  $$unsubscribe_isDateUnavailable();
  $$unsubscribe_isDateDisabled();
  $$unsubscribe_cell();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2, disabled, unavailable }) : ``}` : `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2, disabled, unavailable }) : ` ${escape(date.day)} `}</div>`}`;
});
const Range_calendar_grid$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $grid, $$unsubscribe_grid;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { grid }, getAttrs } = getCtx();
  $$unsubscribe_grid = subscribe(grid, (value) => $grid = value);
  const attrs = getAttrs("grid");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $grid;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_grid();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<table${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</table>`}`;
});
const Range_calendar_grid_body$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getAttrs } = getCtx();
  const attrs = getAttrs("grid-body");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<tbody${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</tbody>`}`;
});
const Range_calendar_cell$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["date", "asChild", "el"]);
  let $isDateUnavailable, $$unsubscribe_isDateUnavailable;
  let $isDateDisabled, $$unsubscribe_isDateDisabled;
  let { date } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isDateDisabled, isDateUnavailable }, getAttrs } = getCtx();
  $$unsubscribe_isDateDisabled = subscribe(isDateDisabled, (value) => $isDateDisabled = value);
  $$unsubscribe_isDateUnavailable = subscribe(isDateUnavailable, (value) => $isDateUnavailable = value);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  attrs = {
    ...getAttrs("cell"),
    "aria-disabled": $isDateDisabled(date) || $isDateUnavailable(date),
    role: "gridcell"
  };
  $$unsubscribe_isDateUnavailable();
  $$unsubscribe_isDateDisabled();
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<td${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</td>`}`;
});
const Range_calendar_grid_head$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getAttrs } = getCtx();
  const attrs = {
    ...getAttrs("grid-head"),
    "aria-hidden": true
  };
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<thead${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</thead>`}`;
});
const Range_calendar_head_cell$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getAttrs } = getCtx();
  const attrs = getAttrs("head-cell");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<th${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</th>`}`;
});
const Range_calendar_grid_row$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getAttrs } = getCtx();
  const attrs = getAttrs("grid-row");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<tr${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</tr>`}`;
});
const Range_calendar_header$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getAttrs } = getCtx();
  const attrs = getAttrs("header");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<header${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</header>`}`;
});
const Range_calendar_heading$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $heading, $$unsubscribe_heading;
  let $headingValue, $$unsubscribe_headingValue;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { heading }, states: { headingValue }, getAttrs } = getCtx();
  $$unsubscribe_heading = subscribe(heading, (value) => $heading = value);
  $$unsubscribe_headingValue = subscribe(headingValue, (value) => $headingValue = value);
  const attrs = getAttrs("heading");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $heading;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_heading();
  $$unsubscribe_headingValue();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2, headingValue: $headingValue }) : ``}` : `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2, headingValue: $headingValue }) : ` ${escape($headingValue)} `}</div>`}`;
});
const Range_calendar_next_button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $nextButton, $$unsubscribe_nextButton;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { nextButton }, getAttrs } = getCtx();
  $$unsubscribe_nextButton = subscribe(nextButton, (value) => $nextButton = value);
  const attrs = getAttrs("next-button");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $nextButton;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_nextButton();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([escape_object(builder2), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`}`;
});
const Range_calendar_prev_button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $prevButton, $$unsubscribe_prevButton;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { prevButton }, getAttrs } = getCtx();
  $$unsubscribe_prevButton = subscribe(prevButton, (value) => $prevButton = value);
  const attrs = getAttrs("prev-button");
  createDispatcher();
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $prevButton;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_prevButton();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([escape_object(builder2), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`}`;
});
var FeedbackType = /* @__PURE__ */ ((FeedbackType2) => {
  FeedbackType2["Bug"] = "bug";
  FeedbackType2["Enhance"] = "enhance";
  return FeedbackType2;
})(FeedbackType || {});
function humanizeType(type) {
  if (type === "bug") {
    return "Bug";
  }
  return "Enhance";
}
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  return `  ${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronLeft = Chevron_left;
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `  ${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChevronRight = Chevron_right;
const More_horizontal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "1" }],
    ["circle", { "cx": "19", "cy": "12", "r": "1" }],
    ["circle", { "cx": "5", "cy": "12", "r": "1" }]
  ];
  return `  ${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "more-horizontal" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const MoreHorizontal = More_horizontal;
const buildQuery = (filters) => {
  const queryParams = new URLSearchParams({
    status: filters.status,
    limit: filters.limit.toString(),
    offset: filters.offset.toString()
  });
  if (filters.startDate && filters.endDate) {
    queryParams.set("startDate", filters.startDate.toISOString());
    queryParams.set("endDate", filters.endDate.toISOString());
  }
  if (filters.term) {
    queryParams.set("term", filters.term);
  }
  return queryParams.toString();
};
const listNewFeedback = async (projectId, limit2 = 10, offset = 0) => {
  if (projectId === "") {
    return;
  }
  const filters = {
    status: "new",
    limit: limit2,
    offset
  };
  if (get_store_value(filter).text) {
    filters.term = get_store_value(filter).text;
  }
  if (get_store_value(filter).rangeDate.start && get_store_value(filter).rangeDate.end) {
    filters.startDate = get_store_value(filter).rangeDate.start?.toDate(getLocalTimeZone());
    filters.endDate = get_store_value(filter).rangeDate.end?.toDate(getLocalTimeZone());
  }
  const response = await apiClient.get(`/feedback/${projectId}?${buildQuery(filters)}`);
  newFeedbacks.set({
    feedbacks: response.data.data.map((f) => {
      return {
        ...f,
        createdAt: new Date(f.createdAt)
      };
    }),
    total: response.data.total,
    limit: filters.limit,
    offset: filters.offset,
    projectId
  });
};
const listVotingFeedback = async (projectId, limit2 = 10, offset = 0) => {
  if (projectId === "") {
    return;
  }
  const filters = {
    status: "voting",
    limit: limit2,
    offset
  };
  if (get_store_value(filter).text) {
    filters.term = get_store_value(filter).text;
  }
  if (get_store_value(filter).rangeDate.start && get_store_value(filter).rangeDate.end) {
    filters.startDate = get_store_value(filter).rangeDate.start?.toDate(getLocalTimeZone());
    filters.endDate = get_store_value(filter).rangeDate.end?.toDate(getLocalTimeZone());
  }
  const response = await apiClient.get(`/feedback/${projectId}?${buildQuery(filters)}`);
  votingFeedbacks.set({
    feedbacks: response.data.data.map((f) => {
      return {
        ...f,
        createdAt: new Date(f.createdAt)
      };
    }),
    total: response.data.total,
    limit: filters.limit,
    offset: filters.offset,
    projectId
  });
};
const defaultFilterValue = {
  text: "",
  rangeDate: {
    start: void 0,
    end: void 0
  }
};
const filter = writable(defaultFilterValue);
const newFeedbacks = writable({ feedbacks: [], total: 0, limit: 10, offset: 0, projectId: "" });
const votingFeedbacks = writable({ feedbacks: [], total: 0, limit: 10, offset: 0, projectId: "" });
filter.subscribe((filter2) => {
  listNewFeedback(get_store_value(newFeedbacks).projectId, get_store_value(newFeedbacks).limit, get_store_value(newFeedbacks).offset);
  listVotingFeedback(get_store_value(votingFeedbacks).projectId, get_store_value(votingFeedbacks).limit, get_store_value(votingFeedbacks).offset);
});
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "href", "variant"]);
  let { class: className = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { variant = "default" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  return `${((tag) => {
    return tag ? `<${href ? "a" : "span"}${spread(
      [
        { href: escape_attribute_value(href) },
        {
          class: escape_attribute_value(cn(badgeVariants({ variant, className })))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "span")}`;
});
const badgeVariants = tv({
  base: "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none select-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default: "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
      secondary: "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
      destructive: "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
      outline: "text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
const Dropdown_menu_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0)
    $$bindings.inset(inset);
  return `${validate_component(Menu_item, "DropdownMenuPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)
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
const Dropdown_menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Menu_content, "DropdownMenuPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
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
const Dropdown_menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Menu_separator, "DropdownMenuPrimitive.Separator").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("-mx-1 my-1 h-px bg-muted", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Root = Menu;
const Trigger = Menu_trigger;
const Range_calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "placeholder", "weekdayFormat", "startValue", "class"]);
  let { value = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { weekdayFormat = "short" } = $$props;
  let { startValue = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.weekdayFormat === void 0 && $$bindings.weekdayFormat && weekdayFormat !== void 0)
    $$bindings.weekdayFormat(weekdayFormat);
  if ($$props.startValue === void 0 && $$bindings.startValue && startValue !== void 0)
    $$bindings.startValue(startValue);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Range_calendar$1, "RangeCalendarPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { weekdayFormat }, { class: cn("p-3", className) }, $$restProps, { value }, { placeholder }, { startValue }),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        },
        placeholder: ($$value) => {
          placeholder = $$value;
          $$settled = false;
        },
        startValue: ($$value) => {
          startValue = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ months, weekdays }) => {
          return `${validate_component(Range_calendar_header, "RangeCalendar.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Range_calendar_prev_button, "RangeCalendar.PrevButton").$$render($$result, {}, {}, {})} ${validate_component(Range_calendar_heading, "RangeCalendar.Heading").$$render($$result, {}, {}, {})} ${validate_component(Range_calendar_next_button, "RangeCalendar.NextButton").$$render($$result, {}, {}, {})}`;
            }
          })} ${validate_component(Range_calendar_months, "RangeCalendar.Months").$$render($$result, {}, {}, {
            default: () => {
              return `${each(months, (month) => {
                return `${validate_component(Range_calendar_grid, "RangeCalendar.Grid").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Range_calendar_grid_head, "RangeCalendar.GridHead").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Range_calendar_grid_row, "RangeCalendar.GridRow").$$render($$result, { class: "flex" }, {}, {
                          default: () => {
                            return `${each(weekdays, (weekday) => {
                              return `${validate_component(Range_calendar_head_cell, "RangeCalendar.HeadCell").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${escape(weekday.slice(0, 2))} `;
                                }
                              })}`;
                            })} `;
                          }
                        })} `;
                      }
                    })} ${validate_component(Range_calendar_grid_body, "RangeCalendar.GridBody").$$render($$result, {}, {}, {
                      default: () => {
                        return `${each(month.weeks, (weekDates) => {
                          return `${validate_component(Range_calendar_grid_row, "RangeCalendar.GridRow").$$render($$result, { class: "w-full mt-2" }, {}, {
                            default: () => {
                              return `${each(weekDates, (date) => {
                                return `${validate_component(Range_calendar_cell, "RangeCalendar.Cell").$$render($$result, { date }, {}, {
                                  default: () => {
                                    return `${validate_component(Range_calendar_day, "RangeCalendar.Day").$$render($$result, { date, month: month.value }, {}, {})} `;
                                  }
                                })}`;
                              })} `;
                            }
                          })}`;
                        })} `;
                      }
                    })} `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Range_calendar_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["date", "class"]);
  let { date } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_cell$1, "RangeCalendarPrimitive.Cell").$$render(
    $$result,
    Object.assign(
      {},
      { date },
      {
        class: cn("h-9 w-9 text-center text-sm p-0 relative [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-accent/50 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md focus-within:relative focus-within:z-20", className)
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
const Range_calendar_day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["date", "month", "class"]);
  let { date } = $$props;
  let { month } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.month === void 0 && $$bindings.month && month !== void 0)
    $$bindings.month(month);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_day$1, "RangeCalendarPrimitive.Day").$$render(
    $$result,
    Object.assign(
      {},
      { date },
      { month },
      {
        class: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal data-[selected]:opacity-100",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
          // Selection Start
          "data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground",
          // Selection End
          "data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground",
          // Outside months
          "data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30 data-[outside-month]:pointer-events-none",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:line-through data-[unavailable]:text-destructive-foreground",
          className
        )
      },
      $$restProps
    ),
    {},
    {
      default: ({ disabled, unavailable, builder: builder2 }) => {
        return `${slots.default ? slots.default({ disabled, unavailable, builder: builder2 }) : ` ${escape(date.day)} `}`;
      }
    }
  )}`;
});
const Range_calendar_grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_grid$1, "RangeCalendarPrimitive.Grid").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("w-full border-collapse space-y-1", className)
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
const Range_calendar_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_header$1, "RangeCalendarPrimitive.Header").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("flex justify-between pt-1 relative items-center w-full", className)
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
const Range_calendar_months = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 mt-4", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Range_calendar_grid_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_grid_row$1, "RangeCalendarPrimitive.GridRow").$$render($$result, Object.assign({}, { class: cn("flex", className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Range_calendar_heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_heading$1, "RangeCalendarPrimitive.Heading").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm font-medium", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ headingValue }) => {
        return `${slots.default ? slots.default({ headingValue }) : ` ${escape(headingValue)} `}`;
      }
    }
  )}`;
});
const Range_calendar_grid_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_grid_body$1, "RangeCalendarPrimitive.GridBody").$$render($$result, Object.assign({}, { class: cn(className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Range_calendar_grid_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_grid_head$1, "RangeCalendarPrimitive.GridHead").$$render($$result, Object.assign({}, { class: cn(className) }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Range_calendar_head_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_head_cell$1, "RangeCalendarPrimitive.HeadCell").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", className)
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
const Range_calendar_next_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_next_button$1, "RangeCalendarPrimitive.NextButton").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ builder: builder2 }) => {
        return `${slots.default ? slots.default({ builder: builder2 }) : ` ${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "h-4 w-4" }, {}, {})} `}`;
      }
    }
  )}`;
});
const Range_calendar_prev_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Range_calendar_prev_button$1, "RangeCalendarPrimitive.PrevButton").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ builder: builder2 }) => {
        return `${slots.default ? slots.default({ builder: builder2 }) : ` ${validate_component(ChevronLeft, "ChevronLeft").$$render($$result, { class: "h-4 w-4" }, {}, {})} `}`;
      }
    }
  )}`;
});
const Add_feedback_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_newFeedbacks;
  let $$unsubscribe_votingFeedbacks;
  let $page, $$unsubscribe_page;
  $$unsubscribe_newFeedbacks = subscribe(newFeedbacks, (value) => value);
  $$unsubscribe_votingFeedbacks = subscribe(votingFeedbacks, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { onClose } = $$props;
  let { voting } = $$props;
  let content;
  $page.params.id;
  Intl.DateTimeFormat().resolvedOptions().locale;
  const handleSelectChange = (data) => {
    if (data) {
      data.value;
    }
  };
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
    $$bindings.onClose(onClose);
  if ($$props.voting === void 0 && $$bindings.voting && voting !== void 0)
    $$bindings.voting(voting);
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
            return `New feedback`;
          }
        })}`;
      }
    })} <div class="grid gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "content-feedback-input" }, {}, {
      default: () => {
        return `Content`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        class: "input",
        id: "content-feedback-input",
        value: content
      },
      {
        value: ($$value) => {
          content = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2">${validate_component(Root$1, "Select.Root").$$render($$result, { onSelectedChange: handleSelectChange }, {}, {
      default: () => {
        return `${validate_component(Label, "Label").$$render($$result, { class: "mb-4" }, {}, {
          default: () => {
            return `Type`;
          }
        })} ${validate_component(Select_trigger, "Select.Trigger").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Value, "Select.Value").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: "enhance" }, {}, {
              default: () => {
                return `Enhance`;
              }
            })} ${validate_component(Select_item, "Select.Item").$$render($$result, { value: "bug" }, {}, {
              default: () => {
                return `Bug`;
              }
            })}`;
          }
        })}`;
      }
    })}</div> <div class="grid gap-1">${validate_component(Button, "Button").$$render($$result, { type: "button" }, {}, {
      default: () => {
        return `Create`;
      }
    })}</div> <div class="grid gap-1 mb-4">${validate_component(Button, "Button").$$render($$result, { type: "button", variant: "outline" }, {}, {
      default: () => {
        return `Cancel`;
      }
    })}</div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_newFeedbacks();
  $$unsubscribe_votingFeedbacks();
  $$unsubscribe_page();
  return $$rendered;
});
const Feedback_panel_toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasFilter;
  let $filter, $$unsubscribe_filter;
  $$unsubscribe_filter = subscribe(filter, (value) => $filter = value);
  let openAddFeedbackDrawer = false;
  const toggleDrawer = () => openAddFeedbackDrawer = !openAddFeedbackDrawer;
  let { fromVoting = false } = $$props;
  if ($$props.fromVoting === void 0 && $$bindings.fromVoting && fromVoting !== void 0)
    $$bindings.fromVoting(fromVoting);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    hasFilter = () => {
      return $filter.text.length > 2 || $filter.rangeDate.start && $filter.rangeDate.end;
    };
    $$rendered = `<div class="flex flex-1 items-center justify-between"><div class="flex flex-row items-center space-x-2">${validate_component(Input, "Input").$$render(
      $$result,
      {
        placeholder: "Search...",
        class: "h-8 w-[150px] lg:w-[250px]",
        type: "text",
        value: $filter.text
      },
      {
        value: ($$value) => {
          $filter.text = $$value;
          $$settled = false;
        }
      },
      {}
    )} <span>${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
          default: ({ builder: builder2 }) => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                builders: [builder2],
                variant: "outline",
                class: "h-8"
              },
              {},
              {
                default: () => {
                  return `<span data-svelte-h="svelte-1cko4yc">Filter date</span> ${$filter.rangeDate.start && $filter.rangeDate.end ? `${validate_component(Separator, "Separator").$$render(
                    $$result,
                    {
                      orientation: "vertical",
                      class: "mx-2 h-4"
                    },
                    {},
                    {}
                  )} ${validate_component(Badge, "Badge").$$render(
                    $$result,
                    {
                      variant: "secondary",
                      class: "rounded-sm px-1 font-normal lg:hidden"
                    },
                    {},
                    {
                      default: () => {
                        return `${escape($filter.rangeDate.start.toString())}`;
                      }
                    }
                  )} -
                            ${validate_component(Badge, "Badge").$$render(
                    $$result,
                    {
                      variant: "secondary",
                      class: "rounded-sm px-1 font-normal lg:hidden"
                    },
                    {},
                    {
                      default: () => {
                        return `${escape($filter.rangeDate.end.toString())}`;
                      }
                    }
                  )}` : ``}`;
                }
              }
            )}`;
          }
        })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Range_calendar, "RangeCalendar").$$render(
              $$result,
              {
                class: "border rounded-md",
                value: $filter.rangeDate
              },
              {
                value: ($$value) => {
                  $filter.rangeDate = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}`;
      }
    })}</span> ${hasFilter() ? `${validate_component(Button, "Button").$$render($$result, { class: "h-8" }, {}, {
      default: () => {
        return `<span class="mr-2" data-svelte-h="svelte-1knrd2f">clear filters</span>${validate_component(Icon$1, "Icon").$$render(
          $$result,
          {
            icon: "ic:round-clear",
            width: "20",
            height: "20"
          },
          {},
          {}
        )}`;
      }
    })}` : ``}</div> ${validate_component(Drawer, "Drawer.Root").$$render(
      $$result,
      {
        onOutsideClick: toggleDrawer,
        open: openAddFeedbackDrawer
      },
      {
        open: ($$value) => {
          openAddFeedbackDrawer = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Trigger$1, "Drawer.Trigger").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { class: "h-8" }, {}, {
                default: () => {
                  return `Add new`;
                }
              })}`;
            }
          })} ${validate_component(Drawer_content, "Drawer.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Add_feedback_form, "AddFeedbackForm").$$render(
                $$result,
                {
                  onClose: () => toggleDrawer(),
                  voting: fromVoting
                },
                {},
                {}
              )}`;
            }
          })}`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  $$unsubscribe_filter();
  return $$rendered;
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div class="w-full overflow-auto"><table${spread(
    [
      {
        class: escape_attribute_value(cn("w-full caption-bottom text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div>`;
});
const Table_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<tbody${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr:last-child]:border-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const Table_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<td${spread(
    [
      {
        class: escape_attribute_value(cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</td>`;
});
const Table_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<th${spread(
    [
      {
        class: escape_attribute_value(cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`;
});
const Table_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return ` <thead${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr]:border-b", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</thead>`;
});
const Table_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<tr${spread(
    [
      {
        class: escape_attribute_value(cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tr>`;
});
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPage;
  let $$restProps = compute_rest_props($$props, ["class", "count", "perPage", "page", "siblingCount"]);
  let { class: className = void 0 } = $$props;
  let { count = 0 } = $$props;
  let { perPage = 10 } = $$props;
  let { page: page2 = 1 } = $$props;
  let { siblingCount = 1 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.perPage === void 0 && $$bindings.perPage && perPage !== void 0)
    $$bindings.perPage(perPage);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.siblingCount === void 0 && $$bindings.siblingCount && siblingCount !== void 0)
    $$bindings.siblingCount(siblingCount);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    currentPage = page2;
    $$rendered = `${validate_component(Pagination$1, "PaginationPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { count }, { perPage }, { siblingCount }, { asChild: true }, $$restProps, { page: page2 }),
      {
        page: ($$value) => {
          page2 = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ builder: builder2, pages, range }) => {
          return `<nav${spread(
            [
              escape_object(builder2),
              {
                class: escape_attribute_value(cn("mx-auto flex flex-col w-full items-center", className))
              }
            ],
            {}
          )}>${slots.default ? slots.default({ pages, range, currentPage }) : ``}</nav>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Pagination_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<ul${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-row items-center gap-1", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</ul>`;
});
const Pagination_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<li${spread(
    [
      {
        class: escape_attribute_value(cn("", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</li>`;
});
const Pagination_link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "page", "size", "isActive"]);
  let { class: className = void 0 } = $$props;
  let { page: page2 } = $$props;
  let { size = "icon" } = $$props;
  let { isActive = false } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Pagination_page, "PaginationPrimitive.Page").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn(
            buttonVariants({
              variant: isActive ? "outline" : "ghost",
              size
            }),
            className
          )
        },
        $$restProps,
        { page: page2 }
      ),
      {
        page: ($$value) => {
          page2 = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : `${escape(page2.value)}`}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Pagination_prev_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Pagination_prev_button$1, "PaginationPrimitive.PrevButton").$$render($$result, { asChild: true }, {}, {
    default: ({ builder: builder2 }) => {
      return `${validate_component(Button, "Button").$$render($$result, Object.assign({}, { variant: "ghost" }, { class: cn("gap-1 pl-2.5", className) }, { builders: [builder2] }, $$restProps), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ` ${validate_component(ChevronLeft, "ChevronLeft").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span data-svelte-h="svelte-qh4n5b">Previous</span> `}`;
        }
      })}`;
    }
  })}`;
});
const Pagination_next_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Pagination_next_button$1, "PaginationPrimitive.NextButton").$$render($$result, { asChild: true }, {}, {
    default: ({ builder: builder2 }) => {
      return `${validate_component(Button, "Button").$$render($$result, Object.assign({}, { variant: "ghost" }, { class: cn("gap-1 pr-2.5", className) }, { builders: [builder2] }, $$restProps), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ` <span data-svelte-h="svelte-1pet1fv">Next</span> ${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "h-4 w-4" }, {}, {})} `}`;
        }
      })}`;
    }
  })}`;
});
const Pagination_ellipsis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<span${spread(
    [
      { "aria-hidden": true },
      {
        class: escape_attribute_value(cn("flex h-9 w-9 items-center justify-center", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${validate_component(MoreHorizontal, "MoreHorizontal").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1krwd1q">More pages</span></span>`;
});
let limit$1 = 10;
const Feedback_panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let getCountDailyFeedback;
  let getBugTypePercent;
  let $$unsubscribe_votingFeedbacks;
  let $newFeedbacks, $$unsubscribe_newFeedbacks;
  let $page, $$unsubscribe_page;
  $$unsubscribe_votingFeedbacks = subscribe(votingFeedbacks, (value) => value);
  $$unsubscribe_newFeedbacks = subscribe(newFeedbacks, (value) => $newFeedbacks = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const id = $page.params.id;
  let offset = 0;
  const handlePaginate = (page2) => {
    offset = page2 - 1;
    listNewFeedback(id, limit$1, offset);
  };
  const displayPartialContent = (content) => {
    if (content.length > 60) {
      return `${content.slice(0, 60)}...`;
    }
    return content;
  };
  getCountDailyFeedback = () => {
    if ($newFeedbacks.feedbacks?.length > 0) {
      let todayAtMidnight = /* @__PURE__ */ new Date();
      todayAtMidnight.setHours(0, 0, 0, 0);
      return $newFeedbacks.feedbacks.filter((f) => f.createdAt.getTime() > todayAtMidnight.getTime()).length;
    } else {
      return 0;
    }
  };
  getBugTypePercent = () => {
    if ($newFeedbacks.feedbacks?.length > 0) {
      const total = $newFeedbacks.feedbacks.length;
      const bugs = $newFeedbacks.feedbacks.filter((f) => f.type === FeedbackType.Bug).length;
      return Math.round(bugs / total * 100);
    } else {
      return 0;
    }
  };
  $$unsubscribe_votingFeedbacks();
  $$unsubscribe_newFeedbacks();
  $$unsubscribe_page();
  return `<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
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
                return `new feedbacks`;
              }
            })}`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-2xl font-bold">${escape($newFeedbacks.feedbacks?.length)}</div> <p class="text-xs text-muted-foreground" data-svelte-h="svelte-93dxs1">+180.1% from last month</p>`;
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
                return `Feedbacks today`;
              }
            })}`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-2xl font-bold">${escape(getCountDailyFeedback())}</div>`;
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
                return `Percent are bugs`;
              }
            })}`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-2xl font-bold">${escape(getBugTypePercent())} %</div>`;
        }
      })}`;
    }
  })}</div> <div class="space-y-4 mt-6">${validate_component(Feedback_panel_toolbar, "FeedbackPanelToolbar").$$render($$result, {}, {}, {})} <div class="rounded-md border">${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Date`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `From`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Type`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Content`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `tags`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {})}`;
            }
          })}`;
        }
      })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
        default: () => {
          return `${$newFeedbacks.feedbacks.length === 0 ? `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
            default: () => {
              return `<td data-svelte-h="svelte-1n7zzx9">No feedbacks</td>`;
            }
          })}` : `${each($newFeedbacks.feedbacks, (feedback, i) => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(feedback.createdAt.toLocaleDateString())}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${feedback.author && feedback.author.email ? ` ${escape(feedback.author.email)} ` : ` Guest `}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(humanizeType(feedback.type))}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(displayPartialContent(feedback.content))}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${feedback.tags && feedback.tags.length > 0 ? `${each(feedback.tags, (tag, i2) => {
                      return `${validate_component(Badge, "Badge").$$render($$result, { class: "mr-1" }, {}, {
                        default: () => {
                          return `${escape(tag.label)}`;
                        }
                      })}`;
                    })}` : ``} `;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
                          default: ({ builder: builder2 }) => {
                            return `${validate_component(Button, "Button").$$render(
                              $$result,
                              {
                                variant: "ghost",
                                builders: [builder2],
                                class: "flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                              },
                              {},
                              {
                                default: () => {
                                  return `${validate_component(Icon$1, "Icon").$$render(
                                    $$result,
                                    {
                                      icon: "pepicons-pencil:dots-y",
                                      width: "24",
                                      height: "24"
                                    },
                                    {},
                                    {}
                                  )} <span class="sr-only" data-svelte-h="svelte-rsbkxi">Open menu</span> `;
                                }
                              }
                            )} `;
                          }
                        })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { class: "w-[160px]", align: "end" }, {}, {
                          default: () => {
                            return `${feedback.type === FeedbackType.Enhance ? `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                              default: () => {
                                return `Send to upvote`;
                              }
                            })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                              default: () => {
                                return `Edit`;
                              }
                            })}` : `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                              default: () => {
                                return `Show details`;
                              }
                            })}`} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { class: "text-red-600" }, {}, {
                              default: () => {
                                return `Delete`;
                              }
                            })} `;
                          }
                        })} `;
                      }
                    })} `;
                  }
                })} `;
              }
            })}`;
          })}`}`;
        }
      })}`;
    }
  })}</div> ${validate_component(Pagination, "Pagination.Root").$$render(
    $$result,
    {
      count: $newFeedbacks.total,
      perPage: limit$1,
      page: offset + 1,
      onPageChange: (page2) => handlePaginate(page2)
    },
    {},
    {
      default: ({ pages, currentPage }) => {
        return `${validate_component(Pagination_content, "Pagination.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Pagination_prev_button, "Pagination.PrevButton").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Icon$1, "Icon").$$render(
                      $$result,
                      {
                        icon: "material-symbols:chevron-left",
                        class: "h-4 w-4"
                      },
                      {},
                      {}
                    )} <span class="hidden sm:block" data-svelte-h="svelte-1pdc6bj">Previous</span>`;
                  }
                })}`;
              }
            })} ${each(pages, (page2) => {
              return `${page2.type === "ellipsis" ? `${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Pagination_ellipsis, "Pagination.Ellipsis").$$render($$result, {}, {}, {})} `;
                }
              })}` : `${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Pagination_link, "Pagination.Link").$$render(
                    $$result,
                    {
                      page: page2,
                      isActive: currentPage === page2.value
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(page2.value)} `;
                      }
                    }
                  )} `;
                }
              })}`}`;
            })} ${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Pagination_next_button, "Pagination.NextButton").$$render($$result, {}, {}, {
                  default: () => {
                    return `<span class="hidden sm:block" data-svelte-h="svelte-l3jvlf">Next</span> ${validate_component(Icon$1, "Icon").$$render(
                      $$result,
                      {
                        icon: "material-symbols:chevron-right",
                        class: "h-4 w-4"
                      },
                      {},
                      {}
                    )}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    }
  )}</div> ${``}`;
});
let limit = 10;
const Voting_feedback_panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let getCountTotalVote;
  let $votingFeedbacks, $$unsubscribe_votingFeedbacks;
  let $page, $$unsubscribe_page;
  $$unsubscribe_votingFeedbacks = subscribe(votingFeedbacks, (value) => $votingFeedbacks = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const id = $page.params.id;
  const displayPartialContent = (content) => {
    if (content.length > 60) {
      return `${content.slice(0, 60)}...`;
    }
    return content;
  };
  let offset = 0;
  const handlePaginate = (page2) => {
    offset = page2 - 1;
    listVotingFeedback(id, limit, offset);
  };
  getCountTotalVote = () => {
    if ($votingFeedbacks.feedbacks?.length > 0) {
      return $votingFeedbacks.feedbacks.map((a) => a.vote).reduce((a, b) => a + b);
    } else {
      return 0;
    }
  };
  $$unsubscribe_votingFeedbacks();
  $$unsubscribe_page();
  return `<div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
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
                return `feedback to upvote`;
              }
            })}`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-2xl font-bold">${escape($votingFeedbacks.feedbacks.length)}</div>`;
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
                return `Total vote`;
              }
            })}`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-2xl font-bold">${escape(getCountTotalVote())}</div>`;
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
                return `<i data-svelte-h="svelte-18tg5c5">Comming soon</i>`;
              }
            })}`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-2xl font-bold" data-svelte-h="svelte-17o65tk">...</div>`;
        }
      })}`;
    }
  })}</div> <div class="space-y-4 mt-4">${validate_component(Feedback_panel_toolbar, "FeedbackPanelToolbar").$$render($$result, { fromVoting: true }, {}, {})} <div class="rounded-md border">${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Date`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `From`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Content`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Vote`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `tags`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {})}`;
            }
          })}`;
        }
      })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
        default: () => {
          return `${$votingFeedbacks.feedbacks.length === 0 ? `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
            default: () => {
              return `<td data-svelte-h="svelte-1n7zzx9">No feedbacks</td>`;
            }
          })}` : `${each($votingFeedbacks.feedbacks, (feedback, i) => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(feedback.createdAt.toLocaleDateString())}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${feedback.author && feedback.author.email ? ` ${escape(feedback.author.email)} ` : ` guest `}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(displayPartialContent(feedback.content))}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(feedback.vote)}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "space-y-1 space-x-1" }, {}, {
                  default: () => {
                    return `${feedback.tags && feedback.tags.length > 0 ? `${each(feedback.tags, (tag, i2) => {
                      return `${validate_component(Badge, "Badge").$$render($$result, {}, {}, {
                        default: () => {
                          return `${escape(tag.label)}`;
                        }
                      })}`;
                    })}` : ``} `;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
                          default: ({ builder: builder2 }) => {
                            return `${validate_component(Button, "Button").$$render(
                              $$result,
                              {
                                variant: "ghost",
                                builders: [builder2],
                                class: "flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                              },
                              {},
                              {
                                default: () => {
                                  return `${validate_component(Icon$1, "Icon").$$render(
                                    $$result,
                                    {
                                      icon: "pepicons-pencil:dots-y",
                                      width: "24",
                                      height: "24"
                                    },
                                    {},
                                    {}
                                  )} <span class="sr-only" data-svelte-h="svelte-rsbkxi">Open menu</span> `;
                                }
                              }
                            )} `;
                          }
                        })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { class: "w-[160px]", align: "end" }, {}, {
                          default: () => {
                            return `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                              default: () => {
                                return `Edit`;
                              }
                            })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { class: "text-red-600" }, {}, {
                              default: () => {
                                return `Delete
                                        `;
                              }
                            })} `;
                          }
                        })} `;
                      }
                    })} `;
                  }
                })} `;
              }
            })}`;
          })}`}`;
        }
      })}`;
    }
  })}</div> ${validate_component(Pagination, "Pagination.Root").$$render(
    $$result,
    {
      count: $votingFeedbacks.total,
      perPage: limit,
      page: offset + 1,
      onPageChange: (page2) => handlePaginate(page2)
    },
    {},
    {
      default: ({ pages, currentPage }) => {
        return `${validate_component(Pagination_content, "Pagination.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Pagination_prev_button, "Pagination.PrevButton").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Icon$1, "Icon").$$render(
                      $$result,
                      {
                        icon: "material-symbols:chevron-left",
                        class: "h-4 w-4"
                      },
                      {},
                      {}
                    )} <span class="hidden sm:block" data-svelte-h="svelte-1pdc6bj">Previous</span>`;
                  }
                })}`;
              }
            })} ${each(pages, (page2) => {
              return `${page2.type === "ellipsis" ? `${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Pagination_ellipsis, "Pagination.Ellipsis").$$render($$result, {}, {}, {})} `;
                }
              })}` : `${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Pagination_link, "Pagination.Link").$$render(
                    $$result,
                    {
                      page: page2,
                      isActive: currentPage === page2.value
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(page2.value)} `;
                      }
                    }
                  )} `;
                }
              })}`}`;
            })} ${validate_component(Pagination_item, "Pagination.Item").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Pagination_next_button, "Pagination.NextButton").$$render($$result, {}, {}, {
                  default: () => {
                    return `<span class="hidden sm:block" data-svelte-h="svelte-l3jvlf">Next</span> ${validate_component(Icon$1, "Icon").$$render(
                      $$result,
                      {
                        icon: "material-symbols:chevron-right",
                        class: "h-4 w-4"
                      },
                      {},
                      {}
                    )}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    }
  )}</div> ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $project, $$unsubscribe_project;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_project = subscribe(project, (value) => $project = value);
  const id = $page.params.id;
  $$unsubscribe_page();
  $$unsubscribe_project();
  return `<div class="flex-1 space-y-4 p-8 pt-6"><div class="flex flex-row justify-between"><div class="flex flex-row justify-items-start"><a class="text-xl m-2" href="/dashboard" data-svelte-h="svelte-8ra4kk">Dashboard</a> <span class="text-xl m-2" data-svelte-h="svelte-ekf2em">/</span> <h2 class="text-2xl font-bold mt-2">${escape($project?.name)}</h2></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "link",
      href: "/dashboard/project/" + id + "/settings"
    },
    {},
    {
      default: () => {
        return `${validate_component(Icon$1, "Icon").$$render(
          $$result,
          {
            icon: "iconamoon:settings-fill",
            width: "24",
            height: "24"
          },
          {},
          {}
        )}`;
      }
    }
  )}</div> ${validate_component(Root$2, "Tabs.Root").$$render(
    $$result,
    {
      value: "feedbacks",
      class: "h-full space-y-6"
    },
    {},
    {
      default: () => {
        return `${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "feedbacks" }, {}, {
              default: () => {
                return `Feedbacks`;
              }
            })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "voting" }, {}, {
              default: () => {
                return `Voting feedbacks`;
              }
            })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "board", disabled: true }, {}, {
              default: () => {
                return `Public board <small data-svelte-h="svelte-zvvmvd">(coming soon...)</small>`;
              }
            })}`;
          }
        })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "feedbacks" }, {}, {
          default: () => {
            return `${validate_component(Feedback_panel, "FeedbackPanel").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "voting" }, {}, {
          default: () => {
            return `${validate_component(Voting_feedback_panel, "VotingFeedbackPanel").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "board" }, {}, {
          default: () => {
            return `TODO`;
          }
        })}`;
      }
    }
  )}</div>`;
});
export {
  Page as default
};
