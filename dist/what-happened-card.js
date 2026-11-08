/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, he = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pe = Symbol(), Ce = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (he && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Ce.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ce.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const It = (t) => new ot(typeof t == "string" ? t : t + "", void 0, pe), rt = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1], t[0]);
  return new ot(n, t, pe);
}, Ct = (t, e) => {
  if (he) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = Q.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, Te = he ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return It(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Tt, defineProperty: Ot, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Rt, getOwnPropertySymbols: Pt, getPrototypeOf: Nt } = Object, ie = globalThis, Oe = ie.trustedTypes, Dt = Oe ? Oe.emptyScript : "", Ut = ie.reactiveElementPolyfillSupport, V = (t, e) => t, ee = { toAttribute(t, e) {
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
} }, fe = (t, e) => !Tt(t, e), Me = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ??= Symbol("metadata"), ie.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let R = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Me) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && Ot(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: o } = Mt(this.prototype, e) ?? { get() {
      return this[n];
    }, set(r) {
      this[n] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(e, a, i);
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
      const n = this.properties, i = [...Rt(n), ...Pt(n)];
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
      for (const s of i) n.unshift(Te(s));
    } else e !== void 0 && n.push(Te(e));
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
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : ee).toAttribute(n, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ee;
      this._$Em = s;
      const a = r.fromAttribute(n, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[e]), i ??= r.getPropertyOptions(e), !((i.hasChanged ?? fe)(o, n) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? n ?? this[e]), o !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[V("elementProperties")] = /* @__PURE__ */ new Map(), R[V("finalized")] = /* @__PURE__ */ new Map(), Ut?.({ ReactiveElement: R }), (ie.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = globalThis, Re = (t) => t, te = me.trustedTypes, Pe = te ? te.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, at = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + S, jt = `<${ct}>`, M = document, F = () => M.createComment(""), K = (t) => t === null || typeof t != "object" && typeof t != "function", _e = Array.isArray, Ht = (t) => _e(t) || typeof t?.[Symbol.iterator] == "function", re = `[ 	
\f\r]`, W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, De = />/g, C = RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ue = /'/g, je = /"/g, lt = /^(?:script|style|textarea|title)$/i, zt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), _ = zt(1), E = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), T = M.createTreeWalker(M, 129);
function dt(t, e) {
  if (!_e(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pe !== void 0 ? Pe.createHTML(e) : e;
}
const Lt = (t, e) => {
  const n = t.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = W;
  for (let a = 0; a < n; a++) {
    const c = t[a];
    let l, h, p = -1, g = 0;
    for (; g < c.length && (r.lastIndex = g, h = r.exec(c), h !== null); ) g = r.lastIndex, r === W ? h[1] === "!--" ? r = Ne : h[1] !== void 0 ? r = De : h[2] !== void 0 ? (lt.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = C) : h[3] !== void 0 && (r = C) : r === C ? h[0] === ">" ? (r = s ?? W, p = -1) : h[1] === void 0 ? p = -2 : (p = r.lastIndex - h[2].length, l = h[1], r = h[3] === void 0 ? C : h[3] === '"' ? je : Ue) : r === je || r === Ue ? r = C : r === Ne || r === De ? r = W : (r = C, s = void 0);
    const d = r === C && t[a + 1].startsWith("/>") ? " " : "";
    o += r === W ? c + jt : p >= 0 ? (i.push(l), c.slice(0, p) + at + c.slice(p) + S + d) : c + S + (p === -2 ? a : d);
  }
  return [dt(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Y {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, c = this.parts, [l, h] = Lt(e, n);
    if (this.el = Y.createElement(l, i), T.currentNode = this.el.content, n === 2 || n === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = T.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(at)) {
          const g = h[r++], d = s.getAttribute(p).split(S), f = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: o, name: f[2], strings: d, ctor: f[1] === "." ? Bt : f[1] === "?" ? Vt : f[1] === "@" ? Ft : se }), s.removeAttribute(p);
        } else p.startsWith(S) && (c.push({ type: 6, index: o }), s.removeAttribute(p));
        if (lt.test(s.tagName)) {
          const p = s.textContent.split(S), g = p.length - 1;
          if (g > 0) {
            s.textContent = te ? te.emptyScript : "";
            for (let d = 0; d < g; d++) s.append(p[d], F()), T.nextNode(), c.push({ type: 2, index: ++o });
            s.append(p[g], F());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ct) c.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(S, p + 1)) !== -1; ) c.push({ type: 7, index: o }), p += S.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const i = M.createElement("template");
    return i.innerHTML = e, i;
  }
}
function U(t, e, n = t, i) {
  if (e === E) return e;
  let s = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const o = K(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = s : n._$Cl = s), s !== void 0 && (e = U(t, s._$AS(t, e.values), s, i)), e;
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
    const { el: { content: n }, parts: i } = this._$AD, s = (e?.creationScope ?? M).importNode(n, !0);
    T.currentNode = s;
    let o = T.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new G(o, o.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (l = new Kt(o, this, e)), this._$AV.push(l), c = i[++a];
      }
      r !== c?.index && (o = T.nextNode(), r++);
    }
    return T.currentNode = M, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class G {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Y.createElement(dt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const o = new Wt(s, this), r = o.u(this.options);
      o.p(n), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = He.get(e.strings);
    return n === void 0 && He.set(e.strings, n = new Y(e)), n;
  }
  k(e) {
    _e(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const o of e) s === n.length ? n.push(i = new G(this.O(F()), this.O(F()), this, this.options)) : i = n[s], i._$AI(o), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = Re(e).nextSibling;
      Re(e).remove(), e = i;
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
  constructor(e, n, i, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = U(this, e, n, 0), r = !K(e) || e !== this._$AH && e !== E, r && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = o[0], c = 0; c < o.length - 1; c++) l = U(this, a[i + c], n, c), l === E && (l = this._$AH[c]), r ||= !K(l) || l !== this._$AH[c], l === m ? e = m : e !== m && (e += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    r && !s && this.j(e);
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
  constructor(e, n, i, s, o) {
    super(e, n, i, s, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = U(this, e, n, 0) ?? m) === E) return;
    const i = this._$AH, s = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Kt {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const Yt = me.litHtmlPolyfillSupport;
Yt?.(Y, G), (me.litHtmlVersions ??= []).push("3.3.3");
const qt = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = n?.renderBefore ?? null;
    i._$litPart$ = s = new G(e.insertBefore(F(), o), o, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = globalThis;
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
D._$litElement$ = !0, D.finalized = !0, ge.litElementHydrateSupport?.({ LitElement: D });
const Gt = ge.litElementPolyfillSupport;
Gt?.({ LitElement: D });
(ge.litElementVersions ??= []).push("4.2.2");
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
const Jt = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: fe }, Xt = (t = Jt, e, n) => {
  const { kind: i, metadata: s } = n;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(n.name, t), i === "accessor") {
    const { name: r } = n;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, c, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = n;
    return function(a) {
      const c = this[r];
      e.call(this, a), this.requestUpdate(r, c, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ht(t) {
  return (e, n) => typeof n == "object" ? Xt(t, e, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
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
const B = ft(class extends mt {
  constructor(t) {
    if (super(t), t.type !== pt.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return E;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = "important", Zt = " !" + _t, Z = ft(class extends mt {
  constructor(t) {
    if (super(t), t.type !== pt.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const o = typeof s == "string" && s.endsWith(Zt);
        i.includes("-") || o ? n.setProperty(i, o ? s.slice(0, -11) : s, o ? _t : "") : n[i] = s;
      }
    }
    return E;
  }
}), ve = "en-US";
function ze(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function Qt(t) {
  const e = new Date(t), n = (i) => String(i).padStart(2, "0");
  return `${e.getFullYear()}-${n(e.getMonth() + 1)}-${n(e.getDate())}`;
}
function en(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function gt(t, e, n = !1) {
  const i = en(e);
  return new Intl.DateTimeFormat(ve, {
    hour: i ? "numeric" : "2-digit",
    minute: "2-digit",
    second: n ? "2-digit" : void 0,
    hourCycle: i ? "h12" : "h23"
  }).format(t);
}
function tn(t, e) {
  return `${new Intl.DateTimeFormat(ve, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${gt(t, e, !0)}`;
}
function nn(t, e) {
  const n = Math.max(0, Math.round((e - t) / 1e3));
  if (n < 45) return "just now";
  const i = Math.round(n / 60);
  if (i < 60) return `${i} min ago`;
  const s = Math.round(i / 60);
  return s < 24 ? `${s} h ago` : `${Math.round(s / 24)} d ago`;
}
function sn(t, e) {
  const n = Math.round((ze(e) - ze(t)) / 864e5);
  if (n === 0) return "Today";
  if (n === 1) return "Yesterday";
  const i = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(ve, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: i ? void 0 : "numeric"
  }).format(t);
}
function on(t, e, n, i) {
  const s = {
    type: "logbook/event_stream",
    start_time: n.toISOString()
  };
  return i && i.length > 0 && (s.entity_ids = i), t.connection.subscribeMessage(
    (o) => e(o.events ?? []),
    s
  );
}
const rn = 10, an = 1e4, cn = 3;
function ye(t, e) {
  return t.length > e ? `${t.slice(0, e - 1).trimEnd()}…` : t;
}
function Le(t) {
  return t.entityId ?? t.name;
}
function ln(t, e, n = /* @__PURE__ */ new Set()) {
  if (e === "show") return t;
  const i = /* @__PURE__ */ new Map();
  for (const a of t) {
    if (a.rich || a.entityId && n.has(a.entityId)) continue;
    const c = Le(a), l = i.get(c);
    l ? l.push(a) : i.set(c, [a]);
  }
  const s = /* @__PURE__ */ new Set();
  for (const [a, c] of i) {
    if (c.length < rn) continue;
    (c[0].when - c[c.length - 1].when) / 36e5 <= c.length && s.add(a);
  }
  if (s.size === 0) return t;
  const o = [], r = /* @__PURE__ */ new Set();
  for (const a of t) {
    const c = Le(a);
    if (a.rich || !s.has(c) || a.entityId && n.has(a.entityId)) {
      o.push(a);
      continue;
    }
    if (r.has(c) || e === "hide") continue;
    r.add(c);
    const l = i.get(c).length;
    o.push({
      ...a,
      key: `chatty|${c}`,
      verb: a.isRun ? `was triggered ${l} times` : `changed ${l} times`,
      details: a.isRun ? void 0 : [`latest: ${ye(a.verb, 70)}`],
      isRun: !1,
      count: 1,
      rich: !0
    });
  }
  return o;
}
const dn = {
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
  return dn[t] ?? `${t.replace(/_/g, " ")} entities`;
}
function hn(t) {
  return t.startsWith("was ") ? `were ${t.slice(4)}` : t.startsWith("is ") ? `are ${t.slice(3)}` : t;
}
function pn(t, e) {
  return (t.cause?.actor?.name ?? "") === (e.cause?.actor?.name ?? "") && (t.cause?.trigger ?? "") === (e.cause?.trigger ?? "");
}
function fn(t) {
  const e = /* @__PURE__ */ new Map(), n = [];
  for (const s of t) {
    if (s.rich || !s.entityId) continue;
    const o = `${s.domain}|${s.verb}|${s.tone}`, r = e.get(o);
    if (r && r.oldest - s.when <= an)
      r.members.push(s), r.oldest = s.when;
    else {
      const a = { members: [s], oldest: s.when };
      e.set(o, a), n.push(a);
    }
  }
  const i = /* @__PURE__ */ new Map();
  for (const { members: s } of n) {
    const o = new Set(s.map((l) => l.entityId));
    if (o.size < cn) continue;
    const r = s[0], a = [...new Set(s.map((l) => l.name))], c = a.slice(0, 6).join(", ");
    i.set(r, {
      ...r,
      key: `burst|${r.key}`,
      entityId: void 0,
      name: `${o.size} ${un(r.domain)}`,
      verb: hn(r.verb),
      details: [a.length > 6 ? `${c} and ${a.length - 6} more` : c],
      cause: s.every((l) => pn(l, r)) ? r.cause : void 0,
      count: 1,
      stateValue: void 0,
      rich: !0
    });
    for (const l of s.slice(1)) i.set(l, null);
  }
  return i.size === 0 ? t : t.flatMap((s) => {
    if (!i.has(s)) return [s];
    const o = i.get(s);
    return o ? [o] : [];
  });
}
const mn = 3e4;
function _n(t, e, n = /* @__PURE__ */ new Set()) {
  const i = /* @__PURE__ */ new Set();
  for (const s of e) {
    if (s.rich || !s.entityId) continue;
    const o = t.states[s.entityId]?.attributes.entity_id;
    if (!Array.isArray(o) || o.length === 0) continue;
    const r = new Set(o.filter((a) => typeof a == "string"));
    for (const a of e)
      a !== s && !a.rich && a.entityId && !n.has(a.entityId) && r.has(a.entityId) && a.verb === s.verb && Math.abs(a.when - s.when) <= mn && i.add(a);
  }
  return i.size ? e.filter((s) => !i.has(s)) : e;
}
const gn = 200;
function ae(t) {
  return typeof t == "string" ? t.split(",").map((e) => e.trim()) : Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
}
function We(t) {
  return typeof t == "string" && t.trim() ? ye(t.trim(), gn) : void 0;
}
function vn(t) {
  const e = [];
  for (const [n, i] of Object.entries(t.trace ?? {}))
    if (!(!n.startsWith("action/") && !n.startsWith("sequence/")))
      for (const s of i) {
        const o = s.result?.params;
        if (!o?.domain || !o.service) continue;
        const r = o.service_data ?? {}, a = We(r.message);
        if (!a) continue;
        const c = `${o.domain}.${o.service}`;
        if (o.domain === "tts") {
          const l = [
            ...ae(r.media_player_entity_id),
            ...ae(r.entity_id),
            ...ae(o.target?.entity_id)
          ].filter((h) => h.startsWith("media_player."));
          e.push({ kind: "say", text: a, speakers: [...new Set(l)], service: c });
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
function ce(t, e, n, i = 5e3) {
  let s, o = 1 / 0;
  for (const r of t) {
    const a = Date.parse(r.timestamp.start);
    if (Number.isNaN(a) || a > e + i || e - a > n) continue;
    const c = Math.abs(e - a);
    c < o && (s = r, o = c);
  }
  return s;
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
    const [n, i] = e.split(".");
    if (n === "script") return { domain: n, itemId: i };
    if (n === "automation") {
      const s = this.hass.states[e]?.attributes.id;
      return typeof s == "string" || typeof s == "number" ? { domain: n, itemId: String(s) } : void 0;
    }
  }
  /** The trace of the run behind something that happened at `whenMs`, if it is already loaded. */
  lookup(e, n, i) {
    const s = this.item(e), o = s && this.lists.get(`${s.domain}|${s.itemId}`), r = o && ce(o.runs, n, i);
    return s && r ? this.details.get(`${s.domain}|${s.itemId}|${r.run_id}`) : void 0;
  }
  /** Load what `lookup` needs. Resolves when done; failures (no admin rights, no trace) are quiet. */
  ensure(e, n, i) {
    const s = this.item(e);
    if (!s) return;
    const o = `${s.domain}|${s.itemId}`, r = this.lists.get(o), a = r && ce(r.runs, n, i);
    if (a && this.details.has(`${o}|${a.run_id}`)) return;
    const c = `${o}|${a?.run_id ?? Math.floor(n / 6e4)}`, l = this.tried.get(c);
    if (l && Date.now() - l < bn) return;
    const h = this.inflight.get(c);
    if (h) return h;
    const p = (async () => {
      this.tried.set(c, Date.now());
      try {
        let g = this.lists.get(o);
        if (!g || Date.now() - g.at > yn) {
          const f = await this.hass.callWS({
            type: "trace/list",
            domain: s.domain,
            item_id: s.itemId
          });
          g = { at: Date.now(), runs: Array.isArray(f) ? f : [] }, this.lists.set(o, g);
        }
        const d = ce(g.runs, n, i);
        if (d && !this.details.has(`${o}|${d.run_id}`)) {
          const f = await this.hass.callWS({
            type: "trace/get",
            domain: s.domain,
            item_id: s.itemId,
            run_id: d.run_id
          });
          this.details.set(`${o}|${d.run_id}`, f);
        }
      } catch {
      } finally {
        this.inflight.delete(c);
      }
    })();
    return this.inflight.set(c, p), p;
  }
}
const $n = "mdi:information-outline", be = {
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
function O(t, e, n, i, s) {
  const o = "var(--state-icon-color, var(--primary-text-color))";
  if (s && t === "vacuum" && i !== "alert" && i !== "unavailable") {
    const r = "var(--state-vacuum-active-color, var(--teal-color, #009688))";
    return n ? `var(--state-vacuum-${n}-color, ${r})` : r;
  }
  if (!s) return i === "unavailable" ? "var(--state-unavailable-color)" : o;
  switch (i) {
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
  let i;
  for (const s of t) {
    if (s.kind !== "start" || n.has(s)) continue;
    const o = Math.abs(s.ts - e);
    o <= vt && (!i || o < Math.abs(i.ts - e)) && (i = s);
  }
  return i;
}
function Tn(t) {
  const e = t.match(/^(.+?) came home: (.*?)\.?$/s);
  return e ? { people: e[1], note: e[2] } : void 0;
}
function On(t, e) {
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
  const s = t.states[e.entityId]?.attributes.friendly_name ?? e.entityId, o = n.state_color ?? !0, r = [], a = /* @__PURE__ */ new Set(), c = {
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
    const f = Cn(e.log, d.started, a);
    f && a.add(f);
    const b = f ? Fe(f.text) : void 0, x = !!d.error;
    let $;
    f && b ? $ = { actor: b.byUser ? Ye(t) : Ke(), trigger: b.why } : d.start_type != null && Ve[d.start_type] && ($ = {
      actor: { kind: "other", name: Ve[d.start_type], icon: "mdi:gesture-tap" }
    }), r.push({
      ...c,
      key: `vac|${e.entityId}|start|${d.started}`,
      when: d.started * 1e3,
      verb: b?.names ? `started cleaning ${b.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: d.rule_name ? [`preset “${d.rule_name}”`] : void 0,
      cause: $,
      accent: O("vacuum", void 0, "cleaning", "active", o)
    });
    const v = (d.started + (d.minutes ?? 0) * 60) * 1e3;
    r.push({
      ...c,
      key: `vac|${e.entityId}|finish|${d.started}`,
      when: Math.max(v, d.started * 1e3 + 1e3),
      verb: x ? `stopped with error ${d.error}` : b?.names ? `finished cleaning ${b.names}` : "finished cleaning",
      tone: x ? "alert" : "inactive",
      phase: "finish",
      icon: x ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: Mn(d),
      accent: x ? Be : O("vacuum", void 0, "docked", "inactive", o)
    });
  }
  const l = e.log.filter((d) => d.kind === "return"), h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set();
  for (const d of e.log.filter((f) => f.kind === "docked")) {
    const f = l.find(
      (b) => !p.has(b) && b.ts <= d.ts && d.ts - b.ts <= 1800
    );
    f && (h.set(d, f), p.add(f));
  }
  const g = new Set(e.runs.map((d) => d.started));
  for (const d of e.log) {
    if (!En.has(d.kind) || a.has(d) || d.kind === "done" && e.runs.length > 0 || d.kind === "start" && [...g].some((v) => Math.abs(v - d.ts) <= vt) || p.has(d)) continue;
    const f = d.kind === "start" ? Fe(d.text) : void 0, b = d.kind === "docked" ? h.get(d) : void 0, x = b ? Tn(b.text) : void 0;
    if (x) {
      r.push({
        ...c,
        key: `vac|${e.entityId}|log|${d.ts}|docked`,
        when: d.ts * 1e3,
        verb: "was sent home",
        tone: "neutral",
        icon: "mdi:robot-vacuum",
        details: [x.note.charAt(0).toUpperCase() + x.note.slice(1)],
        cause: { actor: On(t, x.people), trigger: "coming home" },
        accent: O("vacuum", void 0, "docked", "inactive", o)
      });
      continue;
    }
    const $ = d.kind === "error" ? "alert" : d.kind === "start" ? "active" : "neutral";
    r.push({
      ...c,
      key: `vac|${e.entityId}|log|${d.ts}|${d.kind}`,
      when: d.ts * 1e3,
      verb: f?.names ? `started cleaning ${f.names}` : "",
      text: f?.names ? void 0 : d.text.replace(/\.$/, ""),
      tone: $,
      phase: d.kind === "start" ? "start" : d.kind === "done" ? "finish" : void 0,
      icon: d.kind === "error" ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
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
  const n = /* @__PURE__ */ new Set(), i = t.entities ?? {}, s = t.devices ?? {}, o = t.areas ?? {}, r = new Set(P(e.area_id));
  for (const l of P(e.floor_id))
    for (const h of Object.values(o))
      h.floor_id === l && r.add(h.area_id);
  const a = new Set(P(e.device_id)), c = new Set(P(e.label_id));
  for (const l of P(e.entity_id)) n.add(l);
  for (const l of Object.values(i)) {
    const h = l.device_id ? s[l.device_id] : void 0, p = l.area_id ?? h?.area_id ?? void 0;
    p && r.has(p) && n.add(l.entity_id), l.device_id && a.has(l.device_id) && n.add(l.entity_id), l.labels?.some((g) => c.has(g)) && n.add(l.entity_id), h?.labels?.some((g) => c.has(g)) && n.add(l.entity_id);
  }
  return n;
}
const Dn = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function bt(t, e) {
  return e.replace(Dn, (n) => t.states[n]?.attributes.friendly_name ?? n);
}
function Un(t, e) {
  for (const [n, i] of Object.entries(t.states))
    if (n.startsWith("person.") && i.attributes.user_id === e)
      return {
        entityId: n,
        name: i.attributes.friendly_name ?? n,
        picture: i.attributes.entity_picture
      };
}
function we(t) {
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
      triggerEntityId: we(jn(e))
    };
  if (e.context_user_id) {
    const i = zn(t, e.context_user_id);
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
function Fn(t, e, n, i, s, o, r) {
  const a = i.kind === "say";
  return {
    key: `action|${e.key}|${s}`,
    when: e.when,
    entityId: a ? i.speakers[0] : void 0,
    domain: a ? "media_player" : "notify",
    name: a ? i.speakers.length ? Vn(t, i.speakers) : "Speaker" : "Notification",
    verb: a ? `said “${i.text}”` : `sent “${i.title ? `${i.title}: ` : ""}${i.text}”`,
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
function Kn(t, e, n, i, s, o = /* @__PURE__ */ new Set()) {
  const r = /* @__PURE__ */ new Set(), a = [];
  for (const c of e) {
    if (!c.isRun || c.rich || (n !== "all" && !(c.entityId && o.has(c.entityId)) && r.add(c), n === "none" || !s)) continue;
    const l = s(c) ?? [], h = c.domain === "script" ? "script" : "automation", p = { kind: h, name: c.name, entityId: c.entityId, icon: be[h] }, g = c.cause?.actor?.kind === "user" ? c.cause.actor : void 0, d = g ? p : c.cause?.actor ?? p, f = /* @__PURE__ */ new Set([c.entityId, d.entityId]);
    l.forEach((b, x) => {
      a.push(Fn(t, c, d, b, x, i, g));
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
function J(t, e) {
  const n = Ge.get(t);
  if (n && n.entities === e?.entities && n.devices === e?.devices) return n.ids;
  const i = new Set([t.target?.entity_id ?? [], t.also_show_entities ?? []].flat());
  if (e && t.also_show_labels?.length)
    for (const s of yt(e, { label_id: t.also_show_labels }))
      i.add(s);
  return Ge.set(t, { entities: e?.entities, devices: e?.devices, ids: i }), i;
}
function $e(t) {
  const e = t.domain ?? t.entity_id?.split(".")[0];
  return (e === "automation" || e === "script") && t.state === void 0 && t.message !== void 0;
}
function xe(t) {
  return !!(t.context_user_id || t.context_event_type || t.context_entity_id || t.context_name || t.context_service);
}
function Xn(t, e, n) {
  const i = t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
  if (t.entity_id && J(e, n).has(t.entity_id) || e.also_show_domains?.includes(i) || e.include_domains?.length || $e(t)) return !0;
  if (qn.has(i)) return !!t.context_user_id;
  if (i === "binary_sensor") {
    const s = t.entity_id && n?.states[t.entity_id]?.attributes.device_class;
    return s ? Gn.has(s) : xe(t);
  }
  return Yn.has(i);
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
  let i, s;
  for (const r of t)
    !r?.match || !r.color || (r.match.includes(".") ? r.match === e && (s = r.color) : r.match === n && (i = r.color));
  const o = s ?? i;
  return o ? Zn(o) : void 0;
}
function Qn(t, e) {
  const n = e.colors;
  if (!n?.length) return t;
  for (const i of t) {
    const s = Xe(n, i.entityId, i.domain);
    s && (i.accent = s);
    for (const o of i.effects ?? []) {
      const r = Xe(n, o.entityId, o.domain);
      r && (o.accent = r);
    }
  }
  return t;
}
const ei = 3e4, ti = 5e3, ni = 1e4, Ze = 3e4;
function ii(t) {
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
function si(t) {
  const e = /* @__PURE__ */ new Set(), n = [];
  for (const i of t) {
    const s = i.cause?.actor, o = s?.entityId ?? s?.name;
    s && (s.kind === "automation" || s.kind === "script") && o && !e.has(o) && (e.add(o), n.push(s));
  }
  return n;
}
function Qe(t) {
  return t.domain === "script" && !t.isRun && /^was turned (on|off)$/.test(t.verb);
}
function oi(t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of t) {
    const i = n.entityId ?? n.name;
    e.has(i) || e.set(i, { ...n, verb: "ran", stateValue: void 0, tone: "active" });
  }
  return [...e.values()];
}
function ri(t) {
  const e = [];
  for (const n of t) {
    const i = e[e.length - 1];
    i && i.name === n.name && i.verb === n.verb && (i.details ?? []).join() === (n.details ?? []).join() ? i.count = (i.count ?? 1) + 1 : e.push({ ...n });
  }
  return e;
}
function ai(t) {
  const e = t.find((i) => i.cause?.by)?.cause?.by, n = ci(t);
  return e || n ? { actor: e, ...n } : void 0;
}
function ci(t) {
  const e = t.find((n) => n.cause?.trigger);
  return e ? {
    trigger: e.cause.trigger,
    triggerEntityId: e.cause.triggerEntityId
  } : void 0;
}
function li(t, e) {
  const n = t.cause, i = n?.triggerEntityId ?? n?.source?.entityId;
  return i ? `entity|${i}` : e && n?.trigger ? `text|${n.trigger}` : void 0;
}
function di(t) {
  return t.flatMap((e) => {
    const n = e.some((a) => a.cause?.triggerEntityId ?? a.cause?.source?.entityId), i = (a) => li(a, !n), s = e.filter((a) => i(a)), o = new Set(s.map((a) => i(a)));
    if (o.size <= 1) return [e];
    const r = new Map([...o].map((a) => [a, []]));
    for (const a of e) {
      let c = i(a);
      if (!c) {
        let l = 1 / 0;
        for (const h of s) {
          const p = Math.abs(h.when - a.when);
          p < l && (l = p, c = i(h));
        }
      }
      r.get(c).push(a);
    }
    return [...r.values()];
  });
}
function ui(t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const c = r.cause?.actor;
    if (!c?.entityId || c.kind !== "automation" && c.kind !== "script" || r.effects) continue;
    const l = c.entityId, h = n.get(l);
    h ? h.push(r) : n.set(l, [r]);
  }
  const i = /* @__PURE__ */ new Set(), s = [], o = e.filter((r) => !r.rich && r.cause?.actor?.kind === "service");
  for (const [, r] of n) {
    const a = [...r].sort((l, h) => l.when - h.when), c = [];
    for (const l of a) {
      const h = c[c.length - 1];
      h && l.when - h[h.length - 1].when <= ei ? h.push(l) : c.push([l]);
    }
    for (const l of di(c)) {
      l.sort((v, k) => v.when - k.when);
      const h = l.find((v) => v.cause?.source)?.cause?.source, p = l.filter(Qe), g = l.filter((v) => !p.includes(v));
      if (g.length === 0) continue;
      const d = g.some((v) => v.cause?.by);
      if (g.length < 2 && h?.cause?.actor?.kind !== "user" && !h?.soft && !d)
        continue;
      l.splice(0, l.length, ...g);
      for (const v of o)
        !i.has(v) && !l.includes(v) && v.when >= l[0].when - ti && v.when <= l[l.length - 1].when + ni && l.push(v);
      l.sort((v, k) => v.when - k.when);
      const f = l[0], b = si(l), x = ri(
        [...l, ...oi(p)].sort((v, k) => v.when - k.when).map(ii)
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
        const v = b[0], k = v.kind === "script" ? "script" : "automation";
        $ = {
          key: `group|${f.key}`,
          when: f.when,
          entityId: v.entityId,
          domain: k,
          name: v.name,
          verb: "ran",
          tone: "active",
          icon: be[k],
          isPerson: !1,
          isRun: !1,
          count: 1,
          rich: !0,
          cause: ai(l),
          effects: x,
          accent: O(k, void 0, "on", "active", !0)
        };
      }
      for (const v of [...l, ...p]) i.add(v);
      if (!h)
        for (const v of e)
          Qe(v) && v.entityId === $.entityId && v.when >= f.when - Ze && v.when <= l[l.length - 1].when + Ze && i.add(v);
      s.push($);
    }
  }
  return i.size ? [...e.filter((r) => !i.has(r)), ...s] : e;
}
const hi = 6e4;
function ne(t) {
  return (t.activity ?? "meaningful") === "meaningful" && !t.include_domains?.length;
}
function pi(t, e, n) {
  if (!ne(n)) return e;
  const i = J(n, t);
  for (const s of e) {
    if (s.domain !== "person" || !s.entityId) continue;
    const o = t.states[s.entityId]?.attributes.device_trackers;
    if (!Array.isArray(o)) continue;
    const r = e.find(
      (a) => a.domain === "device_tracker" && a.entityId && o.includes(a.entityId) && a.verb === s.verb && Math.abs(a.when - s.when) <= hi
    );
    !r || s.cause?.actor || (s.cause = { trigger: `device ${r.name}`, triggerEntityId: r.entityId });
  }
  return e.filter(
    (s) => !(s.domain === "device_tracker" && !(s.entityId && i.has(s.entityId)))
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
}, fi = {
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
}, mi = /* @__PURE__ */ new Set([
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
]), _i = /* @__PURE__ */ new Set(["person", "device_tracker"]), gi = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function ke(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function vi(t, e, n) {
  const i = t.states[e];
  if (i && t.formatEntityState)
    try {
      const r = t.formatEntityState({ ...i, state: n }, n);
      if (r) return r;
    } catch {
    }
  const s = i?.attributes.unit_of_measurement;
  return n !== "" && !Number.isNaN(Number(n)) ? s ? `${n} ${s}` : n : ke(n);
}
function yi(t, e) {
  return Object.values(t.states).find(
    (i) => i.entity_id.startsWith("zone.") && (i.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? ke(e);
}
function bi(t, e, n, i) {
  if (i === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (i === "unknown") return { verb: "became unknown", tone: "neutral" };
  const o = (n ? t.states[n] : void 0)?.attributes.device_class;
  if (_i.has(e))
    return i === "home" ? { verb: "arrived home", tone: "active" } : i === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${yi(t, i)}`, tone: "active" };
  if (e === "binary_sensor" && o && et[o]) {
    const [c, l, h, p] = et[o];
    if (i === "on") return { verb: c, tone: h ?? "active" };
    if (i === "off") return { verb: l, tone: p ?? "inactive" };
  }
  const r = fi[e]?.[i];
  if (r) return { verb: r[0], tone: r[1] };
  if (gi.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && i === "off") return { verb: "was turned off", tone: "inactive" };
  if (mi.has(e) || i === "on" || i === "off") {
    if (i === "on") return { verb: "was turned on", tone: "active" };
    if (i === "off") return { verb: "was turned off", tone: "inactive" };
  }
  const a = n ? vi(t, n, i) : ke(i);
  return { verb: `changed to ${ye(a, 80)}`, tone: "neutral" };
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
}, N = { hours: [1, 720], entries: [1, 500] }, tt = 60 * 1e3, wi = 10 * 60 * 1e3, nt = 5 * 60 * 1e3;
function q(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function $t(t, [e, n], i) {
  const s = typeof t == "number" ? t : Number(t);
  return Number.isFinite(s) ? Math.min(n, Math.max(e, Math.round(s))) : i;
}
function de(t) {
  return $t(t.hours_to_show, N.hours, w.hours_to_show);
}
function $i(t) {
  return $t(t.max_entries, N.entries, w.max_entries);
}
function xt(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function ue(t, e, n, i, s = !1) {
  const o = xt(t);
  if (!s && i && t.entity_id && !(e.show_diagnostic ?? w.show_diagnostic)) {
    const a = i.entities?.[t.entity_id], c = J(e, i).has(t.entity_id);
    if (a && (a.entity_category || a.hidden) && !c) return !1;
  }
  return !(n && (!t.entity_id || !n.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(o) || e.exclude_domains?.includes(o) || !s && (e.activity ?? w.activity) === "meaningful" && !Xn(t, e, i) || (e.hide_unavailable ?? w.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
const xi = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function ki(t) {
  const e = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (!i.entity_id || i.state === void 0 || i.message !== void 0) continue;
    const s = e.get(i.entity_id);
    s ? s.push(i) : e.set(i.entity_id, [i]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const i of e.values()) {
    i.sort((r, a) => r.when - a.when);
    let s, o = !1;
    for (const r of i) {
      if (xi.has(r.state)) {
        o = !0;
        continue;
      }
      o && s === r.state && !xe(r) && n.add(q(r)), s = r.state, o = !1;
    }
  }
  return n;
}
function Ai(t, e, n) {
  const i = xt(e), s = e.entity_id ? t.states[e.entity_id] : void 0, o = e.name ?? s?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let r, a = "neutral", c = Ln(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: r, tone: a } = bi(t, i, e.entity_id, e.state));
  else {
    const d = e.message ?? "did something";
    if (d.match(/^triggered(?: by (.+))?$/)) {
      r = "was triggered", a = "active";
      const b = Wn(t, e);
      if (b) {
        const x = e.source ?? d.replace(/^triggered by /, "");
        c = { ...c, trigger: b, triggerEntityId: we(x) };
      }
    } else
      r = d, a = /(error|fail)/i.test(d) ? "alert" : "neutral";
  }
  const l = c?.actor;
  l && !l.icon && (l.icon = be[l.kind]);
  const h = i === "person", p = h ? s?.attributes.entity_picture : void 0, g = n.state_color ?? w.state_color;
  return {
    key: q(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: i,
    name: o,
    verb: r,
    tone: a,
    icon: xn(i, e.icon),
    stateValue: e.state,
    picture: p,
    isPerson: h,
    isRun: $e(e),
    cause: c,
    count: 1,
    accent: O(i, s?.attributes.device_class, e.state, a, g)
  };
}
function it(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function Si(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const n = An[t.state ?? ""];
  return n ? e.items.some(
    (i) => i.entityId === t.entity_id && i.phase === n && Math.abs(i.when - t.when * 1e3) <= Sn
  ) : !1;
}
function Ei(t, e = !0, n = /* @__PURE__ */ new Set()) {
  const i = /* @__PURE__ */ new Set();
  for (const s of t) {
    const o = s.cause?.actor;
    if (!o?.entityId || o.kind !== "automation" && o.kind !== "script") continue;
    for (const c of t)
      e && c.isRun && !(c.entityId && n.has(c.entityId)) && c.entityId === o.entityId && Math.abs(c.when - s.when) <= tt && i.add(c);
    const r = s.cause?.triggerEntityId;
    if (!r) continue;
    const a = t.find(
      (c) => c !== s && !c.isRun && c.entityId === r && c.when <= s.when + 5e3 && s.when - c.when <= tt
    );
    a && (i.add(a), s.cause = { ...s.cause, trigger: `${a.name} ${a.verb}`, source: a });
  }
  return t.filter((s) => !i.has(s));
}
function Ii(t, e, n) {
  return ne(n) ? _n(t, e, J(n, t)) : e;
}
function Ci(t, e, n, i, s, o, r) {
  const a = i - de(n) * 36e5, c = $i(n), l = n.collapse_repeats ?? w.collapse_repeats, h = (o?.items ?? []).filter(
    (u) => u.when >= a && u.when <= i + nt
  ), p = o ? { items: h, vacuums: o.vacuums } : void 0, g = [...e], d = g.filter((u) => u.domain === "homeassistant" && u.message === "started").map((u) => u.when), f = J(n, t), b = n.hide_unavailable ?? w.hide_unavailable ? ki(g) : /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Map();
  for (const u of g) {
    const y = $e(u) ? u.source ?? u.message?.replace(/^triggered by /, "") : u.context_event_type === "automation_triggered" || u.context_event_type === "script_started" ? u.context_source ?? u.context_message?.replace(/^triggered by /, "") : void 0, A = we(y);
    A && x.set(A, [...x.get(A) ?? [], u.when]);
  }
  const $ = (u) => !!u.entity_id && (x.get(u.entity_id) ?? []).some((y) => u.when <= y + 5 && y - u.when <= 60), v = /* @__PURE__ */ new Set(), k = (u) => (n.activity ?? w.activity) !== "meaningful" ? !1 : u.domain === "homeassistant" ? u.message === "stopped" && d.some((y) => y >= u.when && y - u.when <= 900) : xe(u) || $(u) || u.entity_id && f.has(u.entity_id) || Jn.has(u.domain ?? u.entity_id?.split(".")[0] ?? "") ? !1 : d.some((y) => u.when >= y - 30 && u.when <= y + 180), kt = g.filter((u) => {
    const y = u.when * 1e3;
    return y >= a && y <= i + nt;
  }).filter((u) => ue(u, n, s, t) ? !0 : ne(n) && $(u) && ue(u, n, s, t, !0) ? (v.add(q(u)), !0) : !1).filter((u) => !b.has(q(u))).filter((u) => !k(u)).filter((u) => !Si(u, p)).sort((u, y) => y.when - u.when), Se = n.automation_runs ?? w.automation_runs, At = Kn(
    t,
    [
      ...kt.map((u) => {
        const y = Ai(t, u, n);
        return v.has(y.key) && (y.soft = !0), y;
      }),
      ...h
    ],
    Se,
    n.state_color ?? w.state_color,
    n.show_actions === !1 ? void 0 : r,
    f
  ).sort((u, y) => y.when - u.when), St = Ei(At, Se !== "all", f).filter((u) => !u.soft), Ee = fn(
    ln(
      Ii(t, pi(t, St, n), n),
      n.chatty ?? w.chatty,
      f
    )
  ), Et = Qn(
    (ne(n) ? ui(t, Ee) : Ee).sort(
      (u, y) => y.when - u.when
    ),
    n
  ), L = [];
  let oe = 0;
  for (const u of Et) {
    const y = L[L.length - 1];
    if (l && y && !u.rich && !y.rich && u.entityId && y.entityId === u.entityId && y.verb === u.verb && it(y) === it(u) && oe - u.when <= wi) {
      y.count += 1, oe = u.when;
      continue;
    }
    if (L.push(u), oe = u.when, L.length > c) break;
  }
  const Ie = L.slice(0, c);
  (n.order ?? w.order) === "oldest_first" && Ie.reverse();
  const X = [];
  for (const u of Ie) {
    const y = Qt(u.when);
    let A = X[X.length - 1];
    (!A || A.key !== y) && (A = { key: y, label: sn(u.when, i), items: [] }, X.push(A)), A.items.push(u);
  }
  return X;
}
function Ti(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const n = t.cause;
  return n?.actor && (e += ` by ${n.actor.name}`), n?.trigger && (e += `, triggered by ${n.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), t.effects?.length && (e += `. ${t.effects.map((i) => `${i.name} ${i.verb}`).join(". ")}`), e;
}
var Oi = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, z = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Mi(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && Oi(e, n, s), s;
};
const st = 3e3, Ri = 6e4;
let I = class extends D {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._traceBudget = 0, this._registryRefs = [], this._resolveRun = (t) => {
      const e = this._hass;
      if (!e || !t.entityId) return;
      const n = this._traces ??= new wn(e), i = n.lookup(t.entityId, t.when, 15e3);
      if (i) return vn(i);
      this._traceBudget-- > 0 && n.ensure(t.entityId, t.when, 15e3)?.then(() => this._scheduleRecompute());
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Bi), document.createElement("what-happened-card-editor");
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
    const n = [t.entities, t.devices, t.areas], i = n.some((s, o) => s !== this._registryRefs[o]);
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
    }, Ri), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    const n = e.vacuum_details === !1 ? [] : In(t).filter((o) => this._vacuumVisible(o, e)), i = JSON.stringify([...n].sort());
    if (i === this._vacKey) return;
    this._vacKey = i, this._unsubscribeVacuums(), this._vacuums.clear();
    const s = this._vacToken;
    for (const o of n) {
      const r = { entityId: o, log: [], runs: [] };
      this._vacuums.set(o, r), t.connection.subscribeMessage(
        (a) => {
          s === this._vacToken && (r.log = a.log ?? [], this._refreshHistory(r), this._scheduleRecompute());
        },
        { type: "tapo_rv30/planner/subscribe", entity_id: o }
      ).then((a) => {
        s !== this._vacToken ? a() : this._vacUnsubs.push(a);
      }).catch(() => {
      }), this._refreshHistory(r);
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
    Nn(e.target) && (n = yt(t, e.target));
    const i = de(e), s = JSON.stringify([i, n ? [...n].sort() : null]);
    if (s === this._subKey) {
      this._allowed = n;
      return;
    }
    if (this._subKey = s, this._allowed = n, this._unsubscribe(), this._entries.clear(), this._error = void 0, n && n.size === 0) {
      this._loading = !1;
      return;
    }
    this._loading = !0;
    const o = this._subToken, r = new Date(Date.now() - i * 36e5);
    on(
      t,
      (a) => {
        if (o !== this._subToken) return;
        const c = this._config;
        for (const l of a)
          c && !ue(l, c, this._allowed, this._hass) || this._entries.set(q(l), l);
        this._entries.size > st && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
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
    this._entries = new Map(t.slice(0, st));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    if (!this._hass || !this._config) return;
    this._now = Date.now(), this._traceBudget = 40;
    const t = Ci(
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
        !s.log.length && !s.runs.length || (n.add(s.entityId), i.push(...Rn(t, s, e)));
    return { items: i, vacuums: n };
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
    const e = this._groups.reduce((s, o) => s + o.items.length, 0), n = this._groups[this._groups.length - 1], i = n?.items[n.items.length - 1]?.key;
    return _`
      <ha-card
        class=${B({
      compact: t.compact ?? w.compact,
      "has-header": !!t.title
    })}
        style=${Z({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? _`<h1 class="card-header">${t.title}</h1>` : m}
        <div class="scroll">
          ${this._error ? _`<ha-alert alert-type="error">${this._error}</ha-alert>` : this._loading && e === 0 ? _`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : _`<ol>
                      ${this._groups.map((s) => this._renderGroup(s, t, i))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = de(t), n = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, i = e === 1 ? "No activity in the last hour" : `No activity in the last ${n}`;
    return _`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${i}
    </div>`;
  }
  _renderGroup(t, e, n) {
    const i = e.show_day_headers ?? w.show_day_headers;
    return _`
      ${i ? _`<li class="day" role="presentation">${t.label}</li>` : m}
      ${t.items.map((s) => this._renderItem(s, e, s.key === n))}
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
    const i = e.show_avatars ?? w.show_avatars, s = e.show_cause ?? w.show_cause, o = !!t.entityId && (e.tap_action ?? w.tap_action) !== "none", r = i && t.picture;
    return _`
      <li class=${B({ item: !0, last: n })}>
        <div class="rail">
          <div
            class=${B({ node: !0, photo: !!r })}
            style=${Z({ "--accent": t.accent })}
          >
            ${r ? _`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${B({ row: !0, clickable: o })}
          style=${Z({ "--accent": t.accent })}
          role=${o ? "button" : "text"}
          tabindex=${o ? "0" : "-1"}
          aria-label=${Ti(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : _`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? _`<span class="count">×${t.count}</span>` : m}
            </div>
            ${t.details?.length ? _`<div class="secondary">${t.details.join(" · ")}</div>` : m}
            ${s ? this._renderCause(t, i) : m}
            ${s ? this._renderVia(t) : m} ${this._renderEffects(t)}
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
    const i = n.by ?? n.actor, s = n.by ? n.actor : void 0, o = !!i?.entityId && (this._config?.tap_action ?? w.tap_action) !== "none";
    return _`
      <div class="secondary">
        ${i ? _`by${e && i.kind === "user" ? this._renderAvatar(i) : m}
              ${o ? this._actorLink(i) : _`<span title=${i.detail ?? i.name}>${i.name}</span>`}` : m}${s ? _`, via ${this._actorLink(s)}` : m}${i && n.trigger ? ", " : m}${n.trigger ? _`${i ? "triggered by" : "by"} ${n.trigger}` : m}
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
      (n, i) => _`${i ? ", " : m}${n.entityId && e ? this._actorLink(n) : n.name}`
    )}
    </div>`;
  }
  /** What one action caused: a line per thing, under the entry that started it. */
  _renderEffects(t) {
    if (!t.effects?.length) return m;
    const e = (this._config?.tap_action ?? w.tap_action) !== "none";
    return _`<ul class="effects">
      ${t.effects.map((n) => {
      const i = n.entityId && !n.fixedIcon ? this._hass?.states[n.entityId] : void 0, s = e && !!n.entityId;
      return _`<li
          class=${B({ effect: !0, clickable: s })}
          style=${Z({ "--accent": n.accent })}
          role=${s ? "button" : "text"}
          tabindex=${s ? "0" : "-1"}
          @click=${(o) => {
        s && (o.stopPropagation(), this._moreInfo(n.entityId));
      }}
          @keydown=${(o) => {
        (o.key === "Enter" || o.key === " ") && (o.stopPropagation(), o.preventDefault(), s && this._moreInfo(n.entityId));
      }}
        >
          <span class="e-icon"
            >${i ? _`<ha-state-icon
                    .hass=${this._hass}
                    .stateObj=${i}
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
    const n = e.time_display ?? w.time_display, i = gt(t.when, this._hass), s = nn(t.when, this._now);
    return _`
      <div class="time" title=${tn(t.when, this._hass)}>
        ${n !== "relative" ? _`<span class="abs">${i}</span>` : m}
        ${n !== "absolute" ? _`<span class="rel">${s}</span>` : m}
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
var Pi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, Ae = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? Ni(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && Pi(e, n, s), s;
};
const le = [
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
].map((t) => ({ value: t, label: t })), Di = {
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
}, Ui = {
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
}, ji = [
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
], Hi = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_labels", selector: { label: { multiple: !0 } } },
  {
    name: "also_show_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: le }
    }
  },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: le }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: le }
    }
  }
], zi = [
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
], Li = [
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
], Wi = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: Hi },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: zi },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: Li }
];
let j = class extends D {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Di[t.name] ?? t.name, this._computeHelper = (t) => Ui[t.name];
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
    for (const [i, s] of Object.entries(e))
      i === "type" || s === void 0 || s === "" || Array.isArray(s) && s.length === 0 || i === "target" && (!s || Object.keys(s).length === 0) || w[i] === s && !(i in this._config) || (n[i] = s);
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
      ${this._form(ji)}
      ${Wi.map(
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
const Bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return j;
  }
}, Symbol.toStringTag, { value: "Module" }));
