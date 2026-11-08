/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, Z = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), oe = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Z && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = oe.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && oe.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const We = (t) => new Ae(typeof t == "string" ? t : t + "", void 0, J), ke = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, n, o) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new Ae(i, t, J);
}, Be = (t, e) => {
  if (Z) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), n = W.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, t.appendChild(r);
  }
}, se = Z ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return We(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Fe, defineProperty: Ke, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: Ve, getOwnPropertySymbols: qe, getPrototypeOf: Ye } = Object, K = globalThis, ae = K.trustedTypes, Ze = ae ? ae.emptyScript : "", Je = K.reactiveElementPolyfillSupport, N = (t, e) => t, B = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ze : null;
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
} }, X = (t, e) => !Fe(t, e), ce = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ??= Symbol("metadata"), K.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ce) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(e, r, i);
      n !== void 0 && Ke(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: n, set: o } = Ge(this.prototype, e) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: n, set(s) {
      const l = n?.call(this);
      o?.call(this, s), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Ye(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const i = this.properties, r = [...Ve(i), ...qe(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r) i.unshift(se(n));
    } else e !== void 0 && i.push(se(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Be(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : B).toAttribute(i, r.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, n = r._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = r.getPropertyOptions(n), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : B;
      this._$Em = n;
      const l = s.fromAttribute(i, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, n = !1, o) {
    if (e !== void 0) {
      const s = this.constructor;
      if (n === !1 && (o = this[e]), r ??= s.getPropertyOptions(e), !((r.hasChanged ?? X)(o, i) || r.useDefault && r.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: n, wrapped: o }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? i ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: s } = o, l = this[n];
        s !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[N("elementProperties")] = /* @__PURE__ */ new Map(), E[N("finalized")] = /* @__PURE__ */ new Map(), Je?.({ ReactiveElement: E }), (K.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, le = (t) => t, F = Q.trustedTypes, de = F ? F.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Se = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + w, Xe = `<${Ee}>`, k = document, D = () => k.createComment(""), H = (t) => t === null || typeof t != "object" && typeof t != "function", ee = Array.isArray, Qe = (t) => ee(t) || typeof t?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ue = />/g, x = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, me = /"/g, Ce = /^(?:script|style|textarea|title)$/i, et = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), m = et(1), y = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), A = k.createTreeWalker(k, 129);
function Oe(t, e) {
  if (!ee(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(e) : e;
}
const tt = (t, e) => {
  const i = t.length - 1, r = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = U;
  for (let l = 0; l < i; l++) {
    const a = t[l];
    let c, u, h = -1, g = 0;
    for (; g < a.length && (s.lastIndex = g, u = s.exec(a), u !== null); ) g = s.lastIndex, s === U ? u[1] === "!--" ? s = he : u[1] !== void 0 ? s = ue : u[2] !== void 0 ? (Ce.test(u[2]) && (n = RegExp("</" + u[2], "g")), s = x) : u[3] !== void 0 && (s = x) : s === x ? u[0] === ">" ? (s = n ?? U, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? x : u[3] === '"' ? me : pe) : s === me || s === pe ? s = x : s === he || s === ue ? s = U : (s = x, n = void 0);
    const f = s === x && t[l + 1].startsWith("/>") ? " " : "";
    o += s === U ? a + Xe : h >= 0 ? (r.push(c), a.slice(0, h) + Se + a.slice(h) + w + f) : a + w + (h === -2 ? l : f);
  }
  return [Oe(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class j {
  constructor({ strings: e, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const l = e.length - 1, a = this.parts, [c, u] = tt(e, i);
    if (this.el = j.createElement(c, r), A.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = A.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Se)) {
          const g = u[s++], f = n.getAttribute(h).split(w), _ = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: o, name: _[2], strings: f, ctor: _[1] === "." ? rt : _[1] === "?" ? nt : _[1] === "@" ? ot : G }), n.removeAttribute(h);
        } else h.startsWith(w) && (a.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Ce.test(n.tagName)) {
          const h = n.textContent.split(w), g = h.length - 1;
          if (g > 0) {
            n.textContent = F ? F.emptyScript : "";
            for (let f = 0; f < g; f++) n.append(h[f], D()), A.nextNode(), a.push({ type: 2, index: ++o });
            n.append(h[g], D());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ee) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(w, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += w.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const r = k.createElement("template");
    return r.innerHTML = e, r;
  }
}
function P(t, e, i = t, r) {
  if (e === y) return e;
  let n = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const o = H(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = n : i._$Cl = n), n !== void 0 && (e = P(t, n._$AS(t, e.values), n, r)), e;
}
class it {
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
    const { el: { content: i }, parts: r } = this._$AD, n = (e?.creationScope ?? k).importNode(i, !0);
    A.currentNode = n;
    let o = A.nextNode(), s = 0, l = 0, a = r[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let c;
        a.type === 2 ? c = new z(o, o.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (c = new st(o, this, e)), this._$AV.push(c), a = r[++l];
      }
      s !== a?.index && (o = A.nextNode(), s++);
    }
    return A.currentNode = k, n;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = P(this, e, i), H(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== y && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Qe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && H(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = j.createElement(Oe(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new it(n, this), s = o.u(this.options);
      o.p(i), this.T(s), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = fe.get(e.strings);
    return i === void 0 && fe.set(e.strings, i = new j(e)), i;
  }
  k(e) {
    ee(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of e) n === i.length ? i.push(r = new z(this.O(D()), this.O(D()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = le(e).nextSibling;
      le(e).remove(), e = r;
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
  constructor(e, i, r, n, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = p;
  }
  _$AI(e, i = this, r, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = P(this, e, i, 0), s = !H(e) || e !== this._$AH && e !== y, s && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = o[0], a = 0; a < o.length - 1; a++) c = P(this, l[r + a], i, a), c === y && (c = this._$AH[a]), s ||= !H(c) || c !== this._$AH[a], c === p ? e = p : e !== p && (e += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class rt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class nt extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class ot extends G {
  constructor(e, i, r, n, o) {
    super(e, i, r, n, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = P(this, e, i, 0) ?? p) === y) return;
    const r = this._$AH, n = e === p && r !== p || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== p && (r === p || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class st {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    P(this, e);
  }
}
const at = Q.litHtmlPolyfillSupport;
at?.(j, z), (Q.litHtmlVersions ??= []).push("3.3.3");
const ct = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    r._$litPart$ = n = new z(e.insertBefore(D(), o), o, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis;
let T = class extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ct(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return y;
  }
};
T._$litElement$ = !0, T.finalized = !0, te.litElementHydrateSupport?.({ LitElement: T });
const lt = te.litElementPolyfillSupport;
lt?.({ LitElement: T });
(te.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: X }, ht = (t = dt, e, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), r === "accessor") {
    const { name: s } = i;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(s, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, t, l), l;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(l) {
      const a = this[s];
      e.call(this, l), this.requestUpdate(s, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Pe(t) {
  return (e, i) => typeof i == "object" ? ht(t, e, i) : ((r, n, o) => {
    const s = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), s ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(t) {
  return Pe({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = { ATTRIBUTE: 1 }, Re = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ie = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, r) {
    this._$Ct = e, this._$AM = i, this._$Ci = r;
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
const L = Re(class extends Ie {
  constructor(t) {
    if (super(t), t.type !== Me.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in e) e[r] && !this.nt?.has(r) && this.st.add(r);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const r of this.st) r in e || (i.remove(r), this.st.delete(r));
    for (const r in e) {
      const n = !!e[r];
      n === this.st.has(r) || this.nt?.has(r) || (n ? (i.add(r), this.st.add(r)) : (i.remove(r), this.st.delete(r)));
    }
    return y;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = "important", ut = " !" + Ue, S = Re(class extends Ie {
  constructor(t) {
    if (super(t), t.type !== Me.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const r = t[i];
      return r == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const r of this.ft) e[r] == null && (this.ft.delete(r), r.includes("-") ? i.removeProperty(r) : i[r] = null);
    for (const r in e) {
      const n = e[r];
      if (n != null) {
        this.ft.add(r);
        const o = typeof n == "string" && n.endsWith(ut);
        r.includes("-") || o ? i.setProperty(r, o ? n.slice(0, -11) : n, o ? Ue : "") : i[r] = n;
      }
    }
    return y;
  }
}), pt = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  fan: "mdi:fan",
  cover: "mdi:window-shutter",
  climate: "mdi:thermostat",
  humidifier: "mdi:air-humidifier",
  lock: "mdi:lock",
  alarm_control_panel: "mdi:shield-home",
  binary_sensor: "mdi:radiobox-blank",
  sensor: "mdi:eye",
  person: "mdi:account",
  device_tracker: "mdi:cellphone",
  media_player: "mdi:cast",
  vacuum: "mdi:robot-vacuum",
  lawn_mower: "mdi:robot-mower",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  button: "mdi:gesture-tap-button",
  input_button: "mdi:gesture-tap-button",
  input_boolean: "mdi:toggle-switch-outline",
  input_select: "mdi:format-list-bulleted",
  select: "mdi:format-list-bulleted",
  update: "mdi:package-up",
  sun: "mdi:white-balance-sunny",
  weather: "mdi:weather-partly-cloudy",
  timer: "mdi:timer-outline",
  calendar: "mdi:calendar",
  camera: "mdi:video",
  siren: "mdi:bullhorn",
  valve: "mdi:valve",
  water_heater: "mdi:water-boiler",
  event: "mdi:calendar-star",
  group: "mdi:google-circles-communities",
  homeassistant: "mdi:home-assistant",
  zone: "mdi:map-marker-radius",
  schedule: "mdi:calendar-clock"
}, _e = {
  // [on icon, off icon]
  door: ["mdi:door-open", "mdi:door-closed"],
  garage_door: ["mdi:garage-open", "mdi:garage"],
  opening: ["mdi:square-outline", "mdi:square"],
  window: ["mdi:window-open", "mdi:window-closed"],
  motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
  moving: ["mdi:octagon", "mdi:octagon-outline"],
  occupancy: ["mdi:home", "mdi:home-outline"],
  presence: ["mdi:home", "mdi:home-outline"],
  smoke: ["mdi:smoke", "mdi:smoke-detector-variant"],
  gas: ["mdi:alert-circle", "mdi:check-circle"],
  carbon_monoxide: ["mdi:smoke", "mdi:check-circle"],
  moisture: ["mdi:water", "mdi:water-off"],
  problem: ["mdi:alert-circle", "mdi:check-circle"],
  safety: ["mdi:alert-circle", "mdi:check-circle"],
  tamper: ["mdi:alert-circle", "mdi:check-circle"],
  connectivity: ["mdi:check-network-outline", "mdi:close-network-outline"],
  plug: ["mdi:power-plug", "mdi:power-plug-off"],
  power: ["mdi:flash", "mdi:flash-off"],
  battery: ["mdi:battery-alert", "mdi:battery"],
  battery_charging: ["mdi:battery-charging", "mdi:battery"],
  cold: ["mdi:snowflake", "mdi:thermometer"],
  heat: ["mdi:fire", "mdi:thermometer"],
  light: ["mdi:brightness-7", "mdi:brightness-5"],
  sound: ["mdi:music-note", "mdi:music-note-off"],
  vibration: ["mdi:vibrate", "mdi:crop-portrait"],
  running: ["mdi:play", "mdi:stop"],
  lock: ["mdi:lock-open", "mdi:lock"],
  update: ["mdi:package-up", "mdi:package"]
}, mt = {
  lock: { locked: "mdi:lock", unlocked: "mdi:lock-open-variant", jammed: "mdi:lock-alert" },
  cover: { open: "mdi:window-shutter-open", closed: "mdi:window-shutter" },
  person: { home: "mdi:account", not_home: "mdi:account-arrow-right" },
  device_tracker: { home: "mdi:cellphone", not_home: "mdi:cellphone-arrow-down" },
  light: { off: "mdi:lightbulb-off", on: "mdi:lightbulb-on" },
  switch: { off: "mdi:toggle-switch-variant-off", on: "mdi:toggle-switch-variant" },
  media_player: { playing: "mdi:play-circle", paused: "mdi:pause-circle", off: "mdi:power" },
  alarm_control_panel: { disarmed: "mdi:shield-off", triggered: "mdi:bell-ring" },
  vacuum: { docked: "mdi:home-import-outline", cleaning: "mdi:robot-vacuum" }
};
function ge(t, e, i, r) {
  const n = e?.attributes.icon ?? r;
  if (n) return n;
  const o = e?.attributes.device_class;
  if (t === "binary_sensor" && o && _e[o])
    return _e[o][i === "on" ? 0 : 1];
  const s = i ? mt[t]?.[i] : void 0;
  return s || (pt[t] ?? "mdi:circle-medium");
}
const d = {
  red: "var(--red-color, #f44336)",
  pink: "var(--pink-color, #e91e63)",
  purple: "var(--purple-color, #926bc7)",
  deepPurple: "var(--deep-purple-color, #6e41ab)",
  indigo: "var(--indigo-color, #3f51b5)",
  blue: "var(--blue-color, #2196f3)",
  lightBlue: "var(--light-blue-color, #03a9f4)",
  cyan: "var(--cyan-color, #00bcd4)",
  teal: "var(--teal-color, #009688)",
  green: "var(--green-color, #4caf50)",
  lightGreen: "var(--light-green-color, #8bc34a)",
  amber: "var(--amber-color, #ffc107)",
  orange: "var(--orange-color, #ff9800)",
  deepOrange: "var(--deep-orange-color, #ff6f22)",
  brown: "var(--brown-color, #795548)",
  blueGrey: "var(--blue-grey-color, #607d8b)",
  primary: "var(--primary-color, #03a9f4)"
}, ft = {
  light: d.amber,
  switch: d.orange,
  input_boolean: d.orange,
  group: d.orange,
  fan: d.cyan,
  climate: d.deepOrange,
  humidifier: d.lightBlue,
  water_heater: d.deepOrange,
  cover: d.indigo,
  valve: d.indigo,
  lock: d.green,
  alarm_control_panel: d.red,
  siren: d.red,
  binary_sensor: d.teal,
  sensor: d.blue,
  person: d.purple,
  device_tracker: d.purple,
  media_player: d.pink,
  vacuum: d.teal,
  lawn_mower: d.green,
  automation: d.purple,
  script: d.deepPurple,
  scene: d.pink,
  button: d.lightGreen,
  input_button: d.lightGreen,
  event: d.lightGreen,
  update: d.blue,
  sun: d.amber,
  weather: d.lightBlue,
  timer: d.brown,
  calendar: d.red,
  camera: d.blueGrey,
  homeassistant: d.blue
}, q = {
  user: d.primary,
  automation: d.purple,
  script: d.deepPurple,
  scene: d.pink,
  service: d.blueGrey,
  entity: d.teal,
  other: d.blueGrey,
  trigger: d.orange
};
function _t(t, e, i) {
  return i ? e === "alert" ? d.red : e === "inactive" ? "var(--state-inactive-color, var(--grey-color, #9e9e9e))" : ft[t] ?? d.primary : e === "alert" ? d.red : d.primary;
}
const gt = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function vt(t) {
  const e = t.toLowerCase();
  return e.startsWith("numeric state") ? "mdi:chart-line" : e.startsWith("state") ? "mdi:swap-horizontal" : e.startsWith("time pattern") ? "mdi:timer-sand" : e.startsWith("time") ? "mdi:clock-outline" : e.startsWith("sun") ? "mdi:white-balance-sunny" : e.startsWith("event") ? "mdi:flash" : e.startsWith("webhook") ? "mdi:webhook" : e.startsWith("mqtt") ? "mdi:access-point-network" : e.startsWith("zone") ? "mdi:map-marker-radius" : e.startsWith("homeassistant") ? "mdi:home-assistant" : e.startsWith("calendar") ? "mdi:calendar" : e.startsWith("tag") ? "mdi:nfc-variant" : "mdi:flash-outline";
}
const ie = "en-US";
function ve(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function bt(t) {
  const e = new Date(t), i = (r) => String(r).padStart(2, "0");
  return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}`;
}
function wt(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function Ne(t, e, i = !1) {
  const r = wt(e);
  return new Intl.DateTimeFormat(ie, {
    hour: r ? "numeric" : "2-digit",
    minute: "2-digit",
    second: i ? "2-digit" : void 0,
    hourCycle: r ? "h12" : "h23"
  }).format(t);
}
function yt(t, e) {
  return `${new Intl.DateTimeFormat(ie, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${Ne(t, e, !0)}`;
}
function $t(t, e) {
  const i = Math.max(0, Math.round((e - t) / 1e3));
  if (i < 45) return "just now";
  const r = Math.round(i / 60);
  if (r < 60) return `${r} min ago`;
  const n = Math.round(r / 60);
  return n < 24 ? `${n} h ago` : `${Math.round(n / 24)} d ago`;
}
function xt(t, e) {
  const i = Math.round((ve(e) - ve(t)) / 864e5);
  if (i === 0) return "Today";
  if (i === 1) return "Yesterday";
  const r = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(ie, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: r ? void 0 : "numeric"
  }).format(t);
}
function At(t, e, i, r) {
  const n = {
    type: "logbook/event_stream",
    start_time: i.toISOString()
  };
  return r && r.length > 0 && (n.entity_ids = r), t.connection.subscribeMessage(
    (o) => e(o.events ?? []),
    n
  );
}
const kt = ke`
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
    --wh-surface: var(--ha-card-background, var(--card-background-color, #fff));
  }
  ha-card.compact {
    --wh-node: 28px;
  }
  .card-header {
    flex: none;
  }
  .scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    max-height: var(--wh-max-height, none);
    padding: 0 16px 8px;
    overscroll-behavior: contain;
  }
  ha-card:not(.has-header) .scroll {
    padding-top: 8px;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Day headers */
  .day {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    background: var(--wh-surface);
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .day::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
  }

  /* Entries */
  .item {
    display: grid;
    grid-template-columns: var(--wh-node) minmax(0, 1fr);
    column-gap: 12px;
  }
  .rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
  }
  .line {
    flex: 1;
    width: 2px;
    min-height: 8px;
    margin-top: 4px;
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
    width: var(--wh-node);
    height: var(--wh-node);
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    color: var(--accent);
    --mdc-icon-size: calc(var(--wh-node) * 0.55);
  }
  .node.photo {
    background: none;
    box-shadow: 0 0 0 2px var(--accent);
  }
  .photo-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .badge {
    position: absolute;
    right: -4px;
    bottom: -4px;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid var(--wh-surface);
    overflow: hidden;
    display: grid;
    place-items: center;
    background: var(--chip);
    color: var(--text-primary-color, #fff);
    font-size: 9px;
    font-weight: 600;
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
    gap: 12px;
    margin: 0 -8px 12px;
    padding: 4px 8px;
    border-radius: 10px;
    min-width: 0;
    outline: none;
    transition: background-color 120ms ease;
  }
  .row.clickable {
    cursor: pointer;
  }
  .row.clickable:hover {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }
  .row.clickable:focus-visible {
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .body {
    min-width: 0;
    flex: 1;
  }
  .sentence {
    font-size: 14px;
    line-height: 20px;
    color: var(--primary-text-color);
    overflow-wrap: anywhere;
  }
  .subject {
    font-weight: 500;
  }
  .count {
    display: inline-block;
    margin-left: 6px;
    padding: 0 7px;
    border-radius: 9px;
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    color: var(--primary-text-color);
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    vertical-align: 1px;
  }
  .cause {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 6px;
    margin-top: 4px;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 18px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    max-width: 100%;
    box-sizing: border-box;
    padding: 2px 8px 2px 4px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--chip) 16%, transparent);
    color: var(--primary-text-color);
    font: inherit;
    font-size: 12px;
    line-height: 18px;
    --mdc-icon-size: 14px;
  }
  .chip ha-icon {
    color: var(--chip);
    display: inline-flex;
  }
  .chip .avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: cover;
    flex: none;
  }
  .chip .initial {
    display: grid;
    place-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex: none;
    background: var(--chip);
    color: var(--text-primary-color, #fff);
    font-size: 10px;
    font-weight: 600;
  }
  .chip .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  button.chip {
    cursor: pointer;
  }
  button.chip:hover {
    background: color-mix(in srgb, var(--chip) 28%, transparent);
  }
  button.chip:focus-visible {
    outline: 2px solid var(--primary-color);
  }

  .time {
    flex: none;
    text-align: right;
    font-size: 12px;
    line-height: 18px;
    color: var(--secondary-text-color);
    padding-top: 1px;
  }
  .time .abs {
    display: block;
    color: var(--primary-text-color);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .state {
    padding: 32px 8px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 14px;
  }
  .state ha-icon {
    display: block;
    margin: 0 auto 8px;
    --mdc-icon-size: 36px;
    color: var(--disabled-text-color);
  }
  .state.error {
    color: var(--error-color);
  }

  ha-card.compact .sentence {
    font-size: 13px;
    line-height: 18px;
  }
  ha-card.compact .row {
    margin-bottom: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  ha-card.compact .cause {
    margin-top: 2px;
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
      gap: 2px;
    }
    .time {
      display: flex;
      gap: 6px;
      text-align: left;
      padding-top: 0;
    }
    .time .abs {
      display: inline;
    }
    .item {
      column-gap: 10px;
    }
  }
`;
function C(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function St(t) {
  return t ? Object.values(t).some((e) => C(e).length > 0) : !1;
}
function Et(t, e) {
  const i = /* @__PURE__ */ new Set(), r = t.entities ?? {}, n = t.devices ?? {}, o = t.areas ?? {}, s = new Set(C(e.area_id));
  for (const c of C(e.floor_id))
    for (const u of Object.values(o))
      u.floor_id === c && s.add(u.area_id);
  const l = new Set(C(e.device_id)), a = new Set(C(e.label_id));
  for (const c of C(e.entity_id)) i.add(c);
  for (const c of Object.values(r)) {
    const u = c.device_id ? n[c.device_id] : void 0, h = c.area_id ?? u?.area_id ?? void 0;
    h && s.has(h) && i.add(c.entity_id), c.device_id && l.has(c.device_id) && i.add(c.entity_id), c.labels?.some((g) => a.has(g)) && i.add(c.entity_id), u?.labels?.some((g) => a.has(g)) && i.add(c.entity_id);
  }
  return i;
}
const Ct = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function De(t, e) {
  return e.replace(Ct, (i) => t.states[i]?.attributes.friendly_name ?? i);
}
function Ot(t, e) {
  for (const [i, r] of Object.entries(t.states))
    if (i.startsWith("person.") && r.attributes.user_id === e)
      return {
        entityId: i,
        name: r.attributes.friendly_name ?? i,
        picture: r.attributes.entity_picture
      };
}
function Tt(t, e) {
  let i = e.context_source;
  return !i && e.context_message?.startsWith("triggered by ") && (i = e.context_message.slice(13)), i ? De(t, i) : void 0;
}
function Pt(t, e) {
  const i = Ot(t, e);
  return i ? { kind: "user", name: i.name, entityId: i.entityId, picture: i.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function be(t, e, i) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? i ?? e ?? "Unknown";
}
function Mt(t, e) {
  const i = e.context_event_type;
  if (i === "automation_triggered" || i === "script_started")
    return { actor: {
      kind: i === "automation_triggered" ? "automation" : "script",
      name: be(
        t,
        e.context_entity_id,
        e.context_name ?? e.context_entity_id_name
      ),
      entityId: e.context_entity_id
    }, trigger: Tt(t, e) };
  if (e.context_user_id) {
    const r = Pt(t, e.context_user_id);
    return e.context_domain && e.context_service && (r.detail = `${e.context_domain}.${e.context_service}`), { actor: r };
  }
  if (i === "call_service" && e.context_domain && e.context_service) {
    const r = `${e.context_domain}.${e.context_service}`;
    return e.context_domain === "scene" ? { actor: { kind: "scene", name: "A scene", detail: r } } : { actor: { kind: "service", name: r, detail: r } };
  }
  if (i === "logbook_entry" && e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
  if (e.context_entity_id)
    return { actor: {
      kind: "entity",
      name: be(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function Rt(t, e) {
  const i = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return i ? De(t, i) : void 0;
}
const we = {
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
}, It = {
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
}, Ut = /* @__PURE__ */ new Set([
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
]), Nt = /* @__PURE__ */ new Set(["person", "device_tracker"]), Dt = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function re(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ht(t, e, i) {
  const r = t.states[e];
  if (r && t.formatEntityState)
    try {
      const s = t.formatEntityState({ ...r, state: i }, i);
      if (s) return s;
    } catch {
    }
  const n = r?.attributes.unit_of_measurement;
  return i !== "" && !Number.isNaN(Number(i)) ? n ? `${i} ${n}` : i : re(i);
}
function jt(t, e) {
  return Object.values(t.states).find(
    (r) => r.entity_id.startsWith("zone.") && (r.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? re(e);
}
function zt(t, e, i, r) {
  if (r === "unavailable") return { verb: "became unavailable", tone: "alert" };
  if (r === "unknown") return { verb: "became unknown", tone: "neutral" };
  const o = (i ? t.states[i] : void 0)?.attributes.device_class;
  if (Nt.has(e))
    return r === "home" ? { verb: "arrived home", tone: "active" } : r === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${jt(t, r)}`, tone: "active" };
  if (e === "binary_sensor" && o && we[o]) {
    const [a, c, u, h] = we[o];
    if (r === "on") return { verb: a, tone: u ?? "active" };
    if (r === "off") return { verb: c, tone: h ?? "inactive" };
  }
  const s = It[e]?.[r];
  if (s) return { verb: s[0], tone: s[1] };
  if (Dt.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && r === "off") return { verb: "was turned off", tone: "inactive" };
  if (Ut.has(e) || r === "on" || r === "off") {
    if (r === "on") return { verb: "was turned on", tone: "active" };
    if (r === "off") return { verb: "was turned off", tone: "inactive" };
  }
  return { verb: `changed to ${i ? Ht(t, i, r) : re(r)}`, tone: "neutral" };
}
const v = {
  hours_to_show: 24,
  max_entries: 50,
  order: "newest_first",
  show_cause: !0,
  show_avatars: !0,
  show_day_headers: !0,
  colorful: !0,
  compact: !1,
  time_display: "both",
  tap_action: "more-info",
  hide_unavailable: !0,
  collapse_repeats: !0
}, O = { hours: [1, 720], entries: [1, 500] }, Lt = 10 * 60 * 1e3, Wt = 5 * 60 * 1e3;
function He(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function je(t, [e, i], r) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? Math.min(i, Math.max(e, Math.round(n))) : r;
}
function Y(t) {
  return je(t.hours_to_show, O.hours, v.hours_to_show);
}
function Bt(t) {
  return je(t.max_entries, O.entries, v.max_entries);
}
function ze(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function Le(t, e, i) {
  const r = ze(t);
  return !(i && (!t.entity_id || !i.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(r) || e.exclude_domains?.includes(r) || (e.hide_unavailable ?? v.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function Ft(t, e, i) {
  const r = ze(e), n = e.entity_id ? t.states[e.entity_id] : void 0, o = e.name ?? n?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let s, l = "neutral", a = Mt(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: s, tone: l } = zt(t, r, e.entity_id, e.state));
  else {
    const f = e.message ?? "did something";
    if (f.match(/^triggered(?: by (.+))?$/)) {
      s = "was triggered", l = "active";
      const b = Rt(t, e);
      b && (a = { ...a, trigger: b });
    } else
      s = f, l = /(error|fail)/i.test(f) ? "alert" : "neutral";
  }
  const c = a?.actor;
  if (c && !c.icon) {
    const f = c.entityId ? t.states[c.entityId] : void 0;
    c.icon = f?.attributes.icon ?? (c.kind === "entity" && c.entityId ? ge(c.entityId.split(".")[0], f, f?.state) : gt[c.kind]);
  }
  const u = r === "person", h = u ? n?.attributes.entity_picture : void 0, g = i.colorful ?? v.colorful;
  return {
    key: He(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: r,
    name: o,
    verb: s,
    tone: l,
    icon: ge(r, n, e.state, e.icon),
    picture: h,
    isPerson: u,
    cause: a,
    count: 1,
    accent: _t(r, l, g)
  };
}
function ye(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function Kt(t, e, i, r, n) {
  const o = r - Y(i) * 36e5, s = Bt(i), l = i.collapse_repeats ?? v.collapse_repeats, a = [...e].filter((f) => {
    const _ = f.when * 1e3;
    return _ >= o && _ <= r + Wt;
  }).filter((f) => Le(f, i, n)).sort((f, _) => _.when - f.when), c = [];
  let u = 0;
  for (const f of a) {
    const _ = Ft(t, f, i), b = c[c.length - 1];
    if (l && b && _.entityId && b.entityId === _.entityId && b.verb === _.verb && ye(b) === ye(_) && u - _.when <= Lt) {
      b.count += 1, u = _.when;
      continue;
    }
    if (c.push(_), u = _.when, c.length > s) break;
  }
  const h = c.slice(0, s);
  (i.order ?? v.order) === "oldest_first" && h.reverse();
  const g = [];
  for (const f of h) {
    const _ = bt(f.when);
    let b = g[g.length - 1];
    (!b || b.key !== _) && (b = { key: _, label: xt(f.when, r), items: [] }, g.push(b)), b.items.push(f);
  }
  return g;
}
function Gt(t) {
  let e = `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const i = t.cause;
  return i?.actor && (e += ` by ${i.actor.name}`), i?.trigger && (e += `, triggered by ${i.trigger}`), e;
}
var Vt = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, I = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? qt(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Vt(e, i, n), n;
};
const $e = 3e3, Yt = 6e4;
let $ = class extends T {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._registryRefs = [];
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => oi), document.createElement("what-happened-card-editor");
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
    const i = [t.entities, t.devices, t.areas], r = i.some((n, o) => n !== this._registryRefs[o]);
    this._registryRefs = i, (e || r) && (this._ensureSubscription(), this._scheduleRecompute());
  }
  get hass() {
    return this._hass;
  }
  getCardSize() {
    const t = this._config;
    if (t?.max_height) return Math.max(3, Math.ceil(t.max_height / 50));
    const e = this._groups.reduce((i, r) => i + r.items.length, 0);
    return Math.min(12, Math.max(3, Math.ceil(e * 1.2) + 1));
  }
  /** Sections view: default size and resize limits (users resize with the handles). */
  getGridOptions() {
    return { columns: 12, rows: 6, min_columns: 3, min_rows: 2 };
  }
  connectedCallback() {
    super.connectedCallback(), this._tick = window.setInterval(() => {
      this._now = Date.now(), this._recompute();
    }, Yt), this._hass && this._config && (this._subKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    St(e.target) && (i = Et(t, e.target));
    const r = Y(e), n = JSON.stringify([r, i ? [...i].sort() : null]);
    if (n === this._subKey) {
      this._allowed = i;
      return;
    }
    if (this._subKey = n, this._allowed = i, this._unsubscribe(), this._entries.clear(), this._error = void 0, i && i.size === 0) {
      this._loading = !1;
      return;
    }
    this._loading = !0;
    const o = this._subToken, s = new Date(Date.now() - r * 36e5);
    At(
      t,
      (l) => {
        if (o !== this._subToken) return;
        const a = this._config;
        for (const c of l)
          a && !Le(c, a, this._allowed) || this._entries.set(He(c), c);
        this._entries.size > $e && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
      },
      s,
      i ? [...i] : void 0
    ).then((l) => {
      o !== this._subToken ? l() : this._unsub = l;
    }).catch((l) => {
      o === this._subToken && (this._loading = !1, this._error = l instanceof Error ? l.message : "Could not load the logbook");
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
    !this._hass || !this._config || (this._now = Date.now(), this._groups = Kt(
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
    if (!t) return p;
    const e = this._groups.reduce((n, o) => n + o.items.length, 0), i = this._groups[this._groups.length - 1], r = i?.items[i.items.length - 1]?.key;
    return m`
      <ha-card
        class=${L({
      compact: t.compact ?? v.compact,
      "has-header": !!t.title
    })}
        style=${S({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? m`<h1 class="card-header">${t.title}</h1>` : p}
        <div class="scroll">
          ${this._error ? m`<div class="state error" role="alert">${this._error}</div>` : this._loading && e === 0 ? m`<div class="state">Loading…</div>` : e === 0 ? this._renderEmpty(t) : m`<ol>
                      ${this._groups.map((n) => this._renderGroup(n, t, r))}
                    </ol>`}
        </div>
      </ha-card>
    `;
  }
  _renderEmpty(t) {
    const e = Y(t), i = e % 24 === 0 && e > 24 ? `${e / 24} days` : e === 1 ? "hour" : `${e} hours`, r = e === 1 ? "No activity in the last hour" : `No activity in the last ${i}`;
    return m`<div class="state">
      <ha-icon icon="mdi:timeline-clock-outline"></ha-icon>${r}
    </div>`;
  }
  _renderGroup(t, e, i) {
    const r = e.show_day_headers ?? v.show_day_headers;
    return m`
      ${r ? m`<li class="day" role="presentation">${t.label}</li>` : p}
      ${t.items.map((n) => this._renderItem(n, e, n.key === i))}
    `;
  }
  _renderItem(t, e, i) {
    const r = e.show_avatars ?? v.show_avatars, n = e.show_cause ?? v.show_cause, o = !!t.entityId && (e.tap_action ?? v.tap_action) !== "none", s = t.cause?.actor, l = r && t.picture, a = r && !l && s?.kind === "user" ? s : void 0;
    return m`
      <li class=${L({ item: !0, last: i })}>
        <div class="rail">
          <div
            class=${L({ node: !0, photo: !!l })}
            style=${S({ "--accent": t.accent, "--chip": q.user })}
          >
            ${l ? m`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : m`<ha-icon .icon=${t.icon}></ha-icon>`}
            ${a ? m`<span class="badge" title=${a.name}
                    >${a.picture ? m`<img src=${a.picture} alt="" loading="lazy" />` : a.name.charAt(0).toUpperCase()}</span
                  >` : p}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${L({ row: !0, clickable: o })}
          style=${S({ "--accent": t.accent })}
          role=${o ? "button" : "text"}
          tabindex=${o ? "0" : "-1"}
          aria-label=${Gt(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(c) => this._onRowKey(c, t)}
        >
          <div class="body">
            <div class="sentence">
              <span class="subject">${t.name}</span> <span class="verb">${t.verb}</span>
              ${t.count > 1 ? m`<span class="count">×${t.count}</span>` : p}
            </div>
            ${n ? this._renderCause(t, r) : p}
          </div>
          ${this._renderTime(t, e)}
        </div>
      </li>
    `;
  }
  _renderCause(t, e) {
    const i = t.cause;
    return !i || !i.actor && !i.trigger ? p : m`
      <div class="cause">
        ${i.actor ? m`<span>by</span>${this._renderActor(i.actor, e)}` : p}
        ${i.trigger ? m`<span>${i.actor ? "triggered by" : "by"}</span>
                <span class="chip" style=${S({ "--chip": q.trigger })}>
                  <ha-icon .icon=${vt(i.trigger)}></ha-icon>
                  <span class="text" title=${i.trigger}>${i.trigger}</span>
                </span>` : p}
      </div>
    `;
  }
  _renderActor(t, e) {
    const i = q[t.kind], r = t.kind === "user" && e ? t.picture ? m`<img class="avatar" src=${t.picture} alt="" loading="lazy" />` : m`<span class="initial">${t.name.charAt(0).toUpperCase()}</span>` : m`<ha-icon .icon=${t.icon ?? "mdi:information-outline"}></ha-icon>`, n = m`${r}<span class="text">${t.name}</span>`, o = t.detail ? `${t.name} – ${t.detail}` : t.name;
    return t.entityId && (this._config?.tap_action ?? v.tap_action) !== "none" ? m`<button
        class="chip"
        type="button"
        style=${S({ "--chip": i })}
        title=${o}
        @click=${(s) => {
      s.stopPropagation(), this._moreInfo(t.entityId);
    }}
        @keydown=${(s) => s.stopPropagation()}
      >
        ${n}
      </button>` : m`<span class="chip" style=${S({ "--chip": i })} title=${o}
      >${n}</span
    >`;
  }
  _renderTime(t, e) {
    const i = e.time_display ?? v.time_display, r = Ne(t.when, this._hass), n = $t(t.when, this._now);
    return m`
      <div class="time" title=${yt(t.when, this._hass)}>
        ${i !== "relative" ? m`<span class="abs">${r}</span>` : p}
        ${i !== "absolute" ? m`<span class="rel">${n}</span>` : p}
      </div>
    `;
  }
};
$.styles = kt;
I([
  R()
], $.prototype, "_config", 2);
I([
  R()
], $.prototype, "_groups", 2);
I([
  R()
], $.prototype, "_loading", 2);
I([
  R()
], $.prototype, "_error", 2);
I([
  R()
], $.prototype, "_now", 2);
$ = I([
  Te("what-happened-card")
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
var Zt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, ne = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Jt(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Zt(e, i, n), n;
};
const xe = [
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
].map((t) => ({ value: t, label: t })), Xt = {
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
  colorful: "Colorful accents",
  compact: "Compact layout",
  time_display: "Time",
  tap_action: "Tap action",
  max_height: "Maximum height",
  hide_unavailable: "Hide unavailable / unknown states",
  collapse_repeats: "Merge rapid repeats of the same event"
}, Qt = {
  hours_to_show: "How far back the timeline reaches, in hours (1 – 720).",
  max_entries: "Between 1 and 500. Rapid repeats count as one entry when merging is on.",
  target: "Leave empty to show everything. Choose areas, devices, entities or labels to narrow it.",
  include_domains: "Leave empty for all domains. Pick from the list or type your own.",
  max_height: "Pixels. Only needed in Masonry and Panel views. In Sections views, resize the card with its handles."
}, ei = [
  { name: "title", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "hours_to_show",
        selector: {
          number: {
            min: O.hours[0],
            max: O.hours[1],
            step: 1,
            mode: "box",
            unit_of_measurement: "h"
          }
        }
      },
      {
        name: "max_entries",
        selector: {
          number: { min: O.entries[0], max: O.entries[1], step: 1, mode: "box" }
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
], ti = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: xe }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: xe }
    }
  }
], ii = [
  { name: "show_cause", selector: { boolean: {} } },
  { name: "show_avatars", selector: { boolean: {} } },
  { name: "show_day_headers", selector: { boolean: {} } },
  { name: "colorful", selector: { boolean: {} } },
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
], ri = [
  { name: "hide_unavailable", selector: { boolean: {} } },
  { name: "collapse_repeats", selector: { boolean: {} } }
], ni = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: ti },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: ii },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: ri }
];
let M = class extends T {
  constructor() {
    super(...arguments), this._computeLabel = (t) => Xt[t.name] ?? t.name, this._computeHelper = (t) => Qt[t.name];
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
    for (const [r, n] of Object.entries(e))
      r === "type" || n === void 0 || n === "" || Array.isArray(n) && n.length === 0 || r === "target" && (!n || Object.keys(n).length === 0) || v[r] === n && !(r in this._config) || (i[r] = n);
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
    return !this.hass || !this._config ? p : m`
      ${this._form(ei)}
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
M.styles = ke`
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
  Pe({ attribute: !1 })
], M.prototype, "hass", 2);
ne([
  R()
], M.prototype, "_config", 2);
M = ne([
  Te("what-happened-card-editor")
], M);
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return M;
  }
}, Symbol.toStringTag, { value: "Module" }));
