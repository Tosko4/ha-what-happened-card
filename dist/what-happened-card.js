/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, se = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, re = Symbol(), fe = /* @__PURE__ */ new WeakMap();
let Le = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (se && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = fe.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && fe.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (t) => new Le(typeof t == "string" ? t : t + "", void 0, re), We = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new Le(i, t, re);
}, lt = (t, e) => {
  if (se) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), s = q.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, _e = se ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return dt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ut, defineProperty: ht, getOwnPropertyDescriptor: pt, getOwnPropertyNames: mt, getOwnPropertySymbols: ft, getPrototypeOf: _t } = Object, Z = globalThis, ge = Z.trustedTypes, gt = ge ? ge.emptyScript : "", vt = Z.reactiveElementPolyfillSupport, L = (t, e) => t, G = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? gt : null;
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
} }, oe = (t, e) => !ut(t, e), ve = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: oe };
Symbol.metadata ??= Symbol("metadata"), Z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ve) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, i);
      s !== void 0 && ht(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: s, set: r } = pt(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? ve;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = _t(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const i = this.properties, n = [...mt(i), ...ft(i)];
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
      for (const s of n) i.unshift(_e(s));
    } else e !== void 0 && i.push(_e(e));
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
    return lt(e, this.constructor.elementStyles), e;
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
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : G).toAttribute(i, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : G;
      this._$Em = s;
      const a = o.fromAttribute(i, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, s = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), n ??= o.getPropertyOptions(e), !((n.hasChanged ?? oe)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, n)))) return;
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[L("elementProperties")] = /* @__PURE__ */ new Map(), T[L("finalized")] = /* @__PURE__ */ new Map(), vt?.({ ReactiveElement: T }), (Z.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis, be = (t) => t, J = ae.trustedTypes, ye = J ? J.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Be = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + x, bt = `<${Ve}>`, I = document, W = () => I.createComment(""), B = (t) => t === null || typeof t != "object" && typeof t != "function", ce = Array.isArray, yt = (t) => ce(t) || typeof t?.[Symbol.iterator] == "function", Q = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, $e = />/g, E = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xe = /'/g, Ae = /"/g, Fe = /^(?:script|style|textarea|title)$/i, wt = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), _ = wt(1), A = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), C = I.createTreeWalker(I, 129);
function Ke(t, e) {
  if (!ce(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ye !== void 0 ? ye.createHTML(e) : e;
}
const $t = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = z;
  for (let a = 0; a < i; a++) {
    const c = t[a];
    let l, h, u = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, h = o.exec(c), h !== null); ) g = o.lastIndex, o === z ? h[1] === "!--" ? o = we : h[1] !== void 0 ? o = $e : h[2] !== void 0 ? (Fe.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = E) : h[3] !== void 0 && (o = E) : o === E ? h[0] === ">" ? (o = s ?? z, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? E : h[3] === '"' ? Ae : xe) : o === Ae || o === xe ? o = E : o === we || o === $e ? o = z : (o = E, s = void 0);
    const d = o === E && t[a + 1].startsWith("/>") ? " " : "";
    r += o === z ? c + bt : u >= 0 ? (n.push(l), c.slice(0, u) + Be + c.slice(u) + x + d) : c + x + (u === -2 ? a : d);
  }
  return [Ke(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class V {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, c = this.parts, [l, h] = $t(e, i);
    if (this.el = V.createElement(l, n), C.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = C.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Be)) {
          const g = h[o++], d = s.getAttribute(u).split(x), m = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: r, name: m[2], strings: d, ctor: m[1] === "." ? At : m[1] === "?" ? kt : m[1] === "@" ? St : X }), s.removeAttribute(u);
        } else u.startsWith(x) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (Fe.test(s.tagName)) {
          const u = s.textContent.split(x), g = u.length - 1;
          if (g > 0) {
            s.textContent = J ? J.emptyScript : "";
            for (let d = 0; d < g; d++) s.append(u[d], W()), C.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[g], W());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ve) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(x, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += x.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = I.createElement("template");
    return n.innerHTML = e, n;
  }
}
function N(t, e, i = t, n) {
  if (e === A) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = B(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (e = N(t, s._$AS(t, e.values), s, n)), e;
}
class xt {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? I).importNode(i, !0);
    C.currentNode = s;
    let r = C.nextNode(), o = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new F(r, r.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (l = new Et(r, this, e)), this._$AV.push(l), c = n[++a];
      }
      o !== c?.index && (r = C.nextNode(), o++);
    }
    return C.currentNode = I, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class F {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = N(this, e, i), B(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : yt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && B(this._$AH) ? this._$AA.nextSibling.data = e : this.T(I.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = V.createElement(Ke(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new xt(s, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = ke.get(e.strings);
    return i === void 0 && ke.set(e.strings, i = new V(e)), i;
  }
  k(e) {
    ce(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new F(this.O(W()), this.O(W()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = be(e).nextSibling;
      be(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = p;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = N(this, e, i, 0), o = !B(e) || e !== this._$AH && e !== A, o && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = r[0], c = 0; c < r.length - 1; c++) l = N(this, a[n + c], i, c), l === A && (l = this._$AH[c]), o ||= !B(l) || l !== this._$AH[c], l === p ? e = p : e !== p && (e += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class At extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class kt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class St extends X {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = N(this, e, i, 0) ?? p) === A) return;
    const n = this._$AH, s = e === p && n !== p || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== p && (n === p || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Et {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    N(this, e);
  }
}
const Ct = ae.litHtmlPolyfillSupport;
Ct?.(V, F), (ae.litHtmlVersions ??= []).push("3.3.3");
const It = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new F(e.insertBefore(W(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = globalThis;
let P = class extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = It(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
};
P._$litElement$ = !0, P.finalized = !0, de.litElementHydrateSupport?.({ LitElement: P });
const Tt = de.litElementPolyfillSupport;
Tt?.({ LitElement: P });
(de.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: oe }, Mt = (t = Ot, e, i) => {
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
function qe(t) {
  return (e, i) => typeof i == "object" ? Mt(t, e, i) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(t) {
  return qe({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = { ATTRIBUTE: 1 }, Je = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ze = class {
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
const Y = Je(class extends Ze {
  constructor(t) {
    if (super(t), t.type !== Ge.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return A;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = "important", Rt = " !" + Xe, ee = Je(class extends Ze {
  constructor(t) {
    if (super(t), t.type !== Ge.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const r = typeof s == "string" && s.endsWith(Rt);
        n.includes("-") || r ? i.setProperty(n, r ? s.slice(0, -11) : s, r ? Xe : "") : i[n] = s;
      }
    }
    return A;
  }
}), le = "en-US";
function Se(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function Pt(t) {
  const e = new Date(t), i = (n) => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}`;
}
function Nt(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function Qe(t, e, i = !1) {
  const n = Nt(e);
  return new Intl.DateTimeFormat(le, {
    hour: n ? "numeric" : "2-digit",
    minute: "2-digit",
    second: i ? "2-digit" : void 0,
    hourCycle: n ? "h12" : "h23"
  }).format(t);
}
function Ut(t, e) {
  return `${new Intl.DateTimeFormat(le, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${Qe(t, e, !0)}`;
}
function Dt(t, e) {
  const i = Math.max(0, Math.round((e - t) / 1e3));
  if (i < 45) return "just now";
  const n = Math.round(i / 60);
  if (n < 60) return `${n} min ago`;
  const s = Math.round(n / 60);
  return s < 24 ? `${s} h ago` : `${Math.round(s / 24)} d ago`;
}
function Ht(t, e) {
  const i = Math.round((Se(e) - Se(t)) / 864e5);
  if (i === 0) return "Today";
  if (i === 1) return "Yesterday";
  const n = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(le, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: n ? void 0 : "numeric"
  }).format(t);
}
function jt(t, e, i, n) {
  const s = {
    type: "logbook/event_stream",
    start_time: i.toISOString()
  };
  return n && n.length > 0 && (s.entity_ids = n), t.connection.subscribeMessage(
    (r) => e(r.events ?? []),
    s
  );
}
const zt = 10, Lt = 1e4, Wt = 3;
function ue(t, e) {
  return t.length > e ? `${t.slice(0, e - 1).trimEnd()}…` : t;
}
function Ee(t) {
  return t.entityId ?? t.name;
}
function Bt(t, e) {
  if (e === "show") return t;
  const i = /* @__PURE__ */ new Map();
  for (const o of t) {
    if (o.rich) continue;
    const a = Ee(o), c = i.get(a);
    c ? c.push(o) : i.set(a, [o]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const [o, a] of i) {
    if (a.length < zt) continue;
    (a[0].when - a[a.length - 1].when) / 36e5 <= a.length && n.add(o);
  }
  if (n.size === 0) return t;
  const s = [], r = /* @__PURE__ */ new Set();
  for (const o of t) {
    const a = Ee(o);
    if (o.rich || !n.has(a)) {
      s.push(o);
      continue;
    }
    if (r.has(a) || e === "hide") continue;
    r.add(a);
    const c = i.get(a).length;
    s.push({
      ...o,
      key: `chatty|${a}`,
      verb: o.isRun ? `was triggered ${c} times` : `changed ${c} times`,
      details: o.isRun ? void 0 : [`latest: ${ue(o.verb, 70)}`],
      isRun: !1,
      count: 1,
      rich: !0
    });
  }
  return s;
}
const Vt = {
  update: "updates",
  light: "lights",
  switch: "switches",
  binary_sensor: "sensors",
  sensor: "sensors",
  cover: "covers",
  fan: "fans",
  lock: "locks",
  climate: "thermostats",
  media_player: "media players",
  input_boolean: "toggles",
  automation: "automations",
  script: "scripts",
  button: "buttons",
  number: "numbers",
  select: "selects"
};
function Ft(t) {
  return Vt[t] ?? `${t.replace(/_/g, " ")} entities`;
}
function Kt(t) {
  return t.startsWith("was ") ? `were ${t.slice(4)}` : t.startsWith("is ") ? `are ${t.slice(3)}` : t;
}
function Yt(t, e) {
  return (t.cause?.actor?.name ?? "") === (e.cause?.actor?.name ?? "") && (t.cause?.trigger ?? "") === (e.cause?.trigger ?? "");
}
function qt(t) {
  const e = /* @__PURE__ */ new Map(), i = [];
  for (const s of t) {
    if (s.rich || !s.entityId) continue;
    const r = `${s.domain}|${s.verb}|${s.tone}`, o = e.get(r);
    if (o && o.oldest - s.when <= Lt)
      o.members.push(s), o.oldest = s.when;
    else {
      const a = { members: [s], oldest: s.when };
      e.set(r, a), i.push(a);
    }
  }
  const n = /* @__PURE__ */ new Map();
  for (const { members: s } of i) {
    const r = new Set(s.map((l) => l.entityId));
    if (r.size < Wt) continue;
    const o = s[0], a = [...new Set(s.map((l) => l.name))], c = a.slice(0, 6).join(", ");
    n.set(o, {
      ...o,
      key: `burst|${o.key}`,
      entityId: void 0,
      name: `${r.size} ${Ft(o.domain)}`,
      verb: Kt(o.verb),
      details: [a.length > 6 ? `${c} and ${a.length - 6} more` : c],
      cause: s.every((l) => Yt(l, o)) ? o.cause : void 0,
      count: 1,
      stateValue: void 0,
      rich: !0
    });
    for (const l of s.slice(1)) n.set(l, null);
  }
  return n.size === 0 ? t : t.flatMap((s) => {
    if (!n.has(s)) return [s];
    const r = n.get(s);
    return r ? [r] : [];
  });
}
const Gt = 200;
function te(t) {
  return typeof t == "string" ? t.split(",").map((e) => e.trim()) : Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
}
function Ce(t) {
  return typeof t == "string" && t.trim() ? ue(t.trim(), Gt) : void 0;
}
function Jt(t) {
  const e = [];
  for (const [i, n] of Object.entries(t.trace ?? {}))
    if (!(!i.startsWith("action/") && !i.startsWith("sequence/")))
      for (const s of n) {
        const r = s.result?.params;
        if (!r?.domain || !r.service) continue;
        const o = r.service_data ?? {}, a = Ce(o.message);
        if (!a) continue;
        const c = `${r.domain}.${r.service}`;
        if (r.domain === "tts") {
          const l = [
            ...te(o.media_player_entity_id),
            ...te(o.entity_id),
            ...te(r.target?.entity_id)
          ].filter((h) => h.startsWith("media_player."));
          e.push({ kind: "say", text: a, speakers: [...new Set(l)], service: c });
        } else (r.domain === "notify" || r.domain === "persistent_notification") && e.push({
          kind: "notify",
          text: a,
          title: Ce(o.title),
          speakers: [],
          service: c
        });
      }
  return e;
}
function ie(t, e, i, n = 5e3) {
  let s, r = 1 / 0;
  for (const o of t) {
    const a = Date.parse(o.timestamp.start);
    if (Number.isNaN(a) || a > e + n || e - a > i) continue;
    const c = Math.abs(e - a);
    c < r && (s = o, r = c);
  }
  return s;
}
const Zt = 45e3, Xt = 6e4;
class Qt {
  constructor(e) {
    this.hass = e, this.lists = /* @__PURE__ */ new Map(), this.details = /* @__PURE__ */ new Map(), this.tried = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  setHass(e) {
    this.hass = e;
  }
  item(e) {
    const [i, n] = e.split(".");
    if (i === "script") return { domain: i, itemId: n };
    if (i === "automation") {
      const s = this.hass.states[e]?.attributes.id;
      return typeof s == "string" || typeof s == "number" ? { domain: i, itemId: String(s) } : void 0;
    }
  }
  /** The trace of the run behind something that happened at `whenMs`, if it is already loaded. */
  lookup(e, i, n) {
    const s = this.item(e), r = s && this.lists.get(`${s.domain}|${s.itemId}`), o = r && ie(r.runs, i, n);
    return s && o ? this.details.get(`${s.domain}|${s.itemId}|${o.run_id}`) : void 0;
  }
  /** Load what `lookup` needs. Resolves when done; failures (no admin rights, no trace) are quiet. */
  ensure(e, i, n) {
    const s = this.item(e);
    if (!s) return;
    const r = `${s.domain}|${s.itemId}`, o = this.lists.get(r), a = o && ie(o.runs, i, n);
    if (a && this.details.has(`${r}|${a.run_id}`)) return;
    const c = `${r}|${a?.run_id ?? Math.floor(i / 6e4)}`, l = this.tried.get(c);
    if (l && Date.now() - l < Xt) return;
    const h = this.inflight.get(c);
    if (h) return h;
    const u = (async () => {
      this.tried.set(c, Date.now());
      try {
        let g = this.lists.get(r);
        if (!g || Date.now() - g.at > Zt) {
          const m = await this.hass.callWS({
            type: "trace/list",
            domain: s.domain,
            item_id: s.itemId
          });
          g = { at: Date.now(), runs: Array.isArray(m) ? m : [] }, this.lists.set(r, g);
        }
        const d = ie(g.runs, i, n);
        if (d && !this.details.has(`${r}|${d.run_id}`)) {
          const m = await this.hass.callWS({
            type: "trace/get",
            domain: s.domain,
            item_id: s.itemId,
            run_id: d.run_id
          });
          this.details.set(`${r}|${d.run_id}`, m);
        }
      } catch {
      } finally {
        this.inflight.delete(c);
      }
    })();
    return this.inflight.set(c, u), u;
  }
}
const ei = "mdi:information-outline", et = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function ti(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : ei);
}
function M(t, e, i, n, s) {
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
const Ie = "var(--error-color)", ii = "tapo_rv30", Te = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice"
}, ni = {
  cleaning: "start",
  docked: "finish"
}, si = 10 * 60 * 1e3, ri = /* @__PURE__ */ new Set(["start", "done", "override", "return", "docked", "skip", "error"]), tt = 300;
function oi(t) {
  return Object.values(t.entities ?? {}).filter((e) => e.platform === ii && e.entity_id.startsWith("vacuum.")).map((e) => e.entity_id);
}
function Oe(t) {
  const e = t.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  return e ? { byUser: e[1] === "You started", names: e[2], why: e[3]?.replace(/\.$/, "") } : { byUser: t.startsWith("You") };
}
function ai(t, e, i) {
  let n;
  for (const s of t) {
    if (s.kind !== "start" || i.has(s)) continue;
    const r = Math.abs(s.ts - e);
    r <= tt && (!n || r < Math.abs(n.ts - e)) && (n = s);
  }
  return n;
}
function ci(t) {
  const e = t.match(/^(.+?) came home: (.*?)\.?$/s);
  return e ? { people: e[1], note: e[2] } : void 0;
}
function di(t, e) {
  const i = e.split(/, | and /).map((s) => s.trim()), n = i.length === 1 ? Object.values(t.states).find(
    (s) => s.entity_id.startsWith("person.") && s.attributes.friendly_name === i[0]
  ) : void 0;
  return {
    kind: "user",
    name: e,
    entityId: n?.entity_id,
    picture: n?.attributes.entity_picture
  };
}
function Me() {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}
function Re(t) {
  return { kind: "user", name: t.user?.name ?? "You" };
}
function li(t) {
  const e = [];
  return t.minutes != null && e.push(`${t.minutes} min`), t.area != null && e.push(`${t.area} m²`), t.emptied_bin && e.push("bin emptied"), e;
}
function ui(t, e, i) {
  const s = t.states[e.entityId]?.attributes.friendly_name ?? e.entityId, r = i.state_color ?? !0, o = [], a = /* @__PURE__ */ new Set(), c = {
    entityId: e.entityId,
    domain: "vacuum",
    name: s,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    fixedIcon: !0
  };
  for (const d of e.runs) {
    const m = ai(e.log, d.started, a);
    m && a.add(m);
    const b = m ? Oe(m.text) : void 0, w = !!d.error;
    let $;
    m && b ? $ = { actor: b.byUser ? Re(t) : Me(), trigger: b.why } : d.start_type != null && Te[d.start_type] && ($ = {
      actor: { kind: "other", name: Te[d.start_type], icon: "mdi:gesture-tap" }
    }), o.push({
      ...c,
      key: `vac|${e.entityId}|start|${d.started}`,
      when: d.started * 1e3,
      verb: b?.names ? `started cleaning ${b.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: d.rule_name ? [`preset “${d.rule_name}”`] : void 0,
      cause: $,
      accent: M("vacuum", void 0, "cleaning", "active", r)
    });
    const S = (d.started + (d.minutes ?? 0) * 60) * 1e3;
    o.push({
      ...c,
      key: `vac|${e.entityId}|finish|${d.started}`,
      when: Math.max(S, d.started * 1e3 + 1e3),
      verb: w ? `stopped with error ${d.error}` : b?.names ? `finished cleaning ${b.names}` : "finished cleaning",
      tone: w ? "alert" : "inactive",
      phase: "finish",
      icon: w ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: li(d),
      accent: w ? Ie : M("vacuum", void 0, "docked", "inactive", r)
    });
  }
  const l = e.log.filter((d) => d.kind === "return"), h = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
  for (const d of e.log.filter((m) => m.kind === "docked")) {
    const m = l.find(
      (b) => !u.has(b) && b.ts <= d.ts && d.ts - b.ts <= 1800
    );
    m && (h.set(d, m), u.add(m));
  }
  const g = new Set(e.runs.map((d) => d.started));
  for (const d of e.log) {
    if (!ri.has(d.kind) || a.has(d) || d.kind === "done" && e.runs.length > 0 || d.kind === "start" && [...g].some((S) => Math.abs(S - d.ts) <= tt) || u.has(d)) continue;
    const m = d.kind === "start" ? Oe(d.text) : void 0, b = d.kind === "docked" ? h.get(d) : void 0, w = b ? ci(b.text) : void 0;
    if (w) {
      o.push({
        ...c,
        key: `vac|${e.entityId}|log|${d.ts}|docked`,
        when: d.ts * 1e3,
        verb: "was sent home",
        tone: "neutral",
        icon: "mdi:robot-vacuum",
        details: [w.note.charAt(0).toUpperCase() + w.note.slice(1)],
        cause: { actor: di(t, w.people), trigger: "coming home" },
        accent: M("vacuum", void 0, "docked", "inactive", r)
      });
      continue;
    }
    const $ = d.kind === "error" ? "alert" : d.kind === "start" ? "active" : "neutral";
    o.push({
      ...c,
      key: `vac|${e.entityId}|log|${d.ts}|${d.kind}`,
      when: d.ts * 1e3,
      verb: m?.names ? `started cleaning ${m.names}` : "",
      text: m?.names ? void 0 : d.text.replace(/\.$/, ""),
      tone: $,
      phase: d.kind === "start" ? "start" : d.kind === "done" ? "finish" : void 0,
      icon: d.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      cause: { actor: m?.byUser ? Re(t) : Me(), trigger: m?.why },
      accent: $ === "alert" ? Ie : M(
        "vacuum",
        void 0,
        "cleaning",
        $ === "active" ? "active" : "neutral",
        r
      )
    });
  }
  return o;
}
const hi = We`
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
function O(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function pi(t) {
  return t ? Object.values(t).some((e) => O(e).length > 0) : !1;
}
function mi(t, e) {
  const i = /* @__PURE__ */ new Set(), n = t.entities ?? {}, s = t.devices ?? {}, r = t.areas ?? {}, o = new Set(O(e.area_id));
  for (const l of O(e.floor_id))
    for (const h of Object.values(r))
      h.floor_id === l && o.add(h.area_id);
  const a = new Set(O(e.device_id)), c = new Set(O(e.label_id));
  for (const l of O(e.entity_id)) i.add(l);
  for (const l of Object.values(n)) {
    const h = l.device_id ? s[l.device_id] : void 0, u = l.area_id ?? h?.area_id ?? void 0;
    u && o.has(u) && i.add(l.entity_id), l.device_id && a.has(l.device_id) && i.add(l.entity_id), l.labels?.some((g) => c.has(g)) && i.add(l.entity_id), h?.labels?.some((g) => c.has(g)) && i.add(l.entity_id);
  }
  return i;
}
const fi = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function it(t, e) {
  return e.replace(fi, (i) => t.states[i]?.attributes.friendly_name ?? i);
}
function _i(t, e) {
  for (const [i, n] of Object.entries(t.states))
    if (i.startsWith("person.") && n.attributes.user_id === e)
      return {
        entityId: i,
        name: n.attributes.friendly_name ?? i,
        picture: n.attributes.entity_picture
      };
}
function nt(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function gi(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function st(t) {
  return t.replace(/event 'automation_triggered'/g, "another automation");
}
function vi(t, e) {
  let i = e.context_source;
  return !i && e.context_message?.startsWith("triggered by ") && (i = e.context_message.slice(13)), i ? st(it(t, i)) : void 0;
}
function bi(t, e) {
  const i = _i(t, e);
  return i ? { kind: "user", name: i.name, entityId: i.entityId, picture: i.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function Pe(t, e, i) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? i ?? e ?? "Unknown";
}
function yi(t, e) {
  const i = e.context_event_type;
  if (i === "automation_triggered" || i === "script_started")
    return {
      actor: {
        kind: i === "automation_triggered" ? "automation" : "script",
        name: Pe(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: vi(t, e),
      triggerEntityId: nt(gi(e))
    };
  if (e.context_user_id) {
    const n = bi(t, e.context_user_id);
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
      name: Pe(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function wi(t, e) {
  const i = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return i ? st(it(t, i)) : void 0;
}
const $i = 9e4;
function xi(t, e) {
  return e.map((i) => t.states[i]?.attributes.friendly_name ?? i).join(", ");
}
function Ai(t, e, i, n, s, r) {
  const o = n.kind === "say";
  return {
    key: `action|${e.key}|${s}`,
    when: e.when,
    entityId: o ? n.speakers[0] : void 0,
    domain: o ? "media_player" : "notify",
    name: o ? n.speakers.length ? xi(t, n.speakers) : "Speaker" : "Notification",
    verb: o ? `said “${n.text}”` : `sent “${n.title ? `${n.title}: ` : ""}${n.text}”`,
    tone: "active",
    icon: o ? "mdi:bullhorn" : "mdi:bell-ring",
    fixedIcon: !0,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    cause: {
      actor: i,
      trigger: e.cause?.trigger,
      triggerEntityId: e.cause?.triggerEntityId
    },
    accent: M("media_player", void 0, "playing", "active", r)
  };
}
function ki(t, e, i, n, s) {
  const r = /* @__PURE__ */ new Set(), o = [];
  for (const a of e) {
    if (!a.isRun || a.rich || (i !== "all" && r.add(a), i === "none" || !s)) continue;
    const c = s(a) ?? [], l = a.domain === "script" ? "script" : "automation", h = {
      kind: l,
      name: a.name,
      entityId: a.entityId,
      icon: et[l]
    };
    c.forEach((u, g) => {
      o.push(Ai(t, a, h, u, g, n));
      for (const d of e)
        d !== a && d.entityId && u.speakers.includes(d.entityId) && d.cause?.actor?.entityId === a.entityId && Math.abs(d.when - a.when) <= $i && r.add(d);
    });
  }
  return [...e.filter((a) => !r.has(a)), ...o];
}
const Si = /* @__PURE__ */ new Set([
  "light",
  "switch",
  "fan",
  "cover",
  "lock",
  "climate",
  "humidifier",
  "water_heater",
  "valve",
  "siren",
  "alarm_control_panel",
  "media_player",
  "vacuum",
  "lawn_mower",
  "person",
  "device_tracker",
  "scene",
  "input_boolean",
  "button",
  "input_button",
  "doorbell",
  "event",
  "timer",
  "remote",
  "group",
  "binary_sensor",
  "automation",
  "script",
  "homeassistant"
]), Ei = /* @__PURE__ */ new Set([
  "door",
  "garage_door",
  "opening",
  "window",
  "lock",
  "motion",
  "moving",
  "occupancy",
  "presence",
  "smoke",
  "gas",
  "carbon_monoxide",
  "moisture",
  "problem",
  "safety",
  "tamper",
  "vibration",
  "sound",
  "plug"
]);
function Ci(t) {
  const e = t.domain ?? t.entity_id?.split(".")[0];
  return (e === "automation" || e === "script") && t.state === void 0 && t.message !== void 0;
}
function Ii(t, e, i) {
  const n = t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant", s = [e.target?.entity_id ?? []].flat();
  if (t.entity_id && s.includes(t.entity_id) || e.include_domains?.length || Ci(t)) return !0;
  if (!Si.has(n)) return !1;
  if (n === "binary_sensor" && t.entity_id) {
    const r = i?.states[t.entity_id]?.attributes.device_class;
    return !r || Ei.has(r);
  }
  return !0;
}
const Ne = {
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
}, Ti = {
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
}, Oi = /* @__PURE__ */ new Set([
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
]), Mi = /* @__PURE__ */ new Set(["person", "device_tracker"]), Ri = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function he(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Pi(t, e, i) {
  const n = t.states[e];
  if (n && t.formatEntityState)
    try {
      const o = t.formatEntityState({ ...n, state: i }, i);
      if (o) return o;
    } catch {
    }
  const s = n?.attributes.unit_of_measurement;
  return i !== "" && !Number.isNaN(Number(i)) ? s ? `${i} ${s}` : i : he(i);
}
function Ni(t, e) {
  return Object.values(t.states).find(
    (n) => n.entity_id.startsWith("zone.") && (n.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? he(e);
}
function Ui(t, e, i, n) {
  if (n === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (n === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (i ? t.states[i] : void 0)?.attributes.device_class;
  if (Mi.has(e))
    return n === "home" ? { verb: "arrived home", tone: "active" } : n === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${Ni(t, n)}`, tone: "active" };
  if (e === "binary_sensor" && r && Ne[r]) {
    const [c, l, h, u] = Ne[r];
    if (n === "on") return { verb: c, tone: h ?? "active" };
    if (n === "off") return { verb: l, tone: u ?? "inactive" };
  }
  const o = Ti[e]?.[n];
  if (o) return { verb: o[0], tone: o[1] };
  if (Ri.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && n === "off") return { verb: "was turned off", tone: "inactive" };
  if (Oi.has(e) || n === "on" || n === "off") {
    if (n === "on") return { verb: "was turned on", tone: "active" };
    if (n === "off") return { verb: "was turned off", tone: "inactive" };
  }
  const a = i ? Pi(t, i, n) : he(n);
  return { verb: `changed to ${ue(a, 80)}`, tone: "neutral" };
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
  vacuum_details: !0,
  hide_unavailable: !0,
  activity: "meaningful",
  automation_runs: "actions",
  show_actions: !0,
  chatty: "summarize",
  show_diagnostic: !1,
  collapse_repeats: !0
}, R = { hours: [1, 720], entries: [1, 500] }, Ue = 60 * 1e3, Di = 10 * 60 * 1e3, De = 5 * 60 * 1e3;
function rt(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function ot(t, [e, i], n) {
  const s = typeof t == "number" ? t : Number(t);
  return Number.isFinite(s) ? Math.min(i, Math.max(e, Math.round(s))) : n;
}
function ne(t) {
  return ot(t.hours_to_show, R.hours, v.hours_to_show);
}
function Hi(t) {
  return ot(t.max_entries, R.entries, v.max_entries);
}
function at(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function ct(t, e, i, n) {
  const s = at(t);
  if (n && t.entity_id && !(e.show_diagnostic ?? v.show_diagnostic)) {
    const o = n.entities?.[t.entity_id], a = [e.target?.entity_id ?? []].flat().includes(t.entity_id);
    if (o && (o.entity_category || o.hidden) && !a) return !1;
  }
  return !(i && (!t.entity_id || !i.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(s) || e.exclude_domains?.includes(s) || (e.activity ?? v.activity) === "meaningful" && !Ii(t, e, n) || (e.hide_unavailable ?? v.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function ji(t, e, i) {
  const n = at(e), s = e.entity_id ? t.states[e.entity_id] : void 0, r = e.name ?? s?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let o, a = "neutral", c = yi(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: o, tone: a } = Ui(t, n, e.entity_id, e.state));
  else {
    const d = e.message ?? "did something";
    if (d.match(/^triggered(?: by (.+))?$/)) {
      o = "was triggered", a = "active";
      const b = wi(t, e);
      if (b) {
        const w = e.source ?? d.replace(/^triggered by /, "");
        c = { ...c, trigger: b, triggerEntityId: nt(w) };
      }
    } else
      o = d, a = /(error|fail)/i.test(d) ? "alert" : "neutral";
  }
  const l = c?.actor;
  l && !l.icon && (l.icon = et[l.kind]);
  const h = n === "person", u = h ? s?.attributes.entity_picture : void 0, g = i.state_color ?? v.state_color;
  return {
    key: rt(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: n,
    name: r,
    verb: o,
    tone: a,
    icon: ti(n, e.icon),
    stateValue: e.state,
    picture: u,
    isPerson: h,
    isRun: e.state === void 0 && e.message !== void 0 && /^triggered/.test(e.message),
    cause: c,
    count: 1,
    accent: M(n, s?.attributes.device_class, e.state, a, g)
  };
}
function He(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function zi(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const i = ni[t.state ?? ""];
  return i ? e.items.some(
    (n) => n.entityId === t.entity_id && n.phase === i && Math.abs(n.when - t.when * 1e3) <= si
  ) : !1;
}
function Li(t, e = !0) {
  const i = /* @__PURE__ */ new Set();
  for (const n of t) {
    const s = n.cause?.actor;
    if (!s?.entityId || s.kind !== "automation" && s.kind !== "script") continue;
    for (const a of t)
      e && a.isRun && a.entityId === s.entityId && Math.abs(a.when - n.when) <= Ue && i.add(a);
    const r = n.cause?.triggerEntityId;
    if (!r) continue;
    const o = t.find(
      (a) => a !== n && !a.isRun && a.entityId === r && a.when <= n.when + 5e3 && n.when - a.when <= Ue
    );
    o && (i.add(o), n.cause = { ...n.cause, trigger: `${o.name} ${o.verb}` });
  }
  return t.filter((n) => !i.has(n));
}
function Wi(t, e, i, n, s, r, o) {
  const a = n - ne(i) * 36e5, c = Hi(i), l = i.collapse_repeats ?? v.collapse_repeats, h = (r?.items ?? []).filter(
    (f) => f.when >= a && f.when <= n + De
  ), u = r ? { items: h, vacuums: r.vacuums } : void 0, g = [...e].filter((f) => {
    const y = f.when * 1e3;
    return y >= a && y <= n + De;
  }).filter((f) => ct(f, i, s, t)).filter((f) => !zi(f, u)).sort((f, y) => y.when - f.when), d = i.automation_runs ?? v.automation_runs, m = ki(
    t,
    [...g.map((f) => ji(t, f, i)), ...h],
    d,
    i.state_color ?? v.state_color,
    i.show_actions === !1 ? void 0 : o
  ).sort((f, y) => y.when - f.when), b = Li(m, d !== "all"), w = qt(Bt(b, i.chatty ?? v.chatty)), $ = [];
  let S = 0;
  for (const f of w) {
    const y = $[$.length - 1];
    if (l && y && !f.rich && !y.rich && f.entityId && y.entityId === f.entityId && y.verb === f.verb && He(y) === He(f) && S - f.when <= Di) {
      y.count += 1, S = f.when;
      continue;
    }
    if ($.push(f), S = f.when, $.length > c) break;
  }
  const me = $.slice(0, c);
  (i.order ?? v.order) === "oldest_first" && me.reverse();
  const K = [];
  for (const f of me) {
    const y = Pt(f.when);
    let j = K[K.length - 1];
    (!j || j.key !== y) && (j = { key: y, label: Ht(f.when, n), items: [] }, K.push(j)), j.items.push(f);
  }
  return K;
}
function Bi(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const i = t.cause;
  return i?.actor && (e += ` by ${i.actor.name}`), i?.trigger && (e += `, triggered by ${i.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), e;
}
var Vi = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, H = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Fi(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Vi(e, i, s), s;
};
const je = 3e3, Ki = 6e4;
let k = class extends P {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._traceBudget = 0, this._registryRefs = [], this._resolveRun = (t) => {
      const e = this._hass;
      if (!e || !t.entityId) return;
      const i = this._traces ??= new Qt(e), n = i.lookup(t.entityId, t.when, 15e3);
      if (n) return Jt(n);
      this._traceBudget-- > 0 && i.ensure(t.entityId, t.when, 15e3)?.then(() => this._scheduleRecompute());
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => nn), document.createElement("what-happened-card-editor");
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
    this._hass = t, this._traces?.setHass(t);
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
      this._now = Date.now(), this._refreshHistories(), this._recompute();
    }, Ki), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    const i = e.vacuum_details === !1 ? [] : oi(t).filter((r) => this._vacuumVisible(r, e)), n = JSON.stringify([...i].sort());
    if (n === this._vacKey) return;
    this._vacKey = n, this._unsubscribeVacuums(), this._vacuums.clear();
    const s = this._vacToken;
    for (const r of i) {
      const o = { entityId: r, log: [], runs: [] };
      this._vacuums.set(r, o), t.connection.subscribeMessage(
        (a) => {
          s === this._vacToken && (o.log = a.log ?? [], this._refreshHistory(o), this._scheduleRecompute());
        },
        { type: "tapo_rv30/planner/subscribe", entity_id: r }
      ).then((a) => {
        s !== this._vacToken ? a() : this._vacUnsubs.push(a);
      }).catch(() => {
      }), this._refreshHistory(o);
    }
  }
  _refreshHistory(t) {
    const e = this._hass;
    if (!e) return;
    const i = this._vacToken;
    e.callWS({ type: "tapo_rv30/history/list", entity_id: t.entityId }).then((n) => {
      i === this._vacToken && (t.runs = (n.runs ?? []).filter((s) => s.started), this._scheduleRecompute());
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
    pi(e.target) && (i = mi(t, e.target));
    const n = ne(e), s = JSON.stringify([n, i ? [...i].sort() : null]);
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
    jt(
      t,
      (a) => {
        if (r !== this._subToken) return;
        const c = this._config;
        for (const l of a)
          c && !ct(l, c, this._allowed, this._hass) || this._entries.set(rt(l), l);
        this._entries.size > je && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
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
    this._entries = new Map(t.slice(0, je));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    if (!this._hass || !this._config) return;
    this._now = Date.now(), this._traceBudget = 40;
    const t = Wi(
      this._hass,
      this._entries.values(),
      this._config,
      this._now,
      this._allowed,
      this._extraItems(),
      this._resolveRun
    );
    this._groups = t;
  }
  _extraItems() {
    const t = this._hass, e = this._config, i = /* @__PURE__ */ new Set(), n = [];
    if (t && e)
      for (const s of this._vacuums.values())
        !s.log.length && !s.runs.length || (i.add(s.entityId), n.push(...ui(t, s, e)));
    return { items: n, vacuums: i };
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
    if (!t) return p;
    const e = this._groups.reduce((s, r) => s + r.items.length, 0), i = this._groups[this._groups.length - 1], n = i?.items[i.items.length - 1]?.key;
    return _`
      <ha-card
        class=${Y({
      compact: t.compact ?? v.compact,
      "has-header": !!t.title
    })}
        style=${ee({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? _`<h1 class="card-header">${t.title}</h1>` : p}
        <div class="scroll">
          ${this._error ? _`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? _`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : _`<ol>
                      ${this._groups.map((s) => this._renderGroup(s, t, n))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = ne(t), i = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, n = e === 1 ? "No activity in the last hour" : `No activity in the last ${i}`;
    return _`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${n}
    </div>`;
  }
  _renderGroup(t, e, i) {
    const n = e.show_day_headers ?? v.show_day_headers;
    return _`
      ${n ? _`<li class="day" role="presentation">${t.label}</li>` : p}
      ${t.items.map((s) => this._renderItem(s, e, s.key === i))}
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
    const n = e.show_avatars ?? v.show_avatars, s = e.show_cause ?? v.show_cause, r = !!t.entityId && (e.tap_action ?? v.tap_action) !== "none", o = n && t.picture;
    return _`
      <li class=${Y({ item: !0, last: i })}>
        <div class="rail">
          <div
            class=${Y({ node: !0, photo: !!o })}
            style=${ee({ "--accent": t.accent })}
          >
            ${o ? _`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${Y({ row: !0, clickable: r })}
          style=${ee({ "--accent": t.accent })}
          role=${r ? "button" : "text"}
          tabindex=${r ? "0" : "-1"}
          aria-label=${Bi(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : _`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? _`<span class="count">×${t.count}</span>` : p}
            </div>
            ${t.details?.length ? _`<div class="secondary">${t.details.join(" · ")}</div>` : p}
            ${s ? this._renderCause(t, n) : p}
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
    const n = i.actor, s = !!n?.entityId && (this._config?.tap_action ?? v.tap_action) !== "none";
    return _`
      <div class="secondary">
        ${n ? _`by${e && n.kind === "user" ? this._renderAvatar(n) : p}
              ${s ? _`<button
                      class="link"
                      type="button"
                      title=${n.detail ? `${n.name} – ${n.detail}` : n.name}
                      @click=${(r) => {
      r.stopPropagation(), this._moreInfo(n.entityId);
    }}
                      @keydown=${(r) => r.stopPropagation()}
                    >
                      ${n.name}
                    </button>` : _`<span title=${n.detail ?? n.name}>${n.name}</span>`}` : p}${n && i.trigger ? ", " : p}${i.trigger ? _`${n ? "triggered by" : "by"} ${i.trigger}` : p}
      </div>
    `;
  }
  _renderTime(t, e) {
    const i = e.time_display ?? v.time_display, n = Qe(t.when, this._hass), s = Dt(t.when, this._now);
    return _`
      <div class="time" title=${Ut(t.when, this._hass)}>
        ${i !== "relative" ? _`<span class="abs">${n}</span>` : p}
        ${i !== "absolute" ? _`<span class="rel">${s}</span>` : p}
      </div>
    `;
  }
};
k.styles = hi;
H([
  D()
], k.prototype, "_config", 2);
H([
  D()
], k.prototype, "_groups", 2);
H([
  D()
], k.prototype, "_loading", 2);
H([
  D()
], k.prototype, "_error", 2);
H([
  D()
], k.prototype, "_now", 2);
k = H([
  Ye("what-happened-card")
], k);
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
var Yi = Object.defineProperty, qi = Object.getOwnPropertyDescriptor, pe = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? qi(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Yi(e, i, s), s;
};
const ze = [
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
].map((t) => ({ value: t, label: t })), Gi = {
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
  activity: "What to show",
  automation_runs: "Automation and script runs",
  show_actions: "Show what automations said or sent (needs an admin user)",
  chatty: "Very frequent entities",
  show_diagnostic: "Include diagnostic, configuration and hidden entities",
  hide_unavailable: "Hide unavailable / unknown states",
  collapse_repeats: "Merge rapid repeats of the same event"
}, Ji = {
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  activity: "Recommended hides clocks, text and number sensors and update entities.",
  automation_runs: "Most runs are plumbing. By default only what a run said on a speaker or sent as a notification is shown, as its own entry.",
  chatty: "Entities with at least 10 entries at a pace of one per hour or faster, such as a clock sensor or an automation that runs every 15 minutes.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, Zi = [
  { name: "title", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "hours_to_show",
        selector: {
          number: {
            min: R.hours[0],
            max: R.hours[1],
            step: 1,
            mode: "box",
            unit_of_measurement: "h"
          }
        }
      },
      {
        name: "max_entries",
        selector: {
          number: { min: R.entries[0], max: R.entries[1], step: 1, mode: "box" }
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
], Xi = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: ze }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: ze }
    }
  }
], Qi = [
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
], en = [
  {
    name: "activity",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "meaningful", label: "Things that happened (recommended)" },
          { value: "everything", label: "Everything, including sensors and clocks" }
        ]
      }
    }
  },
  {
    name: "automation_runs",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "actions", label: "Only what they said or sent (recommended)" },
          { value: "all", label: "Every run" },
          { value: "none", label: "Never" }
        ]
      }
    }
  },
  {
    name: "chatty",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "summarize", label: "Summarize in one entry" },
          { value: "hide", label: "Hide" },
          { value: "show", label: "Show every entry" }
        ]
      }
    }
  },
  { name: "show_actions", selector: { boolean: {} } },
  { name: "show_diagnostic", selector: { boolean: {} } },
  { name: "vacuum_details", selector: { boolean: {} } },
  { name: "hide_unavailable", selector: { boolean: {} } },
  { name: "collapse_repeats", selector: { boolean: {} } }
], tn = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: Xi },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: Qi },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: en }
];
let U = class extends P {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Gi[t.name] ?? t.name, this._computeHelper = (t) => Ji[t.name];
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
      ${this._form(Zi)}
      ${tn.map(
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
U.styles = We`
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
pe([
  qe({ attribute: !1 })
], U.prototype, "hass", 2);
pe([
  D()
], U.prototype, "_config", 2);
U = pe([
  Ye("what-happened-card-editor")
], U);
const nn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return U;
  }
}, Symbol.toStringTag, { value: "Module" }));
