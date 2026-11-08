/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, ce = J.ShadowRoot && (J.ShadyCSS === void 0 || J.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), ye = /* @__PURE__ */ new WeakMap();
let Ve = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ce && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = ye.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ye.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (t) => new Ve(typeof t == "string" ? t : t + "", void 0, de), Fe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new Ve(n, t, de);
}, vt = (t, e) => {
  if (ce) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = J.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, be = ce ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return gt(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yt, defineProperty: bt, getOwnPropertyDescriptor: wt, getOwnPropertyNames: $t, getOwnPropertySymbols: xt, getPrototypeOf: At } = Object, Q = globalThis, we = Q.trustedTypes, kt = we ? we.emptyScript : "", St = Q.reactiveElementPolyfillSupport, W = (t, e) => t, X = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? kt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, le = (t, e) => !yt(t, e), $e = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: le };
Symbol.metadata ??= Symbol("metadata"), Q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let C = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = $e) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && bt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: r } = wt(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      r?.call(this, o), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? $e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = At(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const n = this.properties, i = [...$t(n), ...xt(n)];
      for (const s of i) this.createProperty(s, n[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, s] of n) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const s = this._$Eu(n, i);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) n.unshift(be(s));
    } else e !== void 0 && n.push(be(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return vt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : X).toAttribute(n, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : X;
      this._$Em = s;
      const a = o.fromAttribute(n, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? le)(r, n) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: o } = r, a = this[s];
        o !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, r, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[W("elementProperties")] = /* @__PURE__ */ new Map(), C[W("finalized")] = /* @__PURE__ */ new Map(), St?.({ ReactiveElement: C }), (Q.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = globalThis, xe = (t) => t, Z = ue.trustedTypes, Ae = Z ? Z.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ke = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + x, Et = `<${Ye}>`, I = document, B = () => I.createComment(""), V = (t) => t === null || typeof t != "object" && typeof t != "function", he = Array.isArray, It = (t) => he(t) || typeof t?.[Symbol.iterator] == "function", ne = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ke = /-->/g, Se = />/g, S = RegExp(`>|${ne}(?:([^\\s"'>=/]+)(${ne}*=${ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, Ie = /"/g, qe = /^(?:script|style|textarea|title)$/i, Ct = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), g = Ct(1), A = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), E = I.createTreeWalker(I, 129);
function Ge(t, e) {
  if (!he(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ae !== void 0 ? Ae.createHTML(e) : e;
}
const Tt = (t, e) => {
  const n = t.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = L;
  for (let a = 0; a < n; a++) {
    const c = t[a];
    let d, p, h = -1, _ = 0;
    for (; _ < c.length && (o.lastIndex = _, p = o.exec(c), p !== null); ) _ = o.lastIndex, o === L ? p[1] === "!--" ? o = ke : p[1] !== void 0 ? o = Se : p[2] !== void 0 ? (qe.test(p[2]) && (s = RegExp("</" + p[2], "g")), o = S) : p[3] !== void 0 && (o = S) : o === S ? p[0] === ">" ? (o = s ?? L, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? S : p[3] === '"' ? Ie : Ee) : o === Ie || o === Ee ? o = S : o === ke || o === Se ? o = L : (o = S, s = void 0);
    const l = o === S && t[a + 1].startsWith("/>") ? " " : "";
    r += o === L ? c + Et : h >= 0 ? (i.push(d), c.slice(0, h) + Ke + c.slice(h) + x + l) : c + x + (h === -2 ? a : l);
  }
  return [Ge(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class F {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, c = this.parts, [d, p] = Tt(e, n);
    if (this.el = F.createElement(d, i), E.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = E.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ke)) {
          const _ = p[o++], l = s.getAttribute(h).split(x), m = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: r, name: m[2], strings: l, ctor: m[1] === "." ? Mt : m[1] === "?" ? Rt : m[1] === "@" ? Pt : ee }), s.removeAttribute(h);
        } else h.startsWith(x) && (c.push({ type: 6, index: r }), s.removeAttribute(h));
        if (qe.test(s.tagName)) {
          const h = s.textContent.split(x), _ = h.length - 1;
          if (_ > 0) {
            s.textContent = Z ? Z.emptyScript : "";
            for (let l = 0; l < _; l++) s.append(h[l], B()), E.nextNode(), c.push({ type: 2, index: ++r });
            s.append(h[_], B());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ye) c.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(x, h + 1)) !== -1; ) c.push({ type: 7, index: r }), h += x.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const i = I.createElement("template");
    return i.innerHTML = e, i;
  }
}
function P(t, e, n = t, i) {
  if (e === A) return e;
  let s = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const r = V(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = s : n._$Cl = s), s !== void 0 && (e = P(t, s._$AS(t, e.values), s, i)), e;
}
class Ot {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: i } = this._$AD, s = (e?.creationScope ?? I).importNode(n, !0);
    E.currentNode = s;
    let r = E.nextNode(), o = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let d;
        c.type === 2 ? d = new K(r, r.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (d = new Nt(r, this, e)), this._$AV.push(d), c = i[++a];
      }
      o !== c?.index && (r = E.nextNode(), o++);
    }
    return E.currentNode = I, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class K {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = P(this, e, n), V(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== A && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : It(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(I.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = F.createElement(Ge(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const r = new Ot(s, this), o = r.u(this.options);
      r.p(n), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let n = Ce.get(e.strings);
    return n === void 0 && Ce.set(e.strings, n = new F(e)), n;
  }
  k(e) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const r of e) s === n.length ? n.push(i = new K(this.O(B()), this.O(B()), this, this.options)) : i = n[s], i._$AI(r), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = xe(e).nextSibling;
      xe(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, n = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = P(this, e, n, 0), o = !V(e) || e !== this._$AH && e !== A, o && (this._$AH = e);
    else {
      const a = e;
      let c, d;
      for (e = r[0], c = 0; c < r.length - 1; c++) d = P(this, a[i + c], n, c), d === A && (d = this._$AH[c]), o ||= !V(d) || d !== this._$AH[c], d === f ? e = f : e !== f && (e += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Mt extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Rt extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class Pt extends ee {
  constructor(e, n, i, s, r) {
    super(e, n, i, s, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = P(this, e, n, 0) ?? f) === A) return;
    const i = this._$AH, s = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Nt {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const Ut = ue.litHtmlPolyfillSupport;
Ut?.(F, K), (ue.litHtmlVersions ??= []).push("3.3.3");
const Dt = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = n?.renderBefore ?? null;
    i._$litPart$ = s = new K(e.insertBefore(B(), r), r, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis;
let R = class extends C {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Dt(n, this.renderRoot, this.renderOptions);
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
R._$litElement$ = !0, R.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: R });
const Ht = pe.litElementPolyfillSupport;
Ht?.({ LitElement: R });
(pe.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: le }, zt = (t = jt, e, n) => {
  const { kind: i, metadata: s } = n;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(n.name, t), i === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, c, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = n;
    return function(a) {
      const c = this[o];
      e.call(this, a), this.requestUpdate(o, c, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Xe(t) {
  return (e, n) => typeof n == "object" ? zt(t, e, n) : ((i, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(t) {
  return Xe({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ze = { ATTRIBUTE: 1 }, Qe = (t) => (...e) => ({ _$litDirective$: t, values: e });
let et = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, i) {
    this._$Ct = e, this._$AM = n, this._$Ci = i;
  }
  _$AS(e, n) {
    return this.update(e, n);
  }
  update(e, n) {
    return this.render(...n);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = Qe(class extends et {
  constructor(t) {
    if (super(t), t.type !== Ze.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in e) e[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(e);
    }
    const n = t.element.classList;
    for (const i of this.st) i in e || (n.remove(i), this.st.delete(i));
    for (const i in e) {
      const s = !!e[i];
      s === this.st.has(i) || this.nt?.has(i) || (s ? (n.add(i), this.st.add(i)) : (n.remove(i), this.st.delete(i)));
    }
    return A;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = "important", Lt = " !" + tt, ie = Qe(class extends et {
  constructor(t) {
    if (super(t), t.type !== Ze.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, n) => {
      const i = t[n];
      return i == null ? e : e + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(t, [e]) {
    const { style: n } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const i of this.ft) e[i] == null && (this.ft.delete(i), i.includes("-") ? n.removeProperty(i) : n[i] = null);
    for (const i in e) {
      const s = e[i];
      if (s != null) {
        this.ft.add(i);
        const r = typeof s == "string" && s.endsWith(Lt);
        i.includes("-") || r ? n.setProperty(i, r ? s.slice(0, -11) : s, r ? tt : "") : n[i] = s;
      }
    }
    return A;
  }
}), me = "en-US";
function Te(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function Wt(t) {
  const e = new Date(t), n = (i) => String(i).padStart(2, "0");
  return `${e.getFullYear()}-${n(e.getMonth() + 1)}-${n(e.getDate())}`;
}
function Bt(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function nt(t, e, n = !1) {
  const i = Bt(e);
  return new Intl.DateTimeFormat(me, {
    hour: i ? "numeric" : "2-digit",
    minute: "2-digit",
    second: n ? "2-digit" : void 0,
    hourCycle: i ? "h12" : "h23"
  }).format(t);
}
function Vt(t, e) {
  return `${new Intl.DateTimeFormat(me, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${nt(t, e, !0)}`;
}
function Ft(t, e) {
  const n = Math.max(0, Math.round((e - t) / 1e3));
  if (n < 45) return "just now";
  const i = Math.round(n / 60);
  if (i < 60) return `${i} min ago`;
  const s = Math.round(i / 60);
  return s < 24 ? `${s} h ago` : `${Math.round(s / 24)} d ago`;
}
function Kt(t, e) {
  const n = Math.round((Te(e) - Te(t)) / 864e5);
  if (n === 0) return "Today";
  if (n === 1) return "Yesterday";
  const i = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(me, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: i ? void 0 : "numeric"
  }).format(t);
}
function Yt(t, e, n, i) {
  const s = {
    type: "logbook/event_stream",
    start_time: n.toISOString()
  };
  return i && i.length > 0 && (s.entity_ids = i), t.connection.subscribeMessage(
    (r) => e(r.events ?? []),
    s
  );
}
const qt = 10, Gt = 1e4, Jt = 3;
function fe(t, e) {
  return t.length > e ? `${t.slice(0, e - 1).trimEnd()}…` : t;
}
function Oe(t) {
  return t.entityId ?? t.name;
}
function Xt(t, e, n = /* @__PURE__ */ new Set()) {
  if (e === "show") return t;
  const i = /* @__PURE__ */ new Map();
  for (const a of t) {
    if (a.rich || a.entityId && n.has(a.entityId)) continue;
    const c = Oe(a), d = i.get(c);
    d ? d.push(a) : i.set(c, [a]);
  }
  const s = /* @__PURE__ */ new Set();
  for (const [a, c] of i) {
    if (c.length < qt) continue;
    (c[0].when - c[c.length - 1].when) / 36e5 <= c.length && s.add(a);
  }
  if (s.size === 0) return t;
  const r = [], o = /* @__PURE__ */ new Set();
  for (const a of t) {
    const c = Oe(a);
    if (a.rich || !s.has(c) || a.entityId && n.has(a.entityId)) {
      r.push(a);
      continue;
    }
    if (o.has(c) || e === "hide") continue;
    o.add(c);
    const d = i.get(c).length;
    r.push({
      ...a,
      key: `chatty|${c}`,
      verb: a.isRun ? `was triggered ${d} times` : `changed ${d} times`,
      details: a.isRun ? void 0 : [`latest: ${fe(a.verb, 70)}`],
      isRun: !1,
      count: 1,
      rich: !0
    });
  }
  return r;
}
const Zt = {
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
function Qt(t) {
  return Zt[t] ?? `${t.replace(/_/g, " ")} entities`;
}
function en(t) {
  return t.startsWith("was ") ? `were ${t.slice(4)}` : t.startsWith("is ") ? `are ${t.slice(3)}` : t;
}
function tn(t, e) {
  return (t.cause?.actor?.name ?? "") === (e.cause?.actor?.name ?? "") && (t.cause?.trigger ?? "") === (e.cause?.trigger ?? "");
}
function nn(t) {
  const e = /* @__PURE__ */ new Map(), n = [];
  for (const s of t) {
    if (s.rich || !s.entityId) continue;
    const r = `${s.domain}|${s.verb}|${s.tone}`, o = e.get(r);
    if (o && o.oldest - s.when <= Gt)
      o.members.push(s), o.oldest = s.when;
    else {
      const a = { members: [s], oldest: s.when };
      e.set(r, a), n.push(a);
    }
  }
  const i = /* @__PURE__ */ new Map();
  for (const { members: s } of n) {
    const r = new Set(s.map((d) => d.entityId));
    if (r.size < Jt) continue;
    const o = s[0], a = [...new Set(s.map((d) => d.name))], c = a.slice(0, 6).join(", ");
    i.set(o, {
      ...o,
      key: `burst|${o.key}`,
      entityId: void 0,
      name: `${r.size} ${Qt(o.domain)}`,
      verb: en(o.verb),
      details: [a.length > 6 ? `${c} and ${a.length - 6} more` : c],
      cause: s.every((d) => tn(d, o)) ? o.cause : void 0,
      count: 1,
      stateValue: void 0,
      rich: !0
    });
    for (const d of s.slice(1)) i.set(d, null);
  }
  return i.size === 0 ? t : t.flatMap((s) => {
    if (!i.has(s)) return [s];
    const r = i.get(s);
    return r ? [r] : [];
  });
}
const sn = 3e4;
function rn(t, e, n = /* @__PURE__ */ new Set()) {
  const i = /* @__PURE__ */ new Set();
  for (const s of e) {
    if (s.rich || !s.entityId) continue;
    const r = t.states[s.entityId]?.attributes.entity_id;
    if (!Array.isArray(r) || r.length === 0) continue;
    const o = new Set(r.filter((a) => typeof a == "string"));
    for (const a of e)
      a !== s && !a.rich && a.entityId && !n.has(a.entityId) && o.has(a.entityId) && a.verb === s.verb && Math.abs(a.when - s.when) <= sn && i.add(a);
  }
  return i.size ? e.filter((s) => !i.has(s)) : e;
}
const on = 200;
function se(t) {
  return typeof t == "string" ? t.split(",").map((e) => e.trim()) : Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
}
function Me(t) {
  return typeof t == "string" && t.trim() ? fe(t.trim(), on) : void 0;
}
function an(t) {
  const e = [];
  for (const [n, i] of Object.entries(t.trace ?? {}))
    if (!(!n.startsWith("action/") && !n.startsWith("sequence/")))
      for (const s of i) {
        const r = s.result?.params;
        if (!r?.domain || !r.service) continue;
        const o = r.service_data ?? {}, a = Me(o.message);
        if (!a) continue;
        const c = `${r.domain}.${r.service}`;
        if (r.domain === "tts") {
          const d = [
            ...se(o.media_player_entity_id),
            ...se(o.entity_id),
            ...se(r.target?.entity_id)
          ].filter((p) => p.startsWith("media_player."));
          e.push({ kind: "say", text: a, speakers: [...new Set(d)], service: c });
        } else (r.domain === "notify" || r.domain === "persistent_notification") && e.push({
          kind: "notify",
          text: a,
          title: Me(o.title),
          speakers: [],
          service: c
        });
      }
  return e;
}
function re(t, e, n, i = 5e3) {
  let s, r = 1 / 0;
  for (const o of t) {
    const a = Date.parse(o.timestamp.start);
    if (Number.isNaN(a) || a > e + i || e - a > n) continue;
    const c = Math.abs(e - a);
    c < r && (s = o, r = c);
  }
  return s;
}
const cn = 45e3, dn = 6e4;
class ln {
  constructor(e) {
    this.hass = e, this.lists = /* @__PURE__ */ new Map(), this.details = /* @__PURE__ */ new Map(), this.tried = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  setHass(e) {
    this.hass = e;
  }
  item(e) {
    const [n, i] = e.split(".");
    if (n === "script") return { domain: n, itemId: i };
    if (n === "automation") {
      const s = this.hass.states[e]?.attributes.id;
      return typeof s == "string" || typeof s == "number" ? { domain: n, itemId: String(s) } : void 0;
    }
  }
  /** The trace of the run behind something that happened at `whenMs`, if it is already loaded. */
  lookup(e, n, i) {
    const s = this.item(e), r = s && this.lists.get(`${s.domain}|${s.itemId}`), o = r && re(r.runs, n, i);
    return s && o ? this.details.get(`${s.domain}|${s.itemId}|${o.run_id}`) : void 0;
  }
  /** Load what `lookup` needs. Resolves when done; failures (no admin rights, no trace) are quiet. */
  ensure(e, n, i) {
    const s = this.item(e);
    if (!s) return;
    const r = `${s.domain}|${s.itemId}`, o = this.lists.get(r), a = o && re(o.runs, n, i);
    if (a && this.details.has(`${r}|${a.run_id}`)) return;
    const c = `${r}|${a?.run_id ?? Math.floor(n / 6e4)}`, d = this.tried.get(c);
    if (d && Date.now() - d < dn) return;
    const p = this.inflight.get(c);
    if (p) return p;
    const h = (async () => {
      this.tried.set(c, Date.now());
      try {
        let _ = this.lists.get(r);
        if (!_ || Date.now() - _.at > cn) {
          const m = await this.hass.callWS({
            type: "trace/list",
            domain: s.domain,
            item_id: s.itemId
          });
          _ = { at: Date.now(), runs: Array.isArray(m) ? m : [] }, this.lists.set(r, _);
        }
        const l = re(_.runs, n, i);
        if (l && !this.details.has(`${r}|${l.run_id}`)) {
          const m = await this.hass.callWS({
            type: "trace/get",
            domain: s.domain,
            item_id: s.itemId,
            run_id: l.run_id
          });
          this.details.set(`${r}|${l.run_id}`, m);
        }
      } catch {
      } finally {
        this.inflight.delete(c);
      }
    })();
    return this.inflight.set(c, h), h;
  }
}
const un = "mdi:information-outline", it = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function hn(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : un);
}
function O(t, e, n, i, s) {
  const r = "var(--state-icon-color, var(--primary-text-color))";
  if (!s) return i === "unavailable" ? "var(--state-unavailable-color)" : r;
  switch (i) {
    case "unavailable":
      return "var(--state-unavailable-color, var(--disabled-text-color))";
    case "alert":
      return "var(--error-color)";
    case "inactive":
      return `var(--state-${t}-inactive-color, var(--state-inactive-color, ${r}))`;
    case "active": {
      const o = `var(--state-${t}-active-color, var(--state-active-color, ${r}))`, a = n ? `var(--state-${t}-${n}-color, ${o})` : o;
      return e && n ? `var(--state-${t}-${e}-${n}-color, ${a})` : a;
    }
    default:
      return r;
  }
}
const Re = "var(--error-color)", pn = "tapo_rv30", Pe = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice"
}, mn = {
  cleaning: "start",
  docked: "finish"
}, fn = 10 * 60 * 1e3, _n = /* @__PURE__ */ new Set(["start", "done", "override", "return", "docked", "skip", "error"]), st = 300;
function gn(t) {
  return Object.values(t.entities ?? {}).filter((e) => e.platform === pn && e.entity_id.startsWith("vacuum.")).map((e) => e.entity_id);
}
function Ne(t) {
  const e = t.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  return e ? { byUser: e[1] === "You started", names: e[2], why: e[3]?.replace(/\.$/, "") } : { byUser: t.startsWith("You") };
}
function vn(t, e, n) {
  let i;
  for (const s of t) {
    if (s.kind !== "start" || n.has(s)) continue;
    const r = Math.abs(s.ts - e);
    r <= st && (!i || r < Math.abs(i.ts - e)) && (i = s);
  }
  return i;
}
function yn(t) {
  const e = t.match(/^(.+?) came home: (.*?)\.?$/s);
  return e ? { people: e[1], note: e[2] } : void 0;
}
function bn(t, e) {
  const n = e.split(/, | and /).map((s) => s.trim()), i = n.length === 1 ? Object.values(t.states).find(
    (s) => s.entity_id.startsWith("person.") && s.attributes.friendly_name === n[0]
  ) : void 0;
  return {
    kind: "user",
    name: e,
    entityId: i?.entity_id,
    picture: i?.attributes.entity_picture
  };
}
function Ue() {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}
function De(t) {
  return { kind: "user", name: t.user?.name ?? "You" };
}
function wn(t) {
  const e = [];
  return t.minutes != null && e.push(`${t.minutes} min`), t.area != null && e.push(`${t.area} m²`), t.emptied_bin && e.push("bin emptied"), e;
}
function $n(t, e, n) {
  const s = t.states[e.entityId]?.attributes.friendly_name ?? e.entityId, r = n.state_color ?? !0, o = [], a = /* @__PURE__ */ new Set(), c = {
    entityId: e.entityId,
    domain: "vacuum",
    name: s,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    fixedIcon: !0
  };
  for (const l of e.runs) {
    const m = vn(e.log, l.started, a);
    m && a.add(m);
    const b = m ? Ne(m.text) : void 0, w = !!l.error;
    let $;
    m && b ? $ = { actor: b.byUser ? De(t) : Ue(), trigger: b.why } : l.start_type != null && Pe[l.start_type] && ($ = {
      actor: { kind: "other", name: Pe[l.start_type], icon: "mdi:gesture-tap" }
    }), o.push({
      ...c,
      key: `vac|${e.entityId}|start|${l.started}`,
      when: l.started * 1e3,
      verb: b?.names ? `started cleaning ${b.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: l.rule_name ? [`preset “${l.rule_name}”`] : void 0,
      cause: $,
      accent: O("vacuum", void 0, "cleaning", "active", r)
    });
    const H = (l.started + (l.minutes ?? 0) * 60) * 1e3;
    o.push({
      ...c,
      key: `vac|${e.entityId}|finish|${l.started}`,
      when: Math.max(H, l.started * 1e3 + 1e3),
      verb: w ? `stopped with error ${l.error}` : b?.names ? `finished cleaning ${b.names}` : "finished cleaning",
      tone: w ? "alert" : "inactive",
      phase: "finish",
      icon: w ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: wn(l),
      accent: w ? Re : O("vacuum", void 0, "docked", "inactive", r)
    });
  }
  const d = e.log.filter((l) => l.kind === "return"), p = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set();
  for (const l of e.log.filter((m) => m.kind === "docked")) {
    const m = d.find(
      (b) => !h.has(b) && b.ts <= l.ts && l.ts - b.ts <= 1800
    );
    m && (p.set(l, m), h.add(m));
  }
  const _ = new Set(e.runs.map((l) => l.started));
  for (const l of e.log) {
    if (!_n.has(l.kind) || a.has(l) || l.kind === "done" && e.runs.length > 0 || l.kind === "start" && [..._].some((H) => Math.abs(H - l.ts) <= st) || h.has(l)) continue;
    const m = l.kind === "start" ? Ne(l.text) : void 0, b = l.kind === "docked" ? p.get(l) : void 0, w = b ? yn(b.text) : void 0;
    if (w) {
      o.push({
        ...c,
        key: `vac|${e.entityId}|log|${l.ts}|docked`,
        when: l.ts * 1e3,
        verb: "was sent home",
        tone: "neutral",
        icon: "mdi:robot-vacuum",
        details: [w.note.charAt(0).toUpperCase() + w.note.slice(1)],
        cause: { actor: bn(t, w.people), trigger: "coming home" },
        accent: O("vacuum", void 0, "docked", "inactive", r)
      });
      continue;
    }
    const $ = l.kind === "error" ? "alert" : l.kind === "start" ? "active" : "neutral";
    o.push({
      ...c,
      key: `vac|${e.entityId}|log|${l.ts}|${l.kind}`,
      when: l.ts * 1e3,
      verb: m?.names ? `started cleaning ${m.names}` : "",
      text: m?.names ? void 0 : l.text.replace(/\.$/, ""),
      tone: $,
      phase: l.kind === "start" ? "start" : l.kind === "done" ? "finish" : void 0,
      icon: l.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      cause: { actor: m?.byUser ? De(t) : Ue(), trigger: m?.why },
      accent: $ === "alert" ? Re : O(
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
const xn = Fe`
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
  .glyph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    line-height: 0;
  }
  .glyph ha-state-icon,
  .glyph ha-icon {
    display: block;
    flex: none;
    width: var(--wh-icon);
    height: var(--wh-icon);
    margin: 0;
    padding: 0;
    --mdc-icon-size: var(--wh-icon);
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
function T(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function An(t) {
  return t ? Object.values(t).some((e) => T(e).length > 0) : !1;
}
function kn(t, e) {
  const n = /* @__PURE__ */ new Set(), i = t.entities ?? {}, s = t.devices ?? {}, r = t.areas ?? {}, o = new Set(T(e.area_id));
  for (const d of T(e.floor_id))
    for (const p of Object.values(r))
      p.floor_id === d && o.add(p.area_id);
  const a = new Set(T(e.device_id)), c = new Set(T(e.label_id));
  for (const d of T(e.entity_id)) n.add(d);
  for (const d of Object.values(i)) {
    const p = d.device_id ? s[d.device_id] : void 0, h = d.area_id ?? p?.area_id ?? void 0;
    h && o.has(h) && n.add(d.entity_id), d.device_id && a.has(d.device_id) && n.add(d.entity_id), d.labels?.some((_) => c.has(_)) && n.add(d.entity_id), p?.labels?.some((_) => c.has(_)) && n.add(d.entity_id);
  }
  return n;
}
const Sn = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function rt(t, e) {
  return e.replace(Sn, (n) => t.states[n]?.attributes.friendly_name ?? n);
}
function En(t, e) {
  for (const [n, i] of Object.entries(t.states))
    if (n.startsWith("person.") && i.attributes.user_id === e)
      return {
        entityId: n,
        name: i.attributes.friendly_name ?? n,
        picture: i.attributes.entity_picture
      };
}
function ot(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function In(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function at(t) {
  return t.replace(/event 'automation_triggered'/g, "another automation");
}
function Cn(t, e) {
  let n = e.context_source;
  return !n && e.context_message?.startsWith("triggered by ") && (n = e.context_message.slice(13)), n ? at(rt(t, n)) : void 0;
}
function Tn(t, e) {
  const n = En(t, e);
  return n ? { kind: "user", name: n.name, entityId: n.entityId, picture: n.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function He(t, e, n) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? n ?? e ?? "Unknown";
}
function On(t, e) {
  const n = e.context_event_type;
  if (n === "automation_triggered" || n === "script_started")
    return {
      actor: {
        kind: n === "automation_triggered" ? "automation" : "script",
        name: He(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: Cn(t, e),
      triggerEntityId: ot(In(e))
    };
  if (e.context_user_id) {
    const i = Tn(t, e.context_user_id);
    return e.context_domain && e.context_service && (i.detail = `${e.context_domain}.${e.context_service}`), { actor: i };
  }
  if (n === "call_service" && e.context_domain && e.context_service) {
    const i = `${e.context_domain}.${e.context_service}`;
    return e.context_domain === "scene" ? { actor: { kind: "scene", name: "A scene", detail: i } } : { actor: { kind: "service", name: i, detail: i } };
  }
  if (n === "logbook_entry" && e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
  if (e.context_entity_id)
    return { actor: {
      kind: "entity",
      name: He(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function Mn(t, e) {
  const n = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return n ? at(rt(t, n)) : void 0;
}
const Rn = 9e4;
function Pn(t, e) {
  return e.map((n) => t.states[n]?.attributes.friendly_name ?? n).join(", ");
}
function Nn(t, e, n, i, s, r) {
  const o = i.kind === "say";
  return {
    key: `action|${e.key}|${s}`,
    when: e.when,
    entityId: o ? i.speakers[0] : void 0,
    domain: o ? "media_player" : "notify",
    name: o ? i.speakers.length ? Pn(t, i.speakers) : "Speaker" : "Notification",
    verb: o ? `said “${i.text}”` : `sent “${i.title ? `${i.title}: ` : ""}${i.text}”`,
    tone: "active",
    icon: o ? "mdi:bullhorn" : "mdi:bell-ring",
    fixedIcon: !0,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    cause: {
      actor: n,
      trigger: e.cause?.trigger,
      triggerEntityId: e.cause?.triggerEntityId
    },
    accent: O("media_player", void 0, "playing", "active", r)
  };
}
function Un(t, e, n, i, s, r = /* @__PURE__ */ new Set()) {
  const o = /* @__PURE__ */ new Set(), a = [];
  for (const c of e) {
    if (!c.isRun || c.rich || (n !== "all" && !(c.entityId && r.has(c.entityId)) && o.add(c), n === "none" || !s)) continue;
    const d = s(c) ?? [], p = c.domain === "script" ? "script" : "automation", h = { kind: p, name: c.name, entityId: c.entityId, icon: it[p] }, _ = c.cause?.actor ?? h, l = /* @__PURE__ */ new Set([c.entityId, _.entityId]);
    d.forEach((m, b) => {
      a.push(Nn(t, c, _, m, b, i));
      for (const w of e)
        w !== c && w.entityId && m.speakers.includes(w.entityId) && l.has(w.cause?.actor?.entityId) && Math.abs(w.when - c.when) <= Rn && o.add(w);
    });
  }
  return [...e.filter((c) => !o.has(c)), ...a];
}
const Dn = /* @__PURE__ */ new Set([
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
  // folded into its person (see people.ts), never listed alone
  "scene",
  "event",
  "doorbell",
  "homeassistant"
]), Hn = /* @__PURE__ */ new Set([
  "input_boolean",
  "input_select",
  "input_number",
  "input_text",
  "input_datetime",
  "input_button",
  "button",
  "counter",
  "timer",
  "group",
  "remote",
  "automation",
  "script"
]), jn = /* @__PURE__ */ new Set([
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
]), zn = /* @__PURE__ */ new Set(["person", "device_tracker", "homeassistant"]);
function Y(t) {
  return new Set([t.target?.entity_id ?? [], t.also_show_entities ?? []].flat());
}
function ct(t) {
  const e = t.domain ?? t.entity_id?.split(".")[0];
  return (e === "automation" || e === "script") && t.state === void 0 && t.message !== void 0;
}
function dt(t) {
  return !!(t.context_user_id || t.context_event_type || t.context_entity_id || t.context_name || t.context_service);
}
function Ln(t, e, n) {
  const i = t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
  if (t.entity_id && Y(e).has(t.entity_id) || e.also_show_domains?.includes(i) || e.include_domains?.length || ct(t)) return !0;
  if (Hn.has(i)) return !!t.context_user_id;
  if (i === "binary_sensor") {
    const s = t.entity_id && n?.states[t.entity_id]?.attributes.device_class;
    return s ? jn.has(s) : dt(t);
  }
  return Dn.has(i);
}
const Wn = 6e4;
function lt(t) {
  return (t.activity ?? "meaningful") === "meaningful" && !t.include_domains?.length;
}
function Bn(t, e, n) {
  if (!lt(n)) return e;
  const i = Y(n);
  for (const s of e) {
    if (s.domain !== "person" || !s.entityId) continue;
    const r = t.states[s.entityId]?.attributes.device_trackers;
    if (!Array.isArray(r)) continue;
    const o = e.find(
      (a) => a.domain === "device_tracker" && a.entityId && r.includes(a.entityId) && a.verb === s.verb && Math.abs(a.when - s.when) <= Wn
    );
    !o || s.cause?.actor || (s.cause = { trigger: `device ${o.name}`, triggerEntityId: o.entityId });
  }
  return e.filter(
    (s) => !(s.domain === "device_tracker" && !(s.entityId && i.has(s.entityId)))
  );
}
const je = {
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
}, Vn = {
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
}, Fn = /* @__PURE__ */ new Set([
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
]), Kn = /* @__PURE__ */ new Set(["person", "device_tracker"]), Yn = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function _e(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function qn(t, e, n) {
  const i = t.states[e];
  if (i && t.formatEntityState)
    try {
      const o = t.formatEntityState({ ...i, state: n }, n);
      if (o) return o;
    } catch {
    }
  const s = i?.attributes.unit_of_measurement;
  return n !== "" && !Number.isNaN(Number(n)) ? s ? `${n} ${s}` : n : _e(n);
}
function Gn(t, e) {
  return Object.values(t.states).find(
    (i) => i.entity_id.startsWith("zone.") && (i.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? _e(e);
}
function Jn(t, e, n, i) {
  if (i === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (i === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (n ? t.states[n] : void 0)?.attributes.device_class;
  if (Kn.has(e))
    return i === "home" ? { verb: "arrived home", tone: "active" } : i === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${Gn(t, i)}`, tone: "active" };
  if (e === "binary_sensor" && r && je[r]) {
    const [c, d, p, h] = je[r];
    if (i === "on") return { verb: c, tone: p ?? "active" };
    if (i === "off") return { verb: d, tone: h ?? "inactive" };
  }
  const o = Vn[e]?.[i];
  if (o) return { verb: o[0], tone: o[1] };
  if (Yn.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && i === "off") return { verb: "was turned off", tone: "inactive" };
  if (Fn.has(e) || i === "on" || i === "off") {
    if (i === "on") return { verb: "was turned on", tone: "active" };
    if (i === "off") return { verb: "was turned off", tone: "inactive" };
  }
  const a = n ? qn(t, n, i) : _e(i);
  return { verb: `changed to ${fe(a, 80)}`, tone: "neutral" };
}
const y = {
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
}, M = { hours: [1, 720], entries: [1, 500] }, ze = 60 * 1e3, Xn = 10 * 60 * 1e3, Le = 5 * 60 * 1e3;
function ut(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function ht(t, [e, n], i) {
  const s = typeof t == "number" ? t : Number(t);
  return Number.isFinite(s) ? Math.min(n, Math.max(e, Math.round(s))) : i;
}
function ae(t) {
  return ht(t.hours_to_show, M.hours, y.hours_to_show);
}
function Zn(t) {
  return ht(t.max_entries, M.entries, y.max_entries);
}
function pt(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function mt(t, e, n, i) {
  const s = pt(t);
  if (i && t.entity_id && !(e.show_diagnostic ?? y.show_diagnostic)) {
    const o = i.entities?.[t.entity_id], a = Y(e).has(t.entity_id);
    if (o && (o.entity_category || o.hidden) && !a) return !1;
  }
  return !(n && (!t.entity_id || !n.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(s) || e.exclude_domains?.includes(s) || (e.activity ?? y.activity) === "meaningful" && !Ln(t, e, i) || (e.hide_unavailable ?? y.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function Qn(t, e, n) {
  const i = pt(e), s = e.entity_id ? t.states[e.entity_id] : void 0, r = e.name ?? s?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let o, a = "neutral", c = On(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: o, tone: a } = Jn(t, i, e.entity_id, e.state));
  else {
    const l = e.message ?? "did something";
    if (l.match(/^triggered(?: by (.+))?$/)) {
      o = "was triggered", a = "active";
      const b = Mn(t, e);
      if (b) {
        const w = e.source ?? l.replace(/^triggered by /, "");
        c = { ...c, trigger: b, triggerEntityId: ot(w) };
      }
    } else
      o = l, a = /(error|fail)/i.test(l) ? "alert" : "neutral";
  }
  const d = c?.actor;
  d && !d.icon && (d.icon = it[d.kind]);
  const p = i === "person", h = p ? s?.attributes.entity_picture : void 0, _ = n.state_color ?? y.state_color;
  return {
    key: ut(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: i,
    name: r,
    verb: o,
    tone: a,
    icon: hn(i, e.icon),
    stateValue: e.state,
    picture: h,
    isPerson: p,
    isRun: ct(e),
    cause: c,
    count: 1,
    accent: O(i, s?.attributes.device_class, e.state, a, _)
  };
}
function We(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function ei(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const n = mn[t.state ?? ""];
  return n ? e.items.some(
    (i) => i.entityId === t.entity_id && i.phase === n && Math.abs(i.when - t.when * 1e3) <= fn
  ) : !1;
}
function ti(t, e = !0, n = /* @__PURE__ */ new Set()) {
  const i = /* @__PURE__ */ new Set();
  for (const s of t) {
    const r = s.cause?.actor;
    if (!r?.entityId || r.kind !== "automation" && r.kind !== "script") continue;
    for (const c of t)
      e && c.isRun && !(c.entityId && n.has(c.entityId)) && c.entityId === r.entityId && Math.abs(c.when - s.when) <= ze && i.add(c);
    const o = s.cause?.triggerEntityId;
    if (!o) continue;
    const a = t.find(
      (c) => c !== s && !c.isRun && c.entityId === o && c.when <= s.when + 5e3 && s.when - c.when <= ze
    );
    a && (i.add(a), s.cause = { ...s.cause, trigger: `${a.name} ${a.verb}` });
  }
  return t.filter((s) => !i.has(s));
}
function ni(t, e, n) {
  return lt(n) ? rn(t, e, Y(n)) : e;
}
function ii(t, e, n, i, s, r, o) {
  const a = i - ae(n) * 36e5, c = Zn(n), d = n.collapse_repeats ?? y.collapse_repeats, p = (r?.items ?? []).filter(
    (u) => u.when >= a && u.when <= i + Le
  ), h = r ? { items: p, vacuums: r.vacuums } : void 0, _ = [...e], l = _.filter((u) => u.domain === "homeassistant" && u.message === "started").map((u) => u.when), m = Y(n), b = (u) => (n.activity ?? y.activity) !== "meaningful" ? !1 : u.domain === "homeassistant" ? u.message === "stopped" && l.some((v) => v >= u.when && v - u.when <= 900) : dt(u) || u.entity_id && m.has(u.entity_id) || zn.has(u.domain ?? u.entity_id?.split(".")[0] ?? "") ? !1 : l.some((v) => u.when >= v - 30 && u.when <= v + 180), w = _.filter((u) => {
    const v = u.when * 1e3;
    return v >= a && v <= i + Le;
  }).filter((u) => mt(u, n, s, t)).filter((u) => !b(u)).filter((u) => !ei(u, h)).sort((u, v) => v.when - u.when), $ = n.automation_runs ?? y.automation_runs, H = Un(
    t,
    [...w.map((u) => Qn(t, u, n)), ...p],
    $,
    n.state_color ?? y.state_color,
    n.show_actions === !1 ? void 0 : o,
    m
  ).sort((u, v) => v.when - u.when), ft = ti(H, $ !== "all", m), _t = nn(
    Xt(
      ni(t, Bn(t, ft, n), n),
      n.chatty ?? y.chatty,
      m
    )
  ), j = [];
  let te = 0;
  for (const u of _t) {
    const v = j[j.length - 1];
    if (d && v && !u.rich && !v.rich && u.entityId && v.entityId === u.entityId && v.verb === u.verb && We(v) === We(u) && te - u.when <= Xn) {
      v.count += 1, te = u.when;
      continue;
    }
    if (j.push(u), te = u.when, j.length > c) break;
  }
  const ve = j.slice(0, c);
  (n.order ?? y.order) === "oldest_first" && ve.reverse();
  const q = [];
  for (const u of ve) {
    const v = Wt(u.when);
    let z = q[q.length - 1];
    (!z || z.key !== v) && (z = { key: v, label: Kt(u.when, i), items: [] }, q.push(z)), z.items.push(u);
  }
  return q;
}
function si(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const n = t.cause;
  return n?.actor && (e += ` by ${n.actor.name}`), n?.trigger && (e += `, triggered by ${n.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), e;
}
var ri = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, D = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? oi(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && ri(e, n, s), s;
};
const Be = 3e3, ai = 6e4;
let k = class extends R {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._traceBudget = 0, this._registryRefs = [], this._resolveRun = (t) => {
      const e = this._hass;
      if (!e || !t.entityId) return;
      const n = this._traces ??= new ln(e), i = n.lookup(t.entityId, t.when, 15e3);
      if (i) return an(i);
      this._traceBudget-- > 0 && n.ensure(t.entityId, t.when, 15e3)?.then(() => this._scheduleRecompute());
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => gi), document.createElement("what-happened-card-editor");
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
    const n = [t.entities, t.devices, t.areas], i = n.some((s, r) => s !== this._registryRefs[r]);
    this._registryRefs = n, (e || i) && (this._ensureSubscription(), this._scheduleRecompute());
  }
  get hass() {
    return this._hass;
  }
  getCardSize() {
    const t = this._config;
    if (t?.max_height) return Math.max(3, Math.ceil(t.max_height / 50));
    const e = this._groups.reduce((n, i) => n + i.items.length, 0);
    return Math.min(12, Math.max(3, Math.ceil(e * 1.2) + 1));
  }
  /** Sections view: default size and resize limits (users resize with the handles). */
  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 3, min_rows: 2 };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this._now = Date.now(), this._refreshHistories(), this._recompute();
    }, ai), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    const n = e.vacuum_details === !1 ? [] : gn(t).filter((r) => this._vacuumVisible(r, e)), i = JSON.stringify([...n].sort());
    if (i === this._vacKey) return;
    this._vacKey = i, this._unsubscribeVacuums(), this._vacuums.clear();
    const s = this._vacToken;
    for (const r of n) {
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
    const n = this._vacToken;
    e.callWS({ type: "tapo_rv30/history/list", entity_id: t.entityId }).then((i) => {
      n === this._vacToken && (t.runs = (i.runs ?? []).filter((s) => s.started), this._scheduleRecompute());
    }).catch(() => {
    });
  }
  _refreshHistories() {
    for (const t of this._vacuums.values()) this._refreshHistory(t);
  }
  _ensureLogbook() {
    const t = this._hass, e = this._config;
    if (!t || !e || !this.isConnected) return;
    let n;
    An(e.target) && (n = kn(t, e.target));
    const i = ae(e), s = JSON.stringify([i, n ? [...n].sort() : null]);
    if (s === this._subKey) {
      this._allowed = n;
      return;
    }
    if (this._subKey = s, this._allowed = n, this._unsubscribe(), this._entries.clear(), this._error = void 0, n && n.size === 0) {
      this._loading = !1;
      return;
    }
    this._loading = !0;
    const r = this._subToken, o = new Date(Date.now() - i * 36e5);
    Yt(
      t,
      (a) => {
        if (r !== this._subToken) return;
        const c = this._config;
        for (const d of a)
          c && !mt(d, c, this._allowed, this._hass) || this._entries.set(ut(d), d);
        this._entries.size > Be && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
      },
      o,
      n ? [...n] : void 0
    ).then((a) => {
      r !== this._subToken ? a() : this._unsub = a;
    }).catch((a) => {
      r === this._subToken && (this._loading = !1, this._error = a instanceof Error ? a.message : "Could not load the logbook");
    });
  }
  _trimBuffer() {
    const t = [...this._entries.entries()].sort((e, n) => n[1].when - e[1].when);
    this._entries = new Map(t.slice(0, Be));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    if (!this._hass || !this._config) return;
    this._now = Date.now(), this._traceBudget = 40;
    const t = ii(
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
    const t = this._hass, e = this._config, n = /* @__PURE__ */ new Set(), i = [];
    if (t && e)
      for (const s of this._vacuums.values())
        !s.log.length && !s.runs.length || (n.add(s.entityId), i.push(...$n(t, s, e)));
    return { items: i, vacuums: n };
  }
  // ------------------------------------------------------------ interaction
  _moreInfo(t) {
    t && this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 })
    );
  }
  _onRowClick(t) {
    (this._config?.tap_action ?? y.tap_action) !== "none" && this._moreInfo(t.entityId);
  }
  _onRowKey(t, e) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._onRowClick(e));
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return f;
    const e = this._groups.reduce((s, r) => s + r.items.length, 0), n = this._groups[this._groups.length - 1], i = n?.items[n.items.length - 1]?.key;
    return g`
      <ha-card
        class=${G({
      compact: t.compact ?? y.compact,
      "has-header": !!t.title
    })}
        style=${ie({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? g`<h1 class="card-header">${t.title}</h1>` : f}
        <div class="scroll">
          ${this._error ? g`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? g`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : g`<ol>
                      ${this._groups.map((s) => this._renderGroup(s, t, i))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = ae(t), n = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, i = e === 1 ? "No activity in the last hour" : `No activity in the last ${n}`;
    return g`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${i}
    </div>`;
  }
  _renderGroup(t, e, n) {
    const i = e.show_day_headers ?? y.show_day_headers;
    return g`
      ${i ? g`<li class="day" role="presentation">${t.label}</li>` : f}
      ${t.items.map((s) => this._renderItem(s, e, s.key === n))}
    `;
  }
  _renderIcon(t) {
    const e = t.entityId && !t.fixedIcon ? this._hass?.states[t.entityId] : void 0;
    return g`<span class="glyph"
      >${e ? g`<ha-state-icon
              .hass=${this._hass}
              .stateObj=${e}
              .stateValue=${t.stateValue}
            ></ha-state-icon>` : g`<ha-icon .icon=${t.icon}></ha-icon>`}</span
    >`;
  }
  _renderItem(t, e, n) {
    const i = e.show_avatars ?? y.show_avatars, s = e.show_cause ?? y.show_cause, r = !!t.entityId && (e.tap_action ?? y.tap_action) !== "none", o = i && t.picture;
    return g`
      <li class=${G({ item: !0, last: n })}>
        <div class="rail">
          <div
            class=${G({ node: !0, photo: !!o })}
            style=${ie({ "--accent": t.accent })}
          >
            ${o ? g`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${G({ row: !0, clickable: r })}
          style=${ie({ "--accent": t.accent })}
          role=${r ? "button" : "text"}
          tabindex=${r ? "0" : "-1"}
          aria-label=${si(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : g`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? g`<span class="count">×${t.count}</span>` : f}
            </div>
            ${t.details?.length ? g`<div class="secondary">${t.details.join(" · ")}</div>` : f}
            ${s ? this._renderCause(t, i) : f}
          </div>
          ${this._renderTime(t, e)}
        </div>
      </li>
    `;
  }
  _renderAvatar(t) {
    return t.picture ? g`<img class="avatar" src=${t.picture} alt="" loading="lazy" />` : g`<span class="avatar initial">${t.name.charAt(0).toUpperCase()}</span>`;
  }
  _renderCause(t, e) {
    const n = t.cause;
    if (!n || !n.actor && !n.trigger) return f;
    const i = n.actor, s = !!i?.entityId && (this._config?.tap_action ?? y.tap_action) !== "none";
    return g`
      <div class="secondary">
        ${i ? g`by${e && i.kind === "user" ? this._renderAvatar(i) : f}
              ${s ? g`<button
                      class="link"
                      type="button"
                      title=${i.detail ? `${i.name} – ${i.detail}` : i.name}
                      @click=${(r) => {
      r.stopPropagation(), this._moreInfo(i.entityId);
    }}
                      @keydown=${(r) => r.stopPropagation()}
                    >
                      ${i.name}
                    </button>` : g`<span title=${i.detail ?? i.name}>${i.name}</span>`}` : f}${i && n.trigger ? ", " : f}${n.trigger ? g`${i ? "triggered by" : "by"} ${n.trigger}` : f}
      </div>
    `;
  }
  _renderTime(t, e) {
    const n = e.time_display ?? y.time_display, i = nt(t.when, this._hass), s = Ft(t.when, this._now);
    return g`
      <div class="time" title=${Vt(t.when, this._hass)}>
        ${n !== "relative" ? g`<span class="abs">${i}</span>` : f}
        ${n !== "absolute" ? g`<span class="rel">${s}</span>` : f}
      </div>
    `;
  }
};
k.styles = xn;
D([
  U()
], k.prototype, "_config", 2);
D([
  U()
], k.prototype, "_groups", 2);
D([
  U()
], k.prototype, "_loading", 2);
D([
  U()
], k.prototype, "_error", 2);
D([
  U()
], k.prototype, "_now", 2);
k = D([
  Je("what-happened-card")
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
var ci = Object.defineProperty, di = Object.getOwnPropertyDescriptor, ge = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? di(e, n) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (i ? o(e, n, s) : o(s)) || s);
  return i && s && ci(e, n, s), s;
};
const oe = [
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
].map((t) => ({ value: t, label: t })), li = {
  title: "Title",
  show_day_headers: "Show day headings (Today, Yesterday)",
  hours_to_show: "Time window",
  max_entries: "Maximum number of entries",
  order: "Order",
  target: "Only show activity of",
  exclude_entities: "Hide these entities",
  also_show_entities: "Also show these entities",
  also_show_domains: "Also show these domains",
  include_domains: "Only these domains",
  exclude_domains: "Hide these domains",
  show_cause: "Show why it happened (who / what / trigger)",
  show_avatars: "Show profile pictures",
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
}, ui = {
  title: "Leave empty to show no title.",
  also_show_entities: "Shown even when the default view would hide them (helpers, buttons, diagnostic entities, restart noise, very frequent entities). Pick an automation or script to always list its runs.",
  also_show_domains: "Added to the default view, e.g. sensor or update. Pick from the list or type your own.",
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  activity: "Recommended hides clocks, text and number sensors and update entities.",
  automation_runs: "Most runs are plumbing. By default only what a run said on a speaker or sent as a notification is shown, as its own entry.",
  chatty: "Entities with at least 10 entries at a pace of one per hour or faster, such as a clock sensor or an automation that runs every 15 minutes.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, hi = [
  { name: "title", selector: { text: {} } },
  { name: "show_day_headers", selector: { boolean: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "hours_to_show",
        selector: {
          number: {
            min: M.hours[0],
            max: M.hours[1],
            step: 1,
            mode: "box",
            unit_of_measurement: "h"
          }
        }
      },
      {
        name: "max_entries",
        selector: {
          number: { min: M.entries[0], max: M.entries[1], step: 1, mode: "box" }
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
], pi = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "also_show_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: oe }
    }
  },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: oe }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: oe }
    }
  }
], mi = [
  { name: "show_cause", selector: { boolean: {} } },
  { name: "show_avatars", selector: { boolean: {} } },
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
], fi = [
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
], _i = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: pi },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: mi },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: fi }
];
let N = class extends R {
  constructor() {
    super(...arguments), this._computeLabel = (t) => li[t.name] ?? t.name, this._computeHelper = (t) => ui[t.name];
  }
  setConfig(t) {
    this._config = t;
  }
  _data() {
    return { ...y, ...this._config };
  }
  _valueChanged(t) {
    if (t.stopPropagation(), !this._config) return;
    const e = t.detail.value, n = { type: this._config.type };
    for (const [i, s] of Object.entries(e))
      i === "type" || s === void 0 || s === "" || Array.isArray(s) && s.length === 0 || i === "target" && (!s || Object.keys(s).length === 0) || y[i] === s && !(i in this._config) || (n[i] = s);
    this._config = n, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _form(t) {
    return g`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${t}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }
  render() {
    return !this.hass || !this._config ? f : g`
      ${this._form(hi)}
      ${_i.map(
      (t) => g`
          <ha-expansion-panel outlined .header=${t.header} .expanded=${t.id === "source"}>
            <ha-icon slot="leading-icon" .icon=${t.icon}></ha-icon>
            <div class="panel-content">${this._form(t.schema)}</div>
          </ha-expansion-panel>
        `
    )}
    `;
  }
};
N.styles = Fe`
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
ge([
  Xe({ attribute: !1 })
], N.prototype, "hass", 2);
ge([
  U()
], N.prototype, "_config", 2);
N = ge([
  Je("what-happened-card-editor")
], N);
const gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return N;
  }
}, Symbol.toStringTag, { value: "Module" }));
