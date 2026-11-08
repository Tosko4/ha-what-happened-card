/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ce = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, le = Symbol(), $e = /* @__PURE__ */ new WeakMap();
let Je = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== le) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ce && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = $e.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && $e.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (t) => new Je(typeof t == "string" ? t : t + "", void 0, le), Xe = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1], t[0]);
  return new Je(n, t, le);
}, xt = (t, e) => {
  if (ce) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), s = X.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = n.cssText, t.appendChild(i);
  }
}, xe = ce ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return $t(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: At, getOwnPropertyDescriptor: St, getOwnPropertyNames: Et, getOwnPropertySymbols: It, getPrototypeOf: Ct } = Object, ee = globalThis, ke = ee.trustedTypes, Tt = ke ? ke.emptyScript : "", Ot = ee.reactiveElementPolyfillSupport, B = (t, e) => t, Z = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Tt : null;
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
} }, de = (t, e) => !kt(t, e), Ae = { attribute: !0, type: String, converter: Z, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ??= Symbol("metadata"), ee.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ae) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, n);
      s !== void 0 && At(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: s, set: o } = St(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Ae;
  }
  static _$Ei() {
    if (this.hasOwnProperty(B("elementProperties"))) return;
    const e = Ct(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(B("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(B("properties"))) {
      const n = this.properties, i = [...Et(n), ...It(n)];
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
      for (const s of i) n.unshift(xe(s));
    } else e !== void 0 && n.push(xe(e));
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
    return xt(e, this.constructor.elementStyles), e;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Z).toAttribute(n, i.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Z;
      this._$Em = s;
      const a = r.fromAttribute(n, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, s = !1, o) {
    if (e !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[e]), i ??= r.getPropertyOptions(e), !((i.hasChanged ?? de)(o, n) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[B("elementProperties")] = /* @__PURE__ */ new Map(), T[B("finalized")] = /* @__PURE__ */ new Map(), Ot?.({ ReactiveElement: T }), (ee.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = globalThis, Se = (t) => t, Q = ue.trustedTypes, Ee = Q ? Q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ze = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Qe = "?" + x, Mt = `<${Qe}>`, C = document, V = () => C.createComment(""), F = (t) => t === null || typeof t != "object" && typeof t != "function", he = Array.isArray, Rt = (t) => he(t) || typeof t?.[Symbol.iterator] == "function", ie = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ie = /-->/g, Ce = />/g, S = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Oe = /"/g, et = /^(?:script|style|textarea|title)$/i, Pt = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), g = Pt(1), k = Symbol.for("lit-noChange"), _ = Symbol.for("lit-nothing"), Me = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function tt(t, e) {
  if (!he(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ee !== void 0 ? Ee.createHTML(e) : e;
}
const Nt = (t, e) => {
  const n = t.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = L;
  for (let a = 0; a < n; a++) {
    const c = t[a];
    let l, u, h = -1, v = 0;
    for (; v < c.length && (r.lastIndex = v, u = r.exec(c), u !== null); ) v = r.lastIndex, r === L ? u[1] === "!--" ? r = Ie : u[1] !== void 0 ? r = Ce : u[2] !== void 0 ? (et.test(u[2]) && (s = RegExp("</" + u[2], "g")), r = S) : u[3] !== void 0 && (r = S) : r === S ? u[0] === ">" ? (r = s ?? L, h = -1) : u[1] === void 0 ? h = -2 : (h = r.lastIndex - u[2].length, l = u[1], r = u[3] === void 0 ? S : u[3] === '"' ? Oe : Te) : r === Oe || r === Te ? r = S : r === Ie || r === Ce ? r = L : (r = S, s = void 0);
    const d = r === S && t[a + 1].startsWith("/>") ? " " : "";
    o += r === L ? c + Mt : h >= 0 ? (i.push(l), c.slice(0, h) + Ze + c.slice(h) + x + d) : c + x + (h === -2 ? a : d);
  }
  return [tt(t, o + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class K {
  constructor({ strings: e, _$litType$: n }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, c = this.parts, [l, u] = Nt(e, n);
    if (this.el = K.createElement(l, i), E.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = E.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ze)) {
          const v = u[r++], d = s.getAttribute(h).split(x), f = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: o, name: f[2], strings: d, ctor: f[1] === "." ? Ut : f[1] === "?" ? Ht : f[1] === "@" ? jt : te }), s.removeAttribute(h);
        } else h.startsWith(x) && (c.push({ type: 6, index: o }), s.removeAttribute(h));
        if (et.test(s.tagName)) {
          const h = s.textContent.split(x), v = h.length - 1;
          if (v > 0) {
            s.textContent = Q ? Q.emptyScript : "";
            for (let d = 0; d < v; d++) s.append(h[d], V()), E.nextNode(), c.push({ type: 2, index: ++o });
            s.append(h[v], V());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Qe) c.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(x, h + 1)) !== -1; ) c.push({ type: 7, index: o }), h += x.length - 1;
      }
      o++;
    }
  }
  static createElement(e, n) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function P(t, e, n = t, i) {
  if (e === k) return e;
  let s = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const o = F(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(t), s._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = s : n._$Cl = s), s !== void 0 && (e = P(t, s._$AS(t, e.values), s, i)), e;
}
class Dt {
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
    const { el: { content: n }, parts: i } = this._$AD, s = (e?.creationScope ?? C).importNode(n, !0);
    E.currentNode = s;
    let o = E.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let l;
        c.type === 2 ? l = new Y(o, o.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(o, c.name, c.strings, this, e) : c.type === 6 && (l = new zt(o, this, e)), this._$AV.push(l), c = i[++a];
      }
      r !== c?.index && (o = E.nextNode(), r++);
    }
    return E.currentNode = C, s;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
class Y {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, i, s) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = P(this, e, n), F(e) ? e === _ || e == null || e === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : e !== this._$AH && e !== k && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Rt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== _ && F(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = K.createElement(tt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const o = new Dt(s, this), r = o.u(this.options);
      o.p(n), this.T(r), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = Me.get(e.strings);
    return n === void 0 && Me.set(e.strings, n = new K(e)), n;
  }
  k(e) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, s = 0;
    for (const o of e) s === n.length ? n.push(i = new Y(this.O(V()), this.O(V()), this, this.options)) : i = n[s], i._$AI(o), s++;
    s < n.length && (this._$AR(i && i._$AB.nextSibling, s), n.length = s);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = Se(e).nextSibling;
      Se(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class te {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, s, o) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = e, this.name = n, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = _;
  }
  _$AI(e, n = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = P(this, e, n, 0), r = !F(e) || e !== this._$AH && e !== k, r && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = o[0], c = 0; c < o.length - 1; c++) l = P(this, a[i + c], n, c), l === k && (l = this._$AH[c]), r ||= !F(l) || l !== this._$AH[c], l === _ ? e = _ : e !== _ && (e += (l ?? "") + o[c + 1]), this._$AH[c] = l;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ut extends te {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === _ ? void 0 : e;
  }
}
class Ht extends te {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== _);
  }
}
class jt extends te {
  constructor(e, n, i, s, o) {
    super(e, n, i, s, o), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = P(this, e, n, 0) ?? _) === k) return;
    const i = this._$AH, s = e === _ && i !== _ || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== _ && (i === _ || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class zt {
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
const Lt = ue.litHtmlPolyfillSupport;
Lt?.(K, Y), (ue.litHtmlVersions ??= []).push("3.3.3");
const Wt = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = n?.renderBefore ?? null;
    i._$litPart$ = s = new Y(e.insertBefore(V(), o), o, void 0, n ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis;
let R = class extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Wt(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
};
R._$litElement$ = !0, R.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: R });
const Bt = pe.litElementPolyfillSupport;
Bt?.({ LitElement: R });
(pe.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: de }, Ft = (t = Vt, e, n) => {
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
function it(t) {
  return (e, n) => typeof n == "object" ? Ft(t, e, n) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(t) {
  return it({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = { ATTRIBUTE: 1 }, ot = (t) => (...e) => ({ _$litDirective$: t, values: e });
let rt = class {
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
const W = ot(class extends rt {
  constructor(t) {
    if (super(t), t.type !== st.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return k;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = "important", Kt = " !" + at, J = ot(class extends rt {
  constructor(t) {
    if (super(t), t.type !== st.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const o = typeof s == "string" && s.endsWith(Kt);
        i.includes("-") || o ? n.setProperty(i, o ? s.slice(0, -11) : s, o ? at : "") : n[i] = s;
      }
    }
    return k;
  }
}), fe = "en-US";
function Re(t) {
  const e = new Date(t);
  return new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}
function Yt(t) {
  const e = new Date(t), n = (i) => String(i).padStart(2, "0");
  return `${e.getFullYear()}-${n(e.getMonth() + 1)}-${n(e.getDate())}`;
}
function qt(t) {
  const e = t?.locale?.time_format;
  return e === "12" ? !0 : e === "24" ? !1 : new Intl.DateTimeFormat(void 0, { hour: "numeric" }).resolvedOptions().hour12 ?? !1;
}
function ct(t, e, n = !1) {
  const i = qt(e);
  return new Intl.DateTimeFormat(fe, {
    hour: i ? "numeric" : "2-digit",
    minute: "2-digit",
    second: n ? "2-digit" : void 0,
    hourCycle: i ? "h12" : "h23"
  }).format(t);
}
function Gt(t, e) {
  return `${new Intl.DateTimeFormat(fe, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(t)}, ${ct(t, e, !0)}`;
}
function Jt(t, e) {
  const n = Math.max(0, Math.round((e - t) / 1e3));
  if (n < 45) return "just now";
  const i = Math.round(n / 60);
  if (i < 60) return `${i} min ago`;
  const s = Math.round(i / 60);
  return s < 24 ? `${s} h ago` : `${Math.round(s / 24)} d ago`;
}
function Xt(t, e) {
  const n = Math.round((Re(e) - Re(t)) / 864e5);
  if (n === 0) return "Today";
  if (n === 1) return "Yesterday";
  const i = new Date(t).getFullYear() === new Date(e).getFullYear();
  return new Intl.DateTimeFormat(fe, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: i ? void 0 : "numeric"
  }).format(t);
}
function Zt(t, e, n, i) {
  const s = {
    type: "logbook/event_stream",
    start_time: n.toISOString()
  };
  return i && i.length > 0 && (s.entity_ids = i), t.connection.subscribeMessage(
    (o) => e(o.events ?? []),
    s
  );
}
const Qt = 10, en = 1e4, tn = 3;
function me(t, e) {
  return t.length > e ? `${t.slice(0, e - 1).trimEnd()}…` : t;
}
function Pe(t) {
  return t.entityId ?? t.name;
}
function nn(t, e, n = /* @__PURE__ */ new Set()) {
  if (e === "show") return t;
  const i = /* @__PURE__ */ new Map();
  for (const a of t) {
    if (a.rich || a.entityId && n.has(a.entityId)) continue;
    const c = Pe(a), l = i.get(c);
    l ? l.push(a) : i.set(c, [a]);
  }
  const s = /* @__PURE__ */ new Set();
  for (const [a, c] of i) {
    if (c.length < Qt) continue;
    (c[0].when - c[c.length - 1].when) / 36e5 <= c.length && s.add(a);
  }
  if (s.size === 0) return t;
  const o = [], r = /* @__PURE__ */ new Set();
  for (const a of t) {
    const c = Pe(a);
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
      details: a.isRun ? void 0 : [`latest: ${me(a.verb, 70)}`],
      isRun: !1,
      count: 1,
      rich: !0
    });
  }
  return o;
}
const sn = {
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
function on(t) {
  return sn[t] ?? `${t.replace(/_/g, " ")} entities`;
}
function rn(t) {
  return t.startsWith("was ") ? `were ${t.slice(4)}` : t.startsWith("is ") ? `are ${t.slice(3)}` : t;
}
function an(t, e) {
  return (t.cause?.actor?.name ?? "") === (e.cause?.actor?.name ?? "") && (t.cause?.trigger ?? "") === (e.cause?.trigger ?? "");
}
function cn(t) {
  const e = /* @__PURE__ */ new Map(), n = [];
  for (const s of t) {
    if (s.rich || !s.entityId) continue;
    const o = `${s.domain}|${s.verb}|${s.tone}`, r = e.get(o);
    if (r && r.oldest - s.when <= en)
      r.members.push(s), r.oldest = s.when;
    else {
      const a = { members: [s], oldest: s.when };
      e.set(o, a), n.push(a);
    }
  }
  const i = /* @__PURE__ */ new Map();
  for (const { members: s } of n) {
    const o = new Set(s.map((l) => l.entityId));
    if (o.size < tn) continue;
    const r = s[0], a = [...new Set(s.map((l) => l.name))], c = a.slice(0, 6).join(", ");
    i.set(r, {
      ...r,
      key: `burst|${r.key}`,
      entityId: void 0,
      name: `${o.size} ${on(r.domain)}`,
      verb: rn(r.verb),
      details: [a.length > 6 ? `${c} and ${a.length - 6} more` : c],
      cause: s.every((l) => an(l, r)) ? r.cause : void 0,
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
const ln = 3e4;
function dn(t, e, n = /* @__PURE__ */ new Set()) {
  const i = /* @__PURE__ */ new Set();
  for (const s of e) {
    if (s.rich || !s.entityId) continue;
    const o = t.states[s.entityId]?.attributes.entity_id;
    if (!Array.isArray(o) || o.length === 0) continue;
    const r = new Set(o.filter((a) => typeof a == "string"));
    for (const a of e)
      a !== s && !a.rich && a.entityId && !n.has(a.entityId) && r.has(a.entityId) && a.verb === s.verb && Math.abs(a.when - s.when) <= ln && i.add(a);
  }
  return i.size ? e.filter((s) => !i.has(s)) : e;
}
const un = 200;
function se(t) {
  return typeof t == "string" ? t.split(",").map((e) => e.trim()) : Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
}
function Ne(t) {
  return typeof t == "string" && t.trim() ? me(t.trim(), un) : void 0;
}
function hn(t) {
  const e = [];
  for (const [n, i] of Object.entries(t.trace ?? {}))
    if (!(!n.startsWith("action/") && !n.startsWith("sequence/")))
      for (const s of i) {
        const o = s.result?.params;
        if (!o?.domain || !o.service) continue;
        const r = o.service_data ?? {}, a = Ne(r.message);
        if (!a) continue;
        const c = `${o.domain}.${o.service}`;
        if (o.domain === "tts") {
          const l = [
            ...se(r.media_player_entity_id),
            ...se(r.entity_id),
            ...se(o.target?.entity_id)
          ].filter((u) => u.startsWith("media_player."));
          e.push({ kind: "say", text: a, speakers: [...new Set(l)], service: c });
        } else (o.domain === "notify" || o.domain === "persistent_notification") && e.push({
          kind: "notify",
          text: a,
          title: Ne(r.title),
          speakers: [],
          service: c
        });
      }
  return e;
}
function oe(t, e, n, i = 5e3) {
  let s, o = 1 / 0;
  for (const r of t) {
    const a = Date.parse(r.timestamp.start);
    if (Number.isNaN(a) || a > e + i || e - a > n) continue;
    const c = Math.abs(e - a);
    c < o && (s = r, o = c);
  }
  return s;
}
const pn = 45e3, fn = 6e4;
class mn {
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
    const s = this.item(e), o = s && this.lists.get(`${s.domain}|${s.itemId}`), r = o && oe(o.runs, n, i);
    return s && r ? this.details.get(`${s.domain}|${s.itemId}|${r.run_id}`) : void 0;
  }
  /** Load what `lookup` needs. Resolves when done; failures (no admin rights, no trace) are quiet. */
  ensure(e, n, i) {
    const s = this.item(e);
    if (!s) return;
    const o = `${s.domain}|${s.itemId}`, r = this.lists.get(o), a = r && oe(r.runs, n, i);
    if (a && this.details.has(`${o}|${a.run_id}`)) return;
    const c = `${o}|${a?.run_id ?? Math.floor(n / 6e4)}`, l = this.tried.get(c);
    if (l && Date.now() - l < fn) return;
    const u = this.inflight.get(c);
    if (u) return u;
    const h = (async () => {
      this.tried.set(c, Date.now());
      try {
        let v = this.lists.get(o);
        if (!v || Date.now() - v.at > pn) {
          const f = await this.hass.callWS({
            type: "trace/list",
            domain: s.domain,
            item_id: s.itemId
          });
          v = { at: Date.now(), runs: Array.isArray(f) ? f : [] }, this.lists.set(o, v);
        }
        const d = oe(v.runs, n, i);
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
    return this.inflight.set(c, h), h;
  }
}
const _n = "mdi:information-outline", _e = {
  user: "mdi:account",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  service: "mdi:cog-play",
  entity: "mdi:circle-medium",
  other: "mdi:information-outline"
};
function gn(t, e) {
  return e || (t === "homeassistant" ? "mdi:home-assistant" : _n);
}
function I(t, e, n, i, s) {
  const o = "var(--state-icon-color, var(--primary-text-color))";
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
const De = "var(--error-color)", vn = "tapo_rv30", Ue = {
  0: "the robot button",
  1: "the Tapo app",
  2: "Alexa",
  3: "Google Assistant",
  4: "the robot's schedule",
  5: "an automation",
  6: "IFTTT",
  7: "Alice"
}, yn = {
  cleaning: "start",
  docked: "finish"
}, bn = 10 * 60 * 1e3, wn = /* @__PURE__ */ new Set(["start", "done", "override", "return", "docked", "skip", "error"]), lt = 300;
function $n(t) {
  return Object.values(t.entities ?? {}).filter((e) => e.platform === vn && e.entity_id.startsWith("vacuum.")).map((e) => e.entity_id);
}
function He(t) {
  const e = t.match(/^(You started|Started) cleaning (.+?)\.(?: (.+))?$/s);
  return e ? { byUser: e[1] === "You started", names: e[2], why: e[3]?.replace(/\.$/, "") } : { byUser: t.startsWith("You") };
}
function xn(t, e, n) {
  let i;
  for (const s of t) {
    if (s.kind !== "start" || n.has(s)) continue;
    const o = Math.abs(s.ts - e);
    o <= lt && (!i || o < Math.abs(i.ts - e)) && (i = s);
  }
  return i;
}
function kn(t) {
  const e = t.match(/^(.+?) came home: (.*?)\.?$/s);
  return e ? { people: e[1], note: e[2] } : void 0;
}
function An(t, e) {
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
function je() {
  return { kind: "other", name: "Cleaning planner", icon: "mdi:calendar-clock" };
}
function ze(t) {
  return { kind: "user", name: t.user?.name ?? "You" };
}
function Sn(t) {
  const e = [];
  return t.minutes != null && e.push(`${t.minutes} min`), t.area != null && e.push(`${t.area} m²`), t.emptied_bin && e.push("bin emptied"), e;
}
function En(t, e, n) {
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
    const f = xn(e.log, d.started, a);
    f && a.add(f);
    const m = f ? He(f.text) : void 0, y = !!d.error;
    let $;
    f && m ? $ = { actor: m.byUser ? ze(t) : je(), trigger: m.why } : d.start_type != null && Ue[d.start_type] && ($ = {
      actor: { kind: "other", name: Ue[d.start_type], icon: "mdi:gesture-tap" }
    }), r.push({
      ...c,
      key: `vac|${e.entityId}|start|${d.started}`,
      when: d.started * 1e3,
      verb: m?.names ? `started cleaning ${m.names}` : "started cleaning",
      tone: "active",
      phase: "start",
      icon: "mdi:robot-vacuum",
      details: d.rule_name ? [`preset “${d.rule_name}”`] : void 0,
      cause: $,
      accent: I("vacuum", void 0, "cleaning", "active", o)
    });
    const H = (d.started + (d.minutes ?? 0) * 60) * 1e3;
    r.push({
      ...c,
      key: `vac|${e.entityId}|finish|${d.started}`,
      when: Math.max(H, d.started * 1e3 + 1e3),
      verb: y ? `stopped with error ${d.error}` : m?.names ? `finished cleaning ${m.names}` : "finished cleaning",
      tone: y ? "alert" : "inactive",
      phase: "finish",
      icon: y ? "mdi:robot-vacuum-alert" : "mdi:robot-vacuum",
      details: Sn(d),
      accent: y ? De : I("vacuum", void 0, "docked", "inactive", o)
    });
  }
  const l = e.log.filter((d) => d.kind === "return"), u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set();
  for (const d of e.log.filter((f) => f.kind === "docked")) {
    const f = l.find(
      (m) => !h.has(m) && m.ts <= d.ts && d.ts - m.ts <= 1800
    );
    f && (u.set(d, f), h.add(f));
  }
  const v = new Set(e.runs.map((d) => d.started));
  for (const d of e.log) {
    if (!wn.has(d.kind) || a.has(d) || d.kind === "done" && e.runs.length > 0 || d.kind === "start" && [...v].some((H) => Math.abs(H - d.ts) <= lt) || h.has(d)) continue;
    const f = d.kind === "start" ? He(d.text) : void 0, m = d.kind === "docked" ? u.get(d) : void 0, y = m ? kn(m.text) : void 0;
    if (y) {
      r.push({
        ...c,
        key: `vac|${e.entityId}|log|${d.ts}|docked`,
        when: d.ts * 1e3,
        verb: "was sent home",
        tone: "neutral",
        icon: "mdi:robot-vacuum",
        details: [y.note.charAt(0).toUpperCase() + y.note.slice(1)],
        cause: { actor: An(t, y.people), trigger: "coming home" },
        accent: I("vacuum", void 0, "docked", "inactive", o)
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
      cause: { actor: f?.byUser ? ze(t) : je(), trigger: f?.why },
      accent: $ === "alert" ? De : I(
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
const In = Xe`
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
function O(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Cn(t) {
  return t ? Object.values(t).some((e) => O(e).length > 0) : !1;
}
function dt(t, e) {
  const n = /* @__PURE__ */ new Set(), i = t.entities ?? {}, s = t.devices ?? {}, o = t.areas ?? {}, r = new Set(O(e.area_id));
  for (const l of O(e.floor_id))
    for (const u of Object.values(o))
      u.floor_id === l && r.add(u.area_id);
  const a = new Set(O(e.device_id)), c = new Set(O(e.label_id));
  for (const l of O(e.entity_id)) n.add(l);
  for (const l of Object.values(i)) {
    const u = l.device_id ? s[l.device_id] : void 0, h = l.area_id ?? u?.area_id ?? void 0;
    h && r.has(h) && n.add(l.entity_id), l.device_id && a.has(l.device_id) && n.add(l.entity_id), l.labels?.some((v) => c.has(v)) && n.add(l.entity_id), u?.labels?.some((v) => c.has(v)) && n.add(l.entity_id);
  }
  return n;
}
const Tn = /\b([a-z_]+)\.([a-z0-9_]+)\b/g;
function ut(t, e) {
  return e.replace(Tn, (n) => t.states[n]?.attributes.friendly_name ?? n);
}
function On(t, e) {
  for (const [n, i] of Object.entries(t.states))
    if (n.startsWith("person.") && i.attributes.user_id === e)
      return {
        entityId: n,
        name: i.attributes.friendly_name ?? n,
        picture: i.attributes.entity_picture
      };
}
function ht(t) {
  if (t)
    return t.match(/\b[a-z_]+\.[a-z0-9_]+\b/)?.[0];
}
function Mn(t) {
  if (t.context_source) return t.context_source;
  if (t.context_message?.startsWith("triggered by "))
    return t.context_message.slice(13);
}
function pt(t) {
  return t.replace(/event 'automation_triggered'/g, "another automation");
}
function Rn(t, e) {
  let n = e.context_source;
  return !n && e.context_message?.startsWith("triggered by ") && (n = e.context_message.slice(13)), n ? pt(ut(t, n)) : void 0;
}
function Pn(t, e) {
  const n = On(t, e);
  return n ? { kind: "user", name: n.name, entityId: n.entityId, picture: n.picture } : t.user && t.user.id === e ? { kind: "user", name: t.user.name } : { kind: "user", name: "A user" };
}
function Le(t, e, n) {
  return (e ? t.states[e]?.attributes.friendly_name : void 0) ?? n ?? e ?? "Unknown";
}
function Nn(t, e) {
  const n = e.context_event_type;
  if (n === "automation_triggered" || n === "script_started")
    return {
      actor: {
        kind: n === "automation_triggered" ? "automation" : "script",
        name: Le(
          t,
          e.context_entity_id,
          e.context_name ?? e.context_entity_id_name
        ),
        entityId: e.context_entity_id
      },
      trigger: Rn(t, e),
      triggerEntityId: ht(Mn(e))
    };
  if (e.context_user_id) {
    const i = Pn(t, e.context_user_id);
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
      name: Le(t, e.context_entity_id, e.context_entity_id_name),
      entityId: e.context_entity_id,
      detail: e.context_message
    } };
  if (e.context_name)
    return { actor: { kind: "other", name: e.context_name } };
}
function Dn(t, e) {
  const n = e.source ?? (e.message?.startsWith("triggered by ") ? e.message.slice(13) : void 0);
  return n ? pt(ut(t, n)) : void 0;
}
const Un = 9e4;
function Hn(t, e) {
  return e.map((n) => t.states[n]?.attributes.friendly_name ?? n).join(", ");
}
function jn(t, e, n, i, s, o) {
  const r = i.kind === "say";
  return {
    key: `action|${e.key}|${s}`,
    when: e.when,
    entityId: r ? i.speakers[0] : void 0,
    domain: r ? "media_player" : "notify",
    name: r ? i.speakers.length ? Hn(t, i.speakers) : "Speaker" : "Notification",
    verb: r ? `said “${i.text}”` : `sent “${i.title ? `${i.title}: ` : ""}${i.text}”`,
    tone: "active",
    icon: r ? "mdi:bullhorn" : "mdi:bell-ring",
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
    accent: I("media_player", void 0, "playing", "active", o)
  };
}
function zn(t, e, n, i, s, o = /* @__PURE__ */ new Set()) {
  const r = /* @__PURE__ */ new Set(), a = [];
  for (const c of e) {
    if (!c.isRun || c.rich || (n !== "all" && !(c.entityId && o.has(c.entityId)) && r.add(c), n === "none" || !s)) continue;
    const l = s(c) ?? [], u = c.domain === "script" ? "script" : "automation", h = { kind: u, name: c.name, entityId: c.entityId, icon: _e[u] }, v = c.cause?.actor ?? h, d = /* @__PURE__ */ new Set([c.entityId, v.entityId]);
    l.forEach((f, m) => {
      a.push(jn(t, c, v, f, m, i));
      for (const y of e)
        y !== c && y.entityId && f.speakers.includes(y.entityId) && d.has(y.cause?.actor?.entityId) && Math.abs(y.when - c.when) <= Un && r.add(y);
    });
  }
  return [...e.filter((c) => !r.has(c)), ...a];
}
const Ln = /* @__PURE__ */ new Set([
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
]), Wn = /* @__PURE__ */ new Set([
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
]), Bn = /* @__PURE__ */ new Set([
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
]), Vn = /* @__PURE__ */ new Set(["person", "device_tracker", "homeassistant"]), We = /* @__PURE__ */ new WeakMap();
function q(t, e) {
  const n = We.get(t);
  if (n && n.entities === e?.entities && n.devices === e?.devices) return n.ids;
  const i = new Set([t.target?.entity_id ?? [], t.also_show_entities ?? []].flat());
  if (e && t.also_show_labels?.length)
    for (const s of dt(e, { label_id: t.also_show_labels }))
      i.add(s);
  return We.set(t, { entities: e?.entities, devices: e?.devices, ids: i }), i;
}
function ft(t) {
  const e = t.domain ?? t.entity_id?.split(".")[0];
  return (e === "automation" || e === "script") && t.state === void 0 && t.message !== void 0;
}
function mt(t) {
  return !!(t.context_user_id || t.context_event_type || t.context_entity_id || t.context_name || t.context_service);
}
function Fn(t, e, n) {
  const i = t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
  if (t.entity_id && q(e, n).has(t.entity_id) || e.also_show_domains?.includes(i) || e.include_domains?.length || ft(t)) return !0;
  if (Wn.has(i)) return !!t.context_user_id;
  if (i === "binary_sensor") {
    const s = t.entity_id && n?.states[t.entity_id]?.attributes.device_class;
    return s ? Bn.has(s) : mt(t);
  }
  return Ln.has(i);
}
const Be = {
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
function Kn(t) {
  const e = t.trim();
  return e in Be ? `var(--${e}-color, ${Be[e]})` : e === "primary" ? "var(--primary-color)" : e;
}
function Ve(t, e, n) {
  if (!t?.length) return;
  let i, s;
  for (const r of t)
    !r?.match || !r.color || (r.match.includes(".") ? r.match === e && (s = r.color) : r.match === n && (i = r.color));
  const o = s ?? i;
  return o ? Kn(o) : void 0;
}
function Yn(t, e) {
  const n = e.colors;
  if (!n?.length) return t;
  for (const i of t) {
    const s = Ve(n, i.entityId, i.domain);
    s && (i.accent = s);
    for (const o of i.effects ?? []) {
      const r = Ve(n, o.entityId, o.domain);
      r && (o.accent = r);
    }
  }
  return t;
}
const qn = 3e4, Gn = 5e3, Jn = 1e4;
function Xn(t) {
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
function Zn(t) {
  const e = /* @__PURE__ */ new Set(), n = [];
  for (const i of t) {
    const s = i.cause?.actor, o = s?.entityId ?? s?.name;
    s && (s.kind === "automation" || s.kind === "script") && o && !e.has(o) && (e.add(o), n.push(s));
  }
  return n;
}
function Qn(t, e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const a = r.cause, c = a?.actor;
    if (!c?.entityId || c.kind !== "automation" && c.kind !== "script" || r.effects) continue;
    const l = a?.source ? `source|${a.source.key}` : `run|${c.entityId}|${a?.trigger ?? ""}`, u = n.get(l);
    u ? u.push(r) : n.set(l, [r]);
  }
  const i = /* @__PURE__ */ new Set(), s = [], o = e.filter((r) => !r.rich && r.cause?.actor?.kind === "service");
  for (const [, r] of n) {
    const a = [...r].sort((l, u) => l.when - u.when), c = [];
    for (const l of a) {
      const u = c[c.length - 1];
      u && l.when - u[u.length - 1].when <= qn ? u.push(l) : c.push([l]);
    }
    for (const l of c) {
      l.sort((m, y) => m.when - y.when);
      const u = l.find((m) => m.cause?.source)?.cause?.source;
      if (l.length < 2 && u?.cause?.actor?.kind !== "user") continue;
      for (const m of o)
        !i.has(m) && !l.includes(m) && m.when >= l[0].when - Gn && m.when <= l[l.length - 1].when + Jn && l.push(m);
      l.sort((m, y) => m.when - y.when);
      const h = l[0], v = Zn(l), d = l.map(Xn);
      let f;
      if (u)
        f = {
          ...u,
          key: `group|${u.key}|${h.key}`,
          effects: d,
          via: v,
          count: 1,
          rich: !0
        };
      else {
        const m = v[0], y = m.kind === "script" ? "script" : "automation";
        f = {
          key: `group|${h.key}`,
          when: h.when,
          entityId: m.entityId,
          domain: y,
          name: m.name,
          verb: "ran",
          tone: "active",
          icon: _e[y],
          isPerson: !1,
          isRun: !1,
          count: 1,
          rich: !0,
          cause: h.cause?.trigger ? { trigger: h.cause.trigger, triggerEntityId: h.cause.triggerEntityId } : void 0,
          effects: d,
          accent: I(y, void 0, "on", "active", !0)
        };
      }
      for (const m of l) i.add(m);
      s.push(f);
    }
  }
  return i.size ? [...e.filter((r) => !i.has(r)), ...s] : e;
}
const ei = 6e4;
function ge(t) {
  return (t.activity ?? "meaningful") === "meaningful" && !t.include_domains?.length;
}
function ti(t, e, n) {
  if (!ge(n)) return e;
  const i = q(n, t);
  for (const s of e) {
    if (s.domain !== "person" || !s.entityId) continue;
    const o = t.states[s.entityId]?.attributes.device_trackers;
    if (!Array.isArray(o)) continue;
    const r = e.find(
      (a) => a.domain === "device_tracker" && a.entityId && o.includes(a.entityId) && a.verb === s.verb && Math.abs(a.when - s.when) <= ei
    );
    !r || s.cause?.actor || (s.cause = { trigger: `device ${r.name}`, triggerEntityId: r.entityId });
  }
  return e.filter(
    (s) => !(s.domain === "device_tracker" && !(s.entityId && i.has(s.entityId)))
  );
}
const Fe = {
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
}, ni = {
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
}, ii = /* @__PURE__ */ new Set([
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
]), si = /* @__PURE__ */ new Set(["person", "device_tracker"]), oi = /* @__PURE__ */ new Set(["button", "input_button", "event", "doorbell"]);
function ve(t) {
  const e = t.replace(/_/g, " ");
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ri(t, e, n) {
  const i = t.states[e];
  if (i && t.formatEntityState)
    try {
      const r = t.formatEntityState({ ...i, state: n }, n);
      if (r) return r;
    } catch {
    }
  const s = i?.attributes.unit_of_measurement;
  return n !== "" && !Number.isNaN(Number(n)) ? s ? `${n} ${s}` : n : ve(n);
}
function ai(t, e) {
  return Object.values(t.states).find(
    (i) => i.entity_id.startsWith("zone.") && (i.attributes.friendly_name ?? "").toLowerCase() === e.toLowerCase()
  )?.attributes.friendly_name ?? ve(e);
}
function ci(t, e, n, i) {
  if (i === "unavailable") return { verb: "became unavailable", tone: "unavailable" };
  if (i === "unknown") return { verb: "became unknown", tone: "neutral" };
  const o = (n ? t.states[n] : void 0)?.attributes.device_class;
  if (si.has(e))
    return i === "home" ? { verb: "arrived home", tone: "active" } : i === "not_home" ? { verb: "left home", tone: "inactive" } : { verb: `arrived at ${ai(t, i)}`, tone: "active" };
  if (e === "binary_sensor" && o && Fe[o]) {
    const [c, l, u, h] = Fe[o];
    if (i === "on") return { verb: c, tone: u ?? "active" };
    if (i === "off") return { verb: l, tone: h ?? "inactive" };
  }
  const r = ni[e]?.[i];
  if (r) return { verb: r[0], tone: r[1] };
  if (oi.has(e)) return { verb: "was pressed", tone: "active" };
  if (e === "scene") return { verb: "was activated", tone: "active" };
  if (e === "climate" && i === "off") return { verb: "was turned off", tone: "inactive" };
  if (ii.has(e) || i === "on" || i === "off") {
    if (i === "on") return { verb: "was turned on", tone: "active" };
    if (i === "off") return { verb: "was turned off", tone: "inactive" };
  }
  const a = n ? ri(t, n, i) : ve(i);
  return { verb: `changed to ${me(a, 80)}`, tone: "neutral" };
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
}, M = { hours: [1, 720], entries: [1, 500] }, Ke = 60 * 1e3, li = 10 * 60 * 1e3, Ye = 5 * 60 * 1e3;
function _t(t) {
  return [t.when, t.entity_id ?? t.name, t.state ?? t.message, t.context_id].map((e) => e ?? "").join("|");
}
function gt(t, [e, n], i) {
  const s = typeof t == "number" ? t : Number(t);
  return Number.isFinite(s) ? Math.min(n, Math.max(e, Math.round(s))) : i;
}
function ae(t) {
  return gt(t.hours_to_show, M.hours, w.hours_to_show);
}
function di(t) {
  return gt(t.max_entries, M.entries, w.max_entries);
}
function vt(t) {
  return t.domain ?? t.entity_id?.split(".")[0] ?? "homeassistant";
}
function yt(t, e, n, i) {
  const s = vt(t);
  if (i && t.entity_id && !(e.show_diagnostic ?? w.show_diagnostic)) {
    const r = i.entities?.[t.entity_id], a = q(e, i).has(t.entity_id);
    if (r && (r.entity_category || r.hidden) && !a) return !1;
  }
  return !(n && (!t.entity_id || !n.has(t.entity_id)) || t.entity_id && e.exclude_entities?.includes(t.entity_id) || e.include_domains?.length && !e.include_domains.includes(s) || e.exclude_domains?.includes(s) || (e.activity ?? w.activity) === "meaningful" && !Fn(t, e, i) || (e.hide_unavailable ?? w.hide_unavailable) && (t.state === "unavailable" || t.state === "unknown"));
}
function ui(t, e, n) {
  const i = vt(e), s = e.entity_id ? t.states[e.entity_id] : void 0, o = e.name ?? s?.attributes.friendly_name ?? e.entity_id ?? "Home Assistant";
  let r, a = "neutral", c = Nn(t, e);
  if (e.state !== void 0 && e.message === void 0)
    ({ verb: r, tone: a } = ci(t, i, e.entity_id, e.state));
  else {
    const d = e.message ?? "did something";
    if (d.match(/^triggered(?: by (.+))?$/)) {
      r = "was triggered", a = "active";
      const m = Dn(t, e);
      if (m) {
        const y = e.source ?? d.replace(/^triggered by /, "");
        c = { ...c, trigger: m, triggerEntityId: ht(y) };
      }
    } else
      r = d, a = /(error|fail)/i.test(d) ? "alert" : "neutral";
  }
  const l = c?.actor;
  l && !l.icon && (l.icon = _e[l.kind]);
  const u = i === "person", h = u ? s?.attributes.entity_picture : void 0, v = n.state_color ?? w.state_color;
  return {
    key: _t(e),
    when: e.when * 1e3,
    entityId: e.entity_id,
    domain: i,
    name: o,
    verb: r,
    tone: a,
    icon: gn(i, e.icon),
    stateValue: e.state,
    picture: h,
    isPerson: u,
    isRun: ft(e),
    cause: c,
    count: 1,
    accent: I(i, s?.attributes.device_class, e.state, a, v)
  };
}
function qe(t) {
  const e = t.cause;
  return `${e?.actor?.kind ?? ""}:${e?.actor?.name ?? ""}:${e?.trigger ?? ""}`;
}
function hi(t, e) {
  if (!e || !t.entity_id || !e.vacuums.has(t.entity_id)) return !1;
  const n = yn[t.state ?? ""];
  return n ? e.items.some(
    (i) => i.entityId === t.entity_id && i.phase === n && Math.abs(i.when - t.when * 1e3) <= bn
  ) : !1;
}
function pi(t, e = !0, n = /* @__PURE__ */ new Set()) {
  const i = /* @__PURE__ */ new Set();
  for (const s of t) {
    const o = s.cause?.actor;
    if (!o?.entityId || o.kind !== "automation" && o.kind !== "script") continue;
    for (const c of t)
      e && c.isRun && !(c.entityId && n.has(c.entityId)) && c.entityId === o.entityId && Math.abs(c.when - s.when) <= Ke && i.add(c);
    const r = s.cause?.triggerEntityId;
    if (!r) continue;
    const a = t.find(
      (c) => c !== s && !c.isRun && c.entityId === r && c.when <= s.when + 5e3 && s.when - c.when <= Ke
    );
    a && (i.add(a), s.cause = { ...s.cause, trigger: `${a.name} ${a.verb}`, source: a });
  }
  return t.filter((s) => !i.has(s));
}
function fi(t, e, n) {
  return ge(n) ? dn(t, e, q(n, t)) : e;
}
function mi(t, e, n, i, s, o, r) {
  const a = i - ae(n) * 36e5, c = di(n), l = n.collapse_repeats ?? w.collapse_repeats, u = (o?.items ?? []).filter(
    (p) => p.when >= a && p.when <= i + Ye
  ), h = o ? { items: u, vacuums: o.vacuums } : void 0, v = [...e], d = v.filter((p) => p.domain === "homeassistant" && p.message === "started").map((p) => p.when), f = q(n, t), m = (p) => (n.activity ?? w.activity) !== "meaningful" ? !1 : p.domain === "homeassistant" ? p.message === "stopped" && d.some((b) => b >= p.when && b - p.when <= 900) : mt(p) || p.entity_id && f.has(p.entity_id) || Vn.has(p.domain ?? p.entity_id?.split(".")[0] ?? "") ? !1 : d.some((b) => p.when >= b - 30 && p.when <= b + 180), y = v.filter((p) => {
    const b = p.when * 1e3;
    return b >= a && b <= i + Ye;
  }).filter((p) => yt(p, n, s, t)).filter((p) => !m(p)).filter((p) => !hi(p, h)).sort((p, b) => b.when - p.when), $ = n.automation_runs ?? w.automation_runs, H = zn(
    t,
    [...y.map((p) => ui(t, p, n)), ...u],
    $,
    n.state_color ?? w.state_color,
    n.show_actions === !1 ? void 0 : r,
    f
  ).sort((p, b) => b.when - p.when), bt = pi(H, $ !== "all", f), be = cn(
    nn(
      fi(t, ti(t, bt, n), n),
      n.chatty ?? w.chatty,
      f
    )
  ), wt = Yn(
    (ge(n) ? Qn(t, be) : be).sort(
      (p, b) => b.when - p.when
    ),
    n
  ), j = [];
  let ne = 0;
  for (const p of wt) {
    const b = j[j.length - 1];
    if (l && b && !p.rich && !b.rich && p.entityId && b.entityId === p.entityId && b.verb === p.verb && qe(b) === qe(p) && ne - p.when <= li) {
      b.count += 1, ne = p.when;
      continue;
    }
    if (j.push(p), ne = p.when, j.length > c) break;
  }
  const we = j.slice(0, c);
  (n.order ?? w.order) === "oldest_first" && we.reverse();
  const G = [];
  for (const p of we) {
    const b = Yt(p.when);
    let z = G[G.length - 1];
    (!z || z.key !== b) && (z = { key: b, label: Xt(p.when, i), items: [] }, G.push(z)), z.items.push(p);
  }
  return G;
}
function _i(t) {
  let e = t.text ?? `${t.name} ${t.verb}`;
  t.count > 1 && (e += ` ${t.count} times`);
  const n = t.cause;
  return n?.actor && (e += ` by ${n.actor.name}`), n?.trigger && (e += `, triggered by ${n.trigger}`), t.details?.length && (e += ` (${t.details.join(", ")})`), t.effects?.length && (e += `. ${t.effects.map((i) => `${i.name} ${i.verb}`).join(". ")}`), e;
}
var gi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, U = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? vi(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && gi(e, n, s), s;
};
const Ge = 3e3, yi = 6e4;
let A = class extends R {
  constructor() {
    super(...arguments), this._groups = [], this._loading = !0, this._now = Date.now(), this._entries = /* @__PURE__ */ new Map(), this._subToken = 0, this._vacuums = /* @__PURE__ */ new Map(), this._vacUnsubs = [], this._vacToken = 0, this._traceBudget = 0, this._registryRefs = [], this._resolveRun = (t) => {
      const e = this._hass;
      if (!e || !t.entityId) return;
      const n = this._traces ??= new mn(e), i = n.lookup(t.entityId, t.when, 15e3);
      if (i) return hn(i);
      this._traceBudget-- > 0 && n.ensure(t.entityId, t.when, 15e3)?.then(() => this._scheduleRecompute());
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ci), document.createElement("what-happened-card-editor");
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
    }, yi), this._hass && this._config && (this._subKey = void 0, this._vacKey = void 0, this._ensureSubscription(), this._scheduleRecompute());
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
    const n = e.vacuum_details === !1 ? [] : $n(t).filter((o) => this._vacuumVisible(o, e)), i = JSON.stringify([...n].sort());
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
    Cn(e.target) && (n = dt(t, e.target));
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
    const o = this._subToken, r = new Date(Date.now() - i * 36e5);
    Zt(
      t,
      (a) => {
        if (o !== this._subToken) return;
        const c = this._config;
        for (const l of a)
          c && !yt(l, c, this._allowed, this._hass) || this._entries.set(_t(l), l);
        this._entries.size > Ge && this._trimBuffer(), this._loading = !1, this._scheduleRecompute();
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
    this._entries = new Map(t.slice(0, Ge));
  }
  _scheduleRecompute() {
    window.clearTimeout(this._recomputeTimer), this._recomputeTimer = window.setTimeout(() => this._recompute(), 50);
  }
  _recompute() {
    if (!this._hass || !this._config) return;
    this._now = Date.now(), this._traceBudget = 40;
    const t = mi(
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
        !s.log.length && !s.runs.length || (n.add(s.entityId), i.push(...En(t, s, e)));
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
    if (!t) return _;
    const e = this._groups.reduce((s, o) => s + o.items.length, 0), n = this._groups[this._groups.length - 1], i = n?.items[n.items.length - 1]?.key;
    return g`
      <ha-card
        class=${W({
      compact: t.compact ?? w.compact,
      "has-header": !!t.title
    })}
        style=${J({ "--wh-max-height": t.max_height ? `${t.max_height}px` : "" })}
      >
        ${t.title ? g`<h1 class="card-header">${t.title}</h1>` : _}
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
    const i = e.show_day_headers ?? w.show_day_headers;
    return g`
      ${i ? g`<li class="day" role="presentation">${t.label}</li>` : _}
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
    const i = e.show_avatars ?? w.show_avatars, s = e.show_cause ?? w.show_cause, o = !!t.entityId && (e.tap_action ?? w.tap_action) !== "none", r = i && t.picture;
    return g`
      <li class=${W({ item: !0, last: n })}>
        <div class="rail">
          <div
            class=${W({ node: !0, photo: !!r })}
            style=${J({ "--accent": t.accent })}
          >
            ${r ? g`<img class="photo-img" src=${t.picture} alt="" loading="lazy" />` : this._renderIcon(t)}
          </div>
          <div class="line"></div>
        </div>
        <div
          class=${W({ row: !0, clickable: o })}
          style=${J({ "--accent": t.accent })}
          role=${o ? "button" : "text"}
          tabindex=${o ? "0" : "-1"}
          aria-label=${_i(t)}
          @click=${() => this._onRowClick(t)}
          @keydown=${(a) => this._onRowKey(a, t)}
        >
          <div class="body">
            <div class="primary">
              ${t.text ? t.text : g`<span class="subject">${t.name}</span> ${t.verb}`}
              ${t.count > 1 ? g`<span class="count">×${t.count}</span>` : _}
            </div>
            ${t.details?.length ? g`<div class="secondary">${t.details.join(" · ")}</div>` : _}
            ${s ? this._renderCause(t, i) : _}
            ${s ? this._renderVia(t) : _} ${this._renderEffects(t)}
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
    if (!n || !n.actor && !n.trigger) return _;
    const i = n.actor, s = !!i?.entityId && (this._config?.tap_action ?? w.tap_action) !== "none";
    return g`
      <div class="secondary">
        ${i ? g`by${e && i.kind === "user" ? this._renderAvatar(i) : _}
              ${s ? this._actorLink(i) : g`<span title=${i.detail ?? i.name}>${i.name}</span>`}` : _}${i && n.trigger ? ", " : _}${n.trigger ? g`${i ? "triggered by" : "by"} ${n.trigger}` : _}
      </div>
    `;
  }
  /** A name that opens its entity. A span, not a button, so long names wrap like text. */
  _actorLink(t) {
    const e = (n) => {
      n.stopPropagation(), this._moreInfo(t.entityId);
    };
    return g`<span
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
    if (!t.via?.length) return _;
    const e = (this._config?.tap_action ?? w.tap_action) !== "none";
    return g`<div class="secondary">
      via
      ${t.via.map(
      (n, i) => g`${i ? ", " : _}${n.entityId && e ? this._actorLink(n) : n.name}`
    )}
    </div>`;
  }
  /** What one action caused: a line per thing, under the entry that started it. */
  _renderEffects(t) {
    if (!t.effects?.length) return _;
    const e = (this._config?.tap_action ?? w.tap_action) !== "none";
    return g`<ul class="effects">
      ${t.effects.map((n) => {
      const i = n.entityId && !n.fixedIcon ? this._hass?.states[n.entityId] : void 0, s = e && !!n.entityId;
      return g`<li
          class=${W({ effect: !0, clickable: s })}
          style=${J({ "--accent": n.accent })}
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
            >${i ? g`<ha-state-icon
                    .hass=${this._hass}
                    .stateObj=${i}
                    .stateValue=${n.stateValue}
                  ></ha-state-icon>` : g`<ha-icon .icon=${n.icon}></ha-icon>`}</span
          >
          <span class="e-text"
            ><span class="e-name">${n.name}</span> ${n.verb}${n.details?.length ? g`<span class="e-details"> · ${n.details.join(" · ")}</span>` : _}</span
          >
        </li>`;
    })}
    </ul>`;
  }
  _renderTime(t, e) {
    const n = e.time_display ?? w.time_display, i = ct(t.when, this._hass), s = Jt(t.when, this._now);
    return g`
      <div class="time" title=${Gt(t.when, this._hass)}>
        ${n !== "relative" ? g`<span class="abs">${i}</span>` : _}
        ${n !== "absolute" ? g`<span class="rel">${s}</span>` : _}
      </div>
    `;
  }
};
A.styles = In;
U([
  D()
], A.prototype, "_config", 2);
U([
  D()
], A.prototype, "_groups", 2);
U([
  D()
], A.prototype, "_loading", 2);
U([
  D()
], A.prototype, "_error", 2);
U([
  D()
], A.prototype, "_now", 2);
A = U([
  nt("what-happened-card")
], A);
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
var bi = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, ye = (t, e, n, i) => {
  for (var s = i > 1 ? void 0 : i ? wi(e, n) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (i ? r(e, n, s) : r(s)) || s);
  return i && s && bi(e, n, s), s;
};
const re = [
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
].map((t) => ({ value: t, label: t })), $i = {
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
}, xi = {
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
}, ki = [
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
], Ai = [
  { name: "target", selector: { target: {} } },
  { name: "exclude_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_entities", selector: { entity: { multiple: !0 } } },
  { name: "also_show_labels", selector: { label: { multiple: !0 } } },
  {
    name: "also_show_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: re }
    }
  },
  {
    name: "include_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: re }
    }
  },
  {
    name: "exclude_domains",
    selector: {
      select: { multiple: !0, custom_value: !0, mode: "dropdown", options: re }
    }
  }
], Si = [
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
], Ei = [
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
], Ii = [
  { id: "source", header: "What to include", icon: "mdi:filter-variant", schema: Ai },
  { id: "display", header: "Appearance", icon: "mdi:palette-outline", schema: Si },
  { id: "rules", header: "Rules", icon: "mdi:tune-variant", schema: Ei }
];
let N = class extends R {
  constructor() {
    super(...arguments), this._computeLabel = (t) => $i[t.name] ?? t.name, this._computeHelper = (t) => xi[t.name];
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
    return !this.hass || !this._config ? _ : g`
      ${this._form(ki)}
      ${Ii.map(
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
N.styles = Xe`
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
ye([
  it({ attribute: !1 })
], N.prototype, "hass", 2);
ye([
  D()
], N.prototype, "_config", 2);
N = ye([
  nt("what-happened-card-editor")
], N);
const Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get WhatHappenedCardEditor() {
    return N;
  }
}, Symbol.toStringTag, { value: "Module" }));
