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

const getApiUrl = () => {
    return 'http://localhost:3005';
};
const getHomepage = () => {
    return 'http://localhost:5173';
};

class FeedbackHubSDK {
    constructor(config) {
        this.apiUrl = getApiUrl();
        this.projectPublicId = config.projectPublicId;
    }
    addFeedback(data) {
        return __awaiter(this, void 0, void 0, function* () {
            ({
                // projectId: this.projectId,
                content: data.content,
                type: data.type,
                language: data.language,
                email: data.email,
            });
            const result = yield fetch(`${this.apiUrl}/external/feedback`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.projectPublicId}`
                }
            });
            if (result.ok) {
                return;
            }
            // TODO confirm
            const body = yield result.json();
            throw new Error(body.message);
        });
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
function init(
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
const file$2 = "src/views/component/modal.svelte";
const get_footer_slot_changes = dirty => ({});
const get_footer_slot_context = ctx => ({});
const get_body_slot_changes = dirty => ({});
const get_body_slot_context = ctx => ({});
const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

function create_fragment$2(ctx) {
	let div4;
	let div3;
	let div0;
	let t0;
	let button;
	let t2;
	let div1;
	let t3;
	let div2;
	let div4_class_value;
	let current;
	let mounted;
	let dispose;
	const header_slot_template = /*#slots*/ ctx[3].header;
	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[2], get_header_slot_context);
	const body_slot_template = /*#slots*/ ctx[3].body;
	const body_slot = create_slot(body_slot_template, ctx, /*$$scope*/ ctx[2], get_body_slot_context);
	const footer_slot_template = /*#slots*/ ctx[3].footer;
	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[2], get_footer_slot_context);

	const block = {
		c: function create() {
			div4 = element("div");
			div3 = element("div");
			div0 = element("div");
			if (header_slot) header_slot.c();
			t0 = space();
			button = element("button");
			button.textContent = "X";
			t2 = space();
			div1 = element("div");
			if (body_slot) body_slot.c();
			t3 = space();
			div2 = element("div");
			if (footer_slot) footer_slot.c();
			add_location(button, file$2, 9, 12, 295);
			attr_dev(div0, "class", "flex justify-between items-center text-white text-xl rounded-t-md px-4 py-4");
			add_location(div0, file$2, 7, 8, 158);
			attr_dev(div1, "class", "max-h-48 overflow-y-scroll p-4");
			add_location(div1, file$2, 13, 8, 385);
			attr_dev(div2, "class", "px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4");
			add_location(div2, file$2, 18, 8, 517);
			attr_dev(div3, "class", "fbh-content svelte-1jw03ux");
			add_location(div3, file$2, 6, 4, 124);
			attr_dev(div4, "class", div4_class_value = "" + ((/*open*/ ctx[0] ? '' : 'hidden') + " fbh-modal" + " svelte-1jw03ux"));
			add_location(div4, file$2, 5, 0, 73);
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
				if (header_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						header_slot,
						header_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[2], dirty, get_header_slot_changes),
						get_header_slot_context
					);
				}
			}

			if (body_slot) {
				if (body_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						body_slot,
						body_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(body_slot_template, /*$$scope*/ ctx[2], dirty, get_body_slot_changes),
						get_body_slot_context
					);
				}
			}

			if (footer_slot) {
				if (footer_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						footer_slot,
						footer_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(footer_slot_template, /*$$scope*/ ctx[2], dirty, get_footer_slot_changes),
						get_footer_slot_context
					);
				}
			}

			if (!current || dirty & /*open*/ 1 && div4_class_value !== (div4_class_value = "" + ((/*open*/ ctx[0] ? '' : 'hidden') + " fbh-modal" + " svelte-1jw03ux"))) {
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
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
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

	$$self.$$set = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ open, onClose });

	$$self.$inject_state = $$props => {
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [open, onClose, $$scope, slots];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { open: 0, onClose: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$2.name
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

/* src/views/feedback-form.svelte generated by Svelte v4.2.8 */
const file$1 = "src/views/feedback-form.svelte";

// (36:4) 
function create_header_slot(ctx) {
	let div;
	let h3;

	const block = {
		c: function create() {
			div = element("div");
			h3 = element("h3");
			h3.textContent = "Add a feedback";
			add_location(h3, file$1, 40, 8, 748);
			attr_dev(div, "slot", "header");
			add_location(div, file$1, 39, 4, 720);
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
		source: "(36:4) ",
		ctx
	});

	return block;
}

// (39:4) 
function create_body_slot(ctx) {
	let div6;
	let form;
	let div4;
	let div0;
	let label0;
	let t1;
	let input;
	let t2;
	let p;
	let t4;
	let div3;
	let label1;
	let t6;
	let div2;
	let select;
	let option0;
	let option1;
	let t9;
	let div1;
	let svg;
	let path;
	let t10;
	let div5;
	let label2;
	let t12;
	let textarea;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div6 = element("div");
			form = element("form");
			div4 = element("div");
			div0 = element("div");
			label0 = element("label");
			label0.textContent = "First Name";
			t1 = space();
			input = element("input");
			t2 = space();
			p = element("p");
			p.textContent = "Please fill out this field.";
			t4 = space();
			div3 = element("div");
			label1 = element("label");
			label1.textContent = "Type";
			t6 = space();
			div2 = element("div");
			select = element("select");
			option0 = element("option");
			option0.textContent = "Bug";
			option1 = element("option");
			option1.textContent = "Enhance";
			t9 = space();
			div1 = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			t10 = space();
			div5 = element("div");
			label2 = element("label");
			label2.textContent = "Feedback :";
			t12 = space();
			textarea = element("textarea");
			attr_dev(label0, "class", "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 svelte-82r5w1");
			attr_dev(label0, "for", "grid-first-name");
			add_location(label0, file$1, 46, 20, 980);
			attr_dev(input, "class", "fbh-input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white svelte-82r5w1");
			attr_dev(input, "id", "grid-first-name");
			attr_dev(input, "type", "text");
			attr_dev(input, "placeholder", "Jane");
			add_location(input, file$1, 49, 20, 1169);
			attr_dev(p, "class", "text-red-500 text-xs italic");
			add_location(p, file$1, 50, 20, 1415);
			attr_dev(div0, "class", "w-full md:w-1/2 px-3 mb-6 md:mb-0");
			add_location(div0, file$1, 45, 16, 912);
			attr_dev(label1, "class", "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 svelte-82r5w1");
			attr_dev(label1, "for", "grid-state");
			add_location(label1, file$1, 53, 20, 1580);
			option0.__value = "Bug";
			set_input_value(option0, option0.__value);
			attr_dev(option0, "class", "svelte-82r5w1");
			add_location(option0, file$1, 58, 28, 2047);
			option1.__value = "Enhance";
			set_input_value(option1, option1.__value);
			attr_dev(option1, "class", "svelte-82r5w1");
			add_location(option1, file$1, 59, 28, 2096);
			attr_dev(select, "class", "fbh-input block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 svelte-82r5w1");
			attr_dev(select, "id", "grid-state");
			add_location(select, file$1, 57, 24, 1805);
			attr_dev(path, "d", "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z");
			add_location(path, file$1, 62, 117, 2394);
			attr_dev(svg, "class", "fill-current h-4 w-4");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "viewBox", "0 0 20 20");
			add_location(svg, file$1, 62, 28, 2305);
			attr_dev(div1, "class", "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700");
			add_location(div1, file$1, 61, 24, 2179);
			attr_dev(div2, "class", "relative");
			add_location(div2, file$1, 56, 20, 1758);
			attr_dev(div3, "class", "w-full md:w-1/2 px-3");
			add_location(div3, file$1, 52, 16, 1525);
			attr_dev(div4, "class", "flex flex-wrap -mx-3 mb-6");
			add_location(div4, file$1, 44, 12, 856);
			attr_dev(label2, "for", "fbh-feedback-content");
			attr_dev(label2, "class", "svelte-82r5w1");
			add_location(label2, file$1, 68, 16, 2621);
			attr_dev(textarea, "id", "fbh-feedback-content");
			attr_dev(textarea, "class", "fbh-input svelte-82r5w1");
			add_location(textarea, file$1, 69, 16, 2690);
			add_location(div5, file$1, 67, 12, 2599);
			attr_dev(form, "class", "w-full max-w-lg");
			add_location(form, file$1, 43, 8, 813);
			attr_dev(div6, "slot", "body");
			add_location(div6, file$1, 42, 4, 787);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div6, anchor);
			append_dev(div6, form);
			append_dev(form, div4);
			append_dev(div4, div0);
			append_dev(div0, label0);
			append_dev(div0, t1);
			append_dev(div0, input);
			append_dev(div0, t2);
			append_dev(div0, p);
			append_dev(div4, t4);
			append_dev(div4, div3);
			append_dev(div3, label1);
			append_dev(div3, t6);
			append_dev(div3, div2);
			append_dev(div2, select);
			append_dev(select, option0);
			append_dev(select, option1);
			append_dev(div2, t9);
			append_dev(div2, div1);
			append_dev(div1, svg);
			append_dev(svg, path);
			append_dev(form, t10);
			append_dev(form, div5);
			append_dev(div5, label2);
			append_dev(div5, t12);
			append_dev(div5, textarea);
			set_input_value(textarea, /*feedback*/ ctx[2]);

			if (!mounted) {
				dispose = listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*feedback*/ 4) {
				set_input_value(textarea, /*feedback*/ ctx[2]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div6);
			}

			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_body_slot.name,
		type: "slot",
		source: "(39:4) ",
		ctx
	});

	return block;
}

// (70:4) 
function create_footer_slot(ctx) {
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
			attr_dev(button0, "class", "fbh-action-button svelte-82r5w1");
			add_location(button0, file$1, 74, 8, 2856);
			attr_dev(button1, "class", "fbh-action-button svelte-82r5w1");
			add_location(button1, file$1, 75, 8, 2933);
			attr_dev(div, "slot", "footer");
			add_location(div, file$1, 73, 4, 2828);
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
							if (is_function(/*onClose*/ ctx[1])) /*onClose*/ ctx[1].apply(this, arguments);
						},
						false,
						false,
						false,
						false
					),
					listen_dev(button1, "click", /*handleSubmit*/ ctx[3], false, false, false, false)
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
		id: create_footer_slot.name,
		type: "slot",
		source: "(70:4) ",
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
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};
			if (dirty & /*open*/ 1) modal_changes.open = /*open*/ ctx[0];
			if (dirty & /*onClose*/ 2) modal_changes.onClose = /*onClose*/ ctx[1];

			if (dirty & /*$$scope, onClose, feedback*/ 70) {
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
	validate_slots('Feedback_form', slots, []);
	let { onSubmit } = $$props;
	let { open = false } = $$props;
	let { onClose } = $$props;
	let feedback = '';

	function handleSubmit() {
		onSubmit(feedback);
		$$invalidate(2, feedback = ''); // Réinitialiser le champ après la soumission
	}

	$$self.$$.on_mount.push(function () {
		if (onSubmit === undefined && !('onSubmit' in $$props || $$self.$$.bound[$$self.$$.props['onSubmit']])) {
			console.warn("<Feedback_form> was created without expected prop 'onSubmit'");
		}

		if (onClose === undefined && !('onClose' in $$props || $$self.$$.bound[$$self.$$.props['onClose']])) {
			console.warn("<Feedback_form> was created without expected prop 'onClose'");
		}
	});

	const writable_props = ['onSubmit', 'open', 'onClose'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Feedback_form> was created with unknown prop '${key}'`);
	});

