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
function noop() {}

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

/** @param {number | string} value
 * @returns {[number, string]}
 */
function split_css_unit(value) {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
}

const is_client = typeof window !== 'undefined';

/** @type {() => number} */
let now = is_client ? () => window.performance.now() : () => Date.now();

let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

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
 * @returns {void} */
function select_option(select, value, mounting) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];
		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
	if (!mounting || value !== undefined) {
		select.selectedIndex = -1; // no option should be selected
	}
}

function select_value(select) {
	const selected_option = select.querySelector(':checked');
	return selected_option && selected_option.__value;
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

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
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
			tick = noop,
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

// keyed each functions:

/** @returns {void} */
function destroy_block(block, lookup) {
	block.d(1);
	lookup.delete(block.key);
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
		update: noop,
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
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
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

/* src/views/component/modal.svelte generated by Svelte v4.2.8 */
const file$3 = "src/views/component/modal.svelte";
const get_footer_slot_changes = dirty => ({});
const get_footer_slot_context = ctx => ({});
const get_body_slot_changes = dirty => ({});
const get_body_slot_context = ctx => ({});
const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

function create_fragment$3(ctx) {
	let div4;
	let div3;
	let div0;
	let t0;
	let button;
	let svg;
	let path;
	let t1;
	let hr;
	let t2;
	let div1;
	let t3;
	let div2;
	let div3_class_value;
	let div4_class_value;
	let current;
	let mounted;
	let dispose;
	const header_slot_template = /*#slots*/ ctx[4].header;
	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[3], get_header_slot_context);
	const body_slot_template = /*#slots*/ ctx[4].body;
	const body_slot = create_slot(body_slot_template, ctx, /*$$scope*/ ctx[3], get_body_slot_context);
	const footer_slot_template = /*#slots*/ ctx[4].footer;
	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[3], get_footer_slot_context);

	const block = {
		c: function create() {
			div4 = element("div");
			div3 = element("div");
			div0 = element("div");
			if (header_slot) header_slot.c();
			t0 = space();
			button = element("button");
			svg = svg_element("svg");
			path = svg_element("path");
			t1 = space();
			hr = element("hr");
			t2 = space();
			div1 = element("div");
			if (body_slot) body_slot.c();
			t3 = space();
			div2 = element("div");
			if (footer_slot) footer_slot.c();
			attr_dev(path, "fill", "currentColor");
			attr_dev(path, "d", "m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z");
			add_location(path, file$3, 10, 122, 400);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$3, 10, 39, 317);
			add_location(button, file$3, 10, 12, 290);
			attr_dev(div0, "class", "ih-modal-header svelte-1mdx2cg");
			add_location(div0, file$3, 8, 8, 213);
			add_location(hr, file$3, 12, 8, 582);
			attr_dev(div1, "class", "ih-modal-body svelte-1mdx2cg");
			add_location(div1, file$3, 15, 8, 626);
			attr_dev(div2, "class", "ih-modal-footer svelte-1mdx2cg");
			add_location(div2, file$3, 20, 8, 741);
			attr_dev(div3, "class", div3_class_value = "ih-modal-content-" + /*contentWidth*/ ctx[2] + " svelte-1mdx2cg");
			add_location(div3, file$3, 7, 4, 159);
			attr_dev(div4, "class", div4_class_value = "" + ((/*open*/ ctx[0] ? '' : 'hidden') + " ih-modal" + " svelte-1mdx2cg"));
			add_location(div4, file$3, 6, 0, 109);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div4, anchor);
			append_dev(div4, div3);
			append_dev(div3, div0);

			if (header_slot) {
				header_slot.m(div0, null);
			}

			append_dev(div0, t0);
			append_dev(div0, button);
			append_dev(button, svg);
			append_dev(svg, path);
			append_dev(div3, t1);
			append_dev(div3, hr);
			append_dev(div3, t2);
			append_dev(div3, div1);

			if (body_slot) {
				body_slot.m(div1, null);
			}

			append_dev(div3, t3);
			append_dev(div3, div2);

			if (footer_slot) {
				footer_slot.m(div2, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(
					button,
					"click",
					function () {
						if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
					},
					false,
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (header_slot) {
				if (header_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						header_slot,
						header_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[3], dirty, get_header_slot_changes),
						get_header_slot_context
					);
				}
			}

			if (body_slot) {
				if (body_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						body_slot,
						body_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(body_slot_template, /*$$scope*/ ctx[3], dirty, get_body_slot_changes),
						get_body_slot_context
					);
				}
			}

			if (footer_slot) {
				if (footer_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot_base(
						footer_slot,
						footer_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(footer_slot_template, /*$$scope*/ ctx[3], dirty, get_footer_slot_changes),
						get_footer_slot_context
					);
				}
			}

			if (!current || dirty & /*contentWidth*/ 4 && div3_class_value !== (div3_class_value = "ih-modal-content-" + /*contentWidth*/ ctx[2] + " svelte-1mdx2cg")) {
				attr_dev(div3, "class", div3_class_value);
			}

			if (!current || dirty & /*open*/ 1 && div4_class_value !== (div4_class_value = "" + ((/*open*/ ctx[0] ? '' : 'hidden') + " ih-modal" + " svelte-1mdx2cg"))) {
				attr_dev(div4, "class", div4_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header_slot, local);
			transition_in(body_slot, local);
			transition_in(footer_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header_slot, local);
			transition_out(body_slot, local);
			transition_out(footer_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div4);
			}

			if (header_slot) header_slot.d(detaching);
			if (body_slot) body_slot.d(detaching);
			if (footer_slot) footer_slot.d(detaching);
			mounted = false;
			dispose();
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Modal', slots, ['header','body','footer']);
	let { open = false } = $$props;
	let { onClose } = $$props;
	let { contentWidth = 'large' } = $$props;

	$$self.$$.on_mount.push(function () {
		if (onClose === undefined && !('onClose' in $$props || $$self.$$.bound[$$self.$$.props['onClose']])) {
			console.warn("<Modal> was created without expected prop 'onClose'");
		}
	});

	const writable_props = ['open', 'onClose', 'contentWidth'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('contentWidth' in $$props) $$invalidate(2, contentWidth = $$props.contentWidth);
		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ open, onClose, contentWidth });

	$$self.$inject_state = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('contentWidth' in $$props) $$invalidate(2, contentWidth = $$props.contentWidth);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [open, onClose, contentWidth, $$scope, slots];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, { open: 0, onClose: 1, contentWidth: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$3.name
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

	get contentWidth() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set contentWidth(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/views/feedback-form.svelte generated by Svelte v4.2.8 */
const file$2 = "src/views/feedback-form.svelte";

// (46:4) 
function create_header_slot$1(ctx) {
	let div;
	let h3;

	const block = {
		c: function create() {
			div = element("div");
			h3 = element("h3");
			h3.textContent = "Add a feedback";
			add_location(h3, file$2, 50, 8, 873);
			attr_dev(div, "slot", "header");
			add_location(div, file$2, 49, 4, 845);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h3);
		},
		p: noop,
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
		source: "(46:4) ",
		ctx
	});

	return block;
}

