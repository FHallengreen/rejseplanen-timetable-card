/*!
* Rejseplanen Timetable Card
* https://github.com/FHallengreen/rejseplanen-timetable-card
*
* Copyright (c) 2025-2026 Mattias Sjödin
* Copyright (c) 2026 Frederik Hansen
* Released under the MIT License.
*
* Derived from HomeAssistant_Trafiklab_Timetable_Card by Mattias Sjödin (MIT).
*/
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce(((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1]),e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,l,{is:u,defineProperty:d,getOwnPropertyDescriptor:f,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:h}=Object,g=globalThis,_=g.trustedTypes,ee=_?_.emptyScript:``,te=g.reactiveElementPolyfillSupport,v=(e,t)=>e,y={toAttribute(e,t){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
switch(t){case Boolean:e=e?ee:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ne=(e,t)=>!u(e,t),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:ne};(l=Symbol).metadata??(l.metadata=Symbol(`metadata`)),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);var x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=f(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(v(`elementProperties`)))return;let e=h(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v(`properties`))){let e=this.properties,t=[...p(e),...m(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?y:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?y:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){let r=this.constructor,i=this[e];if(n??(n=r.getPropertyOptions(e)),!((n.hasChanged??ne)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach((e=>this._$ET(e,this[e])))),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:`open`},x[v(`elementProperties`)]=new Map,x[v(`finalized`)]=new Map,te?.({ReactiveElement:x}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push(`2.1.1`);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var S=globalThis,C=S.trustedTypes,w=C?C.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,T=`$lit$`,E=`lit$${Math.random().toFixed(9).slice(2)}$`,D=`?`+E,re=`<${D}>`,O=document,k=()=>O.createComment(``),A=e=>e===null||typeof e!=`object`&&typeof e!=`function`,j=Array.isArray,ie=e=>j(e)||typeof e?.[Symbol.iterator]==`function`,M=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,ae=/>/g,F=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),oe=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,R=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),z=Symbol.for(`lit-noChange`),B=Symbol.for(`lit-nothing`),V=new WeakMap,H=O.createTreeWalker(O,129);function U(e,t){if(!j(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return w===void 0?t:w.createHTML(t)}var se=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=N;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===N?c[1]===`!--`?o=P:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=F):(L.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=F):o=ae:o===F?c[0]===`>`?(o=i??N,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?F:c[3]===`"`?I:oe):o===I||o===oe?o=F:o===P||o===ae?o=N:(o=F,i=void 0);let d=o===F&&e[t+1].startsWith(`/>`)?` `:``;a+=o===N?n+re:l>=0?(r.push(s),n.slice(0,l)+T+n.slice(l)+E+d):n+E+(l===-2?t:d)}return[U(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},W=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=se(t,n);if(this.el=e.createElement(l,r),H.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=H.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(T)){let t=u[o++],n=i.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?le:r[1]===`?`?ue:r[1]===`@`?de:q}),i.removeAttribute(e)}else e.startsWith(E)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(L.test(i.tagName)){let e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=C?C.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],k()),H.nextNode(),c.push({type:2,index:++a});i.append(e[t],k())}}}else if(i.nodeType===8){if(i.data===D)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(E,e+1))!==-1;)c.push({type:7,index:a}),e+=E.length-1}}a++}}static createElement(e,t){let n=O.createElement(`template`);return n.innerHTML=e,n}};function G(e,t,n=e,r){if(t===z)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=A(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??(n._$Co=[]))[r]=i),i!==void 0&&(t=G(e,i._$AS(e,t.values),i,r)),t}var ce=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);H.currentNode=r;let i=H.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new K(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new fe(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=H.nextNode(),a++)}return H.currentNode=O,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},K=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),A(e)?e===B||e==null||e===``?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==z&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ie(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&A(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=W.createElement(U(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ce(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return t===void 0&&V.set(e.strings,t=new W(e)),t}k(t){j(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(k()),this.O(k()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=B}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=G(this,e,t,0),a=!A(e)||e!==this._$AH&&e!==z,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=G(this,r[n+o],t,o),s===z&&(s=this._$AH[o]),a||(a=!A(s)||s!==this._$AH[o]),s===B?e=B:e!==B&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},le=class extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}},ue=class extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}},de=class extends q{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??B)===z)return;let n=this._$AH,r=e===B&&n!==B||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==B&&(n===B||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},fe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}},pe=S.litHtmlPolyfillSupport;pe?.(W,K),(S.litHtmlVersions??(S.litHtmlVersions=[])).push(`3.3.1`);var me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new K(t.insertBefore(k(),e),e,void 0,n??{})}return i._$AI(e),i},J=globalThis,Y=class extends x{constructor(){
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};Y._$litElement$=!0,Y.finalized=!0,J.litElementHydrateSupport?.({LitElement:Y});var he=J.litElementPolyfillSupport;he?.({LitElement:Y}),(J.litElementVersions??(J.litElementVersions=[])).push(`4.2.1`)
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
;var X={card:{title:`Trafiklab Timetable`},error:{entity_not_found:`Entity not found: {entity}`},empty:{no_upcoming:`No upcoming departures`},label:{platform:`Platform {platform}`,stand:`Stand {platform}`,bay:`Bay {platform}`,now:`Now`,in_minutes:`in {minutes} min`,updated:`Updated {time}`,mode_bus:`Bus`,mode_metro:`Metro`,mode_train:`Train`,mode_tram:`Tram`,mode_taxi:`Taxi`,mode_boat:`Boat`},status:{cancelled:`Cancelled`,delayed:`Delayed {minutes} min`,on_time:`On time`},editor:{sensor_entity:`Sensor entity`,show_heading:`Show heading (friendly name)`,max_items:`Max items`,section_general:`Card options`,help_sensor:`Select the Trafiklab timetable sensor entity.`,help_show_heading:`Show the sensor's friendly name as the card heading.`,help_max_items:`Maximum number of departures to display.`}},Z={card:{title:`Trafiklab Tidtabell`},error:{entity_not_found:`Enheten hittades inte: {entity}`},empty:{no_upcoming:`Inga kommande avgångar`},label:{platform:`Plattform {platform}`,stand:`Läge {platform}`,bay:`Brygga {platform}`,now:`Nu`,in_minutes:`om {minutes} min`,updated:`Uppdaterad {time}`,mode_bus:`Buss`,mode_metro:`T-bana`,mode_train:`Tåg`,mode_tram:`Spårvagn`,mode_taxi:`Taxi`,mode_boat:`Båt`},status:{cancelled:`Inställd`,delayed:`Försenad {minutes} min`,on_time:`I tid`},editor:{sensor_entity:`Sensornamn`,show_heading:`Visa rubrik (visningsnamn)`,max_items:`Max antal`,section_general:`Kortalternativ`,help_sensor:`Välj Trafiklab-tidtabellens sensor.`,help_show_heading:`Visa sensorns visningsnamn som kortets rubrik.`,help_max_items:`Maximalt antal avgångar att visa.`}};function ge(e,t,n){let r=e?.locale?.language||e?.language||`en`,i=String(r).toLowerCase().startsWith(`sv`)?Z:X,a=t.split(`.`).reduce((e,t)=>e?e[t]:void 0,i)||t;return n?Object.entries(n).reduce((e,[t,n])=>e.replaceAll(`{${t}}`,String(n)),a):a}var _e,Q=class extends Y{setConfig(e){this._config={show_name:!0,max_items:5,...e}}_valueChanged(e){this._config||(this._config={type:`rejseplanen-timetable-card`,entity:``,show_name:!0,max_items:5});let t=e.currentTarget,n=e.detail,r={...this._config},i=t?.configValue??t?.dataset?.configValue;if(i){let e=n?.value??t.value??t.checked;if(t.type===`number`||t.inputMode===`numeric`||i===`max_items`){let t=Number(e);Number.isNaN(t)||(e=t)}t.type===`checkbox`?r[i]=t.checked:e!==void 0&&(r[i]=e)}JSON.stringify(r)!==JSON.stringify(this._config)&&(this._config=r,this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:r}})))}render(){let e=(e,t)=>ge(this.hass,e,t),t=!!customElements.get(`ha-entity-picker`)&&!!this.hass,n=!!customElements.get(`ha-switch`),r=!!customElements.get(`ha-textfield`),i=!!customElements.get(`ha-form`),a={entity:this._config?.entity??``,show_name:this._config?.show_name!==!1,max_items:this._config?.max_items??5};if(i){let t=[{name:`entity`,selector:{entity:{domain:`sensor`}}},{name:`show_name`,selector:{boolean:{}}},{name:`max_items`,selector:{number:{min:1,max:20,mode:`box`}}}],n={entity:a.entity,show_name:a.show_name,max_items:a.max_items};return R`
        <ha-form
          .hass=${this.hass}
          .data=${n}
          .schema=${t}
          .computeLabel=${t=>{switch(t.name){case`entity`:return e(`editor.sensor_entity`);case`show_name`:return e(`editor.show_heading`);case`max_items`:return e(`editor.max_items`);default:return String(t.name)}}}
          .computeHelper=${t=>{switch(t.name){case`entity`:return e(`editor.help_sensor`);case`show_name`:return e(`editor.help_show_heading`);case`max_items`:return e(`editor.help_max_items`);default:return}}}
          @value-changed=${e=>{let t=e.detail?.value||{},n={...this._config||{type:`trafiklab-timetable-card`},entity:t.entity??``,show_name:t.show_name??!0,max_items:typeof t.max_items==`number`?t.max_items:Number(t.max_items)||5};JSON.stringify(n)!==JSON.stringify(this._config)&&(this._config=n,this.dispatchEvent(new CustomEvent(`config-changed`,{detail:{config:n}})))}}
        ></ha-form>
      `}return R`
      <div class="card-config">
        <div class="field">
          ${t?R`<ha-entity-picker
                  .hass=${this.hass}
                  .value=${a.entity}
                  .label=${e(`editor.sensor_entity`)}
                  .configValue=${`entity`}
                  .includeDomains=${[`sensor`]}
                  allow-custom-entity
                  @value-changed=${this._valueChanged}
                ></ha-entity-picker>`:R`<label class="lbl">${e(`editor.sensor_entity`)}<input
                    type="text"
                    .value=${a.entity}
                    data-config-value="entity"
                    @input=${e=>this._valueChanged(e)}
                  /></label>`}
        </div>
        <div class="field">
          ${n?R`<ha-formfield .label=${e(`editor.show_heading`)}>
                  <ha-switch
                    .checked=${a.show_name}
                    .configValue=${`show_name`}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>`:R`<label class="lbl"><input type="checkbox"
                    .checked=${a.show_name}
                    data-config-value="show_name"
                    @change=${e=>this._valueChanged(e)}
                  /> ${e(`editor.show_heading`)}</label>`}
        </div>
        <div class="field">
          ${r?R`<ha-textfield
                  .label=${e(`editor.max_items`)}
                  .value=${String(a.max_items)}
                  .configValue=${`max_items`}
                  type="number"
                  min="1"
                  max="20"
                  @value-changed=${this._valueChanged}
                  @input=${this._valueChanged}
                  @change=${this._valueChanged}
                ></ha-textfield>`:R`<label class="lbl">${e(`editor.max_items`)}<input
                    type="number" min="1" max="20"
                    .value=${String(a.max_items)}
                    data-config-value="max_items"
                    @input=${e=>this._valueChanged(e)}
                  /></label>`}
        </div>
      </div>
    `}};_e=Q,_e.styles=o`
  .card-config { display: grid; gap: 16px; }
  .lbl { display: grid; gap: 6px; font: inherit; color: var(--primary-text-color); }
  input[type="text"], input[type="number"] { padding: 8px; border-radius: 6px; border: 1px solid var(--divider-color); width: 100%; background: var(--card-background-color); color: var(--primary-text-color); }
  `,customElements.define(`rejseplanen-timetable-card-editor`,Q);var ve={card:{title:`Rejseplanen Tidstabel`},error:{entity_not_found:`Entitet ikke fundet: {entity}`},empty:{no_upcoming:`Ingen kommende afgange`},label:{platform:`Perron {platform}`,stand:`Stoppested {platform}`,bay:`Kaj {platform}`,now:`Nu`,in_minutes:`om {minutes} min`,updated:`Opdateret {time}`,mode_bus:`Bus`,mode_metro:`Metro`,mode_train:`Tog`,mode_tram:`Letbane`,mode_taxi:`Taxa`,mode_boat:`Færge`},status:{cancelled:`Aflyst`,delayed:`Forsinket {minutes} min`,on_time:`Til tiden`},editor:{sensor_entity:`Sensor entitet`,show_heading:`Vis overskrift (venligt navn)`,max_items:`Maks. antal`,section_general:`Kort indstillinger`,help_sensor:`Vælg Rejseplanen tidstabel sensor entitet.`,help_show_heading:`Vis sensorens venlige navn som kortets overskrift.`,help_max_items:`Maksimalt antal afgange der skal vises.`}},ye,$=`rejseplanen-timetable-card`,be=class extends Y{constructor(...e){super(...e),this._overlayHeight=0,this._overlayTop=0}set hass(e){this._hass=e,this.requestUpdate()}get hass(){return this._hass}static getStubConfig(){return{show_name:!0,max_items:5}}static getConfigElement(){return document.createElement(`rejseplanen-timetable-card-editor`)}setConfig(e){if(!e||!e.entity)throw Error(`Required property missing: entity`);this._config={show_name:!0,max_items:5,...e,type:$}}getCardSize(){let e=this._getDepartures().length||1;return 1+Math.min(e,this._config?.max_items??5)}_getEntity(){let e=this._config?.entity;if(e)return this.hass?.states?.[e]}_t(e,t){let n=this.hass?.locale?.language||this.hass?.language||`en`,r=String(n).toLowerCase().startsWith(`da`)?ve:String(n).toLowerCase().startsWith(`sv`)?Z:X,i=e.split(`.`).reduce((e,t)=>e?e[t]:void 0,r)||e;return t?Object.entries(t).reduce((e,[t,n])=>e.replaceAll(`{${t}}`,String(n)),i):i}_getDepartures(){let e=this._getEntity();if(!e)return[];let t=e.attributes?.upcoming;if(Array.isArray(t)&&t.length>0)return`line`in t[0]||`destination`in t[0]?t:t.map(e=>this._mapRejseplanenDeparture(e)).filter(e=>e!==null);let n=e.attributes?.Departure;if(Array.isArray(n))return n.map(e=>this._mapRejseplanenDeparture(e)).filter(e=>e!==null);let r=this._mapEntityToItem(e);return r?[r]:[]}_mapRejseplanenDeparture(e){if(!e)return null;let t=e.ProductAtStop||{},n=t.displayNumber||e.name||``,r=e.stop||``,i=e.rtTime||``,a=e.time||``,o=i||a,s=null;if(o){let e=parseInt(o.substring(0,2))||0,t=parseInt(o.substring(3,5))||0,n=e*60+t,r=new Date;s=n-(r.getHours()*60+r.getMinutes()),s<-720&&(s+=1440)}let c=(t.catOut||``).toString(),l=(t.catOutL||``).toString(),u=(t.icon?.res||``).toString(),d=c.toUpperCase(),f=`bus`;c===`MET`||l.includes(`Metro`)||u===`prod_sub`?f=`metro`:l.includes(`Tog`)||l.includes(`Train`)||c.includes(`S-Tog`)||l.includes(`S-Tog`)||l.includes(`Lokalbane`)||l.includes(`Regional`)||l.includes(`InterCity`)||[`S`,`RE`,`REG`,`IC`,`ICL`,`LYN`,`LOK`,`ØRE`].includes(d)||[`prod_comm`,`prod_reg`,`prod_long`,`prod_loc`,`prod_ic`].includes(u)?f=`train`:l.includes(`Tram`)||l.includes(`Letbane`)||u===`prod_tram`?f=`tram`:(l.includes(`Ferry`)||l.includes(`Boat`)||l.includes(`Færge`)||u===`prod_ship`)&&(f=`boat`);let p=``;e.rtTrack?p=e.rtTrack.toString():e.track?p=e.track.toString():e.rtPlatform?.text?p=e.rtPlatform.text.toString():e.platform?.text&&(p=e.platform.text.toString());let m=0;if(a&&i){let e=parseInt(a.substring(0,2))||0,t=parseInt(a.substring(3,5))||0,n=parseInt(i.substring(0,2))||0,r=parseInt(i.substring(3,5))||0,o=e*60+t;m=n*60+r-o,m<-720&&(m+=1440),m>720&&(m-=1440)}let h=a?a.substring(0,5):``,g=i?i.substring(0,5):h;return{line:n,destination:e.direction||``,scheduled_time:h,expected_time:g,time_formatted:g,minutes_until:s,transport_mode:f,real_time:!!(i&&i!==a),delay_minutes:m,canceled:!1,platform:p,station:r}}_mapEntityToItem(e){let t=e.attributes||{};if(`destination`in t||`scheduled_time`in t)return{line:t.line,destination:t.destination,scheduled_time:t.scheduled_time,expected_time:t.expected_time??t.scheduled_time,time_formatted:t.time_formatted,minutes_until:Number(e.state),transport_mode:t.transport_mode,real_time:t.real_time,delay:t.delay,delay_minutes:t.delay_minutes,canceled:t.canceled,platform:t.platform,agency:t.agency,station:t.station}}_modeLabel(e){if(!e)return;let t=`label.mode_${String(e).toLowerCase()}`,n=this._t(t);return n===t?e:n}_iconForMode(e){if(e)switch(String(e).toLowerCase()){case`bus`:return`mdi:bus`;case`metro`:return`mdi:subway-variant`;case`train`:return`mdi:train`;case`tram`:return`mdi:tram`;case`taxi`:return`mdi:taxi`;case`boat`:return`mdi:ferry`;default:return}}_platformLabelFor(e){let t=e?.platform;if(t==null||t===``)return;let n=String(e?.transport_mode||``).toLowerCase(),r=n===`bus`||n===`taxi`||n===`tram`?`label.stand`:n===`boat`?`label.bay`:`label.platform`;return this._t(r,{platform:t})}_getLineColor(e,t){if(!e)return;let n=String(e).toUpperCase();if(n===`M1`)return{bg:`#0A9A48`,color:`#fff`};if(n===`M2`)return{bg:`#FFC917`,color:`#000`};if(n===`M3`)return{bg:`#EE3B43`,color:`#fff`};if(n===`M4`)return{bg:`#1EBAE5`,color:`#fff`};if(n===`A`)return{bg:`#0173B7`,color:`#fff`};if(n===`B`||n===`BX`)return{bg:`#72BF44`,color:`#fff`};if(n===`C`)return{bg:`#E87722`,color:`#fff`};if(n===`E`)return{bg:`#8B8C8E`,color:`#fff`};if(n===`F`)return{bg:`#FFC917`,color:`#000`};if(n===`H`||n===`IC`||n===`LYN`||n===`ICL`||n===`REG`)return{bg:`#E30613`,color:`#fff`};if(n===`ØRE`||n===`ØRESUND`)return{bg:`#2B6B3D`,color:`#fff`};if(n===`HORNBÆKBANEN`||n===`LILLE NORD`||n===`FREDERIKSVÆRKBANEN`||n===`GRIBSKOVBANEN`||n===`NÆRUMBANEN`||n===`ØSTBANEN`||n===`ODSHERREDSBANEN`||n===`TØLLØSEBANEN`)return{bg:`#1073A5`,color:`#fff`};if(n===`1A`||n===`2A`||n===`3A`||n===`4A`||n===`5A`||n===`6A`||n===`7A`||n===`9A`)return{bg:`#E30613`,color:`#fff`};if(n.endsWith(`S`)&&n.length<=4)return{bg:`#0173B7`,color:`#fff`};if(n.startsWith(`E`))return{bg:`#5A5A5A`,color:`#fff`};if(n.startsWith(`N`)||n.endsWith(`N`))return{bg:`#003366`,color:`#fff`};if(t===`train`&&n.match(/^\d+$/))return{bg:`#E30613`,color:`#fff`};if(n.match(/^\d+[A-Z]?$/))return{bg:`#FFC917`,color:`#000`}}_statusFor(e){if(e.canceled)return{label:this._t(`status.cancelled`),badge:`cancel`};let t=typeof e.delay_minutes==`number`?e.delay_minutes:typeof e.delay==`number`?Math.round(e.delay/60):0;return t>0?{label:this._t(`status.delayed`,{minutes:t}),badge:`delay`}:{label:this._t(`status.on_time`),badge:`ok`}}_formatTimeString(e){if(e.time_formatted)return e.time_formatted;let t=e.expected_time||e.scheduled_time;if(!t)return``;try{let e=new Date(t);return`${e.getHours().toString().padStart(2,`0`)}:${e.getMinutes().toString().padStart(2,`0`)}`}catch{return String(t)}}_formatUpdated(e){try{return new Date(e).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}catch{return e}}_openMoreInfo(){let e=this._config?.entity;e&&this.dispatchEvent(new CustomEvent(`hass-more-info`,{bubbles:!0,composed:!0,detail:{entityId:e}}))}_onKeyActivate(e){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this._openMoreInfo())}updated(){try{let e=this.renderRoot.querySelector(`.list`),t=this.renderRoot.querySelector(`.card-body`),n=this.renderRoot.querySelector(`ha-card`);if(!e||!t||!n)return;let r=e.getBoundingClientRect(),i=t.getBoundingClientRect(),a=n.getBoundingClientRect(),o=Math.max(0,i.top-a.top),s=Math.max(0,r.top-i.top),c=Math.max(0,o+s-2),l=-o;(c!==this._overlayHeight||l!==this._overlayTop)&&(this._overlayHeight=c,this._overlayTop=l,this.requestUpdate())}catch{}}render(){let e=this._getEntity();if(!this._config)return B;if(!e)return R`<ha-card header=${this._t(`card.title`)}>
        <div class="content error">${this._t(`error.entity_not_found`,{entity:this._config.entity})}</div>
      </ha-card>`;let t=this._config.show_name!==!1,n=t?e.attributes?.friendly_name||e.entity_id:void 0,r=this._getDepartures().slice(0,this._config.max_items??5);return R`
      <ha-card .header=${t?n??this._t(`card.title`):void 0}>
        <div class="card-body">
          ${t?R`<div
                    class="header-overlay"
                    style="top: ${this._overlayTop}px; height: ${this._overlayHeight}px;"
                    role="button"
                    tabindex="0"
                    @click=${()=>this._openMoreInfo()}
                    @keydown=${e=>this._onKeyActivate(e)}
                  ></div>`:B}
        ${r.length===0?R`<div class="content empty">${this._t(`empty.no_upcoming`)}</div>`:R`<div class="list" role="list">
              ${r.map(e=>{let t=this._statusFor(e),n=this._formatTimeString(e),r=typeof e.minutes_until==`number`?e.minutes_until:void 0,i=this._modeLabel(e.transport_mode)??e.transport_mode,a=this._iconForMode(e.transport_mode),o=r===void 0?void 0:r===0?this._t(`label.now`):this._t(`label.in_minutes`,{minutes:r}),s=this._getLineColor(e.line,e.transport_mode);return R`
                  <div class="row" role="listitem">
                    <div class="line">
                      <span class="pill" role="button" tabindex="0"
                            style="${s?`background: ${s.bg}; color: ${s.color};`:``}"
                            @click=${()=>this._openMoreInfo()}
                            @keydown=${e=>this._onKeyActivate(e)}>
                        ${a?R`<ha-icon class="pill-icon" .icon=${a}></ha-icon>`:B}${e.line??``}
                      </span>
                    </div>
                    <div class="main">
                      ${e.station?R`<div class="station">${e.station}</div>`:B}
                      <div class="dest">${e.destination??``}</div>
                      <div class="meta">
                        ${this._platformLabelFor(e)?R`<span class="platform">${this._platformLabelFor(e)}</span>`:B}
                        ${i?R`<span class="mode-text">${i}</span>`:B}
                      </div>
                    </div>
                    <div class="right">
                      <div class="time">${n}</div>
                      ${o!==void 0||t?.label?R`<div class="in-status">
                              ${o?R`<span class="in">${o}</span>`:B}
                              ${o&&t?.label?R`<span class="sep"> - </span>`:B}
                              ${t?.label?R`<span class="status ${t.badge}">${t.label}</span>`:B}
                            </div>`:B}
                    </div>
                  </div>`})}
            </div>`}
        <div class="footer">
          ${e.attributes?.attribution?R`<span class="attr">${e.attributes.attribution}</span>`:B}
          ${e.attributes?.last_update?R`<span class="updated">${this._t(`label.updated`,{time:this._formatUpdated(e.attributes.last_update)})}</span>`:B}
        </div>
        </div>
      </ha-card>
    `}};ye=be,ye.styles=o`
    ha-card {
      --pill-bg: var(--primary-color);
      --ok: var(--success-color, #0b8457);
      --delay: var(--warning-color, #b36b00);
      --cancel: var(--error-color, #c92a2a);
      /* Size controls for icon and line pill */
      --trafiklab-pill-font-size: 1.3em; /* Smaller pill for more space */
      --trafiklab-pill-icon-size: 1.1em; /* scale icon with text */
      --trafiklab-pill-icon-nudge: -0.05em; /* slight optical centering */
    }
    .card-body { position: relative; }
    .header-overlay { position: absolute; left: 0; right: 0; background: transparent; z-index: 2; }
    .content {
      padding: 12px 16px;
    }
    .error { color: var(--error-color); }
    .empty { color: var(--secondary-text-color); }
    .list { padding: 8px 8px 0; }
    .row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid var(--divider-color);
    }
    .row:last-child { border-bottom: none; }
    .card-header { padding: 16px; font-size: 1.1em; font-weight: 600; cursor: pointer; }
    .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 28px;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--pill-bg);
      color: var(--text-primary-color, white);
      font-weight: 600;
      line-height: 1;
      font-size: var(--trafiklab-pill-font-size, 2em);
      cursor: pointer;
    }
    .station { font-size: 0.85em; color: var(--secondary-text-color); margin-bottom: 2px; }
    .dest { font-weight: 600; font-size: 1.1em; }
    .meta { color: var(--secondary-text-color); font-size: 0.86em; display: flex; gap: 8px; }
    .pill-icon {
      --mdc-icon-size: var(--trafiklab-pill-icon-size, 1.25em);
      width: var(--trafiklab-pill-icon-size, 1.25em);
      height: var(--trafiklab-pill-icon-size, 1.25em);
      color: var(--text-primary-color, white);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transform: translateY(var(--trafiklab-pill-icon-nudge));
    }
    .right { text-align: right; }
    .time { font-weight: 600; font-size: 1.1em; }
    .in-status { color: var(--secondary-text-color); font-size: 0.9em; display: inline-flex; align-items: baseline; gap: 4px; }
    .status { font-size: 0.86em; }
    .status.ok { color: var(--ok); }
    .status.delay { color: var(--delay); }
    .status.cancel { color: var(--cancel); font-weight: 700; }
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px 12px;
      color: var(--secondary-text-color);
      font-size: 0.8em;
    }
  `,customElements.define($,be),window.customCards=window.customCards||[],window.customCards.push({type:$,name:`Rejseplanen Timetable`,description:`Shows upcoming departures from Rejseplanen (Danish public transport)`,preview:!0});
//# sourceMappingURL=rejseplanen-timetable-card.js.map