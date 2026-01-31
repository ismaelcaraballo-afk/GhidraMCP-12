(() => {
    var Se = {
            7789: (p, v, h) => {
                "use strict";
                h.d(v, {
                    Du: () => Fr
                });
                var d = (e => (e[e.NORMAL = 1e3] = "NORMAL", e[e.RESTRICTED = 1001] = "RESTRICTED", e[e.MILITARY = 1002] = "MILITARY", e))(d || {});

                function b(e) {
                    return typeof e == "object" && e !== null
                }

                function f(e) {
                    return b(e) && typeof e.length == "number"
                }

                function y(e) {
                    return Array.isArray(e) ? e : e === void 0 ? [] : f(e) || e instanceof Set ? Array.from(e) : [e]
                }
                const n = y;

                function i(e, t, ...s) {
                    const l = [];
                    if (!Array.isArray(e)) throw new Error("Input must be an array");
                    for (const [m, w] of e.entries()) {
                        let C = [];
                        s.forEach(A => {
                            typeof A == "function" ? C = C.concat(A(w)) : C.push(A)
                        }), t(w) && l.push({
                            index: m,
                            replaceWithValue: C
                        })
                    }
                    for (const m of l.reverse()) {
                        const w = [m.index, 1].concat(m.replaceWithValue);
                        e.splice.apply(e, w)
                    }
                    return e
                }
                const o = i,
                    r = {
                        short: /^-([^\d-])$/,
                        long: /^--(\S+)/,
                        combinedShort: /^-[^\d-]{2,}$/,
                        optEquals: /^(--\S+?)=(.*)/
                    };
                class a extends Array {
                    load(t) {
                        if (this.clear(), t && t !== process.argv) t = n(t);
                        else {
                            t = process.argv.slice(0);
                            const s = process.execArgv.some(M) ? 1 : 2;
                            t.splice(0, s)
                        }
                        t.forEach(s => this.push(String(s)))
                    }
                    clear() {
                        this.length = 0
                    }
                    expandOptionEqualsNotation() {
                        if (this.some(t => r.optEquals.test(t))) {
                            const t = [];
                            this.forEach(s => {
                                const l = s.match(r.optEquals);
                                l ? t.push(l[1], l[2]) : t.push(s)
                            }), this.clear(), this.load(t)
                        }
                    }
                    expandGetoptNotation() {
                        this.hasCombinedShortOptions() && o(this, r.combinedShort, c)
                    }
                    hasCombinedShortOptions() {
                        return this.some(t => r.combinedShort.test(t))
                    }
                    static from(t) {
                        const s = new this;
                        return s.load(t), s
                    }
                }

                function c(e) {
                    return e = e.slice(1), e.split("").map(t => "-" + t)
                }

                function u(e) {
                    return r.optEquals.test(e)
                }

                function g(e) {
                    return (r.short.test(e) || r.long.test(e)) && !r.optEquals.test(e)
                }

                function x(e) {
                    return r.long.test(e) && !u(e)
                }

                function E(e) {
                    return r.short.test(e) ? e.match(r.short)[1] : x(e) ? e.match(r.long)[1] : u(e) ? e.match(r.optEquals)[1].replace(/^--/, "") : null
                }

                function k(e) {
                    return !(g(e) || r.combinedShort.test(e) || r.optEquals.test(e))
                }

                function M(e) {
                    return ["--eval", "-e"].indexOf(e) > -1 || e.startsWith("--eval=")
                }

                function U(e) {
                    return !isNaN(parseFloat(e))
                }

                function $(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                }

                function B(e) {
                    return e !== null && typeof e == "object" && e.constructor === Object
                }

                function Z(e) {
                    return S(e) && typeof e.length == "number"
                }

                function S(e) {
                    return typeof e == "object" && e !== null
                }

                function _(e) {
                    return typeof e != "undefined"
                }

                function j(e) {
                    return !_(e)
                }

                function L(e) {
                    return e === null
                }

                function W(e) {
                    return _(e) && !L(e) && !Number.isNaN(e)
                }

                function V(e) {
                    return typeof e == "function" ? /^class /.test(Function.prototype.toString.call(e)) : !1
                }

                function et(e) {
                    if (e === null) return !0;
                    switch (typeof e) {
                        case "string":
                        case "number":
                        case "symbol":
                        case "undefined":
                        case "boolean":
                            return !0;
                        default:
                            return !1
                    }
                }

                function D(e) {
                    if (e) {
                        const t = _(Promise) && e instanceof Promise,
                            s = e.then && typeof e.then == "function";
                        return !!(t || s)
                    } else return !1
                }

                function rt(e) {
                    return e === null || !_(e) ? !1 : typeof e[Symbol.iterator] == "function" || typeof e[Symbol.asyncIterator] == "function"
                }

                function tt(e) {
                    return typeof e == "string"
                }

                function Dt(e) {
                    return typeof e == "function"
                }

                function mt(e) {
                    return typeof e == "function" && e.constructor.name === "AsyncFunction"
                }
                const F = {
                    isNumber: U,
                    isFiniteNumber: $,
                    isPlainObject: B,
                    isArrayLike: Z,
                    isObject: S,
                    isDefined: _,
                    isUndefined: j,
                    isNull: L,
                    isDefinedValue: W,
                    isClass: V,
                    isPrimitive: et,
                    isPromise: D,
                    isIterable: rt,
                    isString: tt,
                    isFunction: Dt,
                    isAsyncFunction: mt
                };
                class bt {
                    constructor(t) {
                        this.name = t.name, this.type = t.type || String, this.alias = t.alias, this.multiple = t.multiple, this.lazyMultiple = t.lazyMultiple, this.defaultOption = t.defaultOption, this.defaultValue = t.defaultValue, this.group = t.group;
                        for (const s in t) this[s] || (this[s] = t[s])
                    }
                    isBoolean() {
                        return this.type === Boolean || F.isFunction(this.type) && this.type.name === "Boolean"
                    }
                    isMultiple() {
                        return this.multiple || this.lazyMultiple
                    }
                    static create(t) {
                        return new this(t)
                    }
                }
                const st = bt;
                class Nt extends Array {
                    validate(t) {
                        this.some(N => !N.name) && Y("INVALID_DEFINITIONS", "Invalid option definitions: the `name` property is required on each definition"), this.some(N => N.type && typeof N.type != "function") && Y("INVALID_DEFINITIONS", "Invalid option definitions: the `type` property must be a setter fuction (default: `Boolean`)");
                        let m;
                        this.some(N => (m = N, F.isDefined(N.alias) && F.isNumber(N.alias))) && Y("INVALID_DEFINITIONS", "Invalid option definition: to avoid ambiguity an alias cannot be numeric [--" + m.name + " alias is -" + m.alias + "]"), this.some(N => (m = N, F.isDefined(N.alias) && N.alias.length !== 1)) && Y("INVALID_DEFINITIONS", "Invalid option definition: an alias must be a single character"), this.some(N => (m = N, N.alias === "-")) && Y("INVALID_DEFINITIONS", 'Invalid option definition: an alias cannot be "-"'), vt(this.map(N => t ? N.name.toLowerCase() : N.name)) && Y("INVALID_DEFINITIONS", "Two or more option definitions have the same name"), vt(this.map(N => t && F.isDefined(N.alias) ? N.alias.toLowerCase() : N.alias)) && Y("INVALID_DEFINITIONS", "Two or more option definitions have the same alias"), this.filter(N => N.defaultOption === !0).length > 1 && Y("INVALID_DEFINITIONS", "Only one option definition can be the defaultOption"), this.some(N => (m = N, N.isBoolean() && N.defaultOption)) && Y("INVALID_DEFINITIONS", `A boolean option ["${m.name}"] can not also be the defaultOption.`)
                    }
                    get(t, s) {
                        if (g(t))
                            if (r.short.test(t)) {
                                const l = E(t);
                                if (s) {
                                    const m = l.toLowerCase();
                                    return this.find(w => F.isDefined(w.alias) && w.alias.toLowerCase() === m)
                                } else return this.find(m => m.alias === l)
                            } else {
                                const l = E(t);
                                if (s) {
                                    const m = l.toLowerCase();
                                    return this.find(w => w.name.toLowerCase() === m)
                                } else return this.find(m => m.name === l)
                            }
                        else return this.find(l => l.name === t)
                    }
                    getDefault() {
                        return this.find(t => t.defaultOption === !0)
                    }
                    isGrouped() {
                        return this.some(t => t.group)
                    }
                    whereGrouped() {
                        return this.filter(yt)
                    }
                    whereNotGrouped() {
                        return this.filter(t => !yt(t))
                    }
                    whereDefaultValueSet() {
                        return this.filter(t => F.isDefined(t.defaultValue))
                    }
                    static from(t, s) {
                        if (t instanceof this) return t;
                        const l = super.from(n(t), m => st.create(m));
                        return l.validate(s), l
                    }
                }

                function Y(e, t) {
                    const s = new Error(t);
                    throw s.name = e, s
                }

                function yt(e) {
                    return n(e.group).some(t => t)
                }

                function vt(e) {
                    const t = {};
                    for (let s = 0; s < e.length; s++) {
                        const l = e[s];
                        if (t[l]) return !0;
                        F.isDefined(l) && (t[l] = !0)
                    }
                }
                const lt = Nt;
                class Pt {
                    constructor(t, s) {
                        this.options = Object.assign({}, s), this.definitions = lt.from(t, this.options.caseInsensitive), this.argv = a.from(this.options.argv), this.argv.hasCombinedShortOptions() && o(this.argv, r.combinedShort.test.bind(r.combinedShort), l => (l = l.slice(1), l.split("").map(m => ({
                            origArg: `-${l}`,
                            arg: "-" + m
                        }))))
                    }*[Symbol.iterator]() {
                        const t = this.definitions;
                        let s, l, m, w, C = !1,
                            A = !1,
                            T;
                        for (let R of this.argv) {
                            if (F.isPlainObject(R) && (T = R.origArg, R = R.arg), A && this.options.stopAtFirstUnknown) {
                                yield {
                                    event: "unknown_value",
                                    arg: R,
                                    name: "_unknown",
                                    value: void 0
                                };
                                continue
                            }
                            if (g(R)) s = t.get(R, this.options.caseInsensitive), l = void 0, s ? (l = s.isBoolean() ? !0 : null, w = "set") : w = "unknown_option";
                            else if (u(R)) {
                                const H = R.match(r.optEquals);
                                s = t.get(H[1], this.options.caseInsensitive), s ? s.isBoolean() ? (yield {
                                    event: "unknown_value",
                                    arg: R,
                                    name: "_unknown",
                                    value: l,
                                    def: s
                                }, w = "set", l = !0) : (w = "set", l = H[2]) : w = "unknown_option"
                            } else k(R) && (s ? (l = R, w = "set") : (s = this.definitions.getDefault(), s && !C ? (l = R, w = "set") : (w = "unknown_value", s = void 0)));
                            m = s ? s.name : "_unknown";
                            const J = {
                                event: w,
                                arg: R,
                                name: m,
                                value: l,
                                def: s
                            };
                            T && (J.subArg = R, J.arg = T), yield J, m === "_unknown" && (A = !0), s && s.defaultOption && !s.isMultiple() && w === "set" && (C = !0), s && s.isBoolean() && (s = void 0), s && !s.multiple && F.isDefined(l) && l !== null && (s = void 0), l = void 0, w = void 0, m = void 0, T = void 0
                        }
                    }
                }
                const Rt = Pt,
                    Q = new WeakMap;
                class xt {
                    constructor(t) {
                        this.definition = new st(t), this.state = null, this.resetToDefault()
                    }
                    get() {
                        return Q.get(this)
                    }
                    set(t) {
                        this._set(t, "set")
                    }
                    _set(t, s) {
                        const l = this.definition;
                        if (l.isMultiple()) {
                            if (t != null) {
                                const m = this.get();
                                this.state === "default" && (m.length = 0), m.push(l.type(t)), this.state = s
                            }
                        } else if (!l.isMultiple() && this.state === "set") {
                            const m = new Error(`Singular option already set [${this.definition.name}=${this.get()}]`);
                            throw m.name = "ALREADY_SET", m.value = t, m.optionName = l.name, m
                        } else t == null ? Q.set(this, t) : (Q.set(this, l.type(t)), this.state = s)
                    }
                    resetToDefault() {
                        F.isDefined(this.definition.defaultValue) ? this.definition.isMultiple() ? Q.set(this, n(this.definition.defaultValue).slice()) : Q.set(this, this.definition.defaultValue) : this.definition.isMultiple() ? Q.set(this, []) : Q.set(this, null), this.state = "default"
                    }
                    static create(t) {
                        return t = new st(t), t.isBoolean() ? Lt.create(t) : new this(t)
                    }
                }
                class Lt extends xt {
                    set(t) {
                        super.set(!0)
                    }
                    static create(t) {
                        return new this(t)
                    }
                }
                const ct = xt;
                var ut = h(6898);
                class Wt extends Map {
                    constructor(t) {
                        super(), this.definitions = lt.from(t), this.set("_unknown", ct.create({
                            name: "_unknown",
                            multiple: !0
                        }));
                        for (const s of this.definitions.whereDefaultValueSet()) this.set(s.name, ct.create(s))
                    }
                    toObject(t) {
                        t = t || {};
                        const s = {};
                        for (const l of this) {
                            const m = t.camelCase && l[0] !== "_unknown" ? ut(l[0]) : l[0],
                                w = l[1];
                            m === "_unknown" && !w.get().length || (s[m] = w.get())
                        }
                        return t.skipUnknown && delete s._unknown, s
                    }
                }
                const wt = Wt;
                class Ft extends wt {
                    toObject(t) {
                        const s = super.toObject({
                                skipUnknown: t.skipUnknown
                            }),
                            l = super.toObject(t),
                            m = l._unknown;
                        delete l._unknown;
                        const w = {
                            _all: l
                        };
                        return m && m.length && (w._unknown = m), this.definitions.whereGrouped().forEach(C => {
                            const A = t.camelCase ? ut(C.name) : C.name,
                                T = s[C.name];
                            for (const R of n(C.group)) w[R] = w[R] || {}, F.isDefined(T) && (w[R][A] = T)
                        }), this.definitions.whereNotGrouped().forEach(C => {
                            const A = t.camelCase ? ut(C.name) : C.name,
                                T = s[C.name];
                            F.isDefined(T) && (w._none || (w._none = {}), w._none[A] = T)
                        }), w
                    }
                }
                const Bt = Ft;

                function Ut(e, t) {
                    t = t || {}, t.stopAtFirstUnknown && (t.partial = !0), e = lt.from(e, t.caseInsensitive);
                    const s = new Rt(e, {
                            argv: t.argv,
                            stopAtFirstUnknown: t.stopAtFirstUnknown,
                            caseInsensitive: t.caseInsensitive
                        }),
                        l = e.isGrouped() ? Bt : wt,
                        m = new l(e);
                    for (const w of s) {
                        const C = w.subArg || w.arg;
                        if (!t.partial) {
                            if (w.event === "unknown_value") {
                                const T = new Error(`Unknown value: ${C}`);
                                throw T.name = "UNKNOWN_VALUE", T.value = C, T
                            } else if (w.event === "unknown_option") {
                                const T = new Error(`Unknown option: ${C}`);
                                throw T.name = "UNKNOWN_OPTION", T.optionName = C, T
                            }
                        }
                        let A;
                        m.has(w.name) ? A = m.get(w.name) : (A = ct.create(w.def), m.set(w.name, A)), w.name === "_unknown" ? A.set(C) : A.set(w.value)
                    }
                    return m.toObject({
                        skipUnknown: !t.partial,
                        camelCase: t.camelCase
                    })
                }
                const $t = Ut;
                var Gt = h(4030);
                const Ot = /(?:\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.))|(?:{(~)?(#?[\w:]+(?:\([^)]*\))?(?:\.#?[\w:]+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(})|((?:.|[\r\n\f])+?)/gi,
                    Et = /(?:^|\.)(?:(?:(\w+)(?:\(([^)]*)\))?)|(?:#(?=[:a-fA-F\d]{2,})([a-fA-F\d]{6})?(?::([a-fA-F\d]{6}))?))/g,
                    zt = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
                    Vt = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,
                    Ht = new Map([
                        ["n", `
`],
                        ["r", "\r"],
                        ["t", "	"],
                        ["b", "\b"],
                        ["f", "\f"],
                        ["v", "\v"],
                        ["0", "\0"],
                        ["\\", "\\"],
                        ["e", "\x1B"],
                        ["a", "\x07"]
                    ]);

                function _t(e) {
                    const t = e[0] === "u",
                        s = e[1] === "{";
                    return t && !s && e.length === 5 || e[0] === "x" && e.length === 3 ? String.fromCharCode(Number.parseInt(e.slice(1), 16)) : t && s ? String.fromCodePoint(Number.parseInt(e.slice(2, -1), 16)) : Ht.get(e) || e
                }

                function Kt(e, t) {
                    const s = [],
                        l = t.trim().split(/\s*,\s*/g);
                    let m;
                    for (const w of l) {
                        const C = Number(w);
                        if (!Number.isNaN(C)) s.push(C);
                        else if (m = w.match(zt)) s.push(m[2].replace(Vt, (A, T, R) => T ? _t(T) : R));
                        else throw new Error(`Invalid Chalk template style argument: ${w} (in style '${e}')`)
                    }
                    return s
                }

                function ht(e) {
                    const t = Number.parseInt(e, 16);
                    return [t >> 16 & 255, t >> 8 & 255, t & 255]
                }

                function Ct(e) {
                    Et.lastIndex = 0;
                    const t = [];
                    let s;
                    for (;
                        (s = Et.exec(e)) !== null;) {
                        const l = s[1];
                        s[2] ? t.push([l, ...Kt(l, s[2])]) : s[3] || s[4] ? (s[3] && t.push(["rgb", ...ht(s[3])]), s[4] && t.push(["bgRgb", ...ht(s[4])])) : t.push([l])
                    }
                    return t
                }

                function ft(e) {
                    const t = {};
                    for (const l of e)
                        for (const m of l.styles) t[m[0]] = l.inverse ? null : m.slice(1);
                    let s = Gt;
                    for (const [l, m] of Object.entries(t))
                        if (Array.isArray(m)) {
                            if (!(l in s)) throw new Error(`Unknown Chalk style: ${l}`);
                            s = m.length > 0 ? s[l](...m) : s[l]
                        } return s
                }

                function Yt(e) {
                    const t = [],
                        s = [];
                    let l = [];
                    if (e.replace(Ot, (m, w, C, A, T, R) => {
                            if (w) l.push(_t(w));
                            else if (A) {
                                const J = l.join("");
                                l = [], s.push(t.length === 0 ? J : ft(t)(J)), t.push({
                                    inverse: C,
                                    styles: Ct(A)
                                })
                            } else if (T) {
                                if (t.length === 0) throw new Error("Found extraneous } in Chalk template literal");
                                s.push(ft(t)(l.join(""))), l = [], t.pop()
                            } else l.push(R)
                        }), s.push(l.join("")), t.length > 0) throw new Error(`Chalk template literal is missing ${t.length} closing bracket${t.length===1?"":"s"} (\`}\`)`);
                    return s.join("")
                }

                function Xt(e, ...t) {
                    if (!Array.isArray(e) || !Array.isArray(e.raw)) throw new TypeError("A tagged template literal must be provided");
                    const s = [e.raw[0]];
                    for (let l = 1; l < e.raw.length; l++) s.push(String(t[l - 1]).replace(/[{}\\]/g, "\\$&"), String(e.raw[l]));
                    return Yt(s.join(""))
                }

                function Jt(e) {
                    return e ? (e = e.replace(/`/g, "\\`"), Xt(Object.assign([], {
                        raw: [e]
                    }))) : ""
                }
                const K = Jt;
                var Zt = h(857);
                class Qt {
                    constructor() {
                        this.lines = []
                    }
                    add(t) {
                        t ? n(t).forEach(s => this.lines.push(s)) : this.lines.push("")
                    }
                    toString() {
                        return this.lines.join(Zt.EOL)
                    }
                    header(t) {
                        t && (this.add(K(`{bold ${t}}`)), this.add())
                    }
                }
                const At = Qt,
                    nt = new WeakMap,
                    St = new WeakMap;
                class qt {
                    constructor(t, s) {
                        this.value = t, St.set(this, s)
                    }
                    set value(t) {
                        nt.set(this, t)
                    }
                    get value() {
                        let t = nt.get(this);
                        const s = St.get(this);
                        return s.get && (t = s.get(t)), t === void 0 ? t = "" : t = String(t), t
                    }
                }
                const Tt = qt;
                class te {
                    constructor(t, s) {
                        this.list = [], this.load(t, s)
                    }
                    load(t, s) {
                        for (const l of n(t)) {
                            const m = new Map(s.list.map(w => [w, new Tt(l[w.name], w)]));
                            this.list.push(m)
                        }
                    }
                }
                const ee = te;
                class O {
                    constructor(t) {
                        this.left = t.left, this.right = t.right
                    }
                    length() {
                        return this.left.length + this.right.length
                    }
                }
                const I = O,
                    P = new WeakMap;
                class X {
                    constructor(t = {}) {
                        this.name = t.name, this.width = t.width, this.maxWidth = t.maxWidth, this.minWidth = t.minWidth, this.noWrap = t.noWrap, this.break = t.break, this.contentWrappable = t.contentWrappable, this.contentWidth = t.contentWidth, this.minContentWidth = t.minContentWidth, this.padding = t.padding || {
                            left: " ",
                            right: " "
                        }, this.generatedWidth = null
                    }
                    set padding(t) {
                        P.set(this, new I(t))
                    }
                    get padding() {
                        return P.get(this)
                    }
                    get wrappedContentWidth() {
                        return Math.max(this.generatedWidth - this.padding.length(), 0)
                    }
                    isResizable() {
                        return !this.isFixed()
                    }
                    isFixed() {
                        return F.isDefined(this.width) || this.noWrap || !this.contentWrappable
                    }
                    generateWidth() {
                        this.generatedWidth = this.width || this.contentWidth + this.padding.length()
                    }
                    generateMinWidth() {
                        this.minWidth = this.minContentWidth + this.padding.length()
                    }
                }
                const G = X,
                    q = new WeakMap;
                class ne {
                    constructor(t) {
                        this.list = [];
                        for (const s of n(t)) this.add(s)
                    }
                    totalWidth() {
                        return this.list.length ? this.list.map(t => t.generatedWidth).reduce((t, s) => t + s) : 0
                    }
                    totalFixedWidth() {
                        return this.getFixed().map(t => t.generatedWidth).reduce((t, s) => t + s, 0)
                    }
                    get(t) {
                        return this.list.find(s => s.name === t)
                    }
                    getResizable() {
                        return this.list.filter(t => t.isResizable())
                    }
                    getFixed() {
                        return this.list.filter(t => t.isFixed())
                    }
                    add(t) {
                        const s = t instanceof G ? t : new G(t);
                        return this.list.push(s), s
                    }
                    get maxWidth() {
                        q.get(this)
                    }
                    set maxWidth(t) {
                        q.set(this, t)
                    }
                    autoSize() {
                        const t = q.get(this);
                        for (const l of this.list) l.generateWidth(), l.generateMinWidth();
                        for (const l of this.list) F.isDefined(l.maxWidth) && l.generatedWidth > l.maxWidth && (l.generatedWidth = l.maxWidth), F.isDefined(l.minWidth) && l.generatedWidth < l.minWidth && (l.generatedWidth = l.minWidth);
                        const s = {
                            total: this.totalWidth(),
                            view: t,
                            diff: this.totalWidth() - t,
                            totalFixed: this.totalFixedWidth(),
                            totalResizable: Math.max(t - this.totalFixedWidth(), 0)
                        };
                        if (s.diff > 0) {
                            const l = this.getResizable();
                            for (const A of l) A.generatedWidth = Math.floor(s.totalResizable / l.length);
                            const m = this.list.filter(A => A.generatedWidth > A.contentWidth),
                                w = this.list.filter(A => A.generatedWidth < A.contentWidth);
                            let C = 0;
                            for (const A of m) {
                                const T = A.generatedWidth;
                                A.generateWidth(), C += T - A.generatedWidth
                            }
                            for (const A of w) A.generatedWidth += Math.floor(C / w.length)
                        }
                        return this
                    }
                    static getColumns(t) {
                        const s = new ne;
                        for (const l of n(t))
                            for (const m in l) {
                                let w = s.get(m);
                                w || (w = s.add({
                                    name: m,
                                    contentWidth: 0,
                                    minContentWidth: 0
                                }))
                            }
                        return s
                    }
                }
                const Te = ne,
                    jt = {
                        chunk: /[^\s-]+?-\b|\S+|\s+|\r\n?|\n/g,
                        ansiEscapeSequence: /\u001b.*?m/g
                    };
                class je {
                    constructor(t = "", s = {}) {
                        this._lines = String(t).split(/\r\n|\n/g), this.options = {
                            eol: `
`,
                            width: 30,
                            ...s
                        }
                    }
                    lines() {
                        return this._lines.map(he, this).map(t => t.match(jt.chunk) || ["~~empty~~"]).map(t => this.options.break ? t.map(Ie, this) : t).map(t => t.flat()).map(t => t.reduce((s, l) => {
                            const m = s[s.length - 1];
                            return re(l).length + re(m).length > this.options.width ? s.push(l) : s[s.length - 1] += l, s
                        }, [""])).flat().map(he, this).filter(t => t.trim()).map(t => t.replace("~~empty~~", ""))
                    }
                    wrap() {
                        return this.lines().join(this.options.eol)
                    }
                    toString() {
                        return this.wrap()
                    }
                    static wrap(t, s) {
                        return new this(t, s).wrap()
                    }
                    static lines(t, s) {
                        return new this(t, s).lines()
                    }
                    static isWrappable(t = "") {
                        const s = String(t).match(jt.chunk);
                        return s ? s.length > 1 : !1
                    }
                    static getChunks(t) {
                        return t.match(jt.chunk) || []
                    }
                }

                function he(e) {
                    return this.options.noTrim ? e : e.trim()
                }

                function re(e) {
                    return e.replace(jt.ansiEscapeSequence, "")
                }

                function Ie(e) {
                    if (re(e).length > this.options.width) {
                        const t = e.split("");
                        let s;
                        const l = [];
                        for (;
                            (s = t.splice(0, this.options.width)).length;) l.push(s.join(""));
                        return l
                    } else return e
                }
                const se = je;
                var fe = h(2877);

                function pe(e, t, s, l, m) {
                    if (B(e) && B(t)) return fe(e, t, pe);
                    if (Array.isArray(e) && Array.isArray(t) && t.length) return t;
                    if (Array.isArray(t) && !t.length) return e;
                    if (!_(e) && Array.isArray(t)) return t
                }

                function ke(...e) {
                    return fe(...e, pe)
                }
                const Me = ke,
                    de = /\u001b.*?m/g;

                function ge(e) {
                    return e.replace(de, "")
                }

                function De(e) {
                    return de.test(e)
                }

                function Ne(e) {
                    const t = e.map(s => s.length);
                    return Math.max(...t)
                }

                function Pe(e, t, s) {
                    const l = e.length - ge(e).length;
                    return e = e || "", (t.left || "") + e.padEnd(s - t.length() + l) + (t.right || "")
                }

                function Re(e) {
                    return se.getChunks(e).reduce((s, l) => Math.max(l.length, s), 0)
                }

                function Le(e) {
                    const s = e.reduce((l, m) => {
                        for (const w of Object.keys(m)) l.includes(w) || l.push(w);
                        return l
                    }, []).filter(l => !e.some(w => {
                        const C = w[l];
                        return F.isDefined(C) && typeof C != "string" || typeof C == "string" && /\S+/.test(C)
                    }));
                    return e.map(l => {
                        for (const m of s) delete l[m];
                        return l
                    })
                }
                class We {
                    constructor(t, s = {}) {
                        const l = {
                            padding: {
                                left: " ",
                                right: " "
                            },
                            maxWidth: 80,
                            columns: [],
                            eol: `
`
                        };
                        this.options = Me(l, s), this.rows = null, this.columns = null, this.load(t)
                    }
                    load(t) {
                        const s = this.options;
                        s.ignoreEmptyColumns && (t = Le(t)), this.columns = Te.getColumns(t), this.columns.maxWidth = s.maxWidth;
                        for (const l of this.columns.list) l.padding = s.padding, l.noWrap = s.noWrap, l.break = s.break, s.break && (l.contentWrappable = !0);
                        for (const l of s.columns) {
                            const m = this.columns.get(l.name);
                            m && (l.padding && (m.padding.left = l.padding.left, m.padding.right = l.padding.right), m.width = l.width, m.maxWidth = l.maxWidth, m.minWidth = l.minWidth, m.noWrap = l.noWrap, m.break = l.break, l.break && (m.contentWrappable = !0), m.get = l.get)
                        }
                        for (const l of n(t))
                            for (const m in l) {
                                const w = this.columns.get(m);
                                let A = new Tt(l[m], w).value;
                                De(A) && (A = ge(A)), A.length > w.contentWidth && (w.contentWidth = A.length);
                                const T = Re(A);
                                T > w.minContentWidth && (w.minContentWidth = T), w.contentWrappable || (w.contentWrappable = se.isWrappable(A))
                            }
                        return this.columns.autoSize(), this.rows = new ee(t, this.columns), this
                    }
                    getWrapped() {
                        return this.columns.autoSize(), this.rows.list.map(t => {
                            const s = [];
                            for (const [l, m] of t.entries()) l.noWrap ? s.push(m.value.split(/\r\n?|\n/)) : s.push(se.lines(m.value, {
                                width: l.wrappedContentWidth,
                                break: l.break,
                                noTrim: this.options.noTrim
                            }));
                            return s
                        })
                    }
                    getLines() {
                        const t = this.getWrapped(),
                            s = [];
                        return t.forEach(l => {
                            const m = Ne(l);
                            for (let w = 0; w < m; w++) {
                                const C = [];
                                l.forEach(A => {
                                    C.push(A[w] || "")
                                }), s.push(C)
                            }
                        }), s
                    }
                    renderLines() {
                        return this.getLines().map(s => s.reduce((l, m, w) => {
                            const C = this.columns.list[w];
                            return l + Pe(m, C.padding, C.generatedWidth)
                        }, ""))
                    }
                    toString() {
                        return this.renderLines().join(this.options.eol) + this.options.eol
                    }
                }
                const pt = We;
                class Fe extends At {
                    constructor(t) {
                        super();
                        let s = n(t.optionList);
                        const l = n(t.hide),
                            m = n(t.group);
                        l.length && (s = s.filter(T => l.indexOf(T.name) === -1)), t.header && this.header(t.header), m.length && (s = s.filter(T => {
                            const R = m.indexOf("_none") > -1 && !F.isDefined(T.group),
                                J = Ue(n(T.group), m);
                            return R || J ? T : void 0
                        }));
                        const w = s.map(T => ({
                                option: Be(T, t.reverseNameOrder),
                                description: K(T.description)
                            })),
                            C = t.tableOptions || {
                                padding: {
                                    left: "  ",
                                    right: " "
                                },
                                columns: [{
                                    name: "option",
                                    noWrap: !0
                                }, {
                                    name: "description",
                                    maxWidth: 80
                                }]
                            },
                            A = new pt(w, C);
                        this.add(A.renderLines()), this.add()
                    }
                }

                function Be(e, t) {
                    let s = e.type ? e.type.name.toLowerCase() : "string";
                    const l = e.multiple || e.lazyMultiple ? "[]" : "";
                    s && (s = s === "boolean" ? "" : `{underline ${s}${l}}`), s = K(e.typeLabel || s);
                    let m = "";
                    return e.alias ? e.name ? t ? m = K(`{bold --${e.name}}, {bold -${e.alias}} ${s}`) : m = K(`{bold -${e.alias}}, {bold --${e.name}} ${s}`) : t ? m = K(`{bold -${e.alias}} ${s}`) : m = K(`{bold -${e.alias}} ${s}`) : m = K(`{bold --${e.name}} ${s}`), m
                }

                function Ue(e, t) {
                    return e.some(function(s) {
                        return t.some(function(l) {
                            return s === l
                        })
                    })
                }
                const $e = Fe;
                class Ge extends At {
                    constructor(t) {
                        if (super(), this.header(t.header), t.content) {
                            if (t.raw) {
                                const s = n(t.content).map(l => K(l));
                                this.add(s)
                            } else this.add(ze(t.content));
                            this.add()
                        }
                    }
                }

                function ze(e) {
                    const t = {
                        left: "  ",
                        right: " "
                    };
                    if (e) {
                        if (F.isString(e)) return new pt({
                            column: K(e)
                        }, {
                            padding: t,
                            maxWidth: 80
                        }).renderLines();
                        if (Array.isArray(e) && e.every(F.isString)) {
                            const s = e.map(m => ({
                                column: K(m)
                            }));
                            return new pt(s, {
                                padding: t,
                                maxWidth: 80
                            }).renderLines()
                        } else {
                            if (Array.isArray(e) && e.every(F.isPlainObject)) return new pt(e.map(l => me(l)), {
                                padding: t
                            }).renderLines();
                            if (F.isPlainObject(e)) {
                                if (!e.options || !e.data) throw new Error(`must have an "options" or "data" property
` + JSON.stringify(e));
                                const s = Object.assign({
                                    padding: t
                                }, e.options);
                                return s.columns && (s.columns = s.columns.map(m => (m.nowrap && (m.noWrap = m.nowrap, delete m.nowrap), m))), new pt(e.data.map(m => me(m)), s).renderLines()
                            } else {
                                const s = `invalid input - 'content' must be a string, array of strings, or array of plain objects:

${JSON.stringify(e)}`;
                                throw new Error(s)
                            }
                        }
                    }
                }

                function me(e) {
                    for (const t in e) e[t] = K(e[t]);
                    return e
                }
                const Ve = Ge;

                function He(e) {
                    return e = n(e), e.length ? `
` + e.map(s => s.optionList ? new $e(s) : new Ve(s)).join(`
`) : ""
                }
                const Ke = He;
                var Ye = h(4157);
                const Xe = require("fs");
                var Je = typeof global == "object" && global && global.Object === Object && global;
                const Ze = Je;
                var Qe = typeof self == "object" && self && self.Object === Object && self,
                    qe = Ze || Qe || Function("return this")();
                const oe = qe;
                var tn = oe.Symbol;
                const It = tn;
                var be = Object.prototype,
                    en = be.hasOwnProperty,
                    nn = be.toString,
                    dt = It ? It.toStringTag : void 0;

                function rn(e) {
                    var t = en.call(e, dt),
                        s = e[dt];
                    try {
                        e[dt] = void 0;
                        var l = !0
                    } catch {}
                    var m = nn.call(e);
                    return l && (t ? e[dt] = s : delete e[dt]), m
                }
                const sn = rn;
                var on = Object.prototype,
                    an = on.toString;

                function ln(e) {
                    return an.call(e)
                }
                const cn = ln;
                var un = "[object Null]",
                    hn = "[object Undefined]",
                    ye = It ? It.toStringTag : void 0;

                function fn(e) {
                    return e == null ? e === void 0 ? hn : un : ye && ye in Object(e) ? sn(e) : cn(e)
                }
                const pn = fn;

                function dn(e) {
                    var t = typeof e;
                    return e != null && (t == "object" || t == "function")
                }
                const ve = dn;
                var gn = "[object AsyncFunction]",
                    mn = "[object Function]",
                    bn = "[object GeneratorFunction]",
                    yn = "[object Proxy]";

                function vn(e) {
                    if (!ve(e)) return !1;
                    var t = pn(e);
                    return t == mn || t == bn || t == gn || t == yn
                }
                const xn = vn;
                var wn = oe["__core-js_shared__"];
                const ie = wn;
                var xe = function() {
                    var e = /[^.]+$/.exec(ie && ie.keys && ie.keys.IE_PROTO || "");
                    return e ? "Symbol(src)_1." + e : ""
                }();

                function On(e) {
                    return !!xe && xe in e
                }
                const En = On;
                var _n = Function.prototype,
                    Cn = _n.toString;

                function An(e) {
                    if (e != null) {
                        try {
                            return Cn.call(e)
                        } catch {}
                        try {
                            return e + ""
                        } catch {}
                    }
                    return ""
                }
                const Sn = An;
                var Tn = /[\\^$.*+?()[\]{}|]/g,
                    jn = /^\[object .+?Constructor\]$/,
                    In = Function.prototype,
                    kn = Object.prototype,
                    Mn = In.toString,
                    Dn = kn.hasOwnProperty,
                    Nn = RegExp("^" + Mn.call(Dn).replace(Tn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

                function Pn(e) {
                    if (!ve(e) || En(e)) return !1;
                    var t = xn(e) ? Nn : jn;
                    return t.test(Sn(e))
                }
                const Rn = Pn;

                function Ln(e, t) {
                    return e == null ? void 0 : e[t]
                }
                const Wn = Ln;

                function Fn(e, t) {
                    var s = Wn(e, t);
                    return Rn(s) ? s : void 0
                }
                const we = Fn;
                var Bn = we(Object, "create");
                const gt = Bn;

                function Un() {
                    this.__data__ = gt ? gt(null) : {}, this.size = 0
                }
                const $n = Un;

                function Gn(e) {
                    var t = this.has(e) && delete this.__data__[e];
                    return this.size -= t ? 1 : 0, t
                }
                const zn = Gn;
                var Vn = "__lodash_hash_undefined__",
                    Hn = Object.prototype,
                    Kn = Hn.hasOwnProperty;

                function Yn(e) {
                    var t = this.__data__;
                    if (gt) {
                        var s = t[e];
                        return s === Vn ? void 0 : s
                    }
                    return Kn.call(t, e) ? t[e] : void 0
                }
                const Xn = Yn;
                var Jn = Object.prototype,
                    Zn = Jn.hasOwnProperty;

                function Qn(e) {
                    var t = this.__data__;
                    return gt ? t[e] !== void 0 : Zn.call(t, e)
                }
                const qn = Qn;
                var tr = "__lodash_hash_undefined__";

                function er(e, t) {
                    var s = this.__data__;
                    return this.size += this.has(e) ? 0 : 1, s[e] = gt && t === void 0 ? tr : t, this
                }
                const nr = er;

                function ot(e) {
                    var t = -1,
                        s = e == null ? 0 : e.length;
                    for (this.clear(); ++t < s;) {
                        var l = e[t];
                        this.set(l[0], l[1])
                    }
                }
                ot.prototype.clear = $n, ot.prototype.delete = zn, ot.prototype.get = Xn, ot.prototype.has = qn, ot.prototype.set = nr;
                const Oe = ot;

                function rr() {
                    this.__data__ = [], this.size = 0
                }
                const sr = rr;

                function or(e, t) {
                    return e === t || e !== e && t !== t
                }
                const ir = or;

                function ar(e, t) {
                    for (var s = e.length; s--;)
                        if (ir(e[s][0], t)) return s;
                    return -1
                }
                const kt = ar;
                var lr = Array.prototype,
                    cr = lr.splice;

                function ur(e) {
                    var t = this.__data__,
                        s = kt(t, e);
                    if (s < 0) return !1;
                    var l = t.length - 1;
                    return s == l ? t.pop() : cr.call(t, s, 1), --this.size, !0
                }
                const hr = ur;

                function fr(e) {
                    var t = this.__data__,
                        s = kt(t, e);
                    return s < 0 ? void 0 : t[s][1]
                }
                const pr = fr;

                function dr(e) {
                    return kt(this.__data__, e) > -1
                }
                const gr = dr;

                function mr(e, t) {
                    var s = this.__data__,
                        l = kt(s, e);
                    return l < 0 ? (++this.size, s.push([e, t])) : s[l][1] = t, this
                }
                const br = mr;

                function it(e) {
                    var t = -1,
                        s = e == null ? 0 : e.length;
                    for (this.clear(); ++t < s;) {
                        var l = e[t];
                        this.set(l[0], l[1])
                    }
                }
                it.prototype.clear = sr, it.prototype.delete = hr, it.prototype.get = pr, it.prototype.has = gr, it.prototype.set = br;
                const yr = it;
                var vr = we(oe, "Map");
                const xr = vr;

                function wr() {
                    this.size = 0, this.__data__ = {
                        hash: new Oe,
                        map: new(xr || yr),
                        string: new Oe
                    }
                }
                const Or = wr;

                function Er(e) {
                    var t = typeof e;
                    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
                }
                const _r = Er;

                function Cr(e, t) {
                    var s = e.__data__;
                    return _r(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map
                }
                const Mt = Cr;

                function Ar(e) {
                    var t = Mt(this, e).delete(e);
                    return this.size -= t ? 1 : 0, t
                }
                const Sr = Ar;

                function Tr(e) {
                    return Mt(this, e).get(e)
                }
                const jr = Tr;

                function Ir(e) {
                    return Mt(this, e).has(e)
                }
                const kr = Ir;

                function Mr(e, t) {
                    var s = Mt(this, e),
                        l = s.size;
                    return s.set(e, t), this.size += s.size == l ? 0 : 1, this
                }
                const Dr = Mr;

                function at(e) {
                    var t = -1,
                        s = e == null ? 0 : e.length;
                    for (this.clear(); ++t < s;) {
                        var l = e[t];
                        this.set(l[0], l[1])
                    }
                }
                at.prototype.clear = Or, at.prototype.delete = Sr, at.prototype.get = jr, at.prototype.has = kr, at.prototype.set = Dr;
                const Ee = at;
                var Nr = "Expected a function";

                function ae(e, t) {
                    if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(Nr);
                    var s = function() {
                        var l = arguments,
                            m = t ? t.apply(this, l) : l[0],
                            w = s.cache;
                        if (w.has(m)) return w.get(m);
                        var C = e.apply(this, l);
                        return s.cache = w.set(m, C) || w, C
                    };
                    return s.cache = new(ae.Cache || Ee), s
                }
                ae.Cache = Ee;
                const Pr = ae;
                var le = h(6928);
                const Rr = [/disable-web-security/i, /allow-running-insecure-content/i],
                    _e = /^slack:/i,
                    Lr = "webdriver",
                    Ce = /^(dev[0-9]{0,4}|staging|qa[0-9]{0,4})$/i,
                    Wr = /^((?:remote-)?dev[0-9]{0,4}|staging|qa[0-9]{0,4})$/i,
                    Fr = Pr(() => $r(process.argv)),
                    Ae = [{
                        alias: "h",
                        type: Boolean,
                        name: "help",
                        description: "Print this usage message"
                    }, {
                        alias: "u",
                        type: Boolean,
                        name: "startup",
                        description: "The app is being started via a Startup shortcut. Hide the window on Win32"
                    }, {
                        alias: "v",
                        type: Boolean,
                        name: "version",
                        description: "Print the version."
                    }, {
                        alias: "x",
                        type: Boolean,
                        name: "rxLogging",
                        description: "Enable more verbose logging"
                    }, {
                        alias: "g",
                        type: String,
                        name: "logLevel",
                        description: "Set the minimum log level, e.g., 'info', 'debug', etc."
                    }, {
                        alias: "r",
                        type: String,
                        name: "resourcePath",
                        description: "Set the path to the Slack's source directory and enable dev-mode"
                    }, {
                        alias: "s",
                        type: Boolean,
                        name: "silent",
                        description: "Do not stream console output to stdout"
                    }, {
                        alias: "i",
                        name: "integrationTestMode",
                        description: "Run the application in integration test mode, which enables use of a different user data folder",
                        type: Boolean
                    }],
                    Br = [{
                        alias: "e",
                        type: String,
                        name: "devEnv",
                        description: "Set QA/DEV Env"
                    }, {
                        alias: "z",
                        type: Boolean,
                        name: "electronVersion",
                        description: "Print the electron version."
                    }, {
                        alias: "t",
                        type: String,
                        name: "tsaToken",
                        description: "Token for TSAuth"
                    }, {
                        alias: "j",
                        type: String,
                        name: "jsPath",
                        description: "Sets the js_path to allow running from webapp source"
                    }, {
                        alias: "y",
                        type: String,
                        name: "test-type",
                        description: "Specify 'webdriver' when running ChromeDriver tests"
                    }, {
                        type: String,
                        name: "customAppIcon",
                        description: "Specify icon to use for the app. macOS development builds only."
                    }, {
                        alias: "f",
                        type: Array,
                        name: "fragments",
                        description: "Append known fragments to the webapp URL"
                    }, {
                        type: Number,
                        name: "devEnvClientEnvironment",
                        description: "Sets clientEnvironment when booting into a dev environment. This value will not be persisted in storage."
                    }, {
                        name: "troubleshoot",
                        type: Boolean,
                        description: "Launch desktop client troubleshooter"
                    }, {
                        name: "userAgent",
                        type: Boolean,
                        description: "Print the app's userAgent"
                    }, {
                        name: "bootClient",
                        type: Boolean,
                        description: "Attempts to boot /client rather than /signin at startup when in gov mode. This flag is set when auto-switching from commercial to gov mode."
                    }],
                    Ur = [{
                        type: String,
                        name: "proxy-server",
                        description: "Use a custom proxy configuration. Example: --proxy-server=my.proxy.server:8080"
                    }];

                function $r(e) {
                    var T, R, J;
                    let t;
                    e.length > 0 && e[0] === process.execPath ? t = [...e.slice(1)] : t = [...e];
                    let s = t.find(H => !!H.match(_e)) || "";
                    t = t.filter(H => !H.match(_e)), t.find(H => !!Rr.find(N => !!H.match(N))) && process.exit(-1);
                    const l = $t([...Ae, ...Br], {
                        argv: t,
                        partial: !0,
                        camelCase: !0,
                        caseInsensitive: !0
                    });
                    if (l.help) {
                        const H = Ke([{
                            header: "Options",
                            optionList: [...Ae, ...Ur]
                        }]);
                        console.log(H), process.exit(0)
                    }
                    l.version && (console.log("4.47.72"), process.exit(0)), l.electronVersion && (console.log(process.versions.electron), process.exit(0));
                    const m = {
                        resourcePath: "",
                        logLevel: l.logLevel,
                        integrationTestMode: l.integrationTestMode,
                        rxLogging: l.rxLogging,
                        silent: l.silent,
                        tsaToken: l.tsaToken,
                        customAppIcon: l.customAppIcon,
                        troubleshoot: l.troubleshoot,
                        bootFragments: (T = l.fragments) != null ? T : [],
                        userAgent: l.userAgent,
                        bootClient: l.bootClient
                    };
                    l.testType && (m.chromeDriver = l.testType === Lr), l.startup && (m.invokedOnStartup = l.startup), Object.keys(l).includes("jsPath") && (m.webappSrcPath = Wr.test((R = l.jsPath) != null ? R : "") ? l.jsPath : "1");
                    let w = Ce.test((J = l.devEnv) != null ? J : "") ? l.devEnv : void 0,
                        C = m.chromeDriver,
                        A = le.join(process.resourcesPath, "app.asar");
                    if (l.resourcePath && (C = !0, A = l.resourcePath), Xe.existsSync(A) || (A = le.dirname(__dirname)), !Ye.app.isPackaged) {
                        const H = t.find(N => Ce.test(N));
                        H && (s = `slack://open?devEnv=${H}`, w = H)
                    }
                    return l.devEnvClientEnvironment === d.RESTRICTED ? m.devEnvClientEnvironment = d.RESTRICTED : l.devEnvClientEnvironment === d.MILITARY && (m.devEnvClientEnvironment = d.MILITARY), m.resourcePath = le.resolve(A), C && (m.isDevMode = C), s && (m.protoUrl = s), w && (m.devEnv = w), m
                }
            },
            9483: (p, v, h) => {
                "use strict";
                h.d(v, {
                    B: () => r
                });
                var d = h(4157),
                    b = h.n(d),
                    f = h(6928),
                    y = h.n(f);
                const n = "Slack",
                    i = /^[\\\/]{2,}[^\\\/]+[\\\/]+[^\\\/]+/;

                function o(a, c) {
                    const u = a.devEnv,
                        g = a.integrationTestMode || !!(process.env && process.env.SLACK_INTEGRATION_TEST_MODE),
                        x = !a.devEnv && a.isDevMode;
                    let E = n;
                    return g ? E = "SlackIntegrationTest" : u || x ? (u && (E = "SlackDevEnv"), x && (E = "SlackDevMode")) : c && (E = "SlackUserData"), E
                }

                function r(a) {
                    let c = d.app.getPath("appData");
                    const u = process.env && process.env.SLACK_DISABLE_FOLDER_REDIRECTION === "true",
                        g = !1,
                        x = o(a, g);
                    (g || x !== n) && (g && (c = f.join(d.app.getPath("home"), "AppData", "Local")), d.app.setPath("userData", f.join(c, x)))
                }
            },
            621: (p, v, h) => {
                "use strict";
                p = h.nmd(p);
                const d = (c, u) => (...g) => `\x1B[${c(...g)+u}m`,
                    b = (c, u) => (...g) => {
                        const x = c(...g);
                        return `\x1B[${38+u};5;${x}m`
                    },
                    f = (c, u) => (...g) => {
                        const x = c(...g);
                        return `\x1B[${38+u};2;${x[0]};${x[1]};${x[2]}m`
                    },
                    y = c => c,
                    n = (c, u, g) => [c, u, g],
                    i = (c, u, g) => {
                        Object.defineProperty(c, u, {
                            get: () => {
                                const x = g();
                                return Object.defineProperty(c, u, {
                                    value: x,
                                    enumerable: !0,
                                    configurable: !0
                                }), x
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    };
                let o;
                const r = (c, u, g, x) => {
                    o === void 0 && (o = h(694));
                    const E = x ? 10 : 0,
                        k = {};
                    for (const [M, U] of Object.entries(o)) {
                        const $ = M === "ansi16" ? "ansi" : M;
                        M === u ? k[$] = c(g, E) : typeof U == "object" && (k[$] = c(U[u], E))
                    }
                    return k
                };

                function a() {
                    const c = new Map,
                        u = {
                            modifier: {
                                reset: [0, 0],
                                bold: [1, 22],
                                dim: [2, 22],
                                italic: [3, 23],
                                underline: [4, 24],
                                inverse: [7, 27],
                                hidden: [8, 28],
                                strikethrough: [9, 29]
                            },
                            color: {
                                black: [30, 39],
                                red: [31, 39],
                                green: [32, 39],
                                yellow: [33, 39],
                                blue: [34, 39],
                                magenta: [35, 39],
                                cyan: [36, 39],
                                white: [37, 39],
                                blackBright: [90, 39],
                                redBright: [91, 39],
                                greenBright: [92, 39],
                                yellowBright: [93, 39],
                                blueBright: [94, 39],
                                magentaBright: [95, 39],
                                cyanBright: [96, 39],
                                whiteBright: [97, 39]
                            },
                            bgColor: {
                                bgBlack: [40, 49],
                                bgRed: [41, 49],
                                bgGreen: [42, 49],
                                bgYellow: [43, 49],
                                bgBlue: [44, 49],
                                bgMagenta: [45, 49],
                                bgCyan: [46, 49],
                                bgWhite: [47, 49],
                                bgBlackBright: [100, 49],
                                bgRedBright: [101, 49],
                                bgGreenBright: [102, 49],
                                bgYellowBright: [103, 49],
                                bgBlueBright: [104, 49],
                                bgMagentaBright: [105, 49],
                                bgCyanBright: [106, 49],
                                bgWhiteBright: [107, 49]
                            }
                        };
                    u.color.gray = u.color.blackBright, u.bgColor.bgGray = u.bgColor.bgBlackBright, u.color.grey = u.color.blackBright, u.bgColor.bgGrey = u.bgColor.bgBlackBright;
                    for (const [g, x] of Object.entries(u)) {
                        for (const [E, k] of Object.entries(x)) u[E] = {
                            open: `\x1B[${k[0]}m`,
                            close: `\x1B[${k[1]}m`
                        }, x[E] = u[E], c.set(k[0], k[1]);
                        Object.defineProperty(u, g, {
                            value: x,
                            enumerable: !1
                        })
                    }
                    return Object.defineProperty(u, "codes", {
                        value: c,
                        enumerable: !1
                    }), u.color.close = "\x1B[39m", u.bgColor.close = "\x1B[49m", i(u.color, "ansi", () => r(d, "ansi16", y, !1)), i(u.color, "ansi256", () => r(b, "ansi256", y, !1)), i(u.color, "ansi16m", () => r(f, "rgb", n, !1)), i(u.bgColor, "ansi", () => r(d, "ansi16", y, !0)), i(u.bgColor, "ansi256", () => r(b, "ansi256", y, !0)), i(u.bgColor, "ansi16m", () => r(f, "rgb", n, !0)), u
                }
                Object.defineProperty(p, "exports", {
                    enumerable: !0,
                    get: a
                })
            },
            4707: (p, v, h) => {
                const d = h(4382),
                    b = {};
                for (const n of Object.keys(d)) b[d[n]] = n;
                const f = {
                    rgb: {
                        channels: 3,
                        labels: "rgb"
                    },
                    hsl: {
                        channels: 3,
                        labels: "hsl"
                    },
                    hsv: {
                        channels: 3,
                        labels: "hsv"
                    },
                    hwb: {
                        channels: 3,
                        labels: "hwb"
                    },
                    cmyk: {
                        channels: 4,
                        labels: "cmyk"
                    },
                    xyz: {
                        channels: 3,
                        labels: "xyz"
                    },
                    lab: {
                        channels: 3,
                        labels: "lab"
                    },
                    lch: {
                        channels: 3,
                        labels: "lch"
                    },
                    hex: {
                        channels: 1,
                        labels: ["hex"]
                    },
                    keyword: {
                        channels: 1,
                        labels: ["keyword"]
                    },
                    ansi16: {
                        channels: 1,
                        labels: ["ansi16"]
                    },
                    ansi256: {
                        channels: 1,
                        labels: ["ansi256"]
                    },
                    hcg: {
                        channels: 3,
                        labels: ["h", "c", "g"]
                    },
                    apple: {
                        channels: 3,
                        labels: ["r16", "g16", "b16"]
                    },
                    gray: {
                        channels: 1,
                        labels: ["gray"]
                    }
                };
                p.exports = f;
                for (const n of Object.keys(f)) {
                    if (!("channels" in f[n])) throw new Error("missing channels property: " + n);
                    if (!("labels" in f[n])) throw new Error("missing channel labels property: " + n);
                    if (f[n].labels.length !== f[n].channels) throw new Error("channel and label counts mismatch: " + n);
                    const {
                        channels: i,
                        labels: o
                    } = f[n];
                    delete f[n].channels, delete f[n].labels, Object.defineProperty(f[n], "channels", {
                        value: i
                    }), Object.defineProperty(f[n], "labels", {
                        value: o
                    })
                }
                f.rgb.hsl = function(n) {
                    const i = n[0] / 255,
                        o = n[1] / 255,
                        r = n[2] / 255,
                        a = Math.min(i, o, r),
                        c = Math.max(i, o, r),
                        u = c - a;
                    let g, x;
                    c === a ? g = 0 : i === c ? g = (o - r) / u : o === c ? g = 2 + (r - i) / u : r === c && (g = 4 + (i - o) / u), g = Math.min(g * 60, 360), g < 0 && (g += 360);
                    const E = (a + c) / 2;
                    return c === a ? x = 0 : E <= .5 ? x = u / (c + a) : x = u / (2 - c - a), [g, x * 100, E * 100]
                }, f.rgb.hsv = function(n) {
                    let i, o, r, a, c;
                    const u = n[0] / 255,
                        g = n[1] / 255,
                        x = n[2] / 255,
                        E = Math.max(u, g, x),
                        k = E - Math.min(u, g, x),
                        M = function(U) {
                            return (E - U) / 6 / k + 1 / 2
                        };
                    return k === 0 ? (a = 0, c = 0) : (c = k / E, i = M(u), o = M(g), r = M(x), u === E ? a = r - o : g === E ? a = .3333333333333333 + i - r : x === E && (a = .6666666666666666 + o - i), a < 0 ? a += 1 : a > 1 && (a -= 1)), [a * 360, c * 100, E * 100]
                }, f.rgb.hwb = function(n) {
                    const i = n[0],
                        o = n[1];
                    let r = n[2];
                    const a = f.rgb.hsl(n)[0],
                        c = 1 / 255 * Math.min(i, Math.min(o, r));
                    return r = 1 - .00392156862745098 * Math.max(i, Math.max(o, r)), [a, c * 100, r * 100]
                }, f.rgb.cmyk = function(n) {
                    const i = n[0] / 255,
                        o = n[1] / 255,
                        r = n[2] / 255,
                        a = Math.min(1 - i, 1 - o, 1 - r),
                        c = (1 - i - a) / (1 - a) || 0,
                        u = (1 - o - a) / (1 - a) || 0,
                        g = (1 - r - a) / (1 - a) || 0;
                    return [c * 100, u * 100, g * 100, a * 100]
                };

                function y(n, i) {
                    return (n[0] - i[0]) ** 2 + (n[1] - i[1]) ** 2 + (n[2] - i[2]) ** 2
                }
                f.rgb.keyword = function(n) {
                    const i = b[n];
                    if (i) return i;
                    let o = 1 / 0,
                        r;
                    for (const a of Object.keys(d)) {
                        const c = d[a],
                            u = y(n, c);
                        u < o && (o = u, r = a)
                    }
                    return r
                }, f.keyword.rgb = function(n) {
                    return d[n]
                }, f.rgb.xyz = function(n) {
                    let i = n[0] / 255,
                        o = n[1] / 255,
                        r = n[2] / 255;
                    i = i > .04045 ? ((i + .055) / 1.055) ** 2.4 : i / 12.92, o = o > .04045 ? ((o + .055) / 1.055) ** 2.4 : o / 12.92, r = r > .04045 ? ((r + .055) / 1.055) ** 2.4 : r / 12.92;
                    const a = i * .4124 + o * .3576 + r * .1805,
                        c = i * .2126 + o * .7152 + r * .0722,
                        u = i * .0193 + o * .1192 + r * .9505;
                    return [a * 100, c * 100, u * 100]
                }, f.rgb.lab = function(n) {
                    const i = f.rgb.xyz(n);
                    let o = i[0],
                        r = i[1],
                        a = i[2];
                    o /= 95.047, r /= 100, a /= 108.883, o = o > .008856 ? o ** .3333333333333333 : 7.787 * o + .13793103448275862, r = r > .008856 ? r ** .3333333333333333 : 7.787 * r + .13793103448275862, a = a > .008856 ? a ** .3333333333333333 : 7.787 * a + .13793103448275862;
                    const c = 116 * r - 16,
                        u = 500 * (o - r),
                        g = 200 * (r - a);
                    return [c, u, g]
                }, f.hsl.rgb = function(n) {
                    const i = n[0] / 360,
                        o = n[1] / 100,
                        r = n[2] / 100;
                    let a, c, u;
                    if (o === 0) return u = r * 255, [u, u, u];
                    r < .5 ? a = r * (1 + o) : a = r + o - r * o;
                    const g = 2 * r - a,
                        x = [0, 0, 0];
                    for (let E = 0; E < 3; E++) c = i + .3333333333333333 * -(E - 1), c < 0 && c++, c > 1 && c--, 6 * c < 1 ? u = g + (a - g) * 6 * c : 2 * c < 1 ? u = a : 3 * c < 2 ? u = g + (a - g) * (.6666666666666666 - c) * 6 : u = g, x[E] = u * 255;
                    return x
                }, f.hsl.hsv = function(n) {
                    const i = n[0];
                    let o = n[1] / 100,
                        r = n[2] / 100,
                        a = o;
                    const c = Math.max(r, .01);
                    r *= 2, o *= r <= 1 ? r : 2 - r, a *= c <= 1 ? c : 2 - c;
                    const u = (r + o) / 2,
                        g = r === 0 ? 2 * a / (c + a) : 2 * o / (r + o);
                    return [i, g * 100, u * 100]
                }, f.hsv.rgb = function(n) {
                    const i = n[0] / 60,
                        o = n[1] / 100;
                    let r = n[2] / 100;
                    const a = Math.floor(i) % 6,
                        c = i - Math.floor(i),
                        u = 255 * r * (1 - o),
                        g = 255 * r * (1 - o * c),
                        x = 255 * r * (1 - o * (1 - c));
                    switch (r *= 255, a) {
                        case 0:
                            return [r, x, u];
                        case 1:
                            return [g, r, u];
                        case 2:
                            return [u, r, x];
                        case 3:
                            return [u, g, r];
                        case 4:
                            return [x, u, r];
                        case 5:
                            return [r, u, g]
                    }
                }, f.hsv.hsl = function(n) {
                    const i = n[0],
                        o = n[1] / 100,
                        r = n[2] / 100,
                        a = Math.max(r, .01);
                    let c, u;
                    u = (2 - o) * r;
                    const g = (2 - o) * a;
                    return c = o * a, c /= g <= 1 ? g : 2 - g, c = c || 0, u /= 2, [i, c * 100, u * 100]
                }, f.hwb.rgb = function(n) {
                    const i = n[0] / 360;
                    let o = n[1] / 100,
                        r = n[2] / 100;
                    const a = o + r;
                    let c;
                    a > 1 && (o /= a, r /= a);
                    const u = Math.floor(6 * i),
                        g = 1 - r;
                    c = 6 * i - u, u & 1 && (c = 1 - c);
                    const x = o + c * (g - o);
                    let E, k, M;
                    switch (u) {
                        default:
                        case 6:
                        case 0:
                            E = g, k = x, M = o;
                            break;
                        case 1:
                            E = x, k = g, M = o;
                            break;
                        case 2:
                            E = o, k = g, M = x;
                            break;
                        case 3:
                            E = o, k = x, M = g;
                            break;
                        case 4:
                            E = x, k = o, M = g;
                            break;
                        case 5:
                            E = g, k = o, M = x;
                            break
                    }
                    return [E * 255, k * 255, M * 255]
                }, f.cmyk.rgb = function(n) {
                    const i = n[0] / 100,
                        o = n[1] / 100,
                        r = n[2] / 100,
                        a = n[3] / 100,
                        c = 1 - Math.min(1, i * (1 - a) + a),
                        u = 1 - Math.min(1, o * (1 - a) + a),
                        g = 1 - Math.min(1, r * (1 - a) + a);
                    return [c * 255, u * 255, g * 255]
                }, f.xyz.rgb = function(n) {
                    const i = n[0] / 100,
                        o = n[1] / 100,
                        r = n[2] / 100;
                    let a, c, u;
                    return a = i * 3.2406 + o * -1.5372 + r * -.4986, c = i * -.9689 + o * 1.8758 + r * .0415, u = i * .0557 + o * -.204 + r * 1.057, a = a > .0031308 ? 1.055 * a ** .4166666666666667 - .055 : a * 12.92, c = c > .0031308 ? 1.055 * c ** .4166666666666667 - .055 : c * 12.92, u = u > .0031308 ? 1.055 * u ** .4166666666666667 - .055 : u * 12.92, a = Math.min(Math.max(0, a), 1), c = Math.min(Math.max(0, c), 1), u = Math.min(Math.max(0, u), 1), [a * 255, c * 255, u * 255]
                }, f.xyz.lab = function(n) {
                    let i = n[0],
                        o = n[1],
                        r = n[2];
                    i /= 95.047, o /= 100, r /= 108.883, i = i > .008856 ? i ** .3333333333333333 : 7.787 * i + .13793103448275862, o = o > .008856 ? o ** .3333333333333333 : 7.787 * o + .13793103448275862, r = r > .008856 ? r ** .3333333333333333 : 7.787 * r + .13793103448275862;
                    const a = 116 * o - 16,
                        c = 500 * (i - o),
                        u = 200 * (o - r);
                    return [a, c, u]
                }, f.lab.xyz = function(n) {
                    const i = n[0],
                        o = n[1],
                        r = n[2];
                    let a, c, u;
                    c = (i + 16) / 116, a = o / 500 + c, u = c - r / 200;
                    const g = c ** 3,
                        x = a ** 3,
                        E = u ** 3;
                    return c = g > .008856 ? g : (c - .13793103448275862) / 7.787, a = x > .008856 ? x : (a - .13793103448275862) / 7.787, u = E > .008856 ? E : (u - .13793103448275862) / 7.787, a *= 95.047, c *= 100, u *= 108.883, [a, c, u]
                }, f.lab.lch = function(n) {
                    const i = n[0],
                        o = n[1],
                        r = n[2];
                    let a;
                    a = Math.atan2(r, o) * 360 / 2 / Math.PI, a < 0 && (a += 360);
                    const u = Math.sqrt(o * o + r * r);
                    return [i, u, a]
                }, f.lch.lab = function(n) {
                    const i = n[0],
                        o = n[1],
                        a = n[2] / 360 * 2 * Math.PI,
                        c = o * Math.cos(a),
                        u = o * Math.sin(a);
                    return [i, c, u]
                }, f.rgb.ansi16 = function(n, i = null) {
                    const [o, r, a] = n;
                    let c = i === null ? f.rgb.hsv(n)[2] : i;
                    if (c = Math.round(c / 50), c === 0) return 30;
                    let u = 30 + (Math.round(a / 255) << 2 | Math.round(r / 255) << 1 | Math.round(o / 255));
                    return c === 2 && (u += 60), u
                }, f.hsv.ansi16 = function(n) {
                    return f.rgb.ansi16(f.hsv.rgb(n), n[2])
                }, f.rgb.ansi256 = function(n) {
                    const i = n[0],
                        o = n[1],
                        r = n[2];
                    return i === o && o === r ? i < 8 ? 16 : i > 248 ? 231 : Math.round((i - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(i / 255 * 5) + 6 * Math.round(o / 255 * 5) + Math.round(r / 255 * 5)
                }, f.ansi16.rgb = function(n) {
                    let i = n % 10;
                    if (i === 0 || i === 7) return n > 50 && (i += 3.5), i = i / 10.5 * 255, [i, i, i];
                    const o = (~~(n > 50) + 1) * .5,
                        r = (i & 1) * o * 255,
                        a = (i >> 1 & 1) * o * 255,
                        c = (i >> 2 & 1) * o * 255;
                    return [r, a, c]
                }, f.ansi256.rgb = function(n) {
                    if (n >= 232) {
                        const c = (n - 232) * 10 + 8;
                        return [c, c, c]
                    }
                    n -= 16;
                    let i;
                    const o = Math.floor(n / 36) / 5 * 255,
                        r = Math.floor((i = n % 36) / 6) / 5 * 255,
                        a = i % 6 / 5 * 255;
                    return [o, r, a]
                }, f.rgb.hex = function(n) {
                    const o = (((Math.round(n[0]) & 255) << 16) + ((Math.round(n[1]) & 255) << 8) + (Math.round(n[2]) & 255)).toString(16).toUpperCase();
                    return "000000".substring(o.length) + o
                }, f.hex.rgb = function(n) {
                    const i = n.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                    if (!i) return [0, 0, 0];
                    let o = i[0];
                    i[0].length === 3 && (o = o.split("").map(g => g + g).join(""));
                    const r = parseInt(o, 16),
                        a = r >> 16 & 255,
                        c = r >> 8 & 255,
                        u = r & 255;
                    return [a, c, u]
                }, f.rgb.hcg = function(n) {
                    const i = n[0] / 255,
                        o = n[1] / 255,
                        r = n[2] / 255,
                        a = Math.max(Math.max(i, o), r),
                        c = Math.min(Math.min(i, o), r),
                        u = a - c;
                    let g, x;
                    return u < 1 ? g = c / (1 - u) : g = 0, u <= 0 ? x = 0 : a === i ? x = (o - r) / u % 6 : a === o ? x = 2 + (r - i) / u : x = 4 + (i - o) / u, x /= 6, x %= 1, [x * 360, u * 100, g * 100]
                }, f.hsl.hcg = function(n) {
                    const i = n[1] / 100,
                        o = n[2] / 100,
                        r = o < .5 ? 2 * i * o : 2 * i * (1 - o);
                    let a = 0;
                    return r < 1 && (a = (o - .5 * r) / (1 - r)), [n[0], r * 100, a * 100]
                }, f.hsv.hcg = function(n) {
                    const i = n[1] / 100,
                        o = n[2] / 100,
                        r = i * o;
                    let a = 0;
                    return r < 1 && (a = (o - r) / (1 - r)), [n[0], r * 100, a * 100]
                }, f.hcg.rgb = function(n) {
                    const i = n[0] / 360,
                        o = n[1] / 100,
                        r = n[2] / 100;
                    if (o === 0) return [r * 255, r * 255, r * 255];
                    const a = [0, 0, 0],
                        c = i % 1 * 6,
                        u = c % 1,
                        g = 1 - u;
                    let x = 0;
                    switch (Math.floor(c)) {
                        case 0:
                            a[0] = 1, a[1] = u, a[2] = 0;
                            break;
                        case 1:
                            a[0] = g, a[1] = 1, a[2] = 0;
                            break;
                        case 2:
                            a[0] = 0, a[1] = 1, a[2] = u;
                            break;
                        case 3:
                            a[0] = 0, a[1] = g, a[2] = 1;
                            break;
                        case 4:
                            a[0] = u, a[1] = 0, a[2] = 1;
                            break;
                        default:
                            a[0] = 1, a[1] = 0, a[2] = g
                    }
                    return x = (1 - o) * r, [(o * a[0] + x) * 255, (o * a[1] + x) * 255, (o * a[2] + x) * 255]
                }, f.hcg.hsv = function(n) {
                    const i = n[1] / 100,
                        o = n[2] / 100,
                        r = i + o * (1 - i);
                    let a = 0;
                    return r > 0 && (a = i / r), [n[0], a * 100, r * 100]
                }, f.hcg.hsl = function(n) {
                    const i = n[1] / 100,
                        r = n[2] / 100 * (1 - i) + .5 * i;
                    let a = 0;
                    return r > 0 && r < .5 ? a = i / (2 * r) : r >= .5 && r < 1 && (a = i / (2 * (1 - r))), [n[0], a * 100, r * 100]
                }, f.hcg.hwb = function(n) {
                    const i = n[1] / 100,
                        o = n[2] / 100,
                        r = i + o * (1 - i);
                    return [n[0], (r - i) * 100, (1 - r) * 100]
                }, f.hwb.hcg = function(n) {
                    const i = n[1] / 100,
                        r = 1 - n[2] / 100,
                        a = r - i;
                    let c = 0;
                    return a < 1 && (c = (r - a) / (1 - a)), [n[0], a * 100, c * 100]
                }, f.apple.rgb = function(n) {
                    return [n[0] / 65535 * 255, n[1] / 65535 * 255, n[2] / 65535 * 255]
                }, f.rgb.apple = function(n) {
                    return [n[0] / 255 * 65535, n[1] / 255 * 65535, n[2] / 255 * 65535]
                }, f.gray.rgb = function(n) {
                    return [n[0] / 100 * 255, n[0] / 100 * 255, n[0] / 100 * 255]
                }, f.gray.hsl = function(n) {
                    return [0, 0, n[0]]
                }, f.gray.hsv = f.gray.hsl, f.gray.hwb = function(n) {
                    return [0, 100, n[0]]
                }, f.gray.cmyk = function(n) {
                    return [0, 0, 0, n[0]]
                }, f.gray.lab = function(n) {
                    return [n[0], 0, 0]
                }, f.gray.hex = function(n) {
                    const i = Math.round(n[0] / 100 * 255) & 255,
                        r = ((i << 16) + (i << 8) + i).toString(16).toUpperCase();
                    return "000000".substring(r.length) + r
                }, f.rgb.gray = function(n) {
                    return [(n[0] + n[1] + n[2]) / 3 / 255 * 100]
                }
            },
            694: (p, v, h) => {
                const d = h(4707),
                    b = h(211),
                    f = {},
                    y = Object.keys(d);

                function n(o) {
                    const r = function(...a) {
                        const c = a[0];
                        return c == null ? c : (c.length > 1 && (a = c), o(a))
                    };
                    return "conversion" in o && (r.conversion = o.conversion), r
                }

                function i(o) {
                    const r = function(...a) {
                        const c = a[0];
                        if (c == null) return c;
                        c.length > 1 && (a = c);
                        const u = o(a);
                        if (typeof u == "object")
                            for (let g = u.length, x = 0; x < g; x++) u[x] = Math.round(u[x]);
                        return u
                    };
                    return "conversion" in o && (r.conversion = o.conversion), r
                }
                y.forEach(o => {
                    f[o] = {}, Object.defineProperty(f[o], "channels", {
                        value: d[o].channels
                    }), Object.defineProperty(f[o], "labels", {
                        value: d[o].labels
                    });
                    const r = b(o);
                    Object.keys(r).forEach(c => {
                        const u = r[c];
                        f[o][c] = i(u), f[o][c].raw = n(u)
                    })
                }), p.exports = f
            },
            211: (p, v, h) => {
                const d = h(4707);

                function b() {
                    const i = {},
                        o = Object.keys(d);
                    for (let r = o.length, a = 0; a < r; a++) i[o[a]] = {
                        distance: -1,
                        parent: null
                    };
                    return i
                }

                function f(i) {
                    const o = b(),
                        r = [i];
                    for (o[i].distance = 0; r.length;) {
                        const a = r.pop(),
                            c = Object.keys(d[a]);
                        for (let u = c.length, g = 0; g < u; g++) {
                            const x = c[g],
                                E = o[x];
                            E.distance === -1 && (E.distance = o[a].distance + 1, E.parent = a, r.unshift(x))
                        }
                    }
                    return o
                }

                function y(i, o) {
                    return function(r) {
                        return o(i(r))
                    }
                }

                function n(i, o) {
                    const r = [o[i].parent, i];
                    let a = d[o[i].parent][i],
                        c = o[i].parent;
                    for (; o[c].parent;) r.unshift(o[c].parent), a = y(d[o[c].parent][c], a), c = o[c].parent;
                    return a.conversion = r, a
                }
                p.exports = function(i) {
                    const o = f(i),
                        r = {},
                        a = Object.keys(o);
                    for (let c = a.length, u = 0; u < c; u++) {
                        const g = a[u];
                        o[g].parent !== null && (r[g] = n(g, o))
                    }
                    return r
                }
            },
            4030: (p, v, h) => {
                "use strict";
                const d = h(621),
                    {
                        stdout: b,
                        stderr: f
                    } = h(1829),
                    {
                        stringReplaceAll: y,
                        stringEncaseCRLFWithFirstIndex: n
                    } = h(3600),
                    {
                        isArray: i
                    } = Array,
                    o = ["ansi", "ansi", "ansi256", "ansi16m"],
                    r = Object.create(null),
                    a = (S, _ = {}) => {
                        if (_.level && !(Number.isInteger(_.level) && _.level >= 0 && _.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
                        const j = b ? b.level : 0;
                        S.level = _.level === void 0 ? j : _.level
                    };
                class c {
                    constructor(_) {
                        return u(_)
                    }
                }
                const u = S => {
                    const _ = {};
                    return a(_, S), _.template = (...j) => B(_.template, ...j), Object.setPrototypeOf(_, g.prototype), Object.setPrototypeOf(_.template, _), _.template.constructor = () => {
                        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")
                    }, _.template.Instance = c, _.template
                };

                function g(S) {
                    return u(S)
                }
                for (const [S, _] of Object.entries(d)) r[S] = {
                    get() {
                        const j = M(this, k(_.open, _.close, this._styler), this._isEmpty);
                        return Object.defineProperty(this, S, {
                            value: j
                        }), j
                    }
                };
                r.visible = {
                    get() {
                        const S = M(this, this._styler, !0);
                        return Object.defineProperty(this, "visible", {
                            value: S
                        }), S
                    }
                };
                const x = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
                for (const S of x) r[S] = {
                    get() {
                        const {
                            level: _
                        } = this;
                        return function(...j) {
                            const L = k(d.color[o[_]][S](...j), d.color.close, this._styler);
                            return M(this, L, this._isEmpty)
                        }
                    }
                };
                for (const S of x) {
                    const _ = "bg" + S[0].toUpperCase() + S.slice(1);
                    r[_] = {
                        get() {
                            const {
                                level: j
                            } = this;
                            return function(...L) {
                                const W = k(d.bgColor[o[j]][S](...L), d.bgColor.close, this._styler);
                                return M(this, W, this._isEmpty)
                            }
                        }
                    }
                }
                const E = Object.defineProperties(() => {}, {
                        ...r,
                        level: {
                            enumerable: !0,
                            get() {
                                return this._generator.level
                            },
                            set(S) {
                                this._generator.level = S
                            }
                        }
                    }),
                    k = (S, _, j) => {
                        let L, W;
                        return j === void 0 ? (L = S, W = _) : (L = j.openAll + S, W = _ + j.closeAll), {
                            open: S,
                            close: _,
                            openAll: L,
                            closeAll: W,
                            parent: j
                        }
                    },
                    M = (S, _, j) => {
                        const L = (...W) => i(W[0]) && i(W[0].raw) ? U(L, B(L, ...W)) : U(L, W.length === 1 ? "" + W[0] : W.join(" "));
                        return Object.setPrototypeOf(L, E), L._generator = S, L._styler = _, L._isEmpty = j, L
                    },
                    U = (S, _) => {
                        if (S.level <= 0 || !_) return S._isEmpty ? "" : _;
                        let j = S._styler;
                        if (j === void 0) return _;
                        const {
                            openAll: L,
                            closeAll: W
                        } = j;
                        if (_.indexOf("\x1B") !== -1)
                            for (; j !== void 0;) _ = y(_, j.close, j.open), j = j.parent;
                        const V = _.indexOf(`
`);
                        return V !== -1 && (_ = n(_, W, L, V)), L + _ + W
                    };
                let $;
                const B = (S, ..._) => {
                    const [j] = _;
                    if (!i(j) || !i(j.raw)) return _.join(" ");
                    const L = _.slice(1),
                        W = [j.raw[0]];
                    for (let V = 1; V < j.length; V++) W.push(String(L[V - 1]).replace(/[{}\\]/g, "\\$&"), String(j.raw[V]));
                    return $ === void 0 && ($ = h(2397)), $(S, W.join(""))
                };
                Object.defineProperties(g.prototype, r);
                const Z = g();
                Z.supportsColor = b, Z.stderr = g({
                    level: f ? f.level : 0
                }), Z.stderr.supportsColor = f, p.exports = Z
            },
            2397: p => {
                "use strict";
                const v = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
                    h = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
                    d = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
                    b = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,
                    f = new Map([
                        ["n", `
`],
                        ["r", "\r"],
                        ["t", "	"],
                        ["b", "\b"],
                        ["f", "\f"],
                        ["v", "\v"],
                        ["0", "\0"],
                        ["\\", "\\"],
                        ["e", "\x1B"],
                        ["a", "\x07"]
                    ]);

                function y(r) {
                    const a = r[0] === "u",
                        c = r[1] === "{";
                    return a && !c && r.length === 5 || r[0] === "x" && r.length === 3 ? String.fromCharCode(parseInt(r.slice(1), 16)) : a && c ? String.fromCodePoint(parseInt(r.slice(2, -1), 16)) : f.get(r) || r
                }

                function n(r, a) {
                    const c = [],
                        u = a.trim().split(/\s*,\s*/g);
                    let g;
                    for (const x of u) {
                        const E = Number(x);
                        if (!Number.isNaN(E)) c.push(E);
                        else if (g = x.match(d)) c.push(g[2].replace(b, (k, M, U) => M ? y(M) : U));
                        else throw new Error(`Invalid Chalk template style argument: ${x} (in style '${r}')`)
                    }
                    return c
                }

                function i(r) {
                    h.lastIndex = 0;
                    const a = [];
                    let c;
                    for (;
                        (c = h.exec(r)) !== null;) {
                        const u = c[1];
                        if (c[2]) {
                            const g = n(u, c[2]);
                            a.push([u].concat(g))
                        } else a.push([u])
                    }
                    return a
                }

                function o(r, a) {
                    const c = {};
                    for (const g of a)
                        for (const x of g.styles) c[x[0]] = g.inverse ? null : x.slice(1);
                    let u = r;
                    for (const [g, x] of Object.entries(c))
                        if (Array.isArray(x)) {
                            if (!(g in u)) throw new Error(`Unknown Chalk style: ${g}`);
                            u = x.length > 0 ? u[g](...x) : u[g]
                        } return u
                }
                p.exports = (r, a) => {
                    const c = [],
                        u = [];
                    let g = [];
                    if (a.replace(v, (x, E, k, M, U, $) => {
                            if (E) g.push(y(E));
                            else if (M) {
                                const B = g.join("");
                                g = [], u.push(c.length === 0 ? B : o(r, c)(B)), c.push({
                                    inverse: k,
                                    styles: i(M)
                                })
                            } else if (U) {
                                if (c.length === 0) throw new Error("Found extraneous } in Chalk template literal");
                                u.push(o(r, c)(g.join(""))), g = [], c.pop()
                            } else g.push($)
                        }), u.push(g.join("")), c.length > 0) {
                        const x = `Chalk template literal is missing ${c.length} closing bracket${c.length===1?"":"s"} (\`}\`)`;
                        throw new Error(x)
                    }
                    return u.join("")
                }
            },
            3600: p => {
                "use strict";
                const v = (d, b, f) => {
                        let y = d.indexOf(b);
                        if (y === -1) return d;
                        const n = b.length;
                        let i = 0,
                            o = "";
                        do o += d.substr(i, y - i) + b + f, i = y + n, y = d.indexOf(b, i); while (y !== -1);
                        return o += d.substr(i), o
                    },
                    h = (d, b, f, y) => {
                        let n = 0,
                            i = "";
                        do {
                            const o = d[y - 1] === "\r";
                            i += d.substr(n, (o ? y - 1 : y) - n) + b + (o ? `\r
` : `
`) + f, n = y + 1, y = d.indexOf(`
`, n)
                        } while (y !== -1);
                        return i += d.substr(n), i
                    };
                p.exports = {
                    stringReplaceAll: v,
                    stringEncaseCRLFWithFirstIndex: h
                }
            },
            4382: p => {
                "use strict";
                p.exports = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                }
            },
            6086: p => {
                "use strict";
                p.exports = (v, h = process.argv) => {
                    const d = v.startsWith("-") ? "" : v.length === 1 ? "-" : "--",
                        b = h.indexOf(d + v),
                        f = h.indexOf("--");
                    return b !== -1 && (f === -1 || b < f)
                }
            },
            6898: p => {
                var v = 1 / 0,
                    h = "[object Symbol]",
                    d = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
                    b = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                    f = "\\ud800-\\udfff",
                    y = "\\u0300-\\u036f\\ufe20-\\ufe23",
                    n = "\\u20d0-\\u20f0",
                    i = "\\u2700-\\u27bf",
                    o = "a-z\\xdf-\\xf6\\xf8-\\xff",
                    r = "\\xac\\xb1\\xd7\\xf7",
                    a = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
                    c = "\\u2000-\\u206f",
                    u = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                    g = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                    x = "\\ufe0e\\ufe0f",
                    E = r + a + c + u,
                    k = "['\u2019]",
                    M = "[" + f + "]",
                    U = "[" + E + "]",
                    $ = "[" + y + n + "]",
                    B = "\\d+",
                    Z = "[" + i + "]",
                    S = "[" + o + "]",
                    _ = "[^" + f + E + B + i + o + g + "]",
                    j = "\\ud83c[\\udffb-\\udfff]",
                    L = "(?:" + $ + "|" + j + ")",
                    W = "[^" + f + "]",
                    V = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                    et = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                    D = "[" + g + "]",
                    rt = "\\u200d",
                    tt = "(?:" + S + "|" + _ + ")",
                    Dt = "(?:" + D + "|" + _ + ")",
                    mt = "(?:" + k + "(?:d|ll|m|re|s|t|ve))?",
                    F = "(?:" + k + "(?:D|LL|M|RE|S|T|VE))?",
                    bt = L + "?",
                    st = "[" + x + "]?",
                    Nt = "(?:" + rt + "(?:" + [W, V, et].join("|") + ")" + st + bt + ")*",
                    Y = st + bt + Nt,
                    yt = "(?:" + [Z, V, et].join("|") + ")" + Y,
                    vt = "(?:" + [W + $ + "?", $, V, et, M].join("|") + ")",
                    lt = RegExp(k, "g"),
                    Pt = RegExp($, "g"),
                    Rt = RegExp(j + "(?=" + j + ")|" + vt + Y, "g"),
                    Q = RegExp([D + "?" + S + "+" + mt + "(?=" + [U, D, "$"].join("|") + ")", Dt + "+" + F + "(?=" + [U, D + tt, "$"].join("|") + ")", D + "?" + tt + "+" + mt, D + "+" + F, B, yt].join("|"), "g"),
                    xt = RegExp("[" + rt + f + y + n + x + "]"),
                    Lt = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                    ct = {
                        \u00C0: "A",
                        \u00C1: "A",
                        \u00C2: "A",
                        \u00C3: "A",
                        \u00C4: "A",
                        \u00C5: "A",
                        \u00E0: "a",
                        \u00E1: "a",
                        \u00E2: "a",
                        \u00E3: "a",
                        \u00E4: "a",
                        \u00E5: "a",
                        \u00C7: "C",
                        \u00E7: "c",
                        \u00D0: "D",
                        \u00F0: "d",
                        \u00C8: "E",
                        \u00C9: "E",
                        \u00CA: "E",
                        \u00CB: "E",
                        \u00E8: "e",
                        \u00E9: "e",
                        \u00EA: "e",
                        \u00EB: "e",
                        \u00CC: "I",
                        \u00CD: "I",
                        \u00CE: "I",
                        \u00CF: "I",
                        \u00EC: "i",
                        \u00ED: "i",
                        \u00EE: "i",
                        \u00EF: "i",
                        \u00D1: "N",
                        \u00F1: "n",
                        \u00D2: "O",
                        \u00D3: "O",
                        \u00D4: "O",
                        \u00D5: "O",
                        \u00D6: "O",
                        \u00D8: "O",
                        \u00F2: "o",
                        \u00F3: "o",
                        \u00F4: "o",
                        \u00F5: "o",
                        \u00F6: "o",
                        \u00F8: "o",
                        \u00D9: "U",
                        \u00DA: "U",
                        \u00DB: "U",
                        \u00DC: "U",
                        \u00F9: "u",
                        \u00FA: "u",
                        \u00FB: "u",
                        \u00FC: "u",
                        \u00DD: "Y",
                        \u00FD: "y",
                        \u00FF: "y",
                        \u00C6: "Ae",
                        \u00E6: "ae",
                        \u00DE: "Th",
                        \u00FE: "th",
                        \u00DF: "ss",
                        \u0100: "A",
                        \u0102: "A",
                        \u0104: "A",
                        \u0101: "a",
                        \u0103: "a",
                        \u0105: "a",
                        \u0106: "C",
                        \u0108: "C",
                        \u010A: "C",
                        \u010C: "C",
                        \u0107: "c",
                        \u0109: "c",
                        \u010B: "c",
                        \u010D: "c",
                        \u010E: "D",
                        \u0110: "D",
                        \u010F: "d",
                        \u0111: "d",
                        \u0112: "E",
                        \u0114: "E",
                        \u0116: "E",
                        \u0118: "E",
                        \u011A: "E",
                        \u0113: "e",
                        \u0115: "e",
                        \u0117: "e",
                        \u0119: "e",
                        \u011B: "e",
                        \u011C: "G",
                        \u011E: "G",
                        \u0120: "G",
                        \u0122: "G",
                        \u011D: "g",
                        \u011F: "g",
                        \u0121: "g",
                        \u0123: "g",
                        \u0124: "H",
                        \u0126: "H",
                        \u0125: "h",
                        \u0127: "h",
                        \u0128: "I",
                        \u012A: "I",
                        \u012C: "I",
                        \u012E: "I",
                        \u0130: "I",
                        \u0129: "i",
                        \u012B: "i",
                        \u012D: "i",
                        \u012F: "i",
                        \u0131: "i",
                        \u0134: "J",
                        \u0135: "j",
                        \u0136: "K",
                        \u0137: "k",
                        \u0138: "k",
                        \u0139: "L",
                        \u013B: "L",
                        \u013D: "L",
                        \u013F: "L",
                        \u0141: "L",
                        \u013A: "l",
                        \u013C: "l",
                        \u013E: "l",
                        \u0140: "l",
                        \u0142: "l",
                        \u0143: "N",
                        \u0145: "N",
                        \u0147: "N",
                        \u014A: "N",
                        \u0144: "n",
                        \u0146: "n",
                        \u0148: "n",
                        \u014B: "n",
                        \u014C: "O",
                        \u014E: "O",
                        \u0150: "O",
                        \u014D: "o",
                        \u014F: "o",
                        \u0151: "o",
                        \u0154: "R",
                        \u0156: "R",
                        \u0158: "R",
                        \u0155: "r",
                        \u0157: "r",
                        \u0159: "r",
                        \u015A: "S",
                        \u015C: "S",
                        \u015E: "S",
                        \u0160: "S",
                        \u015B: "s",
                        \u015D: "s",
                        \u015F: "s",
                        \u0161: "s",
                        \u0162: "T",
                        \u0164: "T",
                        \u0166: "T",
                        \u0163: "t",
                        \u0165: "t",
                        \u0167: "t",
                        \u0168: "U",
                        \u016A: "U",
                        \u016C: "U",
                        \u016E: "U",
                        \u0170: "U",
                        \u0172: "U",
                        \u0169: "u",
                        \u016B: "u",
                        \u016D: "u",
                        \u016F: "u",
                        \u0171: "u",
                        \u0173: "u",
                        \u0174: "W",
                        \u0175: "w",
                        \u0176: "Y",
                        \u0177: "y",
                        \u0178: "Y",
                        \u0179: "Z",
                        \u017B: "Z",
                        \u017D: "Z",
                        \u017A: "z",
                        \u017C: "z",
                        \u017E: "z",
                        \u0132: "IJ",
                        \u0133: "ij",
                        \u0152: "Oe",
                        \u0153: "oe",
                        \u0149: "'n",
                        \u017F: "ss"
                    },
                    ut = typeof global == "object" && global && global.Object === Object && global,
                    Wt = typeof self == "object" && self && self.Object === Object && self,
                    wt = ut || Wt || Function("return this")();

                function Ft(O, I, P, X) {
                    var G = -1,
                        q = O ? O.length : 0;
                    for (X && q && (P = O[++G]); ++G < q;) P = I(P, O[G], G, O);
                    return P
                }

                function Bt(O) {
                    return O.split("")
                }

                function Ut(O) {
                    return O.match(d) || []
                }

                function $t(O) {
                    return function(I) {
                        return O == null ? void 0 : O[I]
                    }
                }
                var Gt = $t(ct);

                function Ot(O) {
                    return xt.test(O)
                }

                function Et(O) {
                    return Lt.test(O)
                }

                function zt(O) {
                    return Ot(O) ? Vt(O) : Bt(O)
                }

                function Vt(O) {
                    return O.match(Rt) || []
                }

                function Ht(O) {
                    return O.match(Q) || []
                }
                var _t = Object.prototype,
                    Kt = _t.toString,
                    ht = wt.Symbol,
                    Ct = ht ? ht.prototype : void 0,
                    ft = Ct ? Ct.toString : void 0;

                function Yt(O, I, P) {
                    var X = -1,
                        G = O.length;
                    I < 0 && (I = -I > G ? 0 : G + I), P = P > G ? G : P, P < 0 && (P += G), G = I > P ? 0 : P - I >>> 0, I >>>= 0;
                    for (var q = Array(G); ++X < G;) q[X] = O[X + I];
                    return q
                }

                function Xt(O) {
                    if (typeof O == "string") return O;
                    if (At(O)) return ft ? ft.call(O) : "";
                    var I = O + "";
                    return I == "0" && 1 / O == -v ? "-0" : I
                }

                function Jt(O, I, P) {
                    var X = O.length;
                    return P = P === void 0 ? X : P, !I && P >= X ? O : Yt(O, I, P)
                }

                function K(O) {
                    return function(I) {
                        I = nt(I);
                        var P = Ot(I) ? zt(I) : void 0,
                            X = P ? P[0] : I.charAt(0),
                            G = P ? Jt(P, 1).join("") : I.slice(1);
                        return X[O]() + G
                    }
                }

                function Zt(O) {
                    return function(I) {
                        return Ft(ee(Tt(I).replace(lt, "")), O, "")
                    }
                }

                function Qt(O) {
                    return !!O && typeof O == "object"
                }

                function At(O) {
                    return typeof O == "symbol" || Qt(O) && Kt.call(O) == h
                }

                function nt(O) {
                    return O == null ? "" : Xt(O)
                }
                var St = Zt(function(O, I, P) {
                    return I = I.toLowerCase(), O + (P ? qt(I) : I)
                });

                function qt(O) {
                    return te(nt(O).toLowerCase())
                }

                function Tt(O) {
                    return O = nt(O), O && O.replace(b, Gt).replace(Pt, "")
                }
                var te = K("toUpperCase");

                function ee(O, I, P) {
                    return O = nt(O), I = P ? void 0 : I, I === void 0 ? Et(O) ? Ht(O) : Ut(O) : O.match(I) || []
                }
                p.exports = St
            },
            4523: (p, v, h) => {
                var d = h(983),
                    b = d.Symbol;
                p.exports = b
            },
            8275: p => {
                function v(h, d, b) {
                    switch (b.length) {
                        case 0:
                            return h.call(d);
                        case 1:
                            return h.call(d, b[0]);
                        case 2:
                            return h.call(d, b[0], b[1]);
                        case 3:
                            return h.call(d, b[0], b[1], b[2])
                    }
                    return h.apply(d, b)
                }
                p.exports = v
            },
            1981: (p, v, h) => {
                var d = h(1462),
                    b = h(6018),
                    f = h(9783),
                    y = h(2826),
                    n = h(3203),
                    i = h(4585),
                    o = Object.prototype,
                    r = o.hasOwnProperty;

                function a(c, u) {
                    var g = f(c),
                        x = !g && b(c),
                        E = !g && !x && y(c),
                        k = !g && !x && !E && i(c),
                        M = g || x || E || k,
                        U = M ? d(c.length, String) : [],
                        $ = U.length;
                    for (var B in c)(u || r.call(c, B)) && !(M && (B == "length" || E && (B == "offset" || B == "parent") || k && (B == "buffer" || B == "byteLength" || B == "byteOffset") || n(B, $))) && U.push(B);
                    return U
                }
                p.exports = a
            },
            6713: (p, v, h) => {
                var d = h(46),
                    b = h(6478),
                    f = Object.prototype,
                    y = f.hasOwnProperty;

                function n(i, o, r) {
                    var a = i[o];
                    (!(y.call(i, o) && b(a, r)) || r === void 0 && !(o in i)) && d(i, o, r)
                }
                p.exports = n
            },
            46: (p, v, h) => {
                var d = h(8797);

                function b(f, y, n) {
                    y == "__proto__" && d ? d(f, y, {
                        configurable: !0,
                        enumerable: !0,
                        value: n,
                        writable: !0
                    }) : f[y] = n
                }
                p.exports = b
            },
            2870: (p, v, h) => {
                var d = h(4523),
                    b = h(8173),
                    f = h(7368),
                    y = "[object Null]",
                    n = "[object Undefined]",
                    i = d ? d.toStringTag : void 0;

                function o(r) {
                    return r == null ? r === void 0 ? n : y : i && i in Object(r) ? b(r) : f(r)
                }
                p.exports = o
            },
            6276: (p, v, h) => {
                var d = h(2870),
                    b = h(512),
                    f = "[object Arguments]";

                function y(n) {
                    return b(n) && d(n) == f
                }
                p.exports = y
            },
            5933: (p, v, h) => {
                var d = h(1104),
                    b = h(2474),
                    f = h(9991),
                    y = h(8987),
                    n = /[\\^$.*+?()[\]{}|]/g,
                    i = /^\[object .+?Constructor\]$/,
                    o = Function.prototype,
                    r = Object.prototype,
                    a = o.toString,
                    c = r.hasOwnProperty,
                    u = RegExp("^" + a.call(c).replace(n, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

                function g(x) {
                    if (!f(x) || b(x)) return !1;
                    var E = d(x) ? u : i;
                    return E.test(y(x))
                }
                p.exports = g
            },
            7: (p, v, h) => {
                var d = h(2870),
                    b = h(1840),
                    f = h(512),
                    y = "[object Arguments]",
                    n = "[object Array]",
                    i = "[object Boolean]",
                    o = "[object Date]",
                    r = "[object Error]",
                    a = "[object Function]",
                    c = "[object Map]",
                    u = "[object Number]",
                    g = "[object Object]",
                    x = "[object RegExp]",
                    E = "[object Set]",
                    k = "[object String]",
                    M = "[object WeakMap]",
                    U = "[object ArrayBuffer]",
                    $ = "[object DataView]",
                    B = "[object Float32Array]",
                    Z = "[object Float64Array]",
                    S = "[object Int8Array]",
                    _ = "[object Int16Array]",
                    j = "[object Int32Array]",
                    L = "[object Uint8Array]",
                    W = "[object Uint8ClampedArray]",
                    V = "[object Uint16Array]",
                    et = "[object Uint32Array]",
                    D = {};
                D[B] = D[Z] = D[S] = D[_] = D[j] = D[L] = D[W] = D[V] = D[et] = !0, D[y] = D[n] = D[U] = D[i] = D[$] = D[o] = D[r] = D[a] = D[c] = D[u] = D[g] = D[x] = D[E] = D[k] = D[M] = !1;

                function rt(tt) {
                    return f(tt) && b(tt.length) && !!D[d(tt)]
                }
                p.exports = rt
            },
            374: (p, v, h) => {
                var d = h(9025),
                    b = h(8072),
                    f = Object.prototype,
                    y = f.hasOwnProperty;

                function n(i) {
                    if (!d(i)) return b(i);
                    var o = [];
                    for (var r in Object(i)) y.call(i, r) && r != "constructor" && o.push(r);
                    return o
                }
                p.exports = n
            },
            4388: (p, v, h) => {
                var d = h(1786),
                    b = h(9735),
                    f = h(3987);

                function y(n, i) {
                    return f(b(n, i, d), n + "")
                }
                p.exports = y
            },
            7212: (p, v, h) => {
                var d = h(5744),
                    b = h(8797),
                    f = h(1786),
                    y = b ? function(n, i) {
                        return b(n, "toString", {
                            configurable: !0,
                            enumerable: !1,
                            value: d(i),
                            writable: !0
                        })
                    } : f;
                p.exports = y
            },
            1462: p => {
                function v(h, d) {
                    for (var b = -1, f = Array(h); ++b < h;) f[b] = d(b);
                    return f
                }
                p.exports = v
            },
            9191: p => {
                function v(h) {
                    return function(d) {
                        return h(d)
                    }
                }
                p.exports = v
            },
            6573: (p, v, h) => {
                var d = h(6713),
                    b = h(46);

                function f(y, n, i, o) {
                    var r = !i;
                    i || (i = {});
                    for (var a = -1, c = n.length; ++a < c;) {
                        var u = n[a],
                            g = o ? o(i[u], y[u], u, i, y) : void 0;
                        g === void 0 && (g = y[u]), r ? b(i, u, g) : d(i, u, g)
                    }
                    return i
                }
                p.exports = f
            },
            5307: (p, v, h) => {
                var d = h(983),
                    b = d["__core-js_shared__"];
                p.exports = b
            },
            2057: (p, v, h) => {
                var d = h(4388),
                    b = h(9010);

                function f(y) {
                    return d(function(n, i) {
                        var o = -1,
                            r = i.length,
                            a = r > 1 ? i[r - 1] : void 0,
                            c = r > 2 ? i[2] : void 0;
                        for (a = y.length > 3 && typeof a == "function" ? (r--, a) : void 0, c && b(i[0], i[1], c) && (a = r < 3 ? void 0 : a, r = 1), n = Object(n); ++o < r;) {
                            var u = i[o];
                            u && y(n, u, o, a)
                        }
                        return n
                    })
                }
                p.exports = f
            },
            8797: (p, v, h) => {
                var d = h(1724),
                    b = function() {
                        try {
                            var f = d(Object, "defineProperty");
                            return f({}, "", {}), f
                        } catch {}
                    }();
                p.exports = b
            },
            674: p => {
                var v = typeof global == "object" && global && global.Object === Object && global;
                p.exports = v
            },
            1724: (p, v, h) => {
                var d = h(5933),
                    b = h(4854);

                function f(y, n) {
                    var i = b(y, n);
                    return d(i) ? i : void 0
                }
                p.exports = f
            },
            8173: (p, v, h) => {
                var d = h(4523),
                    b = Object.prototype,
                    f = b.hasOwnProperty,
                    y = b.toString,
                    n = d ? d.toStringTag : void 0;

                function i(o) {
                    var r = f.call(o, n),
                        a = o[n];
                    try {
                        o[n] = void 0;
                        var c = !0
                    } catch {}
                    var u = y.call(o);
                    return c && (r ? o[n] = a : delete o[n]), u
                }
                p.exports = i
            },
            4854: p => {
                function v(h, d) {
                    return h == null ? void 0 : h[d]
                }
                p.exports = v
            },
            3203: p => {
                var v = 9007199254740991,
                    h = /^(?:0|[1-9]\d*)$/;

                function d(b, f) {
                    var y = typeof b;
                    return f = f == null ? v : f, !!f && (y == "number" || y != "symbol" && h.test(b)) && b > -1 && b % 1 == 0 && b < f
                }
                p.exports = d
            },
            9010: (p, v, h) => {
                var d = h(6478),
                    b = h(8768),
                    f = h(3203),
                    y = h(9991);

                function n(i, o, r) {
                    if (!y(r)) return !1;
                    var a = typeof o;
                    return (a == "number" ? b(r) && f(o, r.length) : a == "string" && o in r) ? d(r[o], i) : !1
                }
                p.exports = n
            },
            2474: (p, v, h) => {
                var d = h(5307),
                    b = function() {
                        var y = /[^.]+$/.exec(d && d.keys && d.keys.IE_PROTO || "");
                        return y ? "Symbol(src)_1." + y : ""
                    }();

                function f(y) {
                    return !!b && b in y
                }
                p.exports = f
            },
            9025: p => {
                var v = Object.prototype;

                function h(d) {
                    var b = d && d.constructor,
                        f = typeof b == "function" && b.prototype || v;
                    return d === f
                }
                p.exports = h
            },
            8072: (p, v, h) => {
                var d = h(9757),
                    b = d(Object.keys, Object);
                p.exports = b
            },
            2319: (p, v, h) => {
                p = h.nmd(p);
                var d = h(674),
                    b = v && !v.nodeType && v,
                    f = b && !0 && p && !p.nodeType && p,
                    y = f && f.exports === b,
                    n = y && d.process,
                    i = function() {
                        try {
                            var o = f && f.require && f.require("util").types;
                            return o || n && n.binding && n.binding("util")
                        } catch {}
                    }();
                p.exports = i
            },
            7368: p => {
                var v = Object.prototype,
                    h = v.toString;

                function d(b) {
                    return h.call(b)
                }
                p.exports = d
            },
            9757: p => {
                function v(h, d) {
                    return function(b) {
                        return h(d(b))
                    }
                }
                p.exports = v
            },
            9735: (p, v, h) => {
                var d = h(8275),
                    b = Math.max;

                function f(y, n, i) {
                    return n = b(n === void 0 ? y.length - 1 : n, 0),
                        function() {
                            for (var o = arguments, r = -1, a = b(o.length - n, 0), c = Array(a); ++r < a;) c[r] = o[n + r];
                            r = -1;
                            for (var u = Array(n + 1); ++r < n;) u[r] = o[r];
                            return u[n] = i(c), d(y, this, u)
                        }
                }
                p.exports = f
            },
            983: (p, v, h) => {
                var d = h(674),
                    b = typeof self == "object" && self && self.Object === Object && self,
                    f = d || b || Function("return this")();
                p.exports = f
            },
            3987: (p, v, h) => {
                var d = h(7212),
                    b = h(3921),
                    f = b(d);
                p.exports = f
            },
            3921: p => {
                var v = 800,
                    h = 16,
                    d = Date.now;

                function b(f) {
                    var y = 0,
                        n = 0;
                    return function() {
                        var i = d(),
                            o = h - (i - n);
                        if (n = i, o > 0) {
                            if (++y >= v) return arguments[0]
                        } else y = 0;
                        return f.apply(void 0, arguments)
                    }
                }
                p.exports = b
            },
            8987: p => {
                var v = Function.prototype,
                    h = v.toString;

                function d(b) {
                    if (b != null) {
                        try {
                            return h.call(b)
                        } catch {}
                        try {
                            return b + ""
                        } catch {}
                    }
                    return ""
                }
                p.exports = d
            },
            2877: (p, v, h) => {
                var d = h(6573),
                    b = h(2057),
                    f = h(5820),
                    y = b(function(n, i, o, r) {
                        d(i, f(i), n, r)
                    });
                p.exports = y
            },
            5744: p => {
                function v(h) {
                    return function() {
                        return h
                    }
                }
                p.exports = v
            },
            6478: p => {
                function v(h, d) {
                    return h === d || h !== h && d !== d
                }
                p.exports = v
            },
            1786: p => {
                function v(h) {
                    return h
                }
                p.exports = v
            },
            6018: (p, v, h) => {
                var d = h(6276),
                    b = h(512),
                    f = Object.prototype,
                    y = f.hasOwnProperty,
                    n = f.propertyIsEnumerable,
                    i = d(function() {
                        return arguments
                    }()) ? d : function(o) {
                        return b(o) && y.call(o, "callee") && !n.call(o, "callee")
                    };
                p.exports = i
            },
            9783: p => {
                var v = Array.isArray;
                p.exports = v
            },
            8768: (p, v, h) => {
                var d = h(1104),
                    b = h(1840);

                function f(y) {
                    return y != null && b(y.length) && !d(y)
                }
                p.exports = f
            },
            2826: (p, v, h) => {
                p = h.nmd(p);
                var d = h(983),
                    b = h(9673),
                    f = v && !v.nodeType && v,
                    y = f && !0 && p && !p.nodeType && p,
                    n = y && y.exports === f,
                    i = n ? d.Buffer : void 0,
                    o = i ? i.isBuffer : void 0,
                    r = o || b;
                p.exports = r
            },
            1104: (p, v, h) => {
                var d = h(2870),
                    b = h(9991),
                    f = "[object AsyncFunction]",
                    y = "[object Function]",
                    n = "[object GeneratorFunction]",
                    i = "[object Proxy]";

                function o(r) {
                    if (!b(r)) return !1;
                    var a = d(r);
                    return a == y || a == n || a == f || a == i
                }
                p.exports = o
            },
            1840: p => {
                var v = 9007199254740991;

                function h(d) {
                    return typeof d == "number" && d > -1 && d % 1 == 0 && d <= v
                }
                p.exports = h
            },
            9991: p => {
                function v(h) {
                    var d = typeof h;
                    return h != null && (d == "object" || d == "function")
                }
                p.exports = v
            },
            512: p => {
                function v(h) {
                    return h != null && typeof h == "object"
                }
                p.exports = v
            },
            4585: (p, v, h) => {
                var d = h(7),
                    b = h(9191),
                    f = h(2319),
                    y = f && f.isTypedArray,
                    n = y ? b(y) : d;
                p.exports = n
            },
            5820: (p, v, h) => {
                var d = h(1981),
                    b = h(374),
                    f = h(8768);

                function y(n) {
                    return f(n) ? d(n) : b(n)
                }
                p.exports = y
            },
            9673: p => {
                function v() {
                    return !1
                }
                p.exports = v
            },
            1829: (p, v, h) => {
                "use strict";
                const d = h(857),
                    b = h(2018),
                    f = h(6086),
                    {
                        env: y
                    } = process;
                let n;
                f("no-color") || f("no-colors") || f("color=false") || f("color=never") ? n = 0 : (f("color") || f("colors") || f("color=true") || f("color=always")) && (n = 1), "FORCE_COLOR" in y && (y.FORCE_COLOR === "true" ? n = 1 : y.FORCE_COLOR === "false" ? n = 0 : n = y.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(y.FORCE_COLOR, 10), 3));

                function i(a) {
                    return a === 0 ? !1 : {
                        level: a,
                        hasBasic: !0,
                        has256: a >= 2,
                        has16m: a >= 3
                    }
                }

                function o(a, c) {
                    if (n === 0) return 0;
                    if (f("color=16m") || f("color=full") || f("color=truecolor")) return 3;
                    if (f("color=256")) return 2;
                    if (a && !c && n === void 0) return 0;
                    const u = n || 0;
                    if (y.TERM === "dumb") return u;
                    if ("CI" in y) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some(g => g in y) || y.CI_NAME === "codeship" ? 1 : u;
                    if ("TEAMCITY_VERSION" in y) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(y.TEAMCITY_VERSION) ? 1 : 0;
                    if (y.COLORTERM === "truecolor") return 3;
                    if ("TERM_PROGRAM" in y) {
                        const g = parseInt((y.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
                        switch (y.TERM_PROGRAM) {
                            case "iTerm.app":
                                return g >= 3 ? 3 : 2;
                            case "Apple_Terminal":
                                return 2
                        }
                    }
                    return /-256(color)?$/i.test(y.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(y.TERM) || "COLORTERM" in y ? 1 : u
                }

                function r(a) {
                    const c = o(a, a && a.isTTY);
                    return i(c)
                }
                p.exports = {
                    supportsColor: r,
                    stdout: i(o(!0, b.isatty(1))),
                    stderr: i(o(!0, b.isatty(2)))
                }
            },
            2518: p => {
                "use strict";
                p.exports = require("./main.bundle.cjs")
            },
            4157: p => {
                "use strict";
                p.exports = require("electron")
            },
            857: p => {
                "use strict";
                p.exports = require("os")
            },
            6928: p => {
                "use strict";
                p.exports = require("path")
            },
            2018: p => {
                "use strict";
                p.exports = require("tty")
            }
        },
        ce = {};

    function z(p) {
        var v = ce[p];
        if (v !== void 0) return v.exports;
        var h = ce[p] = {
            id: p,
            loaded: !1,
            exports: {}
        };
        return Se[p](h, h.exports, z), h.loaded = !0, h.exports
    }
    z.n = p => {
        var v = p && p.__esModule ? () => p.default : () => p;
        return z.d(v, {
            a: v
        }), v
    }, z.d = (p, v) => {
        for (var h in v) z.o(v, h) && !z.o(p, h) && Object.defineProperty(p, h, {
            enumerable: !0,
            get: v[h]
        })
    }, z.o = (p, v) => Object.prototype.hasOwnProperty.call(p, v), z.r = p => {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(p, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(p, "__esModule", {
            value: !0
        })
    }, z.nmd = p => (p.paths = [], p.children || (p.children = []), p);
    var ue = {};
    (() => {
        "use strict";
        z.r(ue);
        var p = z(4157),
            v = z.n(p);
        (() => {
            const d = z(7789).Du();
            d.troubleshoot && p.app.exit(), p.app.commandLine.hasSwitch("user-data-dir") || z(9483).B(d), z(2518)
        })()
    })(), module.exports = ue
})();

//# sourceMappingURL=boot.bundle.cjs.map