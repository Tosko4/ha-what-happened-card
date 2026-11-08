/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, G = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), se = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== Z) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (G && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = se.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && se.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ze = (t) => new ye(typeof t == "string" ? t : t + "", void 0, Z), xe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new ye(i, t, Z);
}, Le = (t, e) => {
  if (G) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), s = L.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, re = G ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return ze(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Be, defineProperty: We, getOwnPropertyDescriptor: Fe, getOwnPropertyNames: Ke, getOwnPropertySymbols: Ve, getPrototypeOf: Ye } = Object, F = globalThis, oe = F.trustedTypes, qe = oe ? oe.emptyScript : "", Ge = F.reactiveElementPolyfillSupport, U = (t, e) => t, B = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? qe : null;
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
} }, J = (t, e) => !Be(t, e), ae = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ??= Symbol("metadata"), F.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ae) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, i);
      s !== void 0 && We(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: s, set: r } = Fe(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      r?.call(this, o), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = Ye(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const i = this.properties, n = [...Ke(i), ...Ve(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const s of n) i.unshift(re(s));
    } else e !== void 0 && i.push(re(e));
    return i;
  }
  static _$Eu(e, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const n of i.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Le(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, n) {
    this._$AK(e, n);
  }
  _$ET(e, i) {
    const n = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : B).toAttribute(i, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : B;
      this._$Em = s;
      const a = o.fromAttribute(i, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, s = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), n ??= o.getPropertyOptions(e), !((n.hasChanged ?? J)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: s, wrapped: r }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, r] of n) {
        const { wrapped: o } = r, a = this[s];
        o !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, r, a);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[U("elementProperties")] = /* @__PURE__ */ new Map(), E[U("finalized")] = /* @__PURE__ */ new Map(), Ge?.({ ReactiveElement: E }), (F.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ce = (t) => t, W = X.trustedTypes, le = W ? W.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ae = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + b, Ze = `<${Ee}>`, A = document, N = () => A.createComment(""), D = (t) => t === null || typeof t != "object" && typeof t != "function", Q = Array.isArray, Je = (t) => Q(t) || typeof t?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, he = />/g, y = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ue = /'/g, pe = /"/g, Se = /^(?:script|style|textarea|title)$/i, Xe = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), m = Xe(1), $ = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), me = /* @__PURE__ */ new WeakMap(), x = A.createTreeWalker(A, 129);
function ke(t, e) {
  if (!Q(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(e) : e;
}
const Qe = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = R;
  for (let a = 0; a < i; a++) {
    const c = t[a];
    let l, h, d = -1, _ = 0;
    for (; _ < c.length && (o.lastIndex = _, h = o.exec(c), h !== null); ) _ = o.lastIndex, o === R ? h[1] === "!--" ? o = de : h[1] !== void 0 ? o = he : h[2] !== void 0 ? (Se.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = y) : h[3] !== void 0 && (o = y) : o === y ? h[0] === ">" ? (o = s ?? R, d = -1) : h[1] === void 0 ? d = -2 : (d = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? y : h[3] === '"' ? pe : ue) : o === pe || o === ue ? o = y : o === de || o === he ? o = R : (o = y, s = void 0);
    const f = o === y && t[a + 1].startsWith("/>") ? " " : "";
    r += o === R ? c + Ze : d >= 0 ? (n.push(l), c.slice(0, d) + Ae + c.slice(d) + b + f) : c + b + (d === -2 ? a : f);
  }
  return [ke(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class H {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, c = this.parts, [l, h] = Qe(e, i);
    if (this.el = H.createElement(l, n), x.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = x.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Ae)) {
          const _ = h[o++], f = s.getAttribute(d).split(b), p = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: r, name: p[2], strings: f, ctor: p[1] === "." ? tt : p[1] === "?" ? it : p[1] === "@" ? nt : K }), s.removeAttribute(d);
        } else d.startsWith(b) && (c.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Se.test(s.tagName)) {
          const d = s.textContent.split(b), _ = d.length - 1;
          if (_ > 0) {
            s.textContent = W ? W.emptyScript : "";
            for (let f = 0; f < _; f++) s.append(d[f], N()), x.nextNode(), c.push({ type: 2, index: ++r });
            s.append(d[_], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) c.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(b, d + 1)) !== -1; ) c.push({ type: 7, index: r }), d += b.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = A.createElement("template");
    return n.innerHTML = e, n;
  }
}
function O(t, e, i = t, n) {
  if (e === $) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = D(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (e = O(t, s._$AS(t, e.values), s, n)), e;
}
class et {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? A).importNode(i, !0);
    x.currentNode = s;
    let r = x.nextNode(), o = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new j(r, r.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (l = new st(r, this, e)), this._$AV.push(l), c = n[++a];
      }
      o !== c?.index && (r = x.nextNode(), o++);
    }
    return x.currentNode = A, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class j {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = O(this, e, i), D(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== $ && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Je(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(A.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = H.createElement(ke(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new et(s, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = me.get(e.strings);
    return i === void 0 && me.set(e.strings, i = new H(e)), i;
  }
  k(e) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new j(this.O(N()), this.O(N()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = ce(e).nextSibling;
      ce(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = u;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = O(this, e, i, 0), o = !D(e) || e !== this._$AH && e !== $, o && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = r[0], c = 0; c < r.length - 1; c++) l = O(this, a[n + c], i, c), l === $ && (l = this._$AH[c]), o ||= !D(l) || l !== this._$AH[c], l === u ? e = u : e !== u && (e += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class tt extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class it extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class nt extends K {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = O(this, e, i, 0) ?? u) === $) return;
    const n = this._$AH, s = e === u && n !== u || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== u && (n === u || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class st {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const rt = X.litHtmlPolyfillSupport;
rt?.(H, j), (X.litHtmlVersions ??= []).push("3.3.3");
const ot = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new j(e.insertBefore(N(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ot(i, this.renderRoot, this.renderOptions);
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
C._$litElement$ = !0, C.finalized = !0, ee.litElementHydrateSupport?.({ LitElement: C });
const at = ee.litElementPolyfillSupport;
at?.({ LitElement: C });
(ee.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: J }, lt = (t = ct, e, i) => {
  const { kind: n, metadata: s } = i;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), n === "accessor") {
    const { name: o } = i;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, c, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = i;
    return function(a) {
      const c = this[o];
      e.call(this, a), this.requestUpdate(o, c, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Oe(t) {
  return (e, i) => typeof i == "object" ? lt(t, e, i) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(t) {
  return Oe({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { ATTRIBUTE: 1 }, Me = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Pe = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, n) {
    this._$Ct = e, this._$AM = i, this._$Ci = n;
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
const z = Me(class extends Pe {
  constructor(t) {
    if (super(t), t.type !== Te.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in e) e[n] && !this.nt?.has(n) && this.st.add(n);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const n of this.st) n in e || (i.remove(n), this.st.delete(n));
    for (const n in e) {
      const s = !!e[n];
      s === this.st.has(n) || this.nt?.has(n) || (s ? (i.add(n), this.st.add(n)) : (i.remove(n), this.st.delete(n)));
    }
    return $;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = "important", dt = " !" + Ie, Y = Me(class extends Pe {
  constructor(t) {
    if (super(t), t.type !== Te.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const n = t[i];
      return n == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${n};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const n of this.ft) e[n] == null && (this.ft.delete(n), n.includes("-") ? i.removeProperty(n) : i[n] = null);
    for (const n in e) {
      const s = e[n];
      if (s != null) {
        this.ft.add(n);
        const r = typeof s == "string" && s.endsWith(dt);
        n.includes("-") || r ? i.setProperty(n, r ? s.slice(0, -11) : s, r ? Ie : "") : i[n] = s;
      }
    }
    return $;
  }
}), te = "en-US";
function _e(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function ht(t) {
  const e = new Date(t), i = (n) => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}`;
}
function ut(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function Re(t, e, i = !1) {
  const n = ut(e);
  return new Intl.DateTimeFormat(te, {
    hour: n ? "numeric" : "2-digit",
    minute: "2-digit",
    second: i ? "2-digit" : void 0,
    hourCycle: n ? "h12" : "h23"
  }).format(t);
}
function pt(t, e) {
  return `${new Intl.DateTimeFormat(te, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${Re(t, e, !0)}`;
}
function mt(t, e) {
  const i = Math.max(0, Math.round((e - t) / 1e3));
  if (i < 45) return "just now";
  const n = Math.round(i / 60);
  if (n < 60) return `${n} min ago`;
  const s = Math.round(n / 60);
  return s < 24 ? `${s} h ago` : `${Math.round(s / 24)} d ago`;
}
function _t(t, e) {
  const i = Math.round((_e(e) - _e(t)) / 864e5);
  if (i === 0) return "Today";
  if (i === 1) return "Yesterday";
  const n = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(te, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: n ? void 0 : "numeric"
  }).format(t);
}
function ft(t, e, i, n) {
  const s = {
    type: "logbook/event_stream",
    start_time: i.toISOString()
  };
  return n && n.length > 0 && (s.entity_ids = n), t.connection.subscribeMessage(
    (r) => e(r.events ?? []),
    s
  );
}
const gt = xe`
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
    --wh-node: 32px;
    --wh-icon: 20px;
    --wh-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --wh-secondary: var(--secondary-text-color);
  }
  ha-card.compact {
    --wh-node: 24px;
    --wh-icon: 16px;
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
  .avatar {
    display: inline-grid;
    place-items: center;
    width: 16px;
    height: 16px;
    margin: 0 4px -3px 6px;
    border-radius: var(--ha-border-radius-circle, 50%);
    object-fit: cover;
  }
  .avatar.initial {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    font-size: var(--ha-font-size-xs, 10px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1;
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
    /* Center the first line against the icon. */
    padding-top: var(--ha-space-1, 4px);
  }
  .primary {
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-m, 14px);
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
    font-size: var(--ha-font-size-s, 12px);
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
    padding-top: var(--ha-space-1, 4px);
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

  ha-card.compact .body,
  ha-card.compact .time {
    padding-top: 0;
  }
  ha-card.compact .row {
    margin-bottom: var(--ha-space-1, 4px);
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
      padding-top: var(--ha-space-1, 4px);
    }
    .item {
      column-gap: var(--ha-space-2, 8px);
    }
  }
`;
function S(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function vt(t) {
  return t ? Object.values(t).some((e) => S(e).length > 0) : !1;
}
function bt(t, e) {
  const i = /* @__PURE__ */ new Set(), n = t.entities ?? {}, s = t.devices ?? {}, r = t.areas ?? {}, o = new Set(S(e.area_id));
  for (const l of S(e.floor_id))
    for (const h of Object.values(r))
      h.floor_id === l && o.add(h.area_id);
  const a = new Set(S(e.device_id)), c = new Set(S(e.label_id));
  for (const l of S(e.entity_id)) i.add(l);
  for (const l of Object.values(n)) {
    const h = l.device_id ? s[l.device_id] : void 0, d = l.area_id ?? h?.area_id ?? void 0;
    d && o.has(d) && i.add(l.entity_id), l.device_id && a.has(l.device_id) && i.add(l.entity_id), l.labels?.some((_) => c.has(_)) && i.add(l.entity_id), h?.labels?.some((_) => c.has(_)) && i.add(l.entity_id);
  }
  return i;
}
const $t = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function Ue(t, e) {
  return e.replace($t, (i) => t.states[i]?.attributes.friendly_name ?? i);
}
function wt(t, e) {
  for (const [i, n] of Object.entries(t.states))
    if (i.startsWith("person.") && n.attributes.user_id === e)
      return {
        entityId: i,
        name: n.attributes.friendly_name ?? i,
        picture: n.attributes.entity_picture
      };
}
function yt(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function xt(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function At(t, e) {
  let i = e.context_source;
  return !i && e.context_message?.startsWith("triggered by ") && (i = e.context_message.slice(13)), i ? Ue(t, i) : void 0;
}
function Et(t, e) {
  const i = wt(t, e);
  return i ? { kind: "user", name: i.name, entityId: i.entityId, picture: i.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function fe(t, e, i) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? i ?? e ?? "Unknown";
}
function St(t, e) {
  const i = e.context_event_type;
  if (i === "automation_triggered" || i === "script_started")
    return {
      actor: {
        kind: i === "automation_triggered" ? "automation" : "script",
        name: fe(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: At(t, e),
      triggerEntityId: yt(xt(e))
    };
  if (e.context_user_id) {
    const n = Et(t, e.context_user_id);
    return e.context_domain && e.context_service && (n.detail = `${e.context_domain}.${e.context_service}`), { actor: n };
  }
  if (i === "call_service" && e.context_domain && e.context_service) {
    const n = `${e.context_domain}.${e.context_service}`;
    return e.context_domain === "scene" ? { actor: { kind: "scene", name: "A scene", detail: n } } : { actor: { kind: "service", name: n, detail: n } };
  }
  if (i === "logbook_entry" && e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
  if (e.context_entity_id)
    return { actor: {
      kind: "entity",
      name: fe(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function kt(t, e) {
  const i = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return i ? Ue(t, i) : void 0;
}
const Ct = "mdi:information-outline", Ot = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function Tt(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : Ct);
}
function Mt(t, e, i, n, s) {
  const r = "var(--state-icon-color, var(--primary-text-color))";
  if (!s) return n === "unavailable" ? "var(--state-unavailable-color)" : r;
  switch (n) {
    case "unavailable":
      return "var(--state-unavailable-color, var(--disabled-text-color))";
    case "alert":
      return "var(--error-color)";
    case "inactive":
      return `var(--state-${t}-inactive-color, var(--state-inactive-color, ${r}))`;
    case "active": {
      const o = `var(--state-${t}-active-color, var(--state-active-color, ${r}))`, a = i ? `var(--state-${t}-${i}-color, ${o})` : o;
      return e && i ? `var(--state-${t}-${e}-${i}-color, ${a})` : a;
    }
    default:
      return r;
  }
}
const ge = {
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
}, Pt = {
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
}, It = /* @__PURE__ */ new Set([
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
]), Rt = /* @__PURE__ */ new Set(["person", "device_tracker"]), Ut = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function ie(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Nt(t, e, i) {
  const n = t.states[e];
  if (n && t.formatEntityState)
    try {
      const o = t.formatEntityState({ ...n, state: i }, i);
      if (o) return o;
    } catch {
    }
  const s = n?.attributes.unit_of_measurement;
  return i !== "" && !Number.isNaN(Number(i)) ? s ? `${i} ${s}` : i : ie(i);
}
function Dt(t, e) {
  return Object.values(t.states).find(
    (n) => n.entity_id.startsWith("zone.") && (n.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? ie(e);
}
function Ht(t, e, i, n) {
  if (n === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (n === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (i ? t.states[i] : void 0)?.attributes.device_class;
  if (Rt.has(e))
    return n === "home" ? { verb: "arrived home", tone: "active" } : n === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${Dt(t, n)}`, tone: "active" };
  if (e === "binary_sensor" && r && ge[r]) {
    const [c, l, h, d] = ge[r];
    if (n === "on") return { verb: c, tone: h ?? "active" };
    if (n === "off") return { verb: l, tone: d ?? "inactive" };
  }
  const o = Pt[e]?.[n];
  if (o) return { verb: o[0], tone: o[1] };
  if (Ut.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && n === "off") return { verb: "was turned off", tone: "inactive" };
  if (It.has(e) || n === "on" || n === "off") {
    if (n === "on") return { verb: "was turned on", tone: "active" };
    if (n === "off") return { verb: "was turned off", tone: "inactive" };
  }
  return { verb: `changed to ${i ? Nt(t, i, n) : ie(n)}`, tone: "neutral" };
}
const v = {
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
}, k = { hours: [1, 720], entries: [1, 500] }, ve = 60 * 1e3, jt = 10 * 60 * 1e3, zt = 5 * 60 * 1e3;
function Ne(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function De(t, [e, i], n) {
  const s = typeof t == "number" ? t : Number(t);
  return Number.isFinite(s) ? Math.min(i, Math.max(e, Math.round(s))) : n;
}
function q(t) {
  return De(t.hours_to_show, k.hours, v.hours_to_show);
}
function Lt(t) {
  return De(t.max_entries, k.entries, v.max_entries);
}
function He(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function je(t, e, i) {
  const n = He(t);
  return !(i && (!t.entity_id || !i.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(n) || e.exclude_domains?.includes(n) || (e.hide_unavailable ?? v.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function Bt(t, e, i) {
  const n = He(e), s = e.entity_id ? t.states[e.entity_id] : void 0, r = e.name ?? s?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let o, a = "neutral", c = St(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: o, tone: a } = Ht(t, n, e.entity_id, e.state));
  else {
    const f = e.message ?? "did something";
    if (f.match(/^triggered(?: by (.+))?$/)) {
      o = "was triggered", a = "active";
      const g = kt(t, e);
      g && (c = { ...c, trigger: g });
    } else
      o = f, a = /(error|fail)/i.test(f) ? "alert" : "neutral";
  }
  const l = c?.actor;
  l && !l.icon && (l.icon = Ot[l.kind]);
  const h = n === "person", d = h ? s?.attributes.entity_picture : void 0, _ = i.state_color ?? v.state_color;
  return {
    key: Ne(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: n,
    name: r,
    verb: o,
    tone: a,
    icon: Tt(n, e.icon),
    stateValue: e.state,
    picture: d,
    isPerson: h,
    isRun: e.state === void 0 && e.message !== void 0 && /^triggered/.test(e.message),
    cause: c,
    count: 1,
    accent: Mt(n, s?.attributes.device_class, e.state, a, _)
  };
}
function be(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function Wt(t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of t) {
    const n = i.cause?.actor;
    if (!n?.entityId || n.kind !== "automation" && n.kind !== "script") continue;
    for (const o of t)
      o.isRun && o.entityId === n.entityId && Math.abs(o.when - i.when) <= ve && e.add(o);
    const s = i.cause?.triggerEntityId;
    if (!s) continue;
    const r = t.find(
      (o) => o !== i && !o.isRun && o.entityId === s && o.when <= i.when + 5e3 && i.when - o.when <= ve
    );
    r && (e.add(r), i.cause = { ...i.cause, trigger: `${r.name} ${r.verb}` });
  }
  return t.filter((i) => !e.has(i));
}
function Ft(t, e, i, n, s) {
  const r = n - q(i) * 36e5, o = Lt(i), a = i.collapse_repeats ?? v.collapse_repeats, c = [...e].filter((p) => {
    const g = p.when * 1e3;
    return g >= r && g <= n + zt;
  }).filter((p) => je(p, i, s)).sort((p, g) => g.when - p.when), l = Wt(c.map((p) => Bt(t, p, i))), h = [];
  let d = 0;
  for (const p of l) {
    const g = h[h.length - 1];
    if (a && g && p.entityId && g.entityId === p.entityId && g.verb === p.verb && be(g) === be(p) && d - p.when <= jt) {
      g.count += 1, d = p.when;
      continue;
    }
    if (h.push(p), d = p.when, h.length > o) break;
  }
  const _ = h.slice(0, o);
  (i.order ?? v.order) === "oldest_first" && _.reverse();
  const f = [];
  for (const p of _) {
    const g = ht(p.when);
    let I = f[f.length - 1];
    (!I || I.key !== g) && (I = { key: g, label: _t(p.when, n), items: [] }, f.push(I)), I.items.push(p);
  }
  return f;
}
function Kt(t) {
  let e = `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const i = t.cause;
  return i?.actor && (e += ` by ${i.actor.name}`), i?.trigger && (e += `, triggered by ${i.trigger}`), e;
}
var Vt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, P = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Yt(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Vt(e, i, s), s;
};
const $e = 3e3, qt = 6e4;
let w = class extends C {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._registryRefs = [];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => si), document.createElement("what-happened-card-editor");
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
    const i = [t.entities, t.devices, t.areas], n = i.some((s, r) => s !== this._registryRefs[r]);
    this._registryRefs = i, (e || n) && (this._ensureSubscription(), this._scheduleRecompute());
  }
  get hass() {
    return this._hass;
  }
  getCardSize() {
    const t = this._config;
    if (t?.max_height) return Math.max(3, Math.ceil(t.max_height / 50));
    const e = this._groups.reduce((i, n) => i + n.items.length, 0);
    return Math.min(12, Math.max(3, Math.ceil(e * 1.2) + 1));
  }
  /** Sections view: default size and resize limits (users resize with the handles). */
  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 3, min_rows: 2 };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this._now = Date.now(), this._recompute();
    }, qt), this._hass && this._config && (this._subKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    vt(e.target) && (i = bt(t, e.target));
    const n = q(e), s = JSON.stringify([n, i ? [...i].sort() : null]);
    if (s === this._subKey) {
      this._allowed = i;
      return;
    }
    if (this._subKey = s, this._allowed = i, this._unsubscribe(), this._entries.clear(), this._error = void 0, i && i.size === 0) {
      this._loading = !1;
      return;
    }
    this._loading = !0;
    const r = this._subToken, o = new Date(Date.now() - n * 36e5);
    ft(
      t,
      (a) => {
        if (r !== this._subToken) return;
        const c = this._config;
        for (const l of a)
          c && !je(l, c, this._allowed) || this._entries.set(Ne(l), l);
        this._entries.size > $e && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
      },
      o,
      i ? [...i] : void 0
    ).then((a) => {
      r !== this._subToken ? a() : this._unsub = a;
    }).catch((a) => {
      r === this._subToken && (this._loading = !1, this._error = a instanceof Error ? a.message : "Could not load the logbook");
    });
  }
  _trimBuffer() {
    const t = [...this._entries.entries()].sort((e, i) => i[1].when - e[1].when);
    this._entries = new Map(t.slice(0, $e));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    !this._hass || !this._config || (this._now = Date.now(), this._groups = Ft(
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
    (this._config?.tap_action ?? v.tap_action) !== "none" && this._moreInfo(t.entityId);
  }
  _onRowKey(t, e) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._onRowClick(e));
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return u;
    const e = this._groups.reduce((s, r) => s + r.items.length, 0), i = this._groups[this._groups.length - 1], n = i?.items[i.items.length - 1]?.key;
    return m`
      <ha-card
        class=${z({
      compact: t.compact ?? v.compact,
      "has-header": !!t.title
    })}
        style=${Y({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? m`<h1 class="card-header">${t.title}</h1>` : u}
        <div class="scroll">
          ${this._error ? m`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? m`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : m`<ol>
                      ${this._groups.map((s) => this._renderGroup(s, t, n))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = q(t), i = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, n = e === 1 ? "No activity in the last hour" : `No activity in the last ${i}`;
    return m`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${n}
    </div>`;
  }
  _renderGroup(t, e, i) {
    const n = e.show_day_headers ?? v.show_day_headers;
    return m`
      ${n ? m`<li class="day" role="presentation">${t.label}</li>` : u}
      ${t.items.map((s) => this._renderItem(s, e, s.key === i))}
    `;
  }
  _renderIcon(t) {
    const e = t.entityId ? this._hass?.states[t.entityId] : void 0;
    return e ? m`<ha-state-icon
          .hass=${this._hass}
          .stateObj=${e}
          .stateValue=${t.stateValue}
        ></ha-state-icon>` : m`<ha-icon .icon=${t.icon}></ha-icon>`;
  }
  _renderItem(t, e, i) {
    const n = e.show_avatars ?? v.show_avatars, s = e.show_cause ?? v.show_cause, r = !!t.entityId && (e.tap_action ?? v.tap_action) !== "none", o = n && t.picture;
    return m`
      <li class=${z({ item: !0, last: i })}>
        <div class="rail">
          <div
            class=${z({ node: !0, photo: !!o })}
            style=${Y({ "--accent": t.accent })}
          >
            ${o ? m`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${z({ row: !0, clickable: r })}
          style=${Y({ "--accent": t.accent })}
          role=${r ? "button" : "text"}
          tabindex=${r ? "0" : "-1"}
          aria-label=${Kt(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              <span class="subject">${t.name}</span> ${t.verb}
              ${t.count > 1 ? m`<span class="count">×${t.count}</span>` : u}
            </div>
            ${s ? this._renderCause(t, n) : u}
          </div>
          ${this._renderTime(t, e)}
        </div>
      </li>
    `;
  }
  _renderAvatar(t) {
    return t.picture ? m`<img class="avatar" src=${t.picture} alt="" loading="lazy" />` : m`<span class="avatar initial">${t.name.charAt(0).toUpperCase()}</span>`;
  }
  _renderCause(t, e) {
    const i = t.cause;
    if (!i || !i.actor && !i.trigger) return u;
    const n = i.actor, s = !!n?.entityId && (this._config?.tap_action ?? v.tap_action) !== "none";
    return m`
      <div class="secondary">
        ${n ? m`by${e && n.kind === "user" ? this._renderAvatar(n) : u}
              ${s ? m`<button
                      class="link"
                      type="button"
                      title=${n.detail ? `${n.name} – ${n.detail}` : n.name}
                      @click=${(r) => {
      r.stopPropagation(), this._moreInfo(n.entityId);
    }}
                      @keydown=${(r) => r.stopPropagation()}
                    >
                      ${n.name}
                    </button>` : m`<span title=${n.detail ?? n.name}>${n.name}</span>`}` : u}${n && i.trigger ? ", " : u}${i.trigger ? m`${n ? "triggered by" : "by"} ${i.trigger}` : u}
      </div>
    `;
  }
  _renderTime(t, e) {
    const i = e.time_display ?? v.time_display, n = Re(t.when, this._hass), s = mt(t.when, this._now);
    return m`
      <div class="time" title=${pt(t.when, this._hass)}>
        ${i !== "relative" ? m`<span class="abs">${n}</span>` : u}
        ${i !== "absolute" ? m`<span class="rel">${s}</span>` : u}
      </div>
    `;
  }
};
w.styles = gt;
P([
  M()
], w.prototype, "_config", 2);
P([
  M()
], w.prototype, "_groups", 2);
P([
  M()
], w.prototype, "_loading", 2);
P([
  M()
], w.prototype, "_error", 2);
P([
  M()
], w.prototype, "_now", 2);
w = P([
  Ce("what-happened-card")
], w);
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
var Gt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, ne = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Zt(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Gt(e, i, s), s;
};
const we = [
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
].map((t) => ({ value: t, label: t })), Jt = {
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
}, Xt = {
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, Qt = [
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
], ei = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: we }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: we }
    }
  }
], ti = [
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
], ii = [
  { name: "hide_unavailable", selector: { boolean: {} } },
  { name: "collapse_repeats", selector: { boolean: {} } }
], ni = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: ei },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: ti },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: ii }
];
let T = class extends C {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Jt[t.name] ?? t.name, this._computeHelper = (t) => Xt[t.name];
  }
  setConfig(t) {
    this._config = t;
  }
  _data() {
    return { ...v, ...this._config };
  }
  _valueChanged(t) {
    if (t.stopPropagation(), !this._config) return;
    const e = t.detail.value, i = { type: this._config.type };
    for (const [n, s] of Object.entries(e))
      n === "type" || s === void 0 || s === "" || Array.isArray(s) && s.length === 0 || n === "target" && (!s || Object.keys(s).length === 0) || v[n] === s && !(n in this._config) || (i[n] = s);
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _form(t) {
    return m`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${t}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }
  render() {
    return !this.hass || !this._config ? u : m`
      ${this._form(Qt)}
      ${ni.map(
      (t) => m`
          <ha-expansion-panel outlined .header=${t.header} .expanded=${t.id === "source"}>
            <ha-icon slot="leading-icon" .icon=${t.icon}></ha-icon>
            <div class="panel-content">${this._form(t.schema)}</div>
          </ha-expansion-panel>
        `
    )}
    `;
  }
};
T.styles = xe`
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
ne([
  Oe({ attribute: !1 })
], T.prototype, "hass", 2);
ne([
  M()
], T.prototype, "_config", 2);
T = ne([
  Ce("what-happened-card-editor")
], T);
const si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return T;
  }
}, Symbol.toStringTag, { value: "Module" }));