// (49:4) 
function create_body_slot$1(ctx) {
	let div5;
	let form;
	let div3;
	let div0;
	let label0;
	let t1;
	let input;
	let t2;
	let div2;
	let label1;
	let t4;
	let div1;
	let select;
	let option0;
	let option1;
	let t7;
	let div4;
	let label2;
	let t9;
	let textarea;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div5 = element("div");
			form = element("form");
			div3 = element("div");
			div0 = element("div");
			label0 = element("label");
			label0.textContent = "Email";
			t1 = space();
			input = element("input");
			t2 = space();
			div2 = element("div");
			label1 = element("label");
			label1.textContent = "Type";
			t4 = space();
			div1 = element("div");
			select = element("select");
			option0 = element("option");
			option0.textContent = "Bug";
			option1 = element("option");
			option1.textContent = "Enhance";
			t7 = space();
			div4 = element("div");
			label2 = element("label");
			label2.textContent = "Feedback :";
			t9 = space();
			textarea = element("textarea");
			attr_dev(label0, "class", "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 svelte-1rmjdhq");
			attr_dev(label0, "for", "grid-first-name");
			add_location(label0, file$2, 56, 20, 1105);
			attr_dev(input, "class", "ih-input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white svelte-1rmjdhq");
			attr_dev(input, "id", "grid-first-name");
			attr_dev(input, "type", "text");
			attr_dev(input, "placeholder", "Jane");
			add_location(input, file$2, 59, 20, 1289);
			attr_dev(div0, "class", "w-full md:w-1/2 px-3 mb-6 md:mb-0");
			add_location(div0, file$2, 55, 16, 1037);
			attr_dev(label1, "class", "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 svelte-1rmjdhq");
			attr_dev(label1, "for", "grid-state");
			add_location(label1, file$2, 62, 20, 1627);
			option0.__value = "bug";
			set_input_value(option0, option0.__value);
			add_location(option0, file$2, 67, 28, 2095);
			option1.__value = "enhance";
			set_input_value(option1, option1.__value);
			add_location(option1, file$2, 68, 28, 2156);
			attr_dev(select, "class", "ih-input block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 svelte-1rmjdhq");
			attr_dev(select, "id", "grid-state");
			if (/*type*/ ctx[4] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[8].call(select));
			add_location(select, file$2, 66, 24, 1852);
			attr_dev(div1, "class", "relative");
			add_location(div1, file$2, 65, 20, 1805);
			attr_dev(div2, "class", "w-full md:w-1/2 px-3");
			add_location(div2, file$2, 61, 16, 1572);
			attr_dev(div3, "class", "flex flex-wrap -mx-3 mb-6");
			add_location(div3, file$2, 54, 12, 981);
			attr_dev(label2, "for", "ih-feedback-content");
			attr_dev(label2, "class", "svelte-1rmjdhq");
			add_location(label2, file$2, 74, 16, 2334);
			attr_dev(textarea, "id", "ih-feedback-content");
			attr_dev(textarea, "class", "ih-input svelte-1rmjdhq");
			add_location(textarea, file$2, 75, 16, 2402);
			add_location(div4, file$2, 73, 12, 2312);
			attr_dev(form, "class", "w-full max-w-lg");
			add_location(form, file$2, 53, 8, 938);
			attr_dev(div5, "slot", "body");
			add_location(div5, file$2, 52, 4, 912);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div5, anchor);
			append_dev(div5, form);
			append_dev(form, div3);
			append_dev(div3, div0);
			append_dev(div0, label0);
			append_dev(div0, t1);
			append_dev(div0, input);
			set_input_value(input, /*email*/ ctx[0]);
			append_dev(div3, t2);
			append_dev(div3, div2);
			append_dev(div2, label1);
			append_dev(div2, t4);
			append_dev(div2, div1);
			append_dev(div1, select);
			append_dev(select, option0);
			append_dev(select, option1);
			select_option(select, /*type*/ ctx[4], true);
			append_dev(form, t7);
			append_dev(form, div4);
			append_dev(div4, label2);
			append_dev(div4, t9);
			append_dev(div4, textarea);
			set_input_value(textarea, /*feedback*/ ctx[3]);

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[7]),
					listen_dev(select, "change", /*select_change_handler*/ ctx[8]),
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[9])
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*email*/ 1 && input.value !== /*email*/ ctx[0]) {
				set_input_value(input, /*email*/ ctx[0]);
			}

			if (dirty & /*type*/ 16) {
				select_option(select, /*type*/ ctx[4]);
			}

			if (dirty & /*feedback*/ 8) {
				set_input_value(textarea, /*feedback*/ ctx[3]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div5);
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_body_slot$1.name,
		type: "slot",
		source: "(49:4) ",
		ctx
	});

	return block;
}

