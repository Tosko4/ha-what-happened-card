/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, q = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, G = Symbol(), se = /* @__PURE__ */ new WeakMap();
let $e = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== G) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (q && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = se.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && se.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ze = (t) => new $e(typeof t == "string" ? t : t + "", void 0, G), ye = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[r + 1], t[0]);
  return new $e(i, t, G);
}, He = (t, e) => {
  if (q) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = j.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, ne = q ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return ze(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: je, defineProperty: Le, getOwnPropertyDescriptor: Be, getOwnPropertyNames: We, getOwnPropertySymbols: Fe, getPrototypeOf: Ke } = Object, W = globalThis, re = W.trustedTypes, Ve = re ? re.emptyScript : "", Ye = W.reactiveElementPolyfillSupport, U = (t, e) => t, L = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ve : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Z = (t, e) => !je(t, e), oe = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ??= Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = oe) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && Le(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: r } = Be(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const c = n?.call(this);
      r?.call(this, o), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = Ke(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const i = this.properties, s = [...We(i), ...Fe(i)];
      for (const n of s) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, n] of i) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const n = this._$Eu(i, s);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) i.unshift(ne(n));
    } else e !== void 0 && i.push(ne(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return He(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(i, s.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : L;
      this._$Em = n;
      const c = o.fromAttribute(i, r.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, n = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Z)(r, i) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: n, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: o } = r, c = this[n];
        o !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[U("elementProperties")] = /* @__PURE__ */ new Map(), E[U("finalized")] = /* @__PURE__ */ new Map(), Ye?.({ ReactiveElement: E }), (W.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, ae = (t) => t, B = J.trustedTypes, ce = B ? B.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, we = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, xe = "?" + b, qe = `<${xe}>`, A = document, I = () => A.createComment(""), N = (t) => t === null || typeof t != "object" && typeof t != "function", X = Array.isArray, Ge = (t) => X(t) || typeof t?.[Symbol.iterator] == "function", K = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, de = />/g, w = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, ue = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Ze = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), p = Ze(1), $ = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), x = A.createTreeWalker(A, 129);
function Ee(t, e) {
  if (!X(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ce !== void 0 ? ce.createHTML(e) : e;
}
const Je = (t, e) => {
  const i = t.length - 1, s = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = R;
  for (let c = 0; c < i; c++) {
    const a = t[c];
    let l, h, d = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, h = o.exec(a), h !== null); ) f = o.lastIndex, o === R ? h[1] === "!--" ? o = le : h[1] !== void 0 ? o = de : h[2] !== void 0 ? (Ae.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = w) : h[3] !== void 0 && (o = w) : o === w ? h[0] === ">" ? (o = n ?? R, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? w : h[3] === '"' ? ue : he) : o === ue || o === he ? o = w : o === le || o === de ? o = R : (o = w, n = void 0);
    const m = o === w && t[c + 1].startsWith("/>") ? " " : "";
    r += o === R ? a + qe : d >= 0 ? (s.push(l), a.slice(0, d) + we + a.slice(d) + b + m) : a + b + (d === -2 ? c : m);
  }
  return [Ee(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class D {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const c = e.length - 1, a = this.parts, [l, h] = Je(e, i);
    if (this.el = D.createElement(l, s), x.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = x.nextNode()) !== null && a.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(we)) {
          const f = h[o++], m = n.getAttribute(d).split(b), _ = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: r, name: _[2], strings: m, ctor: _[1] === "." ? Qe : _[1] === "?" ? et : _[1] === "@" ? tt : F }), n.removeAttribute(d);
        } else d.startsWith(b) && (a.push({ type: 6, index: r }), n.removeAttribute(d));
        if (Ae.test(n.tagName)) {
          const d = n.textContent.split(b), f = d.length - 1;
          if (f > 0) {
            n.textContent = B ? B.emptyScript : "";
            for (let m = 0; m < f; m++) n.append(d[m], I()), x.nextNode(), a.push({ type: 2, index: ++r });
            n.append(d[f], I());
          }
        }
      } else if (n.nodeType === 8) if (n.data === xe) a.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(b, d + 1)) !== -1; ) a.push({ type: 7, index: r }), d += b.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const s = A.createElement("template");
    return s.innerHTML = e, s;
  }
}
function O(t, e, i = t, s) {
  if (e === $) return e;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = N(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (e = O(t, n._$AS(t, e.values), n, s)), e;
}
class Xe {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, n = (e?.creationScope ?? A).importNode(i, !0);
    x.currentNode = n;
    let r = x.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new z(r, r.nextSibling, this, e) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (l = new it(r, this, e)), this._$AV.push(l), a = s[++c];
      }
      o !== a?.index && (r = x.nextNode(), o++);
    }
    return x.currentNode = A, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = O(this, e, i), N(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== $ && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ge(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && N(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = D.createElement(Ee(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new Xe(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = pe.get(e.strings);
    return i === void 0 && pe.set(e.strings, i = new D(e)), i;
  }
  k(e) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of e) n === i.length ? i.push(s = new z(this.O(I()), this.O(I()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = ae(e).nextSibling;
      ae(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, n, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(e, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = O(this, e, i, 0), o = !N(e) || e !== this._$AH && e !== $, o && (this._$AH = e);
    else {
      const c = e;
      let a, l;
      for (e = r[0], a = 0; a < r.length - 1; a++) l = O(this, c[s + a], i, a), l === $ && (l = this._$AH[a]), o ||= !N(l) || l !== this._$AH[a], l === u ? e = u : e !== u && (e += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qe extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class et extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class tt extends F {
  constructor(e, i, s, n, r) {
    super(e, i, s, n, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = O(this, e, i, 0) ?? u) === $) return;
    const s = this._$AH, n = e === u && s !== u || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== u && (s === u || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class it {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const st = J.litHtmlPolyfillSupport;
st?.(D, z), (J.litHtmlVersions ??= []).push("3.3.3");
const nt = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new z(e.insertBefore(I(), r), r, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis;
let C = class extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = nt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return $;
  }
};
C._$litElement$ = !0, C.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: C });
const rt = Q.litElementPolyfillSupport;
rt?.({ LitElement: C });
(Q.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = { attribute: !0, type: String, converter: L, reflect: !1, hasChanged: Z }, at = (t = ot, e, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), s === "accessor") {
    const { name: o } = i;
    return { set(c) {
      const a = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(o, a, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, t, c), c;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(c) {
      const a = this[o];
      e.call(this, c), this.requestUpdate(o, a, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ke(t) {
  return (e, i) => typeof i == "object" ? at(t, e, i) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(t) {
  return ke({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = { ATTRIBUTE: 1 }, Oe = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Te = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = Oe(class extends Te {
  constructor(t) {
    if (super(t), t.type !== Ce.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((s) => s !== "")));
      for (const s in e) e[s] && !this.nt?.has(s) && this.st.add(s);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const s of this.st) s in e || (i.remove(s), this.st.delete(s));
    for (const s in e) {
      const n = !!e[s];
      n === this.st.has(s) || this.nt?.has(s) || (n ? (i.add(s), this.st.add(s)) : (i.remove(s), this.st.delete(s)));
    }
    return $;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pe = "important", ct = " !" + Pe, V = Oe(class extends Te {
  constructor(t) {
    if (super(t), t.type !== Ce.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const s = t[i];
      return s == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? i.removeProperty(s) : i[s] = null);
    for (const s in e) {
      const n = e[s];
      if (n != null) {
        this.ft.add(s);
        const r = typeof n == "string" && n.endsWith(ct);
        s.includes("-") || r ? i.setProperty(s, r ? n.slice(0, -11) : n, r ? Pe : "") : i[s] = n;
      }
    }
    return $;
  }
}), ee = "en-US";
function me(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function lt(t) {
  const e = new Date(t), i = (s) => String(s).padStart(2, "0");
  return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}`;
}
function dt(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function Me(t, e, i = !1) {
  const s = dt(e);
  return new Intl.DateTimeFormat(ee, {
    hour: s ? "numeric" : "2-digit",
    minute: "2-digit",
    second: i ? "2-digit" : void 0,
    hourCycle: s ? "h12" : "h23"
  }).format(t);
}
function ht(t, e) {
  return `${new Intl.DateTimeFormat(ee, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${Me(t, e, !0)}`;
}
function ut(t, e) {
  const i = Math.max(0, Math.round((e - t) / 1e3));
  if (i < 45) return "just now";
  const s = Math.round(i / 60);
  if (s < 60) return `${s} min ago`;
  const n = Math.round(s / 60);
  return n < 24 ? `${n} h ago` : `${Math.round(n / 24)} d ago`;
}
function pt(t, e) {
  const i = Math.round((me(e) - me(t)) / 864e5);
  if (i === 0) return "Today";
  if (i === 1) return "Yesterday";
  const s = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(ee, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: s ? void 0 : "numeric"
  }).format(t);
}
function mt(t, e, i, s) {
  const n = {
    type: "logbook/event_stream",
    start_time: i.toISOString()
  };
  return s && s.length > 0 && (n.entity_ids = s), t.connection.subscribeMessage(
    (r) => e(r.events ?? []),
    n
  );
}
const _t = ye`
  :host {
    display: block;
    height: 100%;
    container-type: inline-size;
    container-name: wh;
  }
  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    --wh-node: 40px;
    --wh-icon: 24px;
    --wh-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --wh-secondary: var(--secondary-text-color);
  }
  ha-card.compact {
    --wh-node: 32px;
    --wh-icon: 20px;
  }
  .card-header {
    flex: none;
  }
  .scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    max-height: var(--wh-max-height, none);
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-2, 8px);
    overscroll-behavior: contain;
  }
  ha-card:not(.has-header) .scroll {
    padding-top: var(--ha-space-2, 8px);
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Day headings */
  .day {
    position: sticky;
    top: 0;
    z-index: 2;
    padding: var(--ha-space-2, 8px) 0;
    background: var(--wh-surface);
    color: var(--wh-secondary);
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  /* Entries */
  .item {
    display: grid;
    grid-template-columns: var(--wh-node) minmax(0, 1fr);
    column-gap: var(--ha-space-3, 12px);
  }
  .rail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line {
    flex: 1;
    width: 2px;
    min-height: var(--ha-space-2, 8px);
    margin: var(--ha-space-1, 4px) 0;
    border-radius: 1px;
    background: var(--divider-color);
  }
  .item.last .line {
    visibility: hidden;
  }
  .node {
    position: relative;
    flex: none;
    display: grid;
    place-items: center;
    box-sizing: border-box;
    width: var(--wh-node);
    height: var(--wh-node);
    border-radius: var(--ha-border-radius-circle, 50%);
    color: var(--accent);
    --mdc-icon-size: var(--wh-icon);
  }
  .node::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--accent);
    opacity: 0.2;
  }
  .node.photo::before {
    display: none;
  }
  .node ha-state-icon,
  .node ha-icon {
    position: relative;
    display: flex;
    width: var(--wh-icon);
    height: var(--wh-icon);
  }
  .photo-img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
  .badge {
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border-radius: var(--ha-border-radius-circle, 50%);
    border: 2px solid var(--wh-surface);
    overflow: hidden;
    display: grid;
    place-items: center;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    font-size: var(--ha-font-size-xs, 10px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1;
  }
  .badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    min-width: 0;
    min-height: var(--wh-node);
    margin: 0 calc(-1 * var(--ha-space-2, 8px)) var(--ha-space-2, 8px);
    padding: 0 var(--ha-space-2, 8px) var(--ha-space-1, 4px);
    border-radius: var(--ha-border-radius-md, 8px);
    outline: none;
  }
  .row.clickable {
    cursor: pointer;
  }
  .row.clickable:hover {
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }
  .row.clickable:active {
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
  }
  .row.clickable:focus-visible {
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .body {
    min-width: 0;
    flex: 1;
    /* Center a single line against the 40px icon. */
    padding-top: var(--ha-space-2, 8px);
  }
  .primary {
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-l, 16px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: 1.25;
    overflow-wrap: anywhere;
  }
  .subject {
    font-weight: var(--ha-font-weight-medium, 500);
  }
  .secondary {
    margin-top: 2px;
    color: var(--wh-secondary);
    font-size: var(--ha-font-size-m, 14px);
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
  .link {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
    text-underline-offset: 2px;
    cursor: pointer;
  }
  .link:hover {
    color: var(--primary-text-color);
    text-decoration-color: currentColor;
  }
  .link:focus-visible {
    outline: 2px solid var(--primary-color);
    border-radius: 2px;
  }
  .count {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    height: 20px;
    margin-left: var(--ha-space-1, 4px);
    padding: 0 var(--ha-space-2, 8px);
    border: 1px solid var(--ha-card-border-color, var(--divider-color));
    border-radius: var(--ha-border-radius-pill, 9999px);
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1;
    vertical-align: 1px;
  }

  /* Trailing meta */
  .time {
    flex: none;
    padding-top: var(--ha-space-2, 8px);
    text-align: right;
    color: var(--wh-secondary);
    font-size: var(--ha-font-size-s, 12px);
    line-height: 1.3;
  }
  .time .abs {
    display: block;
    color: var(--primary-text-color);
    font-weight: var(--ha-font-weight-medium, 500);
    font-variant-numeric: tabular-nums;
  }

  .state {
    padding: var(--ha-space-8, 32px) var(--ha-space-2, 8px);
    text-align: center;
    color: var(--wh-secondary);
    font-size: var(--ha-font-size-m, 14px);
  }
  .state ha-icon {
    display: block;
    margin: 0 auto var(--ha-space-2, 8px);
    --mdc-icon-size: 36px;
    color: var(--disabled-text-color);
  }

  ha-card.compact .primary {
    font-size: var(--ha-font-size-m, 14px);
  }
  ha-card.compact .secondary {
    font-size: var(--ha-font-size-s, 12px);
  }
  ha-card.compact .body,
  ha-card.compact .time {
    padding-top: var(--ha-space-1, 4px);
  }
  ha-card.compact .badge {
    width: 14px;
    height: 14px;
    right: -3px;
    bottom: -3px;
  }

  @container wh (max-width: 340px) {
    .row {
      flex-direction: column;
      gap: 0;
    }
    .time {
      display: flex;
      gap: var(--ha-space-2, 8px);
      padding-top: 0;
      text-align: left;
    }
    .time .abs {
      display: inline;
    }
    .body {
      padding-top: var(--ha-space-2, 8px);
    }
    .item {
      column-gap: var(--ha-space-2, 8px);
    }
  }
`;
function S(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function ft(t) {
  return t ? Object.values(t).some((e) => S(e).length > 0) : !1;
}
function gt(t, e) {
  const i = /* @__PURE__ */ new Set(), s = t.entities ?? {}, n = t.devices ?? {}, r = t.areas ?? {}, o = new Set(S(e.area_id));
  for (const l of S(e.floor_id))
    for (const h of Object.values(r))
      h.floor_id === l && o.add(h.area_id);
  const c = new Set(S(e.device_id)), a = new Set(S(e.label_id));
  for (const l of S(e.entity_id)) i.add(l);
  for (const l of Object.values(s)) {
    const h = l.device_id ? n[l.device_id] : void 0, d = l.area_id ?? h?.area_id ?? void 0;
    d && o.has(d) && i.add(l.entity_id), l.device_id && c.has(l.device_id) && i.add(l.entity_id), l.labels?.some((f) => a.has(f)) && i.add(l.entity_id), h?.labels?.some((f) => a.has(f)) && i.add(l.entity_id);
  }
  return i;
}
const vt = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function Re(t, e) {
  return e.replace(vt, (i) => t.states[i]?.attributes.friendly_name ?? i);
}
function bt(t, e) {
  for (const [i, s] of Object.entries(t.states))
    if (i.startsWith("person.") && s.attributes.user_id === e)
      return {
        entityId: i,
        name: s.attributes.friendly_name ?? i,
        picture: s.attributes.entity_picture
      };
}
function $t(t, e) {
  let i = e.context_source;
  return !i && e.context_message?.startsWith("triggered by ") && (i = e.context_message.slice(13)), i ? Re(t, i) : void 0;
}
function yt(t, e) {
  const i = bt(t, e);
  return i ? { kind: "user", name: i.name, entityId: i.entityId, picture: i.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function _e(t, e, i) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? i ?? e ?? "Unknown";
}
function wt(t, e) {
  const i = e.context_event_type;
  if (i === "automation_triggered" || i === "script_started")
    return { actor: {
      kind: i === "automation_triggered" ? "automation" : "script",
      name: _e(
        t,
        e.context_entity_id,
        e.context_name ?? e.context_entity_id_name
      ),
      entityId: e.context_entity_id
    }, trigger: $t(t, e) };
  if (e.context_user_id) {
    const s = yt(t, e.context_user_id);
    return e.context_domain && e.context_service && (s.detail = `${e.context_domain}.${e.context_service}`), { actor: s };
  }
  if (i === "call_service" && e.context_domain && e.context_service) {
    const s = `${e.context_domain}.${e.context_service}`;
    return e.context_domain === "scene" ? { actor: { kind: "scene", name: "A scene", detail: s } } : { actor: { kind: "service", name: s, detail: s } };
  }
  if (i === "logbook_entry" && e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
  if (e.context_entity_id)
    return { actor: {
      kind: "entity",
      name: _e(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function xt(t, e) {
  const i = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return i ? Re(t, i) : void 0;
}
const At = "mdi:information-outline", Et = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function St(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : At);
}
function kt(t, e, i, s, n) {
  const r = "var(--state-icon-color, var(--primary-text-color))";
  if (!n) return s === "unavailable" ? "var(--state-unavailable-color)" : r;
  switch (s) {
    case "unavailable":
      return "var(--state-unavailable-color, var(--disabled-text-color))";
    case "alert":
      return "var(--error-color)";
    case "inactive":
      return `var(--state-${t}-inactive-color, var(--state-inactive-color, ${r}))`;
    case "active": {
      const o = `var(--state-${t}-active-color, var(--state-active-color, ${r}))`, c = i ? `var(--state-${t}-${i}-color, ${o})` : o;
      return e && i ? `var(--state-${t}-${e}-${i}-color, ${c})` : c;
    }
    default:
      return r;
  }
}
const fe = {
  // [on verb, off verb, on tone override, off tone override]
  door: ["was opened", "was closed"],
  garage_door: ["was opened", "was closed"],
  opening: ["was opened", "was closed"],
  window: ["was opened", "was closed"],
  lock: ["was unlocked", "was locked"],
  motion: ["detected motion", "motion cleared"],
  moving: ["started moving", "stopped moving"],
  occupancy: ["detected occupancy", "occupancy cleared"],
  presence: ["detected presence", "presence cleared"],
  smoke: ["detected smoke", "smoke cleared", "alert"],
  gas: ["detected gas", "gas cleared", "alert"],
  carbon_monoxide: ["detected carbon monoxide", "carbon monoxide cleared", "alert"],
  moisture: ["detected moisture", "became dry", "alert"],
  problem: ["reported a problem", "problem resolved", "alert"],
  safety: ["is unsafe", "is safe", "alert"],
  tamper: ["detected tampering", "tampering cleared", "alert"],
  connectivity: ["connected", "disconnected"],
  plug: ["was plugged in", "was unplugged"],
  power: ["detected power", "lost power"],
  battery: ["reported low battery", "battery is normal", "alert"],
  battery_charging: ["started charging", "stopped charging"],
  cold: ["got cold", "is no longer cold"],
  heat: ["got hot", "is no longer hot"],
  light: ["detected light", "no longer detects light"],
  sound: ["detected sound", "no longer detects sound"],
  vibration: ["detected vibration", "vibration cleared"],
  running: ["started running", "stopped running"],
  update: ["has an update available", "is up to date"]
}, Ct = {
  lock: {
    locked: ["was locked", "active"],
    unlocked: ["was unlocked", "inactive"],
    locking: ["is locking", "neutral"],
    unlocking: ["is unlocking", "neutral"],
    open: ["was opened", "inactive"],
    opening: ["is opening", "neutral"],
    jammed: ["is jammed", "alert"]
  },
  cover: {
    open: ["was opened", "active"],
    closed: ["was closed", "inactive"],
    opening: ["started opening", "neutral"],
    closing: ["started closing", "neutral"]
  },
  alarm_control_panel: {
    disarmed: ["was disarmed", "inactive"],
    armed_home: ["was armed (home)", "active"],
    armed_away: ["was armed (away)", "active"],
    armed_night: ["was armed (night)", "active"],
    armed_vacation: ["was armed (vacation)", "active"],
    armed_custom_bypass: ["was armed (custom bypass)", "active"],
    pending: ["is pending", "neutral"],
    arming: ["is arming", "neutral"],
    disarming: ["is disarming", "neutral"],
    triggered: ["was triggered", "alert"]
  },
  media_player: {
    playing: ["started playing", "active"],
    paused: ["paused", "neutral"],
    idle: ["is idle", "inactive"],
    buffering: ["is buffering", "neutral"],
    standby: ["went to standby", "inactive"],
    off: ["was turned off", "inactive"],
    on: ["was turned on", "active"]
  },
  vacuum: {
    cleaning: ["started cleaning", "active"],
    docked: ["returned to its dock", "inactive"],
    returning: ["is returning to its dock", "neutral"],
    paused: ["paused", "neutral"],
    idle: ["is idle", "inactive"],
    error: ["reported an error", "alert"]
  },
  lawn_mower: {
    mowing: ["started mowing", "active"],
    docked: ["returned to its dock", "inactive"],
    paused: ["paused", "neutral"],
    returning: ["is returning to its dock", "neutral"],
    error: ["reported an error", "alert"]
  },
  timer: {
    active: ["started", "active"],
    paused: ["paused", "neutral"],
    idle: ["finished", "inactive"]
  },
  sun: {
    above_horizon: ["rose", "active"],
    below_horizon: ["set", "inactive"]
  }
}, Ot = /* @__PURE__ */ new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "humidifier",
  "siren",
  "remote",
  "group",
  "schedule",
  "valve",
  "water_heater",
  "automation",
  "binary_sensor",
  "calendar",
  "update"
]), Tt = /* @__PURE__ */ new Set(["person", "device_tracker"]), Pt = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function te(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Mt(t, e, i) {
  const s = t.states[e];
  if (s && t.formatEntityState)
    try {
      const o = t.formatEntityState({ ...s, state: i }, i);
      if (o) return o;
    } catch {
    }
  const n = s?.attributes.unit_of_measurement;
  return i !== "" && !Number.isNaN(Number(i)) ? n ? `${i} ${n}` : i : te(i);
}
function Rt(t, e) {
  return Object.values(t.states).find(
    (s) => s.entity_id.startsWith("zone.") && (s.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? te(e);
}
function Ut(t, e, i, s) {
  if (s === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (s === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (i ? t.states[i] : void 0)?.attributes.device_class;
  if (Tt.has(e))
    return s === "home" ? { verb: "arrived home", tone: "active" } : s === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${Rt(t, s)}`, tone: "active" };
  if (e === "binary_sensor" && r && fe[r]) {
    const [a, l, h, d] = fe[r];
    if (s === "on") return { verb: a, tone: h ?? "active" };
    if (s === "off") return { verb: l, tone: d ?? "inactive" };
  }
  const o = Ct[e]?.[s];
  if (o) return { verb: o[0], tone: o[1] };
  if (Pt.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && s === "off") return { verb: "was turned off", tone: "inactive" };
  if (Ot.has(e) || s === "on" || s === "off") {
    if (s === "on") return { verb: "was turned on", tone: "active" };
    if (s === "off") return { verb: "was turned off", tone: "inactive" };
  }
  return { verb: `changed to ${i ? Mt(t, i, s) : te(s)}`, tone: "neutral" };
}
const g = {
  hours_to_show: 24,
  max_entries: 50,
  order: "newest_first",
  show_cause: !0,
  show_avatars: !0,
  show_day_headers: !0,
  state_color: !0,
  compact: !1,
  time_display: "both",
  tap_action: "more-info",
  hide_unavailable: !0,
  collapse_repeats: !0
}, k = { hours: [1, 720], entries: [1, 500] }, It = 10 * 60 * 1e3, Nt = 5 * 60 * 1e3;
function Ue(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function Ie(t, [e, i], s) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? Math.min(i, Math.max(e, Math.round(n))) : s;
}
function Y(t) {
  return Ie(t.hours_to_show, k.hours, g.hours_to_show);
}
function Dt(t) {
  return Ie(t.max_entries, k.entries, g.max_entries);
}
function Ne(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function De(t, e, i) {
  const s = Ne(t);
  return !(i && (!t.entity_id || !i.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(s) || e.exclude_domains?.includes(s) || (e.hide_unavailable ?? g.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function zt(t, e, i) {
  const s = Ne(e), n = e.entity_id ? t.states[e.entity_id] : void 0, r = e.name ?? n?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let o, c = "neutral", a = wt(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: o, tone: c } = Ut(t, s, e.entity_id, e.state));
  else {
    const m = e.message ?? "did something";
    if (m.match(/^triggered(?: by (.+))?$/)) {
      o = "was triggered", c = "active";
      const v = xt(t, e);
      v && (a = { ...a, trigger: v });
    } else
      o = m, c = /(error|fail)/i.test(m) ? "alert" : "neutral";
  }
  const l = a?.actor;
  l && !l.icon && (l.icon = Et[l.kind]);
  const h = s === "person", d = h ? n?.attributes.entity_picture : void 0, f = i.state_color ?? g.state_color;
  return {
    key: Ue(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: s,
    name: r,
    verb: o,
    tone: c,
    icon: St(s, e.icon),
    stateValue: e.state,
    picture: d,
    isPerson: h,
    cause: a,
    count: 1,
    accent: kt(s, n?.attributes.device_class, e.state, c, f)
  };
}
function ge(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function Ht(t, e, i, s, n) {
  const r = s - Y(i) * 36e5, o = Dt(i), c = i.collapse_repeats ?? g.collapse_repeats, a = [...e].filter((m) => {
    const _ = m.when * 1e3;
    return _ >= r && _ <= s + Nt;
  }).filter((m) => De(m, i, n)).sort((m, _) => _.when - m.when), l = [];
  let h = 0;
  for (const m of a) {
    const _ = zt(t, m, i), v = l[l.length - 1];
    if (c && v && _.entityId && v.entityId === _.entityId && v.verb === _.verb && ge(v) === ge(_) && h - _.when <= It) {
      v.count += 1, h = _.when;
      continue;
    }
    if (l.push(_), h = _.when, l.length > o) break;
  }
  const d = l.slice(0, o);
  (i.order ?? g.order) === "oldest_first" && d.reverse();
  const f = [];
  for (const m of d) {
    const _ = lt(m.when);
    let v = f[f.length - 1];
    (!v || v.key !== _) && (v = { key: _, label: pt(m.when, s), items: [] }, f.push(v)), v.items.push(m);
  }
  return f;
}
function jt(t) {
  let e = `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const i = t.cause;
  return i?.actor && (e += ` by ${i.actor.name}`), i?.trigger && (e += `, triggered by ${i.trigger}`), e;
}
var Lt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, M = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Bt(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && Lt(e, i, n), n;
};
const ve = 3e3, Wt = 6e4;
let y = class extends C {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._registryRefs = [];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Qt), document.createElement("what-happened-card-editor");
  }
  static getStubConfig() {
    return { title: "What happened", hours_to_show: 24, max_entries: 50 };
  }
  setConfig(t) {
    if (!t || typeof t != "object") throw new Error("Invalid configuration");
    if (t.target !== void 0 && (typeof t.target != "object" || t.target === null))
      throw new Error("`target` must be an object with entity_id, device_id, area_id or label_id");
    this._config = { ...t }, this._subKey = void 0, this._ensureSubscription(), this._scheduleRecompute();
  }
  set hass(t) {
    const e = !this._hass;
    this._hass = t;
    const i = [t.entities, t.devices, t.areas], s = i.some((n, r) => n !== this._registryRefs[r]);
    this._registryRefs = i, (e || s) && (this._ensureSubscription(), this._scheduleRecompute());
  }
  get hass() {
    return this._hass;
  }
  getCardSize() {
    const t = this._config;
    if (t?.max_height) return Math.max(3, Math.ceil(t.max_height / 50));
    const e = this._groups.reduce((i, s) => i + s.items.length, 0);
    return Math.min(12, Math.max(3, Math.ceil(e * 1.2) + 1));
  }
  /** Sections view: default size and resize limits (users resize with the handles). */
  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 3, min_rows: 2 };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this._now = Date.now(), this._recompute();
    }, Wt), this._hass && this._config && (this._subKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this._tick), window.clearTimeout(this._recomputeTimer), this._unsubscribe(), this._subKey = void 0;
  }
  // ---------------------------------------------------------------- data
  _unsubscribe() {
    this._subToken++, this._unsub?.(), this._unsub = void 0;
  }
  _ensureSubscription() {
    const t = this._hass, e = this._config;
    if (!t || !e || !this.isConnected) return;
    let i;
    ft(e.target) && (i = gt(t, e.target));
    const s = Y(e), n = JSON.stringify([s, i ? [...i].sort() : null]);
    if (n === this._subKey) {
      this._allowed = i;
      return;
    }
    if (this._subKey = n, this._allowed = i, this._unsubscribe(), this._entries.clear(), this._error = void 0, i && i.size === 0) {
      this._loading = !1;
      return;
    }
    this._loading = !0;
    const r = this._subToken, o = new Date(Date.now() - s * 36e5);
    mt(
      t,
      (c) => {
        if (r !== this._subToken) return;
        const a = this._config;
        for (const l of c)
          a && !De(l, a, this._allowed) || this._entries.set(Ue(l), l);
        this._entries.size > ve && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
      },
      o,
      i ? [...i] : void 0
    ).then((c) => {
      r !== this._subToken ? c() : this._unsub = c;
    }).catch((c) => {
      r === this._subToken && (this._loading = !1, this._error = c instanceof Error ? c.message : "Could not load the logbook");
    });
  }
  _trimBuffer() {
    const t = [...this._entries.entries()].sort((e, i) => i[1].when - e[1].when);
    this._entries = new Map(t.slice(0, ve));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    !this._hass || !this._config || (this._now = Date.now(), this._groups = Ht(
      this._hass,
      this._entries.values(),
      this._config,
      this._now,
      this._allowed
    ));
  }
  // ------------------------------------------------------------ interaction
  _moreInfo(t) {
    t && this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 })
    );
  }
  _onRowClick(t) {
    (this._config?.tap_action ?? g.tap_action) !== "none" && this._moreInfo(t.entityId);
  }
  _onRowKey(t, e) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._onRowClick(e));
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return u;
    const e = this._groups.reduce((n, r) => n + r.items.length, 0), i = this._groups[this._groups.length - 1], s = i?.items[i.items.length - 1]?.key;
    return p`
      <ha-card
        class=${H({
      compact: t.compact ?? g.compact,
      "has-header": !!t.title
    })}
        style=${V({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? p`<h1 class="card-header">${t.title}</h1>` : u}
        <div class="scroll">
          ${this._error ? p`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? p`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : p`<ol>
                      ${this._groups.map((n) => this._renderGroup(n, t, s))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = Y(t), i = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, s = e === 1 ? "No activity in the last hour" : `No activity in the last ${i}`;
    return p`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${s}
    </div>`;
  }
  _renderGroup(t, e, i) {
    const s = e.show_day_headers ?? g.show_day_headers;
    return p`
      ${s ? p`<li class="day" role="presentation">${t.label}</li>` : u}
      ${t.items.map((n) => this._renderItem(n, e, n.key === i))}
    `;
  }
  _renderIcon(t) {
    const e = t.entityId ? this._hass?.states[t.entityId] : void 0;
    return e ? p`<ha-state-icon
          .hass=${this._hass}
          .stateObj=${e}
          .stateValue=${t.stateValue}
        ></ha-state-icon>` : p`<ha-icon .icon=${t.icon}></ha-icon>`;
  }
  _renderItem(t, e, i) {
    const s = e.show_avatars ?? g.show_avatars, n = e.show_cause ?? g.show_cause, r = !!t.entityId && (e.tap_action ?? g.tap_action) !== "none", o = t.cause?.actor, c = s && t.picture, a = s && !c && o?.kind === "user" ? o : void 0;
    return p`
      <li class=${H({ item: !0, last: i })}>
        <div class="rail">
          <div
            class=${H({ node: !0, photo: !!c })}
            style=${V({ "--accent": t.accent })}
          >
            ${c ? p`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
            ${a ? p`<span class="badge" title=${a.name}
                    >${a.picture ? p`<img src=${a.picture} alt="" loading="lazy" />` : a.name.charAt(0).toUpperCase()}</span
                  >` : u}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${H({ row: !0, clickable: r })}
          style=${V({ "--accent": t.accent })}
          role=${r ? "button" : "text"}
          tabindex=${r ? "0" : "-1"}
          aria-label=${jt(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(l) => this._onRowKey(l, t)}
        >
          <div class="body">
            <div class="primary">
              <span class="subject">${t.name}</span> ${t.verb}
              ${t.count > 1 ? p`<span class="count">×${t.count}</span>` : u}
            </div>
            ${n ? this._renderCause(t) : u}
          </div>
          ${this._renderTime(t, e)}
        </div>
      </li>
    `;
  }
  _renderCause(t) {
    const e = t.cause;
    if (!e || !e.actor && !e.trigger) return u;
    const i = e.actor, s = !!i?.entityId && (this._config?.tap_action ?? g.tap_action) !== "none";
    return p`
      <div class="secondary">
        ${i ? p`by
              ${s ? p`<button
                      class="link"
                      type="button"
                      title=${i.detail ? `${i.name} – ${i.detail}` : i.name}
                      @click=${(n) => {
      n.stopPropagation(), this._moreInfo(i.entityId);
    }}
                      @keydown=${(n) => n.stopPropagation()}
                    >
                      ${i.name}
                    </button>` : p`<span title=${i.detail ?? i.name}>${i.name}</span>`}` : u}${i && e.trigger ? ", " : u}${e.trigger ? p`${i ? "triggered by" : "by"} ${e.trigger}` : u}
      </div>
    `;
  }
  _renderTime(t, e) {
    const i = e.time_display ?? g.time_display, s = Me(t.when, this._hass), n = ut(t.when, this._now);
    return p`
      <div class="time" title=${ht(t.when, this._hass)}>
        ${i !== "relative" ? p`<span class="abs">${s}</span>` : u}
        ${i !== "absolute" ? p`<span class="rel">${n}</span>` : u}
      </div>
    `;
  }
};
y.styles = _t;
M([
  P()
], y.prototype, "_config", 2);
M([
  P()
], y.prototype, "_groups", 2);
M([
  P()
], y.prototype, "_loading", 2);
M([
  P()
], y.prototype, "_error", 2);
M([
  P()
], y.prototype, "_now", 2);
y = M([
  Se("what-happened-card")
], y);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "what-happened-card",
  name: "What Happened",
  description: "A live timeline that explains what happened, when, why and who or what caused it.",
  preview: !0,
  documentationURL: "https://github.com/jan-tdy/ha-what-happened-card"
});
console.info(
  "%c WHAT-HAPPENED-CARD %c v0.1.0 ",
  "color:#fff;background:#03a9f4;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#03a9f4;background:#fff;border:1px solid #03a9f4;border-radius:0 3px 3px 0;padding:1px 4px"
);
var Ft = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, ie = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Kt(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && Ft(e, i, n), n;
};
const be = [
  "alarm_control_panel",
  "automation",
  "binary_sensor",
  "button",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "input_boolean",
  "light",
  "lock",
  "media_player",
  "person",
  "scene",
  "script",
  "sensor",
  "siren",
  "sun",
  "switch",
  "update",
  "vacuum"
].map((t) => ({ value: t, label: t })), Vt = {
  title: "Title",
  hours_to_show: "Time window",
  max_entries: "Maximum number of entries",
  order: "Order",
  target: "Only show activity of",
  exclude_entities: "Hide these entities",
  include_domains: "Only these domains",
  exclude_domains: "Hide these domains",
  show_cause: "Show why it happened (who / what / trigger)",
  show_avatars: "Show profile pictures",
  show_day_headers: "Show day headers",
  state_color: "Show state color",
  compact: "Compact layout",
  time_display: "Time",
  tap_action: "Tap action",
  max_height: "Maximum height",
  hide_unavailable: "Hide unavailable / unknown states",
  collapse_repeats: "Merge rapid repeats of the same event"
}, Yt = {
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, qt = [
  { name: "title", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "hours_to_show",
        selector: {
          number: {
            min: k.hours[0],
            max: k.hours[1],
            step: 1,
            mode: "box",
            unit_of_measurement: "h"
          }
        }
      },
      {
        name: "max_entries",
        selector: {
          number: { min: k.entries[0], max: k.entries[1], step: 1, mode: "box" }
        }
      }
    ]
  },
  {
    name: "order",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "newest_first", label: "Newest first" },
          { value: "oldest_first", label: "Oldest first" }
        ]
      }
    }
  }
], Gt = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: be }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: be }
    }
  }
], Zt = [
  { name: "show_cause", selector: { boolean: {} } },
  { name: "show_avatars", selector: { boolean: {} } },
  { name: "show_day_headers", selector: { boolean: {} } },
  { name: "state_color", selector: { boolean: {} } },
  { name: "compact", selector: { boolean: {} } },
  {
    name: "time_display",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "both", label: "Clock time and relative" },
          { value: "absolute", label: "Clock time only" },
          { value: "relative", label: "Relative only" }
        ]
      }
    }
  },
  {
    name: "tap_action",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "more-info", label: "Open more info" },
          { value: "none", label: "Do nothing" }
        ]
      }
    }
  },
  {
    name: "max_height",
    selector: { number: { min: 100, max: 2e3, step: 10, mode: "box", unit_of_measurement: "px" } }
  }
], Jt = [
  { name: "hide_unavailable", selector: { boolean: {} } },
  { name: "collapse_repeats", selector: { boolean: {} } }
], Xt = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: Gt },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: Zt },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: Jt }
];
let T = class extends C {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Vt[t.name] ?? t.name, this._computeHelper = (t) => Yt[t.name];
  }
  setConfig(t) {
    this._config = t;
  }
  _data() {
    return { ...g, ...this._config };
  }
  _valueChanged(t) {
    if (t.stopPropagation(), !this._config) return;
    const e = t.detail.value, i = { type: this._config.type };
    for (const [s, n] of Object.entries(e))
      s === "type" || n === void 0 || n === "" || Array.isArray(n) && n.length === 0 || s === "target" && (!n || Object.keys(n).length === 0) || g[s] === n && !(s in this._config) || (i[s] = n);
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _form(t) {
    return p`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${t}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }
  render() {
    return !this.hass || !this._config ? u : p`
      ${this._form(qt)}
      ${Xt.map(
      (t) => p`
          <ha-expansion-panel outlined .header=${t.header} .expanded=${t.id === "source"}>
            <ha-icon slot="leading-icon" .icon=${t.icon}></ha-icon>
            <div class="panel-content">${this._form(t.schema)}</div>
          </ha-expansion-panel>
        `
    )}
    `;
  }
};
T.styles = ye`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-expansion-panel {
      display: block;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    ha-expansion-panel ha-icon {
      color: var(--secondary-text-color);
    }
    .panel-content {
      padding: 0 16px 16px;
    }
  `;
ie([
  ke({ attribute: !1 })
], T.prototype, "hass", 2);
ie([
  P()
], T.prototype, "_config", 2);
T = ie([
  Se("what-happened-card-editor")
], T);
const Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return T;
  }
}, Symbol.toStringTag, { value: "Module" }));
