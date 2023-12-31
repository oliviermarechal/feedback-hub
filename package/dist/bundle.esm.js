var Dialog = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Content () { return Dialog_content; },
    get Description () { return Dialog_description; },
    get Dialog () { return Root$1; },
    get DialogContent () { return Dialog_content; },
    get DialogDescription () { return Dialog_description; },
    get DialogFooter () { return Dialog_footer; },
    get DialogHeader () { return Dialog_header; },
    get DialogOverlay () { return Dialog_overlay; },
    get DialogPortal () { return Dialog_portal; },
    get DialogTitle () { return Dialog_title; },
    get DialogTrigger () { return Trigger; },
    get Footer () { return Dialog_footer; },
    get Header () { return Dialog_header; },
    get Overlay () { return Dialog_overlay; },
    get Portal () { return Dialog_portal; },
    get Root () { return Root$1; },
    get Title () { return Dialog_title; },
    get Trigger () { return Trigger; }
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const getApiUrl = (env) => {
    if (env === 'production') {
        throw new Error('Dont forget to set production URL');
    }
    return 'http://localhost:3005';
};
const getHomepage = (env) => {
    if (env === 'production') {
        throw new Error('Dont forget to set production URL');
    }
    return 'http://localhost:5173';
};

class InsightHuntSDK {
    constructor(config) {
        this.apiUrl = getApiUrl("development" );
        this.user = null;
        this.userIp = null;
        this.apiKey = config.projectApiKey;
    }
    initCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`${this.apiUrl}/external/project`, {
                method: 'GET',
                headers: this.getDefaultHeader(),
            });
            yield result.json();
            if (result.ok) {
                this.project = result.body;
            }
            else {
                throw new Error('Project not found');
            }
            const response = yield fetch('https://api.ipify.org?format=json', {
                method: 'GET'
            });
            const data = yield response.json();
            this.userIp = data.ip;
        });
    }
    addFeedback(feedbackContentData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`${this.apiUrl}/external/feedback`, {
                method: 'POST',
                body: JSON.stringify(Object.assign(Object.assign({}, feedbackContentData), { author: {
                        externalId: (_a = this.user) === null || _a === void 0 ? void 0 : _a.id,
                        email: ((_b = this.user) === null || _b === void 0 ? void 0 : _b.email) || feedbackContentData.email,
                        logoUrl: (_c = this.user) === null || _c === void 0 ? void 0 : _c.logoUrl,
                        ipAddress: this.userIp,
                    } })),
                headers: this.getDefaultHeader(),
            });
            if (result.ok) {
                return;
            }
            // TODO manage error
            const body = yield result.json();
            throw new Error(body.message);
        });
    }
    listVotingFeedbacks() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(`${this.apiUrl}/external/feedback`, {
                method: 'GET',
                headers: this.getDefaultHeader()
            });
            const body = yield result.json();
            return body;
        });
    }
    upvote(feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = this.user ? JSON.stringify({
                projectCustomerId: this.user.id,
                projectCustomerEmail: this.user.email,
                projectCustomerIpAddress: this.userIp,
                projectCustomerLogoUrl: this.user.logoUrl,
            }) : JSON.stringify({
                projectCustomerIpAddress: this.userIp,
            });
            const result = yield fetch(`${this.apiUrl}/external/feedback/${feedbackId}/upvote`, {
                method: 'POST',
                body,
                headers: this.getDefaultHeader(),
            });
            return result.ok;
        });
    }
    isConnected() {
        return !!this.user;
    }
    setAuthUser(user) {
        this.user = user;
    }
    logoutUser() {
        this.user = null;
    }
    getLoggedUser() {
        return this.user;
    }
    getDefaultHeader() {
        return {
            'x-insight-hunt-api-key': `${this.apiKey}`,
            Accept: 'application.json',
            'Content-Type': 'application/json'
        };
    }
}

/** @returns {void} */
function noop$1() {}

const identity = (x) => x;

/**
 * @template T
 * @template S
 * @param {T} tar
 * @param {S} src
 * @returns {T & S}
 */
function assign(tar, src) {
	// @ts-ignore
	for (const k in src) tar[k] = src[k];
	return /** @type {T & S} */ (tar);
}

/** @returns {void} */
function add_location(element, file, line, column, char) {
	element.__svelte_meta = {
		loc: { file, line, column, char }
	};
}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/** @returns {void} */
function validate_store(store, name) {
	if (store != null && typeof store.subscribe !== 'function') {
		throw new Error(`'${name}' is not a store with a 'subscribe' method`);
	}
}

function subscribe(store, ...callbacks) {
	if (store == null) {
		for (const callback of callbacks) {
			callback(undefined);
		}
		return noop$1;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

/**
 * Get the current value from a store by subscribing and immediately unsubscribing.
 *
 * https://svelte.dev/docs/svelte-store#get
 * @template T
 * @param {import('../store/public.js').Readable<T>} store
 * @returns {T}
 */
function get_store_value(store) {
	let value;
	subscribe(store, (_) => (value = _))();
	return value;
}

/** @returns {void} */
function component_subscribe(component, store, callback) {
	component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
	if (definition) {
		const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
		return definition[0](slot_ctx);
	}
}

function get_slot_context(definition, ctx, $$scope, fn) {
	return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
	if (definition[2] && fn) {
		const lets = definition[2](fn(dirty));
		if ($$scope.dirty === undefined) {
			return lets;
		}
		if (typeof lets === 'object') {
			const merged = [];
			const len = Math.max($$scope.dirty.length, lets.length);
			for (let i = 0; i < len; i += 1) {
				merged[i] = $$scope.dirty[i] | lets[i];
			}
			return merged;
		}
		return $$scope.dirty | lets;
	}
	return $$scope.dirty;
}

/** @returns {void} */
function update_slot_base(
	slot,
	slot_definition,
	ctx,
	$$scope,
	slot_changes,
	get_slot_context_fn
) {
	if (slot_changes) {
		const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
		slot.p(slot_context, slot_changes);
	}
}

/** @returns {any[] | -1} */
function get_all_dirty_from_scope($$scope) {
	if ($$scope.ctx.length > 32) {
		const dirty = [];
		const length = $$scope.ctx.length / 32;
		for (let i = 0; i < length; i++) {
			dirty[i] = -1;
		}
		return dirty;
	}
	return -1;
}

/** @returns {{}} */
function exclude_internal_props(props) {
	const result = {};
	for (const k in props) if (k[0] !== '$') result[k] = props[k];
	return result;
}

/** @returns {{}} */
function compute_rest_props(props, keys) {
	const rest = {};
	keys = new Set(keys);
	for (const k in props) if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];
	return rest;
}

function action_destroyer(action_result) {
	return action_result && is_function(action_result.destroy) ? action_result.destroy : noop$1;
}

/** @param {number | string} value
 * @returns {[number, string]}
 */
function split_css_unit(value) {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
}

const contenteditable_truthy_values = ['', true, 1, 'true', 'contenteditable'];

const is_client = typeof window !== 'undefined';

/** @type {() => number} */
let now = is_client ? () => window.performance.now() : () => Date.now();

let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop$1;

const tasks = new Set();

/**
 * @param {number} now
 * @returns {void}
 */
function run_tasks(now) {
	tasks.forEach((task) => {
		if (!task.c(now)) {
			tasks.delete(task);
			task.f();
		}
	});
	if (tasks.size !== 0) raf(run_tasks);
}

/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 * @param {import('./private.js').TaskCallback} callback
 * @returns {import('./private.js').Task}
 */
function loop(callback) {
	/** @type {import('./private.js').TaskEntry} */
	let task;
	if (tasks.size === 0) raf(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			tasks.add((task = { c: callback, f: fulfill }));
		}),
		abort() {
			tasks.delete(task);
		}
	};
}

/** @type {typeof globalThis} */
const globals =
	typeof window !== 'undefined'
		? window
		: typeof globalThis !== 'undefined'
		? globalThis
		: // @ts-ignore Node typings have this
		  global;

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && /** @type {ShadowRoot} */ (root).host) {
		return /** @type {ShadowRoot} */ (root);
	}
	return node.ownerDocument;
}

/**
 * @param {Node} node
 * @returns {CSSStyleSheet}
 */
function append_empty_stylesheet(node) {
	const style_element = element('style');
	// For transitions to work without 'style-src: unsafe-inline' Content Security Policy,
	// these empty tags need to be allowed with a hash as a workaround until we move to the Web Animations API.
	// Using the hash for the empty string (for an empty tag) works in all browsers except Safari.
	// So as a workaround for the workaround, when we append empty style tags we set their content to /* empty */.
	// The hash 'sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=' will then work even in Safari.
	style_element.textContent = '/* empty */';
	append_stylesheet(get_root_for_style(node), style_element);
	return style_element.sheet;
}

/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
	append(/** @type {Document} */ (node).head || node, style);
	return style.sheet;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @returns {Text} */
function empty() {
	return text('');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
/**
 * List of attributes that should always be set through the attr method,
 * because updating them through the property setter doesn't work reliably.
 * In the example of `width`/`height`, the problem is that the setter only
 * accepts numeric values, but the attribute can also be set to a string like `50%`.
 * If this list becomes too big, rethink this approach.
 */
const always_set_through_set_attribute = ['width', 'height'];

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {{ [x: string]: string }} attributes
 * @returns {void}
 */
function set_attributes(node, attributes) {
	// @ts-ignore
	const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
	for (const key in attributes) {
		if (attributes[key] == null) {
			node.removeAttribute(key);
		} else if (key === 'style') {
			node.style.cssText = attributes[key];
		} else if (key === '__value') {
			/** @type {any} */ (node).value = node[key] = attributes[key];
		} else if (
			descriptors[key] &&
			descriptors[key].set &&
			always_set_through_set_attribute.indexOf(key) === -1
		) {
			node[key] = attributes[key];
		} else {
			attr(node, key, attributes[key]);
		}
	}
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {{ [x: string]: string }} attributes
 * @returns {void}
 */
function set_svg_attributes(node, attributes) {
	for (const key in attributes) {
		attr(node, key, attributes[key]);
	}
}

/**
 * @param {Record<string, unknown>} data_map
 * @returns {void}
 */
function set_custom_element_data_map(node, data_map) {
	Object.keys(data_map).forEach((key) => {
		set_custom_element_data(node, key, data_map[key]);
	});
}

/**
 * @returns {void} */
function set_custom_element_data(node, prop, value) {
	const lower = prop.toLowerCase(); // for backwards compatibility with existing behavior we do lowercase first
	if (lower in node) {
		node[lower] = typeof node[lower] === 'boolean' && value === '' ? true : value;
	} else if (prop in node) {
		node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
	} else {
		attr(node, prop, value);
	}
}

/**
 * @param {string} tag
 */
function set_dynamic_element_data(tag) {
	return /-/.test(tag) ? set_custom_element_data_map : set_attributes;
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @returns {void} */
function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
 * @returns {CustomEvent<T>}
 */
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
/** @type {Map<Document | ShadowRoot, import('./private.d.ts').StyleInformation>} */
const managed_styles = new Map();

let active = 0;

// https://github.com/darkskyapp/string-hash/blob/master/index.js
/**
 * @param {string} str
 * @returns {number}
 */
function hash(str) {
	let hash = 5381;
	let i = str.length;
	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return hash >>> 0;
}

/**
 * @param {Document | ShadowRoot} doc
 * @param {Element & ElementCSSInlineStyle} node
 * @returns {{ stylesheet: any; rules: {}; }}
 */
function create_style_information(doc, node) {
	const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
	managed_styles.set(doc, info);
	return info;
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {number} a
 * @param {number} b
 * @param {number} duration
 * @param {number} delay
 * @param {(t: number) => number} ease
 * @param {(t: number, u: number) => string} fn
 * @param {number} uid
 * @returns {string}
 */
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
	const step = 16.666 / duration;
	let keyframes = '{\n';
	for (let p = 0; p <= 1; p += step) {
		const t = a + (b - a) * ease(p);
		keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
	}
	const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
	const name = `__svelte_${hash(rule)}_${uid}`;
	const doc = get_root_for_style(node);
	const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
	if (!rules[name]) {
		rules[name] = true;
		stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
	}
	const animation = node.style.animation || '';
	node.style.animation = `${
		animation ? `${animation}, ` : ''
	}${name} ${duration}ms linear ${delay}ms 1 both`;
	active += 1;
	return name;
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {string} [name]
 * @returns {void}
 */
function delete_rule(node, name) {
	const previous = (node.style.animation || '').split(', ');
	const next = previous.filter(
		name
			? (anim) => anim.indexOf(name) < 0 // remove specific animation
			: (anim) => anim.indexOf('__svelte') === -1 // remove all Svelte animations
	);
	const deleted = previous.length - next.length;
	if (deleted) {
		node.style.animation = next.join(', ');
		active -= deleted;
		if (!active) clear_rules();
	}
}

/** @returns {void} */
function clear_rules() {
	raf(() => {
		if (active) return;
		managed_styles.forEach((info) => {
			const { ownerNode } = info.stylesheet;
			// there is no ownerNode if it runs on jsdom.
			if (ownerNode) detach(ownerNode);
		});
		managed_styles.clear();
	});
}

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
	get_current_component().$$.on_destroy.push(fn);
}

/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
 * ```ts
 * const dispatch = createEventDispatcher<{
 *  loaded: never; // does not take a detail argument
 *  change: string; // takes a detail argument of type string, which is required
 *  optional: number | null; // takes an optional detail argument of type number
 * }>();
 * ```
 *
 * https://svelte.dev/docs/svelte#createeventdispatcher
 * @template {Record<string, any>} [EventMap=any]
 * @returns {import('./public.js').EventDispatcher<EventMap>}
 */
function createEventDispatcher() {
	const component = get_current_component();
	return (type, detail, { cancelable = false } = {}) => {
		const callbacks = component.$$.callbacks[type];
		if (callbacks) {
			// TODO are there situations where events could be dispatched
			// in a server (non-DOM) environment?
			const event = custom_event(/** @type {string} */ (type), detail, { cancelable });
			callbacks.slice().forEach((fn) => {
				fn.call(component, event);
			});
			return !event.defaultPrevented;
		}
		return true;
	};
}

/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#setcontext
 * @template T
 * @param {any} key
 * @param {T} context
 * @returns {T}
 */
function setContext(key, context) {
	get_current_component().$$.context.set(key, context);
	return context;
}

/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#getcontext
 * @template T
 * @param {any} key
 * @returns {T}
 */
function getContext(key) {
	return get_current_component().$$.context.get(key);
}

// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
/**
 * @param component
 * @param event
 * @returns {void}
 */
function bubble(component, event) {
	const callbacks = component.$$.callbacks[event.type];
	if (callbacks) {
		// @ts-ignore
		callbacks.slice().forEach((fn) => fn.call(this, event));
	}
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {Promise<void>} */
function tick() {
	schedule_update();
	return resolved_promise;
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

/** @returns {void} */
function add_flush_callback(fn) {
	flush_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

/**
 * @type {Promise<void> | null}
 */
let promise;

/**
 * @returns {Promise<void>}
 */
function wait() {
	if (!promise) {
		promise = Promise.resolve();
		promise.then(() => {
			promise = null;
		});
	}
	return promise;
}

/**
 * @param {Element} node
 * @param {INTRO | OUTRO | boolean} direction
 * @param {'start' | 'end'} kind
 * @returns {void}
 */
function dispatch(node, direction, kind) {
	node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}

const outroing = new Set();

/**
 * @type {Outro}
 */
let outros;

/**
 * @returns {void} */
function group_outros() {
	outros = {
		r: 0,
		c: [],
		p: outros // parent group
	};
}

/**
 * @returns {void} */
function check_outros() {
	if (!outros.r) {
		run_all(outros.c);
	}
	outros = outros.p;
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
	if (block && block.o) {
		if (outroing.has(block)) return;
		outroing.add(block);
		outros.c.push(() => {
			outroing.delete(block);
			if (callback) {
				if (detach) block.d(1);
				callback();
			}
		});
		block.o(local);
	} else if (callback) {
		callback();
	}
}

/**
 * @type {import('../transition/public.js').TransitionConfig}
 */
const null_transition = { duration: 0 };

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {TransitionFn} fn
 * @param {any} params
 * @returns {{ start(): void; invalidate(): void; end(): void; }}
 */
function create_in_transition(node, fn, params) {
	/**
	 * @type {TransitionOptions} */
	const options = { direction: 'in' };
	let config = fn(node, params, options);
	let running = false;
	let animation_name;
	let task;
	let uid = 0;

	/**
	 * @returns {void} */
	function cleanup() {
		if (animation_name) delete_rule(node, animation_name);
	}

	/**
	 * @returns {void} */
	function go() {
		const {
			delay = 0,
			duration = 300,
			easing = identity,
			tick = noop$1,
			css
		} = config || null_transition;
		if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
		tick(0, 1);
		const start_time = now() + delay;
		const end_time = start_time + duration;
		if (task) task.abort();
		running = true;
		add_render_callback(() => dispatch(node, true, 'start'));
		task = loop((now) => {
			if (running) {
				if (now >= end_time) {
					tick(1, 0);
					dispatch(node, true, 'end');
					cleanup();
					return (running = false);
				}
				if (now >= start_time) {
					const t = easing((now - start_time) / duration);
					tick(t, 1 - t);
				}
			}
			return running;
		});
	}
	let started = false;
	return {
		start() {
			if (started) return;
			started = true;
			delete_rule(node);
			if (is_function(config)) {
				config = config(options);
				wait().then(go);
			} else {
				go();
			}
		},
		invalidate() {
			started = false;
		},
		end() {
			if (running) {
				cleanup();
				running = false;
			}
		}
	};
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {TransitionFn} fn
 * @param {any} params
 * @returns {{ end(reset: any): void; }}
 */
function create_out_transition(node, fn, params) {
	/** @type {TransitionOptions} */
	const options = { direction: 'out' };
	let config = fn(node, params, options);
	let running = true;
	let animation_name;
	const group = outros;
	group.r += 1;
	/** @type {boolean} */
	let original_inert_value;

	/**
	 * @returns {void} */
	function go() {
		const {
			delay = 0,
			duration = 300,
			easing = identity,
			tick = noop$1,
			css
		} = config || null_transition;

		if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);

		const start_time = now() + delay;
		const end_time = start_time + duration;
		add_render_callback(() => dispatch(node, false, 'start'));

		if ('inert' in node) {
			original_inert_value = /** @type {HTMLElement} */ (node).inert;
			node.inert = true;
		}

		loop((now) => {
			if (running) {
				if (now >= end_time) {
					tick(0, 1);
					dispatch(node, false, 'end');
					if (!--group.r) {
						// this will result in `end()` being called,
						// so we don't need to clean up here
						run_all(group.c);
					}
					return false;
				}
				if (now >= start_time) {
					const t = easing((now - start_time) / duration);
					tick(1 - t, t);
				}
			}
			return running;
		});
	}

	if (is_function(config)) {
		wait().then(() => {
			// @ts-ignore
			config = config(options);
			go();
		});
	} else {
		go();
	}

	return {
		end(reset) {
			if (reset && 'inert' in node) {
				node.inert = original_inert_value;
			}
			if (reset && config.tick) {
				config.tick(1, 0);
			}
			if (running) {
				if (animation_name) delete_rule(node, animation_name);
				running = false;
			}
		}
	};
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {TransitionFn} fn
 * @param {any} params
 * @param {boolean} intro
 * @returns {{ run(b: 0 | 1): void; end(): void; }}
 */
function create_bidirectional_transition(node, fn, params, intro) {
	/**
	 * @type {TransitionOptions} */
	const options = { direction: 'both' };
	let config = fn(node, params, options);
	let t = intro ? 0 : 1;

	/**
	 * @type {Program | null} */
	let running_program = null;

	/**
	 * @type {PendingProgram | null} */
	let pending_program = null;
	let animation_name = null;

	/** @type {boolean} */
	let original_inert_value;

	/**
	 * @returns {void} */
	function clear_animation() {
		if (animation_name) delete_rule(node, animation_name);
	}

	/**
	 * @param {PendingProgram} program
	 * @param {number} duration
	 * @returns {Program}
	 */
	function init(program, duration) {
		const d = /** @type {Program['d']} */ (program.b - t);
		duration *= Math.abs(d);
		return {
			a: t,
			b: program.b,
			d,
			duration,
			start: program.start,
			end: program.start + duration,
			group: program.group
		};
	}

	/**
	 * @param {INTRO | OUTRO} b
	 * @returns {void}
	 */
	function go(b) {
		const {
			delay = 0,
			duration = 300,
			easing = identity,
			tick = noop$1,
			css
		} = config || null_transition;

		/**
		 * @type {PendingProgram} */
		const program = {
			start: now() + delay,
			b
		};

		if (!b) {
			// @ts-ignore todo: improve typings
			program.group = outros;
			outros.r += 1;
		}

		if ('inert' in node) {
			if (b) {
				if (original_inert_value !== undefined) {
					// aborted/reversed outro — restore previous inert value
					node.inert = original_inert_value;
				}
			} else {
				original_inert_value = /** @type {HTMLElement} */ (node).inert;
				node.inert = true;
			}
		}

		if (running_program || pending_program) {
			pending_program = program;
		} else {
			// if this is an intro, and there's a delay, we need to do
			// an initial tick and/or apply CSS animation immediately
			if (css) {
				clear_animation();
				animation_name = create_rule(node, t, b, duration, delay, easing, css);
			}
			if (b) tick(0, 1);
			running_program = init(program, duration);
			add_render_callback(() => dispatch(node, b, 'start'));
			loop((now) => {
				if (pending_program && now > pending_program.start) {
					running_program = init(pending_program, duration);
					pending_program = null;
					dispatch(node, running_program.b, 'start');
					if (css) {
						clear_animation();
						animation_name = create_rule(
							node,
							t,
							running_program.b,
							running_program.duration,
							0,
							easing,
							config.css
						);
					}
				}
				if (running_program) {
					if (now >= running_program.end) {
						tick((t = running_program.b), 1 - t);
						dispatch(node, running_program.b, 'end');
						if (!pending_program) {
							// we're done
							if (running_program.b) {
								// intro — we can tidy up immediately
								clear_animation();
							} else {
								// outro — needs to be coordinated
								if (!--running_program.group.r) run_all(running_program.group.c);
							}
						}
						running_program = null;
					} else if (now >= running_program.start) {
						const p = now - running_program.start;
						t = running_program.a + running_program.d * easing(p / running_program.duration);
						tick(t, 1 - t);
					}
				}
				return !!(running_program || pending_program);
			});
		}
	}
	return {
		run(b) {
			if (is_function(config)) {
				wait().then(() => {
					const opts = { direction: b ? 'in' : 'out' };
					// @ts-ignore
					config = config(opts);
					go(b);
				});
			} else {
				go(b);
			}
		},
		end() {
			clear_animation();
			running_program = pending_program = null;
		}
	};
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

/** @returns {void} */
function outro_and_destroy_block(block, lookup) {
	transition_out(block, 1, 1, () => {
		lookup.delete(block.key);
	});
}

/** @returns {any[]} */
function update_keyed_each(
	old_blocks,
	dirty,
	get_key,
	dynamic,
	ctx,
	list,
	lookup,
	node,
	destroy,
	create_each_block,
	next,
	get_context
) {
	let o = old_blocks.length;
	let n = list.length;
	let i = o;
	const old_indexes = {};
	while (i--) old_indexes[old_blocks[i].key] = i;
	const new_blocks = [];
	const new_lookup = new Map();
	const deltas = new Map();
	const updates = [];
	i = n;
	while (i--) {
		const child_ctx = get_context(ctx, list, i);
		const key = get_key(child_ctx);
		let block = lookup.get(key);
		if (!block) {
			block = create_each_block(key, child_ctx);
			block.c();
		} else if (dynamic) {
			// defer updates until all the DOM shuffling is done
			updates.push(() => block.p(child_ctx, dirty));
		}
		new_lookup.set(key, (new_blocks[i] = block));
		if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
	}
	const will_move = new Set();
	const did_move = new Set();
	/** @returns {void} */
	function insert(block) {
		transition_in(block, 1);
		block.m(node, next);
		lookup.set(block.key, block);
		next = block.first;
		n--;
	}
	while (o && n) {
		const new_block = new_blocks[n - 1];
		const old_block = old_blocks[o - 1];
		const new_key = new_block.key;
		const old_key = old_block.key;
		if (new_block === old_block) {
			// do nothing
			next = new_block.first;
			o--;
			n--;
		} else if (!new_lookup.has(old_key)) {
			// remove old block
			destroy(old_block, lookup);
			o--;
		} else if (!lookup.has(new_key) || will_move.has(new_key)) {
			insert(new_block);
		} else if (did_move.has(old_key)) {
			o--;
		} else if (deltas.get(new_key) > deltas.get(old_key)) {
			did_move.add(new_key);
			insert(new_block);
		} else {
			will_move.add(old_key);
			o--;
		}
	}
	while (o--) {
		const old_block = old_blocks[o];
		if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
	}
	while (n) insert(new_blocks[n - 1]);
	run_all(updates);
	return new_blocks;
}

/** @returns {void} */
function validate_each_keys(ctx, list, get_context, get_key) {
	const keys = new Map();
	for (let i = 0; i < list.length; i++) {
		const key = get_key(get_context(ctx, list, i));
		if (keys.has(key)) {
			let value = '';
			try {
				value = `with value '${String(key)}' `;
			} catch (e) {
				// can't stringify
			}
			throw new Error(
				`Cannot have duplicate keys in a keyed each: Keys at index ${keys.get(
					key
				)} and ${i} ${value}are duplicates`
			);
		}
		keys.set(key, i);
	}
}

/** @returns {{}} */
function get_spread_update(levels, updates) {
	const update = {};
	const to_null_out = {};
	const accounted_for = { $$scope: 1 };
	let i = levels.length;
	while (i--) {
		const o = levels[i];
		const n = updates[i];
		if (n) {
			for (const key in o) {
				if (!(key in n)) to_null_out[key] = 1;
			}
			for (const key in n) {
				if (!accounted_for[key]) {
					update[key] = n[key];
					accounted_for[key] = 1;
				}
			}
			levels[i] = n;
		} else {
			for (const key in o) {
				accounted_for[key] = 1;
			}
		}
	}
	for (const key in to_null_out) {
		if (!(key in update)) update[key] = undefined;
	}
	return update;
}

function get_spread_object(spread_props) {
	return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

/** regex of all html void element names */
const void_element_names =
	/^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;

/**
 * @param {string} name
 * @returns {boolean}
 */
function is_void(name) {
	return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

/** @returns {void} */
function bind(component, name, callback) {
	const index = component.$$.props[name];
	if (index !== undefined) {
		component.$$.bound[index] = callback;
		callback(component.$$.ctx[index]);
	}
}

/** @returns {void} */
function create_component(block) {
	block && block.c();
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init$1(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles = null,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: noop$1,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			// TODO: what is the correct type here?
			// @ts-expect-error
			const nodes = children(options.target);
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop$1;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop$1;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

/**
 * The current version, as set in package.json.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-version
 * @type {string}
 */
const VERSION = '4.2.8';
const PUBLIC_VERSION = '4';

/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @returns {void}
 */
function dispatch_dev(type, detail) {
	document.dispatchEvent(custom_event(type, { version: VERSION, ...detail }, { bubbles: true }));
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append_dev(target, node) {
	dispatch_dev('SvelteDOMInsert', { target, node });
	append(target, node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert_dev(target, node, anchor) {
	dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	insert(target, node, anchor);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach_dev(node) {
	dispatch_dev('SvelteDOMRemove', { node });
	detach(node);
}

/**
 * @param {Node} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @param {boolean} [has_prevent_default]
 * @param {boolean} [has_stop_propagation]
 * @param {boolean} [has_stop_immediate_propagation]
 * @returns {() => void}
 */
function listen_dev(
	node,
	event,
	handler,
	options,
	has_prevent_default,
	has_stop_propagation,
	has_stop_immediate_propagation
) {
	const modifiers =
		options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
	if (has_prevent_default) modifiers.push('preventDefault');
	if (has_stop_propagation) modifiers.push('stopPropagation');
	if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
	dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
	const dispose = listen(node, event, handler, options);
	return () => {
		dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
		dispose();
	};
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr_dev(node, attribute, value) {
	attr(node, attribute, value);
	if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
	else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data_dev(text, data) {
	data = '' + data;
	if (text.data === data) return;
	dispatch_dev('SvelteDOMSetData', { node: text, data });
	text.data = /** @type {string} */ (data);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data_contenteditable_dev(text, data) {
	data = '' + data;
	if (text.wholeText === data) return;
	dispatch_dev('SvelteDOMSetData', { node: text, data });
	text.data = /** @type {string} */ (data);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @param {string} attr_value
 * @returns {void}
 */
function set_data_maybe_contenteditable_dev(text, data, attr_value) {
	if (~contenteditable_truthy_values.indexOf(attr_value)) {
		set_data_contenteditable_dev(text, data);
	} else {
		set_data_dev(text, data);
	}
}

function ensure_array_like_dev(arg) {
	if (
		typeof arg !== 'string' &&
		!(arg && typeof arg === 'object' && 'length' in arg) &&
		!(typeof Symbol === 'function' && arg && Symbol.iterator in arg)
	) {
		throw new Error('{#each} only works with iterable values.');
	}
	return ensure_array_like(arg);
}

/**
 * @returns {void} */
function validate_slots(name, slot, keys) {
	for (const slot_key of Object.keys(slot)) {
		if (!~keys.indexOf(slot_key)) {
			console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
		}
	}
}

/**
 * @param {unknown} tag
 * @returns {void}
 */
function validate_dynamic_element(tag) {
	const is_string = typeof tag === 'string';
	if (tag && !is_string) {
		throw new Error('<svelte:element> expects "this" attribute to be a string.');
	}
}

/**
 * @param {undefined | string} tag
 * @returns {void}
 */
function validate_void_dynamic_element(tag) {
	if (tag && is_void(tag)) {
		console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
	}
}

/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 *
 * Can be used to create strongly typed Svelte components.
 *
 * #### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponent } from "svelte";
 * export class MyComponent extends SvelteComponent<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 * @template {Record<string, any>} [Slots=any]
 * @extends {SvelteComponent<Props, Events>}
 */
class SvelteComponentDev extends SvelteComponent {
	/**
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 *
	 * @type {Props}
	 */
	$$prop_def;
	/**
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 *
	 * @type {Events}
	 */
	$$events_def;
	/**
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 *
	 * @type {Slots}
	 */
	$$slot_def;

	/** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
	constructor(options) {
		if (!options || (!options.target && !options.$$inline)) {
			throw new Error("'target' is a required option");
		}
		super();
	}

	/** @returns {void} */
	$destroy() {
		super.$destroy();
		this.$destroy = () => {
			console.warn('Component was already destroyed'); // eslint-disable-line no-console
		};
	}

	/** @returns {void} */
	$capture_state() {}

	/** @returns {void} */
	$inject_state() {}
}

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/

/**
 * https://svelte.dev/docs/svelte-easing
 * @param {number} t
 * @returns {number}
 */
function cubicOut(t) {
	const f = t - 1.0;
	return f * f * f + 1.0;
}

/**
 * Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.
 *
 * https://svelte.dev/docs/svelte-transition#fade
 * @param {Element} node
 * @param {import('./public').FadeParams} [params]
 * @returns {import('./public').TransitionConfig}
 */
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
	const o = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * o}`
	};
}

/**
 * Animates the x and y positions and the opacity of an element. `in` transitions animate from the provided values, passed as parameters to the element's default values. `out` transitions animate from the element's default values to the provided values.
 *
 * https://svelte.dev/docs/svelte-transition#fly
 * @param {Element} node
 * @param {import('./public').FlyParams} [params]
 * @returns {import('./public').TransitionConfig}
 */
function fly(
	node,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}
) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const [xValue, xUnit] = split_css_unit(x);
	const [yValue, yUnit] = split_css_unit(y);
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u}`
	};
}

/**
 * Animates the opacity and scale of an element. `in` transitions animate from an element's current (default) values to the provided values, passed as parameters. `out` transitions animate from the provided values to an element's default values.
 *
 * https://svelte.dev/docs/svelte-transition#scale
 * @param {Element} node
 * @param {import('./public').ScaleParams} [params]
 * @returns {import('./public').TransitionConfig}
 */
function scale(
	node,
	{ delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}
) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const sd = 1 - start;
	const od = target_opacity * (1 - opacity);
	return {
		delay,
		duration,
		easing,
		css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
	};
}

var has = Object.prototype.hasOwnProperty;

function find(iter, tar, key) {
	for (key of iter.keys()) {
		if (dequal(key, tar)) return key;
	}
}

function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return true;

	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();

		if (ctor === Array) {
			if ((len=foo.length) === bar.length) {
				while (len-- && dequal(foo[len], bar[len]));
			}
			return len === -1;
		}

		if (ctor === Set) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len;
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!bar.has(tmp)) return false;
			}
			return true;
		}

		if (ctor === Map) {
			if (foo.size !== bar.size) {
				return false;
			}
			for (len of foo) {
				tmp = len[0];
				if (tmp && typeof tmp === 'object') {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!dequal(len[1], bar.get(tmp))) {
					return false;
				}
			}
			return true;
		}

		if (ctor === ArrayBuffer) {
			foo = new Uint8Array(foo);
			bar = new Uint8Array(bar);
		} else if (ctor === DataView) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo.getInt8(len) === bar.getInt8(len));
			}
			return len === -1;
		}

		if (ArrayBuffer.isView(foo)) {
			if ((len=foo.byteLength) === bar.byteLength) {
				while (len-- && foo[len] === bar[len]);
			}
			return len === -1;
		}

		if (!ctor || typeof foo === 'object') {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}

	return foo !== foo && bar !== bar;
}

/**
 * Returns the element some number before the given index. If the target index is out of bounds:
 *   - If looping is disabled, the first element will be returned.
 *   - If looping is enabled, the last element will be returned.
 * @param array the array.
 * @param currentIndex the index of the current element.
 * @param increment the number of elements to move forward.
 * @param loop loop to the beginning of the array if the target index is out of bounds?
 */
function back(array, index, increment, loop = true) {
    const previousIndex = index - increment;
    if (previousIndex <= 0) {
        return loop ? array[array.length - 1] : array[0];
    }
    return array[previousIndex];
}
/**
 * Returns the element some number after the given index. If the target index is out of bounds:
 *   - If looping is disabled, the last element will be returned.
 *   - If looping is enabled, the first element will be returned.
 * @param array the array.
 * @param currentIndex the index of the current element.
 * @param increment the number of elements to move forward.
 * @param loop loop to the beginning of the array if the target index is out of bounds?
 */
function forward(array, index, increment, loop = true) {
    const nextIndex = index + increment;
    if (nextIndex > array.length - 1) {
        return loop ? array[0] : array[array.length - 1];
    }
    return array[nextIndex];
}
/**
 * Returns the array element after to the given index.
 * @param array the array.
 * @param currentIndex the index of the current element.
 * @param loop loop to the beginning of the array if the next index is out of bounds?
 */
function next(array, index, loop = true) {
    if (index === array.length - 1) {
        return loop ? array[0] : array[index];
    }
    return array[index + 1];
}
/**
 * Returns the array element prior to the given index.
 * @param array the array.
 * @param currentIndex the index of the current element.
 * @param loop loop to the end of the array if the previous index is out of bounds?
 */
function prev(array, currentIndex, loop = true) {
    if (currentIndex <= 0) {
        return loop ? array[array.length - 1] : array[0];
    }
    return array[currentIndex - 1];
}
/**
 * Returns the last element in an array.
 * @param array the array.
 */
function last(array) {
    return array[array.length - 1];
}
/**
 * Wraps an array around itself at a given starting index.
 * @example ```ts
 * wrapArray(['a', 'b', 'c', 'd'], 2);
 * // ['c', 'd', 'a', 'b']
 * ```
 * @see https://github.com/radix-ui/primitives
 */
function wrapArray(array, startIndex) {
    return array.map((_, index) => array[(startIndex + index) % array.length]);
}
/**
 * Toggles an item in an array. If the item is already in the array,
 * it is removed. Otherwise, it is added.
 * @param item The item to toggle.
 * @param array The array to toggle the item in.
 * @returns The updated array with the item toggled.
 * @template T The type of the items in the array.
 * @example ```typescript
 * const arr = [1, 2, 3];
 * const newArr = toggle(2, arr);
 * // newArr = [1, 3]
 * ```
 */
function toggle(item, array, compare = dequal) {
    const itemIdx = array.findIndex((innerItem) => compare(innerItem, item));
    if (itemIdx !== -1) {
        array.splice(itemIdx, 1);
    }
    else {
        array.push(item);
    }
    return array;
}

/**
 * A utility function that converts a style object to a string.
 *
 * @param style - The style object to convert
 * @returns The style object as a string
 */
function styleToString(style) {
    return Object.keys(style).reduce((str, key) => {
        if (style[key] === undefined)
            return str;
        return str + `${key}:${style[key]};`;
    }, '');
}

function disabledAttr(disabled) {
    return disabled ? true : undefined;
}
const hiddenInputAttrs = {
    type: 'hidden',
    'aria-hidden': true,
    hidden: true,
    tabIndex: -1,
    style: styleToString({
        position: 'absolute',
        opacity: 0,
        'pointer-events': 'none',
        margin: 0,
        transform: 'translateX(-100%)',
    }),
};

const subscriber_queue = [];

/**
 * Creates a `Readable` store that allows reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#readable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Readable<T>}
 */
function readable(value, start) {
	return {
		subscribe: writable(value, start).subscribe
	};
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
function writable(value, start = noop$1) {
	/** @type {import('./public.js').Unsubscriber} */
	let stop;
	/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set();
	/** @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {import('./public.js').Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn) {
		set(fn(value));
	}

	/**
	 * @param {import('./public.js').Subscriber<T>} run
	 * @param {import('./private.js').Invalidator<T>} [invalidate]
	 * @returns {import('./public.js').Unsubscriber}
	 */
	function subscribe(run, invalidate = noop$1) {
		/** @type {import('./private.js').SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set, update) || noop$1;
		}
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * https://svelte.dev/docs/svelte-store#derived
 * @template {import('./private.js').Stores} S
 * @template T
 * @overload
 * @param {S} stores - input stores
 * @param {(values: import('./private.js').StoresValues<S>, set: (value: T) => void, update: (fn: import('./public.js').Updater<T>) => void) => import('./public.js').Unsubscriber | void} fn - function callback that aggregates the values
 * @param {T} [initial_value] - initial value
 * @returns {import('./public.js').Readable<T>}
 */

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 *
 * https://svelte.dev/docs/svelte-store#derived
 * @template {import('./private.js').Stores} S
 * @template T
 * @overload
 * @param {S} stores - input stores
 * @param {(values: import('./private.js').StoresValues<S>) => T} fn - function callback that aggregates the values
 * @param {T} [initial_value] - initial value
 * @returns {import('./public.js').Readable<T>}
 */

/**
 * @template {import('./private.js').Stores} S
 * @template T
 * @param {S} stores
 * @param {Function} fn
 * @param {T} [initial_value]
 * @returns {import('./public.js').Readable<T>}
 */
function derived(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	/** @type {Array<import('./public.js').Readable<any>>} */
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) {
		throw new Error('derived() expects stores as input, got a falsy value');
	}
	const auto = fn.length < 2;
	return readable(initial_value, (set, update) => {
		let started = false;
		const values = [];
		let pending = 0;
		let cleanup = noop$1;
		const sync = () => {
			if (pending) {
				return;
			}
			cleanup();
			const result = fn(single ? values[0] : values, set, update);
			if (auto) {
				set(result);
			} else {
				cleanup = is_function(result) ? result : noop$1;
			}
		};
		const unsubscribers = stores_array.map((store, i) =>
			subscribe(
				store,
				(value) => {
					values[i] = value;
					pending &= ~(1 << i);
					if (started) {
						sync();
					}
				},
				() => {
					pending |= 1 << i;
				}
			)
		);
		started = true;
		sync();
		return function stop() {
			run_all(unsubscribers);
			cleanup();
			// We need to set this to false because callbacks can still happen despite having unsubscribed:
			// Callbacks might already be placed in the queue which doesn't know it should no longer
			// invoke this derived store.
			started = false;
		};
	});
}

/**
 * Takes a store and returns a new one derived from the old one that is readable.
 *
 * https://svelte.dev/docs/svelte-store#readonly
 * @template T
 * @param {import('./public.js').Readable<T>} store  - store to make readonly
 * @returns {import('./public.js').Readable<T>}
 */
function readonly(store) {
	return {
		subscribe: store.subscribe.bind(store)
	};
}

function lightable(value) {
    function subscribe(run) {
        run(value);
        return () => {
            // don't need to unsub from anything
        };
    }
    return { subscribe };
}

function getElementByMeltId(id) {
    if (!isBrowser)
        return null;
    const el = document.querySelector(`[data-melt-id="${id}"]`);
    return isHTMLElement$1(el) ? el : null;
}
const hiddenAction = (obj) => {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
        },
        ownKeys(target) {
            return Reflect.ownKeys(target).filter((key) => key !== 'action');
        },
    });
};
const isFunctionWithParams = (fn) => {
    return typeof fn === 'function';
};
function builder(name, args) {
    const { stores, action, returned } = args ?? {};
    const derivedStore = (() => {
        if (stores && returned) {
            // If stores are provided, create a derived store from them
            return derived(stores, (values) => {
                const result = returned(values);
                if (isFunctionWithParams(result)) {
                    const fn = (...args) => {
                        return hiddenAction({
                            ...result(...args),
                            [`data-melt-${name}`]: '',
                            action: action ?? noop,
                        });
                    };
                    fn.action = action ?? noop;
                    return fn;
                }
                return hiddenAction({
                    ...result,
                    [`data-melt-${name}`]: '',
                    action: action ?? noop,
                });
            });
        }
        else {
            // If stores are not provided, return a lightable store, for consistency
            const returnedFn = returned;
            const result = returnedFn?.();
            if (isFunctionWithParams(result)) {
                const resultFn = (...args) => {
                    return hiddenAction({
                        ...result(...args),
                        [`data-melt-${name}`]: '',
                        action: action ?? noop,
                    });
                };
                resultFn.action = action ?? noop;
                return lightable(resultFn);
            }
            return lightable(hiddenAction({
                ...result,
                [`data-melt-${name}`]: '',
                action: action ?? noop,
            }));
        }
    })();
    const actionFn = (action ??
        (() => {
            /** noop */
        }));
    actionFn.subscribe = derivedStore.subscribe;
    return actionFn;
}
function createElHelpers(prefix) {
    const name = (part) => (part ? `${prefix}-${part}` : prefix);
    const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ''}`;
    const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ''}]`;
    const getEl = (part) => document.querySelector(selector(part));
    return {
        name,
        attribute,
        selector,
        getEl,
    };
}

const isBrowser = typeof document !== 'undefined';
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (v) => typeof v === 'function';
function isElement$1(element) {
    return element instanceof Element;
}
function isHTMLElement$1(element) {
    return element instanceof HTMLElement;
}
function isHTMLInputElement(element) {
    return element instanceof HTMLInputElement;
}
function isHTMLLabelElement(element) {
    return element instanceof HTMLLabelElement;
}
function isHTMLButtonElement(element) {
    return element instanceof HTMLButtonElement;
}
function isElementDisabled(element) {
    const ariaDisabled = element.getAttribute('aria-disabled');
    const disabled = element.getAttribute('disabled');
    const dataDisabled = element.hasAttribute('data-disabled');
    if (ariaDisabled === 'true' || disabled !== null || dataDisabled) {
        return true;
    }
    return false;
}
function isObject(value) {
    return value !== null && typeof value === 'object';
}
function isReadable(value) {
    return isObject(value) && 'subscribe' in value;
}

/**
 * Executes an array of callback functions with the same arguments.
 * @template T The types of the arguments that the callback functions take.
 * @param n array of callback functions to execute.
 * @returns A new function that executes all of the original callback functions with the same arguments.
 */
function executeCallbacks(...callbacks) {
    return (...args) => {
        for (const callback of callbacks) {
            if (typeof callback === 'function') {
                callback(...args);
            }
        }
    };
}
/**
 * A no operation function (does nothing)
 */
function noop() {
    //
}

/**
 * Adds an event listener to the specified target element(s) for the given event(s), and returns a function to remove it.
 * @param target The target element(s) to add the event listener to.
 * @param event The event(s) to listen for.
 * @param handler The function to be called when the event is triggered.
 * @param options An optional object that specifies characteristics about the event listener.
 * @returns A function that removes the event listener from the target element(s).
 */
function addEventListener(target, event, handler, options) {
    const events = Array.isArray(event) ? event : [event];
    // Add the event listener to each specified event for the target element(s).
    events.forEach((_event) => target.addEventListener(_event, handler, options));
    // Return a function that removes the event listener from the target element(s).
    return () => {
        events.forEach((_event) => target.removeEventListener(_event, handler, options));
    };
}
function addMeltEventListener(target, event, handler, options) {
    const events = Array.isArray(event) ? event : [event];
    if (typeof handler === 'function') {
        const handlerWithMelt = withMelt((_event) => handler(_event));
        // Add the event listener to each specified event for the target element(s).
        events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
        // Return a function that removes the event listener from the target element(s).
        return () => {
            events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
        };
    }
    return () => noop();
}
function dispatchMeltEvent(originalEvent) {
    const node = originalEvent.currentTarget;
    if (!isHTMLElement$1(node))
        return null;
    const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
        detail: {
            originalEvent,
        },
        cancelable: true,
    });
    node.dispatchEvent(customMeltEvent);
    return customMeltEvent;
}
function withMelt(handler) {
    return (event) => {
        const customEvent = dispatchMeltEvent(event);
        if (customEvent?.defaultPrevented)
            return;
        return handler(event);
    };
}

function addHighlight(element) {
    element.setAttribute('data-highlighted', '');
}
function removeHighlight(element) {
    element.removeAttribute('data-highlighted');
}

/** Retrieves all option descendants of a given element. */
function getOptions(el) {
    return Array.from(el.querySelectorAll('[role="option"]:not([data-disabled])')).filter((el) => isHTMLElement$1(el));
}

function omit(obj, ...keys) {
    const result = {};
    for (const key of Object.keys(obj)) {
        if (!keys.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
function stripValues(inputObject, toStrip, recursive) {
    return Object.fromEntries(Object.entries(inputObject).filter(([_, value]) => !dequal(value, toStrip)));
}

const overridable = (store, onChange) => {
    const update = (updater, sideEffect) => {
        store.update((curr) => {
            const next = updater(curr);
            let res = next;
            if (onChange) {
                res = onChange({ curr, next });
            }
            sideEffect?.(res);
            return res;
        });
    };
    const set = (curr) => {
        update(() => curr);
    };
    return {
        ...store,
        update,
        set,
    };
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let urlAlphabet$1 =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let nanoid$1 = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet$1[(Math.random() * 64) | 0];
  }
  return id
};

/**
 * A function that generates a random id
 * @returns An id
 */
function generateId$1() {
    return nanoid$1(10);
}
function generateIds(args) {
    return args.reduce((acc, curr) => {
        acc[curr] = generateId$1();
        return acc;
    }, {});
}

/**
 * A constant object that maps commonly used keyboard keys to their corresponding string values.
 * This object can be used in other parts of the application to handle keyboard input and prevent
 * hard-coded strings throughout.
 */
const kbd = {
    ALT: 'Alt',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    BACKSPACE: 'Backspace',
    CAPS_LOCK: 'CapsLock',
    CONTROL: 'Control',
    DELETE: 'Delete',
    END: 'End',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    F1: 'F1',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    HOME: 'Home',
    META: 'Meta',
    PAGE_DOWN: 'PageDown',
    PAGE_UP: 'PageUp',
    SHIFT: 'Shift',
    SPACE: ' ',
    TAB: 'Tab',
    CTRL: 'Control',
    ASTERISK: '*',
    A: 'a',
    P: 'p',
};
/** Key sets for navigation within lists, such as select, menu, and combobox. */
const FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
const LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

function debounce(fn, wait = 500) {
    let timeout = null;
    return function (...args) {
        const later = () => {
            timeout = null;
            fn(...args);
        };
        timeout && clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const isDom = () => typeof window !== 'undefined';
function getPlatform() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agent = navigator.userAgentData;
    return (agent?.platform ?? navigator.platform);
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();

// Modified from @zag-js/remove-scroll v0.10.2 (2023-06-10)
// Source: https://github.com/chakra-ui/zag
// https://github.com/chakra-ui/zag/blob/main/packages/utilities/remove-scroll/src/index.ts
const LOCK_CLASSNAME = 'data-melt-scroll-lock';
function assignStyle(el, style) {
    if (!el)
        return;
    const previousStyle = el.style.cssText;
    Object.assign(el.style, style);
    return () => {
        el.style.cssText = previousStyle;
    };
}
function setCSSProperty(el, property, value) {
    if (!el)
        return;
    const previousValue = el.style.getPropertyValue(property);
    el.style.setProperty(property, value);
    return () => {
        if (previousValue) {
            el.style.setProperty(property, previousValue);
        }
        else {
            el.style.removeProperty(property);
        }
    };
}
function getPaddingProperty(documentElement) {
    // RTL <body> scrollbar
    const documentLeft = documentElement.getBoundingClientRect().left;
    const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
    return scrollbarX ? 'paddingLeft' : 'paddingRight';
}
function removeScroll(_document) {
    const doc = _document ?? document;
    const win = doc.defaultView ?? window;
    const { documentElement, body } = doc;
    const locked = body.hasAttribute(LOCK_CLASSNAME);
    if (locked)
        return noop;
    body.setAttribute(LOCK_CLASSNAME, '');
    const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
    const setScrollbarWidthProperty = () => setCSSProperty(documentElement, '--scrollbar-width', `${scrollbarWidth}px`);
    const paddingProperty = getPaddingProperty(documentElement);
    const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
    const setStyle = () => assignStyle(body, {
        overflow: 'hidden',
        [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`,
    });
    // Only iOS doesn't respect `overflow: hidden` on document.body
    const setIOSStyle = () => {
        const { scrollX, scrollY, visualViewport } = win;
        // iOS 12 does not support `visuaViewport`.
        const offsetLeft = visualViewport?.offsetLeft ?? 0;
        const offsetTop = visualViewport?.offsetTop ?? 0;
        const restoreStyle = assignStyle(body, {
            position: 'fixed',
            overflow: 'hidden',
            top: `${-(scrollY - Math.floor(offsetTop))}px`,
            left: `${-(scrollX - Math.floor(offsetLeft))}px`,
            right: '0',
            [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`,
        });
        return () => {
            restoreStyle?.();
            win.scrollTo(scrollX, scrollY);
        };
    };
    const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
    return () => {
        cleanups.forEach((fn) => fn?.());
        body.removeAttribute(LOCK_CLASSNAME);
    };
}

/**
 * Helper function to standardize the way we derive a visible state for the
 * popper/floating elements.
 */
function derivedVisible(obj) {
    const { open, forceVisible, activeTrigger } = obj;
    return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}

const safeOnMount = (fn) => {
    try {
        onMount(fn);
    }
    catch {
        return fn();
    }
};
const safeOnDestroy = (fn) => {
    try {
        onDestroy(fn);
    }
    catch {
        return fn();
    }
};

/**
 * A utility function that creates a derived store that automatically
 * unsubscribes from its dependencies.
 *
 * @template S - The type of the stores object
 * @template T - The type of the derived store
 * @param stores - The stores object to derive from
 * @param fn - The function to derive the store from
 * @returns A derived store that automatically unsubscribes from its dependencies
 */
function derivedWithUnsubscribe(stores, fn) {
    let unsubscribers = [];
    const onUnsubscribe = (cb) => {
        unsubscribers.push(cb);
    };
    const unsubscribe = () => {
        // Call all of the unsubscribe functions from the previous run of the function
        unsubscribers.forEach((fn) => fn());
        // Clear the list of unsubscribe functions
        unsubscribers = [];
    };
    const derivedStore = derived(stores, ($storeValues) => {
        unsubscribe();
        return fn($storeValues, onUnsubscribe);
    });
    safeOnDestroy(unsubscribe);
    const subscribe = (...args) => {
        const unsub = derivedStore.subscribe(...args);
        return () => {
            unsub();
            unsubscribe();
        };
    };
    return {
        ...derivedStore,
        subscribe,
    };
}

/**
 * A utility function that creates an effect from a set of stores and a function.
 * The effect is automatically cleaned up when the component is destroyed.
 *
 * @template S - The type of the stores object
 * @param stores - The stores object to derive from
 * @param fn - The function to run when the stores change
 * @returns A function that can be used to unsubscribe the effect
 */
function effect(stores, fn) {
    // Create a derived store that contains the stores object and an onUnsubscribe function
    const unsub = derivedWithUnsubscribe(stores, (stores, onUnsubscribe) => {
        return {
            stores,
            onUnsubscribe,
        };
    }).subscribe(({ stores, onUnsubscribe }) => {
        const returned = fn(stores);
        // If the function returns a cleanup function, call it when the effect is unsubscribed
        if (returned) {
            onUnsubscribe(returned);
        }
    });
    // Automatically unsubscribe the effect when the component is destroyed
    safeOnDestroy(unsub);
    return unsub;
}

/**
 * Given an object of properties, returns an object of writable stores
 * with the same properties and values.
 */
function toWritableStores(properties) {
    const result = {};
    Object.keys(properties).forEach((key) => {
        const propertyKey = key;
        const value = properties[propertyKey];
        result[propertyKey] = writable(value);
    });
    return result;
}

/**
 * Manage roving focus between elements. Sets the current active element to
 * tabindex -1 and the next element to tabindex 0.
 *
 * @param nextElement The element to focus on
 */
function handleRovingFocus(nextElement) {
    if (!isBrowser)
        return;
    sleep(1).then(() => {
        const currentFocusedElement = document.activeElement;
        if (!isHTMLElement$1(currentFocusedElement) || currentFocusedElement === nextElement)
            return;
        currentFocusedElement.tabIndex = -1;
        if (nextElement) {
            nextElement.tabIndex = 0;
            nextElement.focus();
        }
    });
}

/**
 * Keys to ignore for typeahead so we aren't matching things
 * like `Shift menu item` or `Control center` or `Alt menu` when
 * a user presses those keys.
 */
const ignoredKeys = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock']);
/**
 * Default options for the typeahead search.
 * We default to roving focus when a match is found, but
 * you can override this with the `onMatch` option.
 */
const defaults$3 = {
    onMatch: handleRovingFocus,
    getCurrentItem: () => document.activeElement,
};
function createTypeaheadSearch(args = {}) {
    const withDefaults = { ...defaults$3, ...args };
    const typed = writable([]);
    const resetTyped = debounce(() => {
        typed.update(() => []);
    });
    const handleTypeaheadSearch = (key, items) => {
        if (ignoredKeys.has(key))
            return;
        const currentItem = withDefaults.getCurrentItem();
        const $typed = get_store_value(typed);
        if (!Array.isArray($typed)) {
            return;
        }
        $typed.push(key.toLowerCase());
        typed.set($typed);
        const candidateItems = items.filter((item) => {
            if (item.getAttribute('disabled') === 'true' ||
                item.getAttribute('aria-disabled') === 'true' ||
                item.hasAttribute('data-disabled')) {
                return false;
            }
            return true;
        });
        const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
        const normalizeSearch = isRepeated ? $typed[0] : $typed.join('');
        const currentItemIndex = isHTMLElement$1(currentItem) ? candidateItems.indexOf(currentItem) : -1;
        let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
        const excludeCurrentItem = normalizeSearch.length === 1;
        if (excludeCurrentItem) {
            wrappedItems = wrappedItems.filter((v) => v !== currentItem);
        }
        const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
        if (isHTMLElement$1(nextItem) && nextItem !== currentItem) {
            withDefaults.onMatch(nextItem);
        }
        resetTyped();
    };
    return {
        typed,
        resetTyped,
        handleTypeaheadSearch,
    };
}

/**
 * Get an element's ancestor which has a `data-portal` attribute.
 * This is used to handle nested portals/overlays/dialogs/popovers.
 */
function getPortalParent(node) {
    let parent = node.parentElement;
    while (isHTMLElement$1(parent) && !parent.hasAttribute('data-portal')) {
        parent = parent.parentElement;
    }
    return parent || 'body';
}
function getPortalDestination(node, portalProp) {
    const portalParent = getPortalParent(node);
    if (portalProp !== undefined)
        return portalProp;
    if (portalParent === 'body')
        return document.body;
    return null;
}

function createClickOutsideIgnore(meltId) {
    return (e) => {
        const target = e.target;
        const triggerEl = getElementByMeltId(meltId);
        if (!triggerEl || !isElement$1(target))
            return false;
        const id = triggerEl.id;
        if (isHTMLLabelElement(target) && id === target.htmlFor) {
            return true;
        }
        if (target.closest(`label[for="${id}"]`)) {
            return true;
        }
        return false;
    };
}

async function handleFocus(args) {
    const { prop, defaultEl } = args;
    await Promise.all([sleep(1), tick]);
    if (prop === undefined) {
        defaultEl?.focus();
        return;
    }
    const returned = isFunction(prop) ? prop(defaultEl) : prop;
    if (typeof returned === 'string') {
        // Get el by selector, focus it
        const el = document.querySelector(returned);
        if (!isHTMLElement$1(el))
            return;
        el.focus();
    }
    else if (isHTMLElement$1(returned)) {
        // Focus it
        returned.focus();
    }
}

// Modified from Grail UI v0.9.6 (2023-06-10)
// Source: https://github.com/grail-ui/grail-ui
// https://github.com/grail-ui/grail-ui/tree/master/packages/grail-ui/src/clickOutside/clickOutside.ts
/**
 * Creates a readable store that tracks the latest PointerEvent that occurred on the document.
 *
 * @returns A function to unsubscribe from the event listener and stop tracking pointer events.
 */
const documentClickStore = readable(undefined, (set) => {
    /**
     * Event handler for pointerdown events on the document.
     * Updates the store's value with the latest PointerEvent and then resets it to undefined.
     */
    function clicked(event) {
        set(event);
        // New subscriptions will not trigger immediately
        set(undefined);
    }
    // Adds a pointerdown event listener to the document, calling the clicked function when triggered.
    const unsubscribe = addEventListener(document, 'pointerup', clicked, {
        passive: false,
        capture: true,
    });
    // Returns a function to unsubscribe from the event listener and stop tracking pointer events.
    return unsubscribe;
});
const useClickOutside = (node, config = {}) => {
    let options = { enabled: true, ...config };
    // Returns true if the click outside handler is enabled
    function isEnabled() {
        return typeof options.enabled === 'boolean' ? options.enabled : get_store_value(options.enabled);
    }
    // Handle document clicks
    const unsubscribe = documentClickStore.subscribe((e) => {
        // If the click outside handler is disabled, or if the event is null or the node itself, return early
        if (!isEnabled() || !e || e.target === node) {
            return;
        }
        const composedPath = e.composedPath();
        // If the target is in the node, return early
        if (composedPath.includes(node))
            return;
        // If an ignore function is passed, check if it returns true
        if (options.ignore) {
            if (isFunction(options.ignore)) {
                if (options.ignore(e))
                    return;
            }
            // If an ignore array is passed, check if any elements in the array match the target
            else if (Array.isArray(options.ignore)) {
                if (options.ignore.length > 0 &&
                    options.ignore.some((ignoreEl) => {
                        return ignoreEl && (e.target === ignoreEl || composedPath.includes(ignoreEl));
                    }))
                    return;
            }
        }
        // If none of the above conditions are met, call the handler
        options.handler?.(e);
    });
    return {
        update(params) {
            options = { ...options, ...params };
        },
        destroy() {
            unsubscribe();
        },
    };
};

/**
 * Creates a readable store that tracks the latest Escape Keydown that occurred on the document.
 *
 * @returns A function to unsubscribe from the event listener and stop tracking keydown events.
 */
const documentEscapeKeyStore = readable(undefined, (set) => {
    /**
     * Event handler for keydown events on the document.
     * Updates the store's value with the latest Escape Keydown event and then resets it to undefined.
     */
    function keydown(event) {
        if (event && event.key === kbd.ESCAPE) {
            set(event);
        }
        // New subscriptions will not trigger immediately
        set(undefined);
    }
    // Adds a keydown event listener to the document, calling the keydown function when triggered.
    const unsubscribe = addEventListener(document, 'keydown', keydown, {
        passive: false,
    });
    // Returns a function to unsubscribe from the event listener and stop tracking keydown events.
    return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
    let unsub = noop;
    function update(config = {}) {
        unsub();
        const options = { enabled: true, ...config };
        const enabled = (isReadable(options.enabled) ? options.enabled : readable(options.enabled));
        unsub = executeCallbacks(
        // Handle escape keydowns
        documentEscapeKeyStore.subscribe((e) => {
            if (!e || !get_store_value(enabled))
                return;
            const target = e.target;
            if (!isHTMLElement$1(target) || target.closest('[data-escapee]') !== node) {
                return;
            }
            e.preventDefault();
            // If an ignore function is passed, check if it returns true
            if (options.ignore) {
                if (isFunction(options.ignore)) {
                    if (options.ignore(e))
                        return;
                }
                // If an ignore array is passed, check if any elements in the array match the target
                else if (Array.isArray(options.ignore)) {
                    if (options.ignore.length > 0 &&
                        options.ignore.some((ignoreEl) => {
                            return ignoreEl && target === ignoreEl;
                        }))
                        return;
                }
            }
            // If none of the above conditions are met, call the handler
            options.handler?.(e);
        }), effect(enabled, ($enabled) => {
            if ($enabled) {
                node.dataset.escapee = '';
            }
            else {
                delete node.dataset.escapee;
            }
        }));
    }
    update(config);
    return {
        update,
        destroy() {
            node.removeAttribute('data-escapee');
            unsub();
        },
    };
};

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle$1(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

const getElementRects = async function (_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...(await getDimensionsFn(floating))
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// Modified from Grail UI v0.9.6 (2023-06-10)
// Source: https://github.com/grail-ui/grail-ui
// https://github.com/grail-ui/grail-ui/tree/master/packages/grail-ui/src/floating/placement.ts
const defaultConfig$1 = {
    strategy: 'absolute',
    placement: 'top',
    gutter: 5,
    flip: true,
    sameWidth: false,
    overflowPadding: 8,
};
const ARROW_TRANSFORM = {
    bottom: 'rotate(45deg)',
    left: 'rotate(135deg)',
    top: 'rotate(225deg)',
    right: 'rotate(315deg)',
};
function useFloating(reference, floating, opts = {}) {
    if (!floating || !reference || opts === null)
        return {
            destroy: noop,
        };
    const options = { ...defaultConfig$1, ...opts };
    const arrowEl = floating.querySelector('[data-arrow=true]');
    const middleware = [];
    if (options.flip) {
        middleware.push(flip({
            boundary: options.boundary,
            padding: options.overflowPadding,
        }));
    }
    const arrowOffset = isHTMLElement$1(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
    if (options.gutter || options.offset) {
        const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
        if (data?.mainAxis != null) {
            data.mainAxis += arrowOffset;
        }
        middleware.push(offset(data));
    }
    middleware.push(shift({
        boundary: options.boundary,
        crossAxis: options.overlap,
        padding: options.overflowPadding,
    }));
    if (arrowEl) {
        middleware.push(arrow({ element: arrowEl, padding: 8 }));
    }
    middleware.push(size({
        padding: options.overflowPadding,
        apply({ rects, availableHeight, availableWidth }) {
            if (options.sameWidth) {
                Object.assign(floating.style, {
                    width: `${Math.round(rects.reference.width)}px`,
                    minWidth: 'unset',
                });
            }
            if (options.fitViewport) {
                Object.assign(floating.style, {
                    maxWidth: `${availableWidth}px`,
                    maxHeight: `${availableHeight}px`,
                });
            }
        },
    }));
    function compute() {
        if (!reference || !floating)
            return;
        const { placement, strategy } = options;
        computePosition(reference, floating, {
            placement,
            middleware,
            strategy,
        }).then((data) => {
            const x = Math.round(data.x);
            const y = Math.round(data.y);
            Object.assign(floating.style, {
                position: options.strategy,
                top: `${y}px`,
                left: `${x}px`,
            });
            if (isHTMLElement$1(arrowEl) && data.middlewareData.arrow) {
                const { x, y } = data.middlewareData.arrow;
                const dir = data.placement.split('-')[0];
                Object.assign(arrowEl.style, {
                    position: 'absolute',
                    left: x != null ? `${x}px` : '',
                    top: y != null ? `${y}px` : '',
                    [dir]: `calc(100% - ${arrowOffset}px)`,
                    transform: ARROW_TRANSFORM[dir],
                    backgroundColor: 'inherit',
                    zIndex: 'inherit',
                });
            }
            return data;
        });
    }
    // Apply `position` to floating element prior to the computePosition() call.
    Object.assign(floating.style, {
        position: options.strategy,
    });
    return {
        destroy: autoUpdate(reference, floating, compute),
    };
}

var focusTrap = {};

var dist = {};

/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/

Object.defineProperty(dist, '__esModule', { value: true });

// NOTE: separate `:not()` selectors has broader browser support than the newer
//  `:not([inert], [inert] *)` (Feb 2023)
// CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
//  the entire query to fail, resulting in no nodes found, which will break a lot
//  of things... so we have to rely on JS to identify nodes inside an inert container
var candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function (element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};

/**
 * Determines if a node is inert or in an inert ancestor.
 * @param {Element} [node]
 * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
 *  see if any of them are inert. If false, only `node` itself is considered.
 * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
 *  False if `node` is falsy.
 */
var isInert = function isInert(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
  //  JS API property; we have to check the attribute, which can either be empty or 'true';
  //  if it's `null` (not specified) or 'false', it's an active element
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
  var inert = inertAtt === '' || inertAtt === 'true';

  // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
  //  if it weren't for `matches()` not being a function on shadow roots; the following
  //  code works for any kind of node
  // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
  //  so it likely would not support `:is([inert] *)` either...
  var result = inert || lookUp && node && isInert(node.parentNode); // recursive

  return result;
};

/**
 * Determines if a node's content is editable.
 * @param {Element} [node]
 * @returns True if it's content-editable; false if it's not or `node` is falsy.
 */
var isContentEditable = function isContentEditable(node) {
  var _node$getAttribute2;
  // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
  //  to use the attribute directly to check for this, which can either be empty or 'true';
  //  if it's `null` (not specified) or 'false', it's a non-editable element
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
  return attValue === '' || attValue === 'true';
};

/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */
var getCandidates = function getCandidates(el, includeContainer, filter) {
  // even if `includeContainer=false`, we still have to check it for inertness because
  //  if it's inert, all its children are inert
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};

/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */
var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      // no need to look up since we're drilling down
      // anything inside this container will also be inert
      continue;
    }
    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }

      // iterate over shadow content if possible
      var shadowRoot = element.shadowRoot ||
      // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

      // no inert look up because we're already drilling down and checking for inertness
      //  on the way down, so all containers to this root node should have already been
      //  vetted as non-inert
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};

/**
 * @private
 * Determines if the node has an explicitly specified `tabindex` attribute.
 * @param {HTMLElement} node
 * @returns {boolean} True if so; false if not.
 */
var hasTabIndex = function hasTabIndex(node) {
  return !isNaN(parseInt(node.getAttribute('tabindex'), 10));
};

/**
 * Determine the tab index of a given node.
 * @param {HTMLElement} node
 * @returns {number} Tab order (negative, 0, or positive number).
 * @throws {Error} If `node` is falsy.
 */
var getTabIndex = function getTabIndex(node) {
  if (!node) {
    throw new Error('No node provided');
  }
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};

/**
 * Determine the tab index of a given node __for sort order purposes__.
 * @param {HTMLElement} node
 * @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
 *  has tabIndex -1, but needs to be sorted by document order in order for its content to be
 *  inserted into the correct sort position.
 * @returns {number} Tab order (negative, 0, or positive number).
 */
var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
  var _nodeRoot;
  // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // To further complicate things, we have to look all the way up until we find a shadow HOST
  //  that is attached (or find none) because the node might be in nested shadows...
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.
  // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
  //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
  //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
  //  `ownerDocument` will be `null`, hence the optional chaining on it.
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;

  // in some cases, a detached node will return itself as the root instead of a document or
  //  shadow root object, in which case, we shouldn't try to look further up the host chain
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
      //  which means we need to get the host's host and check if that parent host is contained
      //  in (i.e. attached to) the document
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;
  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }
      node = originalNode;
    }
    // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled

    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

    if (isNodeAttached(node)) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    }

    // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.
    //
    // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
    //  nodes as visible with the 'none' fallback.__
    if (displayCheck !== 'legacy-full') {
      return true; // hidden
    }
    // else, fallback to 'none' mode and consider the node visible
  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  }

  // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
  //  it's visible
  return false;
};

// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    // check if `node` is contained in a disabled <fieldset>
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          // when the first <legend> (in document order) is found
          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        }
        // the disabled <fieldset> containing `node` has no <legend>
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }

  // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled ||
  // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) ||
  // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.
  return false;
};

/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */
var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable$1 = function tabbable(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

dist.focusable = focusable;
dist.getTabIndex = getTabIndex;
dist.isFocusable = isFocusable;
dist.isTabbable = isTabbable;
dist.tabbable = tabbable$1;

/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

Object.defineProperty(focusTrap, '__esModule', { value: true });

var tabbable = dist;

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      // move this existing trap to the front of the queue
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};
var isEscapeEvent = function isEscapeEvent(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Escape' || (e === null || e === void 0 ? void 0 : e.key) === 'Esc' || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Tab' || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};

// checks for TAB by default
var isKeyForward = function isKeyForward(e) {
  return isTabEvent(e) && !e.shiftKey;
};

// checks for SHIFT+TAB by default
var isKeyBackward = function isKeyBackward(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay(fn) {
  return setTimeout(fn, 0);
};

// Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs
var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });

  return idx;
};

/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */
var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === 'function' ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

// NOTE: this must be _outside_ `createFocusTrap()` to make sure all traps in this
//  current instance use the same stack if `userOptions.trapStack` isn't specified
var internalTrapStack = [];
var createFocusTrap$1 = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward: isKeyForward,
    isKeyBackward: isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list

    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */
  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };

  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @param {Event} [event] If available, and `element` isn't directly found in any container,
   *  the event's composed path is used to see if includes any known trap containers in the
   *  case where the element is inside a Shadow DOM.
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */
  var findContainerIndex = function findContainerIndex(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : undefined;
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
        tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || ( // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };

  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */
  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      }
      // else, empty string (invalid), null (invalid), 0 (invalid)

      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus');

    // false explicitly indicates we want no initialFocus at all
    if (node === false) {
      return false;
    }
    if (node === undefined || !tabbable.isFocusable(node, config.tabbableOptions)) {
      // option not specified nor focusable: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;

        // NOTE: `fallbackFocus` option function cannot return `false` (not supported)
        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }
    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable.tabbable(container, config.tabbableOptions);

      // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes since nodes with negative `tabindex` attributes
      //  are focusable but not tabbable
      var focusableNodes = tabbable.focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : undefined;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : undefined;
      var firstDomTabbableNode = focusableNodes.find(function (node) {
        return tabbable.isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function (node) {
        return tabbable.isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function (node) {
        return tabbable.getTabIndex(node) > 0;
      });
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            // either not tabbable nor focusable, or was focused but not tabbable (negative tabindex):
            //  since `node` should at least have been focusable, we assume that's the case and mimic
            //  what browsers do, which is set focus to the next node in __document position order__,
            //  regardless of positive tabindexes, if any -- and for reasons explained in the NOTE
            //  above related to `firstDomTabbable` and `lastDomTabbable` properties, we fall back to
            //  basic DOM order
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function (el) {
                return tabbable.isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function (el) {
              return tabbable.isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    });

    // throw if no groups have tabbable nodes and we don't have a fallback focus node either
    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }

    // NOTE: Positive tabindexes are only properly supported in single-container traps because
    //  doing it across multiple containers where tabindexes could be all over the place
    //  would require Tabbable to support multiple containers, would require additional
    //  specialized Shadow DOM support, and would require Tabbable's multi-container support
    //  to look at those containers in document position order rather than user-provided
    //  order (as they are treated in Focus-trap, for legacy reasons). See discussion on
    //  https://github.com/focus-trap/focus-trap/issues/375 for more details.
    if (state.containerGroups.find(function (g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };

  /**
   * Gets the current activeElement. If it's a web-component and has open shadow-root
   * it will recursively search inside shadow roots for the "true" activeElement.
   *
   * @param {Document | ShadowRoot} el
   *
   * @returns {HTMLElement} The element that currently has the focus
   **/
  var getActiveElement = function getActiveElement(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    // NOTE: focus() API does not trigger focusIn event so set MRU node manually
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };

  /**
   * Finds the next node (in either direction) where focus should move according to a
   *  keyboard focus-in event.
   * @param {Object} params
   * @param {Node} [params.target] Known target __from which__ to navigate, if any.
   * @param {KeyboardEvent|FocusEvent} [params.event] Event to use if `target` isn't known (event
   *  will be used to determine the `target`). Ignored if `target` is specified.
   * @param {boolean} [params.isBackward] True if focus should move backward.
   * @returns {Node|undefined} The next node, or `undefined` if a next node couldn't be
   *  determined given the current state of the trap.
   */
  var findNextNavNode = function findNextNavNode(_ref2) {
    var target = _ref2.target,
      event = _ref2.event,
      _ref2$isBackward = _ref2.isBackward,
      isBackward = _ref2$isBackward === void 0 ? false : _ref2$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;
      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back into...
        if (isBackward) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        // REVERSE

        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var firstTabbableNode = _ref3.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = tabbable.getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          // user must have customized the nav keys so we have to move focus manually _within_
          //  the active group: do this based on the order determined by tabbable()
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        // FORWARD

        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref4) {
          var lastTabbableNode = _ref4.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = tabbable.getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          // user must have customized the nav keys so we have to move focus manually _within_
          //  the active group: do this based on the order determined by tabbable()
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      // no groups available
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }
    return destinationNode;
  };

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.
  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }

    // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)
    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    }

    // otherwise, prevent the click
    e.preventDefault();
  };

  // In case focus escapes the trap for some strange reason, pull it back in.
  // NOTE: the focusIn event is NOT cancelable, so if focus escapes, it may cause unexpected
  //  scrolling if the node that got focused was out of view; there's nothing we can do to
  //  prevent that from happening by the time we discover that focus escaped
  var checkFocusIn = function checkFocusIn(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;

    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      event.stopImmediatePropagation();

      // focus will escape if the MRU node had a positive tab index and user tried to nav forward;
      //  it will also escape if the MRU node had a 0 tab index and user tried to nav backward
      //  toward a node with a positive tab index
      var nextNode; // next node to focus, if we find one
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (tabbable.getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          // MRU container index must be >=0 otherwise we wouldn't have it as an MRU node...
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          // there MAY not be any tabbable nodes in the container if there are at least 2 containers
          //  and the MRU node is focusable but not tabbable (focus-trap requires at least 1 container
          //  with at least one tabbable node in order to function, so this could be the other container
          //  with nothing tabbable in it)
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            // MRU tab index MAY not be found if the MRU node is focusable but not tabbable
            var mruTabIdx = tabbableNodes.findIndex(function (node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
                // else, don't wrap within the container as focus should move to next/previous
                //  container
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
                // else, don't wrap within the container as focus should move to next/previous
                //  container
              }
              // else, don't find in container order without considering direction too
            }
          }
          // else, no tabbable nodes in that container (which means we must have at least one other
          //  container with at least one tabbable node in it, otherwise focus-trap would've thrown
          //  an error the last time updateTabbableNodes() was run): find next node among all known
          //  containers
        } else {
          // check to see if there's at least one tabbable node with a positive tab index inside
          //  the trap because focus seems to escape when navigating backward from a tabbable node
          //  with tabindex=0 when this is the case (instead of wrapping to the tabbable node with
          //  the greatest positive tab index like it should)
          if (!state.containerGroups.some(function (g) {
            return g.tabbableNodes.some(function (n) {
              return tabbable.getTabIndex(n) > 0;
            });
          })) {
            // no containers with tabbable nodes with positive tab indexes which means the focus
            //  escaped for some other reason and we should just execute the fallback to the
            //  MRU node or initial focus node, if any
            navAcrossContainers = false;
          }
        }
      } else {
        // no MRU node means we're likely in some initial condition when the trap has just
        //  been activated and initial focus hasn't been given yet, in which case we should
        //  fall through to trying to focus the initial focus node, which is what should
        //  happen below at this point in the logic
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        tryFocus(nextNode);
      } else {
        tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = undefined; // clear
  };

  // Hijack key nav events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.
  var checkKeyNav = function checkKeyNav(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event: event,
      isBackward: isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        // since tab natively moves focus, we wouldn't have a destination node unless we
        //  were on the edge of a container and had to move to the next/previous edge, in
        //  which case we want to prevent default to keep the browser from moving focus
        //  to where it normally would
        event.preventDefault();
      }
      tryFocus(destinationNode);
    }
    // else, let the browser take care of [shift+]tab and move the focus
  };

  var checkKey = function checkKey(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
      return;
    }
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };

  //
  // EVENT LISTENERS
  //

  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    }

    // There can be only one listening focus trap at a time
    activeFocusTraps.activateTrap(trapStack, trap);

    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  };

  //
  // MUTATION OBSERVER
  //

  var checkDomRemoval = function checkDomRemoval(mutations) {
    var isFocusedNodeRemoved = mutations.some(function (mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function (node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });

    // If the currently focused is removed then browsers will move focus to the
    // <body> element. If this happens, try to move focus back into the trap.
    if (isFocusedNodeRemoved) {
      tryFocus(getInitialFocusNode());
    }
  };

  // Use MutationObserver - if supported - to detect if focused node is removed
  // from the DOM.
  var mutationObserver = typeof window !== 'undefined' && 'MutationObserver' in window ? new MutationObserver(checkDomRemoval) : undefined;
  var updateObservedNodes = function updateObservedNodes() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function (container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };

  //
  // TRAP DEFINITION
  //

  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer); // noop if undefined
      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this;
      }
      var onPause = getOption(pauseOptions, 'onPause');
      var onPostPause = getOption(pauseOptions, 'onPostPause');
      state.paused = true;
      onPause === null || onPause === void 0 || onPause();
      removeListeners();
      updateObservedNodes();
      onPostPause === null || onPostPause === void 0 || onPostPause();
      return this;
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this;
      }
      var onUnpause = getOption(unpauseOptions, 'onUnpause');
      var onPostUnpause = getOption(unpauseOptions, 'onPostUnpause');
      state.paused = false;
      onUnpause === null || onUnpause === void 0 || onUnpause();
      updateTabbableNodes();
      addListeners();
      updateObservedNodes();
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    }
  };

  // initialize container elements
  trap.updateContainerElements(elements);
  return trap;
};

var createFocusTrap_1 = focusTrap.createFocusTrap = createFocusTrap$1;

// Modified from Grail UI v0.9.6 (2023-06-10)
// Source: https://github.com/grail-ui/grail-ui
// https://github.com/grail-ui/grail-ui/tree/master/packages/grail-ui/src/focusTrap/focusTrap.ts
function createFocusTrap(config = {}) {
    let trap;
    const { immediate, ...focusTrapOptions } = config;
    const hasFocus = writable(false);
    const isPaused = writable(false);
    const activate = (opts) => trap?.activate(opts);
    const deactivate = (opts) => {
        trap?.deactivate(opts);
    };
    const pause = () => {
        if (trap) {
            trap.pause();
            isPaused.set(true);
        }
    };
    const unpause = () => {
        if (trap) {
            trap.unpause();
            isPaused.set(false);
        }
    };
    const useFocusTrap = (node) => {
        trap = createFocusTrap_1(node, {
            ...focusTrapOptions,
            onActivate() {
                hasFocus.set(true);
                config.onActivate?.();
            },
            onDeactivate() {
                hasFocus.set(false);
                config.onDeactivate?.();
            },
        });
        if (immediate) {
            activate();
        }
        return {
            destroy() {
                deactivate();
                trap = undefined;
            },
        };
    };
    return {
        useFocusTrap,
        hasFocus: readonly(hasFocus),
        isPaused: readonly(isPaused),
        activate,
        deactivate,
        pause,
        unpause,
    };
}

/**
 * A special action for Melt UI's preprocessor `@melt-ui/pp`.
 *
 * @see https://www.melt-ui.com/docs/preprocessor
 *
 * @example
 * ```svelte
 * <script>
 * 	import { createLabel, melt } from '@melt-ui/svelte';
 * 	const { elements: { root } } = createLabel();
 * </script>
 *
 * <label use:melt={$root} />
 * ```
 */
function melt(node, params) {
    throw new Error("[MELTUI ERROR]: The `use:melt` action cannot be used without MeltUI's Preprocessor. See: https://www.melt-ui.com/docs/preprocessor");
}

const defaultConfig = {
    floating: {},
    focusTrap: {},
    clickOutside: {},
    escapeKeydown: {},
    portal: 'body',
};
const usePopper = (popperElement, args) => {
    popperElement.dataset.escapee = '';
    const { anchorElement, open, options } = args;
    if (!anchorElement || !open || !options) {
        return { destroy: noop };
    }
    const opts = { ...defaultConfig, ...options };
    const callbacks = [];
    if (opts.portal !== null) {
        const portal = usePortal(popperElement, opts.portal);
        if (portal?.destroy) {
            callbacks.push(portal.destroy);
        }
    }
    callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
    if (opts.focusTrap !== null) {
        const { useFocusTrap } = createFocusTrap({
            immediate: true,
            escapeDeactivates: false,
            allowOutsideClick: true,
            returnFocusOnDeactivate: false,
            fallbackFocus: popperElement,
            ...opts.focusTrap,
        });
        const usedFocusTrap = useFocusTrap(popperElement);
        if (usedFocusTrap?.destroy) {
            callbacks.push(usedFocusTrap.destroy);
        }
    }
    if (opts.clickOutside !== null) {
        callbacks.push(useClickOutside(popperElement, {
            enabled: open,
            handler: (e) => {
                if (e.defaultPrevented)
                    return;
                if (isHTMLElement$1(anchorElement) && !anchorElement.contains(e.target)) {
                    open.set(false);
                    anchorElement.focus();
                }
            },
            ...opts.clickOutside,
        }).destroy);
    }
    if (opts.escapeKeydown !== null) {
        callbacks.push(useEscapeKeydown(popperElement, {
            enabled: open,
            handler: () => {
                open.set(false);
            },
            ...opts.escapeKeydown,
        }).destroy);
    }
    // @ts-expect-error - This works and is correct, but TS doesn't like it
    const unsubscribe = executeCallbacks(...callbacks);
    return {
        destroy() {
            unsubscribe();
        },
    };
};

const usePortal = (el, target = 'body') => {
    let targetEl;
    if (!isHTMLElement$1(target) && typeof target !== 'string') {
        return {
            destroy: noop,
        };
    }
    async function update(newTarget) {
        target = newTarget;
        if (typeof target === 'string') {
            targetEl = document.querySelector(target);
            if (targetEl === null) {
                await tick();
                targetEl = document.querySelector(target);
            }
            if (targetEl === null) {
                throw new Error(`No element found matching css selector: "${target}"`);
            }
        }
        else if (target instanceof HTMLElement) {
            targetEl = target;
        }
        else {
            throw new TypeError(`Unknown portal target type: ${target === null ? 'null' : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
        }
        el.dataset.portal = '';
        targetEl.appendChild(el);
        el.hidden = false;
    }
    function destroy() {
        el.remove();
    }
    update(target);
    return {
        update,
        destroy,
    };
};

function createLabel() {
    const root = builder('label', {
        action: (node) => {
            const mouseDown = addMeltEventListener(node, 'mousedown', (e) => {
                if (!e.defaultPrevented && e.detail > 1) {
                    e.preventDefault();
                }
            });
            return {
                destroy: mouseDown,
            };
        },
    });
    return {
        elements: {
            root,
        },
    };
}

// prettier-ignore
const INTERACTION_KEYS = [kbd.ARROW_LEFT, kbd.ESCAPE, kbd.ARROW_RIGHT, kbd.SHIFT, kbd.CAPS_LOCK, kbd.CONTROL, kbd.ALT, kbd.META, kbd.ENTER, kbd.F1, kbd.F2, kbd.F3, kbd.F4, kbd.F5, kbd.F6, kbd.F7, kbd.F8, kbd.F9, kbd.F10, kbd.F11, kbd.F12];
const defaults$2 = {
    positioning: {
        placement: 'bottom',
        sameWidth: true,
    },
    scrollAlignment: 'nearest',
    loop: true,
    defaultOpen: false,
    closeOnOutsideClick: true,
    preventScroll: true,
    closeOnEscape: true,
    forceVisible: false,
    portal: undefined,
    builder: 'listbox',
    disabled: false,
    required: false,
    name: undefined,
    typeahead: true,
    highlightOnHover: true,
    onOutsideClick: undefined,
};
const listboxIdParts = ['trigger', 'menu', 'label'];
/**
 * Creates an ARIA-1.2-compliant listbox.
 *
 * @TODO multi-select using `tags-input` builder?
 */
function createListbox(props) {
    const withDefaults = { ...defaults$2, ...props };
    // Trigger element for the popper portal. This will be our input element.
    const activeTrigger = writable(null);
    // The currently highlighted menu item.
    const highlightedItem = writable(null);
    const selectedWritable = withDefaults.selected ?? writable(withDefaults.defaultSelected);
    const selected = overridable(selectedWritable, withDefaults?.onSelectedChange);
    const highlighted = derived(highlightedItem, ($highlightedItem) => $highlightedItem ? getOptionProps($highlightedItem) : undefined);
    // Either the provided open store or a store with the default open value
    const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
    // The overridable open store which is the source of truth for the open state.
    const open = overridable(openWritable, withDefaults?.onOpenChange);
    const options = toWritableStores({
        ...omit(withDefaults, 'open', 'defaultOpen', 'builder', 'ids'),
        multiple: withDefaults.multiple ?? false,
    });
    const { scrollAlignment, loop, closeOnOutsideClick, closeOnEscape, preventScroll, portal, forceVisible, positioning, multiple, arrowSize, disabled, required, typeahead, name: nameProp, highlightOnHover, onOutsideClick, } = options;
    const { name, selector } = createElHelpers(withDefaults.builder);
    const ids = toWritableStores({ ...generateIds(listboxIdParts), ...withDefaults.ids });
    const { handleTypeaheadSearch } = createTypeaheadSearch({
        onMatch: (element) => {
            highlightedItem.set(element);
            element.scrollIntoView({ block: get_store_value(scrollAlignment) });
        },
        getCurrentItem() {
            return get_store_value(highlightedItem);
        },
    });
    /** ------- */
    /** HELPERS */
    /** ------- */
    function getOptionProps(el) {
        const value = el.getAttribute('data-value');
        const label = el.getAttribute('data-label');
        const disabled = el.hasAttribute('data-disabled');
        return {
            value: value ? JSON.parse(value) : value,
            label: label ?? el.textContent ?? undefined,
            disabled: disabled ? true : false,
        };
    }
    const setOption = (newOption) => {
        selected.update(($option) => {
            const $multiple = get_store_value(multiple);
            if ($multiple) {
                const optionArr = Array.isArray($option) ? $option : [];
                return toggle(newOption, optionArr, (itemA, itemB) => dequal(itemA.value, itemB.value));
            }
            return newOption;
        });
    };
    /**
     * Selects an item from the menu
     * @param index array index of the item to select.
     */
    function selectItem(item) {
        const props = getOptionProps(item);
        setOption(props);
    }
    /**
     * Opens the menu, sets the active trigger, and highlights
     * the selected item (if one exists). It also optionally accepts the current
     * open state to prevent unnecessary updates if we know the menu is already open.
     */
    async function openMenu() {
        open.set(true);
        const triggerEl = document.getElementById(get_store_value(ids.trigger));
        if (!triggerEl)
            return;
        // The active trigger is used to anchor the menu to the input element.
        activeTrigger.set(triggerEl);
        // Wait a tick for the menu to open then highlight the selected item.
        await tick();
        const menuElement = document.getElementById(get_store_value(ids.menu));
        if (!isHTMLElement$1(menuElement))
            return;
        const selectedItem = menuElement.querySelector('[aria-selected=true]');
        if (!isHTMLElement$1(selectedItem))
            return;
        highlightedItem.set(selectedItem);
    }
    /** Closes the menu & clears the active trigger */
    function closeMenu() {
        open.set(false);
        highlightedItem.set(null);
    }
    /**
     * To properly anchor the popper to the input/trigger, we need to ensure both
     * the open state is true and the activeTrigger is not null. This helper store's
     * value is true when both of these conditions are met and keeps the code tidy.
     */
    const isVisible = derivedVisible({ open, forceVisible, activeTrigger });
    /* ------ */
    /* STATES */
    /* ------ */
    /**
     * Determines if a given item is selected.
     * This is useful for displaying additional markup on the selected item.
     */
    const isSelected = derived([selected], ([$selected]) => {
        return (value) => {
            if (Array.isArray($selected)) {
                return $selected.some((o) => dequal(o.value, value));
            }
            if (isObject(value)) {
                return dequal($selected?.value, stripValues(value, undefined));
            }
            return dequal($selected?.value, value);
        };
    });
    /**
     * Determines if a given item is highlighted.
     * This is useful for displaying additional markup on the highlighted item.
     */
    const isHighlighted = derived([highlighted], ([$value]) => {
        return (item) => {
            return dequal($value?.value, item);
        };
    });
    /* -------- */
    /* ELEMENTS */
    /* -------- */
    /** Action and attributes for the text input. */
    const trigger = builder(name('trigger'), {
        stores: [open, highlightedItem, disabled, ids.menu, ids.trigger, ids.label],
        returned: ([$open, $highlightedItem, $disabled, $menuId, $triggerId, $labelId]) => {
            return {
                'aria-activedescendant': $highlightedItem?.id,
                'aria-autocomplete': 'list',
                'aria-controls': $menuId,
                'aria-expanded': $open,
                'aria-labelledby': $labelId,
                // autocomplete: 'off',
                id: $triggerId,
                role: 'combobox',
                disabled: disabledAttr($disabled),
            };
        },
        action: (node) => {
            const isInput = isHTMLInputElement(node);
            const unsubscribe = executeCallbacks(addMeltEventListener(node, 'click', () => {
                node.focus(); // Fix for safari not adding focus on trigger
                const $open = get_store_value(open);
                if ($open) {
                    closeMenu();
                }
                else {
                    openMenu();
                }
            }), 
            // Handle all input key events including typing, meta, and navigation.
            addMeltEventListener(node, 'keydown', (e) => {
                const $open = get_store_value(open);
                /**
                 * When the menu is closed...
                 */
                if (!$open) {
                    // Pressing one of the interaction keys shouldn't open the menu.
                    if (INTERACTION_KEYS.includes(e.key)) {
                        return;
                    }
                    // Tab should not open the menu.
                    if (e.key === kbd.TAB) {
                        return;
                    }
                    // Pressing backspace when the input is blank shouldn't open the menu.
                    if (e.key === kbd.BACKSPACE && isInput && node.value === '') {
                        return;
                    }
                    // Clicking space on a button triggers a click event. We don't want to
                    // open the menu in this case, and we let the click handler handle it.
                    if (e.key === kbd.SPACE && isHTMLButtonElement(node)) {
                        return;
                    }
                    // All other events should open the menu.
                    openMenu();
                    tick().then(() => {
                        const $selectedItem = get_store_value(selected);
                        if ($selectedItem)
                            return;
                        const menuEl = document.getElementById(get_store_value(ids.menu));
                        if (!isHTMLElement$1(menuEl))
                            return;
                        const enabledItems = Array.from(menuEl.querySelectorAll(`${selector('item')}:not([data-disabled]):not([data-hidden])`)).filter((item) => isHTMLElement$1(item));
                        if (!enabledItems.length)
                            return;
                        if (e.key === kbd.ARROW_DOWN) {
                            highlightedItem.set(enabledItems[0]);
                            enabledItems[0].scrollIntoView({ block: get_store_value(scrollAlignment) });
                        }
                        else if (e.key === kbd.ARROW_UP) {
                            highlightedItem.set(last(enabledItems));
                            last(enabledItems).scrollIntoView({ block: get_store_value(scrollAlignment) });
                        }
                    });
                }
                /**
                 * When the menu is open...
                 */
                // Pressing `esc` should close the menu.
                if (e.key === kbd.TAB) {
                    closeMenu();
                    return;
                }
                // Pressing enter with a highlighted item should select it.
                if (e.key === kbd.ENTER || (e.key === kbd.SPACE && isHTMLButtonElement(node))) {
                    e.preventDefault();
                    const $highlightedItem = get_store_value(highlightedItem);
                    if ($highlightedItem) {
                        selectItem($highlightedItem);
                    }
                    if (!get_store_value(multiple)) {
                        closeMenu();
                    }
                }
                // Pressing Alt + Up should close the menu.
                if (e.key === kbd.ARROW_UP && e.altKey) {
                    closeMenu();
                }
                // Navigation (up, down, etc.) should change the highlighted item.
                if (FIRST_LAST_KEYS.includes(e.key)) {
                    e.preventDefault();
                    // Get all the menu items.
                    const menuElement = document.getElementById(get_store_value(ids.menu));
                    if (!isHTMLElement$1(menuElement))
                        return;
                    const itemElements = getOptions(menuElement);
                    if (!itemElements.length)
                        return;
                    // Disabled items can't be highlighted. Skip them.
                    const candidateNodes = itemElements.filter((opt) => !isElementDisabled(opt) && opt.dataset.hidden === undefined);
                    // Get the index of the currently highlighted item.
                    const $currentItem = get_store_value(highlightedItem);
                    const currentIndex = $currentItem ? candidateNodes.indexOf($currentItem) : -1;
                    // Find the next menu item to highlight.
                    const $loop = get_store_value(loop);
                    const $scrollAlignment = get_store_value(scrollAlignment);
                    let nextItem;
                    switch (e.key) {
                        case kbd.ARROW_DOWN:
                            nextItem = next(candidateNodes, currentIndex, $loop);
                            break;
                        case kbd.ARROW_UP:
                            nextItem = prev(candidateNodes, currentIndex, $loop);
                            break;
                        case kbd.PAGE_DOWN:
                            nextItem = forward(candidateNodes, currentIndex, 10, $loop);
                            break;
                        case kbd.PAGE_UP:
                            nextItem = back(candidateNodes, currentIndex, 10, $loop);
                            break;
                        case kbd.HOME:
                            nextItem = candidateNodes[0];
                            break;
                        case kbd.END:
                            nextItem = last(candidateNodes);
                            break;
                        default:
                            return;
                    }
                    // Highlight the new item and scroll it into view.
                    highlightedItem.set(nextItem);
                    nextItem?.scrollIntoView({ block: $scrollAlignment });
                }
                else if (get_store_value(typeahead)) {
                    const menuEl = document.getElementById(get_store_value(ids.menu));
                    if (!isHTMLElement$1(menuEl))
                        return;
                    handleTypeaheadSearch(e.key, getOptions(menuEl));
                }
            }));
            let unsubEscapeKeydown = noop;
            const escape = useEscapeKeydown(node, {
                handler: closeMenu,
                enabled: derived([open, closeOnEscape], ([$open, $closeOnEscape]) => {
                    return $open && $closeOnEscape;
                }),
            });
            if (escape && escape.destroy) {
                unsubEscapeKeydown = escape.destroy;
            }
            return {
                destroy() {
                    unsubscribe();
                    unsubEscapeKeydown();
                },
            };
        },
    });
    /**
     * Action and attributes for the menu element.
     */
    const menu = builder(name('menu'), {
        stores: [isVisible, ids.menu],
        returned: ([$isVisible, $menuId]) => {
            return {
                hidden: $isVisible ? undefined : true,
                id: $menuId,
                role: 'listbox',
                style: styleToString({ display: $isVisible ? undefined : 'none' }),
            };
        },
        action: (node) => {
            let unsubPopper = noop;
            const unsubscribe = executeCallbacks(
            // Bind the popper portal to the input element.
            effect([isVisible, portal, closeOnOutsideClick, positioning, activeTrigger], ([$isVisible, $portal, $closeOnOutsideClick, $positioning, $activeTrigger]) => {
                unsubPopper();
                if (!$isVisible || !$activeTrigger)
                    return;
                const ignoreHandler = createClickOutsideIgnore(get_store_value(ids.trigger));
                const popper = usePopper(node, {
                    anchorElement: $activeTrigger,
                    open,
                    options: {
                        floating: $positioning,
                        focusTrap: null,
                        clickOutside: $closeOnOutsideClick
                            ? {
                                handler: (e) => {
                                    get_store_value(onOutsideClick)?.(e);
                                    if (e.defaultPrevented)
                                        return;
                                    const target = e.target;
                                    if (!isElement$1(target))
                                        return;
                                    if (target === $activeTrigger || $activeTrigger.contains(target)) {
                                        return;
                                    }
                                    closeMenu();
                                },
                                ignore: ignoreHandler,
                            }
                            : null,
                        escapeKeydown: null,
                        portal: getPortalDestination(node, $portal),
                    },
                });
                if (popper && popper.destroy) {
                    unsubPopper = popper.destroy;
                }
            }));
            return {
                destroy: () => {
                    unsubscribe();
                    unsubPopper();
                },
            };
        },
    });
    // Use our existing label builder to create a label for the listbox input.
    const { elements: { root: labelBuilder }, } = createLabel();
    const { action: labelAction } = get_store_value(labelBuilder);
    const label = builder(name('label'), {
        stores: [ids.label, ids.trigger],
        returned: ([$labelId, $triggerId]) => {
            return {
                id: $labelId,
                for: $triggerId,
            };
        },
        action: labelAction,
    });
    const option = builder(name('option'), {
        stores: [isSelected],
        returned: ([$isSelected]) => (props) => {
            const selected = $isSelected(props.value);
            return {
                'data-value': JSON.stringify(props.value),
                'data-label': props.label,
                'data-disabled': disabledAttr(props.disabled),
                'aria-disabled': props.disabled ? true : undefined,
                'aria-selected': selected,
                'data-selected': selected ? '' : undefined,
                id: generateId$1(),
                role: 'option',
            };
        },
        action: (node) => {
            const unsubscribe = executeCallbacks(addMeltEventListener(node, 'click', (e) => {
                // If the item is disabled, `preventDefault` to stop the input losing focus.
                if (isElementDisabled(node)) {
                    e.preventDefault();
                    return;
                }
                // Otherwise, select the item and close the menu.
                selectItem(node);
                if (!get_store_value(multiple)) {
                    closeMenu();
                }
            }), effect(highlightOnHover, ($highlightOnHover) => {
                if (!$highlightOnHover)
                    return;
                const unsub = executeCallbacks(addMeltEventListener(node, 'mouseover', () => {
                    highlightedItem.set(node);
                }), addMeltEventListener(node, 'mouseleave', () => {
                    highlightedItem.set(null);
                }));
                return unsub;
            }));
            return { destroy: unsubscribe };
        },
    });
    const hiddenInput = builder(name('hidden-input'), {
        stores: [selected, required, nameProp],
        returned: ([$selected, $required, $name]) => {
            const value = Array.isArray($selected) ? $selected.map((o) => o.value) : $selected?.value;
            return {
                ...hiddenInputAttrs,
                required: $required ? true : undefined,
                value,
                name: $name,
            };
        },
    });
    const arrow = builder(name('arrow'), {
        stores: arrowSize,
        returned: ($arrowSize) => ({
            'data-arrow': true,
            style: styleToString({
                position: 'absolute',
                width: `var(--arrow-size, ${$arrowSize}px)`,
                height: `var(--arrow-size, ${$arrowSize}px)`,
            }),
        }),
    });
    /* ------------------- */
    /* LIFECYCLE & EFFECTS */
    /* ------------------- */
    safeOnMount(() => {
        if (!isBrowser)
            return;
        const menuEl = document.getElementById(get_store_value(ids.menu));
        if (!menuEl)
            return;
        const triggerEl = document.getElementById(get_store_value(ids.trigger));
        if (triggerEl) {
            activeTrigger.set(triggerEl);
        }
        const selectedEl = menuEl.querySelector('[data-selected]');
        if (!isHTMLElement$1(selectedEl))
            return;
    });
    /**
     * Handles moving the `data-highlighted` attribute between items when
     * the user moves their pointer or navigates with their keyboard.
     */
    effect([highlightedItem], ([$highlightedItem]) => {
        if (!isBrowser)
            return;
        const menuElement = document.getElementById(get_store_value(ids.menu));
        if (!isHTMLElement$1(menuElement))
            return;
        getOptions(menuElement).forEach((node) => {
            if (node === $highlightedItem) {
                addHighlight(node);
            }
            else {
                removeHighlight(node);
            }
        });
    });
    effect([open], ([$open]) => {
        if (!isBrowser)
            return;
        let unsubScroll = noop;
        if (get_store_value(preventScroll) && $open) {
            unsubScroll = removeScroll();
        }
        return () => {
            unsubScroll();
        };
    });
    return {
        ids,
        elements: {
            trigger,
            option,
            menu,
            label,
            hiddenInput,
            arrow,
        },
        states: {
            open,
            selected,
            highlighted,
            highlightedItem,
        },
        helpers: {
            isSelected,
            isHighlighted,
            closeMenu,
        },
        options,
    };
}

const { name: name$1 } = createElHelpers('dialog');
const defaults$1 = {
    preventScroll: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    role: 'dialog',
    defaultOpen: false,
    portal: 'body',
    forceVisible: false,
    openFocus: undefined,
    closeFocus: undefined,
    onOutsideClick: undefined,
};
const openDialogIds = writable([]);
const dialogIdParts = ['content', 'title', 'description'];
function createDialog(props) {
    const withDefaults = { ...defaults$1, ...props };
    const options = toWritableStores(omit(withDefaults, 'ids'));
    const { preventScroll, closeOnEscape, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick, } = options;
    const activeTrigger = writable(null);
    const ids = toWritableStores({
        ...generateIds(dialogIdParts),
        ...withDefaults.ids,
    });
    const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
    const open = overridable(openWritable, withDefaults?.onOpenChange);
    const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
        return $open || $forceVisible;
    });
    let unsubScroll = noop;
    function handleOpen(e) {
        const el = e.currentTarget;
        const triggerEl = e.currentTarget;
        if (!isHTMLElement$1(el) || !isHTMLElement$1(triggerEl))
            return;
        open.set(true);
        activeTrigger.set(triggerEl);
    }
    function handleClose() {
        open.set(false);
        handleFocus({
            prop: get_store_value(closeFocus),
            defaultEl: get_store_value(activeTrigger),
        });
    }
    effect([open], ([$open]) => {
        // Prevent double clicks from closing multiple dialogs
        sleep(100).then(() => {
            if ($open) {
                openDialogIds.update((prev) => {
                    prev.push(get_store_value(ids.content));
                    return prev;
                });
            }
            else {
                openDialogIds.update((prev) => prev.filter((id) => id !== get_store_value(ids.content)));
            }
        });
    });
    const trigger = builder(name$1('trigger'), {
        stores: [open],
        returned: ([$open]) => {
            return {
                'aria-haspopup': 'dialog',
                'aria-expanded': $open,
                type: 'button',
            };
        },
        action: (node) => {
            const unsub = executeCallbacks(addMeltEventListener(node, 'click', (e) => {
                handleOpen(e);
            }), addMeltEventListener(node, 'keydown', (e) => {
                if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
                    return;
                e.preventDefault();
                handleOpen(e);
            }));
            return {
                destroy: unsub,
            };
        },
    });
    const overlay = builder(name$1('overlay'), {
        stores: [isVisible],
        returned: ([$isVisible]) => {
            return {
                hidden: $isVisible ? undefined : true,
                tabindex: -1,
                style: styleToString({
                    display: $isVisible ? undefined : 'none',
                }),
                'aria-hidden': true,
                'data-state': $isVisible ? 'open' : 'closed',
            };
        },
        action: (node) => {
            let unsubEscapeKeydown = noop;
            if (get_store_value(closeOnEscape)) {
                const escapeKeydown = useEscapeKeydown(node, {
                    handler: () => {
                        handleClose();
                    },
                });
                if (escapeKeydown && escapeKeydown.destroy) {
                    unsubEscapeKeydown = escapeKeydown.destroy;
                }
            }
            return {
                destroy() {
                    unsubEscapeKeydown();
                },
            };
        },
    });
    const content = builder(name$1('content'), {
        stores: [isVisible, ids.content, ids.description, ids.title],
        returned: ([$isVisible, $contentId, $descriptionId, $titleId]) => {
            return {
                id: $contentId,
                role: get_store_value(role),
                'aria-describedby': $descriptionId,
                'aria-labelledby': $titleId,
                'aria-modal': $isVisible ? 'true' : undefined,
                'data-state': $isVisible ? 'open' : 'closed',
                tabindex: -1,
                hidden: $isVisible ? undefined : true,
                style: styleToString({
                    display: $isVisible ? undefined : 'none',
                }),
            };
        },
        action: (node) => {
            let activate = noop;
            let deactivate = noop;
            const destroy = executeCallbacks(effect([open], ([$open]) => {
                if (!$open)
                    return;
                const focusTrap = createFocusTrap({
                    immediate: false,
                    escapeDeactivates: true,
                    clickOutsideDeactivates: true,
                    returnFocusOnDeactivate: false,
                    fallbackFocus: node,
                });
                activate = focusTrap.activate;
                deactivate = focusTrap.deactivate;
                const ac = focusTrap.useFocusTrap(node);
                if (ac && ac.destroy) {
                    return ac.destroy;
                }
                else {
                    return focusTrap.deactivate;
                }
            }), effect([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
                return useClickOutside(node, {
                    enabled: $open,
                    handler: (e) => {
                        get_store_value(onOutsideClick)?.(e);
                        if (e.defaultPrevented)
                            return;
                        const $openDialogIds = get_store_value(openDialogIds);
                        const isLast = last($openDialogIds) === get_store_value(ids.content);
                        if ($closeOnOutsideClick && isLast) {
                            handleClose();
                        }
                    },
                }).destroy;
            }), effect([closeOnEscape], ([$closeOnEscape]) => {
                if (!$closeOnEscape)
                    return noop;
                const escapeKeydown = useEscapeKeydown(node, {
                    handler: () => {
                        handleClose();
                    },
                });
                if (escapeKeydown && escapeKeydown.destroy) {
                    return escapeKeydown.destroy;
                }
                return noop;
            }), effect([isVisible], ([$isVisible]) => {
                tick().then(() => {
                    if (!$isVisible) {
                        deactivate();
                    }
                    else {
                        activate();
                    }
                });
            }));
            return {
                destroy: () => {
                    unsubScroll();
                    destroy();
                },
            };
        },
    });
    const portalled = builder(name$1('portalled'), {
        stores: portal,
        returned: ($portal) => ({
            'data-portal': $portal ? '' : undefined,
        }),
        action: (node) => {
            const unsubPortal = effect([portal], ([$portal]) => {
                if (!$portal)
                    return noop;
                const portalDestination = getPortalDestination(node, $portal);
                if (portalDestination === null)
                    return noop;
                const portalAction = usePortal(node, portalDestination);
                if (portalAction && portalAction.destroy) {
                    return portalAction.destroy;
                }
                else {
                    return noop;
                }
            });
            return {
                destroy() {
                    unsubPortal();
                },
            };
        },
    });
    const title = builder(name$1('title'), {
        stores: [ids.title],
        returned: ([$titleId]) => ({
            id: $titleId,
        }),
    });
    const description = builder(name$1('description'), {
        stores: [ids.description],
        returned: ([$descriptionId]) => ({
            id: $descriptionId,
        }),
    });
    const close = builder(name$1('close'), {
        returned: () => ({
            type: 'button',
        }),
        action: (node) => {
            const unsub = executeCallbacks(addMeltEventListener(node, 'click', () => {
                handleClose();
            }), addMeltEventListener(node, 'keydown', (e) => {
                if (e.key !== kbd.SPACE && e.key !== kbd.ENTER)
                    return;
                e.preventDefault();
                handleClose();
            }));
            return {
                destroy: unsub,
            };
        },
    });
    effect([open, preventScroll], ([$open, $preventScroll]) => {
        if (!isBrowser)
            return;
        if ($preventScroll && $open)
            unsubScroll = removeScroll();
        if ($open) {
            const contentEl = document.getElementById(get_store_value(ids.content));
            handleFocus({ prop: get_store_value(openFocus), defaultEl: contentEl });
        }
        return () => {
            // we only want to remove the scroll lock if the dialog is not forced visible
            // otherwise the scroll removal is handled in the `destroy` of the `content` builder
            if (!get_store_value(forceVisible)) {
                unsubScroll();
            }
        };
    });
    return {
        ids,
        elements: {
            content,
            trigger,
            title,
            description,
            overlay,
            close,
            portalled,
        },
        states: {
            open,
        },
        options,
    };
}

const { name } = createElHelpers('select');
function createSelect(props) {
    const listbox = createListbox({ ...props, builder: 'select' });
    const group = builder(name('group'), {
        returned: () => {
            return (groupId) => ({
                role: 'group',
                'aria-labelledby': groupId,
            });
        },
    });
    const groupLabel = builder(name('group-label'), {
        returned: () => {
            return (groupId) => ({
                id: groupId,
            });
        },
    });
    const selectedLabel = derived(listbox.states.selected, ($selected) => {
        if (Array.isArray($selected)) {
            return $selected.map((o) => o.label).join(', ');
        }
        return $selected?.label ?? '';
    });
    return {
        ...listbox,
        elements: {
            ...listbox.elements,
            group,
            groupLabel,
        },
        states: {
            ...listbox.states,
            selectedLabel,
        },
    };
}

const defaults = {
    orientation: 'horizontal',
    decorative: false,
};
const createSeparator = (props) => {
    const withDefaults = { ...defaults, ...props };
    const options = toWritableStores(withDefaults);
    const { orientation, decorative } = options;
    const root = builder('separator', {
        stores: [orientation, decorative],
        returned: ([$orientation, $decorative]) => {
            const ariaOrientation = $orientation === 'vertical' ? $orientation : undefined;
            return {
                role: $decorative ? 'none' : 'separator',
                'aria-orientation': ariaOrientation,
                'aria-hidden': $decorative,
                'data-orientation': $orientation,
            };
        },
    });
    return {
        elements: {
            root,
        },
        options,
    };
};

function createBitAttrs(bit, parts) {
    const attrs = {};
    parts.forEach((part) => {
        attrs[part] = {
            [`data-${bit}-${part}`]: ""
        };
    });
    return (part) => attrs[part];
}

function createDispatcher() {
    const dispatch = createEventDispatcher();
    return (e) => {
        const { originalEvent } = e.detail;
        const { cancelable } = e;
        const type = originalEvent.type;
        const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
        if (!shouldContinue) {
            e.preventDefault();
        }
    };
}

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let nanoid = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id
};

function generateId() {
    return nanoid(10);
}

function removeUndefined(obj) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}

function getOptionUpdater(options) {
    return function (key, value) {
        if (value === undefined)
            return;
        const store = options[key];
        if (store) {
            store.set(value);
        }
    };
}

function builderActions(node, params) {
    const unsubs = [];
    params.builders.forEach((builder) => {
        const act = builder.action(node);
        if (act) {
            unsubs.push(act);
        }
    });
    return {
        destroy: () => {
            unsubs.forEach((unsub) => {
                if (unsub.destroy) {
                    unsub.destroy();
                }
            });
        }
    };
}
function getAttrs(builders) {
    const attrs = {};
    builders.forEach((builder) => {
        Object.keys(builder).forEach((key) => {
            if (key !== "action") {
                attrs[key] = builder[key];
            }
        });
    });
    return attrs;
}

/* node_modules/bits-ui/dist/bits/button/components/button.svelte generated by Svelte v4.2.8 */
const file$I = "node_modules/bits-ui/dist/bits/button/components/button.svelte";

// (32:0) {:else}
function create_else_block$g(ctx) {
	let previous_tag = /*href*/ ctx[1] ? "a" : "button";
	let svelte_element_anchor;
	let current;
	validate_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
	validate_void_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
	let svelte_element = (/*href*/ ctx[1] ? "a" : "button") && create_dynamic_element_1(ctx);

	const block = {
		c: function create() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert_dev(target, svelte_element_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*href*/ ctx[1] ? "a" : "button") {
				if (!previous_tag) {
					svelte_element = create_dynamic_element_1(ctx);
					previous_tag = /*href*/ ctx[1] ? "a" : "button";
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*href*/ ctx[1] ? "a" : "button")) {
					svelte_element.d(1);
					validate_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
					validate_void_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
					svelte_element = create_dynamic_element_1(ctx);
					previous_tag = /*href*/ ctx[1] ? "a" : "button";
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
				previous_tag = /*href*/ ctx[1] ? "a" : "button";
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(svelte_element, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(svelte_element, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element_anchor);
			}

			if (svelte_element) svelte_element.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$g.name,
		type: "else",
		source: "(32:0) {:else}",
		ctx
	});

	return block;
}

// (11:0) {#if builders && builders.length}
function create_if_block$k(ctx) {
	let previous_tag = /*href*/ ctx[1] ? "a" : "button";
	let svelte_element_anchor;
	let current;
	validate_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
	validate_void_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
	let svelte_element = (/*href*/ ctx[1] ? "a" : "button") && create_dynamic_element$3(ctx);

	const block = {
		c: function create() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert_dev(target, svelte_element_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*href*/ ctx[1] ? "a" : "button") {
				if (!previous_tag) {
					svelte_element = create_dynamic_element$3(ctx);
					previous_tag = /*href*/ ctx[1] ? "a" : "button";
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*href*/ ctx[1] ? "a" : "button")) {
					svelte_element.d(1);
					validate_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
					validate_void_dynamic_element(/*href*/ ctx[1] ? "a" : "button");
					svelte_element = create_dynamic_element$3(ctx);
					previous_tag = /*href*/ ctx[1] ? "a" : "button";
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
				previous_tag = /*href*/ ctx[1] ? "a" : "button";
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(svelte_element, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(svelte_element, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element_anchor);
			}

			if (svelte_element) svelte_element.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$k.name,
		type: "if",
		source: "(11:0) {#if builders && builders.length}",
		ctx
	});

	return block;
}

// (34:1) <svelte:element   this={href ? "a" : "button"}   type={href ? undefined : type}   {href}   on:click   on:change   on:keydown   on:keyup   on:mouseenter   on:mouseleave   tabindex="0"   {...$$restProps}   {...attrs}  >
function create_dynamic_element_1(ctx) {
	let svelte_element;
	let svelte_element_type_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

	let svelte_element_levels = [
		{
			type: svelte_element_type_value = /*href*/ ctx[1] ? undefined : /*type*/ ctx[2]
		},
		{ href: /*href*/ ctx[1] },
		{ tabindex: "0" },
		/*$$restProps*/ ctx[5],
		/*attrs*/ ctx[4]
	];

	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	const block = {
		c: function create() {
			svelte_element = element(/*href*/ ctx[1] ? "a" : "button");
			if (default_slot) default_slot.c();
			set_dynamic_element_data(/*href*/ ctx[1] ? "a" : "button")(svelte_element, svelte_element_data);
			add_location(svelte_element, file$I, 33, 1, 726);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_element, anchor);

			if (default_slot) {
				default_slot.m(svelte_element, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(svelte_element, "click", /*click_handler_1*/ ctx[14], false, false, false, false),
					listen_dev(svelte_element, "change", /*change_handler_1*/ ctx[15], false, false, false, false),
					listen_dev(svelte_element, "keydown", /*keydown_handler_1*/ ctx[16], false, false, false, false),
					listen_dev(svelte_element, "keyup", /*keyup_handler_1*/ ctx[17], false, false, false, false),
					listen_dev(svelte_element, "mouseenter", /*mouseenter_handler_1*/ ctx[18], false, false, false, false),
					listen_dev(svelte_element, "mouseleave", /*mouseleave_handler_1*/ ctx[19], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
						null
					);
				}
			}

			set_dynamic_element_data(/*href*/ ctx[1] ? "a" : "button")(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
				(!current || dirty & /*href, type*/ 6 && svelte_element_type_value !== (svelte_element_type_value = /*href*/ ctx[1] ? undefined : /*type*/ ctx[2])) && { type: svelte_element_type_value },
				(!current || dirty & /*href*/ 2) && { href: /*href*/ ctx[1] },
				{ tabindex: "0" },
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5],
				/*attrs*/ ctx[4]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element);
			}

			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_dynamic_element_1.name,
		type: "child_dynamic_element",
		source: "(34:1) <svelte:element   this={href ? \\\"a\\\" : \\\"button\\\"}   type={href ? undefined : type}   {href}   on:click   on:change   on:keydown   on:keyup   on:mouseenter   on:mouseleave   tabindex=\\\"0\\\"   {...$$restProps}   {...attrs}  >",
		ctx
	});

	return block;
}

// (13:1) <svelte:element   this={href ? "a" : "button"}   bind:this={el}   type={href ? undefined : type}   {href}   on:click   on:change   on:keydown   on:keyup   on:mouseenter   on:mouseleave   tabindex="0"   use:builderActions={{ builders }}   {...getAttrs(builders)}   {...$$restProps}   {...attrs}  >
function create_dynamic_element$3(ctx) {
	let svelte_element;
	let svelte_element_type_value;
	let builderActions_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

	let svelte_element_levels = [
		{
			type: svelte_element_type_value = /*href*/ ctx[1] ? undefined : /*type*/ ctx[2]
		},
		{ href: /*href*/ ctx[1] },
		{ tabindex: "0" },
		getAttrs(/*builders*/ ctx[3]),
		/*$$restProps*/ ctx[5],
		/*attrs*/ ctx[4]
	];

	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	const block = {
		c: function create() {
			svelte_element = element(/*href*/ ctx[1] ? "a" : "button");
			if (default_slot) default_slot.c();
			set_dynamic_element_data(/*href*/ ctx[1] ? "a" : "button")(svelte_element, svelte_element_data);
			add_location(svelte_element, file$I, 12, 1, 330);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_element, anchor);

			if (default_slot) {
				default_slot.m(svelte_element, null);
			}

			/*svelte_element_binding*/ ctx[20](svelte_element);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(svelte_element, "click", /*click_handler*/ ctx[8], false, false, false, false),
					listen_dev(svelte_element, "change", /*change_handler*/ ctx[9], false, false, false, false),
					listen_dev(svelte_element, "keydown", /*keydown_handler*/ ctx[10], false, false, false, false),
					listen_dev(svelte_element, "keyup", /*keyup_handler*/ ctx[11], false, false, false, false),
					listen_dev(svelte_element, "mouseenter", /*mouseenter_handler*/ ctx[12], false, false, false, false),
					listen_dev(svelte_element, "mouseleave", /*mouseleave_handler*/ ctx[13], false, false, false, false),
					action_destroyer(builderActions_action = builderActions.call(null, svelte_element, { builders: /*builders*/ ctx[3] }))
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
						null
					);
				}
			}

			set_dynamic_element_data(/*href*/ ctx[1] ? "a" : "button")(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
				(!current || dirty & /*href, type*/ 6 && svelte_element_type_value !== (svelte_element_type_value = /*href*/ ctx[1] ? undefined : /*type*/ ctx[2])) && { type: svelte_element_type_value },
				(!current || dirty & /*href*/ 2) && { href: /*href*/ ctx[1] },
				{ tabindex: "0" },
				dirty & /*builders*/ 8 && getAttrs(/*builders*/ ctx[3]),
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5],
				/*attrs*/ ctx[4]
			]));

			if (builderActions_action && is_function(builderActions_action.update) && dirty & /*builders*/ 8) builderActions_action.update.call(null, { builders: /*builders*/ ctx[3] });
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element);
			}

			if (default_slot) default_slot.d(detaching);
			/*svelte_element_binding*/ ctx[20](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_dynamic_element$3.name,
		type: "child_dynamic_element",
		source: "(13:1) <svelte:element   this={href ? \\\"a\\\" : \\\"button\\\"}   bind:this={el}   type={href ? undefined : type}   {href}   on:click   on:change   on:keydown   on:keyup   on:mouseenter   on:mouseleave   tabindex=\\\"0\\\"   use:builderActions={{ builders }}   {...getAttrs(builders)}   {...$$restProps}   {...attrs}  >",
		ctx
	});

	return block;
}

function create_fragment$W(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$k, create_else_block$g];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*builders*/ ctx[3] && /*builders*/ ctx[3].length) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$W.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$W($$self, $$props, $$invalidate) {
	const omit_props_names = ["href","type","builders","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Button', slots, ['default']);
	let { href = void 0 } = $$props;
	let { type = void 0 } = $$props;
	let { builders = [] } = $$props;
	let { el = void 0 } = $$props;
	const attrs = { "data-button-root": "" };

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function change_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keyup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseenter_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseleave_handler(event) {
		bubble.call(this, $$self, event);
	}

	function click_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function change_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function keyup_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function mouseenter_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function mouseleave_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function svelte_element_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('href' in $$new_props) $$invalidate(1, href = $$new_props.href);
		if ('type' in $$new_props) $$invalidate(2, type = $$new_props.type);
		if ('builders' in $$new_props) $$invalidate(3, builders = $$new_props.builders);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		builderActions,
		getAttrs,
		href,
		type,
		builders,
		el,
		attrs
	});

	$$self.$inject_state = $$new_props => {
		if ('href' in $$props) $$invalidate(1, href = $$new_props.href);
		if ('type' in $$props) $$invalidate(2, type = $$new_props.type);
		if ('builders' in $$props) $$invalidate(3, builders = $$new_props.builders);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		el,
		href,
		type,
		builders,
		attrs,
		$$restProps,
		$$scope,
		slots,
		click_handler,
		change_handler,
		keydown_handler,
		keyup_handler,
		mouseenter_handler,
		mouseleave_handler,
		click_handler_1,
		change_handler_1,
		keydown_handler_1,
		keyup_handler_1,
		mouseenter_handler_1,
		mouseleave_handler_1,
		svelte_element_binding
	];
}

let Button$1 = class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$W, create_fragment$W, safe_not_equal, { href: 1, type: 2, builders: 3, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment$W.name
		});
	}

	get href() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get builders() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set builders(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

var ButtonPrimitive = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Root: Button$1
});

function getPositioningUpdater(store) {
    return (props = {}) => {
        return updatePositioning$1(store, props);
    };
}
function updatePositioning$1(store, props) {
    const defaultPositioningProps = {
        side: "bottom",
        align: "center",
        sideOffset: 0,
        alignOffset: 0,
        sameWidth: false,
        avoidCollisions: true,
        collisionPadding: 8,
        fitViewport: false
    };
    const withDefaults = { ...defaultPositioningProps, ...props };
    store.update((prev) => {
        return {
            ...prev,
            placement: joinPlacement(withDefaults.side, withDefaults.align),
            offset: {
                mainAxis: withDefaults.sideOffset,
                crossAxis: withDefaults.alignOffset
            },
            gutter: undefined,
            sameWidth: withDefaults.sameWidth,
            flip: withDefaults.avoidCollisions,
            overflowPadding: withDefaults.collisionPadding,
            boundary: withDefaults.collisionBoundary
        };
    });
}
function joinPlacement(side, align) {
    if (align === "center")
        return side;
    return `${side}-${align}`;
}

function getDialogData() {
    const NAME = "dialog";
    const PARTS = [
        "close",
        "content",
        "description",
        "overlay",
        "portal",
        "title",
        "trigger"
    ];
    return {
        NAME,
        PARTS
    };
}
function setCtx$2(props) {
    const { NAME, PARTS } = getDialogData();
    const getAttrs = createBitAttrs(NAME, PARTS);
    const dialog = { ...createDialog({ ...removeUndefined(props), role: "dialog" }), getAttrs };
    setContext(NAME, dialog);
    return {
        ...dialog,
        updateOption: getOptionUpdater(dialog.options)
    };
}
function getCtx$1() {
    const { NAME } = getDialogData();
    return getContext(NAME);
}

/* node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte generated by Svelte v4.2.8 */
const get_default_slot_changes$k = dirty => ({ ids: dirty & /*$idValues*/ 1 });
const get_default_slot_context$k = ctx => ({ ids: /*$idValues*/ ctx[0] });

function create_fragment$V(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[12].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], get_default_slot_context$k);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $idValues*/ 2049)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[11],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, get_default_slot_changes$k),
						get_default_slot_context$k
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$V.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$V($$self, $$props, $$invalidate) {
	let $idValues;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog', slots, ['default']);
	let { preventScroll = void 0 } = $$props;
	let { closeOnEscape = void 0 } = $$props;
	let { closeOnOutsideClick = void 0 } = $$props;
	let { portal = void 0 } = $$props;
	let { open = void 0 } = $$props;
	let { onOpenChange = void 0 } = $$props;
	let { openFocus = void 0 } = $$props;
	let { closeFocus = void 0 } = $$props;
	let { onOutsideClick = void 0 } = $$props;

	const { states: { open: localOpen }, updateOption, ids } = setCtx$2({
		closeOnEscape,
		preventScroll,
		closeOnOutsideClick,
		portal,
		forceVisible: true,
		defaultOpen: open,
		openFocus,
		closeFocus,
		onOutsideClick,
		onOpenChange: ({ next }) => {
			if (open !== next) {
				onOpenChange?.(next);
				$$invalidate(2, open = next);
			}

			return next;
		}
	});

	const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
		content: $contentId,
		description: $descriptionId,
		title: $titleId
	}));

	validate_store(idValues, 'idValues');
	component_subscribe($$self, idValues, value => $$invalidate(0, $idValues = value));

	const writable_props = [
		'preventScroll',
		'closeOnEscape',
		'closeOnOutsideClick',
		'portal',
		'open',
		'onOpenChange',
		'openFocus',
		'closeFocus',
		'onOutsideClick'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dialog> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('preventScroll' in $$props) $$invalidate(3, preventScroll = $$props.preventScroll);
		if ('closeOnEscape' in $$props) $$invalidate(4, closeOnEscape = $$props.closeOnEscape);
		if ('closeOnOutsideClick' in $$props) $$invalidate(5, closeOnOutsideClick = $$props.closeOnOutsideClick);
		if ('portal' in $$props) $$invalidate(6, portal = $$props.portal);
		if ('open' in $$props) $$invalidate(2, open = $$props.open);
		if ('onOpenChange' in $$props) $$invalidate(7, onOpenChange = $$props.onOpenChange);
		if ('openFocus' in $$props) $$invalidate(8, openFocus = $$props.openFocus);
		if ('closeFocus' in $$props) $$invalidate(9, closeFocus = $$props.closeFocus);
		if ('onOutsideClick' in $$props) $$invalidate(10, onOutsideClick = $$props.onOutsideClick);
		if ('$$scope' in $$props) $$invalidate(11, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		derived,
		setCtx: setCtx$2,
		preventScroll,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		open,
		onOpenChange,
		openFocus,
		closeFocus,
		onOutsideClick,
		localOpen,
		updateOption,
		ids,
		idValues,
		$idValues
	});

	$$self.$inject_state = $$props => {
		if ('preventScroll' in $$props) $$invalidate(3, preventScroll = $$props.preventScroll);
		if ('closeOnEscape' in $$props) $$invalidate(4, closeOnEscape = $$props.closeOnEscape);
		if ('closeOnOutsideClick' in $$props) $$invalidate(5, closeOnOutsideClick = $$props.closeOnOutsideClick);
		if ('portal' in $$props) $$invalidate(6, portal = $$props.portal);
		if ('open' in $$props) $$invalidate(2, open = $$props.open);
		if ('onOpenChange' in $$props) $$invalidate(7, onOpenChange = $$props.onOpenChange);
		if ('openFocus' in $$props) $$invalidate(8, openFocus = $$props.openFocus);
		if ('closeFocus' in $$props) $$invalidate(9, closeFocus = $$props.closeFocus);
		if ('onOutsideClick' in $$props) $$invalidate(10, onOutsideClick = $$props.onOutsideClick);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*open*/ 4) {
			open !== void 0 && localOpen.set(open);
		}

		if ($$self.$$.dirty & /*preventScroll*/ 8) {
			updateOption("preventScroll", preventScroll);
		}

		if ($$self.$$.dirty & /*closeOnEscape*/ 16) {
			updateOption("closeOnEscape", closeOnEscape);
		}

		if ($$self.$$.dirty & /*closeOnOutsideClick*/ 32) {
			updateOption("closeOnOutsideClick", closeOnOutsideClick);
		}

		if ($$self.$$.dirty & /*portal*/ 64) {
			updateOption("portal", portal);
		}

		if ($$self.$$.dirty & /*openFocus*/ 256) {
			updateOption("openFocus", openFocus);
		}

		if ($$self.$$.dirty & /*closeFocus*/ 512) {
			updateOption("closeFocus", closeFocus);
		}

		if ($$self.$$.dirty & /*onOutsideClick*/ 1024) {
			updateOption("onOutsideClick", onOutsideClick);
		}
	};

	return [
		$idValues,
		idValues,
		open,
		preventScroll,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		onOpenChange,
		openFocus,
		closeFocus,
		onOutsideClick,
		$$scope,
		slots
	];
}

let Dialog$1 = class Dialog extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$V, create_fragment$V, safe_not_equal, {
			preventScroll: 3,
			closeOnEscape: 4,
			closeOnOutsideClick: 5,
			portal: 6,
			open: 2,
			onOpenChange: 7,
			openFocus: 8,
			closeFocus: 9,
			onOutsideClick: 10
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog",
			options,
			id: create_fragment$V.name
		});
	}

	get preventScroll() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set preventScroll(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get closeOnEscape() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set closeOnEscape(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get closeOnOutsideClick() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set closeOnOutsideClick(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get portal() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set portal(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get open() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set open(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onOpenChange() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onOpenChange(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get openFocus() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set openFocus(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get closeFocus() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set closeFocus(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onOutsideClick() {
		throw new Error("<Dialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onOutsideClick(value) {
		throw new Error("<Dialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-title.svelte generated by Svelte v4.2.8 */
const file$H = "node_modules/bits-ui/dist/bits/dialog/components/dialog-title.svelte";
const get_default_slot_changes_1$c = dirty => ({ builder: dirty & /*builder*/ 8 });
const get_default_slot_context_1$c = ctx => ({ builder: /*builder*/ ctx[3] });
const get_default_slot_changes$j = dirty => ({ builder: dirty & /*builder*/ 8 });
const get_default_slot_context$j = ctx => ({ builder: /*builder*/ ctx[3] });

// (25:0) {:else}
function create_else_block$f(ctx) {
	let previous_tag = /*level*/ ctx[1];
	let svelte_element_anchor;
	let current;
	validate_dynamic_element(/*level*/ ctx[1]);
	validate_void_dynamic_element(/*level*/ ctx[1]);
	let svelte_element = /*level*/ ctx[1] && create_dynamic_element$2(ctx);

	const block = {
		c: function create() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert_dev(target, svelte_element_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*level*/ ctx[1]) {
				if (!previous_tag) {
					svelte_element = create_dynamic_element$2(ctx);
					previous_tag = /*level*/ ctx[1];
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*level*/ ctx[1])) {
					svelte_element.d(1);
					validate_dynamic_element(/*level*/ ctx[1]);
					validate_void_dynamic_element(/*level*/ ctx[1]);
					svelte_element = create_dynamic_element$2(ctx);
					previous_tag = /*level*/ ctx[1];
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
				previous_tag = /*level*/ ctx[1];
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(svelte_element, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(svelte_element, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element_anchor);
			}

			if (svelte_element) svelte_element.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$f.name,
		type: "else",
		source: "(25:0) {:else}",
		ctx
	});

	return block;
}

// (23:0) {#if asChild}
function create_if_block$j(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context$j);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 264)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes$j),
						get_default_slot_context$j
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$j.name,
		type: "if",
		source: "(23:0) {#if asChild}",
		ctx
	});

	return block;
}

// (26:1) <svelte:element   this={level}   bind:this={el}   {...builder} use:builder.action   {...$$restProps}  >
function create_dynamic_element$2(ctx) {
	let svelte_element;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context_1$c);
	let svelte_element_levels = [/*builder*/ ctx[3], /*$$restProps*/ ctx[5]];
	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	const block = {
		c: function create() {
			svelte_element = element(/*level*/ ctx[1]);
			if (default_slot) default_slot.c();
			set_dynamic_element_data(/*level*/ ctx[1])(svelte_element, svelte_element_data);
			add_location(svelte_element, file$H, 25, 1, 436);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_element, anchor);

			if (default_slot) {
				default_slot.m(svelte_element, null);
			}

			/*svelte_element_binding*/ ctx[10](svelte_element);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[3].action(svelte_element));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 264)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes_1$c),
						get_default_slot_context_1$c
					);
				}
			}

			set_dynamic_element_data(/*level*/ ctx[1])(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
				dirty & /*builder*/ 8 && /*builder*/ ctx[3],
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element);
			}

			if (default_slot) default_slot.d(detaching);
			/*svelte_element_binding*/ ctx[10](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_dynamic_element$2.name,
		type: "child_dynamic_element",
		source: "(26:1) <svelte:element   this={level}   bind:this={el}   {...builder} use:builder.action   {...$$restProps}  >",
		ctx
	});

	return block;
}

function create_fragment$U(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$j, create_else_block$f];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$U.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$U($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["level","asChild","id","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $title;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_title', slots, ['default']);
	let { level = "h2" } = $$props;
	let { asChild = false } = $$props;
	let { id = void 0 } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { title }, ids, getAttrs } = getCtx$1();
	validate_store(title, 'title');
	component_subscribe($$self, title, value => $$invalidate(7, $title = value));
	const attrs = getAttrs("title");

	function svelte_element_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('level' in $$new_props) $$invalidate(1, level = $$new_props.level);
		if ('asChild' in $$new_props) $$invalidate(2, asChild = $$new_props.asChild);
		if ('id' in $$new_props) $$invalidate(6, id = $$new_props.id);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		level,
		asChild,
		id,
		el,
		title,
		ids,
		getAttrs,
		attrs,
		builder,
		$title
	});

	$$self.$inject_state = $$new_props => {
		if ('level' in $$props) $$invalidate(1, level = $$new_props.level);
		if ('asChild' in $$props) $$invalidate(2, asChild = $$new_props.asChild);
		if ('id' in $$props) $$invalidate(6, id = $$new_props.id);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(3, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*id*/ 64) {
			if (id) {
				ids.title.set(id);
			}
		}

		if ($$self.$$.dirty & /*$title*/ 128) {
			$$invalidate(3, builder = $title);
		}

		if ($$self.$$.dirty & /*builder*/ 8) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		level,
		asChild,
		builder,
		title,
		$$restProps,
		id,
		$title,
		$$scope,
		slots,
		svelte_element_binding
	];
}

let Dialog_title$1 = class Dialog_title extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$U, create_fragment$U, safe_not_equal, { level: 1, asChild: 2, id: 6, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_title",
			options,
			id: create_fragment$U.name
		});
	}

	get level() {
		throw new Error("<Dialog_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level(value) {
		throw new Error("<Dialog_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Dialog_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Dialog_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Dialog_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte generated by Svelte v4.2.8 */
const file$G = "node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte";
const get_default_slot_changes_1$b = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$b = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$i = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$i = ctx => ({ builder: /*builder*/ ctx[2] });

// (20:0) {:else}
function create_else_block$e(ctx) {
	let button;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1$b);
	let button_levels = [/*builder*/ ctx[2], { type: "button" }, /*$$restProps*/ ctx[5]];
	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	const block = {
		c: function create() {
			button = element("button");
			if (default_slot) default_slot.c();
			set_attributes(button, button_data);
			add_location(button, file$G, 20, 1, 439);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			if (button.autofocus) button.focus();
			/*button_binding*/ ctx[9](button);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[2].action(button)),
					listen_dev(button, "m-click", /*dispatch*/ ctx[4], false, false, false, false),
					listen_dev(button, "m-keydown", /*dispatch*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1$b),
						get_default_slot_context_1$b
					);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				{ type: "button" },
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(button);
			}

			if (default_slot) default_slot.d(detaching);
			/*button_binding*/ ctx[9](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$e.name,
		type: "else",
		source: "(20:0) {:else}",
		ctx
	});

	return block;
}

// (18:0) {#if asChild}
function create_if_block$i(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$i);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$i),
						get_default_slot_context$i
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$i.name,
		type: "if",
		source: "(18:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$T(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$i, create_else_block$e];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$T.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$T($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $close;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_close', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { close }, getAttrs } = getCtx$1();
	validate_store(close, 'close');
	component_subscribe($$self, close, value => $$invalidate(6, $close = value));
	const dispatch = createDispatcher();
	const attrs = getAttrs("close");

	function button_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		createDispatcher,
		asChild,
		el,
		close,
		getAttrs,
		dispatch,
		attrs,
		builder,
		$close
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$close*/ 64) {
			$$invalidate(2, builder = $close);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		close,
		dispatch,
		$$restProps,
		$close,
		$$scope,
		slots,
		button_binding
	];
}

class Dialog_close extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$T, create_fragment$T, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_close",
			options,
			id: create_fragment$T.name
		});
	}

	get asChild() {
		throw new Error("<Dialog_close>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_close>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_close>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_close>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-portal.svelte generated by Svelte v4.2.8 */
const file$F = "node_modules/bits-ui/dist/bits/dialog/components/dialog-portal.svelte";
const get_default_slot_changes_1$a = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$a = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$h = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$h = ctx => ({ builder: /*builder*/ ctx[2] });

// (18:0) {:else}
function create_else_block$d(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], get_default_slot_context_1$a);
	let div_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$F, 18, 1, 347);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[8](div);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 68)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, get_default_slot_changes_1$a),
						get_default_slot_context_1$a
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[8](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$d.name,
		type: "else",
		source: "(18:0) {:else}",
		ctx
	});

	return block;
}

// (16:0) {#if asChild}
function create_if_block$h(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], get_default_slot_context$h);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 68)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, get_default_slot_changes$h),
						get_default_slot_context$h
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$h.name,
		type: "if",
		source: "(16:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$S(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$h, create_else_block$d];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$S.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$S($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $portalled;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_portal', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { portalled }, getAttrs } = getCtx$1();
	validate_store(portalled, 'portalled');
	component_subscribe($$self, portalled, value => $$invalidate(5, $portalled = value));
	const attrs = getAttrs("portal");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		asChild,
		el,
		portalled,
		getAttrs,
		attrs,
		builder,
		$portalled
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$portalled*/ 32) {
			$$invalidate(2, builder = $portalled);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		portalled,
		$$restProps,
		$portalled,
		$$scope,
		slots,
		div_binding
	];
}

let Dialog_portal$1 = class Dialog_portal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$S, create_fragment$S, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_portal",
			options,
			id: create_fragment$S.name
		});
	}

	get asChild() {
		throw new Error("<Dialog_portal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_portal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_portal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_portal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte generated by Svelte v4.2.8 */
const file$E = "node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte";
const get_default_slot_changes_5$1 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_5$1 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_4$1 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_4$1 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_3$1 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_3$1 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_2$1 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_2$1 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_1$9 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_1$9 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes$g = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context$g = ctx => ({ builder: /*builder*/ ctx[8] });

// (80:16) 
function create_if_block_5$2(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], get_default_slot_context_5$1);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$E, 80, 1, 1658);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_4*/ ctx[36](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "pointerdown", /*pointerdown_handler_4*/ ctx[29], false, false, false, false),
					listen_dev(div, "pointermove", /*pointermove_handler_4*/ ctx[30], false, false, false, false),
					listen_dev(div, "pointerup", /*pointerup_handler_4*/ ctx[31], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[15],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, get_default_slot_changes_5$1),
						get_default_slot_context_5$1
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_4*/ ctx[36](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5$2.name,
		type: "if",
		source: "(80:16) ",
		ctx
	});

	return block;
}

// (68:33) 
function create_if_block_4$2(ctx) {
	let div;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], get_default_slot_context_4$1);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$E, 68, 1, 1442);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_3*/ ctx[35](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "pointerdown", /*pointerdown_handler_3*/ ctx[26], false, false, false, false),
					listen_dev(div, "pointermove", /*pointermove_handler_3*/ ctx[27], false, false, false, false),
					listen_dev(div, "pointerup", /*pointerup_handler_3*/ ctx[28], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[15],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, get_default_slot_changes_4$1),
						get_default_slot_context_4$1
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			if (div_outro) div_outro.end(1);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);

			if (local) {
				div_outro = create_out_transition(div, /*outTransition*/ ctx[5], /*outTransitionConfig*/ ctx[6]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_3*/ ctx[35](null);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$2.name,
		type: "if",
		source: "(68:33) ",
		ctx
	});

	return block;
}

// (56:32) 
function create_if_block_3$2(ctx) {
	let div;
	let div_intro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], get_default_slot_context_3$1);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$E, 56, 1, 1212);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_2*/ ctx[34](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "pointerdown", /*pointerdown_handler_2*/ ctx[23], false, false, false, false),
					listen_dev(div, "pointermove", /*pointermove_handler_2*/ ctx[24], false, false, false, false),
					listen_dev(div, "pointerup", /*pointerup_handler_2*/ ctx[25], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[15],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, get_default_slot_changes_3$1),
						get_default_slot_context_3$1
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, /*inTransition*/ ctx[3], /*inTransitionConfig*/ ctx[4]);
						div_intro.start();
					});
				}
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_2*/ ctx[34](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$2.name,
		type: "if",
		source: "(56:32) ",
		ctx
	});

	return block;
}

// (43:49) 
function create_if_block_2$3(ctx) {
	let div;
	let div_intro;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], get_default_slot_context_2$1);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$E, 43, 1, 941);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_1*/ ctx[33](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "pointerdown", /*pointerdown_handler_1*/ ctx[20], false, false, false, false),
					listen_dev(div, "pointermove", /*pointermove_handler_1*/ ctx[21], false, false, false, false),
					listen_dev(div, "pointerup", /*pointerup_handler_1*/ ctx[22], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[15],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, get_default_slot_changes_2$1),
						get_default_slot_context_2$1
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (local) {
				add_render_callback(() => {
					if (!current) return;
					if (div_outro) div_outro.end(1);
					div_intro = create_in_transition(div, /*inTransition*/ ctx[3], /*inTransitionConfig*/ ctx[4]);
					div_intro.start();
				});
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			if (div_intro) div_intro.invalidate();

			if (local) {
				div_outro = create_out_transition(div, /*outTransition*/ ctx[5], /*outTransitionConfig*/ ctx[6]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_1*/ ctx[33](null);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$3.name,
		type: "if",
		source: "(43:49) ",
		ctx
	});

	return block;
}

// (31:30) 
function create_if_block_1$5(ctx) {
	let div;
	let div_transition;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], get_default_slot_context_1$9);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$E, 31, 1, 691);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[32](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "pointerdown", /*pointerdown_handler*/ ctx[17], false, false, false, false),
					listen_dev(div, "pointermove", /*pointermove_handler*/ ctx[18], false, false, false, false),
					listen_dev(div, "pointerup", /*pointerup_handler*/ ctx[19], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[15],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, get_default_slot_changes_1$9),
						get_default_slot_context_1$9
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (local) {
				add_render_callback(() => {
					if (!current) return;
					if (!div_transition) div_transition = create_bidirectional_transition(div, /*transition*/ ctx[1], /*transitionConfig*/ ctx[2], true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);

			if (local) {
				if (!div_transition) div_transition = create_bidirectional_transition(div, /*transition*/ ctx[1], /*transitionConfig*/ ctx[2], false);
				div_transition.run(0);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[32](null);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$5.name,
		type: "if",
		source: "(31:30) ",
		ctx
	});

	return block;
}

// (29:0) {#if asChild && $open}
function create_if_block$g(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], get_default_slot_context$g);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[15],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, get_default_slot_changes$g),
						get_default_slot_context$g
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$g.name,
		type: "if",
		source: "(29:0) {#if asChild && $open}",
		ctx
	});

	return block;
}

function create_fragment$R(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	const if_block_creators = [
		create_if_block$g,
		create_if_block_1$5,
		create_if_block_2$3,
		create_if_block_3$2,
		create_if_block_4$2,
		create_if_block_5$2
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[7] && /*$open*/ ctx[9]) return 0;
		if (/*transition*/ ctx[1] && /*$open*/ ctx[9]) return 1;
		if (/*inTransition*/ ctx[3] && /*outTransition*/ ctx[5] && /*$open*/ ctx[9]) return 2;
		if (/*inTransition*/ ctx[3] && /*$open*/ ctx[9]) return 3;
		if (/*outTransition*/ ctx[5] && /*$open*/ ctx[9]) return 4;
		if (/*$open*/ ctx[9]) return 5;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$R.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$R($$self, $$props, $$invalidate) {
	let builder;

	const omit_props_names = [
		"transition","transitionConfig","inTransition","inTransitionConfig","outTransition","outTransitionConfig","asChild","id","el"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $content;
	let $open;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_content', slots, ['default']);
	let { transition = void 0 } = $$props;
	let { transitionConfig = void 0 } = $$props;
	let { inTransition = void 0 } = $$props;
	let { inTransitionConfig = void 0 } = $$props;
	let { outTransition = void 0 } = $$props;
	let { outTransitionConfig = void 0 } = $$props;
	let { asChild = false } = $$props;
	let { id = void 0 } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { content }, states: { open }, ids, getAttrs } = getCtx$1();
	validate_store(content, 'content');
	component_subscribe($$self, content, value => $$invalidate(14, $content = value));
	validate_store(open, 'open');
	component_subscribe($$self, open, value => $$invalidate(9, $open = value));
	const attrs = getAttrs("content");

	function pointerdown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function pointermove_handler(event) {
		bubble.call(this, $$self, event);
	}

	function pointerup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function pointerdown_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function pointermove_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function pointerup_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function pointerdown_handler_2(event) {
		bubble.call(this, $$self, event);
	}

	function pointermove_handler_2(event) {
		bubble.call(this, $$self, event);
	}

	function pointerup_handler_2(event) {
		bubble.call(this, $$self, event);
	}

	function pointerdown_handler_3(event) {
		bubble.call(this, $$self, event);
	}

	function pointermove_handler_3(event) {
		bubble.call(this, $$self, event);
	}

	function pointerup_handler_3(event) {
		bubble.call(this, $$self, event);
	}

	function pointerdown_handler_4(event) {
		bubble.call(this, $$self, event);
	}

	function pointermove_handler_4(event) {
		bubble.call(this, $$self, event);
	}

	function pointerup_handler_4(event) {
		bubble.call(this, $$self, event);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_2($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_3($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_4($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('transition' in $$new_props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$new_props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('inTransition' in $$new_props) $$invalidate(3, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$new_props) $$invalidate(4, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$new_props) $$invalidate(5, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$new_props) $$invalidate(6, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('asChild' in $$new_props) $$invalidate(7, asChild = $$new_props.asChild);
		if ('id' in $$new_props) $$invalidate(13, id = $$new_props.id);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		transition,
		transitionConfig,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		asChild,
		id,
		el,
		content,
		open,
		ids,
		getAttrs,
		attrs,
		builder,
		$content,
		$open
	});

	$$self.$inject_state = $$new_props => {
		if ('transition' in $$props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('inTransition' in $$props) $$invalidate(3, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$props) $$invalidate(4, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$props) $$invalidate(5, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$props) $$invalidate(6, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('asChild' in $$props) $$invalidate(7, asChild = $$new_props.asChild);
		if ('id' in $$props) $$invalidate(13, id = $$new_props.id);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(8, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*id*/ 8192) {
			if (id) {
				ids.content.set(id);
			}
		}

		if ($$self.$$.dirty[0] & /*$content*/ 16384) {
			$$invalidate(8, builder = $content);
		}

		if ($$self.$$.dirty[0] & /*builder*/ 256) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		transition,
		transitionConfig,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		asChild,
		builder,
		$open,
		content,
		open,
		$$restProps,
		id,
		$content,
		$$scope,
		slots,
		pointerdown_handler,
		pointermove_handler,
		pointerup_handler,
		pointerdown_handler_1,
		pointermove_handler_1,
		pointerup_handler_1,
		pointerdown_handler_2,
		pointermove_handler_2,
		pointerup_handler_2,
		pointerdown_handler_3,
		pointermove_handler_3,
		pointerup_handler_3,
		pointerdown_handler_4,
		pointermove_handler_4,
		pointerup_handler_4,
		div_binding,
		div_binding_1,
		div_binding_2,
		div_binding_3,
		div_binding_4
	];
}

let Dialog_content$1 = class Dialog_content extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$R,
			create_fragment$R,
			safe_not_equal,
			{
				transition: 1,
				transitionConfig: 2,
				inTransition: 3,
				inTransitionConfig: 4,
				outTransition: 5,
				outTransitionConfig: 6,
				asChild: 7,
				id: 13,
				el: 0
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_content",
			options,
			id: create_fragment$R.name
		});
	}

	get transition() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transition(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transitionConfig() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transitionConfig(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransition() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransition(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransitionConfig() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransitionConfig(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransition() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransition(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransitionConfig() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransitionConfig(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte generated by Svelte v4.2.8 */
const file$D = "node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte";
const get_default_slot_changes$f = dirty => ({ builder: dirty & /*builder*/ 256 });
const get_default_slot_context$f = ctx => ({ builder: /*builder*/ ctx[8] });

// (62:16) 
function create_if_block_5$1(ctx) {
	let div;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$D, 63, 1, 1627);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding_4*/ ctx[25](div);

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "mouseup", /*mouseup_handler_4*/ ctx[20], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding_4*/ ctx[25](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5$1.name,
		type: "if",
		source: "(62:16) ",
		ctx
	});

	return block;
}

// (53:33) 
function create_if_block_4$1(ctx) {
	let div;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$D, 54, 1, 1415);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding_3*/ ctx[24](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "mouseup", /*mouseup_handler_3*/ ctx[19], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;
			if (div_outro) div_outro.end(1);
			current = true;
		},
		o: function outro(local) {
			if (local) {
				div_outro = create_out_transition(div, /*outTransition*/ ctx[5], /*outTransitionConfig*/ ctx[6]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding_3*/ ctx[24](null);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$1.name,
		type: "if",
		source: "(53:33) ",
		ctx
	});

	return block;
}

// (44:32) 
function create_if_block_3$1(ctx) {
	let div;
	let div_intro;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$D, 45, 1, 1189);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding_2*/ ctx[23](div);

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "mouseup", /*mouseup_handler_2*/ ctx[18], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, /*inTransition*/ ctx[3], /*inTransitionConfig*/ ctx[4]);
						div_intro.start();
					});
				}
			}
		},
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding_2*/ ctx[23](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(44:32) ",
		ctx
	});

	return block;
}

// (34:49) 
function create_if_block_2$2(ctx) {
	let div;
	let div_intro;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$D, 35, 1, 922);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding_1*/ ctx[22](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "mouseup", /*mouseup_handler_1*/ ctx[17], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;

			if (local) {
				add_render_callback(() => {
					if (!current) return;
					if (div_outro) div_outro.end(1);
					div_intro = create_in_transition(div, /*inTransition*/ ctx[3], /*inTransitionConfig*/ ctx[4]);
					div_intro.start();
				});
			}

			current = true;
		},
		o: function outro(local) {
			if (div_intro) div_intro.invalidate();

			if (local) {
				div_outro = create_out_transition(div, /*outTransition*/ ctx[5], /*outTransitionConfig*/ ctx[6]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding_1*/ ctx[22](null);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(34:49) ",
		ctx
	});

	return block;
}

// (25:30) 
function create_if_block_1$4(ctx) {
	let div;
	let div_transition;
	let current;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[12]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$D, 26, 1, 676);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding*/ ctx[21](div);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(div, "mouseup", /*mouseup_handler*/ ctx[16], false, false, false, false),
					action_destroyer(/*builder*/ ctx[8].action(div))
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
			]));
		},
		i: function intro(local) {
			if (current) return;

			if (local) {
				add_render_callback(() => {
					if (!current) return;
					if (!div_transition) div_transition = create_bidirectional_transition(div, /*transition*/ ctx[1], /*transitionConfig*/ ctx[2], true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o: function outro(local) {
			if (local) {
				if (!div_transition) div_transition = create_bidirectional_transition(div, /*transition*/ ctx[1], /*transitionConfig*/ ctx[2], false);
				div_transition.run(0);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding*/ ctx[21](null);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(25:30) ",
		ctx
	});

	return block;
}

// (23:0) {#if asChild && $open}
function create_if_block$f(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], get_default_slot_context$f);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 16640)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[14],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, get_default_slot_changes$f),
						get_default_slot_context$f
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$f.name,
		type: "if",
		source: "(23:0) {#if asChild && $open}",
		ctx
	});

	return block;
}

function create_fragment$Q(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	const if_block_creators = [
		create_if_block$f,
		create_if_block_1$4,
		create_if_block_2$2,
		create_if_block_3$1,
		create_if_block_4$1,
		create_if_block_5$1
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[7] && /*$open*/ ctx[9]) return 0;
		if (/*transition*/ ctx[1] && /*$open*/ ctx[9]) return 1;
		if (/*inTransition*/ ctx[3] && /*outTransition*/ ctx[5] && /*$open*/ ctx[9]) return 2;
		if (/*inTransition*/ ctx[3] && /*$open*/ ctx[9]) return 3;
		if (/*outTransition*/ ctx[5] && /*$open*/ ctx[9]) return 4;
		if (/*$open*/ ctx[9]) return 5;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$Q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$Q($$self, $$props, $$invalidate) {
	let builder;

	const omit_props_names = [
		"transition","transitionConfig","inTransition","inTransitionConfig","outTransition","outTransitionConfig","asChild","el"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $overlay;
	let $open;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_overlay', slots, ['default']);
	let { transition = void 0 } = $$props;
	let { transitionConfig = void 0 } = $$props;
	let { inTransition = void 0 } = $$props;
	let { inTransitionConfig = void 0 } = $$props;
	let { outTransition = void 0 } = $$props;
	let { outTransitionConfig = void 0 } = $$props;
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { overlay }, states: { open }, getAttrs } = getCtx$1();
	validate_store(overlay, 'overlay');
	component_subscribe($$self, overlay, value => $$invalidate(13, $overlay = value));
	validate_store(open, 'open');
	component_subscribe($$self, open, value => $$invalidate(9, $open = value));
	const attrs = getAttrs("overlay");

	function mouseup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseup_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function mouseup_handler_2(event) {
		bubble.call(this, $$self, event);
	}

	function mouseup_handler_3(event) {
		bubble.call(this, $$self, event);
	}

	function mouseup_handler_4(event) {
		bubble.call(this, $$self, event);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_2($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_3($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_4($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('transition' in $$new_props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$new_props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('inTransition' in $$new_props) $$invalidate(3, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$new_props) $$invalidate(4, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$new_props) $$invalidate(5, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$new_props) $$invalidate(6, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('asChild' in $$new_props) $$invalidate(7, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		transition,
		transitionConfig,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		asChild,
		el,
		overlay,
		open,
		getAttrs,
		attrs,
		builder,
		$overlay,
		$open
	});

	$$self.$inject_state = $$new_props => {
		if ('transition' in $$props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('inTransition' in $$props) $$invalidate(3, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$props) $$invalidate(4, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$props) $$invalidate(5, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$props) $$invalidate(6, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('asChild' in $$props) $$invalidate(7, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(8, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$overlay*/ 8192) {
			$$invalidate(8, builder = $overlay);
		}

		if ($$self.$$.dirty & /*builder*/ 256) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		transition,
		transitionConfig,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		asChild,
		builder,
		$open,
		overlay,
		open,
		$$restProps,
		$overlay,
		$$scope,
		slots,
		mouseup_handler,
		mouseup_handler_1,
		mouseup_handler_2,
		mouseup_handler_3,
		mouseup_handler_4,
		div_binding,
		div_binding_1,
		div_binding_2,
		div_binding_3,
		div_binding_4
	];
}

let Dialog_overlay$1 = class Dialog_overlay extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$Q, create_fragment$Q, safe_not_equal, {
			transition: 1,
			transitionConfig: 2,
			inTransition: 3,
			inTransitionConfig: 4,
			outTransition: 5,
			outTransitionConfig: 6,
			asChild: 7,
			el: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_overlay",
			options,
			id: create_fragment$Q.name
		});
	}

	get transition() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transition(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transitionConfig() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transitionConfig(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransition() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransition(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransitionConfig() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransitionConfig(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransition() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransition(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransitionConfig() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransitionConfig(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte generated by Svelte v4.2.8 */
const file$C = "node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte";
const get_default_slot_changes_1$8 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$8 = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$e = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$e = ctx => ({ builder: /*builder*/ ctx[2] });

// (20:0) {:else}
function create_else_block$c(ctx) {
	let button;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1$8);
	let button_levels = [/*builder*/ ctx[2], { type: "button" }, /*$$restProps*/ ctx[5]];
	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	const block = {
		c: function create() {
			button = element("button");
			if (default_slot) default_slot.c();
			set_attributes(button, button_data);
			add_location(button, file$C, 20, 1, 445);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			if (button.autofocus) button.focus();
			/*button_binding*/ ctx[9](button);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[2].action(button)),
					listen_dev(button, "m-click", /*dispatch*/ ctx[4], false, false, false, false),
					listen_dev(button, "m-keydown", /*dispatch*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1$8),
						get_default_slot_context_1$8
					);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				{ type: "button" },
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(button);
			}

			if (default_slot) default_slot.d(detaching);
			/*button_binding*/ ctx[9](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$c.name,
		type: "else",
		source: "(20:0) {:else}",
		ctx
	});

	return block;
}

// (18:0) {#if asChild}
function create_if_block$e(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$e);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$e),
						get_default_slot_context$e
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$e.name,
		type: "if",
		source: "(18:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$P(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$e, create_else_block$c];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$P.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$P($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $trigger;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_trigger', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { trigger }, getAttrs } = getCtx$1();
	validate_store(trigger, 'trigger');
	component_subscribe($$self, trigger, value => $$invalidate(6, $trigger = value));
	const dispatch = createDispatcher();
	const attrs = getAttrs("trigger");

	function button_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		createDispatcher,
		asChild,
		el,
		trigger,
		getAttrs,
		dispatch,
		attrs,
		builder,
		$trigger
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$trigger*/ 64) {
			$$invalidate(2, builder = $trigger);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		trigger,
		dispatch,
		$$restProps,
		$trigger,
		$$scope,
		slots,
		button_binding
	];
}

class Dialog_trigger extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$P, create_fragment$P, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_trigger",
			options,
			id: create_fragment$P.name
		});
	}

	get asChild() {
		throw new Error("<Dialog_trigger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_trigger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_trigger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_trigger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte generated by Svelte v4.2.8 */
const file$B = "node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte";
const get_default_slot_changes_1$7 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$7 = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$d = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$d = ctx => ({ builder: /*builder*/ ctx[2] });

// (24:0) {:else}
function create_else_block$b(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1$7);
	let div_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$B, 24, 1, 435);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[9](div);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1$7),
						get_default_slot_context_1$7
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[9](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$b.name,
		type: "else",
		source: "(24:0) {:else}",
		ctx
	});

	return block;
}

// (22:0) {#if asChild}
function create_if_block$d(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$d);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$d),
						get_default_slot_context$d
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$d.name,
		type: "if",
		source: "(22:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$O(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$d, create_else_block$b];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$O.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$O($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","id","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $description;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_description', slots, ['default']);
	let { asChild = false } = $$props;
	let { id = void 0 } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { description }, ids, getAttrs } = getCtx$1();
	validate_store(description, 'description');
	component_subscribe($$self, description, value => $$invalidate(6, $description = value));
	const attrs = getAttrs("description");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('id' in $$new_props) $$invalidate(5, id = $$new_props.id);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx: getCtx$1,
		asChild,
		id,
		el,
		description,
		ids,
		getAttrs,
		attrs,
		builder,
		$description
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('id' in $$props) $$invalidate(5, id = $$new_props.id);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*id*/ 32) {
			if (id) {
				ids.description.set(id);
			}
		}

		if ($$self.$$.dirty & /*$description*/ 64) {
			$$invalidate(2, builder = $description);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		description,
		$$restProps,
		id,
		$description,
		$$scope,
		slots,
		div_binding
	];
}

let Dialog_description$1 = class Dialog_description extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$O, create_fragment$O, safe_not_equal, { asChild: 1, id: 5, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_description",
			options,
			id: create_fragment$O.name
		});
	}

	get asChild() {
		throw new Error("<Dialog_description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Dialog_description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Dialog_description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Dialog_description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Dialog_description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Dialog_description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

var DialogPrimitive = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Close: Dialog_close,
    Content: Dialog_content$1,
    Description: Dialog_description$1,
    Overlay: Dialog_overlay$1,
    Portal: Dialog_portal$1,
    Root: Dialog$1,
    Title: Dialog_title$1,
    Trigger: Dialog_trigger
});

function getLabelData() {
    const NAME = "label";
    const PARTS = ["root"];
    const getAttrs = createBitAttrs(NAME, PARTS);
    return {
        NAME,
        getAttrs
    };
}

/* node_modules/bits-ui/dist/bits/label/components/label.svelte generated by Svelte v4.2.8 */
const file$A = "node_modules/bits-ui/dist/bits/label/components/label.svelte";
const get_default_slot_changes_1$6 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$6 = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$c = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$c = ctx => ({ builder: /*builder*/ ctx[2] });

// (20:0) {:else}
function create_else_block$a(ctx) {
	let label;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1$6);
	let label_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[5]];
	let label_data = {};

	for (let i = 0; i < label_levels.length; i += 1) {
		label_data = assign(label_data, label_levels[i]);
	}

	const block = {
		c: function create() {
			label = element("label");
			if (default_slot) default_slot.c();
			set_attributes(label, label_data);
			add_location(label, file$A, 20, 1, 485);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label, anchor);

			if (default_slot) {
				default_slot.m(label, null);
			}

			/*label_binding*/ ctx[9](label);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[2].action(label)),
					listen_dev(label, "m-mousedown", /*dispatch*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1$6),
						get_default_slot_context_1$6
					);
				}
			}

			set_attributes(label, label_data = get_spread_update(label_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(label);
			}

			if (default_slot) default_slot.d(detaching);
			/*label_binding*/ ctx[9](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$a.name,
		type: "else",
		source: "(20:0) {:else}",
		ctx
	});

	return block;
}

// (18:0) {#if asChild}
function create_if_block$c(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$c);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$c),
						get_default_slot_context$c
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$c.name,
		type: "if",
		source: "(18:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$N(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$c, create_else_block$a];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$N.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$N($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $root;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Label', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { root } } = createLabel();
	validate_store(root, 'root');
	component_subscribe($$self, root, value => $$invalidate(6, $root = value));
	const dispatch = createDispatcher();
	const { getAttrs } = getLabelData();
	const attrs = getAttrs("root");

	function label_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		createLabel,
		getLabelData,
		createDispatcher,
		asChild,
		el,
		root,
		dispatch,
		getAttrs,
		attrs,
		builder,
		$root
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$root*/ 64) {
			$$invalidate(2, builder = $root);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		root,
		dispatch,
		$$restProps,
		$root,
		$$scope,
		slots,
		label_binding
	];
}

let Label$1 = class Label extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$N, create_fragment$N, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Label",
			options,
			id: create_fragment$N.name
		});
	}

	get asChild() {
		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

var LabelPrimitive = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Root: Label$1
});

function getSelectData() {
    const NAME = "select";
    const GROUP_NAME = "select-group";
    const ITEM_NAME = "select-item";
    const PARTS = [
        "arrow",
        "content",
        "group",
        "item",
        "indicator",
        "input",
        "label",
        "trigger",
        "value"
    ];
    return {
        NAME,
        GROUP_NAME,
        ITEM_NAME,
        PARTS
    };
}
function getCtx() {
    const { NAME } = getSelectData();
    return getContext(NAME);
}
function setCtx$1(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
props) {
    const { NAME, PARTS } = getSelectData();
    const getAttrs = createBitAttrs(NAME, PARTS);
    const select = { ...createSelect(removeUndefined(props)), getAttrs };
    setContext(NAME, select);
    return {
        ...select,
        updateOption: getOptionUpdater(select.options)
    };
}
function setGroupCtx() {
    const { GROUP_NAME } = getSelectData();
    const id = generateId();
    setContext(GROUP_NAME, id);
    const { elements: { group }, getAttrs } = getCtx();
    return { group, id, getAttrs };
}
function setItemCtx(value) {
    const { ITEM_NAME } = getSelectData();
    const select = getCtx();
    setContext(ITEM_NAME, value);
    return select;
}
function getGroupLabel() {
    const { GROUP_NAME } = getSelectData();
    const id = getContext(GROUP_NAME);
    const { elements: { groupLabel }, getAttrs } = getCtx();
    return { groupLabel, id, getAttrs };
}
function getItemIndicator() {
    const { ITEM_NAME } = getSelectData();
    const { helpers: { isSelected }, getAttrs } = getCtx();
    const value = getContext(ITEM_NAME);
    return {
        value,
        isSelected,
        getAttrs
    };
}
function setArrow(size = 8) {
    const select = getCtx();
    select.options.arrowSize?.set(size);
    return select;
}
function updatePositioning(props) {
    const defaultPlacement = {
        side: "bottom",
        align: "center",
        sameWidth: true
    };
    const withDefaults = { ...defaultPlacement, ...props };
    const { options: { positioning } } = getCtx();
    const updater = getPositioningUpdater(positioning);
    updater(withDefaults);
}

/* node_modules/bits-ui/dist/bits/select/components/select.svelte generated by Svelte v4.2.8 */
const get_default_slot_changes$b = dirty => ({ ids: dirty & /*$idValues*/ 1 });
const get_default_slot_context$b = ctx => ({ ids: /*$idValues*/ ctx[0] });

function create_fragment$M(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[18].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], get_default_slot_context$b);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $idValues*/ 131073)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[17],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, get_default_slot_changes$b),
						get_default_slot_context$b
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$M.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$M($$self, $$props, $$invalidate) {
	let $idValues;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select', slots, ['default']);
	let { required = void 0 } = $$props;
	let { disabled = void 0 } = $$props;
	let { preventScroll = void 0 } = $$props;
	let { loop = void 0 } = $$props;
	let { closeOnEscape = void 0 } = $$props;
	let { closeOnOutsideClick = void 0 } = $$props;
	let { portal = void 0 } = $$props;
	let { name = void 0 } = $$props;
	let { multiple = false } = $$props;
	let { selected = void 0 } = $$props;
	let { onSelectedChange = void 0 } = $$props;
	let { open = void 0 } = $$props;
	let { onOpenChange = void 0 } = $$props;
	let { items = [] } = $$props;
	let { onOutsideClick = void 0 } = $$props;

	const { states: { open: localOpen, selected: localSelected }, updateOption, ids } = setCtx$1({
		required,
		disabled,
		preventScroll,
		loop,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		name,
		onOutsideClick,
		multiple,
		forceVisible: true,
		defaultSelected: Array.isArray(selected)
		? [...selected]
		: // eslint-disable-next-line @typescript-eslint/no-explicit-any
			selected,
		defaultOpen: open,
		onSelectedChange: ({ next }) => {
			if (Array.isArray(next)) {
				if (JSON.stringify(next) !== JSON.stringify(selected)) {
					onSelectedChange?.(next);
					$$invalidate(2, selected = next);
				}

				return next;
			}

			if (selected !== next) {
				onSelectedChange?.(next);
				$$invalidate(2, selected = next);
			}

			return next;
		},
		onOpenChange: ({ next }) => {
			if (open !== next) {
				onOpenChange?.(next);
				$$invalidate(3, open = next);
			}

			return next;
		},
		items
	});

	const idValues = derived([ids.menu, ids.trigger, ids.label], ([$menuId, $triggerId, $labelId]) => ({
		menu: $menuId,
		trigger: $triggerId,
		label: $labelId
	}));

	validate_store(idValues, 'idValues');
	component_subscribe($$self, idValues, value => $$invalidate(0, $idValues = value));

	const writable_props = [
		'required',
		'disabled',
		'preventScroll',
		'loop',
		'closeOnEscape',
		'closeOnOutsideClick',
		'portal',
		'name',
		'multiple',
		'selected',
		'onSelectedChange',
		'open',
		'onOpenChange',
		'items',
		'onOutsideClick'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Select> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('required' in $$props) $$invalidate(4, required = $$props.required);
		if ('disabled' in $$props) $$invalidate(5, disabled = $$props.disabled);
		if ('preventScroll' in $$props) $$invalidate(6, preventScroll = $$props.preventScroll);
		if ('loop' in $$props) $$invalidate(7, loop = $$props.loop);
		if ('closeOnEscape' in $$props) $$invalidate(8, closeOnEscape = $$props.closeOnEscape);
		if ('closeOnOutsideClick' in $$props) $$invalidate(9, closeOnOutsideClick = $$props.closeOnOutsideClick);
		if ('portal' in $$props) $$invalidate(10, portal = $$props.portal);
		if ('name' in $$props) $$invalidate(11, name = $$props.name);
		if ('multiple' in $$props) $$invalidate(12, multiple = $$props.multiple);
		if ('selected' in $$props) $$invalidate(2, selected = $$props.selected);
		if ('onSelectedChange' in $$props) $$invalidate(13, onSelectedChange = $$props.onSelectedChange);
		if ('open' in $$props) $$invalidate(3, open = $$props.open);
		if ('onOpenChange' in $$props) $$invalidate(14, onOpenChange = $$props.onOpenChange);
		if ('items' in $$props) $$invalidate(15, items = $$props.items);
		if ('onOutsideClick' in $$props) $$invalidate(16, onOutsideClick = $$props.onOutsideClick);
		if ('$$scope' in $$props) $$invalidate(17, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		derived,
		setCtx: setCtx$1,
		required,
		disabled,
		preventScroll,
		loop,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		name,
		multiple,
		selected,
		onSelectedChange,
		open,
		onOpenChange,
		items,
		onOutsideClick,
		localOpen,
		localSelected,
		updateOption,
		ids,
		idValues,
		$idValues
	});

	$$self.$inject_state = $$props => {
		if ('required' in $$props) $$invalidate(4, required = $$props.required);
		if ('disabled' in $$props) $$invalidate(5, disabled = $$props.disabled);
		if ('preventScroll' in $$props) $$invalidate(6, preventScroll = $$props.preventScroll);
		if ('loop' in $$props) $$invalidate(7, loop = $$props.loop);
		if ('closeOnEscape' in $$props) $$invalidate(8, closeOnEscape = $$props.closeOnEscape);
		if ('closeOnOutsideClick' in $$props) $$invalidate(9, closeOnOutsideClick = $$props.closeOnOutsideClick);
		if ('portal' in $$props) $$invalidate(10, portal = $$props.portal);
		if ('name' in $$props) $$invalidate(11, name = $$props.name);
		if ('multiple' in $$props) $$invalidate(12, multiple = $$props.multiple);
		if ('selected' in $$props) $$invalidate(2, selected = $$props.selected);
		if ('onSelectedChange' in $$props) $$invalidate(13, onSelectedChange = $$props.onSelectedChange);
		if ('open' in $$props) $$invalidate(3, open = $$props.open);
		if ('onOpenChange' in $$props) $$invalidate(14, onOpenChange = $$props.onOpenChange);
		if ('items' in $$props) $$invalidate(15, items = $$props.items);
		if ('onOutsideClick' in $$props) $$invalidate(16, onOutsideClick = $$props.onOutsideClick);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*open*/ 8) {
			open !== void 0 && localOpen.set(open);
		}

		if ($$self.$$.dirty & /*selected*/ 4) {
			selected !== void 0 && localSelected.set(Array.isArray(selected)
			? [...selected]
			: // eslint-disable-next-line @typescript-eslint/no-explicit-any
				selected);
		}

		if ($$self.$$.dirty & /*required*/ 16) {
			updateOption("required", required);
		}

		if ($$self.$$.dirty & /*disabled*/ 32) {
			updateOption("disabled", disabled);
		}

		if ($$self.$$.dirty & /*preventScroll*/ 64) {
			updateOption("preventScroll", preventScroll);
		}

		if ($$self.$$.dirty & /*loop*/ 128) {
			updateOption("loop", loop);
		}

		if ($$self.$$.dirty & /*closeOnEscape*/ 256) {
			updateOption("closeOnEscape", closeOnEscape);
		}

		if ($$self.$$.dirty & /*closeOnOutsideClick*/ 512) {
			updateOption("closeOnOutsideClick", closeOnOutsideClick);
		}

		if ($$self.$$.dirty & /*portal*/ 1024) {
			updateOption("portal", portal);
		}

		if ($$self.$$.dirty & /*name*/ 2048) {
			updateOption("name", name);
		}

		if ($$self.$$.dirty & /*multiple*/ 4096) {
			updateOption("multiple", multiple);
		}

		if ($$self.$$.dirty & /*onOutsideClick*/ 65536) {
			updateOption("onOutsideClick", onOutsideClick);
		}
	};

	return [
		$idValues,
		idValues,
		selected,
		open,
		required,
		disabled,
		preventScroll,
		loop,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		name,
		multiple,
		onSelectedChange,
		onOpenChange,
		items,
		onOutsideClick,
		$$scope,
		slots
	];
}

let Select$1 = class Select extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$M, create_fragment$M, safe_not_equal, {
			required: 4,
			disabled: 5,
			preventScroll: 6,
			loop: 7,
			closeOnEscape: 8,
			closeOnOutsideClick: 9,
			portal: 10,
			name: 11,
			multiple: 12,
			selected: 2,
			onSelectedChange: 13,
			open: 3,
			onOpenChange: 14,
			items: 15,
			onOutsideClick: 16
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select",
			options,
			id: create_fragment$M.name
		});
	}

	get required() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set required(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get preventScroll() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set preventScroll(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get loop() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loop(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get closeOnEscape() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set closeOnEscape(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get closeOnOutsideClick() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set closeOnOutsideClick(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get portal() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set portal(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get multiple() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set multiple(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selected() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selected(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onSelectedChange() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onSelectedChange(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get open() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set open(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onOpenChange() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onOpenChange(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get items() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onOutsideClick() {
		throw new Error("<Select>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onOutsideClick(value) {
		throw new Error("<Select>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/select/components/select-arrow.svelte generated by Svelte v4.2.8 */
const file$z = "node_modules/bits-ui/dist/bits/select/components/select-arrow.svelte";
const get_default_slot_changes$a = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$a = ctx => ({ builder: /*builder*/ ctx[2] });

// (19:0) {:else}
function create_else_block$9(ctx) {
	let div;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$z, 19, 1, 367);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding*/ ctx[9](div);

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding*/ ctx[9](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$9.name,
		type: "else",
		source: "(19:0) {:else}",
		ctx
	});

	return block;
}

// (17:0) {#if asChild}
function create_if_block$b(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$a);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$a),
						get_default_slot_context$a
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$b.name,
		type: "if",
		source: "(17:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$L(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$b, create_else_block$9];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$L.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$L($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","el","size"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $arrow;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_arrow', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	let { size = 8 } = $$props;
	const { elements: { arrow }, getAttrs } = setArrow(size);
	validate_store(arrow, 'arrow');
	component_subscribe($$self, arrow, value => $$invalidate(6, $arrow = value));
	const attrs = getAttrs("arrow");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('size' in $$new_props) $$invalidate(5, size = $$new_props.size);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		setArrow,
		asChild,
		el,
		size,
		arrow,
		getAttrs,
		attrs,
		builder,
		$arrow
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('size' in $$props) $$invalidate(5, size = $$new_props.size);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$arrow*/ 64) {
			$$invalidate(2, builder = $arrow);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		arrow,
		$$restProps,
		size,
		$arrow,
		$$scope,
		slots,
		div_binding
	];
}

class Select_arrow extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$L, create_fragment$L, safe_not_equal, { asChild: 1, el: 0, size: 5 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_arrow",
			options,
			id: create_fragment$L.name
		});
	}

	get asChild() {
		throw new Error("<Select_arrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_arrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_arrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_arrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Select_arrow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Select_arrow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/select/components/select-content.svelte generated by Svelte v4.2.8 */
const file$y = "node_modules/bits-ui/dist/bits/select/components/select-content.svelte";
const get_default_slot_changes_5 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_5 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_4 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_4 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_3 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_3 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_2 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_2 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes_1$5 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context_1$5 = ctx => ({ builder: /*builder*/ ctx[8] });
const get_default_slot_changes$9 = dirty => ({ builder: dirty[0] & /*builder*/ 256 });
const get_default_slot_context$9 = ctx => ({ builder: /*builder*/ ctx[8] });

// (100:16) 
function create_if_block_5(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], get_default_slot_context_5);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[13]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$y, 100, 1, 2297);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_4*/ ctx[36](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "m-pointerleave", /*dispatch*/ ctx[12], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler_4*/ ctx[31], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33554688)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, get_default_slot_changes_5),
						get_default_slot_context_5
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_4*/ ctx[36](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(100:16) ",
		ctx
	});

	return block;
}

// (89:33) 
function create_if_block_4(ctx) {
	let div;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], get_default_slot_context_4);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[13]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$y, 89, 1, 2086);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_3*/ ctx[35](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "m-pointerleave", /*dispatch*/ ctx[12], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler_3*/ ctx[30], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33554688)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, get_default_slot_changes_4),
						get_default_slot_context_4
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			if (div_outro) div_outro.end(1);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);

			if (local) {
				div_outro = create_out_transition(div, /*outTransition*/ ctx[5], /*outTransitionConfig*/ ctx[6]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_3*/ ctx[35](null);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(89:33) ",
		ctx
	});

	return block;
}

// (78:32) 
function create_if_block_3(ctx) {
	let div;
	let div_intro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], get_default_slot_context_3);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[13]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$y, 78, 1, 1861);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_2*/ ctx[34](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "m-pointerleave", /*dispatch*/ ctx[12], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler_2*/ ctx[29], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33554688)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, get_default_slot_changes_3),
						get_default_slot_context_3
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, /*inTransition*/ ctx[3], /*inTransitionConfig*/ ctx[4]);
						div_intro.start();
					});
				}
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_2*/ ctx[34](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(78:32) ",
		ctx
	});

	return block;
}

// (66:49) 
function create_if_block_2$1(ctx) {
	let div;
	let div_intro;
	let div_outro;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], get_default_slot_context_2);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[13]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$y, 66, 1, 1595);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding_1*/ ctx[33](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "m-pointerleave", /*dispatch*/ ctx[12], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler_1*/ ctx[28], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33554688)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, get_default_slot_changes_2),
						get_default_slot_context_2
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (local) {
				add_render_callback(() => {
					if (!current) return;
					if (div_outro) div_outro.end(1);
					div_intro = create_in_transition(div, /*inTransition*/ ctx[3], /*inTransitionConfig*/ ctx[4]);
					div_intro.start();
				});
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			if (div_intro) div_intro.invalidate();

			if (local) {
				div_outro = create_out_transition(div, /*outTransition*/ ctx[5], /*outTransitionConfig*/ ctx[6]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding_1*/ ctx[33](null);
			if (detaching && div_outro) div_outro.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(66:49) ",
		ctx
	});

	return block;
}

// (55:30) 
function create_if_block_1$3(ctx) {
	let div;
	let div_transition;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], get_default_slot_context_1$5);
	let div_levels = [/*builder*/ ctx[8], /*$$restProps*/ ctx[13]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$y, 55, 1, 1350);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[32](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[8].action(div)),
					listen_dev(div, "m-pointerleave", /*dispatch*/ ctx[12], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler*/ ctx[27], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33554688)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, get_default_slot_changes_1$5),
						get_default_slot_context_1$5
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty[0] & /*builder*/ 256 && /*builder*/ ctx[8],
				dirty[0] & /*$$restProps*/ 8192 && /*$$restProps*/ ctx[13]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);

			if (local) {
				add_render_callback(() => {
					if (!current) return;
					if (!div_transition) div_transition = create_bidirectional_transition(div, /*transition*/ ctx[1], /*transitionConfig*/ ctx[2], true);
					div_transition.run(1);
				});
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);

			if (local) {
				if (!div_transition) div_transition = create_bidirectional_transition(div, /*transition*/ ctx[1], /*transitionConfig*/ ctx[2], false);
				div_transition.run(0);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[32](null);
			if (detaching && div_transition) div_transition.end();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(55:30) ",
		ctx
	});

	return block;
}

// (53:0) {#if asChild && $open}
function create_if_block$a(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], get_default_slot_context$9);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope, builder*/ 33554688)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, get_default_slot_changes$9),
						get_default_slot_context$9
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$a.name,
		type: "if",
		source: "(53:0) {#if asChild && $open}",
		ctx
	});

	return block;
}

function create_fragment$K(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;

	const if_block_creators = [
		create_if_block$a,
		create_if_block_1$3,
		create_if_block_2$1,
		create_if_block_3,
		create_if_block_4,
		create_if_block_5
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[7] && /*$open*/ ctx[9]) return 0;
		if (/*transition*/ ctx[1] && /*$open*/ ctx[9]) return 1;
		if (/*inTransition*/ ctx[3] && /*outTransition*/ ctx[5] && /*$open*/ ctx[9]) return 2;
		if (/*inTransition*/ ctx[3] && /*$open*/ ctx[9]) return 3;
		if (/*outTransition*/ ctx[5] && /*$open*/ ctx[9]) return 4;
		if (/*$open*/ ctx[9]) return 5;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$K.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$K($$self, $$props, $$invalidate) {
	let builder;

	const omit_props_names = [
		"transition","transitionConfig","inTransition","inTransitionConfig","outTransition","outTransitionConfig","asChild","id","side","align","sideOffset","alignOffset","collisionPadding","avoidCollisions","collisionBoundary","sameWidth","fitViewport","el"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $menu;
	let $open;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_content', slots, ['default']);
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
	let { sameWidth = true } = $$props;
	let { fitViewport = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx();
	validate_store(menu, 'menu');
	component_subscribe($$self, menu, value => $$invalidate(24, $menu = value));
	validate_store(open, 'open');
	component_subscribe($$self, open, value => $$invalidate(9, $open = value));
	const dispatch = createDispatcher();
	const attrs = getAttrs("content");

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler_2(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler_3(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler_4(event) {
		bubble.call(this, $$self, event);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_2($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_3($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	function div_binding_4($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(13, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('transition' in $$new_props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$new_props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('inTransition' in $$new_props) $$invalidate(3, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$new_props) $$invalidate(4, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$new_props) $$invalidate(5, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$new_props) $$invalidate(6, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('asChild' in $$new_props) $$invalidate(7, asChild = $$new_props.asChild);
		if ('id' in $$new_props) $$invalidate(14, id = $$new_props.id);
		if ('side' in $$new_props) $$invalidate(15, side = $$new_props.side);
		if ('align' in $$new_props) $$invalidate(16, align = $$new_props.align);
		if ('sideOffset' in $$new_props) $$invalidate(17, sideOffset = $$new_props.sideOffset);
		if ('alignOffset' in $$new_props) $$invalidate(18, alignOffset = $$new_props.alignOffset);
		if ('collisionPadding' in $$new_props) $$invalidate(19, collisionPadding = $$new_props.collisionPadding);
		if ('avoidCollisions' in $$new_props) $$invalidate(20, avoidCollisions = $$new_props.avoidCollisions);
		if ('collisionBoundary' in $$new_props) $$invalidate(21, collisionBoundary = $$new_props.collisionBoundary);
		if ('sameWidth' in $$new_props) $$invalidate(22, sameWidth = $$new_props.sameWidth);
		if ('fitViewport' in $$new_props) $$invalidate(23, fitViewport = $$new_props.fitViewport);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		createDispatcher,
		melt,
		getCtx,
		updatePositioning,
		transition,
		transitionConfig,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		asChild,
		id,
		side,
		align,
		sideOffset,
		alignOffset,
		collisionPadding,
		avoidCollisions,
		collisionBoundary,
		sameWidth,
		fitViewport,
		el,
		menu,
		open,
		ids,
		getAttrs,
		dispatch,
		attrs,
		builder,
		$menu,
		$open
	});

	$$self.$inject_state = $$new_props => {
		if ('transition' in $$props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('inTransition' in $$props) $$invalidate(3, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$props) $$invalidate(4, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$props) $$invalidate(5, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$props) $$invalidate(6, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('asChild' in $$props) $$invalidate(7, asChild = $$new_props.asChild);
		if ('id' in $$props) $$invalidate(14, id = $$new_props.id);
		if ('side' in $$props) $$invalidate(15, side = $$new_props.side);
		if ('align' in $$props) $$invalidate(16, align = $$new_props.align);
		if ('sideOffset' in $$props) $$invalidate(17, sideOffset = $$new_props.sideOffset);
		if ('alignOffset' in $$props) $$invalidate(18, alignOffset = $$new_props.alignOffset);
		if ('collisionPadding' in $$props) $$invalidate(19, collisionPadding = $$new_props.collisionPadding);
		if ('avoidCollisions' in $$props) $$invalidate(20, avoidCollisions = $$new_props.avoidCollisions);
		if ('collisionBoundary' in $$props) $$invalidate(21, collisionBoundary = $$new_props.collisionBoundary);
		if ('sameWidth' in $$props) $$invalidate(22, sameWidth = $$new_props.sameWidth);
		if ('fitViewport' in $$props) $$invalidate(23, fitViewport = $$new_props.fitViewport);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(8, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*id*/ 16384) {
			if (id) {
				ids.menu.set(id);
			}
		}

		if ($$self.$$.dirty[0] & /*$menu*/ 16777216) {
			$$invalidate(8, builder = $menu);
		}

		if ($$self.$$.dirty[0] & /*builder*/ 256) {
			Object.assign(builder, attrs);
		}

		if ($$self.$$.dirty[0] & /*side, align, sideOffset, alignOffset, collisionPadding, avoidCollisions, collisionBoundary, sameWidth, fitViewport*/ 16744448) {
			updatePositioning({
				side,
				align,
				sideOffset,
				alignOffset,
				collisionPadding,
				avoidCollisions,
				collisionBoundary,
				sameWidth,
				fitViewport
			});
		}
	};

	return [
		el,
		transition,
		transitionConfig,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		asChild,
		builder,
		$open,
		menu,
		open,
		dispatch,
		$$restProps,
		id,
		side,
		align,
		sideOffset,
		alignOffset,
		collisionPadding,
		avoidCollisions,
		collisionBoundary,
		sameWidth,
		fitViewport,
		$menu,
		$$scope,
		slots,
		keydown_handler,
		keydown_handler_1,
		keydown_handler_2,
		keydown_handler_3,
		keydown_handler_4,
		div_binding,
		div_binding_1,
		div_binding_2,
		div_binding_3,
		div_binding_4
	];
}

let Select_content$1 = class Select_content extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$K,
			create_fragment$K,
			safe_not_equal,
			{
				transition: 1,
				transitionConfig: 2,
				inTransition: 3,
				inTransitionConfig: 4,
				outTransition: 5,
				outTransitionConfig: 6,
				asChild: 7,
				id: 14,
				side: 15,
				align: 16,
				sideOffset: 17,
				alignOffset: 18,
				collisionPadding: 19,
				avoidCollisions: 20,
				collisionBoundary: 21,
				sameWidth: 22,
				fitViewport: 23,
				el: 0
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_content",
			options,
			id: create_fragment$K.name
		});
	}

	get transition() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transition(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transitionConfig() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transitionConfig(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransition() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransition(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransitionConfig() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransitionConfig(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransition() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransition(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransitionConfig() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransitionConfig(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get side() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set side(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get align() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set align(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sideOffset() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sideOffset(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get alignOffset() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set alignOffset(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get collisionPadding() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set collisionPadding(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get avoidCollisions() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set avoidCollisions(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get collisionBoundary() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set collisionBoundary(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sameWidth() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sameWidth(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fitViewport() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fitViewport(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/select/components/select-group.svelte generated by Svelte v4.2.8 */
const file$x = "node_modules/bits-ui/dist/bits/select/components/select-group.svelte";
const get_default_slot_changes_1$4 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$4 = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$8 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$8 = ctx => ({ builder: /*builder*/ ctx[2] });

// (15:0) {:else}
function create_else_block$8(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], get_default_slot_context_1$4);
	let div_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$x, 15, 1, 338);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[8](div);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 68)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, get_default_slot_changes_1$4),
						get_default_slot_context_1$4
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[8](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$8.name,
		type: "else",
		source: "(15:0) {:else}",
		ctx
	});

	return block;
}

// (13:0) {#if asChild}
function create_if_block$9(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], get_default_slot_context$8);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 68)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[6],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, get_default_slot_changes$8),
						get_default_slot_context$8
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$9.name,
		type: "if",
		source: "(13:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$J(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$9, create_else_block$8];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$J.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$J($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $group;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_group', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { group, id, getAttrs } = setGroupCtx();
	validate_store(group, 'group');
	component_subscribe($$self, group, value => $$invalidate(5, $group = value));
	const attrs = getAttrs("group");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		setGroupCtx,
		asChild,
		el,
		group,
		id,
		getAttrs,
		attrs,
		builder,
		$group
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$group*/ 32) {
			$$invalidate(2, builder = $group(id));
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [el, asChild, builder, group, $$restProps, $group, $$scope, slots, div_binding];
}

class Select_group extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$J, create_fragment$J, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_group",
			options,
			id: create_fragment$J.name
		});
	}

	get asChild() {
		throw new Error("<Select_group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/select/components/select-input.svelte generated by Svelte v4.2.8 */
const file$w = "node_modules/bits-ui/dist/bits/select/components/select-input.svelte";
const get_default_slot_changes$7 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$7 = ctx => ({ builder: /*builder*/ ctx[2] });

// (23:0) {:else}
function create_else_block$7(ctx) {
	let input;
	let mounted;
	let dispose;
	let input_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[5]];
	let input_data = {};

	for (let i = 0; i < input_levels.length; i += 1) {
		input_data = assign(input_data, input_levels[i]);
	}

	const block = {
		c: function create() {
			input = element("input");
			set_attributes(input, input_data);
			add_location(input, file$w, 23, 1, 428);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input, anchor);
			if (input.autofocus) input.focus();
			/*input_binding*/ ctx[11](input);

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(input));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(input, input_data = get_spread_update(input_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(input);
			}

			/*input_binding*/ ctx[11](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$7.name,
		type: "else",
		source: "(23:0) {:else}",
		ctx
	});

	return block;
}

// (21:0) {#if asChild}
function create_if_block$8(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[10].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context$7);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 516)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes$7),
						get_default_slot_context$7
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$8.name,
		type: "if",
		source: "(21:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$I(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$8, create_else_block$7];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$I.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$I($$self, $$props, $$invalidate) {
	let attrs;
	let builder;
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $hiddenInput;
	let $disabled;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_input', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { hiddenInput }, options: { disabled }, getAttrs } = getCtx();
	validate_store(hiddenInput, 'hiddenInput');
	component_subscribe($$self, hiddenInput, value => $$invalidate(7, $hiddenInput = value));
	validate_store(disabled, 'disabled');
	component_subscribe($$self, disabled, value => $$invalidate(8, $disabled = value));

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx,
		asChild,
		el,
		hiddenInput,
		disabled,
		getAttrs,
		attrs,
		builder,
		$hiddenInput,
		$disabled
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('attrs' in $$props) $$invalidate(6, attrs = $$new_props.attrs);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$disabled*/ 256) {
			$$invalidate(6, attrs = {
				...getAttrs("input"),
				disabled: $disabled ? true : void 0
			});
		}

		if ($$self.$$.dirty & /*$hiddenInput*/ 128) {
			$$invalidate(2, builder = $hiddenInput);
		}

		if ($$self.$$.dirty & /*builder, attrs*/ 68) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		hiddenInput,
		disabled,
		$$restProps,
		attrs,
		$hiddenInput,
		$disabled,
		$$scope,
		slots,
		input_binding
	];
}

class Select_input extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$I, create_fragment$I, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_input",
			options,
			id: create_fragment$I.name
		});
	}

	get asChild() {
		throw new Error("<Select_input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/select/components/select-item.svelte generated by Svelte v4.2.8 */
const file$v = "node_modules/bits-ui/dist/bits/select/components/select-item.svelte";
const get_default_slot_changes_1$3 = dirty => ({ builder: dirty & /*builder*/ 16 });
const get_default_slot_context_1$3 = ctx => ({ builder: /*builder*/ ctx[4] });
const get_default_slot_changes$6 = dirty => ({ builder: dirty & /*builder*/ 16 });
const get_default_slot_context$6 = ctx => ({ builder: /*builder*/ ctx[4] });

// (25:0) {:else}
function create_else_block$6(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[11].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], get_default_slot_context_1$3);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);
	let div_levels = [/*builder*/ ctx[4], /*$$restProps*/ ctx[7]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			set_attributes(div, div_data);
			add_location(div, file$v, 25, 1, 647);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(div, null);
			}

			/*div_binding*/ ctx[16](div);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[4].action(div)),
					listen_dev(div, "m-click", /*dispatch*/ ctx[6], false, false, false, false),
					listen_dev(div, "m-pointermove", /*dispatch*/ ctx[6], false, false, false, false),
					listen_dev(div, "focusin", /*focusin_handler*/ ctx[12], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler*/ ctx[13], false, false, false, false),
					listen_dev(div, "focusout", /*focusout_handler*/ ctx[14], false, false, false, false),
					listen_dev(div, "pointerleave", /*pointerleave_handler*/ ctx[15], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 1040)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, get_default_slot_changes_1$3),
						get_default_slot_context_1$3
					);
				}
			} else {
				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*label, value*/ 6)) {
					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 16 && /*builder*/ ctx[4],
				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			/*div_binding*/ ctx[16](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$6.name,
		type: "else",
		source: "(25:0) {:else}",
		ctx
	});

	return block;
}

// (23:0) {#if asChild}
function create_if_block$7(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[11].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], get_default_slot_context$6);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 1040)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, get_default_slot_changes$6),
						get_default_slot_context$6
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(23:0) {#if asChild}",
		ctx
	});

	return block;
}

// (37:18)     
function fallback_block(ctx) {
	let t_value = (/*label*/ ctx[2] ? /*label*/ ctx[2] : /*value*/ ctx[1]) + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*label, value*/ 6 && t_value !== (t_value = (/*label*/ ctx[2] ? /*label*/ ctx[2] : /*value*/ ctx[1]) + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: fallback_block.name,
		type: "fallback",
		source: "(37:18)     ",
		ctx
	});

	return block;
}

function create_fragment$H(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$7, create_else_block$6];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[3]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$H.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$H($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["value","disabled","label","asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $item;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_item', slots, ['default']);
	let { value } = $$props;
	let { disabled = void 0 } = $$props;
	let { label = void 0 } = $$props;
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { option: item }, getAttrs } = setItemCtx(value);
	validate_store(item, 'item');
	component_subscribe($$self, item, value => $$invalidate(9, $item = value));
	const dispatch = createDispatcher();
	const attrs = getAttrs("item");

	$$self.$$.on_mount.push(function () {
		if (value === undefined && !('value' in $$props || $$self.$$.bound[$$self.$$.props['value']])) {
			console.warn("<Select_item> was created without expected prop 'value'");
		}
	});

	function focusin_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function focusout_handler(event) {
		bubble.call(this, $$self, event);
	}

	function pointerleave_handler(event) {
		bubble.call(this, $$self, event);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
		if ('disabled' in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
		if ('label' in $$new_props) $$invalidate(2, label = $$new_props.label);
		if ('asChild' in $$new_props) $$invalidate(3, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		setItemCtx,
		createDispatcher,
		value,
		disabled,
		label,
		asChild,
		el,
		item,
		getAttrs,
		dispatch,
		attrs,
		builder,
		$item
	});

	$$self.$inject_state = $$new_props => {
		if ('value' in $$props) $$invalidate(1, value = $$new_props.value);
		if ('disabled' in $$props) $$invalidate(8, disabled = $$new_props.disabled);
		if ('label' in $$props) $$invalidate(2, label = $$new_props.label);
		if ('asChild' in $$props) $$invalidate(3, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(4, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$item, value, disabled, label*/ 774) {
			$$invalidate(4, builder = $item({ value, disabled, label }));
		}

		if ($$self.$$.dirty & /*builder*/ 16) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		value,
		label,
		asChild,
		builder,
		item,
		dispatch,
		$$restProps,
		disabled,
		$item,
		$$scope,
		slots,
		focusin_handler,
		keydown_handler,
		focusout_handler,
		pointerleave_handler,
		div_binding
	];
}

let Select_item$1 = class Select_item extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$H, create_fragment$H, safe_not_equal, {
			value: 1,
			disabled: 8,
			label: 2,
			asChild: 3,
			el: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_item",
			options,
			id: create_fragment$H.name
		});
	}

	get value() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get label() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set label(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/select/components/select-item-indicator.svelte generated by Svelte v4.2.8 */
const file$u = "node_modules/bits-ui/dist/bits/select/components/select-item-indicator.svelte";
const get_default_slot_changes_1$2 = dirty => ({ isSelected: dirty & /*$isSelected*/ 4 });

const get_default_slot_context_1$2 = ctx => ({
	attrs: /*attrs*/ ctx[5],
	isSelected: /*$isSelected*/ ctx[2](/*value*/ ctx[4])
});

const get_default_slot_changes$5 = dirty => ({ isSelected: dirty & /*$isSelected*/ 4 });

const get_default_slot_context$5 = ctx => ({
	attrs: /*attrs*/ ctx[5],
	isSelected: /*$isSelected*/ ctx[2](/*value*/ ctx[4])
});

// (10:0) {:else}
function create_else_block$5(ctx) {
	let div;
	let show_if = /*$isSelected*/ ctx[2](/*value*/ ctx[4]);
	let current;
	let if_block = show_if && create_if_block_1$2(ctx);
	let div_levels = [/*$$restProps*/ ctx[6], /*attrs*/ ctx[5]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (if_block) if_block.c();
			set_attributes(div, div_data);
			add_location(div, file$u, 10, 1, 287);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block) if_block.m(div, null);
			/*div_binding*/ ctx[9](div);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$isSelected*/ 4) show_if = /*$isSelected*/ ctx[2](/*value*/ ctx[4]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$isSelected*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6], /*attrs*/ ctx[5]]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (if_block) if_block.d();
			/*div_binding*/ ctx[9](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$5.name,
		type: "else",
		source: "(10:0) {:else}",
		ctx
	});

	return block;
}

// (8:0) {#if asChild}
function create_if_block$6(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$5);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $isSelected*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$5),
						get_default_slot_context$5
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(8:0) {#if asChild}",
		ctx
	});

	return block;
}

// (12:2) {#if $isSelected(value)}
function create_if_block_1$2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1$2);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, $isSelected*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1$2),
						get_default_slot_context_1$2
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(12:2) {#if $isSelected(value)}",
		ctx
	});

	return block;
}

function create_fragment$G(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$6, create_else_block$5];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$G.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$G($$self, $$props, $$invalidate) {
	const omit_props_names = ["asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $isSelected;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_item_indicator', slots, ['default']);
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { isSelected, value, getAttrs } = getItemIndicator();
	validate_store(isSelected, 'isSelected');
	component_subscribe($$self, isSelected, value => $$invalidate(2, $isSelected = value));
	const attrs = getAttrs("indicator");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		getItemIndicator,
		asChild,
		el,
		isSelected,
		value,
		getAttrs,
		attrs,
		$isSelected
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		el,
		asChild,
		$isSelected,
		isSelected,
		value,
		attrs,
		$$restProps,
		$$scope,
		slots,
		div_binding
	];
}

class Select_item_indicator extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$G, create_fragment$G, safe_not_equal, { asChild: 1, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_item_indicator",
			options,
			id: create_fragment$G.name
		});
	}

	get asChild() {
		throw new Error("<Select_item_indicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_item_indicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_item_indicator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_item_indicator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/select/components/select-label.svelte generated by Svelte v4.2.8 */
const file$t = "node_modules/bits-ui/dist/bits/select/components/select-label.svelte";
const get_default_slot_changes_1$1 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1$1 = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$4 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$4 = ctx => ({ builder: /*builder*/ ctx[2] });

// (21:0) {:else}
function create_else_block$4(ctx) {
	let div;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context_1$1);
	let div_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$t, 21, 1, 466);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			/*div_binding*/ ctx[9](div);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes_1$1),
						get_default_slot_context_1$1
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			/*div_binding*/ ctx[9](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$4.name,
		type: "else",
		source: "(21:0) {:else}",
		ctx
	});

	return block;
}

// (19:0) {#if asChild}
function create_if_block$5(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$4);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 132)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[7],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$4),
						get_default_slot_context$4
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(19:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$F(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$5, create_else_block$4];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$F.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$F($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","id","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $groupLabel;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_label', slots, ['default']);
	let { asChild = false } = $$props;
	let { id = void 0 } = $$props;
	let { el = void 0 } = $$props;
	const { ids, getAttrs } = getCtx();
	const { groupLabel, id: groupId } = getGroupLabel();
	validate_store(groupLabel, 'groupLabel');
	component_subscribe($$self, groupLabel, value => $$invalidate(6, $groupLabel = value));
	const attrs = getAttrs("label");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('id' in $$new_props) $$invalidate(5, id = $$new_props.id);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getGroupLabel,
		getCtx,
		asChild,
		id,
		el,
		ids,
		getAttrs,
		groupLabel,
		groupId,
		attrs,
		builder,
		$groupLabel
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('id' in $$props) $$invalidate(5, id = $$new_props.id);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*id*/ 32) {
			if (id) {
				ids.label.set(id);
			}
		}

		if ($$self.$$.dirty & /*$groupLabel*/ 64) {
			$$invalidate(2, builder = $groupLabel(groupId));
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		groupLabel,
		$$restProps,
		id,
		$groupLabel,
		$$scope,
		slots,
		div_binding
	];
}

let Select_label$1 = class Select_label extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$F, create_fragment$F, safe_not_equal, { asChild: 1, id: 5, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_label",
			options,
			id: create_fragment$F.name
		});
	}

	get asChild() {
		throw new Error("<Select_label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Select_label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Select_label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

function getSeparatorData() {
    const NAME = "separator";
    const PARTS = ["root"];
    return {
        NAME,
        PARTS
    };
}
function setCtx(props) {
    const { NAME, PARTS } = getSeparatorData();
    const getAttrs = createBitAttrs(NAME, PARTS);
    const separator = { ...createSeparator(removeUndefined(props)), getAttrs };
    return {
        ...separator,
        updateOption: getOptionUpdater(separator.options)
    };
}

/* node_modules/bits-ui/dist/bits/separator/components/separator.svelte generated by Svelte v4.2.8 */
const file$s = "node_modules/bits-ui/dist/bits/separator/components/separator.svelte";
const get_default_slot_changes$3 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$3 = ctx => ({ builder: /*builder*/ ctx[2] });

// (25:0) {:else}
function create_else_block$3(ctx) {
	let div;
	let mounted;
	let dispose;
	let div_levels = [/*builder*/ ctx[2], /*$$restProps*/ ctx[4]];
	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			set_attributes(div, div_data);
			add_location(div, file$s, 25, 1, 539);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding*/ ctx[10](div);

			if (!mounted) {
				dispose = action_destroyer(/*builder*/ ctx[2].action(div));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(div, div_data = get_spread_update(div_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				dirty & /*$$restProps*/ 16 && /*$$restProps*/ ctx[4]
			]));
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			/*div_binding*/ ctx[10](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$3.name,
		type: "else",
		source: "(25:0) {:else}",
		ctx
	});

	return block;
}

// (23:0) {#if asChild}
function create_if_block$4(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context$3);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 260)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes$3),
						get_default_slot_context$3
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(23:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$E(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$4, create_else_block$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$E.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$E($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["orientation","decorative","asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $root;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Separator', slots, ['default']);
	let { orientation = "horizontal" } = $$props;
	let { decorative = true } = $$props;
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { root }, updateOption, getAttrs } = setCtx({ orientation, decorative });
	validate_store(root, 'root');
	component_subscribe($$self, root, value => $$invalidate(7, $root = value));
	const attrs = getAttrs("root");

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('orientation' in $$new_props) $$invalidate(5, orientation = $$new_props.orientation);
		if ('decorative' in $$new_props) $$invalidate(6, decorative = $$new_props.decorative);
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		setCtx,
		orientation,
		decorative,
		asChild,
		el,
		root,
		updateOption,
		getAttrs,
		attrs,
		builder,
		$root
	});

	$$self.$inject_state = $$new_props => {
		if ('orientation' in $$props) $$invalidate(5, orientation = $$new_props.orientation);
		if ('decorative' in $$props) $$invalidate(6, decorative = $$new_props.decorative);
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*orientation*/ 32) {
			updateOption("orientation", orientation);
		}

		if ($$self.$$.dirty & /*decorative*/ 64) {
			updateOption("decorative", decorative);
		}

		if ($$self.$$.dirty & /*$root*/ 128) {
			$$invalidate(2, builder = $root);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		root,
		$$restProps,
		orientation,
		decorative,
		$root,
		$$scope,
		slots,
		div_binding
	];
}

class Separator extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$E, create_fragment$E, safe_not_equal, {
			orientation: 5,
			decorative: 6,
			asChild: 1,
			el: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Separator",
			options,
			id: create_fragment$E.name
		});
	}

	get orientation() {
		throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set orientation(value) {
		throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get decorative() {
		throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set decorative(value) {
		throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte generated by Svelte v4.2.8 */
const file$r = "node_modules/bits-ui/dist/bits/select/components/select-trigger.svelte";
const get_default_slot_changes_1 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context_1 = ctx => ({ builder: /*builder*/ ctx[2] });
const get_default_slot_changes$2 = dirty => ({ builder: dirty & /*builder*/ 4 });
const get_default_slot_context$2 = ctx => ({ builder: /*builder*/ ctx[2] });

// (26:0) {:else}
function create_else_block$2(ctx) {
	let button;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context_1);
	let button_levels = [/*builder*/ ctx[2], { type: "button" }, /*$$restProps*/ ctx[5]];
	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	const block = {
		c: function create() {
			button = element("button");
			if (default_slot) default_slot.c();
			set_attributes(button, button_data);
			add_location(button, file$r, 26, 1, 520);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			if (button.autofocus) button.focus();
			/*button_binding*/ ctx[10](button);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(/*builder*/ ctx[2].action(button)),
					listen_dev(button, "m-click", /*dispatch*/ ctx[4], false, false, false, false),
					listen_dev(button, "m-keydown", /*dispatch*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 260)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes_1),
						get_default_slot_context_1
					);
				}
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				dirty & /*builder*/ 4 && /*builder*/ ctx[2],
				{ type: "button" },
				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(button);
			}

			if (default_slot) default_slot.d(detaching);
			/*button_binding*/ ctx[10](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(26:0) {:else}",
		ctx
	});

	return block;
}

// (24:0) {#if asChild}
function create_if_block$3(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context$2);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 260)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes$2),
						get_default_slot_context$2
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(24:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$D(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$D.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$D($$self, $$props, $$invalidate) {
	let builder;
	const omit_props_names = ["asChild","id","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $trigger;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_trigger', slots, ['default']);
	let { asChild = false } = $$props;
	let { id = void 0 } = $$props;
	let { el = void 0 } = $$props;
	const { elements: { trigger }, ids, getAttrs } = getCtx();
	validate_store(trigger, 'trigger');
	component_subscribe($$self, trigger, value => $$invalidate(7, $trigger = value));
	const dispatch = createDispatcher();
	const attrs = getAttrs("trigger");

	function button_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('asChild' in $$new_props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('id' in $$new_props) $$invalidate(6, id = $$new_props.id);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		melt,
		getCtx,
		createDispatcher,
		asChild,
		id,
		el,
		trigger,
		ids,
		getAttrs,
		dispatch,
		attrs,
		builder,
		$trigger
	});

	$$self.$inject_state = $$new_props => {
		if ('asChild' in $$props) $$invalidate(1, asChild = $$new_props.asChild);
		if ('id' in $$props) $$invalidate(6, id = $$new_props.id);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('builder' in $$props) $$invalidate(2, builder = $$new_props.builder);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*id*/ 64) {
			if (id) {
				ids.trigger.set(id);
			}
		}

		if ($$self.$$.dirty & /*$trigger*/ 128) {
			$$invalidate(2, builder = $trigger);
		}

		if ($$self.$$.dirty & /*builder*/ 4) {
			Object.assign(builder, attrs);
		}
	};

	return [
		el,
		asChild,
		builder,
		trigger,
		dispatch,
		$$restProps,
		id,
		$trigger,
		$$scope,
		slots,
		button_binding
	];
}

let Select_trigger$1 = class Select_trigger extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$D, create_fragment$D, safe_not_equal, { asChild: 1, id: 6, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_trigger",
			options,
			id: create_fragment$D.name
		});
	}

	get asChild() {
		throw new Error("<Select_trigger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_trigger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get id() {
		throw new Error("<Select_trigger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set id(value) {
		throw new Error("<Select_trigger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_trigger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_trigger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* node_modules/bits-ui/dist/bits/select/components/select-value.svelte generated by Svelte v4.2.8 */
const file$q = "node_modules/bits-ui/dist/bits/select/components/select-value.svelte";
const get_default_slot_changes$1 = dirty => ({ label: dirty & /*label*/ 8 });

const get_default_slot_context$1 = ctx => ({
	label: /*label*/ ctx[3],
	attrs: /*attrs*/ ctx[5]
});

// (16:0) {:else}
function create_else_block$1(ctx) {
	let span;

	let t_value = (/*label*/ ctx[3]
	? /*label*/ ctx[3]
	: /*placeholder*/ ctx[1]) + "";

	let t;
	let span_levels = [/*$$restProps*/ ctx[6], /*attrs*/ ctx[5]];
	let span_data = {};

	for (let i = 0; i < span_levels.length; i += 1) {
		span_data = assign(span_data, span_levels[i]);
	}

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			set_attributes(span, span_data);
			add_location(span, file$q, 16, 1, 309);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
			/*span_binding*/ ctx[10](span);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*label, placeholder*/ 10 && t_value !== (t_value = (/*label*/ ctx[3]
			? /*label*/ ctx[3]
			: /*placeholder*/ ctx[1]) + "")) set_data_maybe_contenteditable_dev(t, t_value, span_data['contenteditable']);

			set_attributes(span, span_data = get_spread_update(span_levels, [dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6], /*attrs*/ ctx[5]]));
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span);
			}

			/*span_binding*/ ctx[10](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(16:0) {:else}",
		ctx
	});

	return block;
}

// (14:0) {#if asChild}
function create_if_block$2(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context$1);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, label*/ 264)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes$1),
						get_default_slot_context$1
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(14:0) {#if asChild}",
		ctx
	});

	return block;
}

function create_fragment$C(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*asChild*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$C.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$C($$self, $$props, $$invalidate) {
	let label;
	const omit_props_names = ["placeholder","asChild","el"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let $selectedLabel;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_value', slots, ['default']);
	let { placeholder = "" } = $$props;
	let { asChild = false } = $$props;
	let { el = void 0 } = $$props;
	const { states: { selectedLabel }, getAttrs } = getCtx();
	validate_store(selectedLabel, 'selectedLabel');
	component_subscribe($$self, selectedLabel, value => $$invalidate(7, $selectedLabel = value));
	const attrs = getAttrs("value");

	function span_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('placeholder' in $$new_props) $$invalidate(1, placeholder = $$new_props.placeholder);
		if ('asChild' in $$new_props) $$invalidate(2, asChild = $$new_props.asChild);
		if ('el' in $$new_props) $$invalidate(0, el = $$new_props.el);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		getCtx,
		placeholder,
		asChild,
		el,
		selectedLabel,
		getAttrs,
		attrs,
		label,
		$selectedLabel
	});

	$$self.$inject_state = $$new_props => {
		if ('placeholder' in $$props) $$invalidate(1, placeholder = $$new_props.placeholder);
		if ('asChild' in $$props) $$invalidate(2, asChild = $$new_props.asChild);
		if ('el' in $$props) $$invalidate(0, el = $$new_props.el);
		if ('label' in $$props) $$invalidate(3, label = $$new_props.label);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$selectedLabel*/ 128) {
			$$invalidate(3, label = $selectedLabel);
		}
	};

	return [
		el,
		placeholder,
		asChild,
		label,
		selectedLabel,
		attrs,
		$$restProps,
		$selectedLabel,
		$$scope,
		slots,
		span_binding
	];
}

class Select_value extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$C, create_fragment$C, safe_not_equal, { placeholder: 1, asChild: 2, el: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_value",
			options,
			id: create_fragment$C.name
		});
	}

	get placeholder() {
		throw new Error("<Select_value>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set placeholder(value) {
		throw new Error("<Select_value>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get asChild() {
		throw new Error("<Select_value>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set asChild(value) {
		throw new Error("<Select_value>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get el() {
		throw new Error("<Select_value>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set el(value) {
		throw new Error("<Select_value>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var SelectPrimitive = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Arrow: Select_arrow,
    Content: Select_content$1,
    Group: Select_group,
    Input: Select_input,
    Item: Select_item$1,
    ItemIndicator: Select_item_indicator,
    Label: Select_label$1,
    Root: Select$1,
    Separator: Separator,
    Trigger: Select_trigger$1,
    Value: Select_value
});

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const CLASS_PART_SEPARATOR$1 = '-';
function createClassUtils$1(config) {
  const classMap = createClassMap$1(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR$1);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive$1(classParts, classMap) || getGroupIdForArbitraryProperty$1(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive$1(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive$1(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR$1);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
}
const arbitraryPropertyRegex$1 = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty$1(className) {
  if (arbitraryPropertyRegex$1.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex$1.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
}
/**
 * Exported for testing only
 */
function createClassMap$1(config) {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries$1(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively$1(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively$1(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart$1(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter$1(classDefinition)) {
        processClassesRecursively$1(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively$1(classGroup, getPart$1(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart$1(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR$1).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter$1(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries$1(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
function createLruCache$1(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  }
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}
const IMPORTANT_MODIFIER$1 = '!';
function createSplitModifiers$1(config) {
  const separator = config.separator;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // splitModifiers inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER$1);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
function sortModifiers$1(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils$1(config) {
  return {
    cache: createLruCache$1(config.cacheSize),
    splitModifiers: createSplitModifiers$1(config),
    ...createClassUtils$1(config)
  };
}
const SPLIT_CLASSES_REGEX$1 = /\s+/;
function mergeClassList$1(classList, configUtils) {
  const {
    splitModifiers,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX$1).map(originalClassName => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = splitModifiers(originalClassName);
    let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers$1(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER$1 : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse()
  // Last class in conflict wins, so we need to filter conflicting classes in reverse order.
  .filter(parsed => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(group => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map(parsed => parsed.originalClassName).join(' ');
}

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin$1() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue$1(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue$1(mix) {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue$1(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge$1(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils$1(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList$1(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin$1.apply(null, arguments));
  };
}
function fromTheme$1(key) {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
const arbitraryValueRegex$1 = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex$1 = /^\d+\/\d+$/;
const stringLengths$1 = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex$1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex$1 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
// Shadow always begins with x and y offset separated by underscore
const shadowRegex$1 = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function isLength$1(value) {
  return isNumber$1(value) || stringLengths$1.has(value) || fractionRegex$1.test(value);
}
function isArbitraryLength$1(value) {
  return getIsArbitraryValue$1(value, 'length', isLengthOnly$1);
}
function isNumber$1(value) {
  return Boolean(value) && !Number.isNaN(Number(value));
}
function isArbitraryNumber$1(value) {
  return getIsArbitraryValue$1(value, 'number', isNumber$1);
}
function isInteger$1(value) {
  return Boolean(value) && Number.isInteger(Number(value));
}
function isPercent$1(value) {
  return value.endsWith('%') && isNumber$1(value.slice(0, -1));
}
function isArbitraryValue$1(value) {
  return arbitraryValueRegex$1.test(value);
}
function isTshirtSize$1(value) {
  return tshirtUnitRegex$1.test(value);
}
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
function isArbitrarySize$1(value) {
  return getIsArbitraryValue$1(value, sizeLabels, isNever$1);
}
function isArbitraryPosition$1(value) {
  return getIsArbitraryValue$1(value, 'position', isNever$1);
}
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
function isArbitraryImage(value) {
  return getIsArbitraryValue$1(value, imageLabels, isImage);
}
function isArbitraryShadow$1(value) {
  return getIsArbitraryValue$1(value, '', isShadow$1);
}
function isAny$1() {
  return true;
}
function getIsArbitraryValue$1(value, label, testValue) {
  const result = arbitraryValueRegex$1.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly$1(value) {
  return lengthUnitRegex$1.test(value);
}
function isNever$1() {
  return false;
}
function isShadow$1(value) {
  return shadowRegex$1.test(value);
}
function isImage(value) {
  return imageRegex.test(value);
}
function getDefaultConfig$1() {
  const colors = fromTheme$1('colors');
  const spacing = fromTheme$1('spacing');
  const blur = fromTheme$1('blur');
  const brightness = fromTheme$1('brightness');
  const borderColor = fromTheme$1('borderColor');
  const borderRadius = fromTheme$1('borderRadius');
  const borderSpacing = fromTheme$1('borderSpacing');
  const borderWidth = fromTheme$1('borderWidth');
  const contrast = fromTheme$1('contrast');
  const grayscale = fromTheme$1('grayscale');
  const hueRotate = fromTheme$1('hueRotate');
  const invert = fromTheme$1('invert');
  const gap = fromTheme$1('gap');
  const gradientColorStops = fromTheme$1('gradientColorStops');
  const gradientColorStopPositions = fromTheme$1('gradientColorStopPositions');
  const inset = fromTheme$1('inset');
  const margin = fromTheme$1('margin');
  const opacity = fromTheme$1('opacity');
  const padding = fromTheme$1('padding');
  const saturate = fromTheme$1('saturate');
  const scale = fromTheme$1('scale');
  const sepia = fromTheme$1('sepia');
  const skew = fromTheme$1('skew');
  const space = fromTheme$1('space');
  const translate = fromTheme$1('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue$1, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue$1, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength$1, isArbitraryLength$1];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber$1, isArbitraryValue$1];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'plus-lighter'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue$1];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumber = () => [isNumber$1, isArbitraryNumber$1];
  const getNumberAndArbitrary = () => [isNumber$1, isArbitraryValue$1];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny$1],
      spacing: [isLength$1, isArbitraryLength$1],
      blur: ['none', '', isTshirtSize$1, isArbitraryValue$1],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize$1, isArbitraryValue$1],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent$1, isArbitraryLength$1],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue$1]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize$1]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue$1]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger$1, isArbitraryValue$1]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue$1]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger$1, isArbitraryValue$1]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny$1]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger$1, isArbitraryValue$1]
        }, isArbitraryValue$1]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny$1]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger$1, isArbitraryValue$1]
        }, isArbitraryValue$1]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue$1]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue$1]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue$1, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue$1, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue$1, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize$1]
        }, isTshirtSize$1]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue$1, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue$1, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue$1, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue$1, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize$1, isArbitraryLength$1]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber$1]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny$1]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue$1]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber$1, isArbitraryNumber$1]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength$1, isArbitraryValue$1]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue$1]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue$1]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength$1, isArbitraryLength$1]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength$1, isArbitraryValue$1]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue$1]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue$1]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition$1]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize$1]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength$1, isArbitraryValue$1]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength$1, isArbitraryLength$1]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength$1, isArbitraryLength$1]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize$1, isArbitraryShadow$1]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny$1]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize$1, isArbitraryValue$1]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue$1]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue$1]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue$1]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger$1, isArbitraryValue$1]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue$1]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue$1]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue$1]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength$1, isArbitraryLength$1, isArbitraryNumber$1]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
}
const twMerge$1 = /*#__PURE__*/createTailwindMerge$1(getDefaultConfig$1);

function cn(...inputs) {
    return twMerge$1(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
    var _a;
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const scaleConversion = (valueA, scaleA, scaleB) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;
        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;
        return valueB;
    };
    const styleToString = (style) => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined)
                return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };
    return {
        duration: (_a = params.duration) !== null && _a !== void 0 ? _a : 200,
        delay: 0,
        css: (t) => {
            var _a, _b, _c;
            const y = scaleConversion(t, [0, 1], [(_a = params.y) !== null && _a !== void 0 ? _a : 5, 0]);
            const x = scaleConversion(t, [0, 1], [(_b = params.x) !== null && _b !== void 0 ? _b : 0, 0]);
            const scale = scaleConversion(t, [0, 1], [(_c = params.start) !== null && _c !== void 0 ? _c : 0.95, 1]);
            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t
            });
        },
        easing: cubicOut
    };
};

/* src/lib/components/ui/dialog/dialog-title.svelte generated by Svelte v4.2.8 */

// (7:0) <DialogPrimitive.Title  class={cn("text-lg font-semibold leading-none tracking-tight", className)}  {...$$restProps} >
function create_default_slot$g(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$g.name,
		type: "slot",
		source: "(7:0) <DialogPrimitive.Title  class={cn(\\\"text-lg font-semibold leading-none tracking-tight\\\", className)}  {...$$restProps} >",
		ctx
	});

	return block;
}

function create_fragment$B(ctx) {
	let dialogprimitive_title;
	let current;

	const dialogprimitive_title_spread_levels = [
		{
			class: cn("text-lg font-semibold leading-none tracking-tight", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let dialogprimitive_title_props = {
		$$slots: { default: [create_default_slot$g] },
		$$scope: { ctx }
	};

	for (let i = 0; i < dialogprimitive_title_spread_levels.length; i += 1) {
		dialogprimitive_title_props = assign(dialogprimitive_title_props, dialogprimitive_title_spread_levels[i]);
	}

	dialogprimitive_title = new Dialog_title$1({
			props: dialogprimitive_title_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialogprimitive_title.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(dialogprimitive_title, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const dialogprimitive_title_changes = (dirty & /*className, $$restProps*/ 3)
			? get_spread_update(dialogprimitive_title_spread_levels, [
					dirty & /*className*/ 1 && {
						class: cn("text-lg font-semibold leading-none tracking-tight", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1])
				])
			: {};

			if (dirty & /*$$scope*/ 8) {
				dialogprimitive_title_changes.$$scope = { dirty, ctx };
			}

			dialogprimitive_title.$set(dialogprimitive_title_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialogprimitive_title.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialogprimitive_title.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialogprimitive_title, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$B.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$B($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_title', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ DialogPrimitive, cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, slots, $$scope];
}

class Dialog_title extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$B, create_fragment$B, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_title",
			options,
			id: create_fragment$B.name
		});
	}

	get class() {
		throw new Error("<Dialog_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Dialog_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/dialog/dialog-portal.svelte generated by Svelte v4.2.8 */

// (4:0) <DialogPrimitive.Portal {...$$restProps}>
function create_default_slot$f(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$f.name,
		type: "slot",
		source: "(4:0) <DialogPrimitive.Portal {...$$restProps}>",
		ctx
	});

	return block;
}

function create_fragment$A(ctx) {
	let dialogprimitive_portal;
	let current;
	const dialogprimitive_portal_spread_levels = [/*$$restProps*/ ctx[0]];

	let dialogprimitive_portal_props = {
		$$slots: { default: [create_default_slot$f] },
		$$scope: { ctx }
	};

	for (let i = 0; i < dialogprimitive_portal_spread_levels.length; i += 1) {
		dialogprimitive_portal_props = assign(dialogprimitive_portal_props, dialogprimitive_portal_spread_levels[i]);
	}

	dialogprimitive_portal = new Dialog_portal$1({
			props: dialogprimitive_portal_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialogprimitive_portal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(dialogprimitive_portal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const dialogprimitive_portal_changes = (dirty & /*$$restProps*/ 1)
			? get_spread_update(dialogprimitive_portal_spread_levels, [get_spread_object(/*$$restProps*/ ctx[0])])
			: {};

			if (dirty & /*$$scope*/ 4) {
				dialogprimitive_portal_changes.$$scope = { dirty, ctx };
			}

			dialogprimitive_portal.$set(dialogprimitive_portal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialogprimitive_portal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialogprimitive_portal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialogprimitive_portal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$A.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$A($$self, $$props, $$invalidate) {
	const omit_props_names = [];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_portal', slots, ['default']);

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ DialogPrimitive });
	return [$$restProps, slots, $$scope];
}

class Dialog_portal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$A, create_fragment$A, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_portal",
			options,
			id: create_fragment$A.name
		});
	}
}

/* src/lib/components/ui/dialog/dialog-footer.svelte generated by Svelte v4.2.8 */
const file$p = "src/lib/components/ui/dialog/dialog-footer.svelte";

function create_fragment$z(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let div_levels = [
		{
			class: div_class_value = cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$p, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", /*className*/ ctx[0]))) && { class: div_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$z.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$z($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_footer', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Dialog_footer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$z, create_fragment$z, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_footer",
			options,
			id: create_fragment$z.name
		});
	}

	get class() {
		throw new Error("<Dialog_footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Dialog_footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/dialog/dialog-header.svelte generated by Svelte v4.2.8 */
const file$o = "src/lib/components/ui/dialog/dialog-header.svelte";

function create_fragment$y(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let div_levels = [
		{
			class: div_class_value = cn("flex flex-col space-y-1.5 text-center sm:text-left", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$o, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = cn("flex flex-col space-y-1.5 text-center sm:text-left", /*className*/ ctx[0]))) && { class: div_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$y.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$y($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_header', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Dialog_header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$y, create_fragment$y, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_header",
			options,
			id: create_fragment$y.name
		});
	}

	get class() {
		throw new Error("<Dialog_header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Dialog_header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/dialog/dialog-overlay.svelte generated by Svelte v4.2.8 */

function create_fragment$x(ctx) {
	let dialogprimitive_overlay;
	let current;

	const dialogprimitive_overlay_spread_levels = [
		{ transition: /*transition*/ ctx[1] },
		{
			transitionConfig: /*transitionConfig*/ ctx[2]
		},
		{
			class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[3]
	];

	let dialogprimitive_overlay_props = {};

	for (let i = 0; i < dialogprimitive_overlay_spread_levels.length; i += 1) {
		dialogprimitive_overlay_props = assign(dialogprimitive_overlay_props, dialogprimitive_overlay_spread_levels[i]);
	}

	dialogprimitive_overlay = new Dialog_overlay$1({
			props: dialogprimitive_overlay_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialogprimitive_overlay.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(dialogprimitive_overlay, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const dialogprimitive_overlay_changes = (dirty & /*transition, transitionConfig, className, $$restProps*/ 15)
			? get_spread_update(dialogprimitive_overlay_spread_levels, [
					dirty & /*transition*/ 2 && { transition: /*transition*/ ctx[1] },
					dirty & /*transitionConfig*/ 4 && {
						transitionConfig: /*transitionConfig*/ ctx[2]
					},
					dirty & /*className*/ 1 && {
						class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 8 && get_spread_object(/*$$restProps*/ ctx[3])
				])
			: {};

			dialogprimitive_overlay.$set(dialogprimitive_overlay_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialogprimitive_overlay.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialogprimitive_overlay.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialogprimitive_overlay, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$x.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$x($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","transition","transitionConfig"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_overlay', slots, []);
	let { class: className = undefined } = $$props;
	let { transition = fade } = $$props;
	let { transitionConfig = { duration: 150 } } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('transition' in $$new_props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$new_props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
	};

	$$self.$capture_state = () => ({
		DialogPrimitive,
		cn,
		fade,
		className,
		transition,
		transitionConfig
	});

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
		if ('transition' in $$props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, transition, transitionConfig, $$restProps];
}

class Dialog_overlay extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$x, create_fragment$x, safe_not_equal, {
			class: 0,
			transition: 1,
			transitionConfig: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_overlay",
			options,
			id: create_fragment$x.name
		});
	}

	get class() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transition() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transition(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transitionConfig() {
		throw new Error("<Dialog_overlay>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transitionConfig(value) {
		throw new Error("<Dialog_overlay>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/**
 * @license lucide-svelte v0.305.0 - ISC

This source code is licensed under the ISC license.
See the LICENSE file in the root directory of this source tree.
 */

const defaultAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
};
var defaultAttributes$1 = defaultAttributes;

/* node_modules/lucide-svelte/dist/Icon.svelte generated by Svelte v4.2.8 */
const file$n = "node_modules/lucide-svelte/dist/Icon.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i][0];
	child_ctx[11] = list[i][1];
	return child_ctx;
}

// (31:4) <svelte:element this={tag} {...attrs}/>
function create_dynamic_element$1(ctx) {
	let svelte_element;
	let svelte_element_levels = [/*attrs*/ ctx[11]];
	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	const block = {
		c: function create() {
			svelte_element = svg_element(/*tag*/ ctx[10]);
			set_svg_attributes(svelte_element, svelte_element_data);
			add_location(svelte_element, file$n, 30, 4, 724);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_element, anchor);
		},
		p: function update(ctx, dirty) {
			set_svg_attributes(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [dirty & /*iconNode*/ 32 && /*attrs*/ ctx[11]]));
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_dynamic_element$1.name,
		type: "child_dynamic_element",
		source: "(31:4) <svelte:element this={tag} {...attrs}/>",
		ctx
	});

	return block;
}

// (30:2) {#each iconNode as [tag, attrs]}
function create_each_block$1(ctx) {
	let previous_tag = /*tag*/ ctx[10];
	let svelte_element_anchor;
	validate_dynamic_element(/*tag*/ ctx[10]);
	let svelte_element = /*tag*/ ctx[10] && create_dynamic_element$1(ctx);

	const block = {
		c: function create() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert_dev(target, svelte_element_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*tag*/ ctx[10]) {
				if (!previous_tag) {
					svelte_element = create_dynamic_element$1(ctx);
					previous_tag = /*tag*/ ctx[10];
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*tag*/ ctx[10])) {
					svelte_element.d(1);
					validate_dynamic_element(/*tag*/ ctx[10]);
					svelte_element = create_dynamic_element$1(ctx);
					previous_tag = /*tag*/ ctx[10];
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
				previous_tag = /*tag*/ ctx[10];
			}
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element_anchor);
			}

			if (svelte_element) svelte_element.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(30:2) {#each iconNode as [tag, attrs]}",
		ctx
	});

	return block;
}

function create_fragment$w(ctx) {
	let svg;
	let each_1_anchor;
	let svg_stroke_width_value;
	let svg_class_value;
	let current;
	let each_value = ensure_array_like_dev(/*iconNode*/ ctx[5]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const default_slot_template = /*#slots*/ ctx[9].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

	let svg_levels = [
		defaultAttributes$1,
		/*$$restProps*/ ctx[6],
		{ width: /*size*/ ctx[2] },
		{ height: /*size*/ ctx[2] },
		{ stroke: /*color*/ ctx[1] },
		{
			"stroke-width": svg_stroke_width_value = /*absoluteStrokeWidth*/ ctx[4]
			? Number(/*strokeWidth*/ ctx[3]) * 24 / Number(/*size*/ ctx[2])
			: /*strokeWidth*/ ctx[3]
		},
		{
			class: svg_class_value = `lucide-icon lucide lucide-${/*name*/ ctx[0]} ${/*$$props*/ ctx[7].class ?? ''}`
		}
	];

	let svg_data = {};

	for (let i = 0; i < svg_levels.length; i += 1) {
		svg_data = assign(svg_data, svg_levels[i]);
	}

	const block = {
		c: function create() {
			svg = svg_element("svg");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			if (default_slot) default_slot.c();
			set_svg_attributes(svg, svg_data);
			add_location(svg, file$n, 16, 0, 404);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}

			append_dev(svg, each_1_anchor);

			if (default_slot) {
				default_slot.m(svg, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*iconNode*/ 32) {
				each_value = ensure_array_like_dev(/*iconNode*/ ctx[5]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
						null
					);
				}
			}

			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
				defaultAttributes$1,
				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6],
				(!current || dirty & /*size*/ 4) && { width: /*size*/ ctx[2] },
				(!current || dirty & /*size*/ 4) && { height: /*size*/ ctx[2] },
				(!current || dirty & /*color*/ 2) && { stroke: /*color*/ ctx[1] },
				(!current || dirty & /*absoluteStrokeWidth, strokeWidth, size*/ 28 && svg_stroke_width_value !== (svg_stroke_width_value = /*absoluteStrokeWidth*/ ctx[4]
				? Number(/*strokeWidth*/ ctx[3]) * 24 / Number(/*size*/ ctx[2])
				: /*strokeWidth*/ ctx[3])) && { "stroke-width": svg_stroke_width_value },
				(!current || dirty & /*name, $$props*/ 129 && svg_class_value !== (svg_class_value = `lucide-icon lucide lucide-${/*name*/ ctx[0]} ${/*$$props*/ ctx[7].class ?? ''}`)) && { class: svg_class_value }
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svg);
			}

			destroy_each(each_blocks, detaching);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$w.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$w($$self, $$props, $$invalidate) {
	const omit_props_names = ["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Icon', slots, ['default']);
	let { name } = $$props;
	let { color = 'currentColor' } = $$props;
	let { size = 24 } = $$props;
	let { strokeWidth = 2 } = $$props;
	let { absoluteStrokeWidth = false } = $$props;
	let { iconNode } = $$props;

	$$self.$$.on_mount.push(function () {
		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
			console.warn("<Icon> was created without expected prop 'name'");
		}

		if (iconNode === undefined && !('iconNode' in $$props || $$self.$$.bound[$$self.$$.props['iconNode']])) {
			console.warn("<Icon> was created without expected prop 'iconNode'");
		}
	});

	$$self.$$set = $$new_props => {
		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('name' in $$new_props) $$invalidate(0, name = $$new_props.name);
		if ('color' in $$new_props) $$invalidate(1, color = $$new_props.color);
		if ('size' in $$new_props) $$invalidate(2, size = $$new_props.size);
		if ('strokeWidth' in $$new_props) $$invalidate(3, strokeWidth = $$new_props.strokeWidth);
		if ('absoluteStrokeWidth' in $$new_props) $$invalidate(4, absoluteStrokeWidth = $$new_props.absoluteStrokeWidth);
		if ('iconNode' in $$new_props) $$invalidate(5, iconNode = $$new_props.iconNode);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		defaultAttributes: defaultAttributes$1,
		name,
		color,
		size,
		strokeWidth,
		absoluteStrokeWidth,
		iconNode
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
		if ('name' in $$props) $$invalidate(0, name = $$new_props.name);
		if ('color' in $$props) $$invalidate(1, color = $$new_props.color);
		if ('size' in $$props) $$invalidate(2, size = $$new_props.size);
		if ('strokeWidth' in $$props) $$invalidate(3, strokeWidth = $$new_props.strokeWidth);
		if ('absoluteStrokeWidth' in $$props) $$invalidate(4, absoluteStrokeWidth = $$new_props.absoluteStrokeWidth);
		if ('iconNode' in $$props) $$invalidate(5, iconNode = $$new_props.iconNode);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = exclude_internal_props($$props);

	return [
		name,
		color,
		size,
		strokeWidth,
		absoluteStrokeWidth,
		iconNode,
		$$restProps,
		$$props,
		$$scope,
		slots
	];
}

class Icon extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$w, create_fragment$w, safe_not_equal, {
			name: 0,
			color: 1,
			size: 2,
			strokeWidth: 3,
			absoluteStrokeWidth: 4,
			iconNode: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment$w.name
		});
	}

	get name() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get strokeWidth() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set strokeWidth(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get absoluteStrokeWidth() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set absoluteStrokeWidth(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconNode() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconNode(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Icon$1 = Icon;

/* node_modules/lucide-svelte/dist/icons/check.svelte generated by Svelte v4.2.8 */

// (12:0) <Icon name="check" {...$$props} iconNode={iconNode}>
function create_default_slot$e(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$e.name,
		type: "slot",
		source: "(12:0) <Icon name=\\\"check\\\" {...$$props} iconNode={iconNode}>",
		ctx
	});

	return block;
}

function create_fragment$v(ctx) {
	let icon;
	let current;
	const icon_spread_levels = [{ name: "check" }, /*$$props*/ ctx[1], { iconNode: /*iconNode*/ ctx[0] }];

	let icon_props = {
		$$slots: { default: [create_default_slot$e] },
		$$scope: { ctx }
	};

	for (let i = 0; i < icon_spread_levels.length; i += 1) {
		icon_props = assign(icon_props, icon_spread_levels[i]);
	}

	icon = new Icon$1({ props: icon_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const icon_changes = (dirty & /*$$props, iconNode*/ 3)
			? get_spread_update(icon_spread_levels, [
					icon_spread_levels[0],
					dirty & /*$$props*/ 2 && get_spread_object(/*$$props*/ ctx[1]),
					dirty & /*iconNode*/ 1 && { iconNode: /*iconNode*/ ctx[0] }
				])
			: {};

			if (dirty & /*$$scope*/ 8) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$v.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$v($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Check', slots, ['default']);
	const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];

	$$self.$$set = $$new_props => {
		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ Icon: Icon$1, iconNode });

	$$self.$inject_state = $$new_props => {
		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = exclude_internal_props($$props);
	return [iconNode, $$props, slots, $$scope];
}

class Check extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$v, create_fragment$v, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Check",
			options,
			id: create_fragment$v.name
		});
	}
}

var Check$1 = Check;

/* node_modules/lucide-svelte/dist/icons/chevron-down.svelte generated by Svelte v4.2.8 */

// (12:0) <Icon name="chevron-down" {...$$props} iconNode={iconNode}>
function create_default_slot$d(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$d.name,
		type: "slot",
		source: "(12:0) <Icon name=\\\"chevron-down\\\" {...$$props} iconNode={iconNode}>",
		ctx
	});

	return block;
}

function create_fragment$u(ctx) {
	let icon;
	let current;

	const icon_spread_levels = [
		{ name: "chevron-down" },
		/*$$props*/ ctx[1],
		{ iconNode: /*iconNode*/ ctx[0] }
	];

	let icon_props = {
		$$slots: { default: [create_default_slot$d] },
		$$scope: { ctx }
	};

	for (let i = 0; i < icon_spread_levels.length; i += 1) {
		icon_props = assign(icon_props, icon_spread_levels[i]);
	}

	icon = new Icon$1({ props: icon_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const icon_changes = (dirty & /*$$props, iconNode*/ 3)
			? get_spread_update(icon_spread_levels, [
					icon_spread_levels[0],
					dirty & /*$$props*/ 2 && get_spread_object(/*$$props*/ ctx[1]),
					dirty & /*iconNode*/ 1 && { iconNode: /*iconNode*/ ctx[0] }
				])
			: {};

			if (dirty & /*$$scope*/ 8) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$u.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$u($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Chevron_down', slots, ['default']);
	const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];

	$$self.$$set = $$new_props => {
		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ Icon: Icon$1, iconNode });

	$$self.$inject_state = $$new_props => {
		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = exclude_internal_props($$props);
	return [iconNode, $$props, slots, $$scope];
}

class Chevron_down extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$u, create_fragment$u, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Chevron_down",
			options,
			id: create_fragment$u.name
		});
	}
}

var ChevronDown = Chevron_down;

/* node_modules/lucide-svelte/dist/icons/x.svelte generated by Svelte v4.2.8 */

// (12:0) <Icon name="x" {...$$props} iconNode={iconNode}>
function create_default_slot$c(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$c.name,
		type: "slot",
		source: "(12:0) <Icon name=\\\"x\\\" {...$$props} iconNode={iconNode}>",
		ctx
	});

	return block;
}

function create_fragment$t(ctx) {
	let icon;
	let current;
	const icon_spread_levels = [{ name: "x" }, /*$$props*/ ctx[1], { iconNode: /*iconNode*/ ctx[0] }];

	let icon_props = {
		$$slots: { default: [create_default_slot$c] },
		$$scope: { ctx }
	};

	for (let i = 0; i < icon_spread_levels.length; i += 1) {
		icon_props = assign(icon_props, icon_spread_levels[i]);
	}

	icon = new Icon$1({ props: icon_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const icon_changes = (dirty & /*$$props, iconNode*/ 3)
			? get_spread_update(icon_spread_levels, [
					icon_spread_levels[0],
					dirty & /*$$props*/ 2 && get_spread_object(/*$$props*/ ctx[1]),
					dirty & /*iconNode*/ 1 && { iconNode: /*iconNode*/ ctx[0] }
				])
			: {};

			if (dirty & /*$$scope*/ 8) {
				icon_changes.$$scope = { dirty, ctx };
			}

			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$t.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$t($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('X', slots, ['default']);
	const iconNode = [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]];

	$$self.$$set = $$new_props => {
		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ Icon: Icon$1, iconNode });

	$$self.$inject_state = $$new_props => {
		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$props = exclude_internal_props($$props);
	return [iconNode, $$props, slots, $$scope];
}

class X extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$t, create_fragment$t, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "X",
			options,
			id: create_fragment$t.name
		});
	}
}

var X$1 = X;

/* src/lib/components/ui/dialog/dialog-content.svelte generated by Svelte v4.2.8 */
const file$m = "src/lib/components/ui/dialog/dialog-content.svelte";

// (25:2) <DialogPrimitive.Close    class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"   >
function create_default_slot_2$4(ctx) {
	let x;
	let t0;
	let span;
	let current;

	x = new X$1({
			props: { class: "h-4 w-4" },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(x.$$.fragment);
			t0 = space();
			span = element("span");
			span.textContent = "Close";
			attr_dev(span, "class", "sr-only");
			add_location(span, file$m, 32, 3, 1002);
		},
		m: function mount(target, anchor) {
			mount_component(x, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, span, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(x.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(x.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t0);
				detach_dev(span);
			}

			destroy_component(x, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2$4.name,
		type: "slot",
		source: "(25:2) <DialogPrimitive.Close    class=\\\"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground\\\"   >",
		ctx
	});

	return block;
}

// (15:1) <DialogPrimitive.Content   {transition}   {transitionConfig}   class={cn(    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",    className   )}   {...$$restProps}  >
function create_default_slot_1$5(ctx) {
	let t;
	let dialogprimitive_close;
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	dialogprimitive_close = new Dialog_close({
			props: {
				class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
				$$slots: { default: [create_default_slot_2$4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
			t = space();
			create_component(dialogprimitive_close.$$.fragment);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			insert_dev(target, t, anchor);
			mount_component(dialogprimitive_close, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}

			const dialogprimitive_close_changes = {};

			if (dirty & /*$$scope*/ 32) {
				dialogprimitive_close_changes.$$scope = { dirty, ctx };
			}

			dialogprimitive_close.$set(dialogprimitive_close_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(dialogprimitive_close.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			transition_out(dialogprimitive_close.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}

			if (default_slot) default_slot.d(detaching);
			destroy_component(dialogprimitive_close, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$5.name,
		type: "slot",
		source: "(15:1) <DialogPrimitive.Content   {transition}   {transitionConfig}   class={cn(    \\\"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full\\\",    className   )}   {...$$restProps}  >",
		ctx
	});

	return block;
}

// (13:0) <Dialog.Portal>
function create_default_slot$b(ctx) {
	let dialog_overlay;
	let t;
	let dialogprimitive_content;
	let current;
	dialog_overlay = new Dialog_overlay({ $$inline: true });

	const dialogprimitive_content_spread_levels = [
		{ transition: /*transition*/ ctx[1] },
		{
			transitionConfig: /*transitionConfig*/ ctx[2]
		},
		{
			class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[3]
	];

	let dialogprimitive_content_props = {
		$$slots: { default: [create_default_slot_1$5] },
		$$scope: { ctx }
	};

	for (let i = 0; i < dialogprimitive_content_spread_levels.length; i += 1) {
		dialogprimitive_content_props = assign(dialogprimitive_content_props, dialogprimitive_content_spread_levels[i]);
	}

	dialogprimitive_content = new Dialog_content$1({
			props: dialogprimitive_content_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialog_overlay.$$.fragment);
			t = space();
			create_component(dialogprimitive_content.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(dialog_overlay, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(dialogprimitive_content, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const dialogprimitive_content_changes = (dirty & /*transition, transitionConfig, className, $$restProps*/ 15)
			? get_spread_update(dialogprimitive_content_spread_levels, [
					dirty & /*transition*/ 2 && { transition: /*transition*/ ctx[1] },
					dirty & /*transitionConfig*/ 4 && {
						transitionConfig: /*transitionConfig*/ ctx[2]
					},
					dirty & /*className*/ 1 && {
						class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 8 && get_spread_object(/*$$restProps*/ ctx[3])
				])
			: {};

			if (dirty & /*$$scope*/ 32) {
				dialogprimitive_content_changes.$$scope = { dirty, ctx };
			}

			dialogprimitive_content.$set(dialogprimitive_content_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialog_overlay.$$.fragment, local);
			transition_in(dialogprimitive_content.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialog_overlay.$$.fragment, local);
			transition_out(dialogprimitive_content.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}

			destroy_component(dialog_overlay, detaching);
			destroy_component(dialogprimitive_content, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$b.name,
		type: "slot",
		source: "(13:0) <Dialog.Portal>",
		ctx
	});

	return block;
}

function create_fragment$s(ctx) {
	let dialog_portal;
	let current;

	dialog_portal = new Dialog_portal({
			props: {
				$$slots: { default: [create_default_slot$b] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialog_portal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(dialog_portal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const dialog_portal_changes = {};

			if (dirty & /*$$scope, transition, transitionConfig, className, $$restProps*/ 47) {
				dialog_portal_changes.$$scope = { dirty, ctx };
			}

			dialog_portal.$set(dialog_portal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialog_portal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialog_portal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialog_portal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$s.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$s($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","transition","transitionConfig"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_content', slots, ['default']);
	let { class: className = undefined } = $$props;
	let { transition = flyAndScale } = $$props;
	let { transitionConfig = { duration: 200 } } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('transition' in $$new_props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$new_props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		DialogPrimitive,
		Dialog,
		cn,
		flyAndScale,
		X: X$1,
		className,
		transition,
		transitionConfig
	});

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
		if ('transition' in $$props) $$invalidate(1, transition = $$new_props.transition);
		if ('transitionConfig' in $$props) $$invalidate(2, transitionConfig = $$new_props.transitionConfig);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, transition, transitionConfig, $$restProps, slots, $$scope];
}

class Dialog_content extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$s, create_fragment$s, safe_not_equal, {
			class: 0,
			transition: 1,
			transitionConfig: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_content",
			options,
			id: create_fragment$s.name
		});
	}

	get class() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transition() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transition(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get transitionConfig() {
		throw new Error("<Dialog_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set transitionConfig(value) {
		throw new Error("<Dialog_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/dialog/dialog-description.svelte generated by Svelte v4.2.8 */

// (7:0) <DialogPrimitive.Description  class={cn("text-sm text-muted-foreground", className)}  {...$$restProps} >
function create_default_slot$a(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$a.name,
		type: "slot",
		source: "(7:0) <DialogPrimitive.Description  class={cn(\\\"text-sm text-muted-foreground\\\", className)}  {...$$restProps} >",
		ctx
	});

	return block;
}

function create_fragment$r(ctx) {
	let dialogprimitive_description;
	let current;

	const dialogprimitive_description_spread_levels = [
		{
			class: cn("text-sm text-muted-foreground", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let dialogprimitive_description_props = {
		$$slots: { default: [create_default_slot$a] },
		$$scope: { ctx }
	};

	for (let i = 0; i < dialogprimitive_description_spread_levels.length; i += 1) {
		dialogprimitive_description_props = assign(dialogprimitive_description_props, dialogprimitive_description_spread_levels[i]);
	}

	dialogprimitive_description = new Dialog_description$1({
			props: dialogprimitive_description_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialogprimitive_description.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(dialogprimitive_description, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const dialogprimitive_description_changes = (dirty & /*className, $$restProps*/ 3)
			? get_spread_update(dialogprimitive_description_spread_levels, [
					dirty & /*className*/ 1 && {
						class: cn("text-sm text-muted-foreground", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1])
				])
			: {};

			if (dirty & /*$$scope*/ 8) {
				dialogprimitive_description_changes.$$scope = { dirty, ctx };
			}

			dialogprimitive_description.$set(dialogprimitive_description_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialogprimitive_description.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialogprimitive_description.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialogprimitive_description, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$r.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$r($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dialog_description', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ DialogPrimitive, cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, slots, $$scope];
}

class Dialog_description extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$r, create_fragment$r, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dialog_description",
			options,
			id: create_fragment$r.name
		});
	}

	get class() {
		throw new Error("<Dialog_description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Dialog_description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const Root$1 = Dialog$1;
const Trigger = Dialog_trigger;

/* src/views/component/modal.svelte generated by Svelte v4.2.8 */
const get_footer_slot_changes = dirty => ({});
const get_footer_slot_context = ctx => ({});
const get_body_slot_changes = dirty => ({});
const get_body_slot_context = ctx => ({});
const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

// (10:12) <Dialog.Title>
function create_default_slot_3$3(ctx) {
	let current;
	const header_slot_template = /*#slots*/ ctx[2].header;
	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[5], get_header_slot_context);

	const block = {
		c: function create() {
			if (header_slot) header_slot.c();
		},
		m: function mount(target, anchor) {
			if (header_slot) {
				header_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (header_slot) {
				if (header_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						header_slot,
						header_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[5], dirty, get_header_slot_changes),
						get_header_slot_context
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (header_slot) header_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3$3.name,
		type: "slot",
		source: "(10:12) <Dialog.Title>",
		ctx
	});

	return block;
}

// (9:8) <Dialog.Header>
function create_default_slot_2$3(ctx) {
	let dialog_title;
	let current;

	dialog_title = new Dialog_title({
			props: {
				$$slots: { default: [create_default_slot_3$3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialog_title.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(dialog_title, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const dialog_title_changes = {};

			if (dirty & /*$$scope*/ 32) {
				dialog_title_changes.$$scope = { dirty, ctx };
			}

			dialog_title.$set(dialog_title_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialog_title.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialog_title.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialog_title, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2$3.name,
		type: "slot",
		source: "(9:8) <Dialog.Header>",
		ctx
	});

	return block;
}

// (8:4) <Dialog.Content>
function create_default_slot_1$4(ctx) {
	let dialog_header;
	let t0;
	let t1;
	let current;

	dialog_header = new Dialog_header({
			props: {
				$$slots: { default: [create_default_slot_2$3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const body_slot_template = /*#slots*/ ctx[2].body;
	const body_slot = create_slot(body_slot_template, ctx, /*$$scope*/ ctx[5], get_body_slot_context);
	const footer_slot_template = /*#slots*/ ctx[2].footer;
	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[5], get_footer_slot_context);

	const block = {
		c: function create() {
			create_component(dialog_header.$$.fragment);
			t0 = space();
			if (body_slot) body_slot.c();
			t1 = space();
			if (footer_slot) footer_slot.c();
		},
		m: function mount(target, anchor) {
			mount_component(dialog_header, target, anchor);
			insert_dev(target, t0, anchor);

			if (body_slot) {
				body_slot.m(target, anchor);
			}

			insert_dev(target, t1, anchor);

			if (footer_slot) {
				footer_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const dialog_header_changes = {};

			if (dirty & /*$$scope*/ 32) {
				dialog_header_changes.$$scope = { dirty, ctx };
			}

			dialog_header.$set(dialog_header_changes);

			if (body_slot) {
				if (body_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						body_slot,
						body_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(body_slot_template, /*$$scope*/ ctx[5], dirty, get_body_slot_changes),
						get_body_slot_context
					);
				}
			}

			if (footer_slot) {
				if (footer_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						footer_slot,
						footer_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(footer_slot_template, /*$$scope*/ ctx[5], dirty, get_footer_slot_changes),
						get_footer_slot_context
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialog_header.$$.fragment, local);
			transition_in(body_slot, local);
			transition_in(footer_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialog_header.$$.fragment, local);
			transition_out(body_slot, local);
			transition_out(footer_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t0);
				detach_dev(t1);
			}

			destroy_component(dialog_header, detaching);
			if (body_slot) body_slot.d(detaching);
			if (footer_slot) footer_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$4.name,
		type: "slot",
		source: "(8:4) <Dialog.Content>",
		ctx
	});

	return block;
}

// (6:0) <Dialog.Root bind:open={open} onOpenChange={() => onClose()}>
function create_default_slot$9(ctx) {
	let dialog_content;
	let current;

	dialog_content = new Dialog_content({
			props: {
				$$slots: { default: [create_default_slot_1$4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(dialog_content.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(dialog_content, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const dialog_content_changes = {};

			if (dirty & /*$$scope*/ 32) {
				dialog_content_changes.$$scope = { dirty, ctx };
			}

			dialog_content.$set(dialog_content_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialog_content.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialog_content.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialog_content, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$9.name,
		type: "slot",
		source: "(6:0) <Dialog.Root bind:open={open} onOpenChange={() => onClose()}>",
		ctx
	});

	return block;
}

function create_fragment$q(ctx) {
	let dialog_root;
	let updating_open;
	let current;

	function dialog_root_open_binding(value) {
		/*dialog_root_open_binding*/ ctx[4](value);
	}

	let dialog_root_props = {
		onOpenChange: /*func*/ ctx[3],
		$$slots: { default: [create_default_slot$9] },
		$$scope: { ctx }
	};

	if (/*open*/ ctx[0] !== void 0) {
		dialog_root_props.open = /*open*/ ctx[0];
	}

	dialog_root = new Root$1({ props: dialog_root_props, $$inline: true });
	binding_callbacks.push(() => bind(dialog_root, 'open', dialog_root_open_binding));

	const block = {
		c: function create() {
			create_component(dialog_root.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(dialog_root, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const dialog_root_changes = {};
			if (dirty & /*onClose*/ 2) dialog_root_changes.onOpenChange = /*func*/ ctx[3];

			if (dirty & /*$$scope*/ 32) {
				dialog_root_changes.$$scope = { dirty, ctx };
			}

			if (!updating_open && dirty & /*open*/ 1) {
				updating_open = true;
				dialog_root_changes.open = /*open*/ ctx[0];
				add_flush_callback(() => updating_open = false);
			}

			dialog_root.$set(dialog_root_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(dialog_root.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(dialog_root.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(dialog_root, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$q.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$q($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Modal', slots, ['header','body','footer']);
	let { open = false } = $$props;
	let { onClose } = $$props;

	$$self.$$.on_mount.push(function () {
		if (onClose === undefined && !('onClose' in $$props || $$self.$$.bound[$$self.$$.props['onClose']])) {
			console.warn("<Modal> was created without expected prop 'onClose'");
		}
	});

	const writable_props = ['open', 'onClose'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
	});

	const func = () => onClose();

	function dialog_root_open_binding(value) {
		open = value;
		$$invalidate(0, open);
	}

	$$self.$$set = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ Dialog, open, onClose });

	$$self.$inject_state = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [open, onClose, slots, func, dialog_root_open_binding, $$scope];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$q, create_fragment$q, safe_not_equal, { open: 0, onClose: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$q.name
		});
	}

	get open() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set open(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onClose() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onClose(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/button/button.svelte generated by Svelte v4.2.8 */

// (11:0) <ButtonPrimitive.Root  {builders}  class={cn(buttonVariants({ variant, size, className }))}  type="button"  {...$$restProps}  on:click  on:keydown >
function create_default_slot$8(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[8],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$8.name,
		type: "slot",
		source: "(11:0) <ButtonPrimitive.Root  {builders}  class={cn(buttonVariants({ variant, size, className }))}  type=\\\"button\\\"  {...$$restProps}  on:click  on:keydown >",
		ctx
	});

	return block;
}

function create_fragment$p(ctx) {
	let buttonprimitive_root;
	let current;

	const buttonprimitive_root_spread_levels = [
		{ builders: /*builders*/ ctx[3] },
		{
			class: cn(buttonVariants({
				variant: /*variant*/ ctx[1],
				size: /*size*/ ctx[2],
				className: /*className*/ ctx[0]
			}))
		},
		{ type: "button" },
		/*$$restProps*/ ctx[4]
	];

	let buttonprimitive_root_props = {
		$$slots: { default: [create_default_slot$8] },
		$$scope: { ctx }
	};

	for (let i = 0; i < buttonprimitive_root_spread_levels.length; i += 1) {
		buttonprimitive_root_props = assign(buttonprimitive_root_props, buttonprimitive_root_spread_levels[i]);
	}

	buttonprimitive_root = new Button$1({
			props: buttonprimitive_root_props,
			$$inline: true
		});

	buttonprimitive_root.$on("click", /*click_handler*/ ctx[6]);
	buttonprimitive_root.$on("keydown", /*keydown_handler*/ ctx[7]);

	const block = {
		c: function create() {
			create_component(buttonprimitive_root.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(buttonprimitive_root, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const buttonprimitive_root_changes = (dirty & /*builders, variant, size, className, $$restProps*/ 31)
			? get_spread_update(buttonprimitive_root_spread_levels, [
					dirty & /*builders*/ 8 && { builders: /*builders*/ ctx[3] },
					dirty & /*variant, size, className*/ 7 && {
						class: cn(buttonVariants({
							variant: /*variant*/ ctx[1],
							size: /*size*/ ctx[2],
							className: /*className*/ ctx[0]
						}))
					},
					buttonprimitive_root_spread_levels[2],
					dirty & /*$$restProps*/ 16 && get_spread_object(/*$$restProps*/ ctx[4])
				])
			: {};

			if (dirty & /*$$scope*/ 256) {
				buttonprimitive_root_changes.$$scope = { dirty, ctx };
			}

			buttonprimitive_root.$set(buttonprimitive_root_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(buttonprimitive_root.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(buttonprimitive_root.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(buttonprimitive_root, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$p.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$p($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","variant","size","builders"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Button', slots, ['default']);
	let { class: className = undefined } = $$props;
	let { variant = "default" } = $$props;
	let { size = "default" } = $$props;
	let { builders = [] } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('variant' in $$new_props) $$invalidate(1, variant = $$new_props.variant);
		if ('size' in $$new_props) $$invalidate(2, size = $$new_props.size);
		if ('builders' in $$new_props) $$invalidate(3, builders = $$new_props.builders);
		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		ButtonPrimitive,
		cn,
		buttonVariants,
		className,
		variant,
		size,
		builders
	});

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
		if ('variant' in $$props) $$invalidate(1, variant = $$new_props.variant);
		if ('size' in $$props) $$invalidate(2, size = $$new_props.size);
		if ('builders' in $$props) $$invalidate(3, builders = $$new_props.builders);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		className,
		variant,
		size,
		builders,
		$$restProps,
		slots,
		click_handler,
		keydown_handler,
		$$scope
	];
}

class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$p, create_fragment$p, safe_not_equal, {
			class: 0,
			variant: 1,
			size: 2,
			builders: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment$p.name
		});
	}

	get class() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get variant() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set variant(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get builders() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set builders(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var l=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,u=e=>!e||typeof e!="object"||Object.keys(e).length===0,x=(e,o)=>JSON.stringify(e)===JSON.stringify(o);function i(e,o){e.forEach(function(r){Array.isArray(r)?i(r,o):o.push(r);});}function y(e){let o=[];return i(e,o),o}var a=(...e)=>y(e).filter(Boolean),p=(e,o)=>{let r={},c=Object.keys(e),f=Object.keys(o);for(let t of c)if(f.includes(t)){let s=e[t],n=o[t];typeof s=="object"&&typeof n=="object"?r[t]=p(s,n):Array.isArray(s)||Array.isArray(n)?r[t]=a(n,s):r[t]=n+" "+s;}else r[t]=e[t];for(let t of f)c.includes(t)||(r[t]=o[t]);return r},g=e=>!e||typeof e!="string"?e:e.replace(/\s+/g," ").trim();

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  var index = 0;
  var argument;
  var resolvedValue;
  var string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === 'string') {
    return mix;
  }
  var resolvedValue;
  var string = '';
  for (var k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}

var CLASS_PART_SEPARATOR = '-';
function createClassUtils(config) {
  var classMap = createClassMap(config);
  var conflictingClassGroups = config.conflictingClassGroups,
    _config$conflictingCl = config.conflictingClassGroupModifiers,
    conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
  function getClassGroupId(className) {
    var classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    var conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [].concat(conflicts, conflictingClassGroupModifiers[classGroupId]);
    }
    return conflicts;
  }
  return {
    getClassGroupId: getClassGroupId,
    getConflictingClassGroupIds: getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  var currentClassPart = classParts[0];
  var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  var classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(function (_ref) {
    var validator = _ref.validator;
    return validator(classRest);
  })?.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    var property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
}
/**
 * Exported for testing only
 */
function createClassMap(config) {
  var theme = config.theme,
    prefix = config.prefix;
  var classMap = {
    nextPart: new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(function (_ref2) {
    var classGroupId = _ref2[0],
      classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(function (classDefinition) {
    if (typeof classDefinition === 'string') {
      var classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId: classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(function (_ref3) {
      var key = _ref3[0],
        classGroup = _ref3[1];
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function (pathPart) {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(function (_ref4) {
    var classGroupId = _ref4[0],
      classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function (classDefinition) {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(function (_ref5) {
          var key = _ref5[0],
            value = _ref5[1];
          return [prefix + key, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: function get() {
        return undefined;
      },
      set: function set() {}
    };
  }
  var cacheSize = 0;
  var cache = new Map();
  var previousCache = new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  }
  return {
    get: function get(key) {
      var value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set: function set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}

var IMPORTANT_MODIFIER = '!';
function createSplitModifiers(config) {
  var separator = config.separator || ':';
  var isSeparatorSingleCharacter = separator.length === 1;
  var firstSeparatorCharacter = separator[0];
  var separatorLength = separator.length;
  // splitModifiers inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  return function splitModifiers(className) {
    var modifiers = [];
    var bracketDepth = 0;
    var modifierStart = 0;
    var postfixModifierPosition;
    for (var index = 0; index < className.length; index++) {
      var currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    var maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers: modifiers,
      hasImportantModifier: hasImportantModifier,
      baseClassName: baseClassName,
      maybePostfixModifierPosition: maybePostfixModifierPosition
    };
  };
}
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function (modifier) {
    var isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
  return sortedModifiers;
}

function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}

var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
  var splitModifiers = configUtils.splitModifiers,
    getClassGroupId = configUtils.getClassGroupId,
    getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  var classGroupsInConflict = new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(function (originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName),
      modifiers = _splitModifiers.modifiers,
      hasImportantModifier = _splitModifiers.hasImportantModifier,
      baseClassName = _splitModifiers.baseClassName,
      maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
    var classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    var hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName: originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName: originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    var variantModifier = sortModifiers(modifiers).join(':');
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId: modifierId,
      classGroupId: classGroupId,
      originalClassName: originalClassName,
      hasPostfixModifier: hasPostfixModifier
    };
  }).reverse()
  // Last class in conflict wins, so we need to filter conflicting classes in reverse order.
  .filter(function (parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId,
      classGroupId = parsed.classGroupId,
      hasPostfixModifier = parsed.hasPostfixModifier;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function (group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function (parsed) {
    return parsed.originalClassName;
  }).join(' ');
}

function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    var firstCreateConfig = createConfig[0],
      restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function (previousConfig, createConfigCurrent) {
      return createConfigCurrent(previousConfig);
    }, firstCreateConfig());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    var cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    var result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}

function fromTheme(key) {
  var themeGetter = function themeGetter(theme) {
    return theme[key] || [];
  };
  themeGetter.isThemeGetter = true;
  return themeGetter;
}

var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
// Shadow always begins with x and y offset separated by underscore
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, 'length', isLengthOnly);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, 'size', isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, 'position', isNever);
}
function isArbitraryUrl(value) {
  return getIsArbitraryValue(value, 'url', isUrl);
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, 'number', isNumber);
}
function isNumber(value) {
  return !Number.isNaN(Number(value));
}
function isPercent(value) {
  return value.endsWith('%') && isNumber(value.slice(0, -1));
}
function isInteger(value) {
  return isIntegerOnly(value) || getIsArbitraryValue(value, 'number', isIntegerOnly);
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isAny() {
  return true;
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, '', isShadow);
}
function getIsArbitraryValue(value, label, testValue) {
  var result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return result[1] === label;
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value);
}
function isNever() {
  return false;
}
function isUrl(value) {
  return value.startsWith('url(');
}
function isIntegerOnly(value) {
  return Number.isInteger(Number(value));
}
function isShadow(value) {
  return shadowRegex.test(value);
}

function getDefaultConfig() {
  var colors = fromTheme('colors');
  var spacing = fromTheme('spacing');
  var blur = fromTheme('blur');
  var brightness = fromTheme('brightness');
  var borderColor = fromTheme('borderColor');
  var borderRadius = fromTheme('borderRadius');
  var borderSpacing = fromTheme('borderSpacing');
  var borderWidth = fromTheme('borderWidth');
  var contrast = fromTheme('contrast');
  var grayscale = fromTheme('grayscale');
  var hueRotate = fromTheme('hueRotate');
  var invert = fromTheme('invert');
  var gap = fromTheme('gap');
  var gradientColorStops = fromTheme('gradientColorStops');
  var gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  var inset = fromTheme('inset');
  var margin = fromTheme('margin');
  var opacity = fromTheme('opacity');
  var padding = fromTheme('padding');
  var saturate = fromTheme('saturate');
  var scale = fromTheme('scale');
  var sepia = fromTheme('sepia');
  var skew = fromTheme('skew');
  var space = fromTheme('space');
  var translate = fromTheme('translate');
  var getOverscroll = function getOverscroll() {
    return ['auto', 'contain', 'none'];
  };
  var getOverflow = function getOverflow() {
    return ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  };
  var getSpacingWithAutoAndArbitrary = function getSpacingWithAutoAndArbitrary() {
    return ['auto', isArbitraryValue, spacing];
  };
  var getSpacingWithArbitrary = function getSpacingWithArbitrary() {
    return [isArbitraryValue, spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty() {
    return ['', isLength];
  };
  var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary() {
    return ['auto', isNumber, isArbitraryValue];
  };
  var getPositions = function getPositions() {
    return ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  };
  var getLineStyles = function getLineStyles() {
    return ['solid', 'dashed', 'dotted', 'double', 'none'];
  };
  var getBlendModes = function getBlendModes() {
    return ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'plus-lighter'];
  };
  var getAlign = function getAlign() {
    return ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  };
  var getZeroAndEmpty = function getZeroAndEmpty() {
    return ['', '0', isArbitraryValue];
  };
  var getBreaks = function getBreaks() {
    return ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  };
  var getNumber = function getNumber() {
    return [isNumber, isArbitraryNumber];
  };
  var getNumberAndArbitrary = function getNumberAndArbitrary() {
    return [isNumber, isArbitraryValue];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmpty(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{
        "float": ['right', 'left', 'none']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal'].concat(getAlign())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal'].concat(getAlign(), ['baseline'])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [].concat(getAlign(), ['baseline'])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': ['min', 'max', 'fit', isArbitraryValue, isLength]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': ['0', 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryValue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': ['min', 'max', 'fit', isArbitraryValue, isLength]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isArbitraryValue, isLength]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [].concat(getLineStyles(), ['wavy'])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isArbitraryValue, isLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{
        "break": ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryUrl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [].concat(getLineStyles(), ['hidden'])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: [''].concat(getLineStyles())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isArbitraryValue, isLength]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmpty()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ['appearance-none'],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'pinch-zoom', 'manipulation', {
          pan: ['x', 'left', 'right', 'y', 'up', 'down']
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only']
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
}

/**
 * @param baseConfig Config where other config will be merged into. This object will be mutated.
 * @param configExtension Partial config to merge into the `baseConfig`.
 */
function mergeConfigs(baseConfig, configExtension) {
  for (var key in configExtension) {
    mergePropertyRecursively(baseConfig, key, configExtension[key]);
  }
  return baseConfig;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
var overrideTypes = /*#__PURE__*/new Set(['string', 'number', 'boolean']);
function mergePropertyRecursively(baseObject, mergeKey, mergeValue) {
  if (!hasOwnProperty.call(baseObject, mergeKey) || overrideTypes.has(typeof mergeValue) || mergeValue === null) {
    baseObject[mergeKey] = mergeValue;
    return;
  }
  if (Array.isArray(mergeValue) && Array.isArray(baseObject[mergeKey])) {
    baseObject[mergeKey] = baseObject[mergeKey].concat(mergeValue);
    return;
  }
  if (typeof mergeValue === 'object' && typeof baseObject[mergeKey] === 'object') {
    if (baseObject[mergeKey] === null) {
      baseObject[mergeKey] = mergeValue;
      return;
    }
    for (var nextKey in mergeValue) {
      mergePropertyRecursively(baseObject[mergeKey], nextKey, mergeValue[nextKey]);
    }
  }
}

function extendTailwindMerge(configExtension) {
  for (var _len = arguments.length, createConfig = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    createConfig[_key - 1] = arguments[_key];
  }
  return typeof configExtension === 'function' ? createTailwindMerge.apply(void 0, [getDefaultConfig, configExtension].concat(createConfig)) : createTailwindMerge.apply(void 0, [function () {
    return mergeConfigs(getDefaultConfig(), configExtension);
  }].concat(createConfig));
}

var twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

var se={twMerge:!0,twMergeConfig:{},responsiveVariants:!1},_=s=>s||void 0,N=(...s)=>_(y(s).filter(Boolean).join(" ")),q=null,M={},F=!1,w=(...s)=>b$1=>b$1.twMerge?((!q||F)&&(F=!1,q=u(M)?twMerge:extendTailwindMerge(M)),_(q(N(s)))):N(s),Z=(s,b)=>{for(let e in b)s.hasOwnProperty(e)?s[e]=N(s[e],b[e]):s[e]=b[e];return s},ie=(s,b$1)=>{let{extend:e=null,slots:j={},variants:U={},compoundVariants:C=[],compoundSlots:V=[],defaultVariants:W={}}=s,m={...se,...b$1},S=e!=null&&e.base?N(e.base,s==null?void 0:s.base):s==null?void 0:s.base,g$1=e!=null&&e.variants&&!u(e.variants)?p(U,e.variants):U,A=e!=null&&e.defaultVariants&&!u(e.defaultVariants)?{...e.defaultVariants,...W}:W;!u(m.twMergeConfig)&&!x(m.twMergeConfig,M)&&(F=!0,M=m.twMergeConfig);let O=u(e==null?void 0:e.slots),$=u(j)?{}:{base:N(s==null?void 0:s.base,O&&(e==null?void 0:e.base)),...j},h$1=O?$:Z({...e==null?void 0:e.slots},u($)?{base:s==null?void 0:s.base}:$),v=l$1=>{if(u(g$1)&&u(j)&&O)return w(S,l$1==null?void 0:l$1.class,l$1==null?void 0:l$1.className)(m);if(C&&!Array.isArray(C))throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof C}`);if(V&&!Array.isArray(V))throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof V}`);let K=(t,n,a=[],i)=>{let r=a;if(typeof n=="string")r=r.concat(g(n).split(" ").map(c=>`${t}:${c}`));else if(Array.isArray(n))r=r.concat(n.reduce((c,f)=>c.concat(`${t}:${f}`),[]));else if(typeof n=="object"&&typeof i=="string"){for(let c in n)if(n.hasOwnProperty(c)&&c===i){let f=n[c];if(f&&typeof f=="string"){let o=g(f);r[i]?r[i]=r[i].concat(o.split(" ").map(u=>`${t}:${u}`)):r[i]=o.split(" ").map(u=>`${t}:${u}`);}else Array.isArray(f)&&f.length>0&&(r[i]=f.reduce((o,u)=>o.concat(`${t}:${u}`),[]));}}return r},z=(t,n=g$1,a$1=null,i=null)=>{var J;let r=n[t];if(!r||u(r))return null;let c=(J=i==null?void 0:i[t])!=null?J:l$1==null?void 0:l$1[t];if(c===null)return null;let f=l(c),o=Array.isArray(m.responsiveVariants)&&m.responsiveVariants.length>0||m.responsiveVariants===!0,u$1=A==null?void 0:A[t],d=[];if(typeof f=="object"&&o)for(let[k,L]of Object.entries(f)){let ae=r[L];if(k==="initial"){u$1=L;continue}Array.isArray(m.responsiveVariants)&&!m.responsiveVariants.includes(k)||(d=K(k,ae,d,a$1));}let T=r[f]||r[l(u$1)];return typeof d=="object"&&typeof a$1=="string"&&d[a$1]?Z(d,T):d.length>0?(d.push(T),d):T},P=()=>g$1?Object.keys(g$1).map(t=>z(t,g$1)):null,p=(t,n)=>{if(!g$1||typeof g$1!="object")return null;let a=new Array;for(let i in g$1){let r=z(i,g$1,t,n),c=t==="base"&&typeof r=="string"?r:r&&r[t];c&&(a[a.length]=c);}return a},D={};for(let t in l$1)l$1[t]!==void 0&&(D[t]=l$1[t]);let G=(t,n)=>{var i;let a=typeof(l$1==null?void 0:l$1[t])=="object"?{[t]:(i=l$1[t])==null?void 0:i.initial}:{};return {...A,...D,...a,...n}},H=(t=[],n)=>{let a=[];for(let{class:i,className:r,...c}of t){let f=!0;for(let[o,u]of Object.entries(c)){let d=G(o,n);if(Array.isArray(u)){if(!u.includes(d[o])){f=!1;break}}else if(d[o]!==u){f=!1;break}}f&&(i&&a.push(i),r&&a.push(r));}return a},I=t=>{let n=H(C,t),a$1=H(e==null?void 0:e.compoundVariants,t);return a(a$1,n)},ee=t=>{let n=I(t);if(!Array.isArray(n))return n;let a={};for(let i of n)if(typeof i=="string"&&(a.base=w(a.base,i)(m)),typeof i=="object")for(let[r,c]of Object.entries(i))a[r]=w(a[r],c)(m);return a},te=t=>{if(V.length<1)return null;let n={};for(let{slots:a=[],class:i,className:r,...c}of V){if(!u(c)){let f=!0;for(let o of Object.keys(c)){let u=G(o,t)[o];if(u===void 0||(Array.isArray(c[o])?!c[o].includes(u):c[o]!==u)){f=!1;break}}if(!f)continue}for(let f of a)n[f]=n[f]||[],n[f].push([i,r]);}return n};if(!u(j)||!O){let t={};if(typeof h$1=="object"&&!u(h$1))for(let n of Object.keys(h$1))t[n]=a=>{var i,r;return w(h$1[n],p(n,a),((i=ee(a))!=null?i:[])[n],((r=te(a))!=null?r:[])[n],a==null?void 0:a.class,a==null?void 0:a.className)(m)};return t}return w(S,P(),I(),l$1==null?void 0:l$1.class,l$1==null?void 0:l$1.className)(m)},x$1=()=>{if(!(!g$1||typeof g$1!="object"))return Object.keys(g$1)};return v.variantKeys=x$1(),v.extend=e,v.base=S,v.slots=h$1,v.variants=g$1,v.defaultVariants=A,v.compoundSlots=V,v.compoundVariants=C,v};

const buttonVariants = ie({
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});

/* src/lib/components/ui/input/input.svelte generated by Svelte v4.2.8 */
const file$l = "src/lib/components/ui/input/input.svelte";

function create_fragment$o(ctx) {
	let input;
	let input_class_value;
	let mounted;
	let dispose;

	let input_levels = [
		{
			class: input_class_value = cn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", /*className*/ ctx[1])
		},
		/*$$restProps*/ ctx[2]
	];

	let input_data = {};

	for (let i = 0; i < input_levels.length; i += 1) {
		input_data = assign(input_data, input_levels[i]);
	}

	const block = {
		c: function create() {
			input = element("input");
			set_attributes(input, input_data);
			add_location(input, file$l, 13, 0, 150);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, input, anchor);
			if (input.autofocus) input.focus();
			set_input_value(input, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[15]),
					listen_dev(input, "blur", /*blur_handler*/ ctx[3], false, false, false, false),
					listen_dev(input, "change", /*change_handler*/ ctx[4], false, false, false, false),
					listen_dev(input, "click", /*click_handler*/ ctx[5], false, false, false, false),
					listen_dev(input, "focus", /*focus_handler*/ ctx[6], false, false, false, false),
					listen_dev(input, "keydown", /*keydown_handler*/ ctx[7], false, false, false, false),
					listen_dev(input, "keypress", /*keypress_handler*/ ctx[8], false, false, false, false),
					listen_dev(input, "keyup", /*keyup_handler*/ ctx[9], false, false, false, false),
					listen_dev(input, "mouseover", /*mouseover_handler*/ ctx[10], false, false, false, false),
					listen_dev(input, "mouseenter", /*mouseenter_handler*/ ctx[11], false, false, false, false),
					listen_dev(input, "mouseleave", /*mouseleave_handler*/ ctx[12], false, false, false, false),
					listen_dev(input, "paste", /*paste_handler*/ ctx[13], false, false, false, false),
					listen_dev(input, "input", /*input_handler*/ ctx[14], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			set_attributes(input, input_data = get_spread_update(input_levels, [
				dirty & /*className*/ 2 && input_class_value !== (input_class_value = cn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0  file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", /*className*/ ctx[1])) && { class: input_class_value },
				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
			]));

			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
				set_input_value(input, /*value*/ ctx[0]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(input);
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$o.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$o($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","value"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Input', slots, []);
	let { class: className = undefined } = $$props;
	let { value = undefined } = $$props;

	function blur_handler(event) {
		bubble.call(this, $$self, event);
	}

	function change_handler(event) {
		bubble.call(this, $$self, event);
	}

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function focus_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keypress_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keyup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseover_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseenter_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseleave_handler(event) {
		bubble.call(this, $$self, event);
	}

	function paste_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
	};

	$$self.$capture_state = () => ({ cn, className, value });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		value,
		className,
		$$restProps,
		blur_handler,
		change_handler,
		click_handler,
		focus_handler,
		keydown_handler,
		keypress_handler,
		keyup_handler,
		mouseover_handler,
		mouseenter_handler,
		mouseleave_handler,
		paste_handler,
		input_handler,
		input_input_handler
	];
}

let Input$1 = class Input extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$o, create_fragment$o, safe_not_equal, { class: 1, value: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Input",
			options,
			id: create_fragment$o.name
		});
	}

	get class() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* src/lib/components/ui/label/label.svelte generated by Svelte v4.2.8 */

// (7:0) <LabelPrimitive.Root  class={cn(   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",   className  )}  {...$$restProps}  on:mousedown >
function create_default_slot$7(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[4],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$7.name,
		type: "slot",
		source: "(7:0) <LabelPrimitive.Root  class={cn(   \\\"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70\\\",   className  )}  {...$$restProps}  on:mousedown >",
		ctx
	});

	return block;
}

function create_fragment$n(ctx) {
	let labelprimitive_root;
	let current;

	const labelprimitive_root_spread_levels = [
		{
			class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let labelprimitive_root_props = {
		$$slots: { default: [create_default_slot$7] },
		$$scope: { ctx }
	};

	for (let i = 0; i < labelprimitive_root_spread_levels.length; i += 1) {
		labelprimitive_root_props = assign(labelprimitive_root_props, labelprimitive_root_spread_levels[i]);
	}

	labelprimitive_root = new Label$1({
			props: labelprimitive_root_props,
			$$inline: true
		});

	labelprimitive_root.$on("mousedown", /*mousedown_handler*/ ctx[3]);

	const block = {
		c: function create() {
			create_component(labelprimitive_root.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(labelprimitive_root, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const labelprimitive_root_changes = (dirty & /*className, $$restProps*/ 3)
			? get_spread_update(labelprimitive_root_spread_levels, [
					dirty & /*className*/ 1 && {
						class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1])
				])
			: {};

			if (dirty & /*$$scope*/ 16) {
				labelprimitive_root_changes.$$scope = { dirty, ctx };
			}

			labelprimitive_root.$set(labelprimitive_root_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(labelprimitive_root.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(labelprimitive_root.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(labelprimitive_root, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$n($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Label', slots, ['default']);
	let { class: className = undefined } = $$props;

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ LabelPrimitive, cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, slots, mousedown_handler, $$scope];
}

class Label extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$n, create_fragment$n, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Label",
			options,
			id: create_fragment$n.name
		});
	}

	get class() {
		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/textarea/textarea.svelte generated by Svelte v4.2.8 */
const file$k = "src/lib/components/ui/textarea/textarea.svelte";

function create_fragment$m(ctx) {
	let textarea;
	let textarea_class_value;
	let mounted;
	let dispose;

	let textarea_levels = [
		{
			class: textarea_class_value = cn("flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", /*className*/ ctx[1])
		},
		/*$$restProps*/ ctx[2]
	];

	let textarea_data = {};

	for (let i = 0; i < textarea_levels.length; i += 1) {
		textarea_data = assign(textarea_data, textarea_levels[i]);
	}

	const block = {
		c: function create() {
			textarea = element("textarea");
			set_attributes(textarea, textarea_data);
			add_location(textarea, file$k, 11, 0, 150);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, textarea, anchor);
			if (textarea.autofocus) textarea.focus();
			set_input_value(textarea, /*value*/ ctx[0]);

			if (!mounted) {
				dispose = [
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[15]),
					listen_dev(textarea, "blur", /*blur_handler*/ ctx[3], false, false, false, false),
					listen_dev(textarea, "change", /*change_handler*/ ctx[4], false, false, false, false),
					listen_dev(textarea, "click", /*click_handler*/ ctx[5], false, false, false, false),
					listen_dev(textarea, "focus", /*focus_handler*/ ctx[6], false, false, false, false),
					listen_dev(textarea, "keydown", /*keydown_handler*/ ctx[7], false, false, false, false),
					listen_dev(textarea, "keypress", /*keypress_handler*/ ctx[8], false, false, false, false),
					listen_dev(textarea, "keyup", /*keyup_handler*/ ctx[9], false, false, false, false),
					listen_dev(textarea, "mouseover", /*mouseover_handler*/ ctx[10], false, false, false, false),
					listen_dev(textarea, "mouseenter", /*mouseenter_handler*/ ctx[11], false, false, false, false),
					listen_dev(textarea, "mouseleave", /*mouseleave_handler*/ ctx[12], false, false, false, false),
					listen_dev(textarea, "paste", /*paste_handler*/ ctx[13], false, false, false, false),
					listen_dev(textarea, "input", /*input_handler*/ ctx[14], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
				dirty & /*className*/ 2 && textarea_class_value !== (textarea_class_value = cn("flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", /*className*/ ctx[1])) && { class: textarea_class_value },
				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
			]));

			if (dirty & /*value*/ 1) {
				set_input_value(textarea, /*value*/ ctx[0]);
			}
		},
		i: noop$1,
		o: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(textarea);
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$m($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","value"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Textarea', slots, []);
	let { class: className = undefined } = $$props;
	let { value = undefined } = $$props;

	function blur_handler(event) {
		bubble.call(this, $$self, event);
	}

	function change_handler(event) {
		bubble.call(this, $$self, event);
	}

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function focus_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keypress_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keyup_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseover_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseenter_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mouseleave_handler(event) {
		bubble.call(this, $$self, event);
	}

	function paste_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_handler(event) {
		bubble.call(this, $$self, event);
	}

	function textarea_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(1, className = $$new_props.class);
		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
	};

	$$self.$capture_state = () => ({ cn, className, value });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(1, className = $$new_props.className);
		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		value,
		className,
		$$restProps,
		blur_handler,
		change_handler,
		click_handler,
		focus_handler,
		keydown_handler,
		keypress_handler,
		keyup_handler,
		mouseover_handler,
		mouseenter_handler,
		mouseleave_handler,
		paste_handler,
		input_handler,
		textarea_input_handler
	];
}

class Textarea extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$m, create_fragment$m, safe_not_equal, { class: 1, value: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Textarea",
			options,
			id: create_fragment$m.name
		});
	}

	get class() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/select/select-label.svelte generated by Svelte v4.2.8 */

// (7:0) <SelectPrimitive.Label  class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}  {...$$restProps} >
function create_default_slot$6(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$6.name,
		type: "slot",
		source: "(7:0) <SelectPrimitive.Label  class={cn(\\\"py-1.5 pl-8 pr-2 text-sm font-semibold\\\", className)}  {...$$restProps} >",
		ctx
	});

	return block;
}

function create_fragment$l(ctx) {
	let selectprimitive_label;
	let current;

	const selectprimitive_label_spread_levels = [
		{
			class: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let selectprimitive_label_props = {
		$$slots: { default: [create_default_slot$6] },
		$$scope: { ctx }
	};

	for (let i = 0; i < selectprimitive_label_spread_levels.length; i += 1) {
		selectprimitive_label_props = assign(selectprimitive_label_props, selectprimitive_label_spread_levels[i]);
	}

	selectprimitive_label = new Select_label$1({
			props: selectprimitive_label_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(selectprimitive_label.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(selectprimitive_label, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const selectprimitive_label_changes = (dirty & /*className, $$restProps*/ 3)
			? get_spread_update(selectprimitive_label_spread_levels, [
					dirty & /*className*/ 1 && {
						class: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1])
				])
			: {};

			if (dirty & /*$$scope*/ 8) {
				selectprimitive_label_changes.$$scope = { dirty, ctx };
			}

			selectprimitive_label.$set(selectprimitive_label_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(selectprimitive_label.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(selectprimitive_label.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(selectprimitive_label, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$l($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_label', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ SelectPrimitive, cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, slots, $$scope];
}

class Select_label extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$l, create_fragment$l, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_label",
			options,
			id: create_fragment$l.name
		});
	}

	get class() {
		throw new Error("<Select_label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Select_label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/select/select-item.svelte generated by Svelte v4.2.8 */
const file$j = "src/lib/components/ui/select/select-item.svelte";

// (28:2) <SelectPrimitive.ItemIndicator>
function create_default_slot_1$3(ctx) {
	let check;
	let current;

	check = new Check$1({
			props: { class: "h-4 w-4" },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(check.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(check, target, anchor);
			current = true;
		},
		p: noop$1,
		i: function intro(local) {
			if (current) return;
			transition_in(check.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(check.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(check, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$3.name,
		type: "slot",
		source: "(28:2) <SelectPrimitive.ItemIndicator>",
		ctx
	});

	return block;
}

// (11:0) <SelectPrimitive.Item  {value}  {disabled}  {label}  class={cn(   "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",   className  )}  {...$$restProps}  on:click  on:keydown  on:focusin  on:focusout  on:pointerleave  on:pointermove >
function create_default_slot$5(ctx) {
	let span;
	let selectprimitive_itemindicator;
	let t;
	let current;

	selectprimitive_itemindicator = new Select_item_indicator({
			props: {
				$$slots: { default: [create_default_slot_1$3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);

	const block = {
		c: function create() {
			span = element("span");
			create_component(selectprimitive_itemindicator.$$.fragment);
			t = space();
			if (default_slot) default_slot.c();
			attr_dev(span, "class", "absolute left-2 flex h-3.5 w-3.5 items-center justify-center");
			add_location(span, file$j, 31, 1, 723);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			mount_component(selectprimitive_itemindicator, span, null);
			insert_dev(target, t, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const selectprimitive_itemindicator_changes = {};

			if (dirty & /*$$scope*/ 4096) {
				selectprimitive_itemindicator_changes.$$scope = { dirty, ctx };
			}

			selectprimitive_itemindicator.$set(selectprimitive_itemindicator_changes);

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[12],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(selectprimitive_itemindicator.$$.fragment, local);
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(selectprimitive_itemindicator.$$.fragment, local);
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span);
				detach_dev(t);
			}

			destroy_component(selectprimitive_itemindicator);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$5.name,
		type: "slot",
		source: "(11:0) <SelectPrimitive.Item  {value}  {disabled}  {label}  class={cn(   \\\"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50\\\",   className  )}  {...$$restProps}  on:click  on:keydown  on:focusin  on:focusout  on:pointerleave  on:pointermove >",
		ctx
	});

	return block;
}

function create_fragment$k(ctx) {
	let selectprimitive_item;
	let current;

	const selectprimitive_item_spread_levels = [
		{ value: /*value*/ ctx[1] },
		{ disabled: /*disabled*/ ctx[3] },
		{ label: /*label*/ ctx[2] },
		{
			class: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[4]
	];

	let selectprimitive_item_props = {
		$$slots: { default: [create_default_slot$5] },
		$$scope: { ctx }
	};

	for (let i = 0; i < selectprimitive_item_spread_levels.length; i += 1) {
		selectprimitive_item_props = assign(selectprimitive_item_props, selectprimitive_item_spread_levels[i]);
	}

	selectprimitive_item = new Select_item$1({
			props: selectprimitive_item_props,
			$$inline: true
		});

	selectprimitive_item.$on("click", /*click_handler*/ ctx[6]);
	selectprimitive_item.$on("keydown", /*keydown_handler*/ ctx[7]);
	selectprimitive_item.$on("focusin", /*focusin_handler*/ ctx[8]);
	selectprimitive_item.$on("focusout", /*focusout_handler*/ ctx[9]);
	selectprimitive_item.$on("pointerleave", /*pointerleave_handler*/ ctx[10]);
	selectprimitive_item.$on("pointermove", /*pointermove_handler*/ ctx[11]);

	const block = {
		c: function create() {
			create_component(selectprimitive_item.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(selectprimitive_item, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const selectprimitive_item_changes = (dirty & /*value, disabled, label, className, $$restProps*/ 31)
			? get_spread_update(selectprimitive_item_spread_levels, [
					dirty & /*value*/ 2 && { value: /*value*/ ctx[1] },
					dirty & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
					dirty & /*label*/ 4 && { label: /*label*/ ctx[2] },
					dirty & /*className*/ 1 && {
						class: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 16 && get_spread_object(/*$$restProps*/ ctx[4])
				])
			: {};

			if (dirty & /*$$scope*/ 4096) {
				selectprimitive_item_changes.$$scope = { dirty, ctx };
			}

			selectprimitive_item.$set(selectprimitive_item_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(selectprimitive_item.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(selectprimitive_item.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(selectprimitive_item, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$k($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","value","label","disabled"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_item', slots, ['default']);
	let { class: className = undefined } = $$props;
	let { value } = $$props;
	let { label = undefined } = $$props;
	let { disabled = undefined } = $$props;

	$$self.$$.on_mount.push(function () {
		if (value === undefined && !('value' in $$props || $$self.$$.bound[$$self.$$.props['value']])) {
			console.warn("<Select_item> was created without expected prop 'value'");
		}
	});

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function focusin_handler(event) {
		bubble.call(this, $$self, event);
	}

	function focusout_handler(event) {
		bubble.call(this, $$self, event);
	}

	function pointerleave_handler(event) {
		bubble.call(this, $$self, event);
	}

	function pointermove_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
		if ('label' in $$new_props) $$invalidate(2, label = $$new_props.label);
		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
		if ('$$scope' in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		cn,
		SelectPrimitive,
		Check: Check$1,
		className,
		value,
		label,
		disabled
	});

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
		if ('value' in $$props) $$invalidate(1, value = $$new_props.value);
		if ('label' in $$props) $$invalidate(2, label = $$new_props.label);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		className,
		value,
		label,
		disabled,
		$$restProps,
		slots,
		click_handler,
		keydown_handler,
		focusin_handler,
		focusout_handler,
		pointerleave_handler,
		pointermove_handler,
		$$scope
	];
}

class Select_item extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$k, create_fragment$k, safe_not_equal, {
			class: 0,
			value: 1,
			label: 2,
			disabled: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_item",
			options,
			id: create_fragment$k.name
		});
	}

	get class() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get label() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set label(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Select_item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Select_item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/select/select-content.svelte generated by Svelte v4.2.8 */
const file$i = "src/lib/components/ui/select/select-content.svelte";

// (17:0) <SelectPrimitive.Content  {inTransition}  {inTransitionConfig}  {outTransition}  {outTransitionConfig}  {sideOffset}  class={cn(   "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none",   className  )}  {...$$restProps}  on:keydown >
function create_default_slot$4(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[7].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			attr_dev(div, "class", "w-full p-1");
			add_location(div, file$i, 35, 1, 762);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 512)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[9],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$4.name,
		type: "slot",
		source: "(17:0) <SelectPrimitive.Content  {inTransition}  {inTransitionConfig}  {outTransition}  {outTransitionConfig}  {sideOffset}  class={cn(   \\\"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none\\\",   className  )}  {...$$restProps}  on:keydown >",
		ctx
	});

	return block;
}

function create_fragment$j(ctx) {
	let selectprimitive_content;
	let current;

	const selectprimitive_content_spread_levels = [
		{ inTransition: /*inTransition*/ ctx[1] },
		{
			inTransitionConfig: /*inTransitionConfig*/ ctx[2]
		},
		{ outTransition: /*outTransition*/ ctx[3] },
		{
			outTransitionConfig: /*outTransitionConfig*/ ctx[4]
		},
		{ sideOffset: /*sideOffset*/ ctx[0] },
		{
			class: cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none", /*className*/ ctx[5])
		},
		/*$$restProps*/ ctx[6]
	];

	let selectprimitive_content_props = {
		$$slots: { default: [create_default_slot$4] },
		$$scope: { ctx }
	};

	for (let i = 0; i < selectprimitive_content_spread_levels.length; i += 1) {
		selectprimitive_content_props = assign(selectprimitive_content_props, selectprimitive_content_spread_levels[i]);
	}

	selectprimitive_content = new Select_content$1({
			props: selectprimitive_content_props,
			$$inline: true
		});

	selectprimitive_content.$on("keydown", /*keydown_handler*/ ctx[8]);

	const block = {
		c: function create() {
			create_component(selectprimitive_content.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(selectprimitive_content, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const selectprimitive_content_changes = (dirty & /*inTransition, inTransitionConfig, outTransition, outTransitionConfig, sideOffset, className, $$restProps*/ 127)
			? get_spread_update(selectprimitive_content_spread_levels, [
					dirty & /*inTransition*/ 2 && { inTransition: /*inTransition*/ ctx[1] },
					dirty & /*inTransitionConfig*/ 4 && {
						inTransitionConfig: /*inTransitionConfig*/ ctx[2]
					},
					dirty & /*outTransition*/ 8 && { outTransition: /*outTransition*/ ctx[3] },
					dirty & /*outTransitionConfig*/ 16 && {
						outTransitionConfig: /*outTransitionConfig*/ ctx[4]
					},
					dirty & /*sideOffset*/ 1 && { sideOffset: /*sideOffset*/ ctx[0] },
					dirty & /*className*/ 32 && {
						class: cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none", /*className*/ ctx[5])
					},
					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6])
				])
			: {};

			if (dirty & /*$$scope*/ 512) {
				selectprimitive_content_changes.$$scope = { dirty, ctx };
			}

			selectprimitive_content.$set(selectprimitive_content_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(selectprimitive_content.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(selectprimitive_content.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(selectprimitive_content, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props, $$invalidate) {
	const omit_props_names = [
		"sideOffset","inTransition","inTransitionConfig","outTransition","outTransitionConfig","class"
	];

	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_content', slots, ['default']);
	let { sideOffset = 4 } = $$props;
	let { inTransition = flyAndScale } = $$props;
	let { inTransitionConfig = undefined } = $$props;
	let { outTransition = scale } = $$props;
	let { outTransitionConfig = { start: 0.95, opacity: 0, duration: 50 } } = $$props;
	let { class: className = undefined } = $$props;

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('sideOffset' in $$new_props) $$invalidate(0, sideOffset = $$new_props.sideOffset);
		if ('inTransition' in $$new_props) $$invalidate(1, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$new_props) $$invalidate(2, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$new_props) $$invalidate(3, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$new_props) $$invalidate(4, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('class' in $$new_props) $$invalidate(5, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		SelectPrimitive,
		cn,
		flyAndScale,
		scale,
		sideOffset,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		className
	});

	$$self.$inject_state = $$new_props => {
		if ('sideOffset' in $$props) $$invalidate(0, sideOffset = $$new_props.sideOffset);
		if ('inTransition' in $$props) $$invalidate(1, inTransition = $$new_props.inTransition);
		if ('inTransitionConfig' in $$props) $$invalidate(2, inTransitionConfig = $$new_props.inTransitionConfig);
		if ('outTransition' in $$props) $$invalidate(3, outTransition = $$new_props.outTransition);
		if ('outTransitionConfig' in $$props) $$invalidate(4, outTransitionConfig = $$new_props.outTransitionConfig);
		if ('className' in $$props) $$invalidate(5, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		sideOffset,
		inTransition,
		inTransitionConfig,
		outTransition,
		outTransitionConfig,
		className,
		$$restProps,
		slots,
		keydown_handler,
		$$scope
	];
}

class Select_content extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$j, create_fragment$j, safe_not_equal, {
			sideOffset: 0,
			inTransition: 1,
			inTransitionConfig: 2,
			outTransition: 3,
			outTransitionConfig: 4,
			class: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_content",
			options,
			id: create_fragment$j.name
		});
	}

	get sideOffset() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sideOffset(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransition() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransition(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inTransitionConfig() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inTransitionConfig(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransition() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransition(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outTransitionConfig() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outTransitionConfig(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Select_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Select_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/select/select-trigger.svelte generated by Svelte v4.2.8 */
const file$h = "src/lib/components/ui/select/select-trigger.svelte";
const get_default_slot_changes = dirty => ({ builder: dirty & /*builder*/ 64 });
const get_default_slot_context = ctx => ({ builder: /*builder*/ ctx[6] });

// (8:0) <SelectPrimitive.Trigger  class={cn(   "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",   className  )}  {...$$restProps}  let:builder  on:click  on:keydown >
function create_default_slot$3(ctx) {
	let t;
	let div;
	let chevrondown;
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], get_default_slot_context);

	chevrondown = new ChevronDown({
			props: { class: "h-4 w-4 opacity-50" },
			$$inline: true
		});

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
			t = space();
			div = element("div");
			create_component(chevrondown.$$.fragment);
			add_location(div, file$h, 23, 1, 635);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			insert_dev(target, t, anchor);
			insert_dev(target, div, anchor);
			mount_component(chevrondown, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope, builder*/ 96)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, get_default_slot_changes),
						get_default_slot_context
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(chevrondown.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			transition_out(chevrondown.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
			destroy_component(chevrondown);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$3.name,
		type: "slot",
		source: "(8:0) <SelectPrimitive.Trigger  class={cn(   \\\"flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50\\\",   className  )}  {...$$restProps}  let:builder  on:click  on:keydown >",
		ctx
	});

	return block;
}

function create_fragment$i(ctx) {
	let selectprimitive_trigger;
	let current;

	const selectprimitive_trigger_spread_levels = [
		{
			class: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let selectprimitive_trigger_props = {
		$$slots: {
			default: [
				create_default_slot$3,
				({ builder }) => ({ 6: builder }),
				({ builder }) => builder ? 64 : 0
			]
		},
		$$scope: { ctx }
	};

	for (let i = 0; i < selectprimitive_trigger_spread_levels.length; i += 1) {
		selectprimitive_trigger_props = assign(selectprimitive_trigger_props, selectprimitive_trigger_spread_levels[i]);
	}

	selectprimitive_trigger = new Select_trigger$1({
			props: selectprimitive_trigger_props,
			$$inline: true
		});

	selectprimitive_trigger.$on("click", /*click_handler*/ ctx[3]);
	selectprimitive_trigger.$on("keydown", /*keydown_handler*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(selectprimitive_trigger.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(selectprimitive_trigger, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const selectprimitive_trigger_changes = (dirty & /*className, $$restProps*/ 3)
			? get_spread_update(selectprimitive_trigger_spread_levels, [
					dirty & /*className*/ 1 && {
						class: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1])
				])
			: {};

			if (dirty & /*$$scope, builder*/ 96) {
				selectprimitive_trigger_changes.$$scope = { dirty, ctx };
			}

			selectprimitive_trigger.$set(selectprimitive_trigger_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(selectprimitive_trigger.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(selectprimitive_trigger.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(selectprimitive_trigger, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_trigger', slots, ['default']);
	let { class: className = undefined } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		SelectPrimitive,
		ChevronDown,
		cn,
		className
	});

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, slots, click_handler, keydown_handler, $$scope];
}

class Select_trigger extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_trigger",
			options,
			id: create_fragment$i.name
		});
	}

	get class() {
		throw new Error("<Select_trigger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Select_trigger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/select/select-separator.svelte generated by Svelte v4.2.8 */

function create_fragment$h(ctx) {
	let selectprimitive_separator;
	let current;

	const selectprimitive_separator_spread_levels = [
		{
			class: cn("-mx-1 my-1 h-px bg-muted", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let selectprimitive_separator_props = {};

	for (let i = 0; i < selectprimitive_separator_spread_levels.length; i += 1) {
		selectprimitive_separator_props = assign(selectprimitive_separator_props, selectprimitive_separator_spread_levels[i]);
	}

	selectprimitive_separator = new Separator({
			props: selectprimitive_separator_props,
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(selectprimitive_separator.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(selectprimitive_separator, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const selectprimitive_separator_changes = (dirty & /*className, $$restProps*/ 3)
			? get_spread_update(selectprimitive_separator_spread_levels, [
					dirty & /*className*/ 1 && {
						class: cn("-mx-1 my-1 h-px bg-muted", /*className*/ ctx[0])
					},
					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1])
				])
			: {};

			selectprimitive_separator.$set(selectprimitive_separator_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(selectprimitive_separator.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(selectprimitive_separator.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(selectprimitive_separator, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Select_separator', slots, []);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
	};

	$$self.$capture_state = () => ({ SelectPrimitive, cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps];
}

class Select_separator extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$h, create_fragment$h, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_separator",
			options,
			id: create_fragment$h.name
		});
	}

	get class() {
		throw new Error("<Select_separator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Select_separator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const Root = Select$1;
const Group = Select_group;
const Input = Select_input;
const Value = Select_value;

var Select = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Content: Select_content,
    Group: Group,
    Input: Input,
    Item: Select_item,
    Label: Select_label,
    Root: Root,
    Select: Root,
    SelectContent: Select_content,
    SelectGroup: Group,
    SelectInput: Input,
    SelectItem: Select_item,
    SelectLabel: Select_label,
    SelectSeparator: Select_separator,
    SelectTrigger: Select_trigger,
    SelectValue: Value,
    Separator: Select_separator,
    Trigger: Select_trigger,
    Value: Value
});

/* src/views/feedback-form.svelte generated by Svelte v4.2.8 */
const file$g = "src/views/feedback-form.svelte";

// (45:4) 
function create_header_slot$1(ctx) {
	let div;
	let h3;

	const block = {
		c: function create() {
			div = element("div");
			h3 = element("h3");
			h3.textContent = "Add a feedback";
			add_location(h3, file$g, 50, 8, 941);
			attr_dev(div, "slot", "header");
			add_location(div, file$g, 49, 4, 913);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h3);
		},
		p: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_header_slot$1.name,
		type: "slot",
		source: "(45:4) ",
		ctx
	});

	return block;
}

// (52:20) <Label class="mb-4" for="email">
function create_default_slot_9$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Email");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_9$1.name,
		type: "slot",
		source: "(52:20) <Label class=\\\"mb-4\\\" for=\\\"email\\\">",
		ctx
	});

	return block;
}

// (57:24) <Label class="mb-4">
function create_default_slot_8$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Type");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_8$1.name,
		type: "slot",
		source: "(57:24) <Label class=\\\"mb-4\\\">",
		ctx
	});

	return block;
}

// (60:24) <Select.Trigger>
function create_default_slot_7$1(ctx) {
	let select_value_1;
	let current;
	select_value_1 = new Value({ $$inline: true });

	const block = {
		c: function create() {
			create_component(select_value_1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(select_value_1, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(select_value_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(select_value_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(select_value_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7$1.name,
		type: "slot",
		source: "(60:24) <Select.Trigger>",
		ctx
	});

	return block;
}

// (64:28) <Select.Item value='enhance'>
function create_default_slot_6$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Enhance");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6$1.name,
		type: "slot",
		source: "(64:28) <Select.Item value='enhance'>",
		ctx
	});

	return block;
}

// (65:28) <Select.Item value='bug'>
function create_default_slot_5$2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Bug");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5$2.name,
		type: "slot",
		source: "(65:28) <Select.Item value='bug'>",
		ctx
	});

	return block;
}

// (63:24) <Select.Content>
function create_default_slot_4$2(ctx) {
	let select_item0;
	let t;
	let select_item1;
	let current;

	select_item0 = new Select_item({
			props: {
				value: "enhance",
				$$slots: { default: [create_default_slot_6$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	select_item1 = new Select_item({
			props: {
				value: "bug",
				$$slots: { default: [create_default_slot_5$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(select_item0.$$.fragment);
			t = space();
			create_component(select_item1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(select_item0, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(select_item1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const select_item0_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				select_item0_changes.$$scope = { dirty, ctx };
			}

			select_item0.$set(select_item0_changes);
			const select_item1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				select_item1_changes.$$scope = { dirty, ctx };
			}

			select_item1.$set(select_item1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(select_item0.$$.fragment, local);
			transition_in(select_item1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(select_item0.$$.fragment, local);
			transition_out(select_item1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}

			destroy_component(select_item0, detaching);
			destroy_component(select_item1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4$2.name,
		type: "slot",
		source: "(63:24) <Select.Content>",
		ctx
	});

	return block;
}

// (56:20) <Select.Root onSelectedChange={handleSelectChange}>
function create_default_slot_3$2(ctx) {
	let label;
	let t0;
	let select_trigger;
	let t1;
	let select_content;
	let current;

	label = new Label({
			props: {
				class: "mb-4",
				$$slots: { default: [create_default_slot_8$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	select_trigger = new Select_trigger({
			props: {
				$$slots: { default: [create_default_slot_7$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	select_content = new Select_content({
			props: {
				$$slots: { default: [create_default_slot_4$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(label.$$.fragment);
			t0 = space();
			create_component(select_trigger.$$.fragment);
			t1 = space();
			create_component(select_content.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(label, target, anchor);
			insert_dev(target, t0, anchor);
			mount_component(select_trigger, target, anchor);
			insert_dev(target, t1, anchor);
			mount_component(select_content, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const label_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				label_changes.$$scope = { dirty, ctx };
			}

			label.$set(label_changes);
			const select_trigger_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				select_trigger_changes.$$scope = { dirty, ctx };
			}

			select_trigger.$set(select_trigger_changes);
			const select_content_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				select_content_changes.$$scope = { dirty, ctx };
			}

			select_content.$set(select_content_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			transition_in(select_trigger.$$.fragment, local);
			transition_in(select_content.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label.$$.fragment, local);
			transition_out(select_trigger.$$.fragment, local);
			transition_out(select_content.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t0);
				detach_dev(t1);
			}

			destroy_component(label, detaching);
			destroy_component(select_trigger, detaching);
			destroy_component(select_content, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3$2.name,
		type: "slot",
		source: "(56:20) <Select.Root onSelectedChange={handleSelectChange}>",
		ctx
	});

	return block;
}

// (71:16) <Label class="mb-4" for="ih-feedback-content">
function create_default_slot_2$2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Feedback :");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2$2.name,
		type: "slot",
		source: "(71:16) <Label class=\\\"mb-4\\\" for=\\\"ih-feedback-content\\\">",
		ctx
	});

	return block;
}

// (48:4) 
function create_body_slot$1(ctx) {
	let div4;
	let form;
	let div2;
	let div0;
	let label0;
	let t0;
	let input;
	let updating_value;
	let t1;
	let div1;
	let select_root;
	let t2;
	let div3;
	let label1;
	let t3;
	let textarea;
	let updating_value_1;
	let current;

	label0 = new Label({
			props: {
				class: "mb-4",
				for: "email",
				$$slots: { default: [create_default_slot_9$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	function input_value_binding(value) {
		/*input_value_binding*/ ctx[7](value);
	}

	let input_props = { id: "email", type: "text" };

	if (/*email*/ ctx[0] !== void 0) {
		input_props.value = /*email*/ ctx[0];
	}

	input = new Input$1({ props: input_props, $$inline: true });
	binding_callbacks.push(() => bind(input, 'value', input_value_binding));

	select_root = new Root({
			props: {
				onSelectedChange: /*handleSelectChange*/ ctx[4],
				$$slots: { default: [create_default_slot_3$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	label1 = new Label({
			props: {
				class: "mb-4",
				for: "ih-feedback-content",
				$$slots: { default: [create_default_slot_2$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	function textarea_value_binding(value) {
		/*textarea_value_binding*/ ctx[8](value);
	}

	let textarea_props = { id: "ih-feedback-content" };

	if (/*feedback*/ ctx[3] !== void 0) {
		textarea_props.value = /*feedback*/ ctx[3];
	}

	textarea = new Textarea({ props: textarea_props, $$inline: true });
	binding_callbacks.push(() => bind(textarea, 'value', textarea_value_binding));

	const block = {
		c: function create() {
			div4 = element("div");
			form = element("form");
			div2 = element("div");
			div0 = element("div");
			create_component(label0.$$.fragment);
			t0 = space();
			create_component(input.$$.fragment);
			t1 = space();
			div1 = element("div");
			create_component(select_root.$$.fragment);
			t2 = space();
			div3 = element("div");
			create_component(label1.$$.fragment);
			t3 = space();
			create_component(textarea.$$.fragment);
			attr_dev(div0, "class", "w-full md:w-1/2 px-3 mb-6 md:mb-0");
			add_location(div0, file$g, 55, 16, 1105);
			attr_dev(div1, "class", "w-full md:w-1/2 px-3");
			add_location(div1, file$g, 59, 16, 1330);
			attr_dev(div2, "class", "flex flex-wrap -mx-3 mb-6");
			add_location(div2, file$g, 54, 12, 1049);
			add_location(div3, file$g, 74, 12, 1998);
			attr_dev(form, "class", "w-full max-w-lg");
			add_location(form, file$g, 53, 8, 1006);
			attr_dev(div4, "slot", "body");
			add_location(div4, file$g, 52, 4, 980);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div4, anchor);
			append_dev(div4, form);
			append_dev(form, div2);
			append_dev(div2, div0);
			mount_component(label0, div0, null);
			append_dev(div0, t0);
			mount_component(input, div0, null);
			append_dev(div2, t1);
			append_dev(div2, div1);
			mount_component(select_root, div1, null);
			append_dev(form, t2);
			append_dev(form, div3);
			mount_component(label1, div3, null);
			append_dev(div3, t3);
			mount_component(textarea, div3, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const label0_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				label0_changes.$$scope = { dirty, ctx };
			}

			label0.$set(label0_changes);
			const input_changes = {};

			if (!updating_value && dirty & /*email*/ 1) {
				updating_value = true;
				input_changes.value = /*email*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			input.$set(input_changes);
			const select_root_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				select_root_changes.$$scope = { dirty, ctx };
			}

			select_root.$set(select_root_changes);
			const label1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				label1_changes.$$scope = { dirty, ctx };
			}

			label1.$set(label1_changes);
			const textarea_changes = {};

			if (!updating_value_1 && dirty & /*feedback*/ 8) {
				updating_value_1 = true;
				textarea_changes.value = /*feedback*/ ctx[3];
				add_flush_callback(() => updating_value_1 = false);
			}

			textarea.$set(textarea_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(label0.$$.fragment, local);
			transition_in(input.$$.fragment, local);
			transition_in(select_root.$$.fragment, local);
			transition_in(label1.$$.fragment, local);
			transition_in(textarea.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(label0.$$.fragment, local);
			transition_out(input.$$.fragment, local);
			transition_out(select_root.$$.fragment, local);
			transition_out(label1.$$.fragment, local);
			transition_out(textarea.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div4);
			}

			destroy_component(label0);
			destroy_component(input);
			destroy_component(select_root);
			destroy_component(label1);
			destroy_component(textarea);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_body_slot$1.name,
		type: "slot",
		source: "(48:4) ",
		ctx
	});

	return block;
}

// (77:8) <Button variant="outline" class='ih-action-button' on:click={onClose}>
function create_default_slot_1$2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Cancel");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$2.name,
		type: "slot",
		source: "(77:8) <Button variant=\\\"outline\\\" class='ih-action-button' on:click={onClose}>",
		ctx
	});

	return block;
}

// (78:8) <Button class='ih-action-button' on:click={handleSubmit}>
function create_default_slot$2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Send");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(78:8) <Button class='ih-action-button' on:click={handleSubmit}>",
		ctx
	});

	return block;
}

// (76:4) 
function create_footer_slot(ctx) {
	let div;
	let button0;
	let t;
	let button1;
	let current;

	button0 = new Button({
			props: {
				variant: "outline",
				class: "ih-action-button",
				$$slots: { default: [create_default_slot_1$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button0.$on("click", function () {
		if (is_function(/*onClose*/ ctx[2])) /*onClose*/ ctx[2].apply(this, arguments);
	});

	button1 = new Button({
			props: {
				class: "ih-action-button",
				$$slots: { default: [create_default_slot$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button1.$on("click", /*handleSubmit*/ ctx[5]);

	const block = {
		c: function create() {
			div = element("div");
			create_component(button0.$$.fragment);
			t = space();
			create_component(button1.$$.fragment);
			attr_dev(div, "slot", "footer");
			add_location(div, file$g, 80, 4, 2211);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(button0, div, null);
			append_dev(div, t);
			mount_component(button1, div, null);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const button0_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				button0_changes.$$scope = { dirty, ctx };
			}

			button0.$set(button0_changes);
			const button1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				button1_changes.$$scope = { dirty, ctx };
			}

			button1.$set(button1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			destroy_component(button0);
			destroy_component(button1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_footer_slot.name,
		type: "slot",
		source: "(76:4) ",
		ctx
	});

	return block;
}

function create_fragment$g(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				open: /*open*/ ctx[1],
				onClose: /*onClose*/ ctx[2],
				$$slots: {
					footer: [create_footer_slot],
					body: [create_body_slot$1],
					header: [create_header_slot$1]
				},
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};
			if (dirty & /*open*/ 2) modal_changes.open = /*open*/ ctx[1];
			if (dirty & /*onClose*/ 4) modal_changes.onClose = /*onClose*/ ctx[2];

			if (dirty & /*$$scope, onClose, feedback, email*/ 1037) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Feedback_form', slots, []);
	let { onSubmit } = $$props;
	let { open = false } = $$props;
	let { onClose } = $$props;
	let feedback;
	let type;
	let { email = '' } = $$props;

	const handleSelectChange = data => {
		if (data) {
			type = data.value;
		}
	};

	const handleSubmit = () => {
		onSubmit({ content: feedback, type, email });
		$$invalidate(3, feedback = '');
		$$invalidate(0, email = '');
	};

	$$self.$$.on_mount.push(function () {
		if (onSubmit === undefined && !('onSubmit' in $$props || $$self.$$.bound[$$self.$$.props['onSubmit']])) {
			console.warn("<Feedback_form> was created without expected prop 'onSubmit'");
		}

		if (onClose === undefined && !('onClose' in $$props || $$self.$$.bound[$$self.$$.props['onClose']])) {
			console.warn("<Feedback_form> was created without expected prop 'onClose'");
		}
	});

	const writable_props = ['onSubmit', 'open', 'onClose', 'email'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Feedback_form> was created with unknown prop '${key}'`);
	});

	function input_value_binding(value) {
		email = value;
		$$invalidate(0, email);
	}

	function textarea_value_binding(value) {
		feedback = value;
		$$invalidate(3, feedback);
	}

	$$self.$$set = $$props => {
		if ('onSubmit' in $$props) $$invalidate(6, onSubmit = $$props.onSubmit);
		if ('open' in $$props) $$invalidate(1, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(2, onClose = $$props.onClose);
		if ('email' in $$props) $$invalidate(0, email = $$props.email);
	};

	$$self.$capture_state = () => ({
		Modal,
		Button,
		Input: Input$1,
		Label,
		Textarea,
		Select,
		onSubmit,
		open,
		onClose,
		feedback,
		type,
		email,
		handleSelectChange,
		handleSubmit
	});

	$$self.$inject_state = $$props => {
		if ('onSubmit' in $$props) $$invalidate(6, onSubmit = $$props.onSubmit);
		if ('open' in $$props) $$invalidate(1, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(2, onClose = $$props.onClose);
		if ('feedback' in $$props) $$invalidate(3, feedback = $$props.feedback);
		if ('type' in $$props) type = $$props.type;
		if ('email' in $$props) $$invalidate(0, email = $$props.email);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		email,
		open,
		onClose,
		feedback,
		handleSelectChange,
		handleSubmit,
		onSubmit,
		input_value_binding,
		textarea_value_binding
	];
}

class Feedback_form extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, {
			onSubmit: 6,
			open: 1,
			onClose: 2,
			email: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Feedback_form",
			options,
			id: create_fragment$g.name
		});
	}

	get onSubmit() {
		throw new Error("<Feedback_form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onSubmit(value) {
		throw new Error("<Feedback_form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get open() {
		throw new Error("<Feedback_form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set open(value) {
		throw new Error("<Feedback_form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onClose() {
		throw new Error("<Feedback_form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onClose(value) {
		throw new Error("<Feedback_form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get email() {
		throw new Error("<Feedback_form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set email(value) {
		throw new Error("<Feedback_form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table.svelte generated by Svelte v4.2.8 */
const file$f = "src/lib/components/ui/table/table.svelte";

function create_fragment$f(ctx) {
	let div;
	let table;
	let table_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let table_levels = [
		{
			class: table_class_value = cn("w-full caption-bottom text-sm", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let table_data = {};

	for (let i = 0; i < table_levels.length; i += 1) {
		table_data = assign(table_data, table_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			table = element("table");
			if (default_slot) default_slot.c();
			set_attributes(table, table_data);
			add_location(table, file$f, 11, 1, 156);
			attr_dev(div, "class", "w-full overflow-auto");
			add_location(div, file$f, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, table);

			if (default_slot) {
				default_slot.m(table, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(table, table_data = get_spread_update(table_levels, [
				(!current || dirty & /*className*/ 1 && table_class_value !== (table_class_value = cn("w-full caption-bottom text-sm", /*className*/ ctx[0]))) && { class: table_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

let Table$1 = class Table extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table",
			options,
			id: create_fragment$f.name
		});
	}

	get class() {
		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* src/lib/components/ui/table/table-body.svelte generated by Svelte v4.2.8 */
const file$e = "src/lib/components/ui/table/table-body.svelte";

function create_fragment$e(ctx) {
	let tbody;
	let tbody_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let tbody_levels = [
		{
			class: tbody_class_value = cn("[&_tr:last-child]:border-0", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let tbody_data = {};

	for (let i = 0; i < tbody_levels.length; i += 1) {
		tbody_data = assign(tbody_data, tbody_levels[i]);
	}

	const block = {
		c: function create() {
			tbody = element("tbody");
			if (default_slot) default_slot.c();
			set_attributes(tbody, tbody_data);
			add_location(tbody, file$e, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, tbody, anchor);

			if (default_slot) {
				default_slot.m(tbody, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(tbody, tbody_data = get_spread_update(tbody_levels, [
				(!current || dirty & /*className*/ 1 && tbody_class_value !== (tbody_class_value = cn("[&_tr:last-child]:border-0", /*className*/ ctx[0]))) && { class: tbody_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(tbody);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_body', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Table_body extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_body",
			options,
			id: create_fragment$e.name
		});
	}

	get class() {
		throw new Error("<Table_body>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_body>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table-caption.svelte generated by Svelte v4.2.8 */
const file$d = "src/lib/components/ui/table/table-caption.svelte";

function create_fragment$d(ctx) {
	let caption;
	let caption_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let caption_levels = [
		{
			class: caption_class_value = cn("mt-4 text-sm text-muted-foreground", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let caption_data = {};

	for (let i = 0; i < caption_levels.length; i += 1) {
		caption_data = assign(caption_data, caption_levels[i]);
	}

	const block = {
		c: function create() {
			caption = element("caption");
			if (default_slot) default_slot.c();
			set_attributes(caption, caption_data);
			add_location(caption, file$d, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, caption, anchor);

			if (default_slot) {
				default_slot.m(caption, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(caption, caption_data = get_spread_update(caption_levels, [
				(!current || dirty & /*className*/ 1 && caption_class_value !== (caption_class_value = cn("mt-4 text-sm text-muted-foreground", /*className*/ ctx[0]))) && { class: caption_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(caption);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_caption', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Table_caption extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$d, create_fragment$d, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_caption",
			options,
			id: create_fragment$d.name
		});
	}

	get class() {
		throw new Error("<Table_caption>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_caption>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table-cell.svelte generated by Svelte v4.2.8 */
const file$c = "src/lib/components/ui/table/table-cell.svelte";

function create_fragment$c(ctx) {
	let td;
	let td_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let td_levels = [
		{
			class: td_class_value = cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let td_data = {};

	for (let i = 0; i < td_levels.length; i += 1) {
		td_data = assign(td_data, td_levels[i]);
	}

	const block = {
		c: function create() {
			td = element("td");
			if (default_slot) default_slot.c();
			set_attributes(td, td_data);
			add_location(td, file$c, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);

			if (default_slot) {
				default_slot.m(td, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(td, "click", /*click_handler*/ ctx[4], false, false, false, false),
					listen_dev(td, "keydown", /*keydown_handler*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(td, td_data = get_spread_update(td_levels, [
				(!current || dirty & /*className*/ 1 && td_class_value !== (td_class_value = cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", /*className*/ ctx[0]))) && { class: td_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(td);
			}

			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_cell', slots, ['default']);
	let { class: className = undefined } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots, click_handler, keydown_handler];
}

class Table_cell extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_cell",
			options,
			id: create_fragment$c.name
		});
	}

	get class() {
		throw new Error("<Table_cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table-footer.svelte generated by Svelte v4.2.8 */
const file$b = "src/lib/components/ui/table/table-footer.svelte";

function create_fragment$b(ctx) {
	let tfoot;
	let tfoot_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let tfoot_levels = [
		{
			class: tfoot_class_value = cn("bg-primary font-medium text-primary-foreground", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let tfoot_data = {};

	for (let i = 0; i < tfoot_levels.length; i += 1) {
		tfoot_data = assign(tfoot_data, tfoot_levels[i]);
	}

	const block = {
		c: function create() {
			tfoot = element("tfoot");
			if (default_slot) default_slot.c();
			set_attributes(tfoot, tfoot_data);
			add_location(tfoot, file$b, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, tfoot, anchor);

			if (default_slot) {
				default_slot.m(tfoot, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(tfoot, tfoot_data = get_spread_update(tfoot_levels, [
				(!current || dirty & /*className*/ 1 && tfoot_class_value !== (tfoot_class_value = cn("bg-primary font-medium text-primary-foreground", /*className*/ ctx[0]))) && { class: tfoot_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(tfoot);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_footer', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Table_footer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_footer",
			options,
			id: create_fragment$b.name
		});
	}

	get class() {
		throw new Error("<Table_footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table-head.svelte generated by Svelte v4.2.8 */
const file$a = "src/lib/components/ui/table/table-head.svelte";

function create_fragment$a(ctx) {
	let th;
	let th_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let th_levels = [
		{
			class: th_class_value = cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let th_data = {};

	for (let i = 0; i < th_levels.length; i += 1) {
		th_data = assign(th_data, th_levels[i]);
	}

	const block = {
		c: function create() {
			th = element("th");
			if (default_slot) default_slot.c();
			set_attributes(th, th_data);
			add_location(th, file$a, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, th, anchor);

			if (default_slot) {
				default_slot.m(th, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(th, th_data = get_spread_update(th_levels, [
				(!current || dirty & /*className*/ 1 && th_class_value !== (th_class_value = cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", /*className*/ ctx[0]))) && { class: th_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(th);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_head', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Table_head extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_head",
			options,
			id: create_fragment$a.name
		});
	}

	get class() {
		throw new Error("<Table_head>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_head>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table-header.svelte generated by Svelte v4.2.8 */
const file$9 = "src/lib/components/ui/table/table-header.svelte";

function create_fragment$9(ctx) {
	let thead;
	let thead_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let thead_levels = [
		{
			class: thead_class_value = cn("[&_tr]:border-b", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let thead_data = {};

	for (let i = 0; i < thead_levels.length; i += 1) {
		thead_data = assign(thead_data, thead_levels[i]);
	}

	const block = {
		c: function create() {
			thead = element("thead");
			if (default_slot) default_slot.c();
			set_attributes(thead, thead_data);
			add_location(thead, file$9, 11, 0, 187);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, thead, anchor);

			if (default_slot) {
				default_slot.m(thead, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(thead, "click", /*click_handler*/ ctx[4], false, false, false, false),
					listen_dev(thead, "keydown", /*keydown_handler*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(thead, thead_data = get_spread_update(thead_levels, [
				(!current || dirty & /*className*/ 1 && thead_class_value !== (thead_class_value = cn("[&_tr]:border-b", /*className*/ ctx[0]))) && { class: thead_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(thead);
			}

			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_header', slots, ['default']);
	let { class: className = undefined } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots, click_handler, keydown_handler];
}

class Table_header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_header",
			options,
			id: create_fragment$9.name
		});
	}

	get class() {
		throw new Error("<Table_header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/table/table-row.svelte generated by Svelte v4.2.8 */
const file$8 = "src/lib/components/ui/table/table-row.svelte";

function create_fragment$8(ctx) {
	let tr;
	let tr_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let tr_levels = [
		{
			class: tr_class_value = cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let tr_data = {};

	for (let i = 0; i < tr_levels.length; i += 1) {
		tr_data = assign(tr_data, tr_levels[i]);
	}

	const block = {
		c: function create() {
			tr = element("tr");
			if (default_slot) default_slot.c();
			set_attributes(tr, tr_data);
			add_location(tr, file$8, 12, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, tr, anchor);

			if (default_slot) {
				default_slot.m(tr, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(tr, "click", /*click_handler*/ ctx[4], false, false, false, false),
					listen_dev(tr, "keydown", /*keydown_handler*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(tr, tr_data = get_spread_update(tr_levels, [
				(!current || dirty & /*className*/ 1 && tr_class_value !== (tr_class_value = cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", /*className*/ ctx[0]))) && { class: tr_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(tr);
			}

			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Table_row', slots, ['default']);
	let { class: className = undefined } = $$props;

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots, click_handler, keydown_handler];
}

class Table_row extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table_row",
			options,
			id: create_fragment$8.name
		});
	}

	get class() {
		throw new Error("<Table_row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Table_row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Table = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Body: Table_body,
    Caption: Table_caption,
    Cell: Table_cell,
    Footer: Table_footer,
    Head: Table_head,
    Header: Table_header,
    Root: Table$1,
    Row: Table_row,
    Table: Table$1,
    TableBody: Table_body,
    TableCaption: Table_caption,
    TableCell: Table_cell,
    TableFooter: Table_footer,
    TableHead: Table_head,
    TableHeader: Table_header,
    TableRow: Table_row
});

/* src/views/upvote-embed.svelte generated by Svelte v4.2.8 */

const { Error: Error_1 } = globals;
const file$7 = "src/views/upvote-embed.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (50:4) 
function create_header_slot(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "Feedback submitted for upvoting";
			attr_dev(span, "slot", "header");
			add_location(span, file$7, 50, 4, 2067);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_header_slot.name,
		type: "slot",
		source: "(50:4) ",
		ctx
	});

	return block;
}

// (57:28) <Table.Head>
function create_default_slot_10(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Date");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_10.name,
		type: "slot",
		source: "(57:28) <Table.Head>",
		ctx
	});

	return block;
}

// (58:28) <Table.Head>
function create_default_slot_9(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Content");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_9.name,
		type: "slot",
		source: "(58:28) <Table.Head>",
		ctx
	});

	return block;
}

// (59:28) <Table.Head>
function create_default_slot_8(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Vote");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_8.name,
		type: "slot",
		source: "(59:28) <Table.Head>",
		ctx
	});

	return block;
}

// (56:24) <Table.Row>
function create_default_slot_7(ctx) {
	let table_head0;
	let t0;
	let table_head1;
	let t1;
	let table_head2;
	let current;

	table_head0 = new Table_head({
			props: {
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	table_head1 = new Table_head({
			props: {
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	table_head2 = new Table_head({
			props: {
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(table_head0.$$.fragment);
			t0 = space();
			create_component(table_head1.$$.fragment);
			t1 = space();
			create_component(table_head2.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(table_head0, target, anchor);
			insert_dev(target, t0, anchor);
			mount_component(table_head1, target, anchor);
			insert_dev(target, t1, anchor);
			mount_component(table_head2, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const table_head0_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				table_head0_changes.$$scope = { dirty, ctx };
			}

			table_head0.$set(table_head0_changes);
			const table_head1_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				table_head1_changes.$$scope = { dirty, ctx };
			}

			table_head1.$set(table_head1_changes);
			const table_head2_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				table_head2_changes.$$scope = { dirty, ctx };
			}

			table_head2.$set(table_head2_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(table_head0.$$.fragment, local);
			transition_in(table_head1.$$.fragment, local);
			transition_in(table_head2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(table_head0.$$.fragment, local);
			transition_out(table_head1.$$.fragment, local);
			transition_out(table_head2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t0);
				detach_dev(t1);
			}

			destroy_component(table_head0, detaching);
			destroy_component(table_head1, detaching);
			destroy_component(table_head2, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_7.name,
		type: "slot",
		source: "(56:24) <Table.Row>",
		ctx
	});

	return block;
}

// (55:20) <Table.Header>
function create_default_slot_6(ctx) {
	let table_row;
	let current;

	table_row = new Table_row({
			props: {
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(table_row.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(table_row, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const table_row_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				table_row_changes.$$scope = { dirty, ctx };
			}

			table_row.$set(table_row_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(table_row.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(table_row.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(table_row, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_6.name,
		type: "slot",
		source: "(55:20) <Table.Header>",
		ctx
	});

	return block;
}

// (65:32) <Table.Cell>
function create_default_slot_5$1(ctx) {
	let t_value = new Date(/*feedback*/ ctx[8].createdAt).toLocaleDateString() + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*feedbacks*/ 8 && t_value !== (t_value = new Date(/*feedback*/ ctx[8].createdAt).toLocaleDateString() + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5$1.name,
		type: "slot",
		source: "(65:32) <Table.Cell>",
		ctx
	});

	return block;
}

// (66:32) <Table.Cell>
function create_default_slot_4$1(ctx) {
	let t_value = /*feedback*/ ctx[8].content + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*feedbacks*/ 8 && t_value !== (t_value = /*feedback*/ ctx[8].content + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4$1.name,
		type: "slot",
		source: "(66:32) <Table.Cell>",
		ctx
	});

	return block;
}

// (77:40) {:else}
function create_else_block_1(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "fill", "#afafaf");
			attr_dev(path, "d", "M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z");
			add_location(path, file$7, 78, 127, 4200);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$7, 78, 44, 4117);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svg);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(77:40) {:else}",
		ctx
	});

	return block;
}

// (69:40) {#if sdk.isConnected()}
function create_if_block$1(ctx) {
	let show_if;
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*feedbacks*/ 8) show_if = null;
		if (show_if == null) show_if = !!/*userAlreadyVoted*/ ctx[5](/*feedback*/ ctx[8]);
		if (show_if) return create_if_block_1$1;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if_block.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(69:40) {#if sdk.isConnected()}",
		ctx
	});

	return block;
}

// (72:44) {:else}
function create_else_block(ctx) {
	let button;
	let svg;
	let path;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[6](/*feedback*/ ctx[8]);
	}

	const block = {
		c: function create() {
			button = element("button");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "fill", "currentColor");
			attr_dev(path, "d", "M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z");
			add_location(path, file$7, 74, 135, 3694);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$7, 74, 52, 3611);
			attr_dev(button, "type", "button");
			add_location(button, file$7, 73, 48, 3499);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, svg);
			append_dev(svg, path);

			if (!mounted) {
				dispose = listen_dev(button, "click", click_handler, false, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(button);
			}

			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(72:44) {:else}",
		ctx
	});

	return block;
}

// (70:44) {#if userAlreadyVoted(feedback)}
function create_if_block_1$1(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "fill", "currentColor");
			attr_dev(path, "d", "m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z");
			add_location(path, file$7, 71, 131, 3297);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$7, 71, 48, 3214);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svg);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(70:44) {#if userAlreadyVoted(feedback)}",
		ctx
	});

	return block;
}

// (67:32) <Table.Cell class="text-center">
function create_default_slot_3$1(ctx) {
	let span0;
	let show_if;
	let t0;
	let span1;
	let t1_value = /*feedback*/ ctx[8].vote + "";
	let t1;

	function select_block_type(ctx, dirty) {
		if (dirty & /*sdk*/ 4) show_if = null;
		if (show_if == null) show_if = !!/*sdk*/ ctx[2].isConnected();
		if (show_if) return create_if_block$1;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			span0 = element("span");
			if_block.c();
			t0 = space();
			span1 = element("span");
			t1 = text(t1_value);
			attr_dev(span0, "class", "w-full");
			add_location(span0, file$7, 68, 36, 3003);
			attr_dev(span1, "class", "w-full mt-3");
			add_location(span1, file$7, 81, 36, 4544);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span0, anchor);
			if_block.m(span0, null);
			insert_dev(target, t0, anchor);
			insert_dev(target, span1, anchor);
			append_dev(span1, t1);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(span0, null);
				}
			}

			if (dirty & /*feedbacks*/ 8 && t1_value !== (t1_value = /*feedback*/ ctx[8].vote + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span0);
				detach_dev(t0);
				detach_dev(span1);
			}

			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3$1.name,
		type: "slot",
		source: "(67:32) <Table.Cell class=\\\"text-center\\\">",
		ctx
	});

	return block;
}

// (64:28) <Table.Row>
function create_default_slot_2$1(ctx) {
	let table_cell0;
	let t0;
	let table_cell1;
	let t1;
	let table_cell2;
	let t2;
	let current;

	table_cell0 = new Table_cell({
			props: {
				$$slots: { default: [create_default_slot_5$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	table_cell1 = new Table_cell({
			props: {
				$$slots: { default: [create_default_slot_4$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	table_cell2 = new Table_cell({
			props: {
				class: "text-center",
				$$slots: { default: [create_default_slot_3$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(table_cell0.$$.fragment);
			t0 = space();
			create_component(table_cell1.$$.fragment);
			t1 = space();
			create_component(table_cell2.$$.fragment);
			t2 = space();
		},
		m: function mount(target, anchor) {
			mount_component(table_cell0, target, anchor);
			insert_dev(target, t0, anchor);
			mount_component(table_cell1, target, anchor);
			insert_dev(target, t1, anchor);
			mount_component(table_cell2, target, anchor);
			insert_dev(target, t2, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const table_cell0_changes = {};

			if (dirty & /*$$scope, feedbacks*/ 2056) {
				table_cell0_changes.$$scope = { dirty, ctx };
			}

			table_cell0.$set(table_cell0_changes);
			const table_cell1_changes = {};

			if (dirty & /*$$scope, feedbacks*/ 2056) {
				table_cell1_changes.$$scope = { dirty, ctx };
			}

			table_cell1.$set(table_cell1_changes);
			const table_cell2_changes = {};

			if (dirty & /*$$scope, feedbacks, sdk*/ 2060) {
				table_cell2_changes.$$scope = { dirty, ctx };
			}

			table_cell2.$set(table_cell2_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(table_cell0.$$.fragment, local);
			transition_in(table_cell1.$$.fragment, local);
			transition_in(table_cell2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(table_cell0.$$.fragment, local);
			transition_out(table_cell1.$$.fragment, local);
			transition_out(table_cell2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t0);
				detach_dev(t1);
				detach_dev(t2);
			}

			destroy_component(table_cell0, detaching);
			destroy_component(table_cell1, detaching);
			destroy_component(table_cell2, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2$1.name,
		type: "slot",
		source: "(64:28) <Table.Row>",
		ctx
	});

	return block;
}

// (63:24) {#each feedbacks as feedback (feedback.id)}
function create_each_block(key_1, ctx) {
	let first;
	let table_row;
	let current;

	table_row = new Table_row({
			props: {
				$$slots: { default: [create_default_slot_2$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = empty();
			create_component(table_row.$$.fragment);
			this.first = first;
		},
		m: function mount(target, anchor) {
			insert_dev(target, first, anchor);
			mount_component(table_row, target, anchor);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const table_row_changes = {};

			if (dirty & /*$$scope, feedbacks, sdk*/ 2060) {
				table_row_changes.$$scope = { dirty, ctx };
			}

			table_row.$set(table_row_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(table_row.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(table_row.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(first);
			}

			destroy_component(table_row, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(63:24) {#each feedbacks as feedback (feedback.id)}",
		ctx
	});

	return block;
}

// (62:20) <Table.Body>
function create_default_slot_1$1(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = ensure_array_like_dev(/*feedbacks*/ ctx[3]);
	const get_key = ctx => /*feedback*/ ctx[8].id;
	validate_each_keys(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*feedbacks, userAlreadyVoted, upvote, sdk, Date*/ 60) {
				each_value = ensure_array_like_dev(/*feedbacks*/ ctx[3]);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(each_1_anchor);
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$1.name,
		type: "slot",
		source: "(62:20) <Table.Body>",
		ctx
	});

	return block;
}

// (54:16) <Table.Root>
function create_default_slot$1(ctx) {
	let table_header;
	let t;
	let table_body;
	let current;

	table_header = new Table_header({
			props: {
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	table_body = new Table_body({
			props: {
				$$slots: { default: [create_default_slot_1$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(table_header.$$.fragment);
			t = space();
			create_component(table_body.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(table_header, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(table_body, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const table_header_changes = {};

			if (dirty & /*$$scope*/ 2048) {
				table_header_changes.$$scope = { dirty, ctx };
			}

			table_header.$set(table_header_changes);
			const table_body_changes = {};

			if (dirty & /*$$scope, feedbacks, sdk*/ 2060) {
				table_body_changes.$$scope = { dirty, ctx };
			}

			table_body.$set(table_body_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(table_header.$$.fragment, local);
			transition_in(table_body.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(table_header.$$.fragment, local);
			transition_out(table_body.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}

			destroy_component(table_header, detaching);
			destroy_component(table_body, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(54:16) <Table.Root>",
		ctx
	});

	return block;
}

// (51:4) 
function create_body_slot(ctx) {
	let div2;
	let div1;
	let div0;
	let table_root;
	let current;

	table_root = new Table$1({
			props: {
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			create_component(table_root.$$.fragment);
			attr_dev(div0, "class", "rounded-md border");
			add_location(div0, file$7, 53, 12, 2192);
			attr_dev(div1, "class", "space-y-4");
			add_location(div1, file$7, 52, 8, 2156);
			attr_dev(div2, "slot", "body");
			add_location(div2, file$7, 51, 4, 2130);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			mount_component(table_root, div0, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const table_root_changes = {};

			if (dirty & /*$$scope, feedbacks, sdk*/ 2060) {
				table_root_changes.$$scope = { dirty, ctx };
			}

			table_root.$set(table_root_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(table_root.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(table_root.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div2);
			}

			destroy_component(table_root);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_body_slot.name,
		type: "slot",
		source: "(51:4) ",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				open: /*open*/ ctx[0],
				onClose: /*onClose*/ ctx[1],
				$$slots: {
					body: [create_body_slot],
					header: [create_header_slot]
				},
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};
			if (dirty & /*open*/ 1) modal_changes.open = /*open*/ ctx[0];
			if (dirty & /*onClose*/ 2) modal_changes.onClose = /*onClose*/ ctx[1];

			if (dirty & /*$$scope, feedbacks, sdk*/ 2060) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Upvote_embed', slots, []);

	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	let { open = false } = $$props;
	let { onClose } = $$props;
	let { sdk } = $$props;
	let feedbacks = [];

	onMount(() => __awaiter(void 0, void 0, void 0, function* () {
		$$invalidate(3, feedbacks = yield sdk.listVotingFeedbacks());
	}));

	const upvote = feedbackId => __awaiter(void 0, void 0, void 0, function* () {
		const responseOk = yield sdk.upvote(feedbackId);

		if (responseOk) {
			const feedback = feedbacks.find(f => f.id === feedbackId);

			if (!feedback) {
				throw new Error('Internal error');
			}

			const currentUser = sdk.getLoggedUser();

			feedback.customersVote = [
				...feedback.customersVote,
				{
					id: '',
					externalId: currentUser.id,
					email: currentUser.email,
					logoUrl: currentUser.logoUrl
				}
			];

			feedback.vote++;
			$$invalidate(3, feedbacks = [...feedbacks.filter(f => f.id !== feedbackId), feedback]);
		}
	});

	const userAlreadyVoted = feedback => {
		return !!feedback.customersVote.find(customer => {
			var _a;

			return customer.externalId === ((_a = sdk.getLoggedUser()) === null || _a === void 0
			? void 0
			: _a.id);
		});
	};

	$$self.$$.on_mount.push(function () {
		if (onClose === undefined && !('onClose' in $$props || $$self.$$.bound[$$self.$$.props['onClose']])) {
			console.warn("<Upvote_embed> was created without expected prop 'onClose'");
		}

		if (sdk === undefined && !('sdk' in $$props || $$self.$$.bound[$$self.$$.props['sdk']])) {
			console.warn("<Upvote_embed> was created without expected prop 'sdk'");
		}
	});

	const writable_props = ['open', 'onClose', 'sdk'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Upvote_embed> was created with unknown prop '${key}'`);
	});

	const click_handler = feedback => upvote(feedback.id);

	$$self.$$set = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('sdk' in $$props) $$invalidate(2, sdk = $$props.sdk);
	};

	$$self.$capture_state = () => ({
		__awaiter,
		Modal,
		onMount,
		Table,
		open,
		onClose,
		sdk,
		feedbacks,
		upvote,
		userAlreadyVoted
	});

	$$self.$inject_state = $$props => {
		if ('__awaiter' in $$props) __awaiter = $$props.__awaiter;
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('sdk' in $$props) $$invalidate(2, sdk = $$props.sdk);
		if ('feedbacks' in $$props) $$invalidate(3, feedbacks = $$props.feedbacks);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [open, onClose, sdk, feedbacks, upvote, userAlreadyVoted, click_handler];
}

class Upvote_embed extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, { open: 0, onClose: 1, sdk: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Upvote_embed",
			options,
			id: create_fragment$7.name
		});
	}

	get open() {
		throw new Error_1("<Upvote_embed>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set open(value) {
		throw new Error_1("<Upvote_embed>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get onClose() {
		throw new Error_1("<Upvote_embed>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set onClose(value) {
		throw new Error_1("<Upvote_embed>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sdk() {
		throw new Error_1("<Upvote_embed>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sdk(value) {
		throw new Error_1("<Upvote_embed>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/card/card.svelte generated by Svelte v4.2.8 */
const file$6 = "src/lib/components/ui/card/card.svelte";

function create_fragment$6(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let div_levels = [
		{
			class: div_class_value = cn("rounded-lg border bg-card text-card-foreground shadow-sm", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$6, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = cn("rounded-lg border bg-card text-card-foreground shadow-sm", /*className*/ ctx[0]))) && { class: div_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Card', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

let Card$1 = class Card extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Card",
			options,
			id: create_fragment$6.name
		});
	}

	get class() {
		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
};

/* src/lib/components/ui/card/card-content.svelte generated by Svelte v4.2.8 */
const file$5 = "src/lib/components/ui/card/card-content.svelte";

function create_fragment$5(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let div_levels = [
		{
			class: div_class_value = cn("p-6 pt-0", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$5, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = cn("p-6 pt-0", /*className*/ ctx[0]))) && { class: div_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Card_content', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Card_content extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Card_content",
			options,
			id: create_fragment$5.name
		});
	}

	get class() {
		throw new Error("<Card_content>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Card_content>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/card/card-description.svelte generated by Svelte v4.2.8 */
const file$4 = "src/lib/components/ui/card/card-description.svelte";

function create_fragment$4(ctx) {
	let p;
	let p_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let p_levels = [
		{
			class: p_class_value = cn("text-sm text-muted-foreground", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let p_data = {};

	for (let i = 0; i < p_levels.length; i += 1) {
		p_data = assign(p_data, p_levels[i]);
	}

	const block = {
		c: function create() {
			p = element("p");
			if (default_slot) default_slot.c();
			set_attributes(p, p_data);
			add_location(p, file$4, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);

			if (default_slot) {
				default_slot.m(p, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(p, p_data = get_spread_update(p_levels, [
				(!current || dirty & /*className*/ 1 && p_class_value !== (p_class_value = cn("text-sm text-muted-foreground", /*className*/ ctx[0]))) && { class: p_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(p);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Card_description', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Card_description extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Card_description",
			options,
			id: create_fragment$4.name
		});
	}

	get class() {
		throw new Error("<Card_description>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Card_description>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/card/card-footer.svelte generated by Svelte v4.2.8 */
const file$3 = "src/lib/components/ui/card/card-footer.svelte";

function create_fragment$3(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let div_levels = [
		{
			class: div_class_value = cn("flex items-center p-6 pt-0", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$3, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = cn("flex items-center p-6 pt-0", /*className*/ ctx[0]))) && { class: div_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Card_footer', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Card_footer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Card_footer",
			options,
			id: create_fragment$3.name
		});
	}

	get class() {
		throw new Error("<Card_footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Card_footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/card/card-header.svelte generated by Svelte v4.2.8 */
const file$2 = "src/lib/components/ui/card/card-header.svelte";

function create_fragment$2(ctx) {
	let div;
	let div_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	let div_levels = [
		{
			class: div_class_value = cn("flex flex-col space-y-1.5 p-6", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[1]
	];

	let div_data = {};

	for (let i = 0; i < div_levels.length; i += 1) {
		div_data = assign(div_data, div_levels[i]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			set_attributes(div, div_data);
			add_location(div, file$2, 10, 0, 120);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			set_attributes(div, div_data = get_spread_update(div_levels, [
				(!current || dirty & /*className*/ 1 && div_class_value !== (div_class_value = cn("flex flex-col space-y-1.5 p-6", /*className*/ ctx[0]))) && { class: div_class_value },
				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	const omit_props_names = ["class"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Card_header', slots, ['default']);
	let { class: className = undefined } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('$$scope' in $$new_props) $$invalidate(2, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, $$restProps, $$scope, slots];
}

class Card_header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, { class: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Card_header",
			options,
			id: create_fragment$2.name
		});
	}

	get class() {
		throw new Error("<Card_header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Card_header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/lib/components/ui/card/card-title.svelte generated by Svelte v4.2.8 */
const file$1 = "src/lib/components/ui/card/card-title.svelte";

// (7:0) <svelte:element  this={tag}  class={cn("text-lg font-semibold leading-none tracking-tight", className)}  {...$$restProps} >
function create_dynamic_element(ctx) {
	let svelte_element;
	let svelte_element_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	let svelte_element_levels = [
		{
			class: svelte_element_class_value = cn("text-lg font-semibold leading-none tracking-tight", /*className*/ ctx[0])
		},
		/*$$restProps*/ ctx[2]
	];

	let svelte_element_data = {};

	for (let i = 0; i < svelte_element_levels.length; i += 1) {
		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
	}

	const block = {
		c: function create() {
			svelte_element = element(/*tag*/ ctx[1]);
			if (default_slot) default_slot.c();
			set_dynamic_element_data(/*tag*/ ctx[1])(svelte_element, svelte_element_data);
			add_location(svelte_element, file$1, 14, 0, 143);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_element, anchor);

			if (default_slot) {
				default_slot.m(svelte_element, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}

			set_dynamic_element_data(/*tag*/ ctx[1])(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
				(!current || dirty & /*className*/ 1 && svelte_element_class_value !== (svelte_element_class_value = cn("text-lg font-semibold leading-none tracking-tight", /*className*/ ctx[0]))) && { class: svelte_element_class_value },
				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
			]));
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element);
			}

			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_dynamic_element.name,
		type: "child_dynamic_element",
		source: "(7:0) <svelte:element  this={tag}  class={cn(\\\"text-lg font-semibold leading-none tracking-tight\\\", className)}  {...$$restProps} >",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let previous_tag = /*tag*/ ctx[1];
	let svelte_element_anchor;
	let current;
	validate_dynamic_element(/*tag*/ ctx[1]);
	validate_void_dynamic_element(/*tag*/ ctx[1]);
	let svelte_element = /*tag*/ ctx[1] && create_dynamic_element(ctx);

	const block = {
		c: function create() {
			if (svelte_element) svelte_element.c();
			svelte_element_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (svelte_element) svelte_element.m(target, anchor);
			insert_dev(target, svelte_element_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*tag*/ ctx[1]) {
				if (!previous_tag) {
					svelte_element = create_dynamic_element(ctx);
					previous_tag = /*tag*/ ctx[1];
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else if (safe_not_equal(previous_tag, /*tag*/ ctx[1])) {
					svelte_element.d(1);
					validate_dynamic_element(/*tag*/ ctx[1]);
					validate_void_dynamic_element(/*tag*/ ctx[1]);
					svelte_element = create_dynamic_element(ctx);
					previous_tag = /*tag*/ ctx[1];
					svelte_element.c();
					svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
				} else {
					svelte_element.p(ctx, dirty);
				}
			} else if (previous_tag) {
				svelte_element.d(1);
				svelte_element = null;
				previous_tag = /*tag*/ ctx[1];
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(svelte_element, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(svelte_element, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(svelte_element_anchor);
			}

			if (svelte_element) svelte_element.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	const omit_props_names = ["class","tag"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Card_title', slots, ['default']);
	let { class: className = undefined } = $$props;
	let { tag = "h3" } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('class' in $$new_props) $$invalidate(0, className = $$new_props.class);
		if ('tag' in $$new_props) $$invalidate(1, tag = $$new_props.tag);
		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({ cn, className, tag });

	$$self.$inject_state = $$new_props => {
		if ('className' in $$props) $$invalidate(0, className = $$new_props.className);
		if ('tag' in $$props) $$invalidate(1, tag = $$new_props.tag);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [className, tag, $$restProps, $$scope, slots];
}

class Card_title extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { class: 0, tag: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Card_title",
			options,
			id: create_fragment$1.name
		});
	}

	get class() {
		throw new Error("<Card_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Card_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get tag() {
		throw new Error("<Card_title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set tag(value) {
		throw new Error("<Card_title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var Card = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Card: Card$1,
    CardContent: Card_content,
    CardDescription: Card_description,
    CardFooter: Card_footer,
    CardHeader: Card_header,
    CardTitle: Card_title,
    Content: Card_content,
    Description: Card_description,
    Footer: Card_footer,
    Header: Card_header,
    Root: Card$1,
    Title: Card_title
});

/* src/views/default-embed.svelte generated by Svelte v4.2.8 */

const { Object: Object_1 } = globals;
const file = "src/views/default-embed.svelte";

// (39:4) <Button variant="outline" class="ih-button-container h-auto" on:click={toggleEmbedContainer}>
function create_default_slot_5(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "FEEDBACK";
			attr_dev(span, "class", "ih-button-text svelte-1dowtqe");
			add_location(span, file, 41, 8, 1885);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_5.name,
		type: "slot",
		source: "(39:4) <Button variant=\\\"outline\\\" class=\\\"ih-button-container h-auto\\\" on:click={toggleEmbedContainer}>",
		ctx
	});

	return block;
}

// (45:12) {#if embedContainerOpen}
function create_if_block_2(ctx) {
	let div;
	let card_content;
	let div_intro;
	let t;
	let card_footer;
	let current;

	card_content = new Card_content({
			props: {
				class: "flex-col flex p-4",
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	card_footer = new Card_footer({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(card_content.$$.fragment);
			t = space();
			create_component(card_footer.$$.fragment);
			add_location(div, file, 47, 16, 2028);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(card_content, div, null);
			insert_dev(target, t, anchor);
			mount_component(card_footer, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const card_content_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				card_content_changes.$$scope = { dirty, ctx };
			}

			card_content.$set(card_content_changes);
			const card_footer_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				card_footer_changes.$$scope = { dirty, ctx };
			}

			card_footer.$set(card_footer_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(card_content.$$.fragment, local);

			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, fly, { x: 100, duration: 500 });
						div_intro.start();
					});
				}
			}

			transition_in(card_footer.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(card_content.$$.fragment, local);
			transition_out(card_footer.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
				detach_dev(t);
			}

			destroy_component(card_content);
			destroy_component(card_footer, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(45:12) {#if embedContainerOpen}",
		ctx
	});

	return block;
}

// (48:24) <Button on:click={toggleFeedbackModal} type="button" class="py-2 px-4 mt-4 mx-4">
function create_default_slot_4(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Add feedback");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_4.name,
		type: "slot",
		source: "(48:24) <Button on:click={toggleFeedbackModal} type=\\\"button\\\" class=\\\"py-2 px-4 mt-4 mx-4\\\">",
		ctx
	});

	return block;
}

// (49:24) <Button on:click={toggleUpvoteModal} type="button" class="py-2 px-4 mt-4 mx-4">
function create_default_slot_3(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("show backlogs");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_3.name,
		type: "slot",
		source: "(49:24) <Button on:click={toggleUpvoteModal} type=\\\"button\\\" class=\\\"py-2 px-4 mt-4 mx-4\\\">",
		ctx
	});

	return block;
}

// (47:20) <Card.Content class="flex-col flex p-4">
function create_default_slot_2(ctx) {
	let button0;
	let t;
	let button1;
	let current;

	button0 = new Button({
			props: {
				type: "button",
				class: "py-2 px-4 mt-4 mx-4",
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button0.$on("click", /*toggleFeedbackModal*/ ctx[6]);

	button1 = new Button({
			props: {
				type: "button",
				class: "py-2 px-4 mt-4 mx-4",
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button1.$on("click", /*toggleUpvoteModal*/ ctx[7]);

	const block = {
		c: function create() {
			create_component(button0.$$.fragment);
			t = space();
			create_component(button1.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(button0, target, anchor);
			insert_dev(target, t, anchor);
			mount_component(button1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const button0_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				button0_changes.$$scope = { dirty, ctx };
			}

			button0.$set(button0_changes);
			const button1_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				button1_changes.$$scope = { dirty, ctx };
			}

			button1.$set(button1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t);
			}

			destroy_component(button0, detaching);
			destroy_component(button1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(47:20) <Card.Content class=\\\"flex-col flex p-4\\\">",
		ctx
	});

	return block;
}

// (52:16) <Card.Footer>
function create_default_slot_1(ctx) {
	let t0;
	let a;
	let u;

	const block = {
		c: function create() {
			t0 = text("Powered by ");
			a = element("a");
			u = element("u");
			u.textContent = "Insight hunt";
			add_location(u, file, 54, 55, 2527);
			attr_dev(a, "href", /*homepageUrl*/ ctx[4]);
			add_location(a, file, 54, 31, 2503);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, a, anchor);
			append_dev(a, u);
		},
		p: noop$1,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(t0);
				detach_dev(a);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(52:16) <Card.Footer>",
		ctx
	});

	return block;
}

// (44:8) <Card.Root>
function create_default_slot(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*embedContainerOpen*/ ctx[1] && create_if_block_2(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*embedContainerOpen*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*embedContainerOpen*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(if_block_anchor);
			}

			if (if_block) if_block.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(44:8) <Card.Root>",
		ctx
	});

	return block;
}

// (59:0) {#if feedbackModalOpen}
function create_if_block_1(ctx) {
	let feedbackform;
	let current;

	feedbackform = new Feedback_form({
			props: {
				onSubmit: /*addFeedback*/ ctx[8],
				open: /*feedbackModalOpen*/ ctx[2],
				onClose: /*toggleFeedbackModal*/ ctx[6],
				email: /*sdk*/ ctx[0].getLoggedUser()?.email
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(feedbackform.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(feedbackform, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const feedbackform_changes = {};
			if (dirty & /*feedbackModalOpen*/ 4) feedbackform_changes.open = /*feedbackModalOpen*/ ctx[2];
			if (dirty & /*sdk*/ 1) feedbackform_changes.email = /*sdk*/ ctx[0].getLoggedUser()?.email;
			feedbackform.$set(feedbackform_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(feedbackform.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(feedbackform.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(feedbackform, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(59:0) {#if feedbackModalOpen}",
		ctx
	});

	return block;
}

// (62:0) {#if upvoteModalOpen}
function create_if_block(ctx) {
	let upvoteembed;
	let current;

	upvoteembed = new Upvote_embed({
			props: {
				sdk: /*sdk*/ ctx[0],
				open: /*upvoteModalOpen*/ ctx[3],
				onClose: /*toggleUpvoteModal*/ ctx[7]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(upvoteembed.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(upvoteembed, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const upvoteembed_changes = {};
			if (dirty & /*sdk*/ 1) upvoteembed_changes.sdk = /*sdk*/ ctx[0];
			if (dirty & /*upvoteModalOpen*/ 8) upvoteembed_changes.open = /*upvoteModalOpen*/ ctx[3];
			upvoteembed.$set(upvoteembed_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(upvoteembed.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(upvoteembed.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(upvoteembed, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(62:0) {#if upvoteModalOpen}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div1;
	let button;
	let t0;
	let div0;
	let card_root;
	let t1;
	let t2;
	let if_block1_anchor;
	let current;

	button = new Button({
			props: {
				variant: "outline",
				class: "ih-button-container h-auto",
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button.$on("click", /*toggleEmbedContainer*/ ctx[5]);

	card_root = new Card$1({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	let if_block0 = /*feedbackModalOpen*/ ctx[2] && create_if_block_1(ctx);
	let if_block1 = /*upvoteModalOpen*/ ctx[3] && create_if_block(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			create_component(button.$$.fragment);
			t0 = space();
			div0 = element("div");
			create_component(card_root.$$.fragment);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			add_location(div0, file, 44, 4, 1949);
			attr_dev(div1, "class", "ih-container svelte-1dowtqe");
			add_location(div1, file, 39, 0, 1752);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			mount_component(button, div1, null);
			append_dev(div1, t0);
			append_dev(div1, div0);
			mount_component(card_root, div0, null);
			insert_dev(target, t1, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const button_changes = {};

			if (dirty & /*$$scope*/ 1024) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
			const card_root_changes = {};

			if (dirty & /*$$scope, embedContainerOpen*/ 1026) {
				card_root_changes.$$scope = { dirty, ctx };
			}

			card_root.$set(card_root_changes);

			if (/*feedbackModalOpen*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*feedbackModalOpen*/ 4) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t2.parentNode, t2);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*upvoteModalOpen*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*upvoteModalOpen*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			transition_in(card_root.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			transition_out(card_root.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div1);
				detach_dev(t1);
				detach_dev(t2);
				detach_dev(if_block1_anchor);
			}

			destroy_component(button);
			destroy_component(card_root);
			if (if_block0) if_block0.d(detaching);
			if (if_block1) if_block1.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Default_embed', slots, []);

	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	const homepageUrl = getHomepage("development" );
	let { sdk } = $$props;
	let embedContainerOpen = false;
	let feedbackModalOpen = false;
	let upvoteModalOpen = false;

	const toggleEmbedContainer = () => {
		$$invalidate(1, embedContainerOpen = !embedContainerOpen);
	};

	const toggleFeedbackModal = () => {
		$$invalidate(2, feedbackModalOpen = !feedbackModalOpen);
	};

	const toggleUpvoteModal = () => {
		$$invalidate(3, upvoteModalOpen = !upvoteModalOpen);
	};

	const addFeedback = data => __awaiter(void 0, void 0, void 0, function* () {
		// TODO manage error
		yield sdk.addFeedback(Object.assign(Object.assign({}, data), {
			url: window.location.href,
			language: Intl.DateTimeFormat().resolvedOptions().locale
		}));

		toggleFeedbackModal();
	});

	$$self.$$.on_mount.push(function () {
		if (sdk === undefined && !('sdk' in $$props || $$self.$$.bound[$$self.$$.props['sdk']])) {
			console.warn("<Default_embed> was created without expected prop 'sdk'");
		}
	});

	const writable_props = ['sdk'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Default_embed> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('sdk' in $$props) $$invalidate(0, sdk = $$props.sdk);
	};

	$$self.$capture_state = () => ({
		__awaiter,
		fly,
		FeedbackForm: Feedback_form,
		UpvoteEmbed: Upvote_embed,
		getHomepage,
		homepageUrl,
		Button,
		Card,
		sdk,
		embedContainerOpen,
		feedbackModalOpen,
		upvoteModalOpen,
		toggleEmbedContainer,
		toggleFeedbackModal,
		toggleUpvoteModal,
		addFeedback
	});

	$$self.$inject_state = $$props => {
		if ('__awaiter' in $$props) __awaiter = $$props.__awaiter;
		if ('sdk' in $$props) $$invalidate(0, sdk = $$props.sdk);
		if ('embedContainerOpen' in $$props) $$invalidate(1, embedContainerOpen = $$props.embedContainerOpen);
		if ('feedbackModalOpen' in $$props) $$invalidate(2, feedbackModalOpen = $$props.feedbackModalOpen);
		if ('upvoteModalOpen' in $$props) $$invalidate(3, upvoteModalOpen = $$props.upvoteModalOpen);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		sdk,
		embedContainerOpen,
		feedbackModalOpen,
		upvoteModalOpen,
		homepageUrl,
		toggleEmbedContainer,
		toggleFeedbackModal,
		toggleUpvoteModal,
		addFeedback
	];
}

class Default_embed extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance, create_fragment, safe_not_equal, { sdk: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Default_embed",
			options,
			id: create_fragment.name
		});
	}

	get sdk() {
		throw new Error("<Default_embed>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sdk(value) {
		throw new Error("<Default_embed>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

let sdk;
function init(config) {
    return __awaiter(this, void 0, void 0, function* () {
        sdk = new InsightHuntSDK(config);
        yield sdk.initCheck();
    });
}
function setUpFeedbackContainer() {
    const container = document.createElement('div');
    container.setAttribute('id', 'insight-hunt-container');
    document.body.append(container);
    new Default_embed({
        target: container,
        props: {
            sdk,
        }
    });
}
function userLogged(user) {
    return __awaiter(this, void 0, void 0, function* () {
        sdk.setAuthUser(user);
    });
}
function disconnectUser() {
    return __awaiter(this, void 0, void 0, function* () {
        sdk.logoutUser();
    });
}

export { disconnectUser, init, setUpFeedbackContainer, userLogged };
//# sourceMappingURL=bundle.esm.js.map