// (76:4) 
function create_footer_slot$1(ctx) {
	let div;
	let button0;
	let t1;
	let button1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			button0 = element("button");
			button0.textContent = "Cancel";
			t1 = space();
			button1 = element("button");
			button1.textContent = "Send";
			attr_dev(button0, "class", "ih-action-button svelte-1rmjdhq");
			add_location(button0, file$2, 80, 8, 2566);
			attr_dev(button1, "class", "ih-action-button svelte-1rmjdhq");
			add_location(button1, file$2, 81, 8, 2642);
			attr_dev(div, "slot", "footer");
			add_location(div, file$2, 79, 4, 2538);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, button0);
			append_dev(div, t1);
			append_dev(div, button1);

			if (!mounted) {
				dispose = [
					listen_dev(
						button0,
						"click",
						function () {
							if (is_function(/*onClose*/ ctx[2])) /*onClose*/ ctx[2].apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(button1, "click", /*handleSubmit*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_footer_slot$1.name,
		type: "slot",
		source: "(76:4) ",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				open: /*open*/ ctx[1],
				onClose: /*onClose*/ ctx[2],
				$$slots: {
					footer: [create_footer_slot$1],
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

			if (dirty & /*$$scope, onClose, feedback, type, email*/ 1053) {
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
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Feedback_form', slots, []);
	let { onSubmit } = $$props;
	let { open = false } = $$props;
	let { onClose } = $$props;
	let feedback;
	let type;
	let { email = '' } = $$props;

	function handleSubmit() {
		onSubmit({ content: feedback, type, email });
		$$invalidate(3, feedback = '');
		$$invalidate(0, email = '');
	}

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

	function input_input_handler() {
		email = this.value;
		$$invalidate(0, email);
	}

	function select_change_handler() {
		type = select_value(this);
		$$invalidate(4, type);
	}

	function textarea_input_handler() {
		feedback = this.value;
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
		onSubmit,
		open,
		onClose,
		feedback,
		type,
		email,
		handleSubmit
	});

	$$self.$inject_state = $$props => {
		if ('onSubmit' in $$props) $$invalidate(6, onSubmit = $$props.onSubmit);
		if ('open' in $$props) $$invalidate(1, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(2, onClose = $$props.onClose);
		if ('feedback' in $$props) $$invalidate(3, feedback = $$props.feedback);
		if ('type' in $$props) $$invalidate(4, type = $$props.type);
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
		type,
		handleSubmit,
		onSubmit,
		input_input_handler,
		select_change_handler,
		textarea_input_handler
	];
}

class Feedback_form extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {
			onSubmit: 6,
			open: 1,
			onClose: 2,
			email: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Feedback_form",
			options,
			id: create_fragment$2.name
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

/* src/views/upvote-embed.svelte generated by Svelte v4.2.8 */

const { Error: Error_1 } = globals;
const file$1 = "src/views/upvote-embed.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (56:4) 
function create_header_slot(ctx) {
	let div;
	let h3;

	const block = {
		c: function create() {
			div = element("div");
			h3 = element("h3");
			h3.textContent = "Feedback submitted for upvoting";
			add_location(h3, file$1, 56, 8, 2195);
			attr_dev(div, "slot", "header");
			add_location(div, file$1, 55, 4, 2167);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h3);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_header_slot.name,
		type: "slot",
		source: "(56:4) ",
		ctx
	});

	return block;
}

// (71:24) {:else}
function create_else_block_1(ctx) {
	let span;
	let svg;
	let path;

	const block = {
		c: function create() {
			span = element("span");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "fill", "#afafaf");
			attr_dev(path, "d", "M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z");
			add_location(path, file$1, 71, 117, 3477);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$1, 71, 34, 3394);
			add_location(span, file$1, 71, 28, 3388);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, svg);
			append_dev(svg, path);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(71:24) {:else}",
		ctx
	});

	return block;
}

// (65:24) {#if sdk.isConnected()}
function create_if_block_1$1(ctx) {
	let show_if;
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*feedbacks*/ 8) show_if = null;
		if (show_if == null) show_if = !!/*userAlreadyVoted*/ ctx[5](/*feedback*/ ctx[8]);
		if (show_if) return create_if_block_2$1;
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
		id: create_if_block_1$1.name,
		type: "if",
		source: "(65:24) {#if sdk.isConnected()}",
		ctx
	});

	return block;
}

