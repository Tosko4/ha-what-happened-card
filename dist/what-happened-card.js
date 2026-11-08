/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, X = B.ShadowRoot && (B.ShadyCSS === void 0 || B.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), ae = /* @__PURE__ */ new WeakMap();
let Me = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (X && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = ae.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ae.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Je = (t) => new Me(typeof t == "string" ? t : t + "", void 0, Q), Ie = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[r + 1], t[0]);
  return new Me(i, t, Q);
}, Ze = (t, e) => {
  if (X) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), n = B.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, t.appendChild(s);
  }
}, ce = X ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Je(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xe, defineProperty: Qe, getOwnPropertyDescriptor: et, getOwnPropertyNames: tt, getOwnPropertySymbols: it, getPrototypeOf: st } = Object, Y = globalThis, le = Y.trustedTypes, nt = le ? le.emptyScript : "", rt = Y.reactiveElementPolyfillSupport, H = (t, e) => t, F = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? nt : null;
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
} }, ee = (t, e) => !Xe(t, e), de = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: ee };
Symbol.metadata ??= Symbol("metadata"), Y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = de) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, i);
      n !== void 0 && Qe(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: n, set: r } = et(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const e = st(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const i = this.properties, s = [...tt(i), ...it(i)];
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
      for (const n of s) i.unshift(ce(n));
    } else e !== void 0 && i.push(ce(e));
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
    return Ze(e, this.constructor.elementStyles), e;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : F).toAttribute(i, s.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : F;
      this._$Em = n;
      const c = o.fromAttribute(i, r.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, n = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? ee)(r, i) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[H("elementProperties")] = /* @__PURE__ */ new Map(), E[H("finalized")] = /* @__PURE__ */ new Map(), rt?.({ ReactiveElement: E }), (Y.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis, he = (t) => t, K = te.trustedTypes, ue = K ? K.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Pe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Re = "?" + $, ot = `<${Re}>`, k = document, N = () => k.createComment(""), j = (t) => t === null || typeof t != "object" && typeof t != "function", ie = Array.isArray, at = (t) => ie(t) || typeof t?.[Symbol.iterator] == "function", G = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, A = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, fe = /"/g, Ue = /^(?:script|style|textarea|title)$/i, ct = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), _ = ct(1), w = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), S = k.createTreeWalker(k, 129);
function De(t, e) {
  if (!ie(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const lt = (t, e) => {
  const i = t.length - 1, s = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = D;
  for (let c = 0; c < i; c++) {
    const l = t[c];
    let d, a, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, a = o.exec(l), a !== null); ) u = o.lastIndex, o === D ? a[1] === "!--" ? o = pe : a[1] !== void 0 ? o = me : a[2] !== void 0 ? (Ue.test(a[2]) && (n = RegExp("</" + a[2], "g")), o = A) : a[3] !== void 0 && (o = A) : o === A ? a[0] === ">" ? (o = n ?? D, h = -1) : a[1] === void 0 ? h = -2 : (h = o.lastIndex - a[2].length, d = a[1], o = a[3] === void 0 ? A : a[3] === '"' ? fe : _e) : o === fe || o === _e ? o = A : o === pe || o === me ? o = D : (o = A, n = void 0);
    const f = o === A && t[c + 1].startsWith("/>") ? " " : "";
    r += o === D ? l + ot : h >= 0 ? (s.push(d), l.slice(0, h) + Pe + l.slice(h) + $ + f) : l + $ + (h === -2 ? c : f);
  }
  return [De(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: e, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const c = e.length - 1, l = this.parts, [d, a] = lt(e, i);
    if (this.el = z.createElement(d, s), S.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = S.nextNode()) !== null && l.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Pe)) {
          const u = a[o++], f = n.getAttribute(h).split($), b = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: r, name: b[2], strings: f, ctor: b[1] === "." ? ht : b[1] === "?" ? ut : b[1] === "@" ? pt : q }), n.removeAttribute(h);
        } else h.startsWith($) && (l.push({ type: 6, index: r }), n.removeAttribute(h));
        if (Ue.test(n.tagName)) {
          const h = n.textContent.split($), u = h.length - 1;
          if (u > 0) {
            n.textContent = K ? K.emptyScript : "";
            for (let f = 0; f < u; f++) n.append(h[f], N()), S.nextNode(), l.push({ type: 2, index: ++r });
            n.append(h[u], N());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Re) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = n.data.indexOf($, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const s = k.createElement("template");
    return s.innerHTML = e, s;
  }
}
function M(t, e, i = t, s) {
  if (e === w) return e;
  let n = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const r = j(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(t), n._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = n : i._$Cl = n), n !== void 0 && (e = M(t, n._$AS(t, e.values), n, s)), e;
}
class dt {
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
    const { el: { content: i }, parts: s } = this._$AD, n = (e?.creationScope ?? k).importNode(i, !0);
    S.currentNode = n;
    let r = S.nextNode(), o = 0, c = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new L(r, r.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (d = new mt(r, this, e)), this._$AV.push(d), l = s[++c];
      }
      o !== l?.index && (r = S.nextNode(), o++);
    }
    return S.currentNode = k, n;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = M(this, e, i), j(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== w && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : at(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = z.createElement(De(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const r = new dt(n, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = ve.get(e.strings);
    return i === void 0 && ve.set(e.strings, i = new z(e)), i;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const r of e) n === i.length ? i.push(s = new L(this.O(N()), this.O(N()), this, this.options)) : s = i[n], s._$AI(r), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = he(e).nextSibling;
      he(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, n, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, i = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = M(this, e, i, 0), o = !j(e) || e !== this._$AH && e !== w, o && (this._$AH = e);
    else {
      const c = e;
      let l, d;
      for (e = r[0], l = 0; l < r.length - 1; l++) d = M(this, c[s + l], i, l), d === w && (d = this._$AH[l]), o ||= !j(d) || d !== this._$AH[l], d === p ? e = p : e !== p && (e += (d ?? "") + r[l + 1]), this._$AH[l] = d;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ht extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class ut extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class pt extends q {
  constructor(e, i, s, n, r) {
    super(e, i, s, n, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = M(this, e, i, 0) ?? p) === w) return;
    const s = this._$AH, n = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== p && (s === p || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class mt {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const _t = te.litHtmlPolyfillSupport;
_t?.(z, L), (te.litHtmlVersions ??= []).push("3.3.3");
const ft = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = i?.renderBefore ?? null;
    s._$litPart$ = n = new L(e.insertBefore(N(), r), r, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = globalThis;
let O = class extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ft(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
};
O._$litElement$ = !0, O.finalized = !0, se.litElementHydrateSupport?.({ LitElement: O });
const vt = se.litElementPolyfillSupport;
vt?.({ LitElement: O });
(se.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: ee }, bt = (t = gt, e, i) => {
  const { kind: s, metadata: n } = i;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), s === "accessor") {
    const { name: o } = i;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(o, l, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, t, c), c;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(c) {
      const l = this[o];
      e.call(this, c), this.requestUpdate(o, l, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ne(t) {
  return (e, i) => typeof i == "object" ? bt(t, e, i) : ((s, n, r) => {
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
  return Ne({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = { ATTRIBUTE: 1 }, ze = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Le = class {
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
const W = ze(class extends Le {
  constructor(t) {
    if (super(t), t.type !== je.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return w;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = "important", yt = " !" + We, J = ze(class extends Le {
  constructor(t) {
    if (super(t), t.type !== je.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const r = typeof n == "string" && n.endsWith(yt);
        s.includes("-") || r ? i.setProperty(s, r ? n.slice(0, -11) : n, r ? We : "") : i[s] = n;
      }
    }
    return w;
  }
}), ne = "en-US";
function ge(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function $t(t) {
  const e = new Date(t), i = (s) => String(s).padStart(2, "0");
  return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}`;
}
function wt(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function Be(t, e, i = !1) {
  const s = wt(e);
  return new Intl.DateTimeFormat(ne, {
    hour: s ? "numeric" : "2-digit",
    minute: "2-digit",
    second: i ? "2-digit" : void 0,
    hourCycle: s ? "h12" : "h23"
  }).format(t);
}
function xt(t, e) {
  return `${new Intl.DateTimeFormat(ne, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${Be(t, e, !0)}`;
}
function At(t, e) {
  const i = Math.max(0, Math.round((e - t) / 1e3));
  if (i < 45) return "just now";
  const s = Math.round(i / 60);
  if (s < 60) return `${s} min ago`;
  const n = Math.round(s / 60);
  return n < 24 ? `${n} h ago` : `${Math.round(n / 24)} d ago`;
}
function St(t, e) {
  const i = Math.round((ge(e) - ge(t)) / 864e5);
  if (i === 0) return "Today";
  if (i === 1) return "Yesterday";
  const s = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(ne, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: s ? void 0 : "numeric"
  }).format(t);
}
function kt(t, e, i, s) {
  const n = {
    type: "logbook/event_stream",
    start_time: i.toISOString()
  };
  return s && s.length > 0 && (n.entity_ids = s), t.connection.subscribeMessage(
    (r) => e(r.events ?? []),
    n
  );
}
const Et = "mdi:information-outline", Ct = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function Tt(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : Et);
}
function V(t, e, i, s, n) {
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
const be = "var(--error-color)", Ot = "tapo_rv30", ye = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice"
}, Mt = {
  cleaning: "start",
  docked: "finish"
}, It = 10 * 60 * 1e3, Pt = /* @__PURE__ */ new Set(["start", "done", "override", "return", "docked", "skip", "error"]), Ve = 300;
function Rt(t) {
  return Object.values(t.entities ?? {}).filter((e) => e.platform === Ot && e.entity_id.startsWith("vacuum.")).map((e) => e.entity_id);
}
function $e(t) {
  const e = t.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  return e ? { byUser: e[1] === "You started", names: e[2], why: e[3]?.replace(/\.$/, "") } : { byUser: t.startsWith("You") };
}
function Ut(t, e, i) {
  let s;
  for (const n of t) {
    if (n.kind !== "start" || i.has(n)) continue;
    const r = Math.abs(n.ts - e);
    r <= Ve && (!s || r < Math.abs(s.ts - e)) && (s = n);
  }
  return s;
}
function we() {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}
function xe(t) {
  return { kind: "user", name: t.user?.name ?? "You" };
}
function Dt(t) {
  const e = [];
  return t.minutes != null && e.push(`${t.minutes} min`), t.area != null && e.push(`${t.area} m²`), t.emptied_bin && e.push("bin emptied"), e;
}
function Ht(t, e, i) {
  const n = t.states[e.entityId]?.attributes.friendly_name ?? e.entityId, r = i.state_color ?? !0, o = [], c = /* @__PURE__ */ new Set(), l = {
    entityId: e.entityId,
    domain: "vacuum",
    name: n,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    fixedIcon: !0
  };
  for (const a of e.runs) {
    const h = Ut(e.log, a.started, c);
    h && c.add(h);
    const u = h ? $e(h.text) : void 0, f = !!a.error;
    let b;
    h && u ? b = { actor: u.byUser ? xe(t) : we(), trigger: u.why } : a.start_type != null && ye[a.start_type] && (b = {
      actor: { kind: "other", name: ye[a.start_type], icon: "mdi:gesture-tap" }
    }), o.push({
      ...l,
      key: `vac|${e.entityId}|start|${a.started}`,
      when: a.started * 1e3,
      verb: u?.names ? `started cleaning ${u.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: a.rule_name ? [`preset “${a.rule_name}”`] : void 0,
      cause: b,
      accent: V("vacuum", void 0, "cleaning", "active", r)
    });
    const y = (a.started + (a.minutes ?? 0) * 60) * 1e3;
    o.push({
      ...l,
      key: `vac|${e.entityId}|finish|${a.started}`,
      when: Math.max(y, a.started * 1e3 + 1e3),
      verb: f ? `stopped with error ${a.error}` : u?.names ? `finished cleaning ${u.names}` : "finished cleaning",
      tone: f ? "alert" : "inactive",
      phase: "finish",
      icon: f ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: Dt(a),
      accent: f ? be : V("vacuum", void 0, "docked", "inactive", r)
    });
  }
  const d = new Set(e.runs.map((a) => a.started));
  for (const a of e.log) {
    if (!Pt.has(a.kind) || c.has(a) || a.kind === "done" && e.runs.length > 0 || a.kind === "start" && [...d].some((f) => Math.abs(f - a.ts) <= Ve))
      continue;
    const h = a.kind === "start" ? $e(a.text) : void 0, u = a.kind === "error" ? "alert" : a.kind === "start" ? "active" : "neutral";
    o.push({
      ...l,
      key: `vac|${e.entityId}|log|${a.ts}|${a.kind}`,
      when: a.ts * 1e3,
      verb: h?.names ? `started cleaning ${h.names}` : "",
      text: h?.names ? void 0 : a.text.replace(/\.$/, ""),
      tone: u,
      phase: a.kind === "start" ? "start" : a.kind === "done" ? "finish" : void 0,
      icon: a.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      cause: { actor: h?.byUser ? xe(t) : we(), trigger: h?.why },
      accent: u === "alert" ? be : V(
        "vacuum",
        void 0,
        "cleaning",
        u === "active" ? "active" : "neutral",
        r
      )
    });
  }
  return o;
}
const Nt = Ie`
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
function C(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function jt(t) {
  return t ? Object.values(t).some((e) => C(e).length > 0) : !1;
}
function zt(t, e) {
  const i = /* @__PURE__ */ new Set(), s = t.entities ?? {}, n = t.devices ?? {}, r = t.areas ?? {}, o = new Set(C(e.area_id));
  for (const d of C(e.floor_id))
    for (const a of Object.values(r))
      a.floor_id === d && o.add(a.area_id);
  const c = new Set(C(e.device_id)), l = new Set(C(e.label_id));
  for (const d of C(e.entity_id)) i.add(d);
  for (const d of Object.values(s)) {
    const a = d.device_id ? n[d.device_id] : void 0, h = d.area_id ?? a?.area_id ?? void 0;
    h && o.has(h) && i.add(d.entity_id), d.device_id && c.has(d.device_id) && i.add(d.entity_id), d.labels?.some((u) => l.has(u)) && i.add(d.entity_id), a?.labels?.some((u) => l.has(u)) && i.add(d.entity_id);
  }
  return i;
}
const Lt = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function Fe(t, e) {
  return e.replace(Lt, (i) => t.states[i]?.attributes.friendly_name ?? i);
}
function Wt(t, e) {
  for (const [i, s] of Object.entries(t.states))
    if (i.startsWith("person.") && s.attributes.user_id === e)
      return {
        entityId: i,
        name: s.attributes.friendly_name ?? i,
        picture: s.attributes.entity_picture
      };
}
function Bt(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function Vt(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function Ft(t, e) {
  let i = e.context_source;
  return !i && e.context_message?.startsWith("triggered by ") && (i = e.context_message.slice(13)), i ? Fe(t, i) : void 0;
}
function Kt(t, e) {
  const i = Wt(t, e);
  return i ? { kind: "user", name: i.name, entityId: i.entityId, picture: i.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function Ae(t, e, i) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? i ?? e ?? "Unknown";
}
function Yt(t, e) {
  const i = e.context_event_type;
  if (i === "automation_triggered" || i === "script_started")
    return {
      actor: {
        kind: i === "automation_triggered" ? "automation" : "script",
        name: Ae(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: Ft(t, e),
      triggerEntityId: Bt(Vt(e))
    };
  if (e.context_user_id) {
    const s = Kt(t, e.context_user_id);
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
      name: Ae(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function qt(t, e) {
  const i = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return i ? Fe(t, i) : void 0;
}
const Se = {
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
}, Gt = {
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
}, Jt = /* @__PURE__ */ new Set([
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
]), Zt = /* @__PURE__ */ new Set(["person", "device_tracker"]), Xt = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function re(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Qt(t, e, i) {
  const s = t.states[e];
  if (s && t.formatEntityState)
    try {
      const o = t.formatEntityState({ ...s, state: i }, i);
      if (o) return o;
    } catch {
    }
  const n = s?.attributes.unit_of_measurement;
  return i !== "" && !Number.isNaN(Number(i)) ? n ? `${i} ${n}` : i : re(i);
}
function ei(t, e) {
  return Object.values(t.states).find(
    (s) => s.entity_id.startsWith("zone.") && (s.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? re(e);
}
function ti(t, e, i, s) {
  if (s === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (s === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (i ? t.states[i] : void 0)?.attributes.device_class;
  if (Zt.has(e))
    return s === "home" ? { verb: "arrived home", tone: "active" } : s === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${ei(t, s)}`, tone: "active" };
  if (e === "binary_sensor" && r && Se[r]) {
    const [l, d, a, h] = Se[r];
    if (s === "on") return { verb: l, tone: a ?? "active" };
    if (s === "off") return { verb: d, tone: h ?? "inactive" };
  }
  const o = Gt[e]?.[s];
  if (o) return { verb: o[0], tone: o[1] };
  if (Xt.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && s === "off") return { verb: "was turned off", tone: "inactive" };
  if (Jt.has(e) || s === "on" || s === "off") {
    if (s === "on") return { verb: "was turned on", tone: "active" };
    if (s === "off") return { verb: "was turned off", tone: "inactive" };
  }
  return { verb: `changed to ${i ? Qt(t, i, s) : re(s)}`, tone: "neutral" };
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
  vacuum_details: !0,
  hide_unavailable: !0,
  collapse_repeats: !0
}, T = { hours: [1, 720], entries: [1, 500] }, ke = 60 * 1e3, ii = 10 * 60 * 1e3, Ee = 5 * 60 * 1e3;
function Ke(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function Ye(t, [e, i], s) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? Math.min(i, Math.max(e, Math.round(n))) : s;
}
function Z(t) {
  return Ye(t.hours_to_show, T.hours, g.hours_to_show);
}
function si(t) {
  return Ye(t.max_entries, T.entries, g.max_entries);
}
function qe(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function Ge(t, e, i) {
  const s = qe(t);
  return !(i && (!t.entity_id || !i.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(s) || e.exclude_domains?.includes(s) || (e.hide_unavailable ?? g.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function ni(t, e, i) {
  const s = qe(e), n = e.entity_id ? t.states[e.entity_id] : void 0, r = e.name ?? n?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let o, c = "neutral", l = Yt(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: o, tone: c } = ti(t, s, e.entity_id, e.state));
  else {
    const f = e.message ?? "did something";
    if (f.match(/^triggered(?: by (.+))?$/)) {
      o = "was triggered", c = "active";
      const y = qt(t, e);
      y && (l = { ...l, trigger: y });
    } else
      o = f, c = /(error|fail)/i.test(f) ? "alert" : "neutral";
  }
  const d = l?.actor;
  d && !d.icon && (d.icon = Ct[d.kind]);
  const a = s === "person", h = a ? n?.attributes.entity_picture : void 0, u = i.state_color ?? g.state_color;
  return {
    key: Ke(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: s,
    name: r,
    verb: o,
    tone: c,
    icon: Tt(s, e.icon),
    stateValue: e.state,
    picture: h,
    isPerson: a,
    isRun: e.state === void 0 && e.message !== void 0 && /^triggered/.test(e.message),
    cause: l,
    count: 1,
    accent: V(s, n?.attributes.device_class, e.state, c, u)
  };
}
function Ce(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function ri(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const i = Mt[t.state ?? ""];
  return i ? e.items.some(
    (s) => s.entityId === t.entity_id && s.phase === i && Math.abs(s.when - t.when * 1e3) <= It
  ) : !1;
}
function oi(t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of t) {
    const s = i.cause?.actor;
    if (!s?.entityId || s.kind !== "automation" && s.kind !== "script") continue;
    for (const o of t)
      o.isRun && o.entityId === s.entityId && Math.abs(o.when - i.when) <= ke && e.add(o);
    const n = i.cause?.triggerEntityId;
    if (!n) continue;
    const r = t.find(
      (o) => o !== i && !o.isRun && o.entityId === n && o.when <= i.when + 5e3 && i.when - o.when <= ke
    );
    r && (e.add(r), i.cause = { ...i.cause, trigger: `${r.name} ${r.verb}` });
  }
  return t.filter((i) => !e.has(i));
}
function ai(t, e, i, s, n, r) {
  const o = s - Z(i) * 36e5, c = si(i), l = i.collapse_repeats ?? g.collapse_repeats, d = [...e].filter((m) => {
    const v = m.when * 1e3;
    return v >= o && v <= s + Ee;
  }).filter((m) => Ge(m, i, n)).filter((m) => !ri(m, r)).sort((m, v) => v.when - m.when), a = (r?.items ?? []).filter(
    (m) => m.when >= o && m.when <= s + Ee
  ), h = oi(
    [...d.map((m) => ni(t, m, i)), ...a].sort(
      (m, v) => v.when - m.when
    )
  ), u = [];
  let f = 0;
  for (const m of h) {
    const v = u[u.length - 1];
    if (l && v && !m.rich && !v.rich && m.entityId && v.entityId === m.entityId && v.verb === m.verb && Ce(v) === Ce(m) && f - m.when <= ii) {
      v.count += 1, f = m.when;
      continue;
    }
    if (u.push(m), f = m.when, u.length > c) break;
  }
  const b = u.slice(0, c);
  (i.order ?? g.order) === "oldest_first" && b.reverse();
  const y = [];
  for (const m of b) {
    const v = $t(m.when);
    let U = y[y.length - 1];
    (!U || U.key !== v) && (U = { key: v, label: St(m.when, s), items: [] }, y.push(U)), U.items.push(m);
  }
  return y;
}
function ci(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const i = t.cause;
  return i?.actor && (e += ` by ${i.actor.name}`), i?.trigger && (e += `, triggered by ${i.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), e;
}
var li = Object.defineProperty, di = Object.getOwnPropertyDescriptor, R = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? di(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && li(e, i, n), n;
};
const Te = 3e3, hi = 6e4;
let x = class extends O {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._registryRefs = [];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => $i), document.createElement("what-happened-card-editor");
  }
  static getStubConfig() {
    return { title: "What happened", hours_to_show: 24, max_entries: 50 };
  }
  setConfig(t) {
    if (!t || typeof t != "object") throw new Error("Invalid configuration");
    if (t.target !== void 0 && (typeof t.target != "object" || t.target === null))
      throw new Error("`target` must be an object with entity_id, device_id, area_id or label_id");
    this._config = { ...t }, this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute();
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
      this._now = Date.now(), this._refreshHistories(), this._recompute();
    }, hi), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this._tick), window.clearTimeout(this._recomputeTimer), this._unsubscribe(), this._unsubscribeVacuums(), this._subKey = void 0, this._vacKey = void 0;
  }
  // ---------------------------------------------------------------- data
  _unsubscribe() {
    this._subToken++, this._unsub?.(), this._unsub = void 0;
  }
  _ensureSubscription() {
    this._ensureLogbook(), this._ensureVacuums();
  }
  // ----------------------------------------------- TapoVac-ADV (tapo_rv30)
  _unsubscribeVacuums() {
    this._vacToken++;
    for (const t of this._vacUnsubs) t();
    this._vacUnsubs = [];
  }
  _vacuumVisible(t, e) {
    return this._allowed && !this._allowed.has(t) || e.exclude_entities?.includes(t) || e.include_domains?.length && !e.include_domains.includes("vacuum") ? !1 : !e.exclude_domains?.includes("vacuum");
  }
  _ensureVacuums() {
    const t = this._hass, e = this._config;
    if (!t || !e || !this.isConnected) return;
    const i = e.vacuum_details === !1 ? [] : Rt(t).filter((r) => this._vacuumVisible(r, e)), s = JSON.stringify([...i].sort());
    if (s === this._vacKey) return;
    this._vacKey = s, this._unsubscribeVacuums(), this._vacuums.clear();
    const n = this._vacToken;
    for (const r of i) {
      const o = { entityId: r, log: [], runs: [] };
      this._vacuums.set(r, o), t.connection.subscribeMessage(
        (c) => {
          n === this._vacToken && (o.log = c.log ?? [], this._refreshHistory(o), this._scheduleRecompute());
        },
        { type: "tapo_rv30/planner/subscribe", entity_id: r }
      ).then((c) => {
        n !== this._vacToken ? c() : this._vacUnsubs.push(c);
      }).catch(() => {
      }), this._refreshHistory(o);
    }
  }
  _refreshHistory(t) {
    const e = this._hass;
    if (!e) return;
    const i = this._vacToken;
    e.callWS({ type: "tapo_rv30/history/list", entity_id: t.entityId }).then((s) => {
      i === this._vacToken && (t.runs = (s.runs ?? []).filter((n) => n.started), this._scheduleRecompute());
    }).catch(() => {
    });
  }
  _refreshHistories() {
    for (const t of this._vacuums.values()) this._refreshHistory(t);
  }
  _ensureLogbook() {
    const t = this._hass, e = this._config;
    if (!t || !e || !this.isConnected) return;
    let i;
    jt(e.target) && (i = zt(t, e.target));
    const s = Z(e), n = JSON.stringify([s, i ? [...i].sort() : null]);
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
    kt(
      t,
      (c) => {
        if (r !== this._subToken) return;
        const l = this._config;
        for (const d of c)
          l && !Ge(d, l, this._allowed) || this._entries.set(Ke(d), d);
        this._entries.size > Te && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
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
    this._entries = new Map(t.slice(0, Te));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    !this._hass || !this._config || (this._now = Date.now(), this._groups = ai(
      this._hass,
      this._entries.values(),
      this._config,
      this._now,
      this._allowed,
      this._extraItems()
    ));
  }
  _extraItems() {
    const t = this._hass, e = this._config, i = /* @__PURE__ */ new Set(), s = [];
    if (t && e)
      for (const n of this._vacuums.values())
        !n.log.length && !n.runs.length || (i.add(n.entityId), s.push(...Ht(t, n, e)));
    return { items: s, vacuums: i };
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
    if (!t) return p;
    const e = this._groups.reduce((n, r) => n + r.items.length, 0), i = this._groups[this._groups.length - 1], s = i?.items[i.items.length - 1]?.key;
    return _`
      <ha-card
        class=${W({
      compact: t.compact ?? g.compact,
      "has-header": !!t.title
    })}
        style=${J({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? _`<h1 class="card-header">${t.title}</h1>` : p}
        <div class="scroll">
          ${this._error ? _`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? _`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : _`<ol>
                      ${this._groups.map((n) => this._renderGroup(n, t, s))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = Z(t), i = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, s = e === 1 ? "No activity in the last hour" : `No activity in the last ${i}`;
    return _`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${s}
    </div>`;
  }
  _renderGroup(t, e, i) {
    const s = e.show_day_headers ?? g.show_day_headers;
    return _`
      ${s ? _`<li class="day" role="presentation">${t.label}</li>` : p}
      ${t.items.map((n) => this._renderItem(n, e, n.key === i))}
    `;
  }
  _renderIcon(t) {
    const e = t.entityId && !t.fixedIcon ? this._hass?.states[t.entityId] : void 0;
    return e ? _`<ha-state-icon
          .hass=${this._hass}
          .stateObj=${e}
          .stateValue=${t.stateValue}
        ></ha-state-icon>` : _`<ha-icon .icon=${t.icon}></ha-icon>`;
  }
  _renderItem(t, e, i) {
    const s = e.show_avatars ?? g.show_avatars, n = e.show_cause ?? g.show_cause, r = !!t.entityId && (e.tap_action ?? g.tap_action) !== "none", o = s && t.picture;
    return _`
      <li class=${W({ item: !0, last: i })}>
        <div class="rail">
          <div
            class=${W({ node: !0, photo: !!o })}
            style=${J({ "--accent": t.accent })}
          >
            ${o ? _`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${W({ row: !0, clickable: r })}
          style=${J({ "--accent": t.accent })}
          role=${r ? "button" : "text"}
          tabindex=${r ? "0" : "-1"}
          aria-label=${ci(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(c) => this._onRowKey(c, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : _`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? _`<span class="count">×${t.count}</span>` : p}
            </div>
            ${t.details?.length ? _`<div class="secondary">${t.details.join(" · ")}</div>` : p}
            ${n ? this._renderCause(t, s) : p}
          </div>
          ${this._renderTime(t, e)}
        </div>
      </li>
    `;
  }
  _renderAvatar(t) {
    return t.picture ? _`<img class="avatar" src=${t.picture} alt="" loading="lazy" />` : _`<span class="avatar initial">${t.name.charAt(0).toUpperCase()}</span>`;
  }
  _renderCause(t, e) {
    const i = t.cause;
    if (!i || !i.actor && !i.trigger) return p;
    const s = i.actor, n = !!s?.entityId && (this._config?.tap_action ?? g.tap_action) !== "none";
    return _`
      <div class="secondary">
        ${s ? _`by${e && s.kind === "user" ? this._renderAvatar(s) : p}
              ${n ? _`<button
                      class="link"
                      type="button"
                      title=${s.detail ? `${s.name} – ${s.detail}` : s.name}
                      @click=${(r) => {
      r.stopPropagation(), this._moreInfo(s.entityId);
    }}
                      @keydown=${(r) => r.stopPropagation()}
                    >
                      ${s.name}
                    </button>` : _`<span title=${s.detail ?? s.name}>${s.name}</span>`}` : p}${s && i.trigger ? ", " : p}${i.trigger ? _`${s ? "triggered by" : "by"} ${i.trigger}` : p}
      </div>
    `;
  }
  _renderTime(t, e) {
    const i = e.time_display ?? g.time_display, s = Be(t.when, this._hass), n = At(t.when, this._now);
    return _`
      <div class="time" title=${xt(t.when, this._hass)}>
        ${i !== "relative" ? _`<span class="abs">${s}</span>` : p}
        ${i !== "absolute" ? _`<span class="rel">${n}</span>` : p}
      </div>
    `;
  }
};
x.styles = Nt;
R([
  P()
], x.prototype, "_config", 2);
R([
  P()
], x.prototype, "_groups", 2);
R([
  P()
], x.prototype, "_loading", 2);
R([
  P()
], x.prototype, "_error", 2);
R([
  P()
], x.prototype, "_now", 2);
x = R([
  He("what-happened-card")
], x);
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
var ui = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, oe = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? pi(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (n = (s ? o(e, i, n) : o(n)) || n);
  return s && n && ui(e, i, n), n;
};
const Oe = [
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
].map((t) => ({ value: t, label: t })), mi = {
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
  vacuum_details: "TapoVac-ADV: show cleaning runs with rooms, duration and reason",
  hide_unavailable: "Hide unavailable / unknown states",
  collapse_repeats: "Merge rapid repeats of the same event"
}, _i = {
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, fi = [
  { name: "title", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "hours_to_show",
        selector: {
          number: {
            min: T.hours[0],
            max: T.hours[1],
            step: 1,
            mode: "box",
            unit_of_measurement: "h"
          }
        }
      },
      {
        name: "max_entries",
        selector: {
          number: { min: T.entries[0], max: T.entries[1], step: 1, mode: "box" }
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
], vi = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: Oe }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: Oe }
    }
  }
], gi = [
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
], bi = [
  { name: "vacuum_details", selector: { boolean: {} } },
  { name: "hide_unavailable", selector: { boolean: {} } },
  { name: "collapse_repeats", selector: { boolean: {} } }
], yi = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: vi },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: gi },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: bi }
];
let I = class extends O {
  constructor() {
    super(...arguments), this._computeLabel = (t) => mi[t.name] ?? t.name, this._computeHelper = (t) => _i[t.name];
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
    return _`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${t}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }
  render() {
    return !this.hass || !this._config ? p : _`
      ${this._form(fi)}
      ${yi.map(
      (t) => _`
          <ha-expansion-panel outlined .header=${t.header} .expanded=${t.id === "source"}>
            <ha-icon slot="leading-icon" .icon=${t.icon}></ha-icon>
            <div class="panel-content">${this._form(t.schema)}</div>
          </ha-expansion-panel>
        `
    )}
    `;
  }
};
I.styles = Ie`
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
oe([
  Ne({ attribute: !1 })
], I.prototype, "hass", 2);
oe([
  P()
], I.prototype, "_config", 2);
I = oe([
  He("what-happened-card-editor")
], I);
const $i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return I;
  }
}, Symbol.toStringTag, { value: "Module" }));
