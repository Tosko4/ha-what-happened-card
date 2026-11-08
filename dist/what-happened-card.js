/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, ue = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = Symbol(), Ce = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== he) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ue && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = Ce.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ce.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const It = (t) => new ot(typeof t == "string" ? t : t + "", void 0, he), rt = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[o + 1], t[0]);
  return new ot(n, t, he);
}, Ct = (t, e) => {
  if (ue) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = Z.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Te = ue ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return It(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Tt, defineProperty: Ot, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Rt, getOwnPropertySymbols: Pt, getPrototypeOf: Nt } = Object, ne = globalThis, Oe = ne.trustedTypes, Dt = Oe ? Oe.emptyScript : "", Ut = ne.reactiveElementPolyfillSupport, V = (t, e) => t, Q = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Dt : null;
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
} }, pe = (t, e) => !Tt(t, e), Me = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: pe };
Symbol.metadata ??= Symbol("metadata"), ne.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Me) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && Ot(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: o } = Mt(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: i, set(r) {
      const a = i?.call(this);
      o?.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties"))) return;
    const e = Nt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const n = this.properties, s = [...Rt(n), ...Pt(n)];
      for (const i of s) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, i] of n) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const i = this._$Eu(n, s);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) n.unshift(Te(i));
    } else e !== void 0 && n.push(Te(e));
    return n;
  }
  static _$Eu(e, n) {
    const s = n.attribute;
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
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const s of n.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ct(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, s) {
    this._$AK(e, s);
  }
  _$ET(e, n) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Q).toAttribute(n, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Q;
      this._$Em = i;
      const a = r.fromAttribute(n, o.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, s, i = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (i === !1 && (o = this[e]), s ??= r.getPropertyOptions(e), !((s.hasChanged ?? pe)(o, n) || s.useDefault && s.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, s)))) return;
      this.C(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: s, reflect: i, wrapped: o }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? n ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: r } = o, a = this[i];
        r !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, o, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[V("elementProperties")] = /* @__PURE__ */ new Map(), R[V("finalized")] = /* @__PURE__ */ new Map(), Ut?.({ ReactiveElement: R }), (ne.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, Re = (t) => t, ee = fe.trustedTypes, Pe = ee ? ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, at = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + S, jt = `<${ct}>`, M = document, F = () => M.createComment(""), K = (t) => t === null || typeof t != "object" && typeof t != "function", me = Array.isArray, Ht = (t) => me(t) || typeof t?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, De = />/g, C = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ue = /'/g, je = /"/g, dt = /^(?:script|style|textarea|title)$/i, zt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), _ = zt(1), E = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), T = M.createTreeWalker(M, 129);
function lt(t, e) {
  if (!me(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pe !== void 0 ? Pe.createHTML(e) : e;
}
const Lt = (t, e) => {
  const n = t.length - 1, s = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = W;
  for (let a = 0; a < n; a++) {
    const c = t[a];
    let d, h, p = -1, g = 0;
    for (; g < c.length && (r.lastIndex = g, h = r.exec(c), h !== null); ) g = r.lastIndex, r === W ? h[1] === "!--" ? r = Ne : h[1] !== void 0 ? r = De : h[2] !== void 0 ? (dt.test(h[2]) && (i = RegExp("</" + h[2], "g")), r = C) : h[3] !== void 0 && (r = C) : r === C ? h[0] === ">" ? (r = i ?? W, p = -1) : h[1] === void 0 ? p = -2 : (p = r.lastIndex - h[2].length, d = h[1], r = h[3] === void 0 ? C : h[3] === '"' ? je : Ue) : r === je || r === Ue ? r = C : r === Ne || r === De ? r = W : (r = C, i = void 0);
    const u = r === C && t[a + 1].startsWith("/>") ? " " : "";
    o += r === W ? c + jt : p >= 0 ? (s.push(d), c.slice(0, p) + at + c.slice(p) + S + u) : c + S + (p === -2 ? a : u);
  }
  return [lt(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Y {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, c = this.parts, [d, h] = Lt(e, n);
    if (this.el = Y.createElement(d, s), T.currentNode = this.el.content, n === 2 || n === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = T.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(at)) {
          const g = h[r++], u = i.getAttribute(p).split(S), f = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: o, name: f[2], strings: u, ctor: f[1] === "." ? Bt : f[1] === "?" ? Vt : f[1] === "@" ? Ft : se }), i.removeAttribute(p);
        } else p.startsWith(S) && (c.push({ type: 6, index: o }), i.removeAttribute(p));
        if (dt.test(i.tagName)) {
          const p = i.textContent.split(S), g = p.length - 1;
          if (g > 0) {
            i.textContent = ee ? ee.emptyScript : "";
            for (let u = 0; u < g; u++) i.append(p[u], F()), T.nextNode(), c.push({ type: 2, index: ++o });
            i.append(p[g], F());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ct) c.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(S, p + 1)) !== -1; ) c.push({ type: 7, index: o }), p += S.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const s = M.createElement("template");
    return s.innerHTML = e, s;
  }
}
function U(t, e, n = t, s) {
  if (e === E) return e;
  let i = s !== void 0 ? n._$Co?.[s] : n._$Cl;
  const o = K(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(t), i._$AT(t, n, s)), s !== void 0 ? (n._$Co ??= [])[s] = i : n._$Cl = i), i !== void 0 && (e = U(t, i._$AS(t, e.values), i, s)), e;
}
class Wt {
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
    const { el: { content: n }, parts: s } = this._$AD, i = (e?.creationScope ?? M).importNode(n, !0);
    T.currentNode = i;
    let o = T.nextNode(), r = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let d;
        c.type === 2 ? d = new q(o, o.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (d = new Kt(o, this, e)), this._$AV.push(d), c = s[++a];
      }
      r !== c?.index && (o = T.nextNode(), r++);
    }
    return T.currentNode = M, i;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, s, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = U(this, e, n), K(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ht(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && K(this._$AH) ? this._$AA.nextSibling.data = e : this.T(M.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Y.createElement(lt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const o = new Wt(i, this), r = o.u(this.options);
      o.p(n), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = He.get(e.strings);
    return n === void 0 && He.set(e.strings, n = new Y(e)), n;
  }
  k(e) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const o of e) i === n.length ? n.push(s = new q(this.O(F()), this.O(F()), this, this.options)) : s = n[i], s._$AI(o), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const s = Re(e).nextSibling;
      Re(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class se {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, i, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = m;
  }
  _$AI(e, n = this, s, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = U(this, e, n, 0), r = !K(e) || e !== this._$AH && e !== E, r && (this._$AH = e);
    else {
      const a = e;
      let c, d;
      for (e = o[0], c = 0; c < o.length - 1; c++) d = U(this, a[s + c], n, c), d === E && (d = this._$AH[c]), r ||= !K(d) || d !== this._$AH[c], d === m ? e = m : e !== m && (e += (d ?? "") + o[c + 1]), this._$AH[c] = d;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Bt extends se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Vt extends se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Ft extends se {
  constructor(e, n, s, i, o) {
    super(e, n, s, i, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = U(this, e, n, 0) ?? m) === E) return;
    const s = this._$AH, i = e === m && s !== m || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== m && (s === m || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Kt {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const Yt = fe.litHtmlPolyfillSupport;
Yt?.(Y, q), (fe.litHtmlVersions ??= []).push("3.3.3");
const qt = (t, e, n) => {
  const s = n?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = n?.renderBefore ?? null;
    s._$litPart$ = i = new q(e.insertBefore(F(), o), o, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = globalThis;
let D = class extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qt(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
};
D._$litElement$ = !0, D.finalized = !0, _e.litElementHydrateSupport?.({ LitElement: D });
const Gt = _e.litElementPolyfillSupport;
Gt?.({ LitElement: D });
(_e.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: pe }, Xt = (t = Jt, e, n) => {
  const { kind: s, metadata: i } = n;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(n.name, t), s === "accessor") {
    const { name: r } = n;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, c, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = n;
    return function(a) {
      const c = this[r];
      e.call(this, a), this.requestUpdate(r, c, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ht(t) {
  return (e, n) => typeof n == "object" ? Xt(t, e, n) : ((s, i, o) => {
    const r = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function H(t) {
  return ht({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = { ATTRIBUTE: 1 }, ft = (t) => (...e) => ({ _$litDirective$: t, values: e });
let mt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, s) {
    this._$Ct = e, this._$AM = n, this._$Ci = s;
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
const B = ft(class extends mt {
  constructor(t) {
    if (super(t), t.type !== pt.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    const n = t.element.classList;
    for (const s of this.st) s in e || (n.remove(s), this.st.delete(s));
    for (const s in e) {
      const i = !!e[s];
      i === this.st.has(s) || this.nt?.has(s) || (i ? (n.add(s), this.st.add(s)) : (n.remove(s), this.st.delete(s)));
    }
    return E;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = "important", Zt = " !" + _t, X = ft(class extends mt {
  constructor(t) {
    if (super(t), t.type !== pt.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, n) => {
      const s = t[n];
      return s == null ? e : e + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(t, [e]) {
    const { style: n } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const s of this.ft) e[s] == null && (this.ft.delete(s), s.includes("-") ? n.removeProperty(s) : n[s] = null);
    for (const s in e) {
      const i = e[s];
      if (i != null) {
        this.ft.add(s);
        const o = typeof i == "string" && i.endsWith(Zt);
        s.includes("-") || o ? n.setProperty(s, o ? i.slice(0, -11) : i, o ? _t : "") : n[s] = i;
      }
    }
    return E;
  }
}), ge = "en-US";
function ze(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function Qt(t) {
  const e = new Date(t), n = (s) => String(s).padStart(2, "0");
  return `${e.getFullYear()}-${n(e.getMonth() + 1)}-${n(e.getDate())}`;
}
function en(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function gt(t, e, n = !1) {
  const s = en(e);
  return new Intl.DateTimeFormat(ge, {
    hour: s ? "numeric" : "2-digit",
    minute: "2-digit",
    second: n ? "2-digit" : void 0,
    hourCycle: s ? "h12" : "h23"
  }).format(t);
}
function tn(t, e) {
  return `${new Intl.DateTimeFormat(ge, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${gt(t, e, !0)}`;
}
function nn(t, e) {
  const n = Math.max(0, Math.round((e - t) / 1e3));
  if (n < 45) return "just now";
  const s = Math.round(n / 60);
  if (s < 60) return `${s} min ago`;
  const i = Math.round(s / 60);
  return i < 24 ? `${i} h ago` : `${Math.round(i / 24)} d ago`;
}
function sn(t, e) {
  const n = Math.round((ze(e) - ze(t)) / 864e5);
  if (n === 0) return "Today";
  if (n === 1) return "Yesterday";
  const s = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(ge, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: s ? void 0 : "numeric"
  }).format(t);
}
function on(t, e, n, s) {
  const i = {
    type: "logbook/event_stream",
    start_time: n.toISOString()
  };
  return s && s.length > 0 && (i.entity_ids = s), t.connection.subscribeMessage(
    (o) => e(o.events ?? []),
    i
  );
}
const rn = 10, an = 1e4, cn = 3;
function ve(t, e) {
  return t.length > e ? `${t.slice(0, e - 1).trimEnd()}…` : t;
}
function Le(t) {
  return t.entityId ?? t.name;
}
function dn(t, e, n = /* @__PURE__ */ new Set()) {
  if (e === "show") return t;
  const s = /* @__PURE__ */ new Map();
  for (const a of t) {
    if (a.rich || a.entityId && n.has(a.entityId)) continue;
    const c = Le(a), d = s.get(c);
    d ? d.push(a) : s.set(c, [a]);
  }
  const i = /* @__PURE__ */ new Set();
  for (const [a, c] of s) {
    if (c.length < rn) continue;
    (c[0].when - c[c.length - 1].when) / 36e5 <= c.length && i.add(a);
  }
  if (i.size === 0) return t;
  const o = [], r = /* @__PURE__ */ new Set();
  for (const a of t) {
    const c = Le(a);
    if (a.rich || !i.has(c) || a.entityId && n.has(a.entityId)) {
      o.push(a);
      continue;
    }
    if (r.has(c) || e === "hide") continue;
    r.add(c);
    const d = s.get(c).length;
    o.push({
      ...a,
      key: `chatty|${c}`,
      verb: a.isRun ? `was triggered ${d} times` : `changed ${d} times`,
      details: a.isRun ? void 0 : [`latest: ${ve(a.verb, 70)}`],
      isRun: !1,
      count: 1,
      rich: !0
    });
  }
  return o;
}
const ln = {
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
function un(t) {
  return ln[t] ?? `${t.replace(/_/g, " ")} entities`;
}
function hn(t) {
  return t.startsWith("was ") ? `were ${t.slice(4)}` : t.startsWith("is ") ? `are ${t.slice(3)}` : t;
}
function pn(t, e) {
  return (t.cause?.actor?.name ?? "") === (e.cause?.actor?.name ?? "") && (t.cause?.trigger ?? "") === (e.cause?.trigger ?? "");
}
function fn(t) {
  const e = /* @__PURE__ */ new Map(), n = [];
  for (const i of t) {
    if (i.rich || !i.entityId) continue;
    const o = `${i.domain}|${i.verb}|${i.tone}`, r = e.get(o);
    if (r && r.oldest - i.when <= an)
      r.members.push(i), r.oldest = i.when;
    else {
      const a = { members: [i], oldest: i.when };
      e.set(o, a), n.push(a);
    }
  }
  const s = /* @__PURE__ */ new Map();
  for (const { members: i } of n) {
    const o = new Set(i.map((d) => d.entityId));
    if (o.size < cn) continue;
    const r = i[0], a = [...new Set(i.map((d) => d.name))], c = a.slice(0, 6).join(", ");
    s.set(r, {
      ...r,
      key: `burst|${r.key}`,
      entityId: void 0,
      name: `${o.size} ${un(r.domain)}`,
      verb: hn(r.verb),
      details: [a.length > 6 ? `${c} and ${a.length - 6} more` : c],
      cause: i.every((d) => pn(d, r)) ? r.cause : void 0,
      count: 1,
      stateValue: void 0,
      rich: !0
    });
    for (const d of i.slice(1)) s.set(d, null);
  }
  return s.size === 0 ? t : t.flatMap((i) => {
    if (!s.has(i)) return [i];
    const o = s.get(i);
    return o ? [o] : [];
  });
}
const mn = 3e4;
function _n(t, e, n = /* @__PURE__ */ new Set()) {
  const s = /* @__PURE__ */ new Set();
  for (const i of e) {
    if (i.rich || !i.entityId) continue;
    const o = t.states[i.entityId]?.attributes.entity_id;
    if (!Array.isArray(o) || o.length === 0) continue;
    const r = new Set(o.filter((a) => typeof a == "string"));
    for (const a of e)
      a !== i && !a.rich && a.entityId && !n.has(a.entityId) && r.has(a.entityId) && a.verb === i.verb && Math.abs(a.when - i.when) <= mn && s.add(a);
  }
  return s.size ? e.filter((i) => !s.has(i)) : e;
}
const gn = 200;
function re(t) {
  return typeof t == "string" ? t.split(",").map((e) => e.trim()) : Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
}
function We(t) {
  return typeof t == "string" && t.trim() ? ve(t.trim(), gn) : void 0;
}
function vn(t) {
  const e = [];
  for (const [n, s] of Object.entries(t.trace ?? {}))
    if (!(!n.startsWith("action/") && !n.startsWith("sequence/")))
      for (const i of s) {
        const o = i.result?.params;
        if (!o?.domain || !o.service) continue;
        const r = o.service_data ?? {}, a = We(r.message);
        if (!a) continue;
        const c = `${o.domain}.${o.service}`;
        if (o.domain === "tts") {
          const d = [
            ...re(r.media_player_entity_id),
            ...re(r.entity_id),
            ...re(o.target?.entity_id)
          ].filter((h) => h.startsWith("media_player."));
          e.push({ kind: "say", text: a, speakers: [...new Set(d)], service: c });
        } else (o.domain === "notify" || o.domain === "persistent_notification") && e.push({
          kind: "notify",
          text: a,
          title: We(r.title),
          speakers: [],
          service: c
        });
      }
  return e;
}
function ae(t, e, n, s = 5e3) {
  let i, o = 1 / 0;
  for (const r of t) {
    const a = Date.parse(r.timestamp.start);
    if (Number.isNaN(a) || a > e + s || e - a > n) continue;
    const c = Math.abs(e - a);
    c < o && (i = r, o = c);
  }
  return i;
}
const yn = 45e3, bn = 6e4;
class wn {
  constructor(e) {
    this.hass = e, this.lists = /* @__PURE__ */ new Map(), this.details = /* @__PURE__ */ new Map(), this.tried = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  setHass(e) {
    this.hass = e;
  }
  item(e) {
    const [n, s] = e.split(".");
    if (n === "script") return { domain: n, itemId: s };
    if (n === "automation") {
      const i = this.hass.states[e]?.attributes.id;
      return typeof i == "string" || typeof i == "number" ? { domain: n, itemId: String(i) } : void 0;
    }
  }
  /** The trace of the run behind something that happened at `whenMs`, if it is already loaded. */
  lookup(e, n, s) {
    const i = this.item(e), o = i && this.lists.get(`${i.domain}|${i.itemId}`), r = o && ae(o.runs, n, s);
    return i && r ? this.details.get(`${i.domain}|${i.itemId}|${r.run_id}`) : void 0;
  }
  /** Load what `lookup` needs. Resolves when done; failures (no admin rights, no trace) are quiet. */
  ensure(e, n, s) {
    const i = this.item(e);
    if (!i) return;
    const o = `${i.domain}|${i.itemId}`, r = this.lists.get(o), a = r && ae(r.runs, n, s);
    if (a && this.details.has(`${o}|${a.run_id}`)) return;
    const c = `${o}|${a?.run_id ?? Math.floor(n / 6e4)}`, d = this.tried.get(c);
    if (d && Date.now() - d < bn) return;
    const h = this.inflight.get(c);
    if (h) return h;
    const p = (async () => {
      this.tried.set(c, Date.now());
      try {
        let g = this.lists.get(o);
        if (!g || Date.now() - g.at > yn) {
          const f = await this.hass.callWS({
            type: "trace/list",
            domain: i.domain,
            item_id: i.itemId
          });
          g = { at: Date.now(), runs: Array.isArray(f) ? f : [] }, this.lists.set(o, g);
        }
        const u = ae(g.runs, n, s);
        if (u && !this.details.has(`${o}|${u.run_id}`)) {
          const f = await this.hass.callWS({
            type: "trace/get",
            domain: i.domain,
            item_id: i.itemId,
            run_id: u.run_id
          });
          this.details.set(`${o}|${u.run_id}`, f);
        }
      } catch {
      } finally {
        this.inflight.delete(c);
      }
    })();
    return this.inflight.set(c, p), p;
  }
}
const $n = "mdi:information-outline", ye = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function xn(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : $n);
}
function O(t, e, n, s, i) {
  const o = "var(--state-icon-color, var(--primary-text-color))";
  if (i && t === "vacuum" && s !== "alert" && s !== "unavailable") {
    const r = "var(--state-vacuum-active-color, var(--teal-color, #009688))";
    return n ? `var(--state-vacuum-${n}-color, ${r})` : r;
  }
  if (!i) return s === "unavailable" ? "var(--state-unavailable-color)" : o;
  switch (s) {
    case "unavailable":
      return "var(--state-unavailable-color, var(--disabled-text-color))";
    case "alert":
      return "var(--error-color)";
    case "inactive":
      return `var(--state-${t}-inactive-color, var(--state-inactive-color, ${o}))`;
    case "active": {
      const r = `var(--state-${t}-active-color, var(--state-active-color, ${o}))`, a = n ? `var(--state-${t}-${n}-color, ${r})` : r;
      return e && n ? `var(--state-${t}-${e}-${n}-color, ${a})` : a;
    }
    default:
      return o;
  }
}
const Be = "var(--error-color)", kn = "tapo_rv30", Ve = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice"
}, An = {
  cleaning: "start",
  docked: "finish"
}, Sn = 10 * 60 * 1e3, En = /* @__PURE__ */ new Set(["start", "done", "override", "return", "docked", "skip", "error"]), vt = 300;
function In(t) {
  return Object.values(t.entities ?? {}).filter((e) => e.platform === kn && e.entity_id.startsWith("vacuum.")).map((e) => e.entity_id);
}
function Fe(t) {
  const e = t.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  return e ? { byUser: e[1] === "You started", names: e[2], why: e[3]?.replace(/\.$/, "") } : { byUser: t.startsWith("You") };
}
function Cn(t, e, n) {
  let s;
  for (const i of t) {
    if (i.kind !== "start" || n.has(i)) continue;
    const o = Math.abs(i.ts - e);
    o <= vt && (!s || o < Math.abs(s.ts - e)) && (s = i);
  }
  return s;
}
function Tn(t) {
  const e = t.match(/^(.+?) came home: (.*?)\.?$/s);
  return e ? { people: e[1], note: e[2] } : void 0;
}
function On(t, e) {
  const n = e.split(/, | and /).map((i) => i.trim()), s = n.length === 1 ? Object.values(t.states).find(
    (i) => i.entity_id.startsWith("person.") && i.attributes.friendly_name === n[0]
  ) : void 0;
  return {
    kind: "user",
    name: e,
    entityId: s?.entity_id,
    picture: s?.attributes.entity_picture
  };
}
function Ke() {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}
function Ye(t) {
  return { kind: "user", name: t.user?.name ?? "You" };
}
function Mn(t) {
  const e = [];
  return t.minutes != null && e.push(`${t.minutes} min`), t.area != null && e.push(`${t.area} m²`), t.emptied_bin && e.push("bin emptied"), e;
}
function Rn(t, e, n) {
  const i = t.states[e.entityId]?.attributes.friendly_name ?? e.entityId, o = n.state_color ?? !0, r = [], a = /* @__PURE__ */ new Set(), c = {
    entityId: e.entityId,
    domain: "vacuum",
    name: i,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    fixedIcon: !0
  };
  for (const u of e.runs) {
    const f = Cn(e.log, u.started, a);
    f && a.add(f);
    const b = f ? Fe(f.text) : void 0, x = !!u.error;
    let $;
    f && b ? $ = { actor: b.byUser ? Ye(t) : Ke(), trigger: b.why } : u.start_type != null && Ve[u.start_type] && ($ = {
      actor: { kind: "other", name: Ve[u.start_type], icon: "mdi:gesture-tap" }
    }), r.push({
      ...c,
      key: `vac|${e.entityId}|start|${u.started}`,
      when: u.started * 1e3,
      verb: b?.names ? `started cleaning ${b.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: u.rule_name ? [`preset “${u.rule_name}”`] : void 0,
      cause: $,
      accent: O("vacuum", void 0, "cleaning", "active", o)
    });
    const y = (u.started + (u.minutes ?? 0) * 60) * 1e3;
    r.push({
      ...c,
      key: `vac|${e.entityId}|finish|${u.started}`,
      when: Math.max(y, u.started * 1e3 + 1e3),
      verb: x ? `stopped with error ${u.error}` : b?.names ? `finished cleaning ${b.names}` : "finished cleaning",
      tone: x ? "alert" : "inactive",
      phase: "finish",
      icon: x ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: Mn(u),
      accent: x ? Be : O("vacuum", void 0, "docked", "inactive", o)
    });
  }
  const d = e.log.filter((u) => u.kind === "return"), h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set();
  for (const u of e.log.filter((f) => f.kind === "docked")) {
    const f = d.find(
      (b) => !p.has(b) && b.ts <= u.ts && u.ts - b.ts <= 1800
    );
    f && (h.set(u, f), p.add(f));
  }
  const g = new Set(e.runs.map((u) => u.started));
  for (const u of e.log) {
    if (!En.has(u.kind) || a.has(u) || u.kind === "done" && e.runs.length > 0 || u.kind === "start" && [...g].some((y) => Math.abs(y - u.ts) <= vt) || p.has(u)) continue;
    const f = u.kind === "start" ? Fe(u.text) : void 0, b = u.kind === "docked" ? h.get(u) : void 0, x = b ? Tn(b.text) : void 0;
    if (x) {
      r.push({
        ...c,
        key: `vac|${e.entityId}|log|${u.ts}|docked`,
        when: u.ts * 1e3,
        verb: "was sent home",
        tone: "neutral",
        icon: "mdi:robot-vacuum",
        details: [x.note.charAt(0).toUpperCase() + x.note.slice(1)],
        cause: { actor: On(t, x.people), trigger: "coming home" },
        accent: O("vacuum", void 0, "docked", "inactive", o)
      });
      continue;
    }
    const $ = u.kind === "error" ? "alert" : u.kind === "start" ? "active" : "neutral";
    r.push({
      ...c,
      key: `vac|${e.entityId}|log|${u.ts}|${u.kind}`,
      when: u.ts * 1e3,
      verb: f?.names ? `started cleaning ${f.names}` : "",
      text: f?.names ? void 0 : u.text.replace(/\.$/, ""),
      tone: $,
      phase: u.kind === "start" ? "start" : u.kind === "done" ? "finish" : void 0,
      icon: u.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      cause: { actor: f?.byUser ? Ye(t) : Ke(), trigger: f?.why },
      accent: $ === "alert" ? Be : O(
        "vacuum",
        void 0,
        "cleaning",
        $ === "active" ? "active" : "neutral",
        o
      )
    });
  }
  return r;
}
const Pn = rt`
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
  .effects {
    list-style: none;
    margin: var(--ha-space-2, 8px) 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-1, 4px);
  }
  .effect {
    display: flex;
    align-items: flex-start;
    gap: var(--ha-space-2, 8px);
    padding: 2px var(--ha-space-1, 4px);
    margin: 0 calc(-1 * var(--ha-space-1, 4px));
    border-radius: var(--ha-border-radius-sm, 4px);
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-m, 14px);
    line-height: 1.3;
    outline: none;
  }
  .effect.clickable {
    cursor: pointer;
  }
  .effect.clickable:hover {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }
  .effect.clickable:focus-visible {
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .e-icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    color: var(--accent);
    --mdc-icon-size: 16px;
  }
  .e-icon ha-state-icon,
  .e-icon ha-icon {
    display: block;
    width: 16px;
    height: 16px;
  }
  .e-name {
    font-weight: var(--ha-font-weight-medium, 500);
  }
  .e-count {
    color: var(--wh-secondary);
    font-weight: var(--ha-font-weight-medium, 500);
  }
  .e-details {
    color: var(--wh-secondary);
    font-size: var(--ha-font-size-s, 12px);
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
function P(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Nn(t) {
  return t ? Object.values(t).some((e) => P(e).length > 0) : !1;
}
function yt(t, e) {
  const n = /* @__PURE__ */ new Set(), s = t.entities ?? {}, i = t.devices ?? {}, o = t.areas ?? {}, r = new Set(P(e.area_id));
  for (const d of P(e.floor_id))
    for (const h of Object.values(o))
      h.floor_id === d && r.add(h.area_id);
  const a = new Set(P(e.device_id)), c = new Set(P(e.label_id));
  for (const d of P(e.entity_id)) n.add(d);
  for (const d of Object.values(s)) {
    const h = d.device_id ? i[d.device_id] : void 0, p = d.area_id ?? h?.area_id ?? void 0;
    p && r.has(p) && n.add(d.entity_id), d.device_id && a.has(d.device_id) && n.add(d.entity_id), d.labels?.some((g) => c.has(g)) && n.add(d.entity_id), h?.labels?.some((g) => c.has(g)) && n.add(d.entity_id);
  }
  return n;
}
const Dn = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function bt(t, e) {
  return e.replace(Dn, (n) => t.states[n]?.attributes.friendly_name ?? n);
}
function Un(t, e) {
  for (const [n, s] of Object.entries(t.states))
    if (n.startsWith("person.") && s.attributes.user_id === e)
      return {
        entityId: n,
        name: s.attributes.friendly_name ?? n,
        picture: s.attributes.entity_picture
      };
}
function be(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function jn(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function wt(t) {
  return t.replace(/event 'automation_triggered'/g, "another automation");
}
function Hn(t, e) {
  let n = e.context_source;
  return !n && e.context_message?.startsWith("triggered by ") && (n = e.context_message.slice(13)), n ? wt(bt(t, n)) : void 0;
}
function zn(t, e) {
  const n = Un(t, e);
  return n ? { kind: "user", name: n.name, entityId: n.entityId, picture: n.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function qe(t, e, n) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? n ?? e ?? "Unknown";
}
function Ln(t, e) {
  const n = e.context_event_type;
  if (n === "automation_triggered" || n === "script_started")
    return {
      actor: {
        kind: n === "automation_triggered" ? "automation" : "script",
        name: qe(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: Hn(t, e),
      triggerEntityId: be(jn(e))
    };
  if (e.context_user_id) {
    const s = zn(t, e.context_user_id);
    return e.context_domain && e.context_service && (s.detail = `${e.context_domain}.${e.context_service}`), { actor: s };
  }
  if (n === "call_service" && e.context_domain && e.context_service) {
    const s = `${e.context_domain}.${e.context_service}`;
    return e.context_domain === "scene" ? { actor: { kind: "scene", name: "A scene", detail: s } } : { actor: { kind: "service", name: s, detail: s } };
  }
  if (n === "logbook_entry" && e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
  if (e.context_entity_id)
    return { actor: {
      kind: "entity",
      name: qe(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function Wn(t, e) {
  const n = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return n ? wt(bt(t, n)) : void 0;
}
const Bn = 9e4;
function Vn(t, e) {
  return e.map((n) => t.states[n]?.attributes.friendly_name ?? n).join(", ");
}
function Fn(t, e, n, s, i, o, r) {
  const a = s.kind === "say";
  return {
    key: `action|${e.key}|${i}`,
    when: e.when,
    entityId: a ? s.speakers[0] : void 0,
    domain: a ? "media_player" : "notify",
    name: a ? s.speakers.length ? Vn(t, s.speakers) : "Speaker" : "Notification",
    verb: a ? `said “${s.text}”` : `sent “${s.title ? `${s.title}: ` : ""}${s.text}”`,
    tone: "active",
    icon: a ? "mdi:bullhorn" : "mdi:bell-ring",
    fixedIcon: !0,
    isPerson: !1,
    isRun: !1,
    count: 1,
    rich: !0,
    cause: {
      actor: n,
      by: r,
      trigger: e.cause?.trigger,
      triggerEntityId: e.cause?.triggerEntityId
    },
    accent: O("media_player", void 0, "playing", "active", o)
  };
}
function Kn(t, e, n, s, i, o = /* @__PURE__ */ new Set()) {
  const r = /* @__PURE__ */ new Set(), a = [];
  for (const c of e) {
    if (!c.isRun || c.rich || (n !== "all" && !(c.entityId && o.has(c.entityId)) && r.add(c), n === "none" || !i)) continue;
    const d = i(c) ?? [], h = c.domain === "script" ? "script" : "automation", p = { kind: h, name: c.name, entityId: c.entityId, icon: ye[h] }, g = c.cause?.actor?.kind === "user" ? c.cause.actor : void 0, u = g ? p : c.cause?.actor ?? p, f = /* @__PURE__ */ new Set([c.entityId, u.entityId]);
    d.forEach((b, x) => {
      a.push(Fn(t, c, u, b, x, s, g));
      for (const $ of e)
        $ !== c && $.entityId && b.speakers.includes($.entityId) && f.has($.cause?.actor?.entityId) && Math.abs($.when - c.when) <= Bn && r.add($);
    });
  }
  return [...e.filter((c) => !r.has(c)), ...a];
}
const Yn = /* @__PURE__ */ new Set([
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
]), qn = /* @__PURE__ */ new Set([
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
]), Gn = /* @__PURE__ */ new Set([
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
]), Jn = /* @__PURE__ */ new Set(["person", "device_tracker", "homeassistant"]), Ge = /* @__PURE__ */ new WeakMap();
function G(t, e) {
  const n = Ge.get(t);
  if (n && n.entities === e?.entities && n.devices === e?.devices) return n.ids;
  const s = new Set([t.target?.entity_id ?? [], t.also_show_entities ?? []].flat());
  if (e && t.also_show_labels?.length)
    for (const i of yt(e, { label_id: t.also_show_labels }))
      s.add(i);
  return Ge.set(t, { entities: e?.entities, devices: e?.devices, ids: s }), s;
}
function we(t) {
  const e = t.domain ?? t.entity_id?.split(".")[0];
  return (e === "automation" || e === "script") && t.state === void 0 && t.message !== void 0;
}
function $t(t) {
  return !!(t.context_user_id || t.context_event_type || t.context_entity_id || t.context_name || t.context_service);
}
function Xn(t, e, n) {
  const s = t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
  if (t.entity_id && G(e, n).has(t.entity_id) || e.also_show_domains?.includes(s) || e.include_domains?.length || we(t)) return !0;
  if (qn.has(s)) return !!t.context_user_id;
  if (s === "binary_sensor") {
    const i = t.entity_id && n?.states[t.entity_id]?.attributes.device_class;
    return i ? Gn.has(i) : $t(t);
  }
  return Yn.has(s);
}
const Je = {
  red: "#f44336",
  pink: "#e91e63",
  purple: "#926bc7",
  "deep-purple": "#6e41ab",
  indigo: "#3f51b5",
  blue: "#2196f3",
  "light-blue": "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  "light-green": "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  "deep-orange": "#ff6f22",
  brown: "#795548",
  "light-grey": "#bdbdbd",
  grey: "#9e9e9e",
  "dark-grey": "#606060",
  "blue-grey": "#607d8b",
  black: "#000000",
  white: "#ffffff"
};
function Zn(t) {
  const e = t.trim();
  return e in Je ? `var(--${e}-color, ${Je[e]})` : e === "primary" ? "var(--primary-color)" : e;
}
function Xe(t, e, n) {
  if (!t?.length) return;
  let s, i;
  for (const r of t)
    !r?.match || !r.color || (r.match.includes(".") ? r.match === e && (i = r.color) : r.match === n && (s = r.color));
  const o = i ?? s;
  return o ? Zn(o) : void 0;
}
function Qn(t, e) {
  const n = e.colors;
  if (!n?.length) return t;
  for (const s of t) {
    const i = Xe(n, s.entityId, s.domain);
    i && (s.accent = i);
    for (const o of s.effects ?? []) {
      const r = Xe(n, o.entityId, o.domain);
      r && (o.accent = r);
    }
  }
  return t;
}
const es = 3e4, ts = 5e3, ns = 1e4, Ze = 3e4;
function ss(t) {
  return {
    key: t.key,
    domain: t.domain,
    name: t.name,
    verb: t.verb,
    entityId: t.entityId,
    icon: t.icon,
    fixedIcon: t.fixedIcon,
    stateValue: t.stateValue,
    accent: t.accent,
    details: t.details
  };
}
function is(t) {
  const e = /* @__PURE__ */ new Set(), n = [];
  for (const s of t) {
    const i = s.cause?.actor, o = i?.entityId ?? i?.name;
    i && (i.kind === "automation" || i.kind === "script") && o && !e.has(o) && (e.add(o), n.push(i));
  }
  return n;
}
function Qe(t) {
  return t.domain === "script" && !t.isRun && /^was turned (on|off)$/.test(t.verb);
}
function os(t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of t) {
    const s = n.entityId ?? n.name;
    e.has(s) || e.set(s, { ...n, verb: "ran", stateValue: void 0, tone: "active" });
  }
  return [...e.values()];
}
function rs(t) {
  const e = [];
  for (const n of t) {
    const s = e[e.length - 1];
    s && s.name === n.name && s.verb === n.verb && (s.details ?? []).join() === (n.details ?? []).join() ? s.count = (s.count ?? 1) + 1 : e.push({ ...n });
  }
  return e;
}
function as(t) {
  const e = t.find((s) => s.cause?.by)?.cause?.by, n = cs(t);
  return e || n ? { actor: e, ...n } : void 0;
}
function cs(t) {
  const e = t.find((n) => n.cause?.trigger);
  return e ? {
    trigger: e.cause.trigger,
    triggerEntityId: e.cause.triggerEntityId
  } : void 0;
}
function ds(t, e) {
  const n = t.cause, s = n?.triggerEntityId ?? n?.source?.entityId;
  return s ? `entity|${s}` : e && n?.trigger ? `text|${n.trigger}` : void 0;
}
function ls(t) {
  return t.flatMap((e) => {
    const n = e.some((a) => a.cause?.triggerEntityId ?? a.cause?.source?.entityId), s = (a) => ds(a, !n), i = e.filter((a) => s(a)), o = new Set(i.map((a) => s(a)));
    if (o.size <= 1) return [e];
    const r = new Map([...o].map((a) => [a, []]));
    for (const a of e) {
      let c = s(a);
      if (!c) {
        let d = 1 / 0;
        for (const h of i) {
          const p = Math.abs(h.when - a.when);
          p < d && (d = p, c = s(h));
        }
      }
      r.get(c).push(a);
    }
    return [...r.values()];
  });
}
function us(t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const c = r.cause?.actor;
    if (!c?.entityId || c.kind !== "automation" && c.kind !== "script" || r.effects) continue;
    const d = c.entityId, h = n.get(d);
    h ? h.push(r) : n.set(d, [r]);
  }
  const s = /* @__PURE__ */ new Set(), i = [], o = e.filter((r) => !r.rich && r.cause?.actor?.kind === "service");
  for (const [, r] of n) {
    const a = [...r].sort((d, h) => d.when - h.when), c = [];
    for (const d of a) {
      const h = c[c.length - 1];
      h && d.when - h[h.length - 1].when <= es ? h.push(d) : c.push([d]);
    }
    for (const d of ls(c)) {
      d.sort((y, k) => y.when - k.when);
      const h = d.find((y) => y.cause?.source)?.cause?.source, p = d.filter(Qe), g = d.filter((y) => !p.includes(y));
      if (g.length === 0) continue;
      const u = g.some((y) => y.cause?.by);
      if (g.length < 2 && h?.cause?.actor?.kind !== "user" && !h?.soft && !u)
        continue;
      d.splice(0, d.length, ...g);
      for (const y of o)
        !s.has(y) && !d.includes(y) && y.when >= d[0].when - ts && y.when <= d[d.length - 1].when + ns && d.push(y);
      d.sort((y, k) => y.when - k.when);
      const f = d[0], b = is(d), x = rs(
        [...d, ...os(p)].sort((y, k) => y.when - k.when).map(ss)
      );
      let $;
      if (h)
        $ = {
          ...h,
          soft: void 0,
          key: `group|${h.key}|${f.key}`,
          effects: x,
          via: b,
          count: 1,
          rich: !0
        };
      else {
        const y = b[0], k = y.kind === "script" ? "script" : "automation";
        $ = {
          key: `group|${f.key}`,
          when: f.when,
          entityId: y.entityId,
          domain: k,
          name: y.name,
          verb: "ran",
          tone: "active",
          icon: ye[k],
          isPerson: !1,
          isRun: !1,
          count: 1,
          rich: !0,
          cause: as(d),
          effects: x,
          accent: O(k, void 0, "on", "active", !0)
        };
      }
      for (const y of [...d, ...p]) s.add(y);
      if (!h)
        for (const y of e)
          Qe(y) && y.entityId === $.entityId && y.when >= f.when - Ze && y.when <= d[d.length - 1].when + Ze && s.add(y);
      i.push($);
    }
  }
  return s.size ? [...e.filter((r) => !s.has(r)), ...i] : e;
}
const hs = 6e4;
function te(t) {
  return (t.activity ?? "meaningful") === "meaningful" && !t.include_domains?.length;
}
function ps(t, e, n) {
  if (!te(n)) return e;
  const s = G(n, t);
  for (const i of e) {
    if (i.domain !== "person" || !i.entityId) continue;
    const o = t.states[i.entityId]?.attributes.device_trackers;
    if (!Array.isArray(o)) continue;
    const r = e.find(
      (a) => a.domain === "device_tracker" && a.entityId && o.includes(a.entityId) && a.verb === i.verb && Math.abs(a.when - i.when) <= hs
    );
    !r || i.cause?.actor || (i.cause = { trigger: `device ${r.name}`, triggerEntityId: r.entityId });
  }
  return e.filter(
    (i) => !(i.domain === "device_tracker" && !(i.entityId && s.has(i.entityId)))
  );
}
const et = {
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
}, fs = {
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
}, ms = /* @__PURE__ */ new Set([
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
]), _s = /* @__PURE__ */ new Set(["person", "device_tracker"]), gs = /* @__PURE__ */ new Set(["button", "input_button", "doorbell"]), vs = {
  ring: ["rang", "active"],
  motion: ["detected motion", "active"],
  camera_motion: ["detected motion", "active"],
  person: ["detected a person", "active"],
  camera_person: ["detected a person", "active"],
  sound: ["detected sound", "active"],
  camera_sound: ["detected sound", "active"],
  press: ["was pressed", "active"],
  initial_press: ["was pressed", "active"],
  single_press: ["was pressed", "active"],
  short_press: ["was pressed", "active"],
  double_press: ["was double-pressed", "active"],
  triple_press: ["was triple-pressed", "active"],
  long_press: ["was long-pressed", "active"]
}, ys = {
  doorbell: "rang",
  motion: "detected motion",
  button: "was pressed"
};
function bs(t, e) {
  if (e) {
    const s = vs[e];
    if (s) return { verb: s[0], tone: s[1] };
    const i = e.replace(/_/g, " ");
    return {
      verb: `reported ${i}`,
      tone: /(error|fail)/i.test(i) ? "alert" : "active"
    };
  }
  return { verb: (t ? ys[t] : void 0) ?? "detected an event", tone: "active" };
}
function $e(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ws(t, e, n) {
  const s = t.states[e];
  if (s && t.formatEntityState)
    try {
      const r = t.formatEntityState({ ...s, state: n }, n);
      if (r) return r;
    } catch {
    }
  const i = s?.attributes.unit_of_measurement;
  return n !== "" && !Number.isNaN(Number(n)) ? i ? `${n} ${i}` : n : $e(n);
}
function $s(t, e) {
  return Object.values(t.states).find(
    (s) => s.entity_id.startsWith("zone.") && (s.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? $e(e);
}
function xs(t, e, n, s, i) {
  if (s === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (s === "unknown") return { verb: "became unknown", tone: "neutral" };
  const r = (n ? t.states[n] : void 0)?.attributes.device_class;
  if (e === "event") return bs(r, i);
  if (_s.has(e))
    return s === "home" ? { verb: "arrived home", tone: "active" } : s === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${$s(t, s)}`, tone: "active" };
  if (e === "binary_sensor" && r && et[r]) {
    const [d, h, p, g] = et[r];
    if (s === "on") return { verb: d, tone: p ?? "active" };
    if (s === "off") return { verb: h, tone: g ?? "inactive" };
  }
  const a = fs[e]?.[s];
  if (a) return { verb: a[0], tone: a[1] };
  if (gs.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && s === "off") return { verb: "was turned off", tone: "inactive" };
  if (ms.has(e) || s === "on" || s === "off") {
    if (s === "on") return { verb: "was turned on", tone: "active" };
    if (s === "off") return { verb: "was turned off", tone: "inactive" };
  }
  const c = n ? ws(t, n, s) : $e(s);
  return { verb: `changed to ${ve(c, 80)}`, tone: "neutral" };
}
const w = {
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
}, N = { hours: [1, 720], entries: [1, 500] }, tt = 60 * 1e3, ks = 10 * 60 * 1e3, nt = 5 * 60 * 1e3;
function xe(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function xt(t, [e, n], s) {
  const i = typeof t == "number" ? t : Number(t);
  return Number.isFinite(i) ? Math.min(n, Math.max(e, Math.round(i))) : s;
}
function de(t) {
  return xt(t.hours_to_show, N.hours, w.hours_to_show);
}
function As(t) {
  return xt(t.max_entries, N.entries, w.max_entries);
}
function ke(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function le(t, e, n, s, i = !1) {
  const o = ke(t);
  if (!i && s && t.entity_id && !(e.show_diagnostic ?? w.show_diagnostic)) {
    const a = s.entities?.[t.entity_id], c = G(e, s).has(t.entity_id);
    if (a && (a.entity_category || a.hidden) && !c) return !1;
  }
  return !(n && (!t.entity_id || !n.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(o) || e.exclude_domains?.includes(o) || !i && (e.activity ?? w.activity) === "meaningful" && !Xn(t, e, s) || (e.hide_unavailable ?? w.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function Ss(t, e, n) {
  const s = ke(e), i = e.entity_id ? t.states[e.entity_id] : void 0, o = e.name ?? i?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let r, a = "neutral", c = Ln(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: r, tone: a } = xs(
      t,
      s,
      e.entity_id,
      e.state,
      e.attributes?.event_type
    ));
  else {
    const u = e.message ?? "did something";
    if (u.match(/^triggered(?: by (.+))?$/)) {
      r = "was triggered", a = "active";
      const b = Wn(t, e);
      if (b) {
        const x = e.source ?? u.replace(/^triggered by /, "");
        c = { ...c, trigger: b, triggerEntityId: be(x) };
      }
    } else
      r = u, a = /(error|fail)/i.test(u) ? "alert" : "neutral";
  }
  const d = c?.actor;
  d && !d.icon && (d.icon = ye[d.kind]);
  const h = s === "person", p = h ? i?.attributes.entity_picture : void 0, g = n.state_color ?? w.state_color;
  return {
    key: xe(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: s,
    name: o,
    verb: r,
    tone: a,
    icon: xn(s, e.icon),
    stateValue: e.state,
    picture: p,
    isPerson: h,
    isRun: we(e),
    cause: c,
    count: 1,
    accent: O(s, i?.attributes.device_class, e.state, a, g)
  };
}
function st(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function Es(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const n = An[t.state ?? ""];
  return n ? e.items.some(
    (s) => s.entityId === t.entity_id && s.phase === n && Math.abs(s.when - t.when * 1e3) <= Sn
  ) : !1;
}
function Is(t, e = !0, n = /* @__PURE__ */ new Set()) {
  const s = /* @__PURE__ */ new Set();
  for (const i of t) {
    const o = i.cause?.actor;
    if (!o?.entityId || o.kind !== "automation" && o.kind !== "script") continue;
    for (const c of t)
      e && c.isRun && !(c.entityId && n.has(c.entityId)) && c.entityId === o.entityId && Math.abs(c.when - i.when) <= tt && s.add(c);
    const r = i.cause?.triggerEntityId;
    if (!r) continue;
    const a = t.find(
      (c) => c !== i && !c.isRun && c.entityId === r && c.when <= i.when + 5e3 && i.when - c.when <= tt
    );
    a && (s.add(a), i.cause = { ...i.cause, trigger: `${a.name} ${a.verb}`, source: a });
  }
  return t.filter((i) => !s.has(i));
}
function Cs(t, e, n) {
  return te(n) ? _n(t, e, G(n, t)) : e;
}
function Ts(t, e, n, s, i, o, r) {
  const a = s - de(n) * 36e5, c = As(n), d = n.collapse_repeats ?? w.collapse_repeats, h = (o?.items ?? []).filter(
    (l) => l.when >= a && l.when <= s + nt
  ), p = o ? { items: h, vacuums: o.vacuums } : void 0, g = [...e], u = g.filter((l) => l.domain === "homeassistant" && l.message === "started").map((l) => l.when), f = G(n, t), b = /* @__PURE__ */ new Map();
  for (const l of g) {
    const v = we(l) ? l.source ?? l.message?.replace(/^triggered by /, "") : l.context_event_type === "automation_triggered" || l.context_event_type === "script_started" ? l.context_source ?? l.context_message?.replace(/^triggered by /, "") : void 0, A = be(v);
    A && b.set(A, [...b.get(A) ?? [], l.when]);
  }
  const x = (l) => !!l.entity_id && (b.get(l.entity_id) ?? []).some((v) => l.when <= v + 5 && v - l.when <= 60), $ = /* @__PURE__ */ new Set(), y = (l) => (n.activity ?? w.activity) !== "meaningful" ? !1 : l.domain === "homeassistant" ? l.message === "stopped" && u.some((v) => v >= l.when && v - l.when <= 900) : $t(l) || x(l) || l.entity_id && f.has(l.entity_id) || Jn.has(l.domain ?? l.entity_id?.split(".")[0] ?? "") ? !1 : u.some((v) => l.when >= v - 30 && l.when <= v + 180), k = /* @__PURE__ */ new Set(), kt = g.filter((l) => {
    if (ke(l) !== "event" || !l.entity_id || l.state === void 0 || l.state === "unavailable" || l.state === "unknown")
      return !0;
    const v = `${l.entity_id}|${l.state}`;
    return k.has(v) ? !1 : (k.add(v), !0);
  }).filter((l) => {
    const v = l.when * 1e3;
    return v >= a && v <= s + nt;
  }).filter((l) => le(l, n, i, t) ? !0 : te(n) && x(l) && le(l, n, i, t, !0) ? ($.add(xe(l)), !0) : !1).filter((l) => !y(l)).filter((l) => !Es(l, p)).sort((l, v) => v.when - l.when), Se = n.automation_runs ?? w.automation_runs, At = Kn(
    t,
    [
      ...kt.map((l) => {
        const v = Ss(t, l, n);
        return $.has(v.key) && (v.soft = !0), v;
      }),
      ...h
    ],
    Se,
    n.state_color ?? w.state_color,
    n.show_actions === !1 ? void 0 : r,
    f
  ).sort((l, v) => v.when - l.when), St = Is(At, Se !== "all", f).filter((l) => !l.soft), Ee = fn(
    dn(
      Cs(t, ps(t, St, n), n),
      n.chatty ?? w.chatty,
      f
    )
  ), Et = Qn(
    (te(n) ? us(t, Ee) : Ee).sort(
      (l, v) => v.when - l.when
    ),
    n
  ), L = [];
  let ie = 0;
  for (const l of Et) {
    const v = L[L.length - 1];
    if (d && v && !l.rich && !v.rich && l.entityId && v.entityId === l.entityId && v.verb === l.verb && st(v) === st(l) && ie - l.when <= ks) {
      v.count += 1, ie = l.when;
      continue;
    }
    if (L.push(l), ie = l.when, L.length > c) break;
  }
  const Ie = L.slice(0, c);
  (n.order ?? w.order) === "oldest_first" && Ie.reverse();
  const J = [];
  for (const l of Ie) {
    const v = Qt(l.when);
    let A = J[J.length - 1];
    (!A || A.key !== v) && (A = { key: v, label: sn(l.when, s), items: [] }, J.push(A)), A.items.push(l);
  }
  return J;
}
function Os(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const n = t.cause;
  return n?.actor && (e += ` by ${n.actor.name}`), n?.trigger && (e += `, triggered by ${n.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), t.effects?.length && (e += `. ${t.effects.map((s) => `${s.name} ${s.verb}`).join(". ")}`), e;
}
var Ms = Object.defineProperty, Rs = Object.getOwnPropertyDescriptor, z = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Rs(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && Ms(e, n, i), i;
};
const it = 3e3, Ps = 6e4;
let I = class extends D {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._traceBudget = 0, this._registryRefs = [], this._resolveRun = (t) => {
      const e = this._hass;
      if (!e || !t.entityId) return;
      const n = this._traces ??= new wn(e), s = n.lookup(t.entityId, t.when, 15e3);
      if (s) return vn(s);
      this._traceBudget-- > 0 && n.ensure(t.entityId, t.when, 15e3)?.then(() => this._scheduleRecompute());
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Vs), document.createElement("what-happened-card-editor");
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
    const n = [t.entities, t.devices, t.areas], s = n.some((i, o) => i !== this._registryRefs[o]);
    this._registryRefs = n, (e || s) && (this._ensureSubscription(), this._scheduleRecompute());
  }
  get hass() {
    return this._hass;
  }
  getCardSize() {
    const t = this._config;
    if (t?.max_height) return Math.max(3, Math.ceil(t.max_height / 50));
    const e = this._groups.reduce((n, s) => n + s.items.length, 0);
    return Math.min(12, Math.max(3, Math.ceil(e * 1.2) + 1));
  }
  /** Sections view: default size and resize limits (users resize with the handles). */
  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 3, min_rows: 2 };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this._now = Date.now(), this._refreshHistories(), this._recompute();
    }, Ps), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    const n = e.vacuum_details === !1 ? [] : In(t).filter((o) => this._vacuumVisible(o, e)), s = JSON.stringify([...n].sort());
    if (s === this._vacKey) return;
    this._vacKey = s, this._unsubscribeVacuums(), this._vacuums.clear();
    const i = this._vacToken;
    for (const o of n) {
      const r = { entityId: o, log: [], runs: [] };
      this._vacuums.set(o, r), t.connection.subscribeMessage(
        (a) => {
          i === this._vacToken && (r.log = a.log ?? [], this._refreshHistory(r), this._scheduleRecompute());
        },
        { type: "tapo_rv30/planner/subscribe", entity_id: o }
      ).then((a) => {
        i !== this._vacToken ? a() : this._vacUnsubs.push(a);
      }).catch(() => {
      }), this._refreshHistory(r);
    }
  }
  _refreshHistory(t) {
    const e = this._hass;
    if (!e) return;
    const n = this._vacToken;
    e.callWS({ type: "tapo_rv30/history/list", entity_id: t.entityId }).then((s) => {
      n === this._vacToken && (t.runs = (s.runs ?? []).filter((i) => i.started), this._scheduleRecompute());
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
    Nn(e.target) && (n = yt(t, e.target));
    const s = de(e), i = JSON.stringify([s, n ? [...n].sort() : null]);
    if (i === this._subKey) {
      this._allowed = n;
      return;
    }
    if (this._subKey = i, this._allowed = n, this._unsubscribe(), this._entries.clear(), this._error = void 0, n && n.size === 0) {
      this._loading = !1;
      return;
    }
    this._loading = !0;
    const o = this._subToken, r = new Date(Date.now() - s * 36e5);
    on(
      t,
      (a) => {
        if (o !== this._subToken) return;
        const c = this._config;
        for (const d of a)
          c && !le(d, c, this._allowed, this._hass) || this._entries.set(xe(d), d);
        this._entries.size > it && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
      },
      r,
      n ? [...n] : void 0
    ).then((a) => {
      o !== this._subToken ? a() : this._unsub = a;
    }).catch((a) => {
      o === this._subToken && (this._loading = !1, this._error = a instanceof Error ? a.message : "Could not load the logbook");
    });
  }
  _trimBuffer() {
    const t = [...this._entries.entries()].sort((e, n) => n[1].when - e[1].when);
    this._entries = new Map(t.slice(0, it));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    if (!this._hass || !this._config) return;
    this._now = Date.now(), this._traceBudget = 40;
    const t = Ts(
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
    const t = this._hass, e = this._config, n = /* @__PURE__ */ new Set(), s = [];
    if (t && e)
      for (const i of this._vacuums.values())
        !i.log.length && !i.runs.length || (n.add(i.entityId), s.push(...Rn(t, i, e)));
    return { items: s, vacuums: n };
  }
  // ------------------------------------------------------------ interaction
  _moreInfo(t) {
    t && this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 })
    );
  }
  _onRowClick(t) {
    (this._config?.tap_action ?? w.tap_action) !== "none" && this._moreInfo(t.entityId);
  }
  _onRowKey(t, e) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._onRowClick(e));
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return m;
    const e = this._groups.reduce((i, o) => i + o.items.length, 0), n = this._groups[this._groups.length - 1], s = n?.items[n.items.length - 1]?.key;
    return _`
      <ha-card
        class=${B({
      compact: t.compact ?? w.compact,
      "has-header": !!t.title
    })}
        style=${X({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? _`<h1 class="card-header">${t.title}</h1>` : m}
        <div class="scroll">
          ${this._error ? _`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? _`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : _`<ol>
                      ${this._groups.map((i) => this._renderGroup(i, t, s))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = de(t), n = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, s = e === 1 ? "No activity in the last hour" : `No activity in the last ${n}`;
    return _`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${s}
    </div>`;
  }
  _renderGroup(t, e, n) {
    const s = e.show_day_headers ?? w.show_day_headers;
    return _`
      ${s ? _`<li class="day" role="presentation">${t.label}</li>` : m}
      ${t.items.map((i) => this._renderItem(i, e, i.key === n))}
    `;
  }
  _renderIcon(t) {
    const e = t.entityId && !t.fixedIcon ? this._hass?.states[t.entityId] : void 0;
    return _`<span class="glyph"
      >${e ? _`<ha-state-icon
              .hass=${this._hass}
              .stateObj=${e}
              .stateValue=${t.stateValue}
            ></ha-state-icon>` : _`<ha-icon .icon=${t.icon}></ha-icon>`}</span
    >`;
  }
  _renderItem(t, e, n) {
    const s = e.show_avatars ?? w.show_avatars, i = e.show_cause ?? w.show_cause, o = !!t.entityId && (e.tap_action ?? w.tap_action) !== "none", r = s && t.picture;
    return _`
      <li class=${B({ item: !0, last: n })}>
        <div class="rail">
          <div
            class=${B({ node: !0, photo: !!r })}
            style=${X({ "--accent": t.accent })}
          >
            ${r ? _`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${B({ row: !0, clickable: o })}
          style=${X({ "--accent": t.accent })}
          role=${o ? "button" : "text"}
          tabindex=${o ? "0" : "-1"}
          aria-label=${Os(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : _`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? _`<span class="count">×${t.count}</span>` : m}
            </div>
            ${t.details?.length ? _`<div class="secondary">${t.details.join(" · ")}</div>` : m}
            ${i ? this._renderCause(t, s) : m}
            ${i ? this._renderVia(t) : m} ${this._renderEffects(t)}
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
    const n = t.cause;
    if (!n || !n.actor && !n.trigger) return m;
    const s = n.by ?? n.actor, i = n.by ? n.actor : void 0, o = !!s?.entityId && (this._config?.tap_action ?? w.tap_action) !== "none";
    return _`
      <div class="secondary">
        ${s ? _`by${e && s.kind === "user" ? this._renderAvatar(s) : m}
              ${o ? this._actorLink(s) : _`<span title=${s.detail ?? s.name}>${s.name}</span>`}` : m}${i ? _`, via ${this._actorLink(i)}` : m}${s && n.trigger ? ", " : m}${n.trigger ? _`${s ? "triggered by" : "by"} ${n.trigger}` : m}
      </div>
    `;
  }
  /** A name that opens its entity. A span, not a button, so long names wrap like text. */
  _actorLink(t) {
    const e = (n) => {
      n.stopPropagation(), this._moreInfo(t.entityId);
    };
    return _`<span
      class="link"
      role="button"
      tabindex="0"
      title=${t.detail ? `${t.name} – ${t.detail}` : t.name}
      @click=${e}
      @keydown=${(n) => {
      n.stopPropagation(), (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this._moreInfo(t.entityId));
    }}
      >${t.name}</span
    >`;
  }
  _renderVia(t) {
    if (!t.via?.length) return m;
    const e = (this._config?.tap_action ?? w.tap_action) !== "none";
    return _`<div class="secondary">
      via
      ${t.via.map(
      (n, s) => _`${s ? ", " : m}${n.entityId && e ? this._actorLink(n) : n.name}`
    )}
    </div>`;
  }
  /** What one action caused: a line per thing, under the entry that started it. */
  _renderEffects(t) {
    if (!t.effects?.length) return m;
    const e = (this._config?.tap_action ?? w.tap_action) !== "none";
    return _`<ul class="effects">
      ${t.effects.map((n) => {
      const s = n.entityId && !n.fixedIcon ? this._hass?.states[n.entityId] : void 0, i = e && !!n.entityId;
      return _`<li
          class=${B({ effect: !0, clickable: i })}
          style=${X({ "--accent": n.accent })}
          role=${i ? "button" : "text"}
          tabindex=${i ? "0" : "-1"}
          @click=${(o) => {
        i && (o.stopPropagation(), this._moreInfo(n.entityId));
      }}
          @keydown=${(o) => {
        (o.key === "Enter" || o.key === " ") && (o.stopPropagation(), o.preventDefault(), i && this._moreInfo(n.entityId));
      }}
        >
          <span class="e-icon"
            >${s ? _`<ha-state-icon
                    .hass=${this._hass}
                    .stateObj=${s}
                    .stateValue=${n.stateValue}
                  ></ha-state-icon>` : _`<ha-icon .icon=${n.icon}></ha-icon>`}</span
          >
          <span class="e-text"
            ><span class="e-name">${n.name}</span> ${n.verb}${n.count && n.count > 1 ? _`<span class="e-count"> ×${n.count}</span>` : m}${n.details?.length ? _`<span class="e-details"> · ${n.details.join(" · ")}</span>` : m}</span
          >
        </li>`;
    })}
    </ul>`;
  }
  _renderTime(t, e) {
    const n = e.time_display ?? w.time_display, s = gt(t.when, this._hass), i = nn(t.when, this._now);
    return _`
      <div class="time" title=${tn(t.when, this._hass)}>
        ${n !== "relative" ? _`<span class="abs">${s}</span>` : m}
        ${n !== "absolute" ? _`<span class="rel">${i}</span>` : m}
      </div>
    `;
  }
};
I.styles = Pn;
z([
  H()
], I.prototype, "_config", 2);
z([
  H()
], I.prototype, "_groups", 2);
z([
  H()
], I.prototype, "_loading", 2);
z([
  H()
], I.prototype, "_error", 2);
z([
  H()
], I.prototype, "_now", 2);
I = z([
  ut("what-happened-card")
], I);
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
var Ns = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, Ae = (t, e, n, s) => {
  for (var i = s > 1 ? void 0 : s ? Ds(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (i = (s ? r(e, n, i) : r(i)) || i);
  return s && i && Ns(e, n, i), i;
};
const ce = [
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
].map((t) => ({ value: t, label: t })), Us = {
  title: "Title",
  show_day_headers: "Show day headings (Today, Yesterday)",
  hours_to_show: "Time window",
  max_entries: "Maximum number of entries",
  order: "Order",
  target: "Only show activity of",
  exclude_entities: "Hide these entities",
  also_show_entities: "Also show these entities",
  also_show_domains: "Also show these domains",
  also_show_labels: "Also show these labels",
  colors: "Icon colors",
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
}, js = {
  colors: "Pick a domain (light, input_boolean, …) or a single entity and the color of its icons. An entity beats its domain.",
  title: "Leave empty to show no title.",
  also_show_entities: "Shown even when the default view would hide them (helpers, buttons, diagnostic entities, restart noise, very frequent entities). Pick an automation or script to always list its runs.",
  also_show_labels: 'Everything carrying one of these labels (entities and devices) is shown like an entity in the list above. Handy for a "watch this" label.',
  also_show_domains: "Added to the default view, e.g. sensor or update. Pick from the list or type your own.",
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  activity: "Recommended hides clocks, text and number sensors and update entities.",
  automation_runs: "Most runs are plumbing. By default only what a run said on a speaker or sent as a notification is shown, as its own entry.",
  chatty: "Entities with at least 10 entries at a pace of one per hour or faster, such as a clock sensor or an automation that runs every 15 minutes.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, Hs = [
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
            min: N.hours[0],
            max: N.hours[1],
            step: 1,
            mode: "box",
            unit_of_measurement: "h"
          }
        }
      },
      {
        name: "max_entries",
        selector: {
          number: { min: N.entries[0], max: N.entries[1], step: 1, mode: "box" }
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
], zs = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_labels", selector: { label: { multiple: !0 } } },
  {
    name: "also_show_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: ce }
    }
  },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: ce }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: ce }
    }
  }
], Ls = [
  {
    name: "colors",
    selector: {
      object: {
        multiple: !0,
        label_field: "match",
        fields: {
          match: { label: "Domain or entity id", required: !0, selector: { text: {} } },
          color: { label: "Color", required: !0, selector: { ui_color: {} } }
        }
      }
    }
  },
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
], Ws = [
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
], Bs = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: zs },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: Ls },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: Ws }
];
let j = class extends D {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Us[t.name] ?? t.name, this._computeHelper = (t) => js[t.name];
  }
  setConfig(t) {
    this._config = t;
  }
  _data() {
    return { ...w, ...this._config };
  }
  _valueChanged(t) {
    if (t.stopPropagation(), !this._config) return;
    const e = t.detail.value, n = { type: this._config.type };
    for (const [s, i] of Object.entries(e))
      s === "type" || i === void 0 || i === "" || Array.isArray(i) && i.length === 0 || s === "target" && (!i || Object.keys(i).length === 0) || w[s] === i && !(s in this._config) || (n[s] = i);
    this._config = n, this.dispatchEvent(
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
    return !this.hass || !this._config ? m : _`
      ${this._form(Hs)}
      ${Bs.map(
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
j.styles = rt`
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
Ae([
  ht({ attribute: !1 })
], j.prototype, "hass", 2);
Ae([
  H()
], j.prototype, "_config", 2);
j = Ae([
  ut("what-happened-card-editor")
], j);
const Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return j;
  }
}, Symbol.toStringTag, { value: "Module" }));