// (68:28) {:else}
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
			add_location(path, file$1, 68, 174, 3062);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$1, 68, 91, 2979);
			attr_dev(button, "type", "button");
			add_location(button, file$1, 68, 32, 2920);
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
		source: "(68:28) {:else}",
		ctx
	});

	return block;
}

// (66:28) {#if userAlreadyVoted(feedback)}
function create_if_block_2$1(ctx) {
	let span;
	let svg;
	let path;

	const block = {
		c: function create() {
			span = element("span");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "fill", "currentColor");
			attr_dev(path, "d", "m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z");
			add_location(path, file$1, 66, 121, 2743);
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "width", "24");
			attr_dev(svg, "height", "24");
			attr_dev(svg, "viewBox", "0 0 24 24");
			add_location(svg, file$1, 66, 38, 2660);
			add_location(span, file$1, 66, 32, 2654);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, svg);
			append_dev(svg, path);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(span);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(66:28) {#if userAlreadyVoted(feedback)}",
		ctx
	});

	return block;
}

// (77:16) {#if index + 1 < feedbacks.length}
function create_if_block$1(ctx) {
	let hr;

	const block = {
		c: function create() {
			hr = element("hr");
			add_location(hr, file$1, 77, 20, 3938);
		},
		m: function mount(target, anchor) {
			insert_dev(target, hr, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(hr);
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(77:16) {#if index + 1 < feedbacks.length}",
		ctx
	});

	return block;
}

// (61:12) {#each feedbacks as feedback, index (feedback.id)}
function create_each_block(key_1, ctx) {
	let div2;
	let div0;
	let t0_value = /*feedback*/ ctx[8].content + "";
	let t0;
	let t1;
	let div1;
	let show_if;
	let t2;
	let span;
	let t3_value = /*feedback*/ ctx[8].vote + "";
	let t3;
	let t4;
	let if_block1_anchor;

	function select_block_type(ctx, dirty) {
		if (dirty & /*sdk*/ 4) show_if = null;
		if (show_if == null) show_if = !!/*sdk*/ ctx[2].isConnected();
		if (show_if) return create_if_block_1$1;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*index*/ ctx[10] + 1 < /*feedbacks*/ ctx[3].length && create_if_block$1(ctx);

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			if_block0.c();
			t2 = space();
			span = element("span");
			t3 = text(t3_value);
			t4 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			add_location(div0, file$1, 62, 20, 2422);
			attr_dev(span, "class", "w-full text-center mt-3");
			add_location(span, file$1, 73, 24, 3756);
			attr_dev(div1, "class", "flex flex-col align-middle");
			add_location(div1, file$1, 63, 20, 2472);
			attr_dev(div2, "class", "flex justify-between py-5");
			add_location(div2, file$1, 61, 16, 2362);
			this.first = div2;
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, t0);
			append_dev(div2, t1);
			append_dev(div2, div1);
			if_block0.m(div1, null);
			append_dev(div1, t2);
			append_dev(div1, span);
			append_dev(span, t3);
			insert_dev(target, t4, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*feedbacks*/ 8 && t0_value !== (t0_value = /*feedback*/ ctx[8].content + "")) set_data_dev(t0, t0_value);

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div1, t2);
				}
			}

			if (dirty & /*feedbacks*/ 8 && t3_value !== (t3_value = /*feedback*/ ctx[8].vote + "")) set_data_dev(t3, t3_value);

			if (/*index*/ ctx[10] + 1 < /*feedbacks*/ ctx[3].length) {
				if (if_block1) ; else {
					if_block1 = create_if_block$1(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div2);
				detach_dev(t4);
				detach_dev(if_block1_anchor);
			}

			if_block0.d();
			if (if_block1) if_block1.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(61:12) {#each feedbacks as feedback, index (feedback.id)}",
		ctx
	});

	return block;
}