	function textarea_input_handler() {
		feedback = this.value;
		$$invalidate(2, feedback);
	}

	$$self.$$set = $$props => {
		if ('onSubmit' in $$props) $$invalidate(4, onSubmit = $$props.onSubmit);
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
	};

	$$self.$capture_state = () => ({
		Modal,
		onSubmit,
		open,
		onClose,
		feedback,
		handleSubmit
	});

	$$self.$inject_state = $$props => {
		if ('onSubmit' in $$props) $$invalidate(4, onSubmit = $$props.onSubmit);
		if ('open' in $$props) $$invalidate(0, open = $$props.open);
		if ('onClose' in $$props) $$invalidate(1, onClose = $$props.onClose);
		if ('feedback' in $$props) $$invalidate(2, feedback = $$props.feedback);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [open, onClose, feedback, handleSubmit, onSubmit, textarea_input_handler];
}

class Feedback_form extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { onSubmit: 4, open: 0, onClose: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Feedback_form",
			options,
			id: create_fragment$1.name
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
}

/* src/views/default-embed.svelte generated by Svelte v4.2.8 */
const file = "src/views/default-embed.svelte";

// (24:4) {#if embedContainerOpen}
function create_if_block_1(ctx) {
	let div;
	let button0;
	let t1;
	let button1;
	let t3;
	let button2;
	let t5;
	let small;
	let t6;
	let a;
	let u;
	let div_intro;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			button0 = element("button");
			button0.textContent = "Add feedback";
			t1 = space();
			button1 = element("button");
			button1.textContent = "Add survey";
			t3 = space();
			button2 = element("button");
			button2.textContent = "show backlogs";
			t5 = space();
			small = element("small");
			t6 = text("Powered by ");
			a = element("a");
			u = element("u");
			u.textContent = "Feedback hub";
			attr_dev(button0, "type", "button");
			attr_dev(button0, "class", "fbh-action-button svelte-1k1bnod");
			add_location(button0, file, 31, 12, 802);
			attr_dev(button1, "type", "button");
			attr_dev(button1, "class", "fbh-action-button svelte-1k1bnod");
			add_location(button1, file, 32, 12, 915);
			attr_dev(button2, "type", "button");
			attr_dev(button2, "class", "fbh-action-button svelte-1k1bnod");
			add_location(button2, file, 33, 12, 1026);
			add_location(u, file, 34, 54, 1182);
			attr_dev(a, "href", /*homepageUrl*/ ctx[2]);
			add_location(a, file, 34, 30, 1158);
			attr_dev(small, "class", "svelte-1k1bnod");
			add_location(small, file, 34, 12, 1140);
			attr_dev(div, "class", "fbh-action-container svelte-1k1bnod");
			add_location(div, file, 30, 8, 720);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, button0);
			append_dev(div, t1);
			append_dev(div, button1);
			append_dev(div, t3);
			append_dev(div, button2);
			append_dev(div, t5);
			append_dev(div, small);
			append_dev(small, t6);
			append_dev(small, a);
			append_dev(a, u);

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*toggleFeedbackModal*/ ctx[4], false, false, false, false),
					listen_dev(button1, "click", /*toggleFeedbackModal*/ ctx[4], false, false, false, false),
					listen_dev(button2, "click", /*toggleFeedbackModal*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: noop,
		i: function intro(local) {
			if (local) {
				if (!div_intro) {
					add_render_callback(() => {
						div_intro = create_in_transition(div, fly, { x: 100, duration: 500 });
						div_intro.start();
					});
				}
			}
		},
		o: noop,
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
		id: create_if_block_1.name,
		type: "if",
		source: "(24:4) {#if embedContainerOpen}",
		ctx
	});

	return block;
}

// (33:0) {#if feedbackModalOpen}
function create_if_block(ctx) {
	let feedbackform;
	let current;

	feedbackform = new Feedback_form({
			props: {
				onSubmit: /*addFeedback*/ ctx[5],
				open: /*feedbackModalOpen*/ ctx[1],
				onClose: /*toggleFeedbackModal*/ ctx[4]
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
			if (dirty & /*feedbackModalOpen*/ 2) feedbackform_changes.open = /*feedbackModalOpen*/ ctx[1];
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
		id: create_if_block.name,
		type: "if",
		source: "(33:0) {#if feedbackModalOpen}",
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
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*embedContainerOpen*/ ctx[0] && create_if_block_1(ctx);
	let if_block1 = /*feedbackModalOpen*/ ctx[1] && create_if_block(ctx);

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
			if_block1_anchor = empty();
			attr_dev(span, "class", "fbh-button-text svelte-1k1bnod");
			add_location(span, file, 26, 8, 622);
			attr_dev(button, "class", "fbh-button-container svelte-1k1bnod");
			add_location(button, file, 25, 4, 544);
			attr_dev(div, "class", "fbh-container svelte-1k1bnod");
			add_location(div, file, 24, 0, 512);
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
			insert_dev(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*toggleEmbedContainer*/ ctx[3], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (/*embedContainerOpen*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*embedContainerOpen*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*feedbackModalOpen*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*feedbackModalOpen*/ 2) {
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
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) {
				detach_dev(div);
				detach_dev(t2);
				detach_dev(if_block1_anchor);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d(detaching);
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
	const homepageUrl = getHomepage();
	let { sdk } = $$props;
	let embedContainerOpen = false;
	let feedbackModalOpen = false;

	function toggleEmbedContainer() {
		$$invalidate(0, embedContainerOpen = !embedContainerOpen);
	}

	function toggleFeedbackModal() {
		$$invalidate(1, feedbackModalOpen = !feedbackModalOpen);
	}

	const addFeedback = data => {
		sdk.addFeedback(data);
	};

	$$self.$$.on_mount.push(function () {
		if (sdk === undefined && !('sdk' in $$props || $$self.$$.bound[$$self.$$.props['sdk']])) {
			console.warn("<Default_embed> was created without expected prop 'sdk'");
		}
	});

	const writable_props = ['sdk'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Default_embed> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('sdk' in $$props) $$invalidate(6, sdk = $$props.sdk);
	};

	$$self.$capture_state = () => ({
		fly,
		FeedbackForm: Feedback_form,
		getHomepage,
		homepageUrl,
		sdk,
		embedContainerOpen,
		feedbackModalOpen,
		toggleEmbedContainer,
		toggleFeedbackModal,
		addFeedback
	});

	$$self.$inject_state = $$props => {
		if ('sdk' in $$props) $$invalidate(6, sdk = $$props.sdk);
		if ('embedContainerOpen' in $$props) $$invalidate(0, embedContainerOpen = $$props.embedContainerOpen);
		if ('feedbackModalOpen' in $$props) $$invalidate(1, feedbackModalOpen = $$props.feedbackModalOpen);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		embedContainerOpen,
		feedbackModalOpen,
		homepageUrl,
		toggleEmbedContainer,
		toggleFeedbackModal,
		addFeedback,
		sdk
	];
}

class Default_embed extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { sdk: 6 });

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

function initSDK(config) {
    const sdk = new FeedbackHubSDK(config);
    return sdk;
}
function setUpFeedbackContainer(config) {
    const container = document.createElement('div');
    container.setAttribute('id', 'feedback-hub-container');
    document.body.append(container);
    const sdk = initSDK({ projectPublicId: config.project });
    new Default_embed({
        target: container,
        props: {
            sdk,
        }
    });
}

export { initSDK, setUpFeedbackContainer };
//# sourceMappingURL=bundle.esm.js.map
