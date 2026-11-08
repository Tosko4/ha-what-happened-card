/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Q = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ce = /* @__PURE__ */ new WeakMap();
let Pe = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Q && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = ce.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ce.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const et = (t) => new Pe(typeof t == "string" ? t : t + "", void 0, ee), Re = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[r + 1], t[0]);
  return new Pe(i, t, ee);
}, tt = (t, e) => {
  if (Q) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), s = V.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, t.appendChild(n);
  }
}, le = Q ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return et(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: it, defineProperty: nt, getOwnPropertyDescriptor: st, getOwnPropertyNames: rt, getOwnPropertySymbols: ot, getPrototypeOf: at } = Object, q = globalThis, de = q.trustedTypes, ct = de ? de.emptyScript : "", lt = q.reactiveElementPolyfillSupport, H = (t, e) => t, K = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ct : null;
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
} }, te = (t, e) => !it(t, e), ue = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: te };
Symbol.metadata ??= Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ue) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, i);
      s !== void 0 && nt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: s, set: r } = st(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const e = at(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const i = this.properties, n = [...rt(i), ...ot(i)];
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
      for (const s of n) i.unshift(le(s));
    } else e !== void 0 && i.push(le(e));
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
    return tt(e, this.constructor.elementStyles), e;
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
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : K).toAttribute(i, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : K;
      this._$Em = s;
      const a = o.fromAttribute(i, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, s = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), n ??= o.getPropertyOptions(e), !((n.hasChanged ?? te)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, n)))) return;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[H("elementProperties")] = /* @__PURE__ */ new Map(), E[H("finalized")] = /* @__PURE__ */ new Map(), lt?.({ ReactiveElement: E }), (q.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = globalThis, he = (t) => t, Y = ie.trustedTypes, pe = Y ? Y.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ue = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ne = "?" + y, dt = `<${Ne}>`, S = document, D = () => S.createComment(""), j = (t) => t === null || typeof t != "object" && typeof t != "function", ne = Array.isArray, ut = (t) => ne(t) || typeof t?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, fe = />/g, A = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, ge = /"/g, He = /^(?:script|style|textarea|title)$/i, ht = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), f = ht(1), w = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), k = S.createTreeWalker(S, 129);
function De(t, e) {
  if (!ne(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pe !== void 0 ? pe.createHTML(e) : e;
}
const pt = (t, e) => {
  const i = t.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = N;
  for (let a = 0; a < i; a++) {
    const c = t[a];
    let d, l, u = -1, p = 0;
    for (; p < c.length && (o.lastIndex = p, l = o.exec(c), l !== null); ) p = o.lastIndex, o === N ? l[1] === "!--" ? o = me : l[1] !== void 0 ? o = fe : l[2] !== void 0 ? (He.test(l[2]) && (s = RegExp("</" + l[2], "g")), o = A) : l[3] !== void 0 && (o = A) : o === A ? l[0] === ">" ? (o = s ?? N, u = -1) : l[1] === void 0 ? u = -2 : (u = o.lastIndex - l[2].length, d = l[1], o = l[3] === void 0 ? A : l[3] === '"' ? ge : _e) : o === ge || o === _e ? o = A : o === me || o === fe ? o = N : (o = A, s = void 0);
    const _ = o === A && t[a + 1].startsWith("/>") ? " " : "";
    r += o === N ? c + dt : u >= 0 ? (n.push(d), c.slice(0, u) + Ue + c.slice(u) + y + _) : c + y + (u === -2 ? a : _);
  }
  return [De(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class z {
  constructor({ strings: e, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, c = this.parts, [d, l] = pt(e, i);
    if (this.el = z.createElement(d, n), k.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = k.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Ue)) {
          const p = l[o++], _ = s.getAttribute(u).split(y), b = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: r, name: b[2], strings: _, ctor: b[1] === "." ? ft : b[1] === "?" ? _t : b[1] === "@" ? gt : G }), s.removeAttribute(u);
        } else u.startsWith(y) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (He.test(s.tagName)) {
          const u = s.textContent.split(y), p = u.length - 1;
          if (p > 0) {
            s.textContent = Y ? Y.emptyScript : "";
            for (let _ = 0; _ < p; _++) s.append(u[_], D()), k.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[p], D());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ne) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(y, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += y.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = S.createElement("template");
    return n.innerHTML = e, n;
  }
}
function M(t, e, i = t, n) {
  if (e === w) return e;
  let s = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = j(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(t), s._$AT(t, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = s : i._$Cl = s), s !== void 0 && (e = M(t, s._$AS(t, e.values), s, n)), e;
}
class mt {
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
    const { el: { content: i }, parts: n } = this._$AD, s = (e?.creationScope ?? S).importNode(i, !0);
    k.currentNode = s;
    let r = k.nextNode(), o = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let d;
        c.type === 2 ? d = new L(r, r.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (d = new vt(r, this, e)), this._$AV.push(d), c = n[++a];
      }
      o !== c?.index && (r = k.nextNode(), o++);
    }
    return k.currentNode = S, s;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, n, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = M(this, e, i), j(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== w && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = z.createElement(De(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const r = new mt(s, this), o = r.u(this.options);
      r.p(i), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let i = ve.get(e.strings);
    return i === void 0 && ve.set(e.strings, i = new z(e)), i;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const r of e) s === i.length ? i.push(n = new L(this.O(D()), this.O(D()), this, this.options)) : n = i[s], n._$AI(r), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const n = he(e).nextSibling;
      he(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, s, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = h;
  }
  _$AI(e, i = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = M(this, e, i, 0), o = !j(e) || e !== this._$AH && e !== w, o && (this._$AH = e);
    else {
      const a = e;
      let c, d;
      for (e = r[0], c = 0; c < r.length - 1; c++) d = M(this, a[n + c], i, c), d === w && (d = this._$AH[c]), o ||= !j(d) || d !== this._$AH[c], d === h ? e = h : e !== h && (e += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ft extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class _t extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class gt extends G {
  constructor(e, i, n, s, r) {
    super(e, i, n, s, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = M(this, e, i, 0) ?? h) === w) return;
    const n = this._$AH, s = e === h && n !== h || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== h && (n === h || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class vt {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const bt = ie.litHtmlPolyfillSupport;
bt?.(z, L), (ie.litHtmlVersions ??= []).push("3.3.3");
const yt = (t, e, i) => {
  const n = i?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = s = new L(e.insertBefore(D(), r), r, void 0, i ?? {});
  }
  return s._$AI(t), s;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = yt(i, this.renderRoot, this.renderOptions);
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
const wt = se.litElementPolyfillSupport;
wt?.({ LitElement: O });
(se.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: te }, xt = (t = $t, e, i) => {
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
function ze(t) {
  return (e, i) => typeof i == "object" ? xt(t, e, i) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(t) {
  return ze({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = { ATTRIBUTE: 1 }, We = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Be = class {
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
const B = We(class extends Be {
  constructor(t) {
    if (super(t), t.type !== Le.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return w;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ve = "important", At = " !" + Ve, Z = We(class extends Be {
  constructor(t) {
    if (super(t), t.type !== Le.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const r = typeof s == "string" && s.endsWith(At);
        n.includes("-") || r ? i.setProperty(n, r ? s.slice(0, -11) : s, r ? Ve : "") : i[n] = s;
      }
    }
    return w;
  }
}), re = "en-US";
function be(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function kt(t) {
  const e = new Date(t), i = (n) => String(n).padStart(2, "0");
  return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}`;
}
function St(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function Fe(t, e, i = !1) {
  const n = St(e);
  return new Intl.DateTimeFormat(re, {
    hour: n ? "numeric" : "2-digit",
    minute: "2-digit",
    second: i ? "2-digit" : void 0,
    hourCycle: n ? "h12" : "h23"
  }).format(t);
}
function Et(t, e) {
  return `${new Intl.DateTimeFormat(re, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${Fe(t, e, !0)}`;
}
function Ct(t, e) {
  const i = Math.max(0, Math.round((e - t) / 1e3));
  if (i < 45) return "just now";
  const n = Math.round(i / 60);
  if (n < 60) return `${n} min ago`;
  const s = Math.round(n / 60);
  return s < 24 ? `${s} h ago` : `${Math.round(s / 24)} d ago`;
}
function Tt(t, e) {
  const i = Math.round((be(e) - be(t)) / 864e5);
  if (i === 0) return "Today";
  if (i === 1) return "Yesterday";
  const n = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(re, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: n ? void 0 : "numeric"
  }).format(t);
}
function Ot(t, e, i, n) {
  const s = {
    type: "logbook/event_stream",
    start_time: i.toISOString()
  };
  return n && n.length > 0 && (s.entity_ids = n), t.connection.subscribeMessage(
    (r) => e(r.events ?? []),
    s
  );
}
const Mt = "mdi:information-outline", It = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function Pt(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : Mt);
}
function F(t, e, i, n, s) {
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
const ye = "var(--error-color)", Rt = "tapo_rv30", we = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice"
}, Ut = {
  cleaning: "start",
  docked: "finish"
}, Nt = 10 * 60 * 1e3, Ht = /* @__PURE__ */ new Set(["start", "done", "override", "return", "docked", "skip", "error"]), Ke = 300;
function Dt(t) {
  return Object.values(t.entities ?? {}).filter((e) => e.platform === Rt && e.entity_id.startsWith("vacuum.")).map((e) => e.entity_id);
}
function $e(t) {
  const e = t.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  return e ? { byUser: e[1] === "You started", names: e[2], why: e[3]?.replace(/\.$/, "") } : { byUser: t.startsWith("You") };
}
function jt(t, e, i) {
  let n;
  for (const s of t) {
    if (s.kind !== "start" || i.has(s)) continue;
    const r = Math.abs(s.ts - e);
    r <= Ke && (!n || r < Math.abs(n.ts - e)) && (n = s);
  }
  return n;
}
function xe() {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}
function Ae(t) {
  return { kind: "user", name: t.user?.name ?? "You" };
}
function zt(t) {
  const e = [];
  return t.minutes != null && e.push(`${t.minutes} min`), t.area != null && e.push(`${t.area} m²`), t.emptied_bin && e.push("bin emptied"), e;
}
function Lt(t, e, i) {
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
  for (const l of e.runs) {
    const u = jt(e.log, l.started, a);
    u && a.add(u);
    const p = u ? $e(u.text) : void 0, _ = !!l.error;
    let b;
    u && p ? b = { actor: p.byUser ? Ae(t) : xe(), trigger: p.why } : l.start_type != null && we[l.start_type] && (b = {
      actor: { kind: "other", name: we[l.start_type], icon: "mdi:gesture-tap" }
    }), o.push({
      ...c,
      key: `vac|${e.entityId}|start|${l.started}`,
      when: l.started * 1e3,
      verb: p?.names ? `started cleaning ${p.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: l.rule_name ? [`preset “${l.rule_name}”`] : void 0,
      cause: b,
      accent: F("vacuum", void 0, "cleaning", "active", r)
    });
    const x = (l.started + (l.minutes ?? 0) * 60) * 1e3;
    o.push({
      ...c,
      key: `vac|${e.entityId}|finish|${l.started}`,
      when: Math.max(x, l.started * 1e3 + 1e3),
      verb: _ ? `stopped with error ${l.error}` : p?.names ? `finished cleaning ${p.names}` : "finished cleaning",
      tone: _ ? "alert" : "inactive",
      phase: "finish",
      icon: _ ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: zt(l),
      accent: _ ? ye : F("vacuum", void 0, "docked", "inactive", r)
    });
  }
  const d = new Set(e.runs.map((l) => l.started));
  for (const l of e.log) {
    if (!Ht.has(l.kind) || a.has(l) || l.kind === "done" && e.runs.length > 0 || l.kind === "start" && [...d].some((_) => Math.abs(_ - l.ts) <= Ke))
      continue;
    const u = l.kind === "start" ? $e(l.text) : void 0, p = l.kind === "error" ? "alert" : l.kind === "start" ? "active" : "neutral";
    o.push({
      ...c,
      key: `vac|${e.entityId}|log|${l.ts}|${l.kind}`,
      when: l.ts * 1e3,
      verb: u?.names ? `started cleaning ${u.names}` : "",
      text: u?.names ? void 0 : l.text.replace(/\.$/, ""),
      tone: p,
      phase: l.kind === "start" ? "start" : l.kind === "done" ? "finish" : void 0,
      icon: l.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      cause: { actor: u?.byUser ? Ae(t) : xe(), trigger: u?.why },
      accent: p === "alert" ? ye : F(
        "vacuum",
        void 0,
        "cleaning",
        p === "active" ? "active" : "neutral",
        r
      )
    });
  }
  return o;
}
const Wt = Re`
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
function Bt(t) {
  return t ? Object.values(t).some((e) => C(e).length > 0) : !1;
}
function Vt(t, e) {
  const i = /* @__PURE__ */ new Set(), n = t.entities ?? {}, s = t.devices ?? {}, r = t.areas ?? {}, o = new Set(C(e.area_id));
  for (const d of C(e.floor_id))
    for (const l of Object.values(r))
      l.floor_id === d && o.add(l.area_id);
  const a = new Set(C(e.device_id)), c = new Set(C(e.label_id));
  for (const d of C(e.entity_id)) i.add(d);
  for (const d of Object.values(n)) {
    const l = d.device_id ? s[d.device_id] : void 0, u = d.area_id ?? l?.area_id ?? void 0;
    u && o.has(u) && i.add(d.entity_id), d.device_id && a.has(d.device_id) && i.add(d.entity_id), d.labels?.some((p) => c.has(p)) && i.add(d.entity_id), l?.labels?.some((p) => c.has(p)) && i.add(d.entity_id);
  }
  return i;
}
const Ft = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function Ye(t, e) {
  return e.replace(Ft, (i) => t.states[i]?.attributes.friendly_name ?? i);
}
function Kt(t, e) {
  for (const [i, n] of Object.entries(t.states))
    if (i.startsWith("person.") && n.attributes.user_id === e)
      return {
        entityId: i,
        name: n.attributes.friendly_name ?? i,
        picture: n.attributes.entity_picture
      };
}
function Yt(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function qt(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function qe(t) {
  return t.replace(/event 'automation_triggered'/g, "another automation");
}
function Gt(t, e) {
  let i = e.context_source;
  return !i && e.context_message?.startsWith("triggered by ") && (i = e.context_message.slice(13)), i ? qe(Ye(t, i)) : void 0;
}
function Jt(t, e) {
  const i = Kt(t, e);
  return i ? { kind: "user", name: i.name, entityId: i.entityId, picture: i.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function ke(t, e, i) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? i ?? e ?? "Unknown";
}
function Zt(t, e) {
  const i = e.context_event_type;
  if (i === "automation_triggered" || i === "script_started")
    return {
      actor: {
        kind: i === "automation_triggered" ? "automation" : "script",
        name: ke(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: Gt(t, e),
      triggerEntityId: Yt(qt(e))
    };
  if (e.context_user_id) {
    const n = Jt(t, e.context_user_id);
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
      name: ke(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function Xt(t, e) {
  const i = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return i ? qe(Ye(t, i)) : void 0;
}
const Qt = /* @__PURE__ */ new Set([
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
]), ei = /* @__PURE__ */ new Set([
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
function ti(t) {
  const e = t.domain ?? t.entity_id?.split(".")[0];
  return (e === "automation" || e === "script") && t.state === void 0 && t.message !== void 0;
}
function ii(t, e, i) {
  const n = t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant", s = [e.target?.entity_id ?? []].flat();
  if (t.entity_id && s.includes(t.entity_id) || e.include_domains?.length) return !0;
  if (ti(t)) return e.show_runs === !0;
  if (!Qt.has(n)) return !1;
  if (n === "binary_sensor" && t.entity_id) {
    const r = i?.states[t.entity_id]?.attributes.device_class;
    return !r || ei.has(r);
  }
  return !0;
}
const ni = 10, si = 1e4, ri = 3;
function Ge(t, e) {
  return t.length > e ? `${t.slice(0, e - 1).trimEnd()}…` : t;
}
function Se(t) {
  return t.entityId ?? t.name;
}
function oi(t, e) {
  if (e === "show") return t;
  const i = /* @__PURE__ */ new Map();
  for (const o of t) {
    if (o.rich) continue;
    const a = Se(o), c = i.get(a);
    c ? c.push(o) : i.set(a, [o]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const [o, a] of i) {
    if (a.length < ni) continue;
    (a[0].when - a[a.length - 1].when) / 36e5 <= a.length && n.add(o);
  }
  if (n.size === 0) return t;
  const s = [], r = /* @__PURE__ */ new Set();
  for (const o of t) {
    const a = Se(o);
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
      details: o.isRun ? void 0 : [`latest: ${Ge(o.verb, 70)}`],
      isRun: !1,
      count: 1,
      rich: !0
    });
  }
  return s;
}
const ai = {
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
function ci(t) {
  return ai[t] ?? `${t.replace(/_/g, " ")} entities`;
}
function li(t) {
  return t.startsWith("was ") ? `were ${t.slice(4)}` : t.startsWith("is ") ? `are ${t.slice(3)}` : t;
}
function di(t, e) {
  return (t.cause?.actor?.name ?? "") === (e.cause?.actor?.name ?? "") && (t.cause?.trigger ?? "") === (e.cause?.trigger ?? "");
}
function ui(t) {
  const e = /* @__PURE__ */ new Map(), i = [];
  for (const s of t) {
    if (s.rich || !s.entityId) continue;
    const r = `${s.domain}|${s.verb}|${s.tone}`, o = e.get(r);
    if (o && o.oldest - s.when <= si)
      o.members.push(s), o.oldest = s.when;
    else {
      const a = { members: [s], oldest: s.when };
      e.set(r, a), i.push(a);
    }
  }
  const n = /* @__PURE__ */ new Map();
  for (const { members: s } of i) {
    if (s.length < ri) continue;
    const r = s[0], o = s.map((c) => c.name), a = o.slice(0, 6).join(", ");
    n.set(r, {
      ...r,
      key: `burst|${r.key}`,
      entityId: void 0,
      name: `${s.length} ${ci(r.domain)}`,
      verb: li(r.verb),
      details: [o.length > 6 ? `${a} and ${o.length - 6} more` : a],
      cause: s.every((c) => di(c, r)) ? r.cause : void 0,
      count: 1,
      stateValue: void 0,
      rich: !0
    });
    for (const c of s.slice(1)) n.set(c, null);
  }
  return n.size === 0 ? t : t.flatMap((s) => {
    if (!n.has(s)) return [s];
    const r = n.get(s);
    return r ? [r] : [];
  });
}
const Ee = {
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
}, hi = {
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
}, pi = /* @__PURE__ */ new Set([
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
]), mi = /* @__PURE__ */ new Set(["person", "device_tracker"]), fi = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function oe(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function _i(t, e, i) {
  const n = t.states[e];
  if (n && t.formatEntityState)
    try {
      const o = t.formatEntityState({ ...n, state: i }, i);
      if (o) return o;
    } catch {
    }
  const s = n?.attributes.unit_of_measurement;
  return i !== "" && !Number.isNaN(Number(i)) ? s ? `${i} ${s}` : i : oe(i);
}
function gi(t, e) {
  return Object.values(t.states).find(
    (n) => n.entity_id.startsWith("zone.") && (n.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? oe(e);
}
function vi(t, e, i, n) {
  if (n === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (n === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (i ? t.states[i] : void 0)?.attributes.device_class;
  if (mi.has(e))
    return n === "home" ? { verb: "arrived home", tone: "active" } : n === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${gi(t, n)}`, tone: "active" };
  if (e === "binary_sensor" && r && Ee[r]) {
    const [c, d, l, u] = Ee[r];
    if (n === "on") return { verb: c, tone: l ?? "active" };
    if (n === "off") return { verb: d, tone: u ?? "inactive" };
  }
  const o = hi[e]?.[n];
  if (o) return { verb: o[0], tone: o[1] };
  if (fi.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && n === "off") return { verb: "was turned off", tone: "inactive" };
  if (pi.has(e) || n === "on" || n === "off") {
    if (n === "on") return { verb: "was turned on", tone: "active" };
    if (n === "off") return { verb: "was turned off", tone: "inactive" };
  }
  const a = i ? _i(t, i, n) : oe(n);
  return { verb: `changed to ${Ge(a, 80)}`, tone: "neutral" };
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
  activity: "meaningful",
  chatty: "summarize",
  show_diagnostic: !1,
  collapse_repeats: !0
}, T = { hours: [1, 720], entries: [1, 500] }, Ce = 60 * 1e3, bi = 10 * 60 * 1e3, Te = 5 * 60 * 1e3;
function Je(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function Ze(t, [e, i], n) {
  const s = typeof t == "number" ? t : Number(t);
  return Number.isFinite(s) ? Math.min(i, Math.max(e, Math.round(s))) : n;
}
function X(t) {
  return Ze(t.hours_to_show, T.hours, g.hours_to_show);
}
function yi(t) {
  return Ze(t.max_entries, T.entries, g.max_entries);
}
function Xe(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function Qe(t, e, i, n) {
  const s = Xe(t);
  if (n && t.entity_id && !(e.show_diagnostic ?? g.show_diagnostic)) {
    const o = n.entities?.[t.entity_id], a = [e.target?.entity_id ?? []].flat().includes(t.entity_id);
    if (o && (o.entity_category || o.hidden) && !a) return !1;
  }
  return !(i && (!t.entity_id || !i.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(s) || e.exclude_domains?.includes(s) || (e.activity ?? g.activity) === "meaningful" && !ii(t, e, n) || (e.hide_unavailable ?? g.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function wi(t, e, i) {
  const n = Xe(e), s = e.entity_id ? t.states[e.entity_id] : void 0, r = e.name ?? s?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let o, a = "neutral", c = Zt(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: o, tone: a } = vi(t, n, e.entity_id, e.state));
  else {
    const _ = e.message ?? "did something";
    if (_.match(/^triggered(?: by (.+))?$/)) {
      o = "was triggered", a = "active";
      const x = Xt(t, e);
      x && (c = { ...c, trigger: x });
    } else
      o = _, a = /(error|fail)/i.test(_) ? "alert" : "neutral";
  }
  const d = c?.actor;
  d && !d.icon && (d.icon = It[d.kind]);
  const l = n === "person", u = l ? s?.attributes.entity_picture : void 0, p = i.state_color ?? g.state_color;
  return {
    key: Je(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: n,
    name: r,
    verb: o,
    tone: a,
    icon: Pt(n, e.icon),
    stateValue: e.state,
    picture: u,
    isPerson: l,
    isRun: e.state === void 0 && e.message !== void 0 && /^triggered/.test(e.message),
    cause: c,
    count: 1,
    accent: F(n, s?.attributes.device_class, e.state, a, p)
  };
}
function Oe(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function $i(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const i = Ut[t.state ?? ""];
  return i ? e.items.some(
    (n) => n.entityId === t.entity_id && n.phase === i && Math.abs(n.when - t.when * 1e3) <= Nt
  ) : !1;
}
function xi(t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of t) {
    const n = i.cause?.actor;
    if (!n?.entityId || n.kind !== "automation" && n.kind !== "script") continue;
    for (const o of t)
      o.isRun && o.entityId === n.entityId && Math.abs(o.when - i.when) <= Ce && e.add(o);
    const s = i.cause?.triggerEntityId;
    if (!s) continue;
    const r = t.find(
      (o) => o !== i && !o.isRun && o.entityId === s && o.when <= i.when + 5e3 && i.when - o.when <= Ce
    );
    r && (e.add(r), i.cause = { ...i.cause, trigger: `${r.name} ${r.verb}` });
  }
  return t.filter((i) => !e.has(i));
}
function Ai(t, e, i, n, s, r) {
  const o = n - X(i) * 36e5, a = yi(i), c = i.collapse_repeats ?? g.collapse_repeats, d = [...e].filter((m) => {
    const v = m.when * 1e3;
    return v >= o && v <= n + Te;
  }).filter((m) => Qe(m, i, s, t)).filter((m) => !$i(m, r)).sort((m, v) => v.when - m.when), l = (r?.items ?? []).filter(
    (m) => m.when >= o && m.when <= n + Te
  ), u = xi(
    [...d.map((m) => wi(t, m, i)), ...l].sort(
      (m, v) => v.when - m.when
    )
  ), p = ui(oi(u, i.chatty ?? g.chatty)), _ = [];
  let b = 0;
  for (const m of p) {
    const v = _[_.length - 1];
    if (c && v && !m.rich && !v.rich && m.entityId && v.entityId === m.entityId && v.verb === m.verb && Oe(v) === Oe(m) && b - m.when <= bi) {
      v.count += 1, b = m.when;
      continue;
    }
    if (_.push(m), b = m.when, _.length > a) break;
  }
  const x = _.slice(0, a);
  (i.order ?? g.order) === "oldest_first" && x.reverse();
  const W = [];
  for (const m of x) {
    const v = kt(m.when);
    let U = W[W.length - 1];
    (!U || U.key !== v) && (U = { key: v, label: Tt(m.when, n), items: [] }, W.push(U)), U.items.push(m);
  }
  return W;
}
function ki(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const i = t.cause;
  return i?.actor && (e += ` by ${i.actor.name}`), i?.trigger && (e += `, triggered by ${i.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), e;
}
var Si = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, R = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Ei(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Si(e, i, s), s;
};
const Me = 3e3, Ci = 6e4;
let $ = class extends O {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._registryRefs = [];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Di), document.createElement("what-happened-card-editor");
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
    }, Ci), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    const i = e.vacuum_details === !1 ? [] : Dt(t).filter((r) => this._vacuumVisible(r, e)), n = JSON.stringify([...i].sort());
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
    Bt(e.target) && (i = Vt(t, e.target));
    const n = X(e), s = JSON.stringify([n, i ? [...i].sort() : null]);
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
    Ot(
      t,
      (a) => {
        if (r !== this._subToken) return;
        const c = this._config;
        for (const d of a)
          c && !Qe(d, c, this._allowed, this._hass) || this._entries.set(Je(d), d);
        this._entries.size > Me && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
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
    this._entries = new Map(t.slice(0, Me));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    !this._hass || !this._config || (this._now = Date.now(), this._groups = Ai(
      this._hass,
      this._entries.values(),
      this._config,
      this._now,
      this._allowed,
      this._extraItems()
    ));
  }
  _extraItems() {
    const t = this._hass, e = this._config, i = /* @__PURE__ */ new Set(), n = [];
    if (t && e)
      for (const s of this._vacuums.values())
        !s.log.length && !s.runs.length || (i.add(s.entityId), n.push(...Lt(t, s, e)));
    return { items: n, vacuums: i };
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
    if (!t) return h;
    const e = this._groups.reduce((s, r) => s + r.items.length, 0), i = this._groups[this._groups.length - 1], n = i?.items[i.items.length - 1]?.key;
    return f`
      <ha-card
        class=${B({
      compact: t.compact ?? g.compact,
      "has-header": !!t.title
    })}
        style=${Z({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? f`<h1 class="card-header">${t.title}</h1>` : h}
        <div class="scroll">
          ${this._error ? f`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? f`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : f`<ol>
                      ${this._groups.map((s) => this._renderGroup(s, t, n))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = X(t), i = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, n = e === 1 ? "No activity in the last hour" : `No activity in the last ${i}`;
    return f`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${n}
    </div>`;
  }
  _renderGroup(t, e, i) {
    const n = e.show_day_headers ?? g.show_day_headers;
    return f`
      ${n ? f`<li class="day" role="presentation">${t.label}</li>` : h}
      ${t.items.map((s) => this._renderItem(s, e, s.key === i))}
    `;
  }
  _renderIcon(t) {
    const e = t.entityId && !t.fixedIcon ? this._hass?.states[t.entityId] : void 0;
    return e ? f`<ha-state-icon
          .hass=${this._hass}
          .stateObj=${e}
          .stateValue=${t.stateValue}
        ></ha-state-icon>` : f`<ha-icon .icon=${t.icon}></ha-icon>`;
  }
  _renderItem(t, e, i) {
    const n = e.show_avatars ?? g.show_avatars, s = e.show_cause ?? g.show_cause, r = !!t.entityId && (e.tap_action ?? g.tap_action) !== "none", o = n && t.picture;
    return f`
      <li class=${B({ item: !0, last: i })}>
        <div class="rail">
          <div
            class=${B({ node: !0, photo: !!o })}
            style=${Z({ "--accent": t.accent })}
          >
            ${o ? f`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${B({ row: !0, clickable: r })}
          style=${Z({ "--accent": t.accent })}
          role=${r ? "button" : "text"}
          tabindex=${r ? "0" : "-1"}
          aria-label=${ki(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : f`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? f`<span class="count">×${t.count}</span>` : h}
            </div>
            ${t.details?.length ? f`<div class="secondary">${t.details.join(" · ")}</div>` : h}
            ${s ? this._renderCause(t, n) : h}
          </div>
          ${this._renderTime(t, e)}
        </div>
      </li>
    `;
  }
  _renderAvatar(t) {
    return t.picture ? f`<img class="avatar" src=${t.picture} alt="" loading="lazy" />` : f`<span class="avatar initial">${t.name.charAt(0).toUpperCase()}</span>`;
  }
  _renderCause(t, e) {
    const i = t.cause;
    if (!i || !i.actor && !i.trigger) return h;
    const n = i.actor, s = !!n?.entityId && (this._config?.tap_action ?? g.tap_action) !== "none";
    return f`
      <div class="secondary">
        ${n ? f`by${e && n.kind === "user" ? this._renderAvatar(n) : h}
              ${s ? f`<button
                      class="link"
                      type="button"
                      title=${n.detail ? `${n.name} – ${n.detail}` : n.name}
                      @click=${(r) => {
      r.stopPropagation(), this._moreInfo(n.entityId);
    }}
                      @keydown=${(r) => r.stopPropagation()}
                    >
                      ${n.name}
                    </button>` : f`<span title=${n.detail ?? n.name}>${n.name}</span>`}` : h}${n && i.trigger ? ", " : h}${i.trigger ? f`${n ? "triggered by" : "by"} ${i.trigger}` : h}
      </div>
    `;
  }
  _renderTime(t, e) {
    const i = e.time_display ?? g.time_display, n = Fe(t.when, this._hass), s = Ct(t.when, this._now);
    return f`
      <div class="time" title=${Et(t.when, this._hass)}>
        ${i !== "relative" ? f`<span class="abs">${n}</span>` : h}
        ${i !== "absolute" ? f`<span class="rel">${s}</span>` : h}
      </div>
    `;
  }
};
$.styles = Wt;
R([
  P()
], $.prototype, "_config", 2);
R([
  P()
], $.prototype, "_groups", 2);
R([
  P()
], $.prototype, "_loading", 2);
R([
  P()
], $.prototype, "_error", 2);
R([
  P()
], $.prototype, "_now", 2);
$ = R([
  je("what-happened-card")
], $);
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
var Ti = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, ae = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Oi(e, i) : e, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (s = (n ? o(e, i, s) : o(s)) || s);
  return n && s && Ti(e, i, s), s;
};
const Ie = [
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
].map((t) => ({ value: t, label: t })), Mi = {
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
  show_runs: "Show automation and script runs",
  chatty: "Very frequent entities",
  show_diagnostic: "Include diagnostic, configuration and hidden entities",
  hide_unavailable: "Hide unavailable / unknown states",
  collapse_repeats: "Merge rapid repeats of the same event"
}, Ii = {
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  activity: "Recommended hides clocks, text and number sensors, update entities and automation runs that changed nothing you can see.",
  chatty: "Entities with at least 10 entries at a pace of one per hour or faster, such as a clock sensor or an automation that runs every 15 minutes.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, Pi = [
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
], Ri = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: Ie }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: Ie }
    }
  }
], Ui = [
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
], Ni = [
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
  { name: "show_runs", selector: { boolean: {} } },
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
  { name: "show_diagnostic", selector: { boolean: {} } },
  { name: "vacuum_details", selector: { boolean: {} } },
  { name: "hide_unavailable", selector: { boolean: {} } },
  { name: "collapse_repeats", selector: { boolean: {} } }
], Hi = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: Ri },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: Ui },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: Ni }
];
let I = class extends O {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Mi[t.name] ?? t.name, this._computeHelper = (t) => Ii[t.name];
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
    for (const [n, s] of Object.entries(e))
      n === "type" || s === void 0 || s === "" || Array.isArray(s) && s.length === 0 || n === "target" && (!s || Object.keys(s).length === 0) || g[n] === s && !(n in this._config) || (i[n] = s);
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _form(t) {
    return f`<ha-form
      .hass=${this.hass}
      .data=${this._data()}
      .schema=${t}
      .computeLabel=${this._computeLabel}
      .computeHelper=${this._computeHelper}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }
  render() {
    return !this.hass || !this._config ? h : f`
      ${this._form(Pi)}
      ${Hi.map(
      (t) => f`
          <ha-expansion-panel outlined .header=${t.header} .expanded=${t.id === "source"}>
            <ha-icon slot="leading-icon" .icon=${t.icon}></ha-icon>
            <div class="panel-content">${this._form(t.schema)}</div>
          </ha-expansion-panel>
        `
    )}
    `;
  }
};
I.styles = Re`
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
ae([
  ze({ attribute: !1 })
], I.prototype, "hass", 2);
ae([
  P()
], I.prototype, "_config", 2);
I = ae([
  je("what-happened-card-editor")
], I);
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return I;
  }
}, Symbol.toStringTag, { value: "Module" }));