// (59:4) 
function create_body_slot(ctx) {
	let div1;
	let div0;
	let each_blocks = [];
	let each_1_lookup = new Map();
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
			div1 = element("div");
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			add_location(div0, file$1, 59, 8, 2277);
			attr_dev(div1, "slot", "body");
			add_location(div1, file$1, 58, 4, 2251);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div0, null);
				}
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*feedbacks, userAlreadyVoted, upvote, sdk*/ 60) {
				each_value = ensure_array_like_dev(/*feedbacks*/ ctx[3]);
				validate_each_keys(ctx, each_value, get_each_context, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, destroy_block, create_each_block, null, get_each_context);
			}
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div1);
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_body_slot.name,
		type: "slot",
		source: "(59:4) ",
		ctx
	});

	return block;
}

// (83:4) 
function create_footer_slot(ctx) {
	let div;
	let button;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			button = element("button");
			button.textContent = "Cancel";
			attr_dev(button, "class", "ih-action-button svelte-122nuo9");
			add_location(button, file$1, 83, 8, 4045);
			attr_dev(div, "slot", "footer");
			add_location(div, file$1, 82, 4, 4017);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, button);

			if (!mounted) {
				dispose = listen_dev(
					button,
					"click",
					function () {
						if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
					},
					false,
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
			}

			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_footer_slot.name,
		type: "slot",
		source: "(83:4) ",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				open: /*open*/ ctx[0],
				onClose: /*onClose*/ ctx[1],
				contentWidth: "xlarge",
				$$slots: {
					footer: [create_footer_slot],
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

			if (dirty & /*$$scope, onClose, feedbacks, sdk*/ 2062) {
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
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
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
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { open: 0, onClose: 1, sdk: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Upvote_embed",
			options,
			id: create_fragment$1.name
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

/* src/views/default-embed.svelte generated by Svelte v4.2.8 */

const { Object: Object_1 } = globals;
const file = "src/views/default-embed.svelte";

// (40:4) {#if embedContainerOpen}
function create_if_block_2(ctx) {
	let div1;
	let button0;
	let t1;
	let button1;
	let t3;
	let div0;
	let t4;
	let a;
	let u;
	let div1_intro;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = element("div");
			button0 = element("button");
			button0.textContent = "Add feedback";
			t1 = space();
			button1 = element("button");
			button1.textContent = "show backlogs";
			t3 = space();
			div0 = element("div");
			t4 = text("Powered by ");
			a = element("a");
			u = element("u");
			u.textContent = "Insight hunt";
			attr_dev(button0, "type", "button");
			attr_dev(button0, "class", "ih-item ih-action-button svelte-jfsd4j");
			add_location(button0, file, 43, 12, 1915);
			attr_dev(button1, "type", "button");
			attr_dev(button1, "class", "ih-item ih-action-button svelte-jfsd4j");
			add_location(button1, file, 44, 12, 2035);
			add_location(u, file, 45, 69, 2211);
			attr_dev(a, "href", /*homepageUrl*/ ctx[4]);
			add_location(a, file, 45, 45, 2187);
			attr_dev(div0, "class", "ih-item svelte-jfsd4j");
			add_location(div0, file, 45, 12, 2154);
			attr_dev(div1, "class", "ih-action-container svelte-jfsd4j");
			add_location(div1, file, 42, 8, 1834);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, button0);
			append_dev(div1, t1);
			append_dev(div1, button1);
			append_dev(div1, t3);
			append_dev(div1, div0);
			append_dev(div0, t4);
			append_dev(div0, a);
			append_dev(a, u);

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*toggleFeedbackModal*/ ctx[6], false, false, false, false),
					listen_dev(button1, "click", /*toggleUpvoteModal*/ ctx[7], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: noop,
		i: function intro(local) {
			if (local) {
				if (!div1_intro) {
					add_render_callback(() => {
						div1_intro = create_in_transition(div1, fly, { x: 100, duration: 500 });
						div1_intro.start();
					});
				}
			}
		},
		o: noop,
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div1);
			}

			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(40:4) {#if embedContainerOpen}",
		ctx
	});

	return block;
}

// (48:0) {#if feedbackModalOpen}
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
		source: "(48:0) {#if feedbackModalOpen}",
		ctx
	});

	return block;
}

// (51:0) {#if upvoteModalOpen}
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
		source: "(51:0) {#if upvoteModalOpen}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let button;
	let span;
	let t1;
	let t2;
	let t3;
	let if_block2_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*embedContainerOpen*/ ctx[1] && create_if_block_2(ctx);
	let if_block1 = /*feedbackModalOpen*/ ctx[2] && create_if_block_1(ctx);
	let if_block2 = /*upvoteModalOpen*/ ctx[3] && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");
			button = element("button");
			span = element("span");
			span.textContent = "FEEDBACK";
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
			attr_dev(span, "class", "ih-button-text svelte-jfsd4j");
			add_location(span, file, 38, 8, 1737);
			attr_dev(button, "class", "ih-button-container svelte-jfsd4j");
			add_location(button, file, 37, 4, 1660);
			attr_dev(div, "class", "ih-container svelte-jfsd4j");
			add_location(div, file, 36, 0, 1629);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, button);
			append_dev(button, span);
			append_dev(div, t1);
			if (if_block0) if_block0.m(div, null);
			insert_dev(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, t3, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_dev(target, if_block2_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*toggleEmbedContainer*/ ctx[5], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*embedContainerOpen*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*embedContainerOpen*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*feedbackModalOpen*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*feedbackModalOpen*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t3.parentNode, t3);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*upvoteModalOpen*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*upvoteModalOpen*/ 8) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
				detach_dev(t2);
				detach_dev(t3);
				detach_dev(if_block2_anchor);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d(detaching);
			if (if_block2) if_block2.d(detaching);
			mounted = false;
			dispose();
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
